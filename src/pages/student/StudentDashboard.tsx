import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Award, 
  FileText,
  AlertCircle
} from "lucide-react";

export default function StudentDashboard() {

  const studentName = "Md. Habibur Rahman";
  const attendanceRate = 94; 
  
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 5, minutes: 42, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-8 rounded-3xl text-white shadow-xl border border-indigo-500/20">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="px-3.5 py-1 bg-indigo-500/30 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-200 uppercase tracking-wider">
              Student Portal
            </span>
            <h1 className="text-3xl font-bold mt-3">
              Welcome back, <span className="text-cyan-300">{studentName}</span>! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Here is your overall academic progress and upcoming deadlines for this week. Keep up the great work!
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl text-center">
            <p className="text-xs text-slate-300">Today's Date</p>
            <p className="text-base font-bold text-white">
              {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Cards (Attendance Rate & Others) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Attendance Rate Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Attendance Rate</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">{attendanceRate}%</h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Good standing
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending Tasks</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">01</h3>
            <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Due soon
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        {/* Submitted Assignments */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Submitted</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">05</h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Total completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Total Grade / CGPA */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Performance</p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">A+</h3>
            <p className="text-xs text-cyan-600 font-medium mt-1">Class Standing</p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Award className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Lower Grid: Presentation Countdown & Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Presentation Countdown Box (1 Column) */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">Next Presentation</span>
              <Clock className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold">Topic: Neonatal Sepsis Overview</h3>
            <p className="text-xs text-slate-300 mt-1">Subject: Pediatric Nursing</p>
          </div>

          {/* Countdown Timer Display */}
          <div className="my-6">
            <p className="text-xs text-slate-400 mb-2">Starts in:</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-300">{timeLeft.days}</span>
                <span className="block text-[10px] text-slate-300 uppercase">Days</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-300">{timeLeft.hours}</span>
                <span className="block text-[10px] text-slate-300 uppercase">Hours</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-300">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-slate-300 uppercase">Mins</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                <span className="text-xl font-bold text-cyan-300">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-slate-300 uppercase">Secs</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10">
            📌 Slot Number: <span className="font-bold text-white">#04</span> (Be prepared 10 mins prior)
          </div>
        </div>

        {/* Upcoming Assignments Quick Preview (2 Columns) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Pending Assignment</h3>
              <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">View All</span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Algebra Worksheet - Chapter 4</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Subject: Mathematics • Deadline: 2026-08-10</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Neonatal Sepsis Case Study</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Subject: Pediatric • Deadline: 2026-08-03</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                  Submitted
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Make sure to submit tasks before the deadline.</span>
            <span className="font-semibold text-indigo-600">Total: 2 Assignments</span>
          </div>
        </div>

      </div>

    </div>
  );
}