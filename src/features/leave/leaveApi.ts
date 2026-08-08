import { apiSlice } from "@/features/api/apiSlice";
import type { Leave, LeaveStatus } from "@/types";

export const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaves: builder.query<Leave[], void>({
      query: () => "/leaves",
      providesTags: ["Leave"],
    }),
    createLeave: builder.mutation<Leave, FormData>({
      query: (formData) => ({
        url: "/leaves",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Leave"],
    }),
    updateLeaveStatus: builder.mutation<Leave, { id: string; status: LeaveStatus }>({
      query: ({ id, status }) => ({
        url: `/leaves/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Leave"],
    }),
  }),
});

export const {
  useGetLeavesQuery,
  useCreateLeaveMutation,
  useUpdateLeaveStatusMutation,
} = leaveApi;