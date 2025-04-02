import { create } from "zustand";

interface TasksStore {
  solved: number;
  unsolved: number;
  setSolvedTasks: (payload: { solved: number; unsolved: number }) => void;
  getCurrentTask: () => number;
  getTotalTasksCount: () => number;
}

export const useTasks = create<TasksStore>((set, get) => ({
  solved: 0,
  unsolved: 0,
  setSolvedTasks: ({ solved, unsolved }) => set({ solved, unsolved }),
  getCurrentTask: () => get().solved + 1,
  getTotalTasksCount: () => get().solved + get().unsolved,
}));
