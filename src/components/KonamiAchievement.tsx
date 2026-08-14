import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← →
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
];

export default function KonamiAchievement() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setSequence((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setUnlocked(true);
          setTimeout(() => setUnlocked(false), 4500);
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "1rem 1.5rem",
            background: "rgba(10, 8, 16, 0.95)",
            border: "1px solid rgba(255, 183, 197, 0.45)",
            borderRadius: 12,
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 40px rgba(232,121,160,0.3)",
            minWidth: 270,
            pointerEvents: "none",
          }}
        >
          {/* Gold icon */}
          <div style={{ width: 44, height: 44, borderRadius: 10, background: "linear-gradient(135deg, #f59e0b, #e879a0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 0 16px rgba(245,158,11,0.4)", fontSize: "1.3rem" }}>
            <Trophy size={22} color="white" />
          </div>

          <div>
            <p className="mono" style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", color: "var(--accent-hi)", marginBottom: 4, textTransform: "uppercase" }}>
              ACHIEVEMENT UNLOCKED
            </p>
            <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 2 }}>
              古典のコード — Classic Code
            </p>
            <p style={{ fontSize: "0.72rem", color: "var(--text-2)" }}>
              You found the secret. +100 XP
            </p>
          </div>

          {/* XP sparkle */}
          <motion.span
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -30, x: 10 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            style={{ position: "absolute", top: 10, right: 16, fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700, color: "#f59e0b" }}
          >
            +100 XP
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
