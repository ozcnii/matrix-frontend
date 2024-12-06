import { TypeAnimation } from "react-type-animation";
import { Message } from "../hooks/use-chat";

export const MessageList = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex flex-col h-full overflow-auto gap-4">
      {messages.map(({ from, id, text, isNew }) => (
        <div
          key={id}
          className={`${
            from === "user" ? "self-end text-white" : "self-start"
          }`}
          style={{
            filter: from === "user" ? "drop-shadow(0 0 10px #55B146)" : "none",
          }}
        >
          {from === "bot" && isNew ? (
            <TypeAnimation sequence={[text]} cursor={false} speed={75} />
          ) : (
            text
          )}
        </div>
      ))}
    </div>
  );
};
