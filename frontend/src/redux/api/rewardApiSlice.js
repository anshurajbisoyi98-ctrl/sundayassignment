import { apiSlice } from "./apiSlice";

const REWARDS_URL = "/api/rewards";

export const rewardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyWallet: builder.query({
      query: () => ({
        url: `${REWARDS_URL}/my-wallet`,
      }),
    }),
  }),
});

export const {
  useGetMyWalletQuery,
} = rewardApiSlice;
