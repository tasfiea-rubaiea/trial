"use client";

import { useEffect, useRef } from "react";

const problems = [
  {
    stat: "80%",
    label: "of Bangladesh's exports",
    desc: "The garment sector dominates national revenue — yet its environmental cost is catastrophic.",
    accent: "var(--river-accent)",
  },
  {
    stat: "→0",
    label: "dissolved oxygen in rivers",
    desc: "High dye concentrations block sunlight, halting aquatic photosynthesis and creating dead zones.",
    accent: "var(--river-amber)",
  },
  {
    stat: "Tons",
    label: "of rice husks incinerated",
    desc: "Northern Bangladesh burns millions of tonnes of rice husks yearly — a wasted resource that degrades air quality.",
    accent: "var(--river-bright)",
  },
];

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => {
              el.classList.add("visible");
            });
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
      id="problem"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "var(--river-deep)",
        borderTop: "1px solid rgba(39, 201, 168, 0.08)",
      }}
    >
      {/* Background texture - river pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(39,201,168,0.5) 39px, rgba(39,201,168,0.5) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(39,201,168,0.5) 39px, rgba(39,201,168,0.5) 40px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-20">
          <div>
            <div className="reveal flex items-center gap-3 mb-6">
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  color: "var(--river-accent)",
                }}
              >
                01 — THE PROBLEM
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
              A dual crisis
              <br />
              <em style={{ color: "var(--river-accent)" }}>hiding in plain sight</em>
            </h2>
          </div>

          <div className="reveal reveal-delay-2 flex flex-col justify-end">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(232, 237, 230, 0.65)",
              }}
            >
              Bangladesh&apos;s rivers are dying from toxic textile dye discharge.
              Simultaneously, millions of tonnes of rice husks burn as waste.
              These two crises — one environmental, one economic — share a solution
              that existing systems have failed to deploy at scale.
            </p>

            <div
              className="mt-8 p-4"
              style={{
                borderLeft: "3px solid var(--river-accent)",
                background: "rgba(255, 107, 53, 0.05)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: "rgba(232, 237, 230, 0.8)",
                  lineHeight: 1.7,
                }}
              >
                &ldquo;The Buriganga river has experienced catastrophic drops in dissolved
                oxygen as high dye concentrations attenuate the sunlight required
                for aquatic photosynthesis.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Problem cards - large editorial */}
        <div className="grid md:grid-cols-3 gap-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {problems.map((p, i) => (
            <div
              key={p.label}
              className={`reveal reveal-delay-${i + 2} flex flex-col p-8 md:p-10`}
              style={{ background: "var(--river-deep)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: p.accent,
                  lineHeight: 1,
                  marginBottom: "12px",
                }}
              >
                {p.stat}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "rgba(232, 237, 230, 0.4)",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                {p.label}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  color: "rgba(232, 237, 230, 0.6)",
                  marginTop: "auto",
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Barrier callout */}
        <div
          className="reveal mt-16 grid md:grid-cols-4 gap-px"
          style={{ background: "rgba(39,201,168,0.06)" }}
        >
          {[
            {
              title: "Economic Barrier",
              text: "Commercial spectrophotometers cost thousands of dollars — incentivizing illegal discharge",
            },
            {
              title: "No Continuous Monitoring",
              text: "Academic bio-char implementations rarely integrate real-time performance verification",
            },
            {
              title: "Fragmented Analysis",
              text: "No accessible software architecture exists to solve kinetic equations from live sensor data",
            },
            {
              title: "No Compliance Path",
              text: "No framework bridges raw sensor readings and verifiable environmental compliance documents",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="p-6"
              style={{ background: "rgba(10, 22, 40, 0.5)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "var(--river-bright)",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                {b.title}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.8rem",
                  lineHeight: 1.65,
                  color: "rgba(232, 237, 230, 0.5)",
                }}
              >
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
