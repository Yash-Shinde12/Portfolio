import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ────────────────────────────────────────────────────────────
//  Earthquake Easter Egg
//  Detects rapid mouse movement (shaking) by measuring
//  mouse velocity change. When the threshold is exceeded
//  several times quickly, the screen shakes + achievement fires.
// ────────────────────────────────────────────────────────────

const SHAKE_THRESHOLD = 800;   // px/s velocity
const SHAKE_COUNT_NEEDED = 6;  // direction reversals needed
const SHAKE_WINDOW_MS = 1200;  // within this time window

export default function EarthquakeEgg() {
  const [shaking, setShaking] = useState(false);
  const [achieved, setAchieved] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const lastVelX = useRef(0);
  const reversals = useRef<number[]>([]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = (now - lastPos.current.t) / 1000;
      if (dt <= 0) return;

      const vx = (e.clientX - lastPos.current.x) / dt;
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };

      // Detect direction reversal
      if (Math.abs(vx) > SHAKE_THRESHOLD) {
        if ((vx > 0 && lastVelX.current < 0) || (vx < 0 && lastVelX.current > 0)) {
          reversals.current.push(now);
          // Keep only recent reversals within window
          reversals.current = reversals.current.filter(
            (t) => now - t < SHAKE_WINDOW_MS
          );
          if (reversals.current.length >= SHAKE_COUNT_NEEDED && !triggered) {
            setTriggered(true);
            setShaking(true);
            setAchieved(true);
            reversals.current = [];
            setTimeout(() => setShaking(false), 600);
            setTimeout(() => setAchieved(false), 4500);
          }
        }
        lastVelX.current = vx;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [triggered]);

  // Reset trigger after cooldown so it can fire again
  useEffect(() => {
    if (triggered) {
      const t = setTimeout(() => setTriggered(false), 6000);
      return () => clearTimeout(t);
    }
  }, [triggered]);

  return (
    <>
      {/* Screen shake via CSS class on body */}
      {shaking && (
        <style>{`
          @keyframes quake {
            0%   { transform: translate(0, 0) rotate(0deg); }
            15%  { transform: translate(-6px, 3px) rotate(-0.4deg); }
            30%  { transform: translate(7px, -4px) rotate(0.4deg); }
            45%  { transform: translate(-5px, 5px) rotate(-0.3deg); }
            60%  { transform: translate(6px, -3px) rotate(0.3deg); }
            75%  { transform: translate(-4px, 2px) rotate(-0.2deg); }
            90%  { transform: translate(3px, -2px) rotate(0.1deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          body { animation: quake 0.55s ease forwards; }
        `}</style>
      )}

      {/* Achievement toast */}
      <AnimatePresence>
        {achieved && (
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "1rem 1.5rem",
              background: "rgba(247, 246, 242, 0.97)",
              border: "1px solid rgba(192, 57, 43, 0.35)",
              borderRadius: 12,
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 40px rgba(13,13,28,0.12), 0 0 0 1px rgba(192,57,43,0.08)",
              minWidth: 270,
              pointerEvents: "none",
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "linear-gradient(135deg, #ffb7c5, #c084fc)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "1.4rem",
              }}
            >
              🌸
            </div>

            <div>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  color: "var(--accent)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                }}
              >
                ACHIEVEMENT UNLOCKED
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--text-1)",
                  marginBottom: 2,
                }}
              >
                力強い — Powerful
              </p>
              <p style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>
                You shook the screen. Impressive energy.
              </p>
            </div>

            {/* Floating XP */}
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -28 }}
              transition={{ delay: 0.6, duration: 1.2 }}
              style={{
                position: "absolute",
                top: 8,
                right: 14,
                fontFamily: "var(--font-mono)",
                fontSize: "0.72rem",
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              +50 XP
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
