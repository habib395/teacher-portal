import { Button } from "@/components/ui/button";
import { login, type UserRole } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (role: UserRole) => {
        dispatch(login({ role, name: "Test User"}));
        navigate(`/${role}`)
    }
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Login (Test Page)</h1>
            <p className="text-gray-600">Choose a role to login as (temporary, for testing)</p>
            <div className="flex gap-4">
                <Button onClick={() => handleLogin("admin")}>Login as Admin</Button>
                <Button onClick={() => handleLogin("teacher")}>Login as Teacher</Button>
                <Button onClick={() => handleLogin("student")}>Login as Student</Button>
            </div>
        </div>
    )
}