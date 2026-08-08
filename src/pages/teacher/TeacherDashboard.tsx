import { Users, CheckSquare, CalendarOff, BookOpen, TrendingUp, Clock, Sparkles, PlusCircle, ArrowRight } from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Teacher Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, Instructor!</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Manage your daily classes, grade pending student submissions, and review leave applications seamlessly.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <button className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2">
            <PlusCircle className="w-4 h-4" /> New Assignment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total My Students */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">My Students</p>
            <h3 className="text-3xl font-black text-slate-800">120</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> Active Batch 2026
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* Pending Assignments to Grade */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Submissions</p>
            <h3 className="text-3xl font-black text-slate-800">18</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
              <Clock className="w-3 h-3" /> Requires grading
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <CheckSquare className="w-7 h-7" />
          </div>
        </div>

        {/* Leave Requests */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Leave Requests</p>
            <h3 className="text-3xl font-black text-slate-800">5</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
              Pending approval
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <CalendarOff className="w-7 h-7" />
          </div>
        </div>

        {/* Study Materials Uploaded */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Materials Shared</p>
            <h3 className="text-3xl font-black text-slate-800">24</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
              Chapter notes
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Recent Activities / Shortcuts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Class Schedule */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Today's Class Schedule</h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Live Routine</span>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex justify-between items-center hover:bg-slate-100/50 transition-colors">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-sm">Advanced Frontend Development</p>
                <p className="text-xs text-slate-400">Batch: React & Next.js • Room 302</p>
              </div>
              <span className="px-3 py-1.5 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl border border-emerald-100">10:00 AM</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex justify-between items-center hover:bg-slate-100/50 transition-colors">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-sm">UI/UX Design Principles</p>
                <p className="text-xs text-slate-400">Batch: Design System • Lab 01</p>
              </div>
              <span className="px-3 py-1.5 bg-amber-50 text-amber-600 text-xs font-bold rounded-xl border border-amber-100">02:30 PM</span>
            </div>
          </div>
        </div>

        {/* Recent Student Leave Applications */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Recent Leave Applications</h3>
            <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-sm">Tanvir Ahmed <span className="text-xs font-normal text-slate-400">(Roll: 12)</span></p>
                <p className="text-xs text-slate-500">Reason: Fever / Medical Leave</p>
              </div>
              <span className="text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">Pending</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/80 flex justify-between items-center">
              <div className="space-y-1">
                <p className="font-bold text-slate-800 text-sm">Sumaiya Akter <span className="text-xs font-normal text-slate-400">(Roll: 05)</span></p>
                <p className="text-xs text-slate-500">Reason: Family Emergency</p>
              </div>
              <span className="text-xs text-rose-600 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}