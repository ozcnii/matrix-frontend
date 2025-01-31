import { create } from "zustand";
import { chatService } from "../api/chat-service";

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
  addMessage: (message: Message) => void;
  deleteMessage: (messageId: number) => void;
  markMessagesAsRead: () => void;
  fetchMessages: (initialMessage: Message) => Promise<void>;
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

  fetchMessages: async (initialMessage) => {
    set({ isFetchingMessages: true });
    const messages = await chatService.getMessages();
    set({
      messages: [
        { ...initialMessage, isNew: messages.length === 0 },
        ...messages,
      ],
      isFetchingMessages: false,
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

    addMessage(userMessage);

    // wait for the message to be added to DOM
    setTimeout(onMessageAdded, 0);

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
