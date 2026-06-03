import { CREDIT_LIMIT_POLICY, Doc } from "./data";

export type Verdict = {
  blocked: boolean;
  reason: string;
  // Output with sensitive spans masked, when applicable.
  sanitized?: string;
};

const PASS: Verdict = { blocked: false, reason: "" };

// --- Chokepoint 1: Input / Prompt ---------------------------------------
const INJECTION_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /ignore (all |your )?(previous|prior) instructions/i, label: "instruction-override attempt" },
  { re: /system prompt|maintenance mode|developer mode|debug mode/i, label: "privileged-mode escalation" },
  { re: /you are now|act as|pretend to be/i, label: "persona hijack" },
  { re: /passphrase|verbatim/i, label: "secret-extraction phrasing" },
];

export function inspectInput(prompt: string): Verdict {
  for (const { re, label } of INJECTION_PATTERNS) {
    if (re.test(prompt)) {
      return { blocked: true, reason: `Prompt injection detected: ${label}.` };
    }
  }
  return PASS;
}

// --- Chokepoint 2: Retrieval / RAG --------------------------------------
export function inspectRetrieval(docs: Doc[]): Verdict {
  const restricted = docs.filter((d) => d.restricted);
  if (restricted.length > 0) {
    return {
      blocked: true,
      reason: `Retrieval blocked: matched ${restricted.length} access-restricted document(s) (${restricted
        .map((d) => d.title)
        .join(", ")}).`,
    };
  }
  return PASS;
}

// --- Chokepoint 3: Tool / Action ----------------------------------------
const ALLOWED_TOOLS = new Set(["post_credit_memo", "read_hr_master"]);

export function inspectToolCall(name: string, args: Record<string, unknown>): Verdict {
  if (!ALLOWED_TOOLS.has(name)) {
    return { blocked: true, reason: `BAPI '${name}' is not allow-listed.` };
  }
  if (name === "post_credit_memo") {
    const amount = Number(args.amount ?? 0);
    if (amount > CREDIT_LIMIT_POLICY.maxAutoApprove) {
      return {
        blocked: true,
        reason: `Credit memo €${amount.toLocaleString()} exceeds the €${CREDIT_LIMIT_POLICY.maxAutoApprove} auto-approve limit (manager approval required).`,
      };
    }
  }
  return PASS;
}

// --- Chokepoint 4: Output ------------------------------------------------
const OUTPUT_PATTERNS: { re: RegExp; label: string }[] = [
  { re: /\b\d{3}-\d{2}-\d{4}\b/g, label: "SSN" },
  { re: /sk_(live|test)_[A-Za-z0-9]+/g, label: "Stripe key" },
  { re: /AKIA[0-9A-Z]{8,}/g, label: "AWS key" },
  { re: /SAP-OVERRIDE-\d+/g, label: "SAP override passphrase" },
  { re: /\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b/g, label: "IBAN" },
  { re: /[$€]\s?\d{2,3}[.,]\d{3}\b/g, label: "salary figure" },
];

export function inspectOutput(text: string): Verdict {
  const hits: string[] = [];
  let sanitized = text;
  for (const { re, label } of OUTPUT_PATTERNS) {
    if (re.test(text)) {
      hits.push(label);
      sanitized = sanitized.replace(re, `[REDACTED ${label}]`);
    }
  }
  if (hits.length > 0) {
    return {
      blocked: true,
      reason: `Sensitive data in output redacted: ${[...new Set(hits)].join(", ")}.`,
      sanitized,
    };
  }
  return PASS;
}
