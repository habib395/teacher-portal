import { Users, CheckSquare, CalendarOff, BookOpen, TrendingUp, Clock } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Teacher Dashboard Overview</h1>
        <p className="text-sm text-slate-500">Manage your classes, student attendance, submissions, and leave requests.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total My Students */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">My Students</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">120</h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> Active Batch 2026
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Assignments to Grade */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pending Submissions</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">18</h3>
            <span className="text-xs text-amber-600 font-medium flex items-center gap-1 mt-2">
              <Clock className="w-3 h-3" /> Requires grading
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CheckSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Leave Requests</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">5</h3>
            <span className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-2">
              Pending approval
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <CalendarOff className="w-6 h-6" />
          </div>
        </div>

        {/* Study Materials Uploaded */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Materials Shared</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">24</h3>
            <span className="text-xs text-slate-500 font-medium mt-2 block">
              Chapter-wise notes
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Activities / Shortcuts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Today's Class Schedule</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">Advanced Frontend Development</p>
                <p className="text-xs text-slate-400">Batch: React & Next.js • Room 302</p>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full">10:00 AM</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">UI/UX Design Principles</p>
                <p className="text-xs text-slate-400">Batch: Design System • Lab 01</p>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full">02:30 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Student Leave Applications</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">Tanvir Ahmed <span className="text-xs text-slate-400">(Roll: 12)</span></p>
                <p className="text-xs text-slate-500">Reason: Fever / Medical Leave</p>
              </div>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-lg">Pending</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-semibold text-slate-800">Sumaiya Akter <span className="text-xs text-slate-400">(Roll: 05)</span></p>
                <p className="text-xs text-slate-500">Reason: Family Emergency</p>
              </div>
              <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2.5 py-1 rounded-lg">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}