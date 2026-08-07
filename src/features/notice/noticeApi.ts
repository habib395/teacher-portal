import { apiSlice } from "@/features/api/apiSlice";
import type { Notice } from "@/types";

interface CreateNoticePayload {
  title: string;
  message: string;
}

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query<Notice[], void>({
      query: () => "/notices",
      providesTags: ["Notice"],
    }),
    createNotice: builder.mutation<Notice, CreateNoticePayload>({
      query: (payload) => ({
        url: "/notices",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Notice"],
    }),
    deleteNotice: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/notices/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notice"],
    }),
  }),
});

export const { useGetNoticesQuery, useCreateNoticeMutation, useDeleteNoticeMutation } =
  noticeApi;