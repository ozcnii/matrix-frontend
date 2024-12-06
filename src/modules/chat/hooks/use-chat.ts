import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { chatService } from "../api/chat-service";

export type Message = {
  text: string;
  from: "user" | "bot";
  id: number;
  isNew: boolean;
};

export const useChat = () => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [waitAnswer, setWaitAnswer] = useState(false);

  const [messagesLimit] = useState(3);
  const [messageValue, setMessageValue] = useState("");

  const [messages, setMessages] = useState<Message[]>([
    {
      text: t("chat.first_bot_message"),
      from: "bot",
      id: -1,
      isNew: true,
    },
  ]);

  const userMessages = messages.filter((message) => message.from === "user");

  const messagesLimitReached = userMessages.length >= messagesLimit;

  const messageButtonDisabled =
    !messageValue || messagesLimitReached || waitAnswer || loading;

  const pushMessage = (message: Message) => {
    setMessages((messages) => [...messages, message]);
  };

  const addMessage = (text: string) => {
    pushMessage({
      text,
      from: "user",
      id: userMessages.length,
      isNew: true,
    });
    setMessageValue("");
    sendMessage();
  };

  const sendMessage = () => {
    setWaitAnswer(true);
    chatService.sendMessage(messageValue).then((answer) => {
      pushMessage({
        text: answer,
        from: "bot",
        id: Date.now(),
        isNew: true,
      });
      setWaitAnswer(false);
    });
  };

  useEffect(() => {
    chatService.getMessages().then((messages) => {
      setMessages([
        {
          text: t("chat.first_bot_message"),
          from: "bot",
          id: -1,
          isNew: false,
        },
        ...messages,
      ]);

      setLoading(false);
    });
  }, []);

  return {
    messages,
    addMessage,
    messageValue,
    setMessageValue,
    messageButtonDisabled,
    messagesLimitReached,
    messagesLimit,
    userMessages,
    loading,
  };
};
