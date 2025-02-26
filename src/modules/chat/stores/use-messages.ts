import { create } from "zustand";
import { chatService } from "../api/chat-service";
import { flushSync } from "react-dom";

export type Message = {
  text: string;
  from: "user" | "bot";
  id: number;
  isNew: boolean;
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
    initialMessage: Message;
    userId: number;
  }) => Promise<void>;
  sendMessage: (params: {
    message: string;
    userId: number;
    onMessageAdded: () => void;
  }) => Promise<void>;
}

export const useMessages = create<MessagesStore>((set, get) => ({
  messagesLimit: 3,
  messages: [],
  isFetchingMessages: true,

  incrementMessagesLimit: () =>
    set((state) => ({ messagesLimit: state.messagesLimit + 1 })),

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

  fetchMessages: async ({ initialMessage, userId }) => {
    set({ isFetchingMessages: true });
    const messages = await chatService.getMessages({ userId });
    const newMessages = [
      { ...initialMessage, isNew: messages.length === 0 },
      ...messages,
    ];
    // TODO
    // const userMessages = newMessages.filter((m) => m.from === "user")
    set({
      messages: newMessages,
      isFetchingMessages: false,
      messagesLimit: 3, // TODO:
    });
  },

  sendMessage: async ({ message, userId, onMessageAdded }) => {
    const { addMessage, deleteMessage } = get();

    const userMessage: Message = {
      text: message,
      from: "user",
      id: Date.now(),
      isNew: true,
    };

    flushSync(() => {
      addMessage(userMessage);
    });

    onMessageAdded();

    try {
      const answer = await chatService.sendMessage({
        message,
        userId,
      });

      addMessage({
        text: answer,
        from: "bot",
        id: Date.now(),
        isNew: true,
      });
    } catch (error) {
      console.error(error);
      deleteMessage(userMessage.id);
      throw error;
    }
  },
}));
