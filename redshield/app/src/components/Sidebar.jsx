import { NavLink } from 'react-router-dom';

const NAV = [
  { to: '/', ic: '🌐', label: 'Website', end: true },
  { to: '/dashboard', ic: '▢', label: 'Dashboard' },
  { to: '/console', ic: '⚡', label: 'Live Console' },
  { to: '/crm', ic: '◷', label: 'CRM Pipeline' },
  { to: '/reports', ic: '▤', label: 'Audit Reports' },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] shrink-0 border-r border-white/[0.06] bg-[rgba(8,15,28,0.6)] backdrop-blur-xl p-[22px_16px] flex flex-col gap-1.5 sticky top-0 h-screen">
      <div className="flex items-center gap-3 px-2 pb-[18px] border-b border-white/[0.06] mb-3">
        <svg viewBox="0 0 40 46" fill="none" className="w-[34px] h-[39px] drop-shadow-[0_0_10px_rgba(0,229,192,0.5)]">
          <path d="M20 1 L38 8 V22 C38 33 30 41 20 45 C10 41 2 33 2 22 V8 Z" fill="rgba(0,229,192,.1)" stroke="#00e5c0" strokeWidth="1.6" />
          <path d="M20 14 V30 M12 22 H28" stroke="#00e5c0" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <div>
          <h1 className="text-[17px] font-extrabold tracking-tight leading-none">Red<span className="text-accent text-glow">Shield</span></h1>
          <div className="text-[8.5px] tracking-[2px] uppercase text-faint mt-1 font-semibold">Clinical AI security</div>
        </div>
      </div>
      <nav className="flex flex-col gap-1 mt-1.5">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[13.5px] font-semibold cursor-pointer border transition-all ${
                isActive
                  ? 'bg-accent/10 border-accent/30 text-accent box-glow'
                  : 'text-muted border-transparent hover:bg-surface hover:text-text'
              }`
            }
          >
            <span className="w-[18px] text-center text-[15px]">{n.ic}</span>
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex-1" />
      <div className="flex items-center gap-2.5 p-2.5 border border-white/[0.06] rounded-[11px] bg-surface">
        <div className="w-[34px] h-[34px] rounded-[9px] bg-gradient-to-br from-accent to-blue flex items-center justify-center font-extrabold text-[#04130d] text-xs">MO</div>
        <div>
          <div className="text-[12.5px] font-bold">Marco Ortiz</div>
          <div className="text-[10px] text-muted">Founder</div>
        </div>
      </div>
    </aside>
  );
}
