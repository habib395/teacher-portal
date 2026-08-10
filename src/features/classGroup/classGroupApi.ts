import { apiSlice } from "@/features/api/apiSlice";
import type { ClassGroup } from "@/types";

interface ClassGroupPayload {
  programName: string;
  yearName: string;
}

export const classGroupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClassGroups: builder.query<ClassGroup[], void>({
      query: () => "/class-groups",
      providesTags: ["ClassGroup"],
    }),
    createClassGroup: builder.mutation<ClassGroup, ClassGroupPayload>({
      query: (payload) => ({
        url: "/class-groups",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ClassGroup"],
    }),
    deleteClassGroup: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/class-groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ClassGroup"],
    }),
  }),
});

export const {
  useGetClassGroupsQuery,
  useCreateClassGroupMutation,
  useDeleteClassGroupMutation,
} = classGroupApi;