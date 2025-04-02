import { api } from "@/modules/common/api";

export type UserInfoResponse = {
  solved: number;
  unsolved: number;
};

export const userService = {
  getUserRiddlesStat: async ({
    userId,
  }: {
    userId: number;
  }): Promise<UserInfoResponse> => {
    const { data } = await api.get("/user_riddles_stat", {
      headers: {
        userid: userId,
      },
    });
    return data;
  },
  getSeedPhrase: async ({ userId }: { userId: number }): Promise<string[]> => {
    const { data } = await api.get<string[]>("/get_seed_phrase", {
      headers: {
        userid: userId,
      },
    });
    return data;
  },
};
