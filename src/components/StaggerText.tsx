import { motion } from "framer-motion";

interface StaggerTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  accentWord?: string; // Optional word to highlight in accent color
}

const wordContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const wordChildVariants = {
  hidden: { y: "110%", opacity: 0, rotate: 3 },
  visible: {
    y: "0%",
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

export default function StaggerText({
  text,
  className = "section-title",
  style,
  accentWord,
}: StaggerTextProps) {
  const words = text.split(" ");

  return (
    <motion.h2
      className={className}
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        gap: "0.28em",
        overflow: "hidden",
        paddingBottom: "0.15em",
        lineHeight: 1.15,
        ...style,
      }}
      variants={wordContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {words.map((word, i) => {
        const isAccent =
          accentWord && word.toLowerCase().includes(accentWord.toLowerCase());

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
            }}
          >
            <motion.span
              variants={wordChildVariants}
              style={{
                display: "inline-block",
                color: isAccent ? "var(--accent)" : "inherit",
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.h2>
  );
}
