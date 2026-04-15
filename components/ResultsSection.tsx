"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({
  target,
  suffix,
  duration = 1500,
  visible,
  decimal = 0,
}: {
  target: number;
  suffix: string;
  duration?: number;
  visible: boolean;
  decimal?: number;
}) {
  const [current, setCurrent] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!visible || startedRef.current) return;
    startedRef.current = true;

    const steps = 60;
    const increment = target / steps;
    let count = 0;

    const timer = setInterval(() => {
      count += 1;
      setCurrent(Math.min(count * increment, target));
      if (count >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [visible, target, duration]);

  return (
    <span>
      {decimal > 0 ? current.toFixed(decimal) : Math.floor(current)}
      {suffix}
    </span>
  );
}

const hypotheses = [
  {
    id: "H1",
    title: "Adsorption Efficiency",
    claim: "Anaerobic pyrolysis of Oryza sativa husks at ≈400°C produces bio-char achieving >90% pollutant-mass reduction.",
    result: "93% pollutant-mass removal over 300s continuous-flow operation.",
    status: "CONFIRMED",
  },
  {
    id: "H2",
    title: "Sensor Fidelity",
    claim: "An RGB-multiplexed LDR array governed by Beer–Lambert Law can serve as a high-fidelity, ultra-low-cost proxy for commercial spectrophotometry.",
    result: "R² = 0.992 calibration. Concentration resolution ≤0.5 mg/L — below the 2 mg/L detection limit.",
    status: "CONFIRMED",
  },
  {
    id: "H3",
    title: "Automation",
    claim: "A cloud-integrated state manager can integrate first-order kinetic differential equations in real time and autonomously generate compliance reports.",
    result: "k = (0.0089 ± 0.0003)/s extracted live. Compliance report triggered automatically at t = 264s mean.",
    status: "CONFIRMED",
  },
];

export default function ResultsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) =>
              el.classList.add("visible")
            );
            setVisible(true);
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
      id="results"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "var(--river-deep)",
        borderTop: "1px solid rgba(39,201,168,0.08)",
      }}
    >
      {/* Large background text */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(150px, 25vw, 300px)",
          color: "rgba(39,201,168,0.025)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        93%
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
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
            05 — RESULTS
          </span>
        </div>

        <h2
          className="reveal reveal-delay-1 mb-16"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.1,
            color: "var(--river-paper)",
          }}
        >
          All three hypotheses
          <br />
          <em style={{ color: "var(--river-bright)" }}>confirmed</em>
        </h2>

        {/* Big metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {[
            {
              val: 93,
              suf: "%",
              label: "Pollutant Mass Removal",
              sub: "over 300s",
              color: "var(--river-bright)",
            },
            {
              val: 0.992,
              suf: "",
              label: "Calibration R²",
              sub: "Beer–Lambert linearity",
              color: "var(--river-glow)",
              dec: 3,
            },
            {
              val: 0.0089,
              suf: " s⁻¹",
              label: "Rate Constant k",
              sub: "± 0.0003 s⁻¹",
              color: "var(--river-amber)",
              dec: 4,
            },
            {
              val: 264,
              suf: "s",
              label: "Compliance Trigger",
              sub: "mean across 3 trials",
              color: "var(--river-accent)",
            },
          ].map((m, i) => (
            <div
              key={m.label}
              className={`reveal reveal-delay-${i + 1} p-6 md:p-8`}
              style={{ background: "var(--river-deep)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                  color: m.color,
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                <AnimatedNumber
                  target={m.val}
                  suffix={m.suf}
                  visible={visible}
                  decimal={m.dec ?? 0}
                />
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(232,237,230,0.4)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  color: "rgba(232,237,230,0.3)",
                }}
              >
                {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Hypothesis confirmation */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {hypotheses.map((h, i) => (
            <div
              key={h.id}
              className={`reveal reveal-delay-${i + 2} p-6 md:p-8 flex flex-col`}
              style={{ background: "var(--river-deep)" }}
            >
              {/* Status */}
              <div className="flex items-center justify-between mb-5">
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "1.2rem",
                    color: "var(--river-bright)",
                    opacity: 0.4,
                  }}
                >
                  {h.id}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    color: "var(--river-bright)",
                    border: "1px solid rgba(39,201,168,0.4)",
                    padding: "3px 8px",
                    background: "rgba(39,201,168,0.06)",
                  }}
                >
                  {h.status}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  color: "var(--river-paper)",
                  marginBottom: "10px",
                }}
              >
                {h.title}
              </h4>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  lineHeight: 1.65,
                  color: "rgba(232,237,230,0.45)",
                  marginBottom: "16px",
                }}
              >
                {h.claim}
              </p>

              <div
                className="mt-auto pt-4"
                style={{ borderTop: "1px solid rgba(39,201,168,0.12)" }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 400,
                    fontSize: "0.82rem",
                    lineHeight: 1.6,
                    color: "rgba(232,237,230,0.75)",
                  }}
                >
                  {h.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Isotherm comparison */}
        <div
          className="reveal mt-px grid md:grid-cols-2 gap-px"
          style={{ background: "rgba(39,201,168,0.06)" }}
        >
          {[
            {
              model: "Freundlich",
              r2: "0.978",
              params: "1/n = 0.41, Kf = 8.7",
              verdict: "Superior fit",
              note: "Confirms heterogeneous pore-size distribution in rice-husk bio-char. Multi-layer adsorption via π–π and H-bonding.",
              winner: true,
            },
            {
              model: "Langmuir",
              r2: "0.961",
              params: "qₘ = 42.3 mg/g, KL = 0.027 L/mg",
              verdict: "Good fit, not dominant",
              note: "Monolayer assumption doesn't fully capture the heterogeneous nature of the bio-char surface.",
              winner: false,
            },
          ].map((m) => (
            <div
              key={m.model}
              className="p-6 md:p-8"
              style={{ background: "rgba(4, 8, 15, 0.8)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h4
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.3rem",
                    color: m.winner ? "var(--river-bright)" : "var(--river-paper)",
                  }}
                >
                  {m.model} Isotherm
                </h4>
                {m.winner && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "var(--river-bright)",
                      border: "1px solid rgba(39,201,168,0.3)",
                      padding: "3px 8px",
                      background: "rgba(39,201,168,0.06)",
                    }}
                  >
                    BEST FIT
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: "rgba(39,201,168,0.5)",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    R² VALUE
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.8rem",
                      color: m.winner ? "var(--river-bright)" : "rgba(232,237,230,0.6)",
                    }}
                  >
                    {m.r2}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.55rem",
                      color: "rgba(39,201,168,0.5)",
                      letterSpacing: "0.1em",
                      marginBottom: "4px",
                    }}
                  >
                    PARAMETERS
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "rgba(232,237,230,0.7)",
                    }}
                  >
                    {m.params}
                  </div>
                </div>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  lineHeight: 1.65,
                  color: "rgba(232,237,230,0.5)",
                }}
              >
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
