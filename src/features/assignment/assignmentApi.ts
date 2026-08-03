import { apiSlice } from "@/features/api/apiSlice";
import type { Assignment } from "@/types";

interface CreateAssignmentPayload {
  title: string;
  subject: string;
  deadline: string;
}

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query<Assignment[], void>({
      query: () => "/assignments",
      providesTags: ["Assignment"],
    }),
    createAssignment: builder.mutation<Assignment, CreateAssignmentPayload>({
      query: (payload) => ({
        url: "/assignments",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Assignment"],
    }),
    submitAssignment: builder.mutation<{ message: string }, string>({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}/submit`,
        method: "PUT",
      }),
      invalidatesTags: ["Assignment"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useSubmitAssignmentMutation,
} = assignmentApi;