import { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollable = documentHeight - windowHeight;

      if (totalScrollable > 0) {
        const currentProgress = (window.scrollY / totalScrollable) * 100;
        setScrollPercentage(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 300,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${scrollPercentage}%`,
          background: "linear-gradient(90deg, var(--accent), var(--accent-hi))",
          boxShadow: "0 0 10px rgba(217, 119, 6, 0.4)",
          transition: "width 0.1s ease-out",
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
}
