import { useMemo, useState } from "react";
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
import { useGetStudentsQuery } from "@/features/student/studentApi";
import {
  useGetAttendanceByDateQuery,
  useSaveAttendanceMutation,
} from "@/features/attendance/attendanceApi";
import type { AttendanceRecord, AttendanceStatus } from "@/types";
import { Calendar, Search, CheckCircle2, XCircle, Users, Save, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [searchQuery, setSearchQuery] = useState("");
  const [manualOverrides, setManualOverrides] = useState<Record<string, AttendanceStatus>>({});
  // const [showNotification, setShowNotification] = useState(false);

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const { data: existingAttendance } = useGetAttendanceByDateQuery(selectedDate);
  const [saveAttendance, { isLoading: isSaving }] = useSaveAttendanceMutation();

  const records: AttendanceRecord[] = useMemo(() => {
    if (!students) return [];

    return students.map((student) => {
      const existing = existingAttendance?.find(
        (record) => record.studentId === student._id
      );
      return {
        studentId: student._id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        status: manualOverrides[student._id] || existing?.status || "present",
      };
    });
  }, [students, existingAttendance, manualOverrides]);

  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(r.rollNumber).includes(searchQuery)
    );
  }, [records, searchQuery]);

  const totalCount = records.length;
  const presentCount = records.filter((r) => r.status === "present").length;
  const absentCount = totalCount - presentCount;
  const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setManualOverrides((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    records.forEach((r) => {
      updated[r.studentId] = status;
    });
    setManualOverrides(updated);
  };

  const handleSaveAttendance = async () => {
    try {
      await saveAttendance({ date: selectedDate, records }).unwrap();
      toast.success("Attendance saved successfully!");
      setManualOverrides({});
    } catch (err) {
      console.error("Failed to save attendance:", err);
      toast.error("Failed to save attendance.");
    }
  };

  if (studentsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 tracking-wide animate-pulse">Loading Attendance Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Top Header Section with Gradient Banner Feel */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Real-time Tracker
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Student Attendance Portal</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Effortlessly monitor, update, and manage classroom presence with dynamic batch control.
          </p>
        </div>

        <div className="relative z-15 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-2xl backdrop-blur-md shadow-inner">
            <Calendar className="w-4 h-4 text-indigo-300" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setManualOverrides({});
              }}
              className="bg-transparent text-sm font-semibold text-white outline-none cursor-pointer border-0 shadow-none focus-visible:ring-0 p-0 h-auto w-32 [color-scheme:dark]"
            />
          </div>
          <Button 
            onClick={handleSaveAttendance} 
            disabled={isSaving}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Records"}
          </Button>
        </div>
      </div>

      {/* Success Notification Alert */}
      {/* {showNotification && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl shadow-sm text-sm font-semibold animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          Attendance successfully recorded and saved for {selectedDate}!
        </div>
      )} */}

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled</p>
            <h3 className="text-3xl font-black text-slate-800">{totalCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Present Today</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-emerald-600">{presentCount}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">{attendancePercentage}%</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Absent Today</p>
            <h3 className="text-3xl font-black text-rose-600">{absentCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <XCircle className="w-6 h-6" />
          </div>
        </div>

        {/* Bulk Action Panel */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-center gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Quick Bulk Actions</p>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => markAll("present")}
              className="text-xs font-bold text-emerald-600 bg-emerald-50/50 border-emerald-200 hover:bg-emerald-100 hover:text-emerald-700 rounded-xl h-9"
            >
              All Present
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => markAll("absent")}
              className="text-xs font-bold text-rose-600 bg-rose-50/50 border-rose-200 hover:bg-rose-100 hover:text-rose-700 rounded-xl h-9"
            >
              All Absent
            </Button>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 w-full sm:max-w-md focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by student name or roll number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 px-2">
          Showing <span className="text-slate-800 font-bold">{filteredRecords.length}</span> of {totalCount} students
        </div>
      </div>

      {/* Modern Clean Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Roll Number</TableHead>
              <TableHead className="py-4 px-6">Student Name</TableHead>
              <TableHead className="py-4 px-6">Current Status</TableHead>
              <TableHead className="py-4 px-6 text-right">Action Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.studentId} className="hover:bg-slate-50/60 transition-colors group">
                  <TableCell className="py-4 px-6 font-mono font-bold text-slate-700">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                      #{record.rollNumber}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                    {record.studentName}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide shadow-xs ${
                        record.status === "present"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                          : "bg-rose-50 text-rose-700 border border-rose-200/60"
                      }`}
                    >
                      {record.status === "present" ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      {record.status === "present" ? "Present" : "Absent"}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right space-x-2">
                    <Button
                      size="sm"
                      variant={record.status === "present" ? "default" : "outline"}
                      onClick={() => updateStatus(record.studentId, "present")}
                      className={`rounded-xl text-xs font-bold px-4 h-9 transition-all shadow-xs ${
                        record.status === "present" 
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20" 
                          : "border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                      }`}
                    >
                      Present
                    </Button>
                    <Button
                      size="sm"
                      variant={record.status === "absent" ? "destructive" : "outline"}
                      onClick={() => updateStatus(record.studentId, "absent")}
                      className={`rounded-xl text-xs font-bold px-4 h-9 transition-all shadow-xs ${
                        record.status === "absent" 
                          ? "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20" 
                          : "border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
                      }`}
                    >
                      Absent
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No students found matching your search query.</p>
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