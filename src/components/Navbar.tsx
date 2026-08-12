import { useState, useEffect } from "react";
import { Menu, X, Download } from "lucide-react";
import { CONFIG } from "../config";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(1rem, 5vw, 3rem)",
          background: "rgba(8, 11, 20, 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(139,92,246,0.2)"
            : "1px solid rgba(139,92,246,0.06)",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "1rem",
            fontWeight: 600,
            color: "var(--color-text-primary)",
            textDecoration: "none",
            letterSpacing: "0.06em",
          }}
        >
          <span style={{ color: "var(--color-accent)" }}>YASH</span>.SHINDE
        </a>

        {/* Desktop nav */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-text-secondary)")
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href={CONFIG.resume}
              download
              className="btn-outline"
              style={{ padding: "0.45rem 1rem", fontSize: "0.8rem" }}
            >
              <Download size={14} />
              Resume
            </a>
          </div>
        )}

        {/* Mobile toggle */}
        {isMobile && (
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text-primary)",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}
      </nav>

      {/* Mobile drawer overlay */}
      {isMobile && mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 64,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(8, 11, 20, 0.97)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
            zIndex: 99,
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONFIG.resume}
            download
            className="btn-primary"
            onClick={() => setMobileOpen(false)}
          >
            <Download size={16} />
            Resume
          </a>
        </div>
      )}
    </>
  );
}
