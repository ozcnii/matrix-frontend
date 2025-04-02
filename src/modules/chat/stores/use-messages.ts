import { create } from "zustand";
import { chatService } from "../api/chat-service";
import { flushSync } from "react-dom";

export type Message = {
  text: string;
  from: "user" | "bot";
  id: number;
  isNew: boolean;
  type: "message" | "words";
};

interface MessagesStore {
  messagesLimit: number;
  messages: Message[];
  isFetchingMessages: boolean;
  incrementMessagesLimit: () => void;
  addMessage: (message: Message) => void;
  deleteMessage: (messageId: number) => void;
  markMessagesAsRead: () => void;
  fetchMessages: (params: {
    initialMessages: Message[];
    userId: number;
    taskId: number;
  }) => Promise<void>;
  sendMessage: (params: {
    message: string;
    userId: number;
    taskId: number;
    onMessageAdded: () => void;
  }) => Promise<{ response: string; solved: boolean; solved_word: string }>;
}

export const useMessages = create<MessagesStore>((set, get) => ({
  messagesLimit: 3,
  messages: [],
  isFetchingMessages: true,

  incrementMessagesLimit: (incrementValue = 3) =>
    set((state) => ({ messagesLimit: state.messagesLimit + incrementValue })),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.id !== messageId),
    })),

  markMessagesAsRead: () =>
    set((state) => ({
      messages: state.messages.map((message) => ({ ...message, isNew: false })),
    })),

  fetchMessages: async ({ initialMessages, userId, taskId }) => {
    set({ isFetchingMessages: true });
    const { messages, messagesLimit } = await chatService.getMessages({
      userId,
      taskId,
    });

    if (messages.length === 0) {
      await chatService.startRiddle({ userId, taskId });
    }

    const newMessages = [
      ...initialMessages.map((m) => ({ ...m, isNew: messages.length === 0 })),
      ...messages,
    ];

    const userMessages = newMessages.filter((m) => m.from === "user");

    set({
      messages: newMessages,
      isFetchingMessages: false,
      messagesLimit: userMessages.length + messagesLimit,
    });
  },

  sendMessage: async ({ message, userId, onMessageAdded, taskId }) => {
    const { addMessage, deleteMessage } = get();

    const userMessage: Message = {
      text: message,
      from: "user",
      id: Date.now(),
      isNew: true,
      type: "message",
    };

    flushSync(() => {
      addMessage(userMessage);
    });

    onMessageAdded();

    try {
      const data = await chatService.sendMessage({
        message,
        userId,
        taskId,
      });

      addMessage({
        text: data.response,
        from: "bot",
        id: Date.now(),
        isNew: true,
        type: "message",
      });

      return data;
    } catch (error) {
      console.error(error);
      deleteMessage(userMessage.id);
      throw error;
    }
  },
}));
