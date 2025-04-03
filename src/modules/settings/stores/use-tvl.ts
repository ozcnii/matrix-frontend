import { create } from "zustand";

interface TvlStore {
  isTvlLoading: boolean;
  setIsTvlLoading: (isTvlLoading: boolean) => void;

  totalTon: number;
  totXTR: number;
  setTvl: (payload: { totalTon: number; totXTR: number }) => void;
}

export const useTvl = create<TvlStore>((set) => ({
  isTvlLoading: false,
  setIsTvlLoading: (isTvlLoading) => set({ isTvlLoading }),

  totalTon: 0,
  totXTR: 0,
  setTvl: ({ totalTon, totXTR }) => set({ totalTon, totXTR }),
}));
