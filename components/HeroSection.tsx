"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for water molecules
    const particles: {
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; color: string;
    }[] = [];

    const colors = ["#27c9a8", "#1a6b5e", "#4ef0cc", "#0f2040"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animFrame: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(39, 201, 168, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(26, 107, 94, 0.25) 0%, rgba(4, 8, 15, 1) 70%)",
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Top label */}
      <div
        className="absolute top-28 left-6 md:left-12"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--river-bright)",
          opacity: 0.7,
        }}
      >
        DINAJPUR, BANGLADESH — 2025
      </div>

      {/* Right vertical text */}
      <div
        className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-6"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.25em",
          color: "rgba(39, 201, 168, 0.5)",
          writingMode: "vertical-rl",
        }}
      >
        <span>IoT SPECTROPHOTOMETRY</span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "rgba(39, 201, 168, 0.3)",
          }}
        />
        <span>REAL-TIME COMPLIANCE</span>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24 pt-32">
        {/* Tag line */}
        <div
          className="flex items-center gap-3 mb-8"
          style={{ animation: "fadeInUp 0.6s ease forwards" }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "var(--river-bright)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "var(--river-bright)",
            }}
          >
            INDEPENDENT RESEARCH · DINAJPUR GOVT. WOMEN&apos;S COLLEGE
          </span>
        </div>

        {/* Title */}
        <h1
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 1.05,
            animation: "fadeInUp 0.7s ease 0.1s both",
          }}
        >
          <span style={{ color: "var(--river-paper)" }}>Turning</span>
          <br />
          <em style={{ color: "var(--river-bright)", fontStyle: "italic" }}>
            rice husks
          </em>
          <br />
          <span style={{ color: "var(--river-paper)" }}>into clean</span>
          <br />
          <span style={{ color: "var(--river-paper)" }}>water.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-xl mb-12"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "1.1rem",
            lineHeight: 1.7,
            color: "rgba(232, 237, 230, 0.65)",
            animation: "fadeInUp 0.7s ease 0.2s both",
          }}
        >
          An ultra-low-cost IoT system that monitors textile wastewater
          treatment in real time — built for{" "}
          <span style={{ color: "var(--river-paper)" }}>
            under 1000 BDT
          </span>{" "}
          using locally sourced agricultural waste.
        </p>

        {/* Stats row */}
        <div
          className="grid grid-cols-3 gap-px max-w-lg"
          style={{
            background: "rgba(39, 201, 168, 0.1)",
            animation: "fadeInUp 0.7s ease 0.3s both",
          }}
        >
          {[
            { value: "93%", label: "Dye Removal" },
            { value: "300s", label: "Treatment Time" },
            { value: "~250₳", label: "Per Unit Cost" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col p-4 md:p-5"
              style={{ background: "rgba(4, 8, 15, 0.8)" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.4rem, 3vw, 2rem)",
                  color: "var(--river-bright)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(232, 237, 230, 0.5)",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Authors */}
        <div
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
          style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}
        >
          {[
            "Tasfiea Rubaiea",
            "Lamyea Zaman Sneha",
            "Anika Tabassum Adiba",
            "Khadija Tul Kubra",
          ].map((author) => (
            <span
              key={author}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "rgba(232, 237, 230, 0.45)",
              }}
            >
              {author}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            letterSpacing: "0.2em",
            color: "rgba(39, 201, 168, 0.4)",
          }}
        >
          SCROLL
        </span>
        <div
          className="w-px"
          style={{
            height: "40px",
            background:
              "linear-gradient(to bottom, rgba(39, 201, 168, 0.5), transparent)",
            animation: "pulse-glow 2s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
