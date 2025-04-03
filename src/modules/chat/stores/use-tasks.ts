import { create } from "zustand";
import { TaskSubjectsResponse } from "../api/task-service";

interface TasksStore {
  solved: number;
  unsolved: number;
  setSolvedTasks: (payload: { solved: number; unsolved: number }) => void;
  getCurrentTask: () => number;
  getTotalTasksCount: () => number;

  tasks: TaskSubjectsResponse;
  setTasks: (tasks: TaskSubjectsResponse) => void;

  getCurrentTaskSubject: () => TaskSubjectsResponse[number];

  isTaskDescriptionLoading: boolean;
  setIsTaskDescriptionLoading: (isTaskDescriptionLoading: boolean) => void;
}

export const useTasks = create<TasksStore>((set, get) => ({
  solved: 0,
  unsolved: 0,
  setSolvedTasks: ({ solved, unsolved }) => set({ solved, unsolved }),
  getCurrentTask: () => get().solved + 1,
  getTotalTasksCount: () => get().solved + get().unsolved,

  getCurrentTaskSubject: () => {
    const { getCurrentTask, tasks } = get();
    return tasks[getCurrentTask() - 1];
  },

  tasks: [],
  setTasks: (tasks) => set({ tasks }),

  isTaskDescriptionLoading: false,
  setIsTaskDescriptionLoading: (isTaskDescriptionLoading) =>
    set({ isTaskDescriptionLoading }),
}));
