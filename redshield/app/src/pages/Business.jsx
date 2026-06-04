function SecHead({ num, title, desc }) {
  return (
    <div className="flex items-baseline gap-3 flex-wrap mb-4 mt-8 first:mt-0">
      <span className="mono text-xs text-accent font-semibold">{num}</span>
      <h2 className="text-[18px] font-extrabold tracking-tight">{title}</h2>
      {desc && <div className="text-[12.5px] text-muted ml-auto max-w-[520px] leading-relaxed">{desc}</div>}
    </div>
  );
}

function Ring({ lab, val, det, color, width }) {
  return (
    <div className="rounded-[14px] text-center p-4 border" style={{ maxWidth: width, width: '100%', borderColor: color.b, background: color.bg }}>
      <div className="text-[11px] tracking-[1.4px] uppercase font-bold" style={{ color: color.t }}>{lab}</div>
      <div className="mono text-[24px] font-bold mt-1" style={{ color: color.t }}>{val}</div>
      <div className="text-[11px] text-muted mt-1.5 leading-snug">{det}</div>
    </div>
  );
}

function FStep({ tag, t, d, variant }) {
  const v = {
    wedge: { b: 'var(--color-warning)', bg: 'rgba(245,158,11,.07)', t: 'text-warning' },
    convert: { b: 'var(--color-accent)', bg: 'rgba(0,229,192,.1)', t: 'text-accent' },
    plain: { b: 'rgba(120,150,200,.35)', bg: 'rgba(13,20,34,.8)', t: '' },
  }[variant || 'plain'];
  return (
    <div className="rounded-xl p-3.5 px-4 text-center w-full border" style={{ borderColor: v.b, background: v.bg }}>
      <span className="mono text-[10px] text-accent font-semibold block mb-1">{tag}</span>
      <div className={`text-[13.5px] font-bold ${v.t}`}>{t}</div>
      <div className="text-[11px] text-muted mt-1 leading-snug">{d}</div>
    </div>
  );
}
const Drop = () => <div className="text-faint text-base my-1.5 text-center">↓</div>;
const ColH = ({ children }) => <div className="text-[11px] tracking-[1.4px] uppercase font-bold text-faint mb-3">{children}</div>;
function Bullets({ items }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((it, i) => (
        <li key={i} className="text-[12.5px] text-muted leading-relaxed pl-[18px] relative before:content-['▸'] before:absolute before:left-0 before:text-accent">{it}</li>
      ))}
    </ul>
  );
}

function Stat({ v, l }) {
  return (
    <div className="border border-white/[0.06] rounded-[13px] p-[15px] bg-surface text-center">
      <div className="mono text-[24px] font-bold text-accent">{v}</div>
      <div className="text-[11px] text-muted mt-1.5 leading-snug">{l}</div>
    </div>
  );
}

function PBar({ v, l, n, h }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2 justify-end">
      <div className="mono text-[13px] font-bold text-accent">{v}</div>
      <div className="w-full max-w-[80px] rounded-t-lg" style={{ height: h, background: 'linear-gradient(180deg,var(--color-accent),rgba(0,229,192,.25))' }} />
      <div className="text-[11px] text-muted">{l}</div>
      <div className="text-[10px] text-faint text-center leading-tight min-h-[26px]">{n}</div>
    </div>
  );
}

function Pain({ t, children }) {
  return (
    <div className="border border-white/[0.06] rounded-r-xl p-3.5 px-4" style={{ borderLeft: '3px solid var(--color-danger)', background: 'rgba(239,68,68,.04)' }}>
      <div className="text-[13px] font-bold mb-1.5" style={{ color: '#ff8a96' }}>{t}</div>
      <div className="text-[12px] text-muted leading-relaxed">{children}</div>
    </div>
  );
}

export default function Business() {
  return (
    <div className="max-w-[1100px]">
      {/* 1 · TAM/SAM/SOM */}
      <SecHead num="01" title="Market — TAM / SAM / SOM"
        desc={<>Spain, bottom-up, conservative. The near-term unit isn't the hospital — it's the <b className="text-accent">private group</b>: land one site, expand to the rest.</>} />
      <div className="glass p-[22px]">
        <div className="grid grid-cols-[1.1fr_1fr] max-md:grid-cols-1 gap-5 items-center">
          <div className="flex flex-col items-center gap-2.5 py-2">
            <Ring lab="TAM" val="~€18.8M / yr" det="All ~751 Spanish hospitals at maturity · audit + monitoring (~€25k/yr each)" width="100%" color={{ b: 'rgba(61,142,248,.3)', bg: 'rgba(61,142,248,.08)', t: 'var(--color-blue)' }} />
            <Ring lab="SAM" val="~€5.3M / yr" det="~210 hospitals with 200+ beds · DPO, IT budget, will run agents" width="74%" color={{ b: 'rgba(0,229,192,.3)', bg: 'rgba(0,229,192,.08)', t: 'var(--color-accent)' }} />
            <Ring lab="SOM · Yr 1" val="~€120k" det="~6 audits + ~4 monitoring conversions" width="50%" color={{ b: 'rgba(0,229,192,.45)', bg: 'rgba(0,229,192,.12)', t: 'var(--color-accent)' }} />
          </div>
          <div>
            <div className="text-[12.5px] text-muted leading-[1.7]">
              <b className="text-text">751 hospitals</b> in Spain (449 public/SNS, ~300 private)<br />
              <b className="text-text">~28% (~210)</b> have 200+ beds<br />
              Only <b className="text-accent">~11%</b> of practitioners use AI today — but <b className="text-accent">42% are planning to</b>. The wave is arriving, not arrived.
            </div>
            <div className="mt-3.5 rounded-r-[10px] p-3 px-3.5 text-[12px] leading-relaxed text-[#dce4f1]" style={{ borderLeft: '3px solid var(--color-warning)', background: 'rgba(245,158,11,.06)' }}>
              Near-term SOM lives in <b className="text-warning">private groups</b> — Quirónsalud, Vithas, HM Hospitales, Ribera — not public SNS (6–18 month tender cycles). One landed group of ~45 sites is how SOM compounds toward SAM.
            </div>
          </div>
        </div>
      </div>

      {/* 2 · funnel */}
      <SecHead num="02" title="Funnel — acquisition & retention"
        desc={<>Warm, founder-led intros into private-group DPOs. The conversion event: watching their <b className="text-accent">own agent break</b> on a live call.</>} />
      <div className="glass p-[22px]">
        <div className="flex flex-col items-center max-w-[560px] mx-auto">
          <FStep tag="WARM INTRO" t="Founder-led door" d="Joe Haslam → Quirónsalud · Yanji director · Judith (nurse manager)" />
          <Drop />
          <FStep tag="QUALIFY" t="2-question call" d={'"Do you run an agent on patient data?" · "If I show it leaking, will you pay €12k?"'} />
          <Drop />
          <FStep variant="wedge" tag="WEDGE" t="Paid audit · €12,000" d="Bookable on one call · no procurement, no integration" />
          <Drop />
          <FStep tag="READOUT" t={'"11 ways we extracted patient data"'} d="Signed PDF = DPIA evidence — the emotional moment" />
          <Drop />
          <FStep variant="convert" tag="RETAIN" t="Monitoring · €2,500/mo" d="The recurring engine · then expand group-wide" />
        </div>
        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6 mt-6">
          <div>
            <ColH>Acquisition — how we get them</ColH>
            <Bullets items={[
              <><b className="text-text">Channel:</b> warm, founder-led intros to private-group DPOs/CISOs. Cold sales later — CAC ~doubles when cold.</>,
              <><b className="text-text">Hook:</b> regulatory fear, not features — GDPR Art. 32 + LOPDGDD DPIA, AEPD enforcement.</>,
              <><b className="text-text">Conversion event:</b> they watch their <b className="text-text">own</b> agent leak a record live. The audit manufactures the demand monitoring needs.</>,
            ]} />
          </div>
          <div>
            <ColH>Retention — how we keep them</ColH>
            <Bullets items={[
              <><b className="text-text">Audit → monitoring</b> is the make-or-break conversion — business vs. freelance gig.</>,
              <><b className="text-text">Stickiness:</b> annual DPIA evidence, real-time alerts they depend on, RedShield named in their filed DPIA (switching cost).</>,
              <><b className="text-text">Land & expand:</b> one site → group-wide · ~3.5-yr expected retention.</>,
            ]} />
          </div>
        </div>
      </div>

      {/* 3 · business plan */}
      <SecHead num="03" title="Business plan"
        desc="€12k wedge funds the funnel; €2.5k/mo monitoring is where value compounds. Break-even month 18–24." />
      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 mb-4">
        <Stat v="€12k" l="One-off audit (wedge)" />
        <Stat v="€2.5k/mo" l="Monitoring (~€30k/yr)" />
        <Stat v="~€13.5k" l="Monthly burn (2-person)" />
        <Stat v="M18–24" l="Break-even" />
      </div>
      <div className="glass p-[22px] mb-4">
        <ColH>12-month MRR trajectory (conservative)</ColH>
        <div className="flex gap-[18px] items-end h-[160px] px-1.5 mt-1">
          <PBar v="€0" l="Month 3" n="First audit lands (€12k one-off)" h="6px" />
          <PBar v="€2.5k" l="Month 6" n="First monitoring conversion — MRR begins" h="38px" />
          <PBar v="€10k" l="Month 12" n="4 recurring customers · ~€117k year-1 revenue" h="150px" />
        </div>
      </div>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-6">
        <div className="glass overflow-hidden self-start">
          <table className="w-full border-collapse text-[12.5px]">
            <thead><tr className="text-left">
              {['Operating cost', '€/mo', 'Why unavoidable'].map((h) => (
                <th key={h} className="bg-blue/[0.12] p-3 text-[10.5px] uppercase tracking-wide font-bold border-b border-white/[0.06]">{h}</th>
              ))}
            </tr></thead>
            <tbody className="[&_td]:p-3 [&_td]:border-b [&_td]:border-white/[0.06] [&_td]:align-top [&_td]:leading-relaxed [&_td]:text-muted [&_td:first-child]:text-text [&_td:first-child]:font-semibold [&_tr:last-child_td]:border-0">
              <tr><td>People (founder + security eng)</td><td className="mono text-text">~€10,000</td><td>Audit quality is a skilled human</td></tr>
              <tr><td>Insurance + legal + compliance</td><td className="mono text-text">~€2,000</td><td>Cyber liability, DPA, ISO path — no DPO signs without it</td></tr>
              <tr><td>Compute + tooling</td><td className="mono text-text">~€1,500</td><td>Thousands of attack prompts per engagement</td></tr>
            </tbody>
          </table>
        </div>
        <div>
          <ColH>Unit economics & exit</ColH>
          <Bullets items={[
            <><b className="text-text">CAC</b> ~€6k (warm, founder-led) · rises when cold.</>,
            <><b className="text-text">LTV</b> ~€63k (€2.5k/mo × ~3.5-yr × ~60% gross margin).</>,
            <><b className="text-text">LTV/CAC</b> ~10× headline · ~3–4× after haircutting churn, margin & cold CAC.</>,
            <><b className="text-text">Exit (3–5yr, at ~€2–5M ARR):</b> Cisco (bought Lakera), Microsoft (ships clinical agents), <b className="text-text">TÜV SÜD / AENOR</b> (EU AI Act conformity market — most realistic).</>,
          ]} />
        </div>
      </div>

      {/* 4 · KPIs */}
      <SecHead num="04" title="KPIs" desc="One number rules them all — does the audit convert to a subscription?" />
      <div className="rounded-[14px] p-4 px-[18px] mb-4 flex items-center gap-3.5 flex-wrap" style={{ border: '1px solid rgba(245,158,11,.4)', background: 'rgba(245,158,11,.06)' }}>
        <span className="text-[26px]">🎯</span>
        <div>
          <div className="text-[10px] tracking-[1.4px] uppercase text-warning font-bold">North-star metric</div>
          <div className="text-[16px] font-extrabold mt-0.5">Audit → monitoring conversion rate</div>
        </div>
        <div className="text-[12px] text-muted ml-auto max-w-[440px] leading-relaxed">Currently <b className="text-warning">unproven</b>. This single number decides whether RedShield is a scalable business or a freelance gig.</div>
      </div>
      <div className="glass overflow-hidden">
        <table className="w-full border-collapse text-[12.5px]">
          <thead><tr className="text-left">
            {['Category', 'KPI', 'Target'].map((h) => (
              <th key={h} className="bg-blue/[0.12] p-3 text-[10.5px] uppercase tracking-wide font-bold border-b border-white/[0.06]">{h}</th>
            ))}
          </tr></thead>
          <tbody className="[&_td]:p-3 [&_td]:border-b [&_td]:border-white/[0.06] [&_td]:align-top [&_td]:leading-relaxed [&_td]:text-muted [&_td:first-child]:text-text [&_td:first-child]:font-semibold [&_tr:last-child_td]:border-0">
            <tr><td>Funnel</td><td>Qualifying call → paid audit</td><td className="mono text-text">≥ 30% (warm)</td></tr>
            <tr><td>Funnel</td><td className="text-warning font-bold">★ Audit → monitoring conversion</td><td className="mono text-warning font-bold">≥ 40%</td></tr>
            <tr><td>Funnel</td><td>Time-to-first-audit (intro → signed)</td><td className="mono text-text">&lt; 30 days</td></tr>
            <tr><td>Revenue</td><td>MRR by month 12</td><td className="mono text-text">€10k</td></tr>
            <tr><td>Revenue</td><td>Audits closed / recurring logos (Yr 1)</td><td className="mono text-text">6 / 4</td></tr>
            <tr><td>Retention</td><td>Logo retention (annual)</td><td className="mono text-text">&gt; 85%</td></tr>
            <tr><td>Retention</td><td>Net revenue retention (group expansion)</td><td className="mono text-text">&gt; 110%</td></tr>
            <tr><td>Unit econ</td><td>LTV / CAC (post-haircut)</td><td className="mono text-text">≥ 3×</td></tr>
            <tr><td>Product proof</td><td>Critical breaches found per audit</td><td className="mono text-text">≥ 8 ("11 ways")</td></tr>
          </tbody>
        </table>
      </div>

      {/* 5 · pain points */}
      <SecHead num="05" title="Customer pain points"
        desc="The buyer: the DPO of a ~600-bed private hospital. Legally mandated to exist (LOPDGDD Art. 34)." />
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-3.5">
        <Pain t="Career risk">Fired for a patient-data leak they had <b className="text-text">no mechanism to detect or prevent</b>. "You will never have to tell the board, or the AEPD, that you had no mechanism."</Pain>
        <Pain t="Regulatory exposure">Mandatory DPIA + GDPR Art. 32 obligations <b className="text-text">today</b>. AEPD issued <b className="text-text">€40M</b> in fines in 2025; ceiling is 4% of global turnover. Marina Salud fined €500k (Apr 2025).</Pain>
        <Pain t="Documented-but-untested gap">DPIAs exist on paper but <b className="text-text">nobody adversarially tested the agent</b>. #1 healthcare fine cause in 2025 = inadequate technical measures.</Pain>
        <Pain t="Over-broad access">Named AEPD failure: "software letting staff access <b className="text-text">more patient data than necessary</b>" — maps to the tool/retrieval chokepoint.</Pain>
        <Pain t="False contractual comfort">Signed a BAA/DPA with the AI vendor and <b className="text-text">assume</b> liability transferred — but nobody tested whether the controls hold.</Pain>
        <Pain t="No in-house capability">No ML red-team team; can't run thousands of attack prompts. Need an outsider who speaks <b className="text-text">DPIA</b>, not engineer-eval.</Pain>
      </div>

      {/* honesty flag */}
      <div className="mt-8 rounded-[14px] p-[18px] px-5" style={{ border: '1px solid rgba(245,158,11,.4)', background: 'rgba(245,158,11,.07)' }}>
        <div className="flex items-center gap-2.5 text-[14px] font-extrabold text-warning mb-2.5"><span>⚠️</span> Honesty flag — read before pitching</div>
        <div className="text-[13px] text-[#dce4f1] leading-relaxed">This is <b className="text-text">warm intent, not payment</b> — no one has paid or begged yet. The funnel is the <b className="text-text">hypothesis</b>; the conversion rates are <b className="text-text">targets, not results</b>. Strongest framing: "the gap is real and the buyer is legally mandated to exist — what's unvalidated is whether they'll pay an outsider to attack their live agent. That's exactly what this week's experiment tests."</div>
      </div>

      <div className="mt-7 text-center text-[11px] text-faint leading-relaxed">RedShield Clinical · business case · conservative bottom-up estimates & targets, not audited results · synthetic demo company.</div>
    </div>
  );
}
