"use client";

import { useEffect, useRef } from "react";

const pipelineSteps = [
  {
    num: "01",
    title: "Rice Husk Sourcing",
    sub: "Oryza sativa, Dinajpur",
    desc: "Locally sourced agricultural waste from Dinajpur milling facilities. Cost reduced to transport logistics alone.",
    color: "var(--river-amber)",
  },
  {
    num: "02",
    title: "Anaerobic Pyrolysis",
    sub: "400°C, 30 min",
    desc: "Sealed crucible heated to 400 ± 10°C, producing highly porous bio-char with π–π dispersion sites and hydroxyl groups.",
    color: "var(--river-accent)",
  },
  {
    num: "03",
    title: "Continuous-Flow Column",
    sub: "15 mL/min, 50g bio-char",
    desc: "Clear acrylic column with graduated filter layers. Sand distributes flow evenly across the 80mm bio-char bed.",
    color: "var(--river-bright)",
  },
  {
    num: "04",
    title: "TDM Optical Array",
    sub: "ATmega328P, RGB LED/LDR",
    desc: "Time-Division-Multiplexed illumination cycles red, green, blue channels. Beer-Lambert Law converts transmittance to concentration.",
    color: "var(--river-glow)",
  },
  {
    num: "05",
    title: "Real-Time Dashboard",
    sub: "Node.js → WebSocket → Next.js",
    desc: "Serial bridge applies 5-point moving average filter, then continuously refits first-order kinetic model via weighted least squares.",
    color: "var(--river-bright)",
  },
  {
    num: "06",
    title: "Compliance Engine",
    sub: "SHA-256 tamper-evident PDF",
    desc: "Once Tred ≥ 85% is sustained for 10 seconds, PDFKit generates a cryptographically signed compliance report automatically.",
    color: "var(--river-accent)",
  },
];

export default function SolutionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) =>
              el.classList.add("visible")
            );
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="solution"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--river-deep) 0%, rgba(10,22,40,0.6) 50%, var(--river-deep) 100%)",
      }}
    >
      {/* Subtle background gradient blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(26, 107, 94, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--river-bright)",
                }}
              >
                02 — THE SOLUTION
              </span>
            </div>
            <h2
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.1,
                color: "var(--river-paper)",
              }}
            >
              Wastewater-to-
              <br />
              <em style={{ color: "var(--river-bright)" }}>Compliance</em>
              <br />
              in one pipeline
            </h2>
          </div>
          <div className="reveal reveal-delay-2 flex items-end">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(232, 237, 230, 0.6)",
              }}
            >
              From biomass carbonisation through real-time kinetic modelling to
              autonomous cryptographic compliance reporting — all for under 1000 BDT.
              Two to three orders of magnitude below commercial equivalents.
            </p>
          </div>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(39,201,168,0.3) 10%, rgba(39,201,168,0.3) 90%, transparent)",
            }}
          />

          <div className="flex flex-col gap-0">
            {pipelineSteps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} relative grid md:grid-cols-2 gap-0`}
              >
                {/* Left content */}
                <div
                  className={`flex items-start gap-5 p-6 md:p-8 ${i % 2 === 1 ? "md:order-last" : ""}`}
                >
                  {/* Step marker */}
                  <div
                    className="relative flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: "44px",
                      height: "44px",
                      border: `1px solid ${step.color}`,
                      background: "var(--river-deep)",
                    }}
                  >
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ background: step.color }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        color: step.color,
                      }}
                    >
                      {step.num}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        color: "var(--river-paper)",
                        marginBottom: "4px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        color: step.color,
                        marginBottom: "10px",
                      }}
                    >
                      {step.sub}
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "rgba(232, 237, 230, 0.55)",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Right side spacer */}
                <div className="hidden md:block" />
                {/* Full-width bottom border */}
                <div
                  style={{
                    borderBottom: "1px solid rgba(39,201,168,0.06)",
                    gridColumn: "1 / -1",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Science callout */}
        <div
          className="reveal mt-20 grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-1">
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.8rem",
                color: "var(--river-paper)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              The chemistry
              <br />
              <em style={{ color: "var(--river-bright)" }}>behind it</em>
            </h3>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Beer–Lambert Law",
                formula: "A = −log₁₀(T) = εℓc",
                desc: "Absorbance relates linearly to dye concentration. The LDR measures transmittance T = I/I₀, then absorbance is computed.",
              },
              {
                title: "First-Order Kinetics",
                formula: "Cₜ = C₀ · e^(−kt)",
                desc: "Dye removal follows first-order decay. Linearised as ln(Cₜ/C₀) = −kt, yielding k = 0.0089 ± 0.0003 s⁻¹.",
              },
              {
                title: "Freundlich Isotherm",
                formula: "qₑ = Kf · Cₑ^(1/n)",
                desc: "With R² = 0.978 vs Langmuir's 0.961, the Freundlich model confirms heterogeneous pore distribution in rice-husk bio-char.",
              },
              {
                title: "Langmuir Capacity",
                formula: "qₘ = 42.3 mg/g",
                desc: "Maximum monolayer capacity. Experimental loading ~2.2 mg/g is well below saturation — the column runs cleanly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="metric-card p-5 rounded-sm"
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "var(--river-bright)",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.95rem",
                    color: "var(--river-paper)",
                    marginBottom: "10px",
                    padding: "8px 12px",
                    background: "rgba(39,201,168,0.06)",
                    border: "1px solid rgba(39,201,168,0.12)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {item.formula}
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    lineHeight: 1.65,
                    color: "rgba(232, 237, 230, 0.55)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
