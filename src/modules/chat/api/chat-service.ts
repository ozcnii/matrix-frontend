import { api } from "@/modules/common/api";
import { Message } from "../stores/chat-store";

export const chatService = {
  askQuestion: async ({
    question,
    userId,
  }: {
    question: string;
    userId: number;
  }) => {
    const sum = [...userId.toString()]
      .map(Number)
      .reduce((prev, acc) => prev + acc, 0);

    const { data } = await api.post<{ response: string }>(
      "/ask_question",
      { question, task_id: sum % 3 },
      {
        headers: {
          userid: userId,
        },
      }
    );

    const answer = data.response;

    localStorage.setItem(
      "messages",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("messages") || "[]"),
        { from: "user", text: question, id: Date.now() },
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
