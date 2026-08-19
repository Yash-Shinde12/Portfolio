import { ArrowUp, Mail } from "lucide-react";
import { CONFIG } from "../config";
import { GithubIcon, LinkedinIcon } from "./GithubIcon";

export default function Footer() {
  const scrollToTop = () => {
    if ((window as any).lenisInstance) {
      (window as any).lenisInstance.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer>
      {/* Accent gradient line */}
      <div className="footer-accent-line" />

      <div className="footer-content">
        {/* Left: Name & tagline */}
        <div className="footer-left">
          <span className="footer-name">
            © {new Date().getFullYear()} {CONFIG.name}
          </span>
          <span className="footer-tagline">
            Designed & Built with care ✦
          </span>
        </div>

        {/* Right: Social icons + Back to top */}
        <div className="footer-right">
          <a
            href={CONFIG.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href={CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <a
            href={`mailto:${CONFIG.email}`}
            className="footer-social-link"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>

          <button
            onClick={scrollToTop}
            className="footer-back-top"
            aria-label="Back to top"
          >
            <ArrowUp size={12} /> Top
          </button>
        </div>
      </div>
    </footer>
  );
}
