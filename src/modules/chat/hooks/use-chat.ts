import { useCallback, useEffect, useRef, useState } from "react";
import { initData, useSignal } from "@telegram-apps/sdk-react";
import { toast } from "react-toastify";
import { useMessages } from "../stores/use-messages";
import { useTranslation } from "react-i18next";

export const useChat = () => {
  const { t } = useTranslation();
  const chatEndRef = useRef<HTMLDivElement>(null);
  const user = useSignal(initData.user);

  const { messages, sendMessage, markMessagesAsRead, fetchMessages } =
    useMessages();

  const [messageValue, setMessageValue] = useState("");
  const [isAwaitingAnswer, setIsAwaitingAnswer] = useState(false);

  useEffect(() => {
    if (!messages.length) {
      fetchMessages({
        initialMessages: [
          {
            text: "dog, cat, sun, moon, star, tree, book, pen, car, bus, door, chair, road, hand, foot, eye, cake, fish, hat",
            from: "bot",
            id: Date.now(),
            isNew: true,
            type: "words",
          },
          {
            text: t("chat.first_bot_message"),
            from: "bot",
            id: Date.now() + 1,
            isNew: true,
            type: "message",
          },
        ],
        userId: user?.id || 0,
      }).then(() => scrollToBottom());
    } else {
      scrollToBottom(false);
    }

    return () => {
      markMessagesAsRead();
    };
  }, []);

  const scrollToBottom = useCallback((withSmooth = true) => {
    chatEndRef.current?.scrollIntoView({
      behavior: withSmooth ? "smooth" : "instant",
      block: "end",
    });
  }, []);

  const animationCompleteHandler = () => {
    setIsAwaitingAnswer(false);
  };

  const sendMessageHandler = async (message: string) => {
    setMessageValue("");
    setIsAwaitingAnswer(true);
    try {
      await sendMessage({
        message,
        userId: user!.id,
        onMessageAdded: scrollToBottom,
      });
    } catch (error) {
      console.error(error);
      toast(String(error));
    }
  };

  return {
    sendMessage: sendMessageHandler,
    messageValue,
    setMessageValue,
    chatEndRef,
    scrollToBottom,
    animationCompleteHandler,
    isAwaitingAnswer,
  };
};
