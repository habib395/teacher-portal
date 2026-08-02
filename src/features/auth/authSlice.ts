import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "admin" | "teacher" | "student" | null;

interface AuthSlice {
    isLoggedIn: boolean;
    role: UserRole;
    name: string | null;
}

const initialState: AuthSlice = {
    isLoggedIn: false,
    role: null,
    name: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{role: UserRole; name: string}>) => {
            state.isLoggedIn = true;
            state.role = action.payload.role;
            state.name = action.payload.name;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.role = null;
            state.name = null
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;