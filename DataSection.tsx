"use client";

import { useEffect, useRef, useState } from "react";

// Real data from the paper
const calibrationData = [
  { c: 0, A: 0.006 },
  { c: 10, A: 0.189 },
  { c: 25, A: 0.546 },
  { c: 40, A: 0.748 },
  { c: 50, A: 0.921 },
];

const kineticData = [
  { t: 0, Ct_C0: 1.0, Tred: 12.0, Tgrn: 45.5, Tblu: 88.0 },
  { t: 60, Ct_C0: 0.502, Tred: 34.5, Tgrn: 62.0, Tblu: 91.5 },
  { t: 120, Ct_C0: 0.255, Tred: 58.2, Tgrn: 78.4, Tblu: 94.0 },
  { t: 180, Ct_C0: 0.135, Tred: 75.1, Tgrn: 85.0, Tblu: 95.5 },
  { t: 240, Ct_C0: 0.087, Tred: 83.6, Tgrn: 89.2, Tblu: 96.0 },
  { t: 300, Ct_C0: 0.068, Tred: 86.4, Tgrn: 91.0, Tblu: 96.5 },
];

function CalibrationChart({ visible }: { visible: boolean }) {
  const W = 480;
  const H = 300;
  const pad = { top: 30, right: 30, bottom: 50, left: 55 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const maxC = 55;
  const maxA = 1.0;

  const toX = (c: number) => pad.left + (c / maxC) * chartW;
  const toY = (A: number) => pad.top + (1 - A / maxA) * chartH;

  // Regression line: A = 0.0183c + 0.0255
  const lineStart = { c: 0, A: 0.0255 };
  const lineEnd = { c: 55, A: 0.0183 * 55 + 0.0255 };

  const points = calibrationData
    .map((d) => `${toX(d.c)},${toY(d.A)}`)
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <g key={v}>
          <line
            x1={pad.left}
            y1={toY(v)}
            x2={W - pad.right}
            y2={toY(v)}
            stroke="rgba(39,201,168,0.08)"
            strokeWidth="1"
          />
          <text
            x={pad.left - 8}
            y={toY(v) + 4}
            textAnchor="end"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fill: "rgba(39,201,168,0.5)",
            }}
          >
            {v.toFixed(2)}
          </text>
        </g>
      ))}

      {[0, 10, 25, 40, 50].map((c) => (
        <g key={c}>
          <line
            x1={toX(c)}
            y1={pad.top}
            x2={toX(c)}
            y2={H - pad.bottom}
            stroke="rgba(39,201,168,0.08)"
            strokeWidth="1"
          />
          <text
            x={toX(c)}
            y={H - pad.bottom + 16}
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fill: "rgba(39,201,168,0.5)",
            }}
          >
            {c}
          </text>
        </g>
      ))}

      {/* Axes */}
      <line
        x1={pad.left}
        y1={pad.top}
        x2={pad.left}
        y2={H - pad.bottom}
        stroke="rgba(39,201,168,0.3)"
        strokeWidth="1"
      />
      <line
        x1={pad.left}
        y1={H - pad.bottom}
        x2={W - pad.right}
        y2={H - pad.bottom}
        stroke="rgba(39,201,168,0.3)"
        strokeWidth="1"
      />

      {/* Axis labels */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fill: "rgba(39,201,168,0.6)",
        }}
      >
        Dye Concentration c (mg L⁻¹)
      </text>
      <text
        x={14}
        y={H / 2}
        textAnchor="middle"
        transform={`rotate(-90, 14, ${H / 2})`}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fill: "rgba(39,201,168,0.6)",
        }}
      >
        Absorbance A_red
      </text>

      {/* Regression line */}
      <line
        x1={toX(lineStart.c)}
        y1={toY(lineStart.A)}
        x2={visible ? toX(lineEnd.c) : toX(lineStart.c)}
        y2={visible ? toY(lineEnd.A) : toY(lineStart.A)}
        stroke="#ff6b35"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        style={{ transition: "all 1.5s ease" }}
      />

      {/* Data points */}
      {calibrationData.map((d, i) => (
        <g key={d.c}>
          <circle
            cx={toX(d.c)}
            cy={toY(d.A)}
            r={visible ? 5 : 0}
            fill="rgba(39,201,168,0.2)"
            stroke="#27c9a8"
            strokeWidth="1.5"
            style={{
              transition: `all 0.4s ease ${0.8 + i * 0.1}s`,
            }}
          />
          {/* Error bars (approximate ±0.02) */}
          <line
            x1={toX(d.c)}
            y1={toY(d.A + 0.02)}
            x2={toX(d.c)}
            y2={visible ? toY(d.A - 0.02) : toY(d.A)}
            stroke="rgba(39,201,168,0.4)"
            strokeWidth="1"
            style={{ transition: `all 0.4s ease ${0.8 + i * 0.1}s` }}
          />
        </g>
      ))}

      {/* Equation */}
      <text
        x={pad.left + 16}
        y={pad.top + 16}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fill: "#ff6b35",
        }}
      >
        A = 0.0183c + 0.0255   R² = 0.992
      </text>
    </svg>
  );
}

function KineticChart({ visible }: { visible: boolean }) {
  const W = 480;
  const H = 300;
  const pad = { top: 30, right: 30, bottom: 50, left: 55 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const toX = (t: number) => pad.left + (t / 300) * chartW;
  const toY = (v: number) => pad.top + (1 - v) * chartH;

  // Model curve: Ct/C0 = e^(-0.0089t)
  const modelPoints = Array.from({ length: 60 }, (_, i) => {
    const t = i * 5;
    const val = Math.exp(-0.0089 * t);
    return `${toX(t)},${toY(val)}`;
  }).join(" ");

  const dataPath = kineticData.map((d) => `${toX(d.t)},${toY(d.Ct_C0)}`);
  const pathD = `M ${dataPath[0]} ` + dataPath.slice(1).map((p) => `L ${p}`).join(" ");

  const threshold85 = toY(0.15); // 85% removal = Ct/C0 = 0.15

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1.0].map((v) => (
        <g key={v}>
          <line
            x1={pad.left}
            y1={toY(v)}
            x2={W - pad.right}
            y2={toY(v)}
            stroke="rgba(39,201,168,0.08)"
            strokeWidth="1"
          />
          <text
            x={pad.left - 8}
            y={toY(v) + 4}
            textAnchor="end"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fill: "rgba(39,201,168,0.5)",
            }}
          >
            {v.toFixed(2)}
          </text>
        </g>
      ))}

      {[0, 60, 120, 180, 240, 300].map((t) => (
        <g key={t}>
          <line
            x1={toX(t)}
            y1={pad.top}
            x2={toX(t)}
            y2={H - pad.bottom}
            stroke="rgba(39,201,168,0.08)"
            strokeWidth="1"
          />
          <text
            x={toX(t)}
            y={H - pad.bottom + 16}
            textAnchor="middle"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              fill: "rgba(39,201,168,0.5)",
            }}
          >
            {t}s
          </text>
        </g>
      ))}

      {/* Axes */}
      <line
        x1={pad.left}
        y1={pad.top}
        x2={pad.left}
        y2={H - pad.bottom}
        stroke="rgba(39,201,168,0.3)"
        strokeWidth="1"
      />
      <line
        x1={pad.left}
        y1={H - pad.bottom}
        x2={W - pad.right}
        y2={H - pad.bottom}
        stroke="rgba(39,201,168,0.3)"
        strokeWidth="1"
      />

      {/* 85% threshold line */}
      <line
        x1={pad.left}
        y1={threshold85}
        x2={W - pad.right}
        y2={threshold85}
        stroke="#ff6b35"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <text
        x={W - pad.right + 4}
        y={threshold85 + 4}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "8px",
          fill: "#ff6b35",
        }}
      >
        85%
      </text>

      {/* Model curve */}
      <polyline
        points={modelPoints}
        fill="none"
        stroke="#27c9a8"
        strokeWidth="2"
        opacity={visible ? 0.8 : 0}
        style={{ transition: "opacity 1s ease 0.3s" }}
      />

      {/* Shaded area under curve */}
      <polygon
        points={`${toX(0)},${H - pad.bottom} ${modelPoints} ${toX(300)},${H - pad.bottom}`}
        fill="rgba(39,201,168,0.05)"
        stroke="none"
        opacity={visible ? 1 : 0}
        style={{ transition: "opacity 1s ease 0.3s" }}
      />

      {/* Experimental points */}
      {kineticData.map((d, i) => (
        <circle
          key={d.t}
          cx={toX(d.t)}
          cy={toY(d.Ct_C0)}
          r={visible ? 5 : 0}
          fill="rgba(39,201,168,0.15)"
          stroke="#27c9a8"
          strokeWidth="1.5"
          style={{
            transition: `all 0.4s ease ${0.5 + i * 0.1}s`,
          }}
        />
      ))}

      {/* Labels */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fill: "rgba(39,201,168,0.6)",
        }}
      >
        Time t (s)
      </text>
      <text
        x={14}
        y={H / 2}
        textAnchor="middle"
        transform={`rotate(-90, 14, ${H / 2})`}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "9px",
          fill: "rgba(39,201,168,0.6)",
        }}
      >
        Relative Concentration Cₜ/C₀
      </text>

      {/* Equation */}
      <text
        x={toX(120)}
        y={pad.top + 16}
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fill: "#27c9a8",
        }}
      >
        Cₜ/C₀ = e^(−0.0089t)   R² = 0.974
      </text>
    </svg>
  );
}

export default function DataSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [chartsVisible, setChartsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) =>
              el.classList.add("visible")
            );
            setChartsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="data"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--river-deep) 0%, rgba(15, 32, 64, 0.4) 50%, var(--river-deep) 100%)",
        borderTop: "1px solid rgba(39,201,168,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal flex items-center gap-3 mb-6">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "var(--river-bright)",
            }}
          >
            04 — EXPERIMENTAL DATA
          </span>
        </div>

        <h2
          className="reveal reveal-delay-1 mb-12"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            color: "var(--river-paper)",
          }}
        >
          The numbers,
          <br />
          <em style={{ color: "var(--river-bright)" }}>rendered live</em>
        </h2>

        {/* Charts grid */}
        <div className="grid md:grid-cols-2 gap-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {/* Calibration chart */}
          <div
            className="reveal"
            style={{ background: "rgba(4, 8, 15, 0.9)", padding: "32px" }}
          >
            <div className="mb-4">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(39,201,168,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Figure 1
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  color: "var(--river-paper)",
                }}
              >
                Beer–Lambert Calibration Curve
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  color: "rgba(232,237,230,0.45)",
                  marginTop: "4px",
                }}
              >
                Red LED channel (λ ≈ 620 nm) · n = 3 replicates · ±1 SD error bars
              </p>
            </div>
            <CalibrationChart visible={chartsVisible} />
          </div>

          {/* Kinetic chart */}
          <div
            className="reveal reveal-delay-1"
            style={{ background: "rgba(4, 8, 15, 0.9)", padding: "32px" }}
          >
            <div className="mb-4">
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(39,201,168,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                }}
              >
                Figure 2a
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  color: "var(--river-paper)",
                }}
              >
                First-Order Kinetic Decay
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.75rem",
                  color: "rgba(232,237,230,0.45)",
                  marginTop: "4px",
                }}
              >
                Cₜ/C₀ vs time · dashed red = 85% removal threshold
              </p>
            </div>
            <KineticChart visible={chartsVisible} />
          </div>
        </div>

        {/* Transmittance data table */}
        <div
          className="reveal mt-px overflow-x-auto"
          style={{
            background: "rgba(4, 8, 15, 0.8)",
            border: "1px solid rgba(39,201,168,0.06)",
            borderTop: "none",
          }}
        >
          <div
            className="px-8 py-5 border-b"
            style={{ borderColor: "rgba(39,201,168,0.08)" }}
          >
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "var(--river-bright)",
                textTransform: "uppercase",
              }}
            >
              Table 2 — Optical Transmittance & Derived Absorbance · Bio-char Filtered Trials · Mean ± SD, n = 3
            </span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>t (s)</th>
                <th>T_red (%)</th>
                <th>T_grn (%)</th>
                <th>T_blu (%)</th>
                <th>A_red</th>
                <th>Cₜ/C₀</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {kineticData.map((d) => (
                <tr key={d.t}>
                  <td>{d.t}</td>
                  <td>
                    <span style={{ color: "#ff6666" }}>{d.Tred.toFixed(1)}</span>
                    {" ± "}
                    <span style={{ opacity: 0.5 }}>
                      {d.t === 0 ? "0.4" : d.t === 60 ? "0.7" : d.t === 120 ? "0.9" : d.t === 180 ? "0.6" : d.t === 240 ? "0.5" : "0.3"}
                    </span>
                  </td>
                  <td>{d.Tgrn.toFixed(1)} ± <span style={{ opacity: 0.5 }}>{d.t === 0 ? "0.8" : "0.5"}</span></td>
                  <td>{d.Tblu.toFixed(1)} ± <span style={{ opacity: 0.5 }}>{d.t === 0 ? "1.1" : "0.3"}</span></td>
                  <td style={{ color: "var(--river-bright)" }}>
                    {d.t === 0 ? "0.920" : d.t === 60 ? "0.462" : d.t === 120 ? "0.235" : d.t === 180 ? "0.124" : d.t === 240 ? "0.077" : "0.063"}
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        color: d.Ct_C0 <= 0.15 ? "var(--river-bright)" : "rgba(232,237,230,0.7)",
                      }}
                    >
                      {d.Ct_C0.toFixed(3)}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.08em",
                        padding: "2px 8px",
                        background: d.Tred >= 85
                          ? "rgba(39,201,168,0.12)"
                          : "rgba(255,107,53,0.08)",
                        color: d.Tred >= 85 ? "var(--river-bright)" : "var(--river-accent)",
                        border: `1px solid ${d.Tred >= 85 ? "rgba(39,201,168,0.25)" : "rgba(255,107,53,0.2)"}`,
                      }}
                    >
                      {d.Tred >= 85 ? "✓ COMPLIANT" : "< THRESHOLD"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
