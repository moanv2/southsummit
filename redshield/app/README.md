# RedShield Clinical — React app

The full platform as a deployable Vite + React 19 + Tailwind v4 + React Router app.
Design language matched to the Hospital Prediction System dashboard (mint accent,
Sora, gradient-mesh, glass cards).

Five connected views with shared state (zustand + localStorage):

- **Website** (`/`) — marketing landing, animated stats, pricing.
- **Dashboard** (`/dashboard`) — live metrics, breaches-by-chokepoint, activity feed.
- **Live Console** (`/console`) — adversarial demo: Demo mode (offline, deterministic)
  and **Live mode** (real Claude calls with your Anthropic key). Preset + custom attacks,
  animated 4-chokepoint pipeline, verdict, severity.
- **CRM Pipeline** (`/crm`) — hospital prospects as a kanban (Lead → Monitoring).
  The **audit ⚡** button targets a hospital and jumps to the Console; audits run there
  attach back to that hospital's record.
- **Audit Reports** (`/reports`) — every attack recorded; download a DPIA evidence report.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

Live mode calls `api.anthropic.com` directly from the browser; paste an Anthropic API
key in the Console. The key stays in memory (not persisted, not sent anywhere but Anthropic).

## Deploy (public URL)

Vercel auto-detects Vite. `vercel.json` adds the SPA rewrite for client-side routing.

```bash
npm i -g vercel
vercel        # follow prompts; or connect the repo at vercel.com
```

All demo data is synthetic. Not connected to any real EHR.
