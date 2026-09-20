import { apiSlice } from "./apiSlice";

const PICKUPS_URL = "/api/pickups";
const CATEGORIES_URL = "/api/categories";

export const pickupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRequest: builder.mutation({
      query: (data) => ({
        url: PICKUPS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),
    getMyRequests: builder.query({
      query: () => ({
        url: `${PICKUPS_URL}/my-requests`,
      }),
      providesTags: ["Order"],
    }),
    getAllRequests: builder.query({
      query: () => ({
        url: PICKUPS_URL,
      }),
      providesTags: ["Order"],
    }),
    getAssignedRequests: builder.query({
      query: () => ({
        url: `${PICKUPS_URL}/assigned`,
      }),
      providesTags: ["Order"],
    }),
    assignAgent: builder.mutation({
      query: ({ requestId, agentId }) => ({
        url: `${PICKUPS_URL}/${requestId}/assign`,
        method: "PUT",
        body: { agentId },
      }),
      invalidatesTags: ["Order"],
    }),
    updateStatus: builder.mutation({
      query: ({ requestId, status, finalWeight }) => ({
        url: `${PICKUPS_URL}/${requestId}/status`,
        method: "PUT",
        body: { status, finalWeight },
      }),
      invalidatesTags: ["Order"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: `${PICKUPS_URL}/stats`,
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: CATEGORIES_URL,
      }),
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateRequestMutation,
  useGetMyRequestsQuery,
  useGetAllRequestsQuery,
  useGetAssignedRequestsQuery,
  useAssignAgentMutation,
  useUpdateStatusMutation,
  useGetDashboardStatsQuery,
  useGetCategoriesQuery,
} = pickupApiSlice;
