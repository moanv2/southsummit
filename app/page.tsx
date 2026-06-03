"use client";

import { useState } from "react";
import { ATTACKS, CHOKEPOINT_LABELS } from "@/lib/attacks";
import type { AgentResult } from "./api/agent/route";

type RunState = Record<string, { loading: boolean; result: AgentResult | null }>;

const STATUS_ICON: Record<string, string> = {
  pass: "✓",
  blocked: "✕",
  skipped: "·",
};

export default function Home() {
  const [shieldOn, setShieldOn] = useState(false);
  const [runs, setRuns] = useState<RunState>({});
  const [leakCount, setLeakCount] = useState(0);
  const [liveModel, setLiveModel] = useState<boolean | null>(null);

  async function runAttack(attackId: string) {
    setRuns((r) => ({ ...r, [attackId]: { loading: true, result: null } }));
    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attackId, shieldOn }),
      });
      const result = (await res.json()) as AgentResult;
      setLiveModel(result.usingLiveModel);
      if (result.leaked) setLeakCount((c) => c + 1);
      setRuns((r) => ({ ...r, [attackId]: { loading: false, result } }));
    } catch {
      setRuns((r) => ({ ...r, [attackId]: { loading: false, result: null } }));
    }
  }

  function toggleShield() {
    setShieldOn((s) => !s);
    setRuns({}); // clear results so the same attacks can be re-run through the new mode
  }

  return (
    <main className="wrap">
      <header className="hero">
        <div>
          <h1>
            Glass <span className="box">Box</span>
          </h1>
          <p>
            An SAP S/4HANA copilot, wide open. Fire the attacks below and watch it
            leak HR master data, IBANs, and credentials. Then flip the shield and run
            the exact same attacks — every chokepoint holds.
            {liveModel !== null && (
              <span className="mode-badge">
                {liveModel ? "live model" : "offline demo mode"}
              </span>
            )}
          </p>
        </div>
        <div className="shield-toggle">
          <button
            className={`toggle-btn ${shieldOn ? "on" : ""}`}
            onClick={toggleShield}
          >
            <span className="dot" />
            Shield {shieldOn ? "ON" : "OFF"}
          </button>
          <span className="toggle-hint">
            {shieldOn ? "4 chokepoints enforcing policy" : "agent is unguarded"}
          </span>
          <span className="leak-counter">
            Successful leaks this session: <b>{leakCount}</b>
          </span>
        </div>
      </header>

      <div className="grid">
        {ATTACKS.map((attack) => {
          const run = runs[attack.id];
          const result = run?.result;
          return (
            <div className="card" key={attack.id}>
              <div className="card-head">
                <h3>{attack.title}</h3>
                <span className="chip">{CHOKEPOINT_LABELS[attack.chokepoint]}</span>
              </div>
              <p className="desc">{attack.description}</p>
              <div className="prompt-box">&ldquo;{attack.prompt}&rdquo;</div>
              <button
                className="run-btn"
                onClick={() => runAttack(attack.id)}
                disabled={run?.loading}
              >
                {run?.loading ? "Running…" : "Run attack ▸"}
              </button>

              {run?.loading && (
                <div className="result">
                  <span className="spinner" /> &nbsp;Agent thinking…
                </div>
              )}

              {result && (
                <div className={`result ${result.blocked ? "safe" : "leak"}`}>
                  <div className="verdict">
                    {result.blocked ? (
                      <>🛡 BLOCKED at {result.blockedAt} layer</>
                    ) : (
                      <>⚠ LEAKED — agent complied</>
                    )}
                  </div>
                  <div className="body">{result.finalResponse}</div>
                  <div className="stages">
                    {result.stages.map((s, i) => (
                      <div className={`stage ${s.status}`} key={i}>
                        <span className="ico">{STATUS_ICON[s.status]}</span>
                        <span className="sname">{s.label}</span>
                        <span>{s.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="foot">
        Glass Box · AI DLP for SAP S/4HANA copilots · all data synthetic · South Summit
      </div>
    </main>
  );
}
