"use client";

import { useEffect, useRef } from "react";

const components = [
  { ref: "U1", qty: "1×", name: "Arduino Uno R3", role: "ATmega328P microcontroller, 16 MHz, 5V", color: "#27c9a8" },
  { ref: "R1", qty: "1×", name: "Photoresistor (LDR)", role: "GL5528 — Dark: ~1MΩ, Illuminated: 10–100 kΩ", color: "#4ef0cc" },
  { ref: "R2", qty: "1×", name: "10 kΩ Resistor", role: "Precision fixed resistor ±1% for voltage divider", color: "#f4a825" },
  { ref: "D1", qty: "1×", name: "Red LED", role: "λ ≈ 620 nm — primary dye absorption channel", color: "#ff4444" },
  { ref: "D2", qty: "1×", name: "Green LED", role: "Turbidity confirmation channel", color: "#44ff88" },
  { ref: "D3", qty: "1×", name: "Yellow LED", role: "Secondary confirmation channel", color: "#ffcc44" },
  { ref: "R3–R5", qty: "3×", name: "150 Ω Resistor", role: "Current-limiting — protects LED from 5V supply", color: "#27c9a8" },
];

export default function HardwareSection() {
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
      id="hardware"
      ref={sectionRef}
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: "var(--river-deep)",
        borderTop: "1px solid rgba(39,201,168,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
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
                03 — HARDWARE
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
              Built from
              <br />
              <em style={{ color: "var(--river-bright)" }}>7 components</em>
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
              The sensor housing is fabricated from opaque black acrylic to eliminate
              ambient-light interference. The clear effluent tube bisects it, establishing
              optical path length ℓ = 10 mm. TDM cycling prevents cross-talk with 100 ms
              blanking intervals.
            </p>
          </div>
        </div>

        {/* Two column: circuit image + BOM */}
        <div className="grid md:grid-cols-5 gap-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {/* Circuit image */}
          <div
            className="reveal md:col-span-3 relative overflow-hidden"
            style={{
              background: "rgba(6, 14, 28, 0.8)",
              minHeight: "400px",
            }}
          >
            <div
              className="absolute top-4 left-4"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "rgba(39, 201, 168, 0.5)",
                textTransform: "uppercase",
              }}
            >
              Tinkercad® Circuit · Clear-River Arduino
            </div>

            <img
              src="/assets/circuit.png"
              alt="Arduino circuit schematic for ClearRiver IoT sensor array"
              className="w-full h-full object-contain p-8 md:p-12"
              style={{
                filter: "brightness(1.1) contrast(1.05)",
                mixBlendMode: "lighten",
              }}
            />

            {/* Overlay annotations */}
            <div
              className="absolute bottom-4 left-4 right-4 flex justify-between"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "rgba(39,201,168,0.4)",
              }}
            >
              <span>A0 → LDR Voltage Divider</span>
              <span>D3/D5/D6 → RGB LED TDM</span>
            </div>
          </div>

          {/* BOM table */}
          <div
            className="reveal reveal-delay-1 md:col-span-2"
            style={{ background: "rgba(10, 22, 40, 0.5)" }}
          >
            <div
              className="px-6 py-4 border-b"
              style={{ borderColor: "rgba(39,201,168,0.1)" }}
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
                Bill of Materials
              </span>
            </div>

            <div className="flex flex-col">
              {components.map((c, i) => (
                <div
                  key={c.ref}
                  className="px-6 py-4 flex items-start gap-4 transition-colors"
                  style={{
                    borderBottom: "1px solid rgba(39,201,168,0.06)",
                    animationDelay: `${i * 0.05}s`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(39,201,168,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Color dot */}
                  <div
                    className="flex-shrink-0 mt-1"
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: c.color,
                      boxShadow: `0 0 6px ${c.color}`,
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.65rem",
                          color: "rgba(232, 237, 230, 0.4)",
                        }}
                      >
                        {c.ref}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.6rem",
                          color: c.color,
                        }}
                      >
                        {c.qty}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        color: "var(--river-paper)",
                        marginTop: "2px",
                      }}
                    >
                      {c.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 300,
                        fontSize: "0.7rem",
                        color: "rgba(232, 237, 230, 0.4)",
                        marginTop: "2px",
                        lineHeight: 1.4,
                      }}
                    >
                      {c.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total cost */}
            <div
              className="px-6 py-5 flex items-center justify-between"
              style={{
                borderTop: "1px solid rgba(39,201,168,0.15)",
                background: "rgba(39,201,168,0.04)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  color: "rgba(232, 237, 230, 0.4)",
                  textTransform: "uppercase",
                }}
              >
                Total Cost
              </span>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  color: "var(--river-bright)",
                }}
              >
                ≤ 1000 BDT
              </span>
            </div>
          </div>
        </div>

        {/* Sensor specs row */}
        <div className="reveal mt-12 grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "rgba(39,201,168,0.06)" }}>
          {[
            { label: "ADC Resolution", value: "10-bit", sub: "≈ 4.88 mV/bit" },
            { label: "Concentration Resolution", value: "~0.5 mg/L", sub: "below 2 mg/L detection limit" },
            { label: "Noise Reduction", value: "√5 × 2.24", sub: "5-point moving average" },
            { label: "Baud Rate", value: "9600", sub: "USB serial CSV stream" },
          ].map((spec) => (
            <div
              key={spec.label}
              className="p-6"
              style={{ background: "rgba(4, 8, 15, 0.8)" }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(39,201,168,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.3rem",
                  color: "var(--river-paper)",
                  marginBottom: "4px",
                }}
              >
                {spec.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.7rem",
                  color: "rgba(232, 237, 230, 0.35)",
                }}
              >
                {spec.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
