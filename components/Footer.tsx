"use client";

export default function Footer() {
  return (
    <footer
      className="relative py-12 px-6 md:px-12"
      style={{
        background: "var(--river-deep)",
        borderTop: "1px solid rgba(39,201,168,0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
        {/* Left */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "1.5rem",
              color: "var(--river-paper)",
              marginBottom: "8px",
            }}
          >
            Project{" "}
            <em style={{ color: "var(--river-bright)" }}>ClearRiver</em>
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "0.8rem",
              color: "rgba(232,237,230,0.35)",
              maxWidth: "360px",
              lineHeight: 1.6,
            }}
          >
            Bio-char Adsorption & IoT Compliance Monitoring.
            Independent research, Dinajpur Government Women&apos;s College, Bangladesh.
          </div>
        </div>

        {/* Authors */}
        <div className="flex flex-col gap-1">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              color: "rgba(39,201,168,0.4)",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            Researchers
          </div>
          {[
            "Tasfiea Rubaiea",
            "Lamyea Zaman Sneha",
            "Anika Tabassum Adiba",
            "Khadija Tul Kubra",
          ].map((a) => (
            <span
              key={a}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.68rem",
                color: "rgba(232,237,230,0.4)",
              }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "rgba(39,201,168,0.35)",
            }}
          >
            k = 0.0089 ± 0.0003 s⁻¹ · R² = 0.994 · n = 3
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "rgba(232,237,230,0.2)",
            }}
          >
            © 2025 Project ClearRiver
          </div>
        </div>
      </div>
    </footer>
  );
}
