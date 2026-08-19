import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
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
  useGetMarksBySubjectQuery,
  useSaveMarksMutation,
} from "@/features/marks/markApi";
import type { MarksRecord } from "@/types";
import type { RootState } from "@/app/store";
import { Search, Award, Users, Save, CheckCircle2 } from "lucide-react";

export default function MarksEntry() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const [selectedAssignmentKey, setSelectedAssignmentKey] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualMarks, setManualMarks] = useState<Record<string, number>>({});

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const [saveMarks, { isLoading: isSaving }] = useSaveMarksMutation();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);

  const myAssignments = myTeacherRecord?.teachingAssignments ?? [];

  const selected = myAssignments.find(
    (a) => `${a.classGroupId}|${a.subject}` === selectedAssignmentKey
  );
  const selectedClassId = selected?.classGroupId ?? "";
  const selectedSubject = selected?.subject ?? "";

  const { data: existingMarks } = useGetMarksBySubjectQuery(selectedSubject, {
    skip: !selectedSubject,
  });

  const classStudents =
    students?.filter((s) => s.classGroupId === selectedClassId) ?? [];

  const records: MarksRecord[] = useMemo(() => {
    return classStudents.map((student) => {
      const existing = existingMarks?.find((m) => m.studentId === student._id);
      return {
        studentId: student._id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        subject: selectedSubject,
        marks: manualMarks[student._id] ?? existing?.marks ?? 0,
      };
    });
  }, [classStudents, existingMarks, manualMarks, selectedSubject]);

  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(r.rollNumber).includes(searchQuery)
    );
  }, [records, searchQuery]);

  const calculateGrade = (marks: number) => {
    if (marks >= 80) return { grade: "A+", color: "text-emerald-600 bg-emerald-50" };
    if (marks >= 70) return { grade: "A", color: "text-indigo-600 bg-indigo-50" };
    if (marks >= 60) return { grade: "A-", color: "text-blue-600 bg-blue-50" };
    if (marks >= 50) return { grade: "B", color: "text-amber-600 bg-amber-50" };
    if (marks >= 40) return { grade: "C", color: "text-orange-600 bg-orange-50" };
    if (marks > 0) return { grade: "F", color: "text-red-600 bg-red-50" };
    return { grade: "-", color: "text-slate-400 bg-slate-50" };
  };

  const updateMarks = (studentId: string, value: string) => {
    let num = Number(value);
    if (num > 100) num = 100;
    if (num < 0) num = 0;
    setManualMarks((prev) => ({ ...prev, [studentId]: num }));
  };

  const handleSaveMarks = async () => {
    if (!selectedClassId || !selectedSubject) {
      toast.error("Please select a class and subject first.");
      return;
    }
    try {
      await saveMarks({ records }).unwrap();
      toast.success("Marks saved successfully!");
      setManualMarks({});
    } catch (err) {
      console.error("Failed to save marks:", err);
      toast.error("Failed to save marks.");
    }
  };

  if (studentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading student records...
        </p>
      </div>
    );
  }

  const totalStudents = records.length;
  const averageMarks =
    totalStudents > 0
      ? Math.round(records.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Marks Entry</h1>
          <p className="text-sm text-slate-500">Record and grade semester evaluation scores.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Select value={selectedAssignmentKey} onValueChange={setSelectedAssignmentKey}>
            <SelectTrigger className="w-64 bg-white">
              <SelectValue placeholder="Select Class & Subject" />
            </SelectTrigger>
            <SelectContent>
              {myAssignments.map((a) => {
                const cg = classGroups?.find((c) => c._id === a.classGroupId);
                return (
                  <SelectItem
                    key={`${a.classGroupId}|${a.subject}`}
                    value={`${a.classGroupId}|${a.subject}`}
                  >
                    {a.subject} — {cg ? `${cg.programName} (${cg.yearName})` : "Unknown"}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Button
            onClick={handleSaveMarks}
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 rounded-xl"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Marks"}
          </Button>
        </div>
      </div>

      {!selectedAssignmentKey ? (
        <p className="text-sm text-gray-500">
          Please select a class and subject above to begin marks entry.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Students
                </p>
                <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{totalStudents}</h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Selected Subject
                </p>
                <h3 className="text-lg font-bold text-slate-800 mt-0.5 truncate max-w-[200px]">
                  {selectedSubject}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Class Average
                </p>
                <h3 className="text-2xl font-bold text-indigo-600 mt-0.5">
                  {averageMarks} <span className="text-xs text-slate-400">/ 100</span>
                </h3>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm max-w-md">
            <Search className="w-4 h-4 text-slate-400 ml-1" />
            <input
              type="text"
              placeholder="Search by student name or roll..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none bg-transparent text-slate-700"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <TableHead className="p-4">Roll Number</TableHead>
                  <TableHead className="p-4">Student Name</TableHead>
                  <TableHead className="p-4 text-center">Calculated Grade</TableHead>
                  <TableHead className="p-4 text-right">Marks (Out of 100)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-slate-100 text-sm text-slate-600">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => {
                    const gradeInfo = calculateGrade(record.marks);
                    return (
                      <TableRow
                        key={record.studentId}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <TableCell className="p-4 font-mono font-bold text-slate-700">
                          {record.rollNumber}
                        </TableCell>
                        <TableCell className="p-4 font-semibold text-slate-800">
                          {record.studentName}
                        </TableCell>
                        <TableCell className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-lg text-xs font-bold ${gradeInfo.color}`}
                          >
                            {gradeInfo.grade}
                          </span>
                        </TableCell>
                        <TableCell className="p-4 text-right">
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={record.marks}
                            onChange={(e) => updateMarks(record.studentId, e.target.value)}
                            className="ml-auto w-24 text-right rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-slate-400">
                      No students found in this class.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}