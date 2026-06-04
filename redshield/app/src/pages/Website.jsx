import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

function Count({ to }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let c = 0; const step = Math.max(1, Math.round(to / 40));
    const iv = setInterval(() => { c += step; if (c >= to) { c = to; clearInterval(iv); } setN(c); }, 22);
    return () => clearInterval(iv);
  }, [to]);
  return <>{n}</>;
}

export default function Website() {
  const nav = useNavigate();
  const audits = useStore((s) => s.audits);
  const breaches = audits.filter((a) => a.verdict === 'breach').length;

  return (
    <div>
      <div className="text-center pt-12 pb-9">
        <span className="inline-block text-[11px] tracking-[1.5px] uppercase text-accent border border-accent/30 rounded-full px-3.5 py-1.5 mb-5 bg-accent/[0.06]">🛡 PHI guardrail for hospital AI agents</span>
        <h1 className="text-[clamp(34px,6vw,52px)] font-extrabold leading-[1.05] tracking-[-1.5px] max-w-[880px] mx-auto">
          Your clinical AI agent is one prompt away from a{' '}
          <span className="bg-gradient-to-r from-accent to-blue bg-clip-text text-transparent">patient-data breach</span>.
        </h1>
        <p className="text-[17px] text-muted max-w-[600px] mx-auto mt-5 leading-relaxed">
          RedShield red-teams your hospital's AI agents and blocks prompt injection, PHI exposure, tool misuse, and data exfiltration in real time — before the AEPD does it for you.
        </p>
        <div className="flex gap-3.5 justify-center mt-7 flex-wrap">
          <button onClick={() => nav('/console')} className="relative overflow-hidden px-6 py-3 rounded-xl font-semibold border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition">⚡ See it break live</button>
          <button onClick={() => nav('/crm')} className="px-6 py-3 rounded-xl font-semibold border border-white/10 bg-surface hover:bg-elevated transition">Book an audit</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-[760px] mx-auto mt-11">
        {[['attacks run', audits.length || 27], ['breaches caught', breaches || 19], ['chokepoints', 4]].map(([l, n]) => (
          <div key={l} className="glass text-center py-6">
            <div className="text-[34px] font-extrabold text-accent"><Count to={n} /></div>
            <div className="text-xs text-muted mt-1.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="text-[11px] tracking-[1.6px] uppercase text-faint font-bold mt-9 mb-3">How it works — 4 chokepoints</div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[['⌨', 'Input', 'Blocks prompt injection, jailbreaks, and persona hijacks before they reach the model.'],
          ['🗄', 'Retrieval', 'Stops over-broad EHR access that pulls restricted patient records into context.'],
          ['⚙', 'Tool / Action', 'Refuses destructive or out-of-policy actions the agent should never take.'],
          ['📤', 'Output', 'Redacts PHI, IDs, and credentials in the response — regex plus an LLM judge.']].map(([i, t, d]) => (
          <div key={t} className="glass p-5">
            <div className="text-2xl mb-2.5">{i}</div>
            <h3 className="text-[15px] mb-1.5 font-semibold">{t}</h3>
            <p className="text-[12.5px] text-muted leading-relaxed">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-[11px] tracking-[1.6px] uppercase text-faint font-bold mt-9 mb-3">Pricing</div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass p-7">
          <div className="text-sm text-muted font-semibold">Adversarial audit</div>
          <div className="text-[38px] font-extrabold my-2">€12,000 <span className="text-sm text-muted font-semibold">one-off</span></div>
          <ul className="flex flex-col gap-2.5 mt-3.5 text-[13px]">
            {['We attack your live agent', 'Signed PDF for your DPIA', 'Bookable on one call', 'No integration needed'].map((x) => (
              <li key={x} className="flex gap-2.5"><span className="text-accent font-extrabold">✓</span>{x}</li>
            ))}
          </ul>
          <button onClick={() => nav('/crm')} className="mt-4 w-full py-3 rounded-xl font-semibold border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition">Book audit</button>
        </div>
        <div className="glass p-7 border-accent/40 shadow-[0_0_30px_rgba(0,229,192,0.1)]">
          <div className="text-sm text-muted font-semibold">Continuous monitoring</div>
          <div className="text-[38px] font-extrabold my-2">€2,500 <span className="text-sm text-muted font-semibold">/ month</span></div>
          <ul className="flex flex-col gap-2.5 mt-3.5 text-[13px]">
            {['4 chokepoints, always on', 'Quarterly re-audit', 'Real-time breach alerts', 'Board + AEPD evidence'].map((x) => (
              <li key={x} className="flex gap-2.5"><span className="text-accent font-extrabold">✓</span>{x}</li>
            ))}
          </ul>
          <button onClick={() => nav('/console')} className="mt-4 w-full py-3 rounded-xl font-semibold border border-white/10 bg-surface hover:bg-elevated transition">See the engine</button>
        </div>
      </div>
    </div>
  );
}
