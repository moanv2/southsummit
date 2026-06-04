# RedShield Clinical — EU / Spain Regulatory Brief
*Prepared 2026-06-04. For the Quirónsalud (via Joe Haslam) conversation. Beachhead = EU/Spain (GDPR + LOPDGDD), NOT US/HIPAA.*

---

## TL;DR — the strategic correction
Your obligation hook is **not** the EU AI Act (delayed to 2027–2028, and its named "red-teaming" rule targets frontier general-purpose models, not hospital deployers). The real, enforceable-today hook is **GDPR Article 32 (TOMs) + LOPDGDD mandatory DPIA for large-scale special-category (health) data**, enforced by the **AEPD — the most aggressive DPA in Europe**. Pitch the audit as the *evidence that the legally required controls actually work*, not as future-proofing.

---

## 1. EU AI Act — relevant but secondary, and delayed
- **High-risk standalone AI systems:** full obligations now apply from **2 December 2027** (pushed back from Aug 2026).
- **AI as / in regulated medical devices (SaMD under MDR/IVDR):** **2 August 2028** (or ~Aug 2027 for CE-marked devices under Notified Body review).
- **Watermarking / provenance labelling of AI content:** from **2 December 2026**.
- **Article 15 (Accuracy, Robustness, Cybersecurity):** high-risk AI "shall be resilient against attempts by unauthorised third parties to alter their use, outputs or performance by exploiting system vulnerabilities." Named threats: **data poisoning, model poisoning, adversarial examples / model evasion, confidentiality attacks.** → This is the *substance* of what RedShield tests, but the Act does NOT explicitly command "hire a red team" for deployers.
- **Explicit "red-teaming" obligation:** applies to **general-purpose AI models with systemic risk** (frontier labs), **not** a hospital running a clinical agent. ⚠️ Do not overclaim this in the pitch.

**Takeaway:** Use the AI Act as the *direction of travel* ("this is becoming mandatory, get ahead of it"), not as the present-day stick.

## 2. GDPR + LOPDGDD — the real, present-day obligation
- **Health data = special category** (GDPR Art. 9), processing generally prohibited absent a legal basis; LOPDGDD requires a law-level instrument for public-interest/health processing.
- **Mandatory DPIA:** AEPD requires a DPIA for **large-scale processing of special-category data**. An AI agent over patient records qualifies. The DPIA is already required; an adversarial audit is the natural way to evidence it.
- **Mandatory DPO:** LOPDGDD Art. 34 requires a Data Protection Officer for healthcare institutions **regardless of size** → there is always a named, legally accountable human (your buyer or buyer-adjacent).
- **Article 32 TOMs:** "appropriate technical and organisational measures." The **#1 healthcare fine cause in 2025 was lack of sufficient TOMs** (100 fines, €22.8M total).
- **Named 2025 failure mode:** "software that allowed medical personnel to access more patient data than necessary" → maps directly to RedShield's **tool-misuse / over-broad-access** attack surface.

## 3. Enforcement reality — AEPD is aggressive
- **AEPD 2025:** 299 fines totalling **€40M**, +14% YoY (prior record €35.5M). Most prolific DPA in Europe.
- **Spanish healthcare precedent:** **Marina Salud fined €500,000 (April 2025)** over handling of sensitive health data + breach-notification failures.
- **Sector trend:** EU-wide, 265 healthcare fines ≈ €32.3M; new healthcare fines in 2025 up **26%** vs prior period.
- **GDPR ceiling:** up to **4% of global annual turnover** (vs HIPAA's smaller, capped tiers) — the EU downside is *larger* than the US one.

## 4. Re-skinned pitch line (for Quirónsalud)
> "Your clinical AI agent processes special-category health data at scale. Under LOPDGDD that triggers a mandatory DPIA, and under GDPR Article 32 you must prove your technical measures actually work. The most-fined healthcare failure in Spain right now is exactly that — inadequate technical measures and agents/software accessing more patient data than needed. RedShield adversarially attacks your live agent and hands you dated, signed evidence that your controls hold — the artifact your DPO needs for the DPIA and the board, and the AEPD if they ever ask."

## 5. Open questions to verify on the call
1. Does Quirónsalud already run an AI agent on patient data, or is one in pilot? (No agent = no wedge yet.)
2. Who owns AI risk there — the DPO, the CISO, or a clinical informatics lead? (Confirm/replace the "Chief Privacy Officer" hypothesis.)
3. Have they done a DPIA for it? Did anyone adversarially test it, or just document it?
4. What would make them pay an outsider to attack their live agent — and what legal/IT hurdles block that?

---

### Sources
- [Trilateral Research — EU AI Act timeline by risk tier](https://trilateralresearch.com/responsible-ai/eu-ai-act-implementation-timeline-mapping-your-models-to-the-new-risk-tiers)
- [Travers Smith — EU agrees to delay key AI Act compliance deadlines](https://www.traverssmith.com/knowledge/knowledge-container/eu-agrees-to-delay-key-ai-act-compliance-deadlines/)
- [MDX CRO — EU AI Act for Medical Devices / SaMD deadlines](https://mdxcro.com/eu-ai-act-medical-devices-samd/)
- [EU AI Act — Article 15 (Accuracy, Robustness, Cybersecurity)](https://artificialintelligenceact.eu/article/15/)
- [Securiti — EU AI Act Article 15 explainer](https://securiti.ai/eu-ai-act/article-15/)
- [CMS — GDPR Enforcement Tracker Report: Life Science & Healthcare](https://cms.law/en/deu/publication/gdpr-enforcement-tracker-report/life-science-healthcare)
- [Spanish Compliance Institute — Why Spain issues more GDPR fines](https://spanishcomplianceinstitute.com/blogs/all/why-spain-issues-more-gdpr-fines)
- [bm.consulting — Data Protection in Spain: GDPR & LOPDGDD](https://bm.consulting/en/glossary/data-protection-spain/)
- [Recording Law — Spain Data Privacy Laws: GDPR, LOPDGDD & AEPD (2026)](https://www.recordinglaw.com/world-laws/world-data-privacy-laws/spain-data-privacy-laws/)
