import { useLocation } from 'react-router-dom';
import { useStore } from '../store';

const TITLES = {
  '/': { t: 'RedShield Clinical', c: 'Public site' },
  '/dashboard': { t: 'Overview', c: 'Internal · live metrics' },
  '/console': { t: 'Adversarial Console', c: 'Attack · inspect · block' },
  '/crm': { t: 'Sales Pipeline', c: 'Hospitals · audits · monitoring' },
  '/reports': { t: 'Audit Reports', c: 'DPIA evidence artifacts' },
};

export default function TopBar() {
  const { pathname } = useLocation();
  const meta = TITLES[pathname] || TITLES['/'];
  const breaches = useStore((s) => s.audits.filter((a) => a.verdict === 'breach').length);

  return (
    <div className="flex items-center justify-between gap-4 px-7 py-4 border-b border-white/[0.06] bg-[rgba(8,15,28,0.4)] backdrop-blur-md sticky top-0 z-[5]">
      <div>
        <h2 className="text-[19px] font-bold">{meta.t}</h2>
        <div className="text-[11px] text-faint mt-0.5 tracking-[0.3px]">{meta.c}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-[11.5px] text-muted border border-white/[0.06] rounded-full px-3 py-1.5 bg-surface">
          <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" style={{ animation: 'pulse-dot 1.8s infinite' }} />
          {breaches} breaches caught
        </div>
      </div>
    </div>
  );
}
