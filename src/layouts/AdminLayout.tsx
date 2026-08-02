import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout } from "@/features/auth/authSlice";


export default function AdminLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 border-b bg-gray-50 p-4">
                <h2 className="text-lg font-bold">Admin Panel</h2>
                <nav className="mt-6 flex flex-col gap-3">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/teachers">Manage Teachers</Link>
                    <Link to="/admin/students">Manage Students</Link>
                </nav>
            </aside>
            {/* Main Content */}
            <div className="flex-1">
                <header className="flex items-center justify-between border-b p-4">
                    <span>Welcome, Admin</span>
                    <Button variant="outline" onClick={handleLogout}>Logout</Button>
                </header>
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}