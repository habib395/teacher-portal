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
import { Presentation, Calendar, Clock, CheckCircle2, PlusCircle, Sparkles, AlertCircle, User, BookOpen } from "lucide-react";

interface PresentationRecord {
  id: string;
  topicTitle: string;
  subject: string;
  presentationDate: string;
  timeSlot: string;
  status: "Scheduled" | "Completed" | "Pending Review";
}

const initialPresentations: PresentationRecord[] = [
  {
    id: "1",
    topicTitle: "MERN Stack Architecture & Best Practices",
    subject: "Web Engineering",
    presentationDate: "2026-08-15",
    timeSlot: "10:30 AM - 11:00 AM",
    status: "Scheduled",
  },
  {
    id: "2",
    topicTitle: "Docker Containerization in Microservices",
    subject: "Cloud & DevOps",
    presentationDate: "2026-08-20",
    timeSlot: "02:00 PM - 02:30 PM",
    status: "Pending Review",
  },
];

export default function StudentPresentations() {
  const [topicTitle, setTopicTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [presentationDate, setPresentationDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM - 10:30 AM");
  const [presentations, setPresentations] = useState<PresentationRecord[]>(initialPresentations);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitle || !subject || !presentationDate) {
      alert("Please fill in all the required fields.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newPresentation: PresentationRecord = {
        id: Date.now().toString(),
        topicTitle,
        subject,
        presentationDate,
        timeSlot,
        status: "Pending Review",
      };

      setPresentations([newPresentation, ...presentations]);
      setIsSubmitting(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);

      // ফর্ম রিসেট
      setTopicTitle("");
      setSubject("");
      setPresentationDate("");
    }, 1000);
  };

  const totalCount = presentations.length;
  const scheduledCount = presentations.filter((p) => p.status === "Scheduled").length;
  const pendingCount = presentations.filter((p) => p.status === "Pending Review").length;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Academic Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Presentations</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Submit your upcoming presentation topics, schedule time slots, and track evaluations smoothly.
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Your presentation topic has been submitted and is pending instructor review!
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Topics</p>
            <h3 className="text-3xl font-black text-slate-800">{totalCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Presentation className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled</p>
            <h3 className="text-3xl font-black text-emerald-600">{scheduledCount}</h3>
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

      {/* Submission Form Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Submit Presentation Topic</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Topic Title */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Presentation Topic</label>
              <Input
                type="text"
                placeholder="e.g., Advanced React Server Components"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject Name</label>
              <Input
                type="text"
                placeholder="e.g., Web Development"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Presentation Date */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Preferred Date</label>
              <Input
                type="date"
                value={presentationDate}
                onChange={(e) => setPresentationDate(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
              />
            </div>

            {/* Time Slot */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-sm font-semibold bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-700 cursor-pointer"
              >
                <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                <option value="10:30 AM - 11:00 AM">10:30 AM - 11:00 AM</option>
                <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
            >
              <Presentation className="w-4 h-4" />
              {isSubmitting ? "Submitting..." : "Submit Topic"}
            </Button>
          </div>
        </form>
      </div>

      {/* Presentations Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">My Presentations & Schedule</h2>
          <span className="text-xs font-semibold text-slate-400">Total: {presentations.length} records</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Topic & Subject</TableHead>
              <TableHead className="py-4 px-6">Date & Slot</TableHead>
              <TableHead className="py-4 px-6 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {presentations.length > 0 ? (
              presentations.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="py-4 px-6 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-indigo-600 shrink-0" />
                      {item.topicTitle}
                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 rounded-md text-xs font-semibold text-slate-600">
                      {item.subject}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 space-y-1 text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-slate-700 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.presentationDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {item.timeSlot}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs ${
                        item.status === "Scheduled"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : item.status === "Pending Review"
                          ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                          : "bg-indigo-50 text-indigo-700 border border-indigo-200/60"
                      }`}
                    >
                      {item.status === "Scheduled" && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {item.status === "Pending Review" && <Clock className="w-3.5 h-3.5" />}
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No presentation records found.</p>
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