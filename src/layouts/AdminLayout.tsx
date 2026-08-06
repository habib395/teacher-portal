import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Megaphone, 
  Settings, 
  LogOut 
} from "lucide-react";

export default function AdminLayout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between shadow-sm">
                <div>
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-rose-500/20">
                            A
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Admin Control</h2>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link 
                            to="/admin" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
                        </Link>
                        
                        <Link 
                            to="/admin/teachers" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <Users className="w-4 h-4" /> Manage Teachers
                        </Link>

                        <Link 
                            to="/admin/students" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <GraduationCap className="w-4 h-4" /> Manage Students
                        </Link>

                        <Link 
                            to="/admin/courses" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <BookOpen className="w-4 h-4" /> Courses & Setup
                        </Link>

                        <Link 
                            to="/admin/notices" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <Megaphone className="w-4 h-4" /> Global Notice
                        </Link>

                        <Link 
                            to="/admin/settings" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-all duration-200"
                        >
                            <Settings className="w-4 h-4" /> Settings
                        </Link>
                    </nav>
                </div>

                {/* Sidebar Footer */}
                <div className="pt-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700">System Admin</p>
                        <p className="text-[10px] text-rose-600 mt-0.5">Full Access Control</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Welcome, <strong className="text-slate-800">Administrator</strong></span>
                    </div>
                    <Button 
                        variant="outline" 
                        onClick={handleLogout}
                        className="flex items-center gap-2 border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </header>
                
                <main className="flex-1 p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}