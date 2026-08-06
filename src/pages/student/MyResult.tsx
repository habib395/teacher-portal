import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RootState } from "@/app/store";
import { useGetMarksByStudentQuery } from "@/features/marks/markApi";
import { Award, BookOpen, CheckCircle2, TrendingUp, Sparkles, AlertCircle, BarChart3 } from "lucide-react";

// গ্রেড ক্যালকুলেশন হেলপার ফাংশন
function calculateGrade(marks: number) {
  if (marks >= 80) return { grade: "A+", gpa: "5.00", color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  if (marks >= 70) return { grade: "A", gpa: "4.00", color: "text-indigo-600 bg-indigo-50 border-indigo-200" };
  if (marks >= 60) return { grade: "A-", gpa: "3.50", color: "text-blue-600 bg-blue-50 border-blue-200" };
  if (marks >= 50) return { grade: "B", gpa: "3.00", color: "text-amber-600 bg-amber-50 border-amber-200" };
  if (marks >= 40) return { grade: "C", gpa: "2.00", color: "text-orange-600 bg-orange-50 border-orange-200" };
  if (marks >= 33) return { grade: "D", gpa: "1.00", color: "text-yellow-600 bg-yellow-50 border-yellow-200" };
  return { grade: "F", gpa: "0.00", color: "text-rose-600 bg-rose-50 border-rose-200" };
}

export default function MyResult() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const { data: results, isLoading, isError } = useGetMarksByStudentQuery(
    studentProfileId ?? "",
    { skip: !studentProfileId }
  );

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-500 tracking-wide animate-pulse">Loading academic results...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-rose-50 border border-rose-200 rounded-3xl p-6 text-center">
        <AlertCircle className="w-10 h-10 text-rose-500 mb-2" />
        <h3 className="text-lg font-bold text-rose-800">Failed to load result</h3>
        <p className="text-sm text-rose-600 mt-1">Please check your network connection and try again later.</p>
      </div>
    );
  }

  const totalMarks = results?.reduce((sum, r) => sum + r.marks, 0) ?? 0;
  const averageMarks = results?.length ? (totalMarks / results.length).toFixed(1) : "0";
  const totalSubjects = results?.length || 0;
  
  // সার্বিক জিপিএ বা পারফরম্যান্স নির্ধারণ
  const avgNum = parseFloat(averageMarks);
  const overallPerformance = avgNum >= 80 ? "Outstanding (A+)" : avgNum >= 60 ? "Good Standing (A/A-)" : avgNum >= 40 ? "Satisfactory" : "Needs Improvement";

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Academic Grade Report
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">My Examination Results</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Review your semester marks, subject-wise letter grades, and overall academic performance metrics.
          </p>
        </div>
      </div>

      {/* Advanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Marks Obtained</p>
            <h3 className="text-3xl font-black text-slate-800">{totalMarks}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Average Score</p>
            <h3 className="text-3xl font-black text-emerald-600">{averageMarks}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Evaluated Subjects</p>
            <h3 className="text-3xl font-black text-blue-600">{totalSubjects}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Results Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800">Subject-wise Score Breakdown</h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">
            Status: {overallPerformance}
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Subject Name</TableHead>
              <TableHead className="py-4 px-6">Marks Obtained</TableHead>
              <TableHead className="py-4 px-6">Letter Grade</TableHead>
              <TableHead className="py-4 px-6 text-right">GPA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {results && results.length > 0 ? (
              results.map((result) => {
                const { grade, gpa, color } = calculateGrade(result.marks);
                return (
                  <TableRow key={result.subject} className="hover:bg-slate-50/60 transition-colors">
                    <TableCell className="py-4 px-6 font-bold text-slate-800 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      {result.subject}
                    </TableCell>
                    <TableCell className="py-4 px-6 font-mono font-bold text-slate-700">
                      {result.marks} <span className="text-xs font-normal text-slate-400">/ 100</span>
                    </TableCell>
                    <TableCell className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
                        Grade {grade}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-6 text-right font-mono font-bold text-slate-800">
                      {gpa}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No examination results found.</p>
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