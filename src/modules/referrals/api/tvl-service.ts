import { api } from "@/modules/common/api";

export type TvlPrizeResponse = {
  totalUsd: number;
};

export const tvlService = {
  getTvlPrize: async (): Promise<TvlPrizeResponse> => {
    const { data } = await api.get("/tvl_prize");
    return data;
  },
};
