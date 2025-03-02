import { motion, Variants } from "framer-motion";

export const TypingText = ({
  text,
  onAnimationComplete,
  className,
  wrapperClassName,
  onWordTyped,
}: {
  text: string;
  onAnimationComplete?: () => void;
  className?: string;
  onWordTyped?: () => void;
  wrapperClassName?: string;
}) => {
  const words = text.split(" ");

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap items-center justify-center ${wrapperClassName}`}
      onAnimationComplete={onAnimationComplete}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex}>
          {word.split("").map((textCharacter, index) => (
            <motion.span
              variants={child}
              key={index}
              className={className}
              style={{ willChange: "opacity" }}
              onAnimationComplete={onWordTyped}
            >
              {textCharacter === " " ? "\u00a0" : textCharacter}
            </motion.span>
          ))}
          <span className="whitespace-pre"> </span>{" "}
        </span>
      ))}
    </motion.div>
  );
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      when: "afterChildren",
    },
    opacity: 1,
  },
};

const child: Variants = {
  visible: {
    opacity: 1,
    display: "inline-block",
    transition: {
      duration: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    display: "none",
    transition: {
      duration: 0.1,
    },
  },
};
