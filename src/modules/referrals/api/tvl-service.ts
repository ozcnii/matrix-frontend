import { api } from "@/modules/common/api";

export type TvlPrizeResponse = {
  totalTon: number;
  totXTR: number;
};

export const tvlService = {
  getTvlPrize: async (): Promise<TvlPrizeResponse> => {
    const { data } = await api.get("/tvl_prize");
    return data;
  },
};
