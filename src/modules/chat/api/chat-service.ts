import { Message } from "../hooks/use-chat";

export const chatService = {
  sendMessage: async (message: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const answer = "some bot answer on " + message + "...";

    localStorage.setItem(
      "messages",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("messages") || "[]"),
        { from: "user", text: message },
        { from: "bot", text: answer },
      ])
    );

    return answer;
  },

  getMessages: async (): Promise<Message[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return JSON.parse(localStorage.getItem("messages") || "[]");
  },
};
