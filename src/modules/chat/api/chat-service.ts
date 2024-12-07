import { Message } from "../stores/chat-store";

export const chatService = {
  sendMessage: async (message: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const answer = "some bot answer on " + message + "...";

    localStorage.setItem(
      "messages",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("messages") || "[]"),
        { from: "user", text: message, id: Date.now() },
        { from: "bot", text: answer, id: Date.now() + 1 },
      ])
    );

    return answer;
  },

  getMessages: async (): Promise<Message[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return JSON.parse(localStorage.getItem("messages") || "[]");
  },
};
