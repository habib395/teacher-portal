import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "teacher" | "student" | null;

interface AuthState {
  isLoggedIn: boolean;
  role: UserRole;
  name: string | null;
  userId: string | null;
  studentProfile: string | null;
  teacherProfile: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  name: null,
  userId: null,
  studentProfile: null,
  teacherProfile: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        role: UserRole;
        name: string;
        userId: string;
        studentProfile: string | null;
        teacherProfile: string | null;
        token: string;
      }>
    ) => {
      state.isLoggedIn = true;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      state.studentProfile = action.payload.studentProfile;
      state.teacherProfile = action.payload.teacherProfile;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.name = null;
      state.userId = null;
      state.studentProfile = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;