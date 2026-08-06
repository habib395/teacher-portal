import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAssignmentsQuery,
  useSubmitAssignmentMutation,
} from "@/features/assignment/assignmentApi";
import type { RootState } from "@/app/store";
import { BookOpen, CheckCircle2, Clock, Send, Sparkles, AlertCircle, FileText } from "lucide-react";

export default function Assignments() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "submitted">("all");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  const [submitAssignment, { isLoading: isSubmitting }] = useSubmitAssignmentMutation();

  const handleSubmit = async (assignmentId: string, title: string) => {
    try {
      await submitAssignment(assignmentId).unwrap();
      setSuccessMsg(`Successfully submitted "${title}"!`);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Failed to submit assignment:", err);
      alert("Failed to submit assignment. Please try again.");
    }
  };

  // স্ট্যাটিস্টিকস ক্যালকুলেশন
  const totalCount = assignments?.length || 0;
  const submittedCount = assignments?.filter((a) =>
    studentProfileId ? a.submittedBy.includes(studentProfileId) : false
  ).length || 0;
  const pendingCount = totalCount - submittedCount;

  // ফিল্টারড অ্যাসাইনমেন্টস
  const filteredAssignments = useMemo(() => {
    if (!assignments) return [];
    return assignments.filter((assignment) => {
      const isSubmitted = studentProfileId ? assignment.submittedBy.includes(studentProfileId) : false;
      if (filterStatus === "pending") return !isSubmitted;
      if (filterStatus === "submitted") return isSubmitted;
      return true;
    });
  }, [assignments, studentProfileId, filterStatus]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 tracking-wide animate-pulse">Loading assignments...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mb-2" />
        <h3 className="text-lg font-bold text-rose-800">Failed to load assignments</h3>
        <p className="text-sm text-rose-600 mt-1">Please check your network connection and try refreshing.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Student Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Assignments</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Track your semester tasks, check submission deadlines, and submit your work on time.
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Assignments</p>
            <h3 className="text-3xl font-black text-slate-800">{totalCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Submitted</p>
            <h3 className="text-3xl font-black text-emerald-600">{submittedCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending</p>
            <h3 className="text-3xl font-black text-amber-600">{pendingCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === "all" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilterStatus("pending")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === "pending" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus("submitted")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === "submitted" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          Submitted
        </button>
      </div>

      {/* Assignments Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Task Title</TableHead>
              <TableHead className="py-4 px-6">Subject</TableHead>
              <TableHead className="py-4 px-6">Deadline</TableHead>
              <TableHead className="py-4 px-6">Status</TableHead>
              <TableHead className="py-4 px-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((assignment) => {
                const isSubmitted = studentProfileId
                  ? assignment.submittedBy.includes(studentProfileId)
                  : false;

                return (
                  <TableRow key={assignment._id} className="hover:bg-slate-50/60 transition-colors group">
                    <TableCell className="py-4 px-6 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      {assignment.title}
                    </TableCell>
                    <TableCell className="py-4 px-6 font-semibold text-slate-600">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
                        {assignment.subject}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 font-mono text-slate-500 text-xs font-semibold">
                      {assignment.deadline}
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs ${
                          isSubmitted
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                            : "bg-amber-50 text-amber-700 border border-amber-200/60"
                        }`}
                      >
                        {isSubmitted ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {isSubmitted ? "Submitted" : "Pending Task"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <Button
                        size="sm"
                        disabled={isSubmitted || isSubmitting}
                        onClick={() => handleSubmit(assignment._id, assignment.title)}
                        className={`rounded-xl text-xs font-bold px-5 h-9 transition-all shadow-xs flex items-center gap-1.5 ml-auto ${
                          isSubmitted
                            ? "bg-emerald-100 text-emerald-700 cursor-not-allowed shadow-none"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20"
                        }`}
                      >
                        {isSubmitted ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" /> {isSubmitting ? "Submitting..." : "Submit Task"}
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No assignments found for this filter category.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}