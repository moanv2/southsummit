import { useNavigate } from 'react-router-dom';
import { useStore, STAGES } from '../store';

export default function CRM() {
  const nav = useNavigate();
  const { prospects, moveProspect, addProspect, setActiveHospital } = useStore();
  const total = prospects.reduce((s, p) => s + p.value, 0);
  const eur = (n) => '€' + n.toLocaleString();

  function runAudit(p) {
    setActiveHospital(p.id);
    nav('/console');
  }
  function add() {
    const name = prompt('Hospital name?'); if (!name) return;
    const city = prompt('City · beds? (e.g. Sevilla · 300 beds)') || '—';
    const dpo = prompt('DPO name?') || '—';
    addProspect({ name, city, dpo, stage: 'Lead', value: 12000 });
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-1.5">
        {[['◷', 'Prospects', prospects.length], ['€', 'Pipeline value', eur(total), 'var(--color-accent)'], ['✦', 'In monitoring', prospects.filter((p) => p.stage === 'Monitoring').length, 'var(--color-warning)']].map(([ic, l, v, c]) => (
          <div key={l} className="glass p-5">
            <div className="w-11 h-11 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center text-xl mb-3.5" style={{ color: c || 'var(--color-accent)' }}>{ic}</div>
            <div className="text-xs text-muted font-medium">{l}</div>
            <div className="text-[30px] font-extrabold mt-1">{v}</div>
          </div>
        ))}
      </div>

      <div className="flex justify-end my-3.5">
        <button onClick={add} className="relative overflow-hidden px-[18px] py-2.5 rounded-[11px] font-semibold text-[13px] border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition">+ Add hospital</button>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-5 gap-3">
        {STAGES.map((stage) => {
          const list = prospects.filter((p) => p.stage === stage);
          return (
            <div key={stage} className="bg-[rgba(8,15,28,0.5)] border border-white/[0.06] rounded-[13px] p-3 min-h-[160px]">
              <h3 className="text-[11px] tracking-[0.6px] uppercase text-muted mb-2.5 flex justify-between font-semibold">{stage} <b className="text-accent">{list.length}</b></h3>
              {list.length ? list.map((p) => {
                const i = STAGES.indexOf(p.stage);
                const n = (p.audits || []).length;
                return (
                  <div key={p.id} className="bg-surface border border-white/[0.06] rounded-[10px] p-[11px] mb-2.5">
                    <div className="text-[13px] font-bold">{p.name}</div>
                    <div className="text-[11px] text-muted mt-0.5">{p.city} · DPO {p.dpo}</div>
                    <div className="text-[12px] text-accent font-bold mt-1.5">{eur(p.value)}{n ? <span className="text-faint font-normal"> · {n} audit{n > 1 ? 's' : ''}</span> : null}</div>
                    <div className="flex gap-1.5 mt-2.5">
                      {i > 0 && <button onClick={() => moveProspect(p.id, -1)} className="flex-1 text-[10px] border border-white/[0.06] rounded-md py-1.5 text-muted hover:border-accent hover:text-accent transition">◂ back</button>}
                      {i < STAGES.length - 1 && <button onClick={() => moveProspect(p.id, 1)} className="flex-1 text-[10px] border border-white/[0.06] rounded-md py-1.5 text-muted hover:border-accent hover:text-accent transition">advance ▸</button>}
                      <button onClick={() => runAudit(p)} className="flex-1 text-[10px] border border-accent/40 text-accent rounded-md py-1.5 hover:bg-accent/10 transition">audit ⚡</button>
                    </div>
                  </div>
                );
              }) : <div className="text-[11px] text-faint p-2">—</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
