import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function TeacherLayout () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login")
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r bg-gray-50 p-4">
                <h2 className="text-lg font-bold">Teacher Panel</h2>
                <nav className="mt-6 flex flex-col gap-3">
                    <Link to="/teacher" >Dashboard</Link>
                    <Link to="/teacher/attendance" >Attendance</Link>
                    <Link to="/teacher/marks" >Marks Entry</Link>
                    <Link to="/teacher/assignments">Assignments</Link>
                    <Link to="/teacher/upload-materials">Upload Materials</Link>
                    <Link to="/teacher/presentations">Presentations</Link>
                    <Link to="/teacher/settings">Settings</Link>
                </nav>
            </aside>

            <div className="flex-1">
                <header className="flex items-center justify-between border-b p-4">
                    <span>Welcome, Teacher</span>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}