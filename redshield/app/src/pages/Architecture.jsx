const AWS = '#ff9900';

function SecHead({ num, title, desc }) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap mb-4 mt-8 first:mt-0">
      <span className="mono text-xs text-accent font-semibold">{num}</span>
      <h2 className="text-[18px] font-extrabold tracking-tight">{title}</h2>
      {desc && <div className="text-[12.5px] text-muted ml-auto max-w-[520px] leading-relaxed">{desc}</div>}
    </div>
  );
}

function FlowNode({ ic, t, d, variant }) {
  const styles = {
    agent: 'border-purple/50 bg-purple/[0.07]',
    shield: 'border-accent/60 bg-accent/[0.07] box-glow',
    plain: 'border-white/15 bg-[rgba(13,20,34,0.8)]',
  }[variant || 'plain'];
  const tcolor = { agent: 'text-purple', shield: 'text-accent', plain: '' }[variant || 'plain'];
  return (
    <div className={`flex-1 min-w-[150px] border rounded-[14px] p-4 text-center flex flex-col gap-1.5 items-center ${styles}`}>
      <div className="text-[26px] leading-none">{ic}</div>
      <div className={`text-[13.5px] font-bold ${tcolor}`}>{t}</div>
      <div className="text-[11px] text-muted leading-snug">{d}</div>
    </div>
  );
}
const Arrow = () => <div className="shrink-0 w-11 flex items-center justify-center text-faint text-xl max-md:rotate-90 max-md:h-7">→</div>;

function Chokepoint({ n, ic, t, svc, d }) {
  return (
    <div className="border border-white/[0.06] rounded-xl p-3.5 bg-surface">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-lg">{ic}</span>
        <div>
          <div className="mono text-[10px] text-blue font-semibold">{n}</div>
          <div className="text-[13px] font-bold">{t}</div>
        </div>
      </div>
      <div className="text-[10.5px] font-semibold" style={{ color: AWS }}>{svc}</div>
      <div className="text-[11px] text-muted leading-snug mt-1.5">{d}</div>
    </div>
  );
}

function Svc({ ic, name, sub, d, core }) {
  return (
    <div className={`flex-1 min-w-[170px] border rounded-xl p-3.5 bg-[rgba(13,20,34,0.7)] flex flex-col gap-1.5 ${core ? 'border-accent/30' : ''}`}
         style={!core ? { borderColor: 'rgba(255,153,0,.3)' } : undefined}>
      <div className="flex items-center gap-2">
        <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-base shrink-0 border"
             style={core ? { background: 'rgba(0,229,192,.1)', borderColor: 'rgba(0,229,192,.35)' } : { background: 'rgba(255,153,0,.1)', borderColor: 'rgba(255,153,0,.3)' }}>{ic}</div>
        <div>
          <div className="text-[13px] font-bold leading-tight">{name}</div>
          <div className="text-[10px] font-semibold tracking-wide" style={{ color: core ? 'var(--color-accent)' : AWS }}>{sub}</div>
        </div>
      </div>
      <div className="text-[11px] text-muted leading-snug">{d}</div>
    </div>
  );
}
const TierLab = ({ children }) => <div className="text-[10px] tracking-[1.4px] uppercase text-faint font-bold mb-2.5 pl-0.5">{children}</div>;
const Down = () => <div className="flex justify-center text-faint text-base my-2">↓</div>;

function Card({ em, t, children }) {
  return (
    <div className="border rounded-[14px] p-4 px-[18px]" style={{ borderColor: 'rgba(0,229,192,.3)', background: 'rgba(0,229,192,.1)' }}>
      <div className="flex items-center gap-2.5 text-[14px] font-bold mb-2 text-accent"><span className="text-lg">{em}</span>{t}</div>
      <div className="text-[12px] text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default function Architecture() {
  return (
    <div className="max-w-[1100px]">
      {/* 1 · request path */}
      <SecHead num="01" title="How it sits in the request path"
        desc={<>RedShield is not an agent — it's an <b className="text-accent">AI gateway</b> inline between the clinical agent and its data, inspecting every hop at four chokepoints.</>} />
      <div className="glass p-[22px]">
        <div className="flex items-stretch gap-0 flex-wrap justify-center max-md:flex-col">
          <FlowNode ic="🧑‍⚕️" t="Clinician / Patient" d="asks the copilot a question" />
          <Arrow />
          <FlowNode variant="agent" ic="🤖" t="Clinical AI Agent" d="Triage Copilot on the EHR" />
          <Arrow />
          <FlowNode variant="shield" ic="🛡️" t="RedShield Gateway" d="4 chokepoints inspect every hop" />
          <Arrow />
          <FlowNode ic="🗄️" t="EHR · Tools · Output" d="patient data & actions" />
        </div>
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3 mt-[18px]">
          <Chokepoint n="01 · INPUT" ic="⌨️" t="Prompt Guard" svc="Lambda + Bedrock" d="Blocks prompt injection & jailbreaks before the model runs." />
          <Chokepoint n="02 · RETRIEVAL" ic="🗄️" t="PHI / Access Guard" svc="Comprehend Medical" d="Stops over-broad EHR reads outside the care relationship." />
          <Chokepoint n="03 · TOOL" ic="⚙️" t="Action Guard" svc="MCP allow-list" d="Refuses destructive / unauthorized tool calls." />
          <Chokepoint n="04 · OUTPUT" ic="📤" t="DLP Masking" svc="Comprehend Medical + Textract" d="Redacts PHI, IDs & secrets — incl. text inside images." />
        </div>
      </div>

      {/* 2 · AWS architecture */}
      <SecHead num="02" title="AWS reference architecture"
        desc={<>Everything runs inside the <b style={{ color: AWS }}>AWS Europe (Spain) region</b> — patient data never leaves Spanish soil. Built on HIPAA-eligible managed services.</>} />
      <div className="glass p-[22px]">
        <div className="rounded-[18px] p-[18px] pt-5 relative" style={{ border: '1.5px dashed rgba(255,153,0,.4)', background: 'rgba(255,153,0,.025)' }}>
          <div className="absolute -top-2.5 left-5 bg-base px-2.5 text-[11px] font-bold tracking-wider flex items-center gap-1.5" style={{ color: AWS }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: AWS, boxShadow: `0 0 10px ${AWS}` }} />
            AWS EUROPE (SPAIN) · eu-south-2 · ARAGÓN
          </div>

          <div className="mt-1.5"><TierLab>Ingress · the gateway</TierLab>
            <div className="flex gap-3 flex-wrap">
              <Svc ic="🚪" name="API Gateway" sub="AWS · ingress" d="Receives every agent request; the inline proxy seam." />
              <Svc ic="λ" name="Lambda" sub="AWS · serverless" d="Runs the chokepoint logic; scales to zero between audits." />
            </div>
          </div>
          <Down />
          <div><TierLab>Detection engine · hybrid NLP</TierLab>
            <div className="flex gap-3 flex-wrap">
              <Svc ic="🧬" name="Comprehend Medical" sub="AWS · PHI NER · HIPAA-eligible" d="Purpose-built medical NLP: names, DNI, diagnoses, meds." />
              <Svc ic="📄" name="Textract" sub="AWS · OCR · HIPAA-eligible" d="Reads PHI out of scanned referrals, lab reports & faxes." />
              <Svc ic="🧠" name="Claude on Bedrock" sub="AWS · LLM-judge · in-region" d="Semantic judge for novel attacks — no data leaves AWS/EU." />
              <Svc core ic="⚡" name="Regex / NER" sub="RedShield · deterministic" d="Fast, auditable pattern layer; runs before the LLM judge." />
            </div>
          </div>
          <Down />
          <div><TierLab>Evidence · the audit artifact</TierLab>
            <div className="flex gap-3 flex-wrap">
              <Svc ic="🔒" name="S3 + Object Lock" sub="AWS · write-once (WORM)" d="Tamper-proof signed DPIA report — cannot be altered after signing." />
              <Svc ic="🔑" name="KMS" sub="AWS · encryption" d="Customer-managed keys; encrypt at rest, full key control." />
              <Svc ic="📜" name="CloudTrail" sub="AWS · audit log" d="Logs every access to the evidence — chain of custody." />
            </div>
          </div>
          <Down />
          <div><TierLab>Continuous monitoring · the €2,500/mo expansion</TierLab>
            <div className="flex gap-3 flex-wrap">
              <Svc ic="📊" name="CloudWatch" sub="AWS · metrics" d="Live risk & breach dashboards." />
              <Svc ic="🔔" name="EventBridge + SNS" sub="AWS · alerting" d="Real-time alerts to the DPO on any leak attempt." />
              <Svc ic="🔍" name="OpenSearch" sub="AWS · tracing" d="Searchable trail of every agent interaction." />
            </div>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap text-[11px] text-muted mt-3.5 justify-center">
          <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] inline-block" style={{ background: 'rgba(255,153,0,.5)' }} /> AWS managed service (HIPAA-eligible where noted)</span>
          <span className="inline-flex items-center gap-1.5"><i className="w-3 h-3 rounded-[3px] inline-block" style={{ background: 'rgba(0,229,192,.5)' }} /> RedShield logic</span>
        </div>
      </div>

      {/* 3 · mapping table */}
      <SecHead num="03" title="Chokepoint → AWS service mapping"
        desc="Each chokepoint maps 1:1 to a named AWS service. The path to production is wiring, not invention." />
      <div className="glass overflow-hidden">
        <table className="w-full border-collapse text-[12.5px]">
          <thead><tr className="text-left">
            {['Chokepoint', 'RedShield capability', 'AWS service', "Why it's the right call"].map((h) => (
              <th key={h} className="bg-blue/[0.12] p-3 text-[10.5px] uppercase tracking-wide font-bold border-b border-white/[0.06]">{h}</th>
            ))}
          </tr></thead>
          <tbody className="[&_td]:p-3 [&_td]:border-b [&_td]:border-white/[0.06] [&_td]:align-top [&_td]:leading-relaxed [&_td]:text-muted [&_td:first-child]:text-text [&_td:first-child]:font-semibold [&_tr:last-child_td]:border-0">
            <tr><td>01 · Input</td><td>Prompt Guard — injection / jailbreak detection</td><td style={{ color: AWS }} className="font-semibold">Lambda + Bedrock</td><td>Deterministic regex first, Claude judge for novel attacks — before the model runs.</td></tr>
            <tr><td>02 · Retrieval</td><td>PHI & over-broad-access detection</td><td style={{ color: AWS }} className="font-semibold">Comprehend Medical</td><td>HIPAA-eligible medical NLP whose job is DetectPHI. Maps to the AEPD's #1 fine cause.</td></tr>
            <tr><td>03 · Tool / Action</td><td>Action allow-listing, blocks destructive calls</td><td style={{ color: AWS }} className="font-semibold">MCP gateway on Lambda</td><td>Controls agent → tool/data access; refuses bulk exports & deletes.</td></tr>
            <tr><td>04 · Output</td><td>DLP masking incl. multimodal</td><td style={{ color: AWS }} className="font-semibold">Comprehend Medical + Textract</td><td>Redacts PHI & secrets in text and in scanned images competitors miss.</td></tr>
            <tr><td>— · Evidence</td><td>Signed DPIA audit report</td><td style={{ color: AWS }} className="font-semibold">S3 Object Lock + KMS</td><td>Write-once, tamper-proof artifact for the regulator.</td></tr>
          </tbody>
        </table>
      </div>

      {/* 4 · GDPR cards */}
      <SecHead num="04" title="Why AWS wins the GDPR conversation"
        desc="Two facts answer the DPO's biggest objections before they're raised." />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3.5">
        <Card em="🇪🇸" t="Data stays in Spain">The <b className="text-text">AWS Europe (Spain) region (eu-south-2, Aragón)</b> keeps patient data on Spanish soil. For an AEPD-facing DPO, <b className="text-text">"data never leaves the country"</b> is a tender-winner.</Card>
        <Card em="📋" t="Inherited compliance">AWS is a <b className="text-text">GDPR data processor with a signed DPA</b>; Comprehend Medical & Textract are <b className="text-text">HIPAA-eligible</b>. RedShield inherits compliance — and cites it in the DPIA.</Card>
        <Card em="🔒" t="Tamper-proof evidence"><b className="text-text">S3 Object Lock (WORM)</b> means the signed report <b className="text-text">cannot be altered after signing</b>. CloudTrail records every access — bulletproof chain of custody.</Card>
        <Card em="🧠" t="No data egress to the model">Running <b className="text-text">Claude on Bedrock</b> keeps the LLM inside AWS/EU. Kills the <b className="text-text">"you're shipping PHI to a US API endpoint"</b> objection cold.</Card>
      </div>

      {/* 5 · real vs woz */}
      <SecHead num="05" title="What's real today vs. the production claim"
        desc="Honest framing: the frontend and the problem are real. The backend is a thin Wizard-of-Oz — but every faked call maps to a named AWS service." />
      <div className="glass overflow-hidden">
        <table className="w-full border-collapse text-[12.5px]">
          <thead><tr className="text-left">
            {['Layer', 'Hackathon reality', 'Production claim'].map((h) => (
              <th key={h} className="bg-blue/[0.12] p-3 text-[10.5px] uppercase tracking-wide font-bold border-b border-white/[0.06]">{h}</th>
            ))}
          </tr></thead>
          <tbody className="[&_td]:p-3 [&_td]:border-b [&_td]:border-white/[0.06] [&_td]:align-top [&_td]:leading-relaxed [&_td]:text-muted [&_td:first-child]:text-text [&_td:first-child]:font-semibold [&_tr:last-child_td]:border-0">
            <tr><td>Frontend & problem framing</td><td><span className="text-accent font-bold">Real</span> — this app</td><td>Same</td></tr>
            <tr><td>4-chokepoint detection logic</td><td><span className="text-accent font-bold">Real-ish</span> — regex + Claude judge</td><td>Lambda + Comprehend Medical + Bedrock</td></tr>
            <tr><td>PHI / OCR services</td><td><span className="text-warning font-bold">Wizard-of-Oz</span> — pre-baked</td><td>Comprehend Medical + Textract</td></tr>
            <tr><td>Audit report</td><td><span className="text-accent font-bold">Real</span> — generated client-side</td><td>S3 Object Lock signed artifact</td></tr>
            <tr><td>"Runs in AWS Spain region"</td><td><span className="text-warning font-bold">Slide only</span></td><td>Actual deployment in eu-south-2</td></tr>
          </tbody>
        </table>
      </div>

      {/* 6 · pitch */}
      <SecHead num="06" title="The one-line architecture pitch" />
      <div className="rounded-xl p-4 px-[18px] text-[13.5px] leading-relaxed text-[#dce4f1]" style={{ border: '1px solid rgba(120,150,200,.35)', borderLeft: '3px solid var(--color-accent)', background: 'rgba(0,229,192,.05)' }}>
        "RedShield is a serverless AWS gateway — <b className="text-accent">API Gateway + Lambda</b> — that runs <b className="text-accent">Amazon Comprehend Medical</b> for PHI detection, <b className="text-accent">Textract</b> for scanned-document OCR, and <b className="text-accent">Claude on Bedrock</b> as a semantic judge, all inside the <b className="text-accent">AWS Europe (Spain) region</b> so patient data never leaves the country — writing tamper-proof signed audit evidence to <b className="text-accent">S3 Object Lock</b> for the DPO's mandatory DPIA."
      </div>

      <div className="mt-7 text-center text-[11px] text-faint leading-relaxed">RedShield Clinical · architecture & AWS deployment · 100% synthetic data · service names illustrate the production design, not a live deployment.</div>
    </div>
  );
}
