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

export default function MyClassAttendance() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const { data: students } = useGetStudentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);
  const myClassGroup = classGroups?.find((cg) => cg._id === myTeacherRecord?.classTeacherOf);
  const myClassStudents =
    students?.filter((s) => s.classGroupId === myTeacherRecord?.classTeacherOf) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Class Attendance Summary
        {myClassGroup && ` — ${myClassGroup.programName} (${myClassGroup.yearName})`}
      </h1>

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