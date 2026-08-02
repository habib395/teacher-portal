import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';

export default function StudentLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-b bg-gray-50 p-4">
                <h2 className="text-lg font-bold">Student Panel</h2>
                <nav className="mt-6 flex flex-col gap-3">
                    <Link to="/student">Dashboard</Link>
                    <Link to="/student/result">My Result</Link>
                    <Link to="/student/assignments">Assignments</Link>
                </nav>
            </aside>

            <div className="flex-1">
                <header className="flex items-center justify-between border-b p-4">
                    <span>Welcome, Student</span>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}