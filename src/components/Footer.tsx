import { ArrowUp } from "lucide-react";
import { CONFIG } from "../config";

export default function Footer() {
  const scrollToTop = () => {
    if ((window as any).lenisInstance) {
      (window as any).lenisInstance.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer>
      <div className="divider" style={{ marginBottom: "1.75rem" }} />
      <div className="footer-content">
        <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>
          © {new Date().getFullYear()} <strong style={{ color: "var(--text-1)" }}>{CONFIG.name}</strong>
        </span>

        <span className="mono" style={{ fontSize: "0.62rem", color: "var(--text-3)", letterSpacing: "0.08em" }}>
          Designed & Built with care ✦
        </span>

        <button
          onClick={scrollToTop}
          className="footer-back-top"
          aria-label="Back to top"
        >
          <ArrowUp size={12} /> Top
        </button>
      </div>
    </footer>
  );
}
