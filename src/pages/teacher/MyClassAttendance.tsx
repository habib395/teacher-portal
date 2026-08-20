import { useState } from "react";
import { useSelector } from "react-redux";
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
import { attendanceApi } from "@/features/attendance/attendanceApi";
import type { RootState } from "@/app/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyClassAttendance() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const { data: students } = useGetStudentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);

  const classTeacherIds: string[] = Array.isArray(myTeacherRecord?.classTeacherOf)
    ? myTeacherRecord.classTeacherOf
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : myTeacherRecord?.classTeacherOf ? [myTeacherRecord.classTeacherOf as any] : [];

  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const activeClassId = selectedClassId || classTeacherIds[0] || "";

  const myClassGroup = classGroups?.find((cg) => cg._id === activeClassId);
  const myClassStudents =
    students?.filter((s) => s.classGroupId === activeClassId) ?? [];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">
          Class Attendance Summary
          {myClassGroup && 
            ` — ${myClassGroup.programName} (${myClassGroup.yearName}${myClassGroup.section ? `, ${myClassGroup.section}` : ""})`}
        </h1>

        {classTeacherIds.length > 1 && (
          <div className="w-64">
            <Select value={activeClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classTeacherIds.map((id) => {
                  const cg = classGroups?.find((c) => c._id === id);
                  if (!cg) return null;
                  return (
                    <SelectItem key={id} value={id}>
                      {cg.programName} — {cg.yearName} {cg.section ? `(${cg.section})` : ""}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Present Days</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead className="text-right">Attendance Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myClassStudents.map((student) => (
              <AttendanceRow key={student._id} studentId={student._id} studentName={student.name} rollNumber={student.rollNumber} />
            ))}
            {myClassStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No students assigned to this class yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function AttendanceRow({
  studentId,
  studentName,
  rollNumber,
}: {
  studentId: string;
  studentName: string;
  rollNumber: string;
}) {
  const { data: summary, isLoading } = attendanceApi.useGetAttendanceSummaryQuery(studentId);

  return (
    <TableRow>
      <TableCell>{rollNumber}</TableCell>
      <TableCell>{studentName}</TableCell>
      <TableCell>{isLoading ? "..." : summary?.presentDays ?? 0}</TableCell>
      <TableCell>{isLoading ? "..." : summary?.totalDays ?? 0}</TableCell>
      <TableCell className="text-right font-semibold">
        {isLoading ? "..." : `${summary?.attendanceRate ?? 0}%`}
      </TableCell>
    </TableRow>
  );
}