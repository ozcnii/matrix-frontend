import { useEffect, useState } from "react";

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
  const [visibleChars, setVisibleChars] = useState(0);
  const totalChars = text.length;

  useEffect(() => {
    if (visibleChars < totalChars) {
      const timer = setTimeout(() => {
        setVisibleChars((prev) => {
          const newCount = prev + 1;

          if (text[prev] === " " && onWordTyped) {
            console.log("Word typed:", text.slice(0, prev + 1));

            onWordTyped();
          }
          return newCount;
        });
      }, 50); // Adjust delay to match stagger effect (0.05s)

      return () => clearTimeout(timer);
    } else if (visibleChars === totalChars && onAnimationComplete) {
      onAnimationComplete();
    }
  }, [visibleChars, totalChars, text]);

  let charIndex = 0;

  return (
    <div
      className={`flex flex-wrap items-center justify-center ${wrapperClassName}`}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex}>
          {word.split("").map((textCharacter, index) => {
            const currentIndex = charIndex++;
            const isVisible = currentIndex < visibleChars;
            return (
              <span
                key={index}
                className={className}
                style={{
                  opacity: isVisible ? 1 : 0,
                  display: isVisible ? "inline-block" : "none",
                  transition: "opacity 0.1s, display 0.1s",
                }}
              >
                {textCharacter === " " ? "\u00A0" : textCharacter}
              </span>
            );
          })}
          <span className="whitespace-pre"> </span>
        </span>
      ))}
    </div>
  );
};
