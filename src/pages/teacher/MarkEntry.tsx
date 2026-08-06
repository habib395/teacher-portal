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
import type { MarksRecord } from "@/types";
import { useSaveMarksMutation } from "@/features/marks/markApi";
import { BookOpen, Search, Award, Users, Save, CheckCircle2 } from "lucide-react";

export default function MarksEntry() {
  const [subject, setSubject] = useState("Advanced Frontend");
  const [searchQuery, setSearchQuery] = useState("");
  const [manualMarks, setManualMarks] = useState<Record<string, number>>({});

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const [saveMarks, { isLoading: isSaving }] = useSaveMarksMutation();

  const records: MarksRecord[] = useMemo(() => {
    if (!students) return [];

    return students.map((student) => ({
      studentId: student._id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      subject,
      marks: manualMarks[student._id] ?? 0,
    }));
  }, [students, subject, manualMarks]);

  // ফিল্টারড রেকর্ডস (সার্চ বারের জন্য)
  const filteredRecords = useMemo(() => {
    return records.filter(
      (r) =>
        r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(r.rollNumber).includes(searchQuery)
    );
  }, [records, searchQuery]);

  // গ্রেড ক্যালকুলেশন হেল্পার
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
    try {
      await saveMarks({ records }).unwrap();
      alert("Marks saved successfully!");
      setManualMarks({});
    } catch (err) {
      console.error("Failed to save marks:", err);
      alert("Failed to save marks.");
    }
  };

  if (studentsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading student records...</p>
      </div>
    );
  }

  const totalStudents = records.length;
  const averageMarks = totalStudents > 0 
    ? Math.round(records.reduce((acc, curr) => acc + curr.marks, 0) / totalStudents) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Student Marks Entry</h1>
          <p className="text-sm text-slate-500">Record and grade semester evaluation scores.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
            <BookOpen className="w-4 h-4 text-slate-400" />
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none cursor-pointer"
            >
              <option value="Advanced Frontend">Advanced Frontend</option>
              <option value="Backend Infrastructure">Backend Infrastructure</option>
              <option value="Database Systems">Database Systems</option>
              <option value="UI/UX Design">UI/UX Design</option>
            </select>
          </div>

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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Students</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{totalStudents}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Selected Subject</p>
            <h3 className="text-lg font-bold text-slate-800 mt-0.5 truncate max-w-[200px]">{subject}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Class Average</p>
            <h3 className="text-2xl font-bold text-indigo-600 mt-0.5">{averageMarks} <span className="text-xs text-slate-400">/ 100</span></h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Marks Table */}
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
                  <TableRow key={record.studentId} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="p-4 font-mono font-bold text-slate-700">{record.rollNumber}</TableCell>
                    <TableCell className="p-4 font-semibold text-slate-800">{record.studentName}</TableCell>
                    <TableCell className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${gradeInfo.color}`}>
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
                  No students found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}