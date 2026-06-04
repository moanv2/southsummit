import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STAGES = ['Lead', 'Contacted', 'Audit booked', 'Audit delivered', 'Monitoring'];

const SEED = [
  { id: 1, name: 'Quirónsalud Barcelona', city: 'Barcelona · 450 beds', dpo: 'Elena Vidal', stage: 'Audit booked', value: 12000, audits: [] },
  { id: 2, name: 'Vithas Madrid', city: 'Madrid · 320 beds', dpo: 'Marc Soler', stage: 'Contacted', value: 12000, audits: [] },
  { id: 3, name: 'HM Hospitales', city: 'Madrid · 600 beds', dpo: 'Carla Ruiz', stage: 'Lead', value: 42000, audits: [] },
  { id: 4, name: 'Hospital Sant Pau', city: 'Barcelona · 700 beds', dpo: 'Jordi Mas', stage: 'Monitoring', value: 30000, audits: [] },
  { id: 5, name: 'Ribera Salud', city: 'Valencia · 280 beds', dpo: 'Ana Gil', stage: 'Lead', value: 12000, audits: [] },
  { id: 6, name: 'Sanitas / IDC', city: 'Madrid · 500 beds', dpo: 'Luis Peña', stage: 'Audit delivered', value: 30000, audits: [] },
];

export { STAGES };

export const useStore = create(
  persist(
    (set, get) => ({
      audits: [],
      activity: [],
      prospects: SEED,
      activeHospitalId: null,
      // session-only (not persisted)
      shieldOn: false,
      liveMode: false,
      apiKey: '',

      setShield: (v) => set({ shieldOn: v }),
      setLiveMode: (v) => set({ liveMode: v }),
      setApiKey: (v) => set({ apiKey: v }),
      setActiveHospital: (id) => set({ activeHospitalId: id }),

      addAudit: (a) => set((s) => {
        const audits = [a, ...s.audits].slice(0, 100);
        const activity = [
          {
            t: a.verdict,
            title: `${a.attack} — ${a.verdict === 'breach' ? 'BREACH' : a.verdict === 'blocked' ? 'blocked by shield' : 'agent held'}`,
            sub: `${a.hospitalName || 'Triage Copilot'} · ${a.mode} · ${a.shieldOn ? 'shield on' : 'shield off'}`,
            ago: 'just now',
          },
          ...s.activity,
        ].slice(0, 30);
        let prospects = s.prospects;
        if (a.hospitalId) {
          prospects = s.prospects.map((p) =>
            p.id === a.hospitalId ? { ...p, audits: [a, ...(p.audits || [])].slice(0, 50) } : p
          );
        }
        return { audits, activity, prospects };
      }),

      moveProspect: (id, dir) => set((s) => {
        const prospects = s.prospects.map((p) => {
          if (p.id !== id) return p;
          const i = STAGES.indexOf(p.stage) + dir;
          if (i < 0 || i >= STAGES.length) return p;
          return { ...p, stage: STAGES[i] };
        });
        const moved = prospects.find((p) => p.id === id);
        const activity = [
          { t: 'move', title: `${moved.name} → ${moved.stage}`, sub: 'CRM pipeline update', ago: 'just now' },
          ...s.activity,
        ].slice(0, 30);
        return { prospects, activity };
      }),

      addProspect: (p) => set((s) => ({ prospects: [...s.prospects, { ...p, id: Date.now(), audits: [] }] })),

      clearAudits: () => set({ audits: [], activity: [] }),
    }),
    {
      name: 'redshield-react',
      partialize: (s) => ({ audits: s.audits, activity: s.activity, prospects: s.prospects }),
      merge: (persisted, current) => {
        const merged = { ...current, ...persisted };
        if (!merged.prospects || !merged.prospects.length) merged.prospects = SEED;
        return merged;
      },
    }
  )
);
