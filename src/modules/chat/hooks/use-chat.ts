import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useChatStore } from "../stores/chat-store";

export const useChat = () => {
  const { t } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const {
    addMessage,
    messages,
    currentMessageValue,
    setCurrentMessageValue,
    fetchMessages,
    loading,
    messagesLimit,
    waitAnswer,
    markAllMessagesAsRead,
  } = useChatStore();

  const userMessages = messages.filter((message) => message.from === "user");

  const messagesLimitReached = userMessages.length >= messagesLimit;

  const messageButtonDisabled =
    !currentMessageValue || messagesLimitReached || waitAnswer || loading;

  useEffect(() => {
    if (!messages.length) {
      fetchMessages({
        text: t("chat.first_bot_message"),
        from: "bot",
        id: Date.now(),
        isNew: true,
      }).then(scrollToBottom);
    }

    return () => {
      markAllMessagesAsRead();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  const addMessageWrapper = (text: string) => {
    addMessage(text).then(scrollToBottom);
  };

  return {
    messages,
    addMessage: addMessageWrapper,
    messageValue: currentMessageValue,
    setMessageValue: setCurrentMessageValue,
    messageButtonDisabled,
    messagesLimitReached,
    messagesLimit,
    userMessages,
    loading,
    chatEndRef,
    scrollToBottom,
  };
};
