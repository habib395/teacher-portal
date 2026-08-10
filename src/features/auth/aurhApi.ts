import { apiSlice } from "@/features/api/apiSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "admin" | "teacher" | "student";
    studentProfile: string | null;
    teacherProfile: string | null; 
  };
}

interface UpdateProfilePayload {
  name: string;
  email: string;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    updateProfile: builder.mutation<{ message: string }, UpdateProfilePayload>({
      query: (payload) => ({
        url: "/auth/profile",
        method: "PUT",
        body: payload,
      }),
    }),
    changePassword: builder.mutation<{ message: string }, ChangePasswordPayload>({
      query: (payload) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;