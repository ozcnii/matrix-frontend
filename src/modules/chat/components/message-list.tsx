import { Message } from "../stores/chat-store";
import { ReactNode } from "react";
import { TypingText } from "@/modules/common/ui/typing-text";

export const MessageList = ({
  messages,
  children,
  scrollToBottom,
  animationCompleteHandler,
}: {
  messages: Message[];
  children: ReactNode;
  scrollToBottom: () => void;
  animationCompleteHandler: () => void;
}) => {
  return (
    <div className="flex flex-col h-full overflow-y-auto overflow-hidden gap-4">
      {messages.map(({ from, id, text, isNew }) => (
        <div
          key={id}
          className={`${
            (from === "user"
              ? "self-end text-white text-right"
              : "self-start text-left") + " max-w-[80%] break-words "
          }`}
          style={{
            filter: from === "user" ? "drop-shadow(0 0 10px #55B146)" : "none",
          }}
        >
          {from === "bot" && isNew ? (
            <ScrollableTypeAnimation
              text={text}
              onWordTyped={scrollToBottom}
              onAnimationComplete={animationCompleteHandler}
            />
          ) : (
            text
          )}
        </div>
      ))}
      {children}
    </div>
  );
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
