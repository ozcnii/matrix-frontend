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
  askQuestion: (params: {
    question: string;
    userId: number;
    onMessageAdded: () => void;
  }) => Promise<void>;
  setCurrentMessageValue: (text: string) => void;
  fetchMessages: (initialMessage: Message) => Promise<void>;
  markAllMessagesAsRead: () => void;
  animationCompleteHandler: () => void;
};

export const useChatStore = create<ChatState>((set) => ({
  currentMessageValue: "",
  messages: [],
  loading: true,
  waitAnswer: false,
  messagesLimit: 3,

  setCurrentMessageValue: (text) => set({ currentMessageValue: text }),

  askQuestion: async ({
    question,
    userId,
    onMessageAdded,
  }: {
    question: string;
    userId: number;
    onMessageAdded: () => void;
  }) => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          text: question,
          from: "user",
          id: Date.now(),
          isNew: true,
        },
      ],
    }));

    // wait for the message to be added to DOM
    setTimeout(onMessageAdded, 0);

    set({ currentMessageValue: "", waitAnswer: true });

    try {
      const answer = await chatService.askQuestion({ question, userId });

      set((state) => ({
        messages: [
          ...state.messages,
          {
            text: answer,
            from: "bot",
            id: Date.now(),
            isNew: true,
          },
        ],
      }));
    } catch (error) {
      console.error(error);

      set((state) => ({
        messages: state.messages.slice(0, state.messages.length - 1),
      }));

      throw error;
    }
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

  animationCompleteHandler: () => set({ waitAnswer: false }),
}));
