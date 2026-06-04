// Shared SVG icon set (Lucide-derived). Sized at 1em so each icon inherits the
// font-size of its slot; color follows currentColor. Replaces emoji across the app.
const Ic = (children) => (p) => (
  <svg
    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" width="1em" height="1em"
    style={{ display: 'inline-block', verticalAlign: '-0.125em', flexShrink: 0 }} {...p}
  >{children}</svg>
);

export const Shield = Ic(<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />);
export const ShieldCheck = Ic(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>);
export const Globe = Ic(<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" /></>);
export const Grid = Ic(<><rect x="3" y="3" width="7.5" height="7.5" rx="1.2" /><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" /><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" /><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" /></>);
export const Zap = Ic(<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />);
export const Clock = Ic(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const FileText = Ic(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6M9 17h6" /></>);
export const Keyboard = Ic(<><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8" /></>);
export const Database = Ic(<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>);
export const Wrench = Ic(<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6Z" />);
export const Send = Ic(<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></>);
export const AlertTriangle = Ic(<><path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" /><path d="M12 9v4M12 17h.01" /></>);
export const AlertCircle = Ic(<><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></>);
export const Flame = Ic(<path d="M12 2c.7 3 3.5 4.6 3.5 8.5a3.5 3.5 0 0 1-7 0c0-1.2.5-2.2 1.2-3 .3 1.8 1.8 1.9 1.8.3 0-1.8-1-3 .5-5.8Z" />);
export const Euro = Ic(<><path d="M15.5 6.5A6 6 0 1 0 15.5 17.5" /><path d="M5 10.5h7M5 13.5h6" /></>);
export const Sparkles = Ic(<path d="M12 3.5 13.9 9 19.5 11l-5.6 2-1.9 5.5L10.1 13 4.5 11l5.6-2 1.9-5.5Z" />);
export const Download = Ic(<><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 20h14" /></>);
export const Check = Ic(<path d="m5 12 5 5 9-11" />);
export const X = Ic(<path d="M6 6 18 18M18 6 6 18" />);
export const ChevronLeft = Ic(<path d="m15 6-6 6 6 6" />);
export const ChevronRight = Ic(<path d="m9 6 6 6-6 6" />);
export const Plus = Ic(<path d="M12 5v14M5 12h14" />);
export const Dot = Ic(<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />);
export const Columns = Ic(<><rect x="3" y="4" width="6" height="16" rx="1.2" /><rect x="10.5" y="4" width="6" height="11" rx="1.2" /><rect x="18" y="4" width="3" height="16" rx="1.2" /></>);
export const Layers = Ic(<><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>);
export const TrendingUp = Ic(<><path d="M3 17 9 11l4 4 8-8" /><path d="M16 7h5v5" /></>);

// Maps the NODES[].k chokepoint key to its icon component.
export const NODE_ICON = { input: Keyboard, retrieval: Database, tool: Wrench, output: Send };
