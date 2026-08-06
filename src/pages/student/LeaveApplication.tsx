import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Send, FileText, CheckCircle2, Clock, XCircle, Sparkles, PlusCircle, AlertCircle } from "lucide-react";

interface LeaveRecord {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
}

const initialLeaves: LeaveRecord[] = [
  {
    id: "1",
    leaveType: "Sick Leave",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    reason: "Fever and viral infection.",
    status: "Approved",
  },
  {
    id: "2",
    leaveType: "Personal Leave",
    startDate: "2026-08-20",
    endDate: "2026-08-20",
    reason: "Family emergency work.",
    status: "Pending",
  },
];

export default function LeaveApplication() {
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState<LeaveRecord[]>(initialLeaves);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason) {
      alert("Please fill in all the required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newLeave: LeaveRecord = {
        id: Date.now().toString(),
        leaveType,
        startDate,
        endDate,
        reason,
        status: "Pending",
      };

      setLeaves([newLeave, ...leaves]);
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);

      // ফর্ম রিসেট
      setStartDate("");
      setEndDate("");
      setReason("");
    }, 1000);
  };

  // স্ট্যাটিস্টিকস কাউন্ট
  const totalApplied = leaves.length;
  const approvedCount = leaves.filter((l) => l.status === "Approved").length;
  const pendingCount = leaves.filter((l) => l.status === "Pending").length;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Leave Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Leave Application Portal</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Submit your leave requests easily and track approval status in real-time.
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Your leave application has been successfully submitted and is pending review!
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Applications</p>
            <h3 className="text-3xl font-black text-slate-800">{totalApplied}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Approved Leaves</p>
            <h3 className="text-3xl font-black text-emerald-600">{approvedCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</p>
            <h3 className="text-3xl font-black text-amber-600">{pendingCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Application Form Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Apply for New Leave</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Leave Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700"
              >
                <option value="Sick Leave">Sick Leave</option>
                <option value="Personal Leave">Personal Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
              </select>
            </div>

            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Start Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">End Date</label>
              <div className="relative">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Reason for Leave</label>
            <textarea
              rows={3}
              placeholder="Provide a clear reason for your leave application..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 placeholder:text-slate-400"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </div>

      {/* Leave History Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Leave History & Status</h2>
          <span className="text-xs font-semibold text-slate-400">Total: {leaves.length} records</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Leave Type</TableHead>
              <TableHead className="py-4 px-6">Duration</TableHead>
              <TableHead className="py-4 px-6">Reason</TableHead>
              <TableHead className="py-4 px-6 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {leaves.length > 0 ? (
              leaves.map((leave) => (
                <TableRow key={leave.id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="py-4 px-6 font-bold text-slate-800 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    {leave.leaveType}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-mono text-xs font-semibold text-slate-600">
                    {leave.startDate} <span className="text-slate-400">to</span> {leave.endDate}
                  </TableCell>
                  <TableCell className="py-4 px-6 font-medium text-slate-600 max-w-xs truncate">
                    {leave.reason}
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs ${
                        leave.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : leave.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                          : "bg-rose-50 text-rose-700 border border-rose-200/60"
                      }`}
                    >
                      {leave.status === "Approved" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {leave.status === "Pending" && <Clock className="w-3.5 h-3.5" />}
                      {leave.status === "Rejected" && <XCircle className="w-3.5 h-3.5" />}
                      {leave.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No leave applications found.</p>
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