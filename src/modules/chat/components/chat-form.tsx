import { RightArrowIcon } from "@/modules/common/icons/right-arrow-icon";

import { useTranslation } from "react-i18next";
import { Button } from "@/modules/common/ui/button";
import { Message } from "../stores/chat-store";

export const ChatForm = ({
  messageValue,
  setMessageValue,
  addMessage,
  messageButtonDisabled,
  messagesLimitReached,
  loading,
  openLimitMessageBox,
  messagesLimit,
  userMessages,
}: {
  messageValue: string;
  setMessageValue: (value: string) => void;
  addMessage: (text: string) => void;
  messageButtonDisabled: boolean;
  messagesLimitReached: boolean;
  loading: boolean;
  openLimitMessageBox: () => void;
  userMessages: Message[];
  messagesLimit: number;
}) => {
  const { t } = useTranslation();

  const messageInputPlaceholder = loading
    ? ""
    : messagesLimitReached
    ? t("chat.limit_placeholder", { amount: "$291.95" })
    : `${userMessages.length} / ${messagesLimit} ${t("chat.free_message")}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addMessage(messageValue);
      }}
      className="flex gap-4"
    >
      <input
        type="text"
        value={messageValue}
        onChange={(e) => {
          setMessageValue(e.target.value);
          if (messagesLimitReached) {
            openLimitMessageBox();
          }
        }}
        disabled={loading}
        placeholder={messageInputPlaceholder}
        className="text-white placeholder-white/20 w-full px-2 bg-transparent rounded border border-solid border-white/20 disabled:cursor-default disabled:opacity-35"
      />
      <Button
        type="submit"
        disabled={messageButtonDisabled}
        className="h-12 w-12 text-white/20"
      >
        <RightArrowIcon />
      </Button>
    </form>
  );
};
