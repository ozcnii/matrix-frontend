import { api } from "@/modules/common/api";

export type TaskSubjectsResponse = {
  id: number;
  title: string;
  description: { ru: string; en: string };
}[];

export const taskService = {
  getTasks: async (): Promise<TaskSubjectsResponse> => {
    const { data } = await api.get("/task_subjects");
    return data;
  },
};
