import { useSelector } from "react-redux";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Calendar,
  Award,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";
import type { RootState } from "@/app/store";
import { useCountdown } from "@/hooks/useCountdown";
import { useGetPresentationsQuery } from "@/features/presentation/presentationApi";

export default function StudentDashboard() {
  const name = useSelector((state: RootState) => state.auth.name);
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const { data: assignments } = useGetAssignmentsQuery();
  const { data: presentations } = useGetPresentationsQuery();

  const myAssignments = assignments ?? [];
  const pendingAssignments = myAssignments.filter(
    (a) => !studentProfileId || !a.submittedBy.includes(studentProfileId)
  );
  const submittedAssignments = myAssignments.filter(
    (a) => studentProfileId && a.submittedBy.includes(studentProfileId)
  );

  const myPresentations =
    presentations?.filter((p) => p.studentId === studentProfileId) ?? [];
  const nextPresentation = myPresentations
    .slice()
    .sort(
      (a, b) =>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
    )[0];

  const countdown = useCountdown(
    nextPresentation ? `${nextPresentation.date}T${nextPresentation.time}` : ""
  );

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
              Welcome back, <span className="text-cyan-300">{name}</span>! 👋
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Here is your overall academic progress and upcoming deadlines for this week.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl text-center">
            <p className="text-xs text-slate-300">Today's Date</p>
            <p className="text-base font-bold text-white">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Assignments
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
              {String(pendingAssignments.length).padStart(2, "0")}
            </h3>
            <p className="text-xs text-amber-600 font-medium mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Due soon
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Submitted
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
              {String(submittedAssignments.length).padStart(2, "0")}
            </h3>
            <p className="text-xs text-indigo-600 font-medium mt-1">Total completed</p>
          </div>
          <div className="p-4 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Assignments
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
              {String(myAssignments.length).padStart(2, "0")}
            </h3>
            <p className="text-xs text-cyan-600 font-medium mt-1">This term</p>
          </div>
          <div className="p-4 rounded-2xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Presentations
            </p>
            <h3 className="text-3xl font-extrabold text-slate-800 mt-2">
              {String(myPresentations.length).padStart(2, "0")}
            </h3>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Scheduled
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <Calendar className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 3. Lower Grid: Presentation Countdown & Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Presentation Countdown Box */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-indigo-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Next Presentation
              </span>
              <Clock className="w-5 h-5 text-cyan-300 animate-pulse" />
            </div>
            {nextPresentation ? (
              <>
                <h3 className="text-xl font-bold">Topic: {nextPresentation.topic}</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Subject: {nextPresentation.subject}
                </p>
              </>
            ) : (
              <p className="text-sm text-slate-300">No presentation scheduled yet.</p>
            )}
          </div>

          {nextPresentation && (
            <div className="my-6">
              <p className="text-xs text-slate-400 mb-2">Starts in:</p>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="text-xl font-bold text-cyan-300">{countdown.days}</span>
                  <span className="block text-[10px] text-slate-300 uppercase">Days</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="text-xl font-bold text-cyan-300">{countdown.hours}</span>
                  <span className="block text-[10px] text-slate-300 uppercase">Hours</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="text-xl font-bold text-cyan-300">{countdown.minutes}</span>
                  <span className="block text-[10px] text-slate-300 uppercase">Mins</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-xl border border-white/10">
                  <span className="text-xl font-bold text-cyan-300">{countdown.seconds}</span>
                  <span className="block text-[10px] text-slate-300 uppercase">Secs</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Assignments Quick Preview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-md border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Recent Assignments</h3>
              <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">
                View All
              </span>
            </div>

            <div className="space-y-4">
              {myAssignments.slice(0, 3).map((assignment) => {
                const isSubmitted =
                  studentProfileId && assignment.submittedBy.includes(studentProfileId);
                return (
                  <div
                    key={assignment._id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {assignment.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Subject: {assignment.subject} • Deadline: {assignment.deadline}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        isSubmitted
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {isSubmitted ? "Submitted" : "Pending"}
                    </span>
                  </div>
                );
              })}
              {myAssignments.length === 0 && (
                <p className="text-sm text-slate-500">No assignments yet.</p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Make sure to submit tasks before the deadline.</span>
            <span className="font-semibold text-indigo-600">
              Total: {myAssignments.length} Assignments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}