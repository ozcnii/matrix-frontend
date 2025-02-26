import { api } from "@/modules/common/api";
import { Message } from "../stores/use-messages";

export const chatService = {
  sendMessage: async ({
    message,
    userId,
  }: {
    message: string;
    userId: number;
  }) => {
    const sum = [...userId.toString()]
      .map(Number)
      .reduce((prev, acc) => prev + acc, 0);

    const { data } = await api.post<{ response: string }>(
      "/ask_question",
      { question: message, task_id: sum % 3 },
      {
        headers: {
          userid: userId,
        },
      }
    );

    const answer = data.response;

    return answer;
  },

  getMessages: async ({
    userId,
  }: {
    userId: number;
  }): Promise<{ messages: Message[]; messagesLimit: number }> => {
    const response = await api.get<{
      msgs: (
        | {
            user: string;
            id: number;
          }
        | { system: string; id: number }
      )[];
      free_msgs: number;
    }>("/riddle_history/1", {
      headers: { userid: userId },
    });

    const messages: Message[] = [];

    response.data.msgs.forEach((message) => {
      if ("system" in message) {
        messages.push({
          from: "bot",
          id: message.id,
          isNew: false,
          text: message.system,
        });
      }

      if ("user" in message) {
        messages.push({
          from: "user",
          id: message.id,
          isNew: false,
          text: message.user,
        });
      }
    });

    return {
      messages,
      messagesLimit: response.data.free_msgs,
    };
  },
};
