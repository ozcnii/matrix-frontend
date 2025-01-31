import { useTranslation } from "react-i18next";
import { RightArrowIcon } from "@/modules/common/icons/right-arrow-icon";
import { Button } from "@/modules/common/ui/button";
import { useMessages } from "../stores/use-messages";

export const ChatForm = ({
  isAwaitingAnswer,
  messageValue,
  setMessageValue,
  openLimitMessageBox,
  sendMessage,
}: {
  isAwaitingAnswer: boolean;
  messageValue: string;
  setMessageValue: (value: string) => void;
  openLimitMessageBox: () => void;
  sendMessage: (message: string) => void;
}) => {
  const { t } = useTranslation();
  const { isFetchingMessages, messages, messagesLimit } = useMessages();

  const userMessages = messages.filter((message) => message.from === "user");
  const isMessagesLimitReached = userMessages.length >= messagesLimit;

  const isSendMessageButtonDisabled =
    !messageValue ||
    isMessagesLimitReached ||
    isAwaitingAnswer ||
    isFetchingMessages;

  const messageInputPlaceholder = isFetchingMessages
    ? ""
    : isMessagesLimitReached
    ? t("chat.limit_placeholder", { amount: "$291.95" })
    : `${userMessages.length} / ${messagesLimit} ${t("chat.free_message")}`;

  const openLimitMessageBoxHandler = () => {
    if (isMessagesLimitReached) {
      openLimitMessageBox();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(messageValue);
      }}
      className="flex gap-4"
    >
      <input
        type="text"
        value={messageValue}
        onChange={(e) => {
          setMessageValue(e.target.value);
          openLimitMessageBoxHandler();
        }}
        onFocus={openLimitMessageBoxHandler}
        disabled={isFetchingMessages}
        placeholder={messageInputPlaceholder}
        className="text-white placeholder-white/20 w-full px-2 bg-transparent rounded border border-solid border-white/20 disabled:cursor-default disabled:opacity-35"
      />
      <Button
        type="submit"
        disabled={isSendMessageButtonDisabled}
        className="h-12 w-12 text-white/20"
      >
        <RightArrowIcon />
      </Button>
    </form>
  );
};
