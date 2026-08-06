import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useCreateAssignmentMutation,
} from "@/features/assignment/assignmentApi";
import { FilePlus2, Calendar, BookOpen, Users, Sparkles, CheckCircle2, AlertCircle, PlusCircle } from "lucide-react";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const { data: assignments, isLoading } = useGetAssignmentsQuery();
  const [createAssignment, { isLoading: isCreating }] = useCreateAssignmentMutation();

  const handleCreate = async () => {
    if (!title || !subject || !deadline) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await createAssignment({ title, subject, deadline }).unwrap();
      setTitle("");
      setSubject("");
      setDeadline("");
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 4000);
    } catch (err) {
      console.error("Failed to create assignment:", err);
      alert("Failed to create assignment.");
    }
  };

  const totalAssignments = assignments?.length || 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Instructor Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Assignment Management</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Publish new assignments for students, set strict submission deadlines, and monitor trackable student submissions.
          </p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Assignment has been created and published successfully!
        </div>
      )}

      {/* Create Assignment Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
          <PlusCircle className="w-5 h-5 text-indigo-600" />
          <h2 className="text-lg font-bold text-slate-800">Create New Assignment</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-slate-500">Assignment Title</Label>
            <Input 
              id="title" 
              placeholder="e.g., Build MERN Stack Dashboard" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
            />
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject Name</Label>
            <Input 
              id="subject" 
              placeholder="e.g., Web Engineering" 
              value={subject} 
              onChange={(e) => setSubject(e.target.value)} 
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-xs font-bold uppercase tracking-wider text-slate-500">Submission Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none cursor-pointer"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            onClick={handleCreate} 
            disabled={isCreating} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 h-12 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
          >
            <FilePlus2 className="w-4 h-4" />
            {isCreating ? "Publishing..." : "Publish Assignment"}
          </Button>
        </div>
      </div>

      {/* Assignments Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">All Published Assignments</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            Total: {totalAssignments} Records
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Assignment Title & Subject</TableHead>
              <TableHead className="py-4 px-6">Deadline</TableHead>
              <TableHead className="py-4 px-6 text-right">Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-semibold text-slate-500">Loading assignments...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : assignments && assignments.length > 0 ? (
              assignments.map((assignment) => (
                <TableRow key={assignment._id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="py-4 px-6 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      {assignment.title}
                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 rounded-md text-xs font-semibold text-slate-600 ml-11">
                      {assignment.subject}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5 text-slate-700 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {assignment.deadline}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide bg-indigo-50 text-indigo-700 border border-indigo-200/60 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      {assignment.submittedBy.length} Submitted
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No assignments created yet.</p>
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