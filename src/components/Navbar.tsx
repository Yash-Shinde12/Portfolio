import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { CONFIG } from "../config";

const NAV_LINKS = [
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // ScrollSpy active section detection
      const sections = ["hero", "about", "skills", "projects", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Dynamic Notch Navbar */}
      <header className="notch-navbar-wrapper">
        <nav className={`notch-navbar ${scrolled ? "is-compact" : ""}`}>
          {/* Logo / Brand Notch Badge */}
          <a href="#hero" className="notch-logo">
            <span className="notch-logo-accent">YS</span>
            <span className="notch-logo-dot" />
            <span className="notch-logo-text">Yash Shinde</span>
          </a>

          {/* Desktop Navigation links pill */}
          <div className="nav-desktop notch-links">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`notch-nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                  {isActive && <span className="notch-active-pill" />}
                </a>
              );
            })}
          </div>

          {/* Action button */}
          <div className="notch-actions">
            <a
              href={CONFIG.resume}
              download
              className="notch-btn-resume"
              title="Download Resume"
            >
              <Download size={13} />
              <span className="resume-text">Resume</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              id="nav-toggle"
              className="notch-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger-bar ${mobileOpen ? "open-1" : ""}`} />
              <span className={`hamburger-bar ${mobileOpen ? "open-2" : ""}`} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="notch-mobile-menu">
          <div className="notch-mobile-content">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`notch-mobile-link ${
                  activeSection === l.href.substring(1) ? "active" : ""
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href={CONFIG.resume}
              download
              onClick={() => setMobileOpen(false)}
              className="btn-primary"
              style={{ marginTop: "1rem", width: "100%", justifyContent: "center" }}
            >
              <Download size={15} /> Download Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
