import { useStore } from '../store';
import { NLAB } from '../lib/attacks';

const esc = (s) => (s || '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function buildReport(audits) {
  const br = audits.filter((x) => x.verdict === 'breach');
  const rows = audits.map((x) => `<tr><td>${esc(x.attack)}</td><td>${NLAB[x.chokepoint] || x.chokepoint}</td><td class="${x.verdict === 'breach' ? 'b' : 'g'}">${x.verdict === 'breach' ? 'BREACH' : x.verdict === 'blocked' ? 'blocked' : 'held'}</td><td>${x.severity}</td><td>${esc(x.hospitalName || 'Triage Copilot')}</td></tr>`).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>RedShield Audit Report</title><style>body{font-family:Georgia,serif;max-width:780px;margin:40px auto;padding:0 24px;color:#16203a;line-height:1.55}h1{color:#00897b;border-bottom:3px solid #00897b;padding-bottom:10px}h2{font-size:14px;text-transform:uppercase;letter-spacing:1px;color:#00897b;margin-top:26px}.kpi{display:flex;gap:20px;margin:16px 0}.kpi div{flex:1;border:1px solid #ddd;border-radius:8px;padding:12px;text-align:center}.kpi .n{font-size:24px;font-weight:bold}.c{color:#c0392b}table{width:100%;border-collapse:collapse;font-size:13px;margin-top:8px}th{background:#00897b;color:#fff;text-align:left;padding:7px 9px;font-size:11px;text-transform:uppercase}td{border-bottom:1px solid #eee;padding:7px 9px}.b{color:#c0392b;font-weight:bold}.g{color:#1a7f54;font-weight:bold}.foot{margin-top:28px;font-size:11px;color:#888;border-top:1px solid #ddd;padding-top:10px}</style></head><body>
  <h1>RedShield Clinical — Adversarial Audit Report</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  <div class="kpi"><div><div class="n">${audits.length}</div>attacks</div><div><div class="n c">${br.length}</div>breaches</div><div><div class="n">${br.filter((x) => x.severity === 'critical').length}</div>critical</div></div>
  <h2>Findings</h2><table><tr><th>Attack</th><th>Chokepoint</th><th>Result</th><th>Severity</th><th>Target</th></tr>${rows}</table>
  <h2>Recommendation</h2><p>${br.length ? `The unguarded agent leaked protected data in <b>${br.length} of ${audits.length}</b> tested attacks. Deploy the RedShield 4-chokepoint guardrail and re-test before go-live. This report is evidence for the mandatory DPIA under GDPR Art. 35 / LOPDGDD.` : 'No breaches recorded. Expand the attack set and schedule recurring red-teaming.'}</p>
  <p class="foot">RedShield Clinical · synthetic demo data · evidence artifact for the Data Protection Officer.</p></body></html>`;
}

export default function Reports() {
  const { audits, clearAudits } = useStore();
  const br = audits.filter((x) => x.verdict === 'breach').length;

  function download() {
    const blob = new Blob([buildReport(audits)], { type: 'text/html' });
    const u = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = u; a.download = 'RedShield_Audit_Report.html';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(u), 2000);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-[13px] text-muted">{audits.length} attack(s) recorded · {br} breaches</div>
        <div className="flex gap-2.5">
          <button onClick={download} disabled={!audits.length} className="relative overflow-hidden px-[18px] py-2.5 rounded-[11px] font-semibold text-[13px] border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition disabled:opacity-40">⬇ Generate audit report</button>
          {audits.length > 0 && <button onClick={() => confirm('Clear all recorded audits?') && clearAudits()} className="px-[18px] py-2.5 rounded-[11px] font-semibold text-[13px] border border-white/10 bg-surface hover:bg-elevated transition">Clear</button>}
        </div>
      </div>
      {audits.length ? (
        <div className="flex flex-col gap-2.5">
          {audits.map((x) => (
            <div key={x.id} className="glass flex items-center gap-3.5 px-4 py-3.5">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-surface border border-white/[0.06] flex items-center justify-center text-[17px] text-accent">{x.verdict === 'breach' ? '⚠' : x.verdict === 'blocked' ? '🛡' : '✓'}</div>
              <div>
                <div className="text-[13.5px] font-bold">{x.attack}</div>
                <div className="text-[11px] text-muted">{NLAB[x.chokepoint] || x.chokepoint} · {x.mode} · {x.hospitalName || 'Triage Copilot'} · {new Date(x.ts).toLocaleString()}</div>
              </div>
              <div className="ml-auto">
                <span className="text-[9.5px] font-extrabold tracking-[0.5px] px-2 py-[3px] rounded-[5px] uppercase" style={{ background: x.severity === 'critical' ? 'var(--color-danger)' : x.severity === 'high' ? 'var(--color-warning)' : 'var(--color-accent)', color: x.severity === 'high' ? '#1a1402' : x.severity === 'none' ? '#04130d' : '#fff' }}>
                  {x.verdict === 'breach' ? x.severity : x.verdict}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : <div className="glass p-12 text-center text-faint text-[13px]">No audits yet. Run attacks in the Live Console — they appear here as DPIA evidence.</div>}
    </div>
  );
}
