import { Message } from "../stores/chat-store";
import { ReactNode } from "react";
import { TypingText } from "@/modules/common/ui/typing-text";

export const MessageList = ({
  messages,
  children,
  scrollToBottom,
}: {
  messages: Message[];
  children: ReactNode;
  scrollToBottom: () => void;
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
              scrollToBottom={scrollToBottom}
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
  scrollToBottom,
}: {
  text: string;
  scrollToBottom: () => void;
}) => {
  return (
    <TypingText
      text={text}
      onWordTyped={scrollToBottom}
      wrapperClassName="!justify-start"
    />
  );
};
