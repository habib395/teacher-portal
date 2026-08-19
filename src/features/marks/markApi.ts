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
    getMarksBySubject: builder.query<MarksRecord[], string>({
      query: (subject) => `/marks/by-subject?subject=${encodeURIComponent(subject)}`,
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

export const { useGetMarksByStudentQuery, useSaveMarksMutation, useGetMarksBySubjectQuery } = marksApi;