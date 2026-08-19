import { apiSlice } from "@/features/api/apiSlice";
import type { Teacher } from "@/types";

export interface CreateTeacherResponse extends Teacher {
  defaultPassword?: string;
}

export const teacherApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeachers: builder.query<Teacher[], void>({
      query: () => "/teachers",
      providesTags: ["Teacher"],
    }),
    
    // createTeacher endpoint এ:
    createTeacher: builder.mutation<CreateTeacherResponse, Partial<Teacher>>({
      query: (newTeacher) => ({
        url: "/teachers",
        method: "POST",
        body: newTeacher,
      }),
      invalidatesTags: ["Teacher"],
    }),
    updateTeacher: builder.mutation<Teacher, { id: string; data: Partial<Teacher> }>({
      query: ({ id, data }) => ({
        url: `/teachers/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),
    deleteTeacher: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;