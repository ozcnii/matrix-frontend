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
    try {
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
            type: "message",
          });
        }

        if ("user" in message) {
          messages.push({
            from: "user",
            id: message.id,
            isNew: false,
            text: message.user,
            type: "message",
          });
        }
      });

      return {
        messages,
        messagesLimit: response.data.free_msgs,
      };
    } catch (error) {
      return {
        messages: [],
        messagesLimit: 0,
      };
    }
  },

  startRiddle: async ({
    userId,
    taskId,
  }: {
    userId: number;
    taskId: number;
  }) => {
    const response = await api.post<{
      msgs: (
        | {
            user: string;
            id: number;
          }
        | { system: string; id: number }
      )[];
      free_msgs: number;
    }>(
      "/start_riddle",
      {
        task_id: taskId,
      },
      {
        headers: { userid: userId },
      }
    );

    console.log("@@@", response.data);
  },
};
