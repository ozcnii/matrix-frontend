import { TypeAnimation } from "react-type-animation";
import { Message } from "../stores/chat-store";
import { ReactNode, useState } from "react";

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
              : "self-start text-left") +
            " max-w-[80%] break-words whitespace-pre-wrap"
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
  const words = text.split(" ").map((word) => word + " ");

  const [count, setCount] = useState(0);

  const onWordDone = () => {
    scrollToBottom();
    setCount((c) => c + 1);
  };

  return (
    <>
      {words.map(
        (word, index) =>
          count >= index && (
            <TypeAnimation
              key={index}
              sequence={[word, onWordDone]}
              cursor={false}
              speed={75}
            />
          )
      )}
    </>
  );
};
