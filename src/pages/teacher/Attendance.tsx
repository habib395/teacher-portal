import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStudentsQuery } from "@/features/student/studentApi";
import { useGetTeachersQuery } from "@/features/teacher/teacherApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import {
  useGetAttendanceByClassAndDateQuery,
  useSaveAttendanceMutation,
} from "@/features/attendance/attendanceApi";
import type { AttendanceStatus } from "@/types";
import type { RootState } from "@/app/store";
import { Calendar, Search, CheckCircle2, XCircle, Users, Save, Sparkles, AlertCircle, ShieldAlert, Filter } from "lucide-react";
import { toast } from "sonner";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function Attendance() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualOverrides, setManualOverrides] = useState<Record<string, AttendanceStatus>>({});
  
  // নতুন স্টেট: স্ট্যাটাস অনুযায়ী ফিল্টার করার জন্য ("all" | "present" | "absent")
  const [filterStatus, setFilterStatus] = useState<"all" | "present" | "absent">("all");

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);
  
  const myClassIds = useMemo(() => {
    const ids = new Set<string>();
    if (myTeacherRecord?.classTeacherOf) {
      ids.add(myTeacherRecord.classTeacherOf);
    }
    return ids;
  }, [myTeacherRecord]);

  const myClasses = useMemo(() => {
    if (!classGroups) return [];
    return classGroups.filter((cg) => myClassIds.has(cg._id));
  }, [classGroups, myClassIds]);

  const defaultClassId = myClasses.length > 0 ? myClasses[0]._id : "";
  const candidateClassId = selectedClassId || defaultClassId;
  const activeClassId = myClassIds.has(candidateClassId) ? candidateClassId : defaultClassId;

  const { data: existingAttendance } = useGetAttendanceByClassAndDateQuery(
    { classGroupId: activeClassId, date: selectedDate },
    { skip: !activeClassId }
  );

  const [saveAttendance, { isLoading: isSaving }] = useSaveAttendanceMutation();

  const classStudents = useMemo(() => {
    if (!students || !activeClassId) return [];
    return students.filter((s) => s.classGroupId === activeClassId);
  }, [students, activeClassId]);

  const records = useMemo(() => {
    return classStudents.map((student) => {
      const existingRecord = existingAttendance?.records?.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) => r.studentId === student._id
      );
      return {
        studentId: student._id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        status: manualOverrides[student._id] || existingRecord?.status || "present",
      };
    });
  }, [classStudents, existingAttendance, manualOverrides]);

  // ফিল্টারিং লজিক: সার্চ কুয়েরি এবং কার্ড ক্লিক ফিল্টার একত্রে কাজ করবে
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchesSearch =
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(r.rollNumber).includes(searchQuery);
      
      const matchesStatus = filterStatus === "all" ? true : r.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [records, searchQuery, filterStatus]);

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
    if (!activeClassId) {
      toast.error("You are not assigned to any valid class.");
      return;
    }

    try {
      const payloadRecords = records.map((r) => ({
        studentId: r.studentId,
        status: r.status,
      }));

      await saveAttendance({
        classGroupId: activeClassId,
        date: selectedDate,
        records: payloadRecords,
      }).unwrap();

      const isUpdate = existingAttendance && existingAttendance.records && existingAttendance.records.length > 0;
      toast.success(isUpdate ? "Attendance records updated successfully!" : "Attendance saved successfully!");
      setManualOverrides({});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Failed to save attendance:", err);
      toast.error(err?.data?.message || "Failed to save attendance.");
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

  if (myClasses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
        <ShieldAlert className="w-12 h-12 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-800">No Class Assigned</h2>
        <p className="text-sm text-slate-500 max-w-md">
          You are currently not assigned as a class teacher for any batch. Please contact the administrator.
        </p>
      </div>
    );
  }

  const hasExistingData = existingAttendance && existingAttendance.records && existingAttendance.records.length > 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Header Section */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Class Teacher Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Class Attendance Manager</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Manage and modify student presence seamlessly for your assigned class.
          </p>
        </div>

        <div className="relative z-15 flex items-center gap-3 flex-wrap">
          {myClasses.length > 1 && (
            <Select value={activeClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="bg-white/10 border border-white/20 text-white text-sm font-semibold rounded-2xl h-10 px-4 w-52">
                <SelectValue placeholder="Select Your Class" />
              </SelectTrigger>
              <SelectContent className="w-[--radix-select-trigger-width] min-w-[--radix-select-trigger-width] rounded-2xl">
                {myClasses.map((cg) => (
                  <SelectItem key={cg._id} value={cg._id}>
                    {cg.programName} — {cg.yearName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

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
            {isSaving ? "Saving..." : hasExistingData ? "Update Records" : "Save Records"}
          </Button>
        </div>
      </div>

      {hasExistingData && (
        <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl flex items-center gap-3 text-amber-800 text-sm font-semibold">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <span>Attendance for this date has already been submitted. You can modify any student's status and click "Update Records" to save changes.</span>
        </div>
      )}

      {/* Modern Stats Cards (ক্লিক করলে ফিল্টার হবে) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Enrolled Card (ক্লিক করলে সব দেখাবে) */}
        <div 
          onClick={() => setFilterStatus("all")}
          className={`bg-white p-5 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
            filterStatus === "all" ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/10" : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled</p>
            <h3 className="text-3xl font-black text-slate-800">{totalCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Present Today Card (ক্লিক করলে শুধু প্রেজেন্ট দেখাবে) */}
        <div 
          onClick={() => setFilterStatus("present")}
          className={`bg-white p-5 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
            filterStatus === "present" ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/10" : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Present Today</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-emerald-600">{presentCount}</h3>
              <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">{attendancePercentage}%</span>
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Absent Today Card (ক্লিক করলে শুধু এবসেন্ট দেখাবে) */}
        <div 
          onClick={() => setFilterStatus("absent")}
          className={`bg-white p-5 rounded-3xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
            filterStatus === "absent" ? "border-rose-500 ring-2 ring-rose-500/20 bg-rose-50/10" : "border-slate-100 hover:border-slate-300"
          }`}
        >
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Absent Today</p>
            <h3 className="text-3xl font-black text-rose-600">{absentCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
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
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by student name or roll number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>
        
        <div className="flex items-center gap-3">
          {/* যদি ফিল্টার একটিভ থাকে তবে রিসেট করার বাটন দেখাবে */}
          {filterStatus !== "all" && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setFilterStatus("all")}
              className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl h-9"
            >
              Clear Filter ({filterStatus})
            </Button>
          )}
          <div className="text-xs font-semibold text-slate-500 px-2 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Showing <span className="text-slate-800 font-bold">{filteredRecords.length}</span> of {totalCount} students
          </div>
        </div>
      </div>

      {/* Table Section */}
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
                    <p className="font-semibold text-slate-500">No students match this filter.</p>
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