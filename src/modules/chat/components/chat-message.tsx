import { TypingText } from "@/modules/common/ui/typing-text";
import { Message } from "../stores/use-messages";
import { Button } from "@telegram-apps/telegram-ui";
import { copyToClipboard } from "@/modules/common/helpers/copy-to-clipboard";
import { CopyIcon } from "@/modules/common/icons/copy-icon";
import { useTranslation } from "react-i18next";

export const ChatMessage = ({
  message,
  scrollToBottom,
  animationCompleteHandler,
}: {
  message: Message;
  scrollToBottom: () => void;
  animationCompleteHandler: () => void;
}) => {
  const { t } = useTranslation();

  if (message.type === "words") {
    const words = message.text.split(", ");
    return (
      <div className="flex flex-col gap-[5px]">
        <div className="grid grid-cols-3 gap-[5px] text-center text-white">
          {words.map((word, index) => (
            <span
              className="bg-[#242922] h-[38px] w-[80px] p-[10px] rounded-[8px] text-white"
              key={index}
            >
              {word}
            </span>
          ))}
        </div>
        <Button
          onClick={() => copyToClipboard(message.text)}
          size="m"
          stretched
          style={{
            backgroundColor: "#242922",
            border: "none",
          }}
          className="text-white"
          after={<CopyIcon className="text-[#BEBEBE] absolute right-4" />}
        >
          {t("common.copy")}
        </Button>
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
