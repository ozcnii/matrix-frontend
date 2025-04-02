import { api } from "@/modules/common/api";
import { Message } from "../stores/use-messages";

export const chatService = {
  sendMessage: async ({
    message,
    userId,
    taskId,
  }: {
    message: string;
    userId: number;
    taskId: number;
  }) => {
    const { data } = await api.post<{
      response: string;
      solved: boolean;
      solved_word: string;
    }>(
      "/ask_question",
      { question: message, task_id: taskId },
      {
        headers: {
          userid: userId,
        },
      }
    );

    return data;
  },

  getMessages: async ({
    userId,
    taskId,
  }: {
    userId: number;
    taskId: number;
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
        won: boolean;
      }>(`/riddle_history/${taskId}`, {
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
  }): Promise<void> => {
    await api.post<{
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
  },
};
