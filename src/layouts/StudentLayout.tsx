import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileText, 
  CheckSquare, 
  CalendarOff, 
  Presentation, 
  BookOpen, 
  LogOut 
} from "lucide-react";

export default function StudentLayout() {
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
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-500/20">
                            S
                        </div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">Student Panel</h2>
                    </div>

                    <nav className="flex flex-col gap-2">
                        <Link 
                            to="/student" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        
                        <Link 
                            to="/student/assignments" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <CheckSquare className="w-4 h-4" /> Assignments
                        </Link>

                        <Link 
                            to="/student/leave" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <CalendarOff className="w-4 h-4" /> Leave Application
                        </Link>

                        <Link 
                            to="/student/presentations" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <Presentation className="w-4 h-4" /> Presentations
                        </Link>

                        <Link 
                            to="/student/materials" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <BookOpen className="w-4 h-4" /> Study Materials
                        </Link>

                        <Link 
                            to="/student/result" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <FileText className="w-4 h-4" /> My Result
                        </Link>
                        <Link 
                            to="/student/settings" 
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                        >
                            <FileText className="w-4 h-4" /> Settings
                        </Link>
                    </nav>
                </div>

                {/* Sidebar Footer / Quick User Info */}
                <div className="pt-6 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-500">
                        <p className="font-semibold text-slate-700">Md. Habibur Rahman</p>
                        <p className="text-[10px] text-cyan-600 mt-0.5">Active Student</p>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="flex items-center justify-between bg-white border-b border-slate-200 px-8 py-4 shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-600">Welcome, <strong className="text-slate-800">Student</strong></span>
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