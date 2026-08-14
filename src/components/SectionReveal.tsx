import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionRevealProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SectionReveal({
  children,
  id,
  className,
  style,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Graceful scroll entrance and exit fade/slide
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.2, 1, 1, 0.15]);
  const y = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [35, 0, 0, -35]);
  const scale = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.97, 1, 1, 0.97]);

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{ position: "relative", zIndex: 10, ...style }}
    >
      <motion.div style={{ opacity, y, scale }}>
        {children}
      </motion.div>
    </section>
  );
}
