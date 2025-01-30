import { useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useChatStore } from "../stores/chat-store";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";

export const useChat = () => {
  const { t } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const user = useSignal(initData.user);

  const {
    askQuestion,
    messages,
    currentMessageValue,
    setCurrentMessageValue,
    fetchMessages,
    loading,
    messagesLimit,
    waitAnswer,
    markAllMessagesAsRead,
    animationCompleteHandler,
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

  const addMessage = async (message: string) => {
    try {
      await askQuestion({
        question: message,
        userId: user!.id,
        onMessageAdded: scrollToBottom,
      });
    } catch (error) {
      console.error(error);
      toast(String(error));
    }
  };

  return {
    messages,
    addMessage,
    messageValue: currentMessageValue,
    setMessageValue: setCurrentMessageValue,
    messageButtonDisabled,
    messagesLimitReached,
    messagesLimit,
    userMessages,
    loading,
    chatEndRef,
    scrollToBottom,
    animationCompleteHandler,
  };
};
