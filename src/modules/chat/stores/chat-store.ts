import { create } from "zustand";
import { chatService } from "../api/chat-service";

export type Message = {
  text: string;
  from: "user" | "bot";
  id: number;
  isNew: boolean;
};

type ChatState = {
  currentMessageValue: string;
  messages: Message[];
  loading: boolean;
  waitAnswer: boolean;
  messagesLimit: number;
  addMessage: (text: string) => Promise<void>;
  pushMessage: (message: Message) => void;
  setCurrentMessageValue: (text: string) => void;
  fetchMessages: (initialMessage: Message) => Promise<void>;
  markAllMessagesAsRead: () => void;
};

export const useChatStore = create<ChatState>((set, get) => ({
  currentMessageValue: "",
  messages: [],
  loading: true,
  waitAnswer: false,
  messagesLimit: 3,

  setCurrentMessageValue: (text) => set({ currentMessageValue: text }),

  addMessage: async (text: string) => {
    const { pushMessage } = get();

    pushMessage({
      text,
      from: "user",
      id: Date.now(),
      isNew: true,
    });

    set({
      currentMessageValue: "",
      waitAnswer: true,
    });

    const answer = await chatService.sendMessage(text);

    pushMessage({
      text: answer,
      from: "bot",
      id: Date.now(),
      isNew: true,
    });

    set({
      waitAnswer: false,
    });
  },

  pushMessage: (message: Message) => {
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  fetchMessages: async (initialMessage: Message) => {
    set({ loading: true });
    const messages = await chatService.getMessages();
    initialMessage.isNew = messages.length === 0;

    set({ messages: [initialMessage, ...messages], loading: false });
  },

  markAllMessagesAsRead: () => {
    set(({ messages }) => ({
      messages: messages.map((message) => ({ ...message, isNew: false })),
    }));
  },
}));
