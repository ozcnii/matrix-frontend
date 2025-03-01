import { api } from "@/modules/common/api";

export type GetReferralsResponse = { count: number; earn: number };

export const referralsService = {
  async getReferrals(userId: number) {
    const { data } = await api.get<{ count: number; earn: number }>(
      "/referals",
      {
        headers: {
          userid: userId,
        },
      }
    );
    return data;
  },
};
