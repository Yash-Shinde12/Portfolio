import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);

  // Direct DOM ref for 144Hz zero-latency GPU rendering (no React re-renders during mouse move)
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      // Instant hardware-accelerated transform for sharp arrow (0ms input latency)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };
    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor-wrapper"
      aria-hidden="true"
    >
      <div className="custom-cursor-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.5 3.5L11.5 21.5L14.2 13.8L21.5 11.5L3.5 3.5Z"
            fill="var(--accent)"
            stroke="var(--bg-card)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
