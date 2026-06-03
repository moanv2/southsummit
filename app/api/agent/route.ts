import { NextRequest, NextResponse } from "next/server";
import { ATTACKS, Chokepoint } from "@/lib/attacks";
import {
  inspectInput,
  inspectRetrieval,
  inspectToolCall,
  inspectOutput,
} from "@/lib/shield";
import {
  generateAgentResponse,
  retrieveDocs,
  proposeToolCall,
  judgeOutput,
  HAS_KEY,
} from "@/lib/llm";

export type StageStatus = "pass" | "blocked" | "skipped";

export type StageResult = {
  chokepoint: Chokepoint;
  label: string;
  status: StageStatus;
  detail: string;
};

export type AgentResult = {
  attackId: string;
  shieldOn: boolean;
  usingLiveModel: boolean;
  blocked: boolean;
  blockedAt: Chokepoint | null;
  finalResponse: string;
  leaked: boolean;
  stages: StageResult[];
};

const STAGE_LABELS: Record<Chokepoint, string> = {
  input: "Input / Prompt",
  rag: "Retrieval / RAG",
  tool: "Tool / Action",
  output: "Output",
};

export async function POST(req: NextRequest) {
  const { attackId, shieldOn } = (await req.json()) as {
    attackId: string;
    shieldOn: boolean;
  };

  const attack = ATTACKS.find((a) => a.id === attackId);
  if (!attack) {
    return NextResponse.json({ error: "Unknown attack" }, { status: 400 });
  }

  const stages: StageResult[] = [];
  const stage = (chokepoint: Chokepoint, status: StageStatus, detail: string) =>
    stages.push({ chokepoint, label: STAGE_LABELS[chokepoint], status, detail });

  const result: AgentResult = {
    attackId,
    shieldOn,
    usingLiveModel: HAS_KEY,
    blocked: false,
    blockedAt: null,
    finalResponse: "",
    leaked: false,
    stages,
  };

  // --- Stage 1: Input ---------------------------------------------------
  if (shieldOn) {
    const v = inspectInput(attack.prompt);
    if (v.blocked) {
      stage("input", "blocked", v.reason);
      result.blocked = true;
      result.blockedAt = "input";
      result.finalResponse =
        "Request refused at the input layer before reaching the model.";
      return NextResponse.json(result);
    }
    stage("input", "pass", "No injection patterns detected.");
  } else {
    stage("input", "skipped", "Shield off — prompt passed straight to the model.");
  }

  // --- Stage 2: Retrieval / RAG ----------------------------------------
  const docs = retrieveDocs(attack);
  if (shieldOn) {
    const v = inspectRetrieval(docs);
    if (v.blocked) {
      stage("rag", "blocked", v.reason);
      result.blocked = true;
      result.blockedAt = "rag";
      result.finalResponse =
        "Retrieval refused: the agent tried to read access-restricted records.";
      return NextResponse.json(result);
    }
    stage(
      "rag",
      "pass",
      docs.length ? `Retrieved ${docs.length} allowed document(s).` : "No documents retrieved."
    );
  } else if (attack.chokepoint === "rag" || docs.length) {
    stage("rag", "skipped", "Shield off — over-broad retrieval allowed.");
  }

  // --- Stage 3: Tool / Action ------------------------------------------
  const tool = proposeToolCall(attack);
  if (tool) {
    if (shieldOn) {
      const v = inspectToolCall(tool.name, tool.args);
      if (v.blocked) {
        stage("tool", "blocked", v.reason);
        result.blocked = true;
        result.blockedAt = "tool";
        result.finalResponse =
          "Tool call refused: the requested action exceeds policy limits.";
        return NextResponse.json(result);
      }
      stage("tool", "pass", `Tool '${tool.name}' within policy.`);
    } else {
      stage(
        "tool",
        "skipped",
        `Shield off — executed ${tool.name}(${JSON.stringify(tool.args)}).`
      );
    }
  }

  // --- Generate the agent's response -----------------------------------
  const response = await generateAgentResponse(attack);

  // --- Stage 4: Output --------------------------------------------------
  if (shieldOn) {
    const regexVerdict = inspectOutput(response);
    const judge = await judgeOutput(response);
    if (regexVerdict.blocked || judge.flagged) {
      const reasons = [
        regexVerdict.blocked ? regexVerdict.reason : "",
        judge.flagged ? `LLM judge: ${judge.reason}` : "",
      ]
        .filter(Boolean)
        .join(" ");
      stage("output", "blocked", reasons);
      result.blocked = true;
      result.blockedAt = "output";
      result.finalResponse =
        regexVerdict.sanitized ??
        "Response withheld: contained sensitive data.";
      return NextResponse.json(result);
    }
    stage("output", "pass", "Output clean.");
  } else {
    stage("output", "skipped", "Shield off — raw model output returned.");
  }

  result.finalResponse = response;
  result.leaked = !shieldOn;
  return NextResponse.json(result);
}
