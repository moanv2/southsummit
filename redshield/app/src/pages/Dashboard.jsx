import { useStore } from '../store';
import { NODES, NLAB } from '../lib/attacks';
import { Zap, AlertTriangle, Flame, Euro, ShieldCheck, Dot, NODE_ICON } from '../components/Icons';

function Metric({ Ic, color, label, value }) {
  return (
    <div className="glass p-5">
      <div className="w-11 h-11 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center text-xl mb-3.5" style={{ color: color || 'var(--color-accent)' }}><Ic /></div>
      <div className="text-xs text-muted font-medium">{label}</div>
      <div className="text-[30px] font-extrabold mt-1 tnum" style={color ? { color } : undefined}>{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const { audits, prospects, activity } = useStore();
  const br = audits.filter((a) => a.verdict === 'breach');
  const crit = br.filter((a) => a.severity === 'critical').length;
  const pipeline = prospects.reduce((s, p) => s + p.value, 0);
  const byNode = {}; NODES.forEach((n) => (byNode[n.k] = 0));
  br.forEach((a) => { byNode[a.chokepoint] = (byNode[a.chokepoint] || 0) + 1; });
  const maxN = Math.max(1, ...Object.values(byNode));
  const eur = (n) => '€' + n.toLocaleString();

  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Metric Ic={Zap} label="Attacks run" value={audits.length} />
        <Metric Ic={AlertTriangle} color="var(--color-danger)" label="Breaches caught" value={br.length} />
        <Metric Ic={Flame} color="var(--color-warning)" label="Critical findings" value={crit} />
        <Metric Ic={Euro} label="Pipeline value" value={eur(pipeline)} />
      </div>

      <div className="text-[11px] tracking-[1.6px] uppercase text-faint font-bold mt-7 mb-3">Breaches by chokepoint</div>
      <div className="glass p-[18px] flex flex-col gap-2.5">
        {NODES.map((n) => { const NI = NODE_ICON[n.k]; return (
          <div key={n.k} className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-muted basis-[130px] shrink-0"><NI className="text-[14px] text-faint" /> {n.l}</span>
            <div className="flex-1 h-[22px] bg-white/5 rounded-md overflow-hidden">
              <div className="h-full rounded-md bg-gradient-to-r from-danger to-warning flex items-center justify-end pr-2 text-[11px] font-bold text-white min-w-[28px] transition-all duration-700"
                   style={{ width: `${(byNode[n.k] / maxN) * 100 || 4}%` }}>{byNode[n.k] || 0}</div>
            </div>
          </div>
        ); })}
      </div>

      <div className="text-[11px] tracking-[1.6px] uppercase text-faint font-bold mt-7 mb-3">Recent activity</div>
      <div className="glass py-1.5">
        {activity.length ? activity.slice(0, 8).map((act, i) => (
          <div key={i} className="flex gap-3 px-[18px] py-[11px] border-b border-white/[0.06] last:border-0 items-center">
            <div className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-sm shrink-0"
                 style={{ background: act.t === 'breach' ? 'rgba(239,68,68,.15)' : act.t === 'blocked' ? 'rgba(0,229,192,.12)' : 'var(--color-surface)', color: act.t === 'breach' ? 'var(--color-danger)' : 'var(--color-accent)' }}>
              {act.t === 'breach' ? <AlertTriangle /> : act.t === 'blocked' ? <ShieldCheck /> : <Dot className="text-[10px]" />}
            </div>
            <div><div className="text-[13px] font-semibold">{act.title}</div><div className="text-[11px] text-muted">{act.sub}</div></div>
            <div className="ml-auto text-[11px] text-faint">{act.ago}</div>
          </div>
        )) : <div className="p-12 text-center text-faint text-[13px]">No activity yet. Run an attack in the Live Console.</div>}
      </div>
    </div>
  );
}
