import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
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
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="achievement-toast"
          style={{ pointerEvents: "none" }}
        >
          {/* Gold icon */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: "linear-gradient(135deg, #f59e0b, #f97316)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 16px rgba(245,158,11,0.5)",
            }}
          >
            <Trophy size={22} color="white" />
          </div>

          <div>
            <p
              className="mono"
              style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#f59e0b",
                marginBottom: 4,
              }}
            >
              ACHIEVEMENT UNLOCKED
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                marginBottom: 2,
              }}
            >
              Secret Seeker
            </p>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
              }}
            >
              You found the secret. +100 XP
            </p>
          </div>

          {/* XP sparkle */}
          <motion.span
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 0, y: -30, x: 10 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            style={{
              position: "absolute",
              top: 10,
              right: 16,
              fontSize: "0.75rem",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "#f59e0b",
            }}
          >
            +100 XP
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
