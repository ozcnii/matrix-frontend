import { create } from "zustand";

interface TvlStore {
  isTvlLoading: boolean;
  setIsTvlLoading: (isTvlLoading: boolean) => void;

  totalUsd: number;
  setTvl: (payload: { totalUsd: number }) => void;
}

export const useTvl = create<TvlStore>((set) => ({
  isTvlLoading: false,
  setIsTvlLoading: (isTvlLoading) => set({ isTvlLoading }),

  totalTon: 0,
  totXTR: 0,
  totalUsd: 0,
  setTvl: (payload) => set(payload),
}));
