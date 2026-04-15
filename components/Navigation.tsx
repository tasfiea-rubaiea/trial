"use client";

import { useState, useEffect } from "react";

const navItems = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Hardware", href: "#hardware" },
  { label: "Data", href: "#data" },
  { label: "Results", href: "#results" },
  { label: "Impact", href: "#impact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map((item) => item.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(4, 8, 15, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(39, 201, 168, 0.1)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d="M16 4 C8 10 4 16 8 22 C12 28 20 28 24 22 C28 16 24 10 16 4Z"
                  fill="rgba(39,201,168,0.2)"
                  stroke="#27c9a8"
                  strokeWidth="1"
                />
                <path
                  d="M10 18 C12 16 14 17 16 15 C18 13 20 14 22 12"
                  stroke="#27c9a8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <span
                className="font-display text-lg text-white leading-none block"
                style={{ fontFamily: "var(--font-display)" }}
              >
                ClearRiver
              </span>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "var(--river-bright)", fontFamily: "var(--font-mono)" }}
              >
                Project
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover-line text-sm transition-colors duration-200"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  color:
                    activeSection === item.href.replace("#", "")
                      ? "var(--river-bright)"
                      : "rgba(232, 237, 230, 0.6)",
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/assets/research_paper.pdf"
            target="_blank"
            className="hidden md:flex items-center gap-2 px-4 py-2 text-xs tracking-widest uppercase transition-all duration-300"
            style={{
              fontFamily: "var(--font-mono)",
              border: "1px solid rgba(39, 201, 168, 0.4)",
              color: "var(--river-bright)",
              fontSize: "0.65rem",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(39, 201, 168, 0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            Paper
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: "var(--river-bright)" }}
          >
            <div
              className="w-5 flex flex-col gap-1 transition-all"
              style={{ gap: menuOpen ? "0" : "4px" }}
            >
              <span
                className="h-px w-full bg-current block transition-all"
                style={{
                  transform: menuOpen ? "rotate(45deg) translate(0, 1px)" : "",
                }}
              />
              <span
                className="h-px bg-current block transition-all"
                style={{
                  width: menuOpen ? "0" : "100%",
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="h-px w-full bg-current block transition-all"
                style={{
                  transform: menuOpen ? "rotate(-45deg) translate(0, -1px)" : "",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="fixed inset-0 z-40 flex flex-col justify-center px-8 transition-all duration-500 md:hidden"
        style={{
          background: "rgba(4, 8, 15, 0.98)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="py-4 border-b transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              color: "var(--river-paper)",
              borderColor: "rgba(39, 201, 168, 0.1)",
              transitionDelay: `${i * 50}ms`,
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
