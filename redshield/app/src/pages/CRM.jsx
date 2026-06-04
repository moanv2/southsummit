import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, STAGES } from '../store';
import { Columns, Euro, Sparkles, Zap, ChevronLeft, ChevronRight, Plus, X } from '../components/Icons';

const STAT_ICONS = [Columns, Euro, Sparkles];

export default function CRM() {
  const nav = useNavigate();
  const { prospects, moveProspect, addProspect, setActiveHospital } = useStore();
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: '', city: '', dpo: '' });
  const total = prospects.reduce((s, p) => s + p.value, 0);
  const eur = (n) => '€' + n.toLocaleString();

  function runAudit(p) {
    setActiveHospital(p.id);
    nav('/console');
  }
  function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    addProspect({ name: form.name.trim(), city: form.city.trim() || '—', dpo: form.dpo.trim() || '—', stage: 'Lead', value: 12000 });
    setForm({ name: '', city: '', dpo: '' });
    setModal(false);
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mb-1.5">
        {[['Prospects', prospects.length], ['Pipeline value', eur(total), 'var(--color-accent)'], ['In monitoring', prospects.filter((p) => p.stage === 'Monitoring').length, 'var(--color-warning)']].map(([l, v, c], i) => {
          const Ic = STAT_ICONS[i];
          return (
            <div key={l} className="glass p-5">
              <div className="w-11 h-11 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center text-xl mb-3.5" style={{ color: c || 'var(--color-accent)' }}><Ic /></div>
              <div className="text-xs text-muted font-medium">{l}</div>
              <div className="text-[30px] font-extrabold mt-1 tnum">{v}</div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-3.5">
        <button onClick={() => setModal(true)} className="relative inline-flex items-center gap-2 overflow-hidden px-[18px] py-2.5 rounded-[11px] font-semibold text-[13px] border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition"><Plus className="text-[15px]" /> Add hospital</button>
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
                    <div className="text-[12px] text-accent font-bold mt-1.5 tnum">{eur(p.value)}{n ? <span className="text-faint font-normal"> · {n} audit{n > 1 ? 's' : ''}</span> : null}</div>
                    <div className="flex gap-1.5 mt-2.5">
                      {i > 0 && <button onClick={() => moveProspect(p.id, -1)} className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] border border-white/[0.06] rounded-md py-1.5 text-muted hover:border-accent hover:text-accent transition"><ChevronLeft className="text-[12px]" /> back</button>}
                      {i < STAGES.length - 1 && <button onClick={() => moveProspect(p.id, 1)} className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] border border-white/[0.06] rounded-md py-1.5 text-muted hover:border-accent hover:text-accent transition">advance <ChevronRight className="text-[12px]" /></button>}
                      <button onClick={() => runAudit(p)} className="flex-1 inline-flex items-center justify-center gap-1 text-[10px] border border-accent/40 text-accent rounded-md py-1.5 hover:bg-accent/10 transition">audit <Zap className="text-[12px]" /></button>
                    </div>
                  </div>
                );
              }) : <div className="text-[11px] text-faint p-2">—</div>}
            </div>
          );
        })}
      </div>

      {modal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ animation: 'fadeup .2s ease' }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModal(false)} />
          <form onSubmit={submit} className="glass relative z-[1] w-full max-w-[400px] p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[17px] font-bold">Add hospital</h3>
              <button type="button" onClick={() => setModal(false)} className="text-muted hover:text-text text-[18px]"><X /></button>
            </div>
            {[['name', 'Hospital name', 'Hospital Universitari Vall d\'Hebron', true],
              ['city', 'City · beds', 'Barcelona · 1,100 beds', false],
              ['dpo', 'DPO name', 'Dr. Elena Vidal', false]].map(([k, label, ph, req]) => (
              <label key={k} className="flex flex-col gap-1.5">
                <span className="text-[11px] tracking-[0.5px] uppercase text-faint font-bold">{label}{req && <span className="text-danger"> *</span>}</span>
                <input
                  value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  placeholder={ph} autoFocus={k === 'name'} required={req}
                  className="bg-black/30 border border-white/[0.06] rounded-lg text-[13px] px-3 py-2.5 outline-none focus:border-accent transition"
                />
              </label>
            ))}
            <div className="flex gap-2.5 mt-1">
              <button type="button" onClick={() => setModal(false)} className="flex-1 py-2.5 rounded-[11px] font-semibold text-[13px] border border-white/10 bg-surface hover:bg-elevated transition">Cancel</button>
              <button type="submit" className="flex-1 py-2.5 rounded-[11px] font-semibold text-[13px] border border-accent/50 bg-accent/10 text-accent box-glow hover:bg-accent/20 transition">Add to pipeline</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
