import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { UserRole } from "@/features/auth/authSlice";
import type { RootState } from "@/app/store";

interface ProtectedRouteProps {
    allowedRole: UserRole;
}

export default function ProtectedRoute({ allowedRole }: ProtectedRouteProps)  {
    const { isLoggedIn, role } = useSelector((state: RootState) => state.auth);

    if(!isLoggedIn) {
        return <Navigate to="/login" replace />
    }

    if(role !== allowedRole) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}