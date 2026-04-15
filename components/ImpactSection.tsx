"use client";

import { useEffect, useRef } from "react";

export default function ImpactSection() {
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
      id="impact"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(26, 107, 94, 0.18) 0%, var(--river-deep) 65%)",
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
            06 — IMPACT & SCALABILITY
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <h2
            className="reveal reveal-delay-1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.1,
              color: "var(--river-paper)",
            }}
          >
            Industrial-grade
            <br />
            monitoring for
            <br />
            <em style={{ color: "var(--river-bright)" }}>everyone</em>
          </h2>

          <div className="reveal reveal-delay-2 flex flex-col gap-5">
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "rgba(232,237,230,0.65)",
              }}
            >
              The system&apos;s value lies in its SME economic scalability. Adsorbent cost
              is reduced to transport and pyrolysis labour, leveraging an agricultural
              waste stream that would otherwise be incinerated.
            </p>

            <div
              className="grid grid-cols-2 gap-4"
            >
              {[
                { n: "2–3", label: "Orders of magnitude cheaper than commercial equivalents" },
                { n: "≤1000", label: "BDT total instrumentation cost" },
              ].map((s) => (
                <div
                  key={s.n}
                  className="p-4"
                  style={{
                    border: "1px solid rgba(39,201,168,0.15)",
                    background: "rgba(39,201,168,0.04)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.6rem",
                      color: "var(--river-bright)",
                      marginBottom: "4px",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "0.75rem",
                      color: "rgba(232,237,230,0.5)",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scale impact grid */}
        <div
          className="reveal grid md:grid-cols-3 gap-px mb-px"
          style={{ background: "rgba(39,201,168,0.06)" }}
        >
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              ),
              title: "Factory Managers",
              desc: "Real-time, transparent environmental dashboard. Understand your effluent quality before it reaches the waterway.",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 9h6M9 12h6M9 15h4" />
                </svg>
              ),
              title: "Regulators (DoE)",
              desc: "Autonomous audit trail of cryptographically signed compliance reports — eliminating manual inspection bottlenecks.",
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              ),
              title: "Proactive Maintenance",
              desc: "Declining-k alerts transition the sector from reactive non-compliance to evidence-based environmental stewardship.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-6 md:p-8"
              style={{ background: "rgba(4, 8, 15, 0.8)" }}
            >
              <div
                style={{ color: "var(--river-bright)", marginBottom: "16px" }}
              >
                {item.icon}
              </div>
              <h4
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.15rem",
                  color: "var(--river-paper)",
                  marginBottom: "8px",
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.85rem",
                  lineHeight: 1.7,
                  color: "rgba(232,237,230,0.55)",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Future work */}
        <div
          className="reveal grid md:grid-cols-2 gap-px"
          style={{ background: "rgba(39,201,168,0.06)" }}
        >
          <div className="p-6 md:p-8" style={{ background: "rgba(4, 8, 15, 0.6)" }}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                color: "var(--river-paper)",
                marginBottom: "16px",
              }}
            >
              Current Limitations
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Single-dye-type calibration only",
                "Isotherm fitting from batch sub-samples rather than wide-range equilibrium experiment",
                "No SEM/BET surface-area analysis of the bio-char",
                "No turbidity or pH sensor integration yet",
              ].map((lim) => (
                <li
                  key={lim}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "rgba(232,237,230,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--river-accent)", flexShrink: 0, marginTop: "2px" }}>—</span>
                  {lim}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 md:p-8" style={{ background: "rgba(4, 8, 15, 0.6)" }}>
            <h4
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.3rem",
                color: "var(--river-paper)",
                marginBottom: "16px",
              }}
            >
              Future Work
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "BET porosity and SEM characterisation of the bio-char microstructure",
                "Thermogravimetric analysis of pyrolysis yield and optimisation",
                "Pilot deployment at SME facility with real mixed-dye effluent",
                "Integration of pH and turbidity sensors for multi-parameter compliance",
              ].map((fw) => (
                <li
                  key={fw}
                  className="flex items-start gap-3"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                    fontSize: "0.82rem",
                    color: "rgba(232,237,230,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  <span style={{ color: "var(--river-bright)", flexShrink: 0, marginTop: "2px" }}>→</span>
                  {fw}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* References */}
        <div
          className="reveal mt-16 pt-12"
          style={{ borderTop: "1px solid rgba(39,201,168,0.1)" }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "rgba(39,201,168,0.4)",
              marginBottom: "16px",
              textTransform: "uppercase",
            }}
          >
            Key References
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              "[1] Ahsan & Delorme, Heliyon, 2020 — Water Pollution in Bangladesh and its Impact on Public Health",
              "[2] Chowdhury et al., J. Environ. Chem. Eng., 2012 — Application of Rice Husk Biochar for Organic Dye Removal",
              "[3] Ingle & Crouch, Spectrochemical Analysis, Prentice Hall, 1988",
              "[4] Kaur & Singh, IEEE Sensors J., 2018 — Low-Cost Arduino-Based Spectrophotometer",
              "[5] Ho & McKay, Process Saf. Environ. Prot., 1998 — Chemisorption Kinetic Models Applied to Pollutant Removal",
            ].map((ref) => (
              <p
                key={ref}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  color: "rgba(232,237,230,0.3)",
                  lineHeight: 1.6,
                }}
              >
                {ref}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
