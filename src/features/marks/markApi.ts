import { apiSlice } from "@/features/api/apiSlice";
import type { MarksRecord } from "@/types";

interface SaveMarksPayload {
  records: MarksRecord[];
}

export const marksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMarksByStudent: builder.query<MarksRecord[], string>({
      query: (studentId) => `/marks?studentId=${studentId}`,
      providesTags: ["Marks"],
    }),
    saveMarks: builder.mutation<{ message: string }, SaveMarksPayload>({
      query: (payload) => ({
        url: "/marks",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Marks"],
    }),
  }),
});

export const { useGetMarksByStudentQuery, useSaveMarksMutation } = marksApi;