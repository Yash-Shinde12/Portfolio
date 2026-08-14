import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer>
      <span className="mono" style={{ fontSize: "0.68rem", color: "var(--text-3)" }}>
        © {new Date().getFullYear()} {CONFIG.name}
      </span>
      <span className="mono" style={{ fontSize: "0.58rem", color: "var(--text-3)", letterSpacing: "0.1em" }}>
        Built with care ✦
      </span>
    </footer>
  );
}
