import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    profile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
    }),
    getAgents: builder.query({
      query: () => ({
        url: `${USERS_URL}/agents`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileQuery,
  useGetAllUsersQuery,
  useGetAgentsQuery,
} = userApiSlice;
