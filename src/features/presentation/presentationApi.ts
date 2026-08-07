import { apiSlice } from "@/features/api/apiSlice";
import type { Presentation } from "@/types";

interface CreatePresentationPayload {
  studentId: string;
  studentName: string;
  topic: string;
  subject: string;
  date: string;
  time: string;
}

export const presentationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPresentations: builder.query<Presentation[], void>({
      query: () => "/presentations",
      providesTags: ["Presentation"],
    }),
    createPresentation: builder.mutation<Presentation, CreatePresentationPayload>({
      query: (payload) => ({
        url: "/presentations",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Presentation"],
    }),
    deletePresentation: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/presentations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Presentation"],
    }),
  }),
});

export const {
  useGetPresentationsQuery,
  useCreatePresentationMutation,
  useDeletePresentationMutation,
} = presentationApi;