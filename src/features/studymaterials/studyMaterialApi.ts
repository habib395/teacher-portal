import { apiSlice } from "../api/apiSlice";

export interface StudyMaterial {
  _id: string;
  title: string;
  subject: string;
  category: "PDF Notes" | "Video Lecture" | "Source Code" | "Assignment Guide";
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
}

export const studyMaterialApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudyMaterials: builder.query<StudyMaterial[], void>({
      query: () => "/study-materials",
      providesTags: ["StudyMaterial"],
    }),
  }),
});

export const { useGetStudyMaterialsQuery } = studyMaterialApi;