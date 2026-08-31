import { motion } from "framer-motion";

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
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", zIndex: 10, ...style }}
    >
      {children}
    </motion.section>
  );
}
