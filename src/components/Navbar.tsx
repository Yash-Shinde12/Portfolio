import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    // 1. Smooth Scrolled state toggle
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // 2. High-performance IntersectionObserver for scrollspy active section tracking
    const sections = ["hero", "about", "skills", "projects", "education", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Smooth scroll handler for navbar links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const targetId = href.replace("#", "");
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const lenisInstance = (window as any).lenisInstance;
      if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
        lenisInstance.scrollTo(targetEl, { offset: -90, duration: 1.2 });
      } else {
        const y = targetEl.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Floating Dynamic Notch Navbar */}
      <header className="notch-navbar-wrapper">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className={`notch-navbar ${scrolled ? "is-compact" : ""}`}
        >
          {/* Logo / Brand Notch Badge */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="notch-logo"
          >
            <span className="notch-logo-accent">YS</span>
            <span className="notch-logo-dot" />
            <span className="notch-logo-text">Yash Shinde</span>
          </a>

          {/* Desktop Navigation links with sliding spring pill */}
          <div className="nav-desktop notch-links">
            {NAV_LINKS.map((link) => {
              const targetId = link.href.substring(1);
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`notch-nav-link ${isActive ? "active" : ""}`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="notch-active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

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
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="notch-mobile-menu"
          >
            <div className="notch-mobile-content">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
