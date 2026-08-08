import { useGetTeachersQuery } from "@/features/teacher/teacherApi";
import { useGetStudentsQuery } from "@/features/student/studentApi";
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";
import { Users, GraduationCap, FileText, Activity, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function AdminDashboard() {
  const { data: teachers } = useGetTeachersQuery();
  const { data: students } = useGetStudentsQuery();
  const { data: assignments } = useGetAssignmentsQuery();

  const totalTeachers = teachers?.length || 0;
  const totalStudents = students?.length || 0;
  const totalAssignments = assignments?.length || 0;

  const chartData = [
    { name: "Teachers", count: totalTeachers, fill: "#4f46e5" },
    { name: "Students", count: totalStudents, fill: "#10b981" },
    { name: "Assignments", count: totalAssignments, fill: "#f59e0b" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> System Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome to your Admin Dashboard</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Monitor overall institutional statistics, manage faculty & student records, and track academic progress seamlessly.
          </p>
        </div>
      </div>

      {/* Top Stat Cards Grid (Colorful & Icon based) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Teachers Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Teachers</p>
            <h3 className="text-3xl font-black text-slate-800">{totalTeachers}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> Active Faculty
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <Users className="w-7 h-7" />
          </div>
        </div>

        {/* Total Students Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Students</p>
            <h3 className="text-3xl font-black text-slate-800">{totalStudents}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" /> Enrolled
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <GraduationCap className="w-7 h-7" />
          </div>
        </div>

        {/* Total Assignments Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Assignments</p>
            <h3 className="text-3xl font-black text-slate-800">{totalAssignments}</h3>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
              <Activity className="w-3 h-3" /> Published
            </span>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
            <FileText className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Analytics & Financial Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Summary Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" /> System Overview
            </h2>
            <p className="text-xs text-slate-400 mt-1">Real-time metrics of your portal performance.</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-semibold text-slate-600">Faculty-Student Ratio</span>
              <span className="text-sm font-bold text-indigo-600 font-mono">1 : {totalTeachers > 0 ? Math.round(totalStudents / totalTeachers) : 0}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <span className="text-sm font-semibold text-slate-600">Portal Status</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Online & Secure</span>
            </div>
          </div>
          <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100">
            <p className="text-xs font-medium text-indigo-900">💡 Tip: Use the sidebar navigation to add new teachers or assign tasks instantly.</p>
          </div>
        </div>

        {/* Bar Chart Overview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Portal Statistics Overview</h2>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">Live Analytics</span>
          </div>
          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="count" radius={[12, 12, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}