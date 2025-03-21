import { TypingText } from "@/modules/common/ui/typing-text";
import { Message } from "../stores/use-messages";
import {
  MAX_GUESSED_WORDS,
  useGuessedWords,
} from "../stores/use-guessed-words";

export const ChatMessage = ({
  message,
  scrollToBottom,
  animationCompleteHandler,
}: {
  message: Message;
  scrollToBottom: () => void;
  animationCompleteHandler: () => void;
}) => {
  const { guessedWords } = useGuessedWords();

  if (message.type === "words") {
    const guessed = [...new Array(MAX_GUESSED_WORDS)].map(
      (_, index) => guessedWords[index] ?? "?"
    );
    const words = [...message.text.split(", "), ...guessed];

    return (
      <div className="grid grid-cols-3 gap-[5px] text-center text-white">
        {words.map((word, index) => (
          <span
            className="bg-[#242922] h-[38px] w-[80px] p-[10px] rounded"
            key={index}
          >
            {word}
          </span>
        ))}
      </div>
    );
  }

  if (message.from === "bot" && message.isNew) {
    return (
      <ScrollableTypeAnimation
        text={message.text}
        onWordTyped={scrollToBottom}
        onAnimationComplete={animationCompleteHandler}
      />
    );
  }

  return message.text;
};

const ScrollableTypeAnimation = ({
  text,
  onWordTyped,
  onAnimationComplete,
}: {
  text: string;
  onWordTyped: () => void;
  onAnimationComplete?: () => void;
}) => {
  return (
    <TypingText
      text={text}
      onWordTyped={onWordTyped}
      wrapperClassName="!justify-start"
      onAnimationComplete={onAnimationComplete}
    />
  );
};
