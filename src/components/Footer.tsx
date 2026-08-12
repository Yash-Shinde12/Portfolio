import { CONFIG } from "../config";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(139,92,246,0.1)",
        padding: "1.5rem clamp(1rem, 5vw, 3rem)",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.75rem",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--color-bg-primary)",
      }}
    >
      <span
        className="mono"
        style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}
      >
        © {year} {CONFIG.name}
      </span>
      <span
        className="mono"
        style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", letterSpacing: "0.1em" }}
      >
        BUILD STATUS: COMPLETE ✓
      </span>
    </footer>
  );
}
