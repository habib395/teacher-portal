import { apiSlice } from "@/features/api/apiSlice";
import type { StudyMaterial } from "@/types";

export const studyMaterialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudyMaterials: builder.query<StudyMaterial[], void>({
      query: () => "/study-materials",
      providesTags: ["StudyMaterial"],
    }),
    uploadStudyMaterial: builder.mutation<StudyMaterial, FormData>({
      query: (formData) => ({
        url: "/study-materials",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
    deleteStudyMaterial: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/study-materials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudyMaterial"],
    }),
  }),
});

export const {
  useGetStudyMaterialsQuery,
  useUploadStudyMaterialMutation,
  useDeleteStudyMaterialMutation,
} = studyMaterialApi;