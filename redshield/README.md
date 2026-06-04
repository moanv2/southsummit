# RedShield Clinical

A security layer that sits in front of hospital AI agents: red-teaming them and
blocking prompt injection, PHI exposure, tool misuse, and data exfiltration, so a
clinical agent cannot be tricked into leaking patient data.

> Separate idea from the Glass Box demo in the repo root (that one targets SAP
> S/4HANA copilots). Kept here as a backup of the founder materials and the MVP.

## Files

| File | What it is |
|------|------------|
| `RedShield_MVP.html` | Interactive demo. Demo mode (offline, deterministic) + Live mode (real Claude calls with your Anthropic key) + custom-attack box + downloadable audit report. Open in any browser. |
| `RedShield_Founder_Brief.html` | One-page visual founder brief (print to PDF). |
| `RedShield_Master_Brief.md` | Full founder brief: problem, demand, user, wedge, market, business model, competitor gap, exit thesis, regulatory hook. |
| `RedShield_Master_Brief.pdf` | Rendered PDF of the master brief. |
| `RedShield_EU_Regulatory_Brief.md` | Sourced research on GDPR / LOPDGDD / EU AI Act and the AEPD enforcement landscape. |

## The wedge

A one-time adversarial audit of a hospital's live AI agent, delivered as signed
evidence for the DPO's mandatory DPIA. Beachhead: Spain, private hospital groups.

All demo data is synthetic. The MVP is not connected to any real EHR.
