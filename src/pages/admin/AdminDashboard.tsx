import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">System Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Monitor overall portal statistics, teachers, and student activities.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Teachers */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Teachers</p>
            <h3 className="text-3xl font-ext500 font-bold text-slate-800 mt-1">24</h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> +2 joined this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">1,420</h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> +45 active batches
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Total Classes/Courses */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Classes</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">18</h3>
            <span className="text-xs text-slate-500 font-medium mt-2 block">
              Across all departments
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">System Status</p>
            <h3 className="text-xl font-bold text-emerald-600 mt-1">Operational</h3>
            <span className="text-xs text-slate-400 font-medium mt-2 block">
              Server latency: 42ms
            </span>
          </div>
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>

      {/* Quick Activity / Recent Notices Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent System Activities</h3>
        <div className="space-y-3 text-sm text-slate-600">
          <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <span>New teacher account created for <strong>Dr. Rahman</strong></span>
            <span className="text-xs text-slate-400">2 hours ago</span>
          </p>
          <p className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
            <span>Global notice updated regarding upcoming semester finals.</span>
            <span className="text-xs text-slate-400">Yesterday</span>
          </p>
        </div>
      </div>
    </div>
  );
}