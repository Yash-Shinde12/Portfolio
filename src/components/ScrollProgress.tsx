import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        scaleX,
        transformOrigin: "0%",
        zIndex: 300,
        pointerEvents: "none",
        background: "linear-gradient(90deg, var(--accent), var(--accent-hi))",
        boxShadow: "0 0 12px rgba(217, 119, 6, 0.5)",
      }}
    />
  );
}
