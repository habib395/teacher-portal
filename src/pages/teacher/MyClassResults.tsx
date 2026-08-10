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
import type { RootState } from "@/app/store";
import { marksApi } from "@/features/marks/markApi";

export default function MyClassResults() {
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
        Class Result Summary
        {myClassGroup && ` — ${myClassGroup.programName} (${myClassGroup.yearName})`}
      </h1>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Total Marks</TableHead>
              <TableHead className="text-right">Average</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myClassStudents.map((student) => (
              <ResultRow
                key={student._id}
                studentId={student._id}
                studentName={student.name}
                rollNumber={student.rollNumber}
              />
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

function ResultRow({
  studentId,
  studentName,
  rollNumber,
}: {
  studentId: string;
  studentName: string;
  rollNumber: string;
}) {
  const { data: results, isLoading } = marksApi.useGetMarksByStudentQuery(studentId);

  const total = results?.reduce((sum, r) => sum + r.marks, 0) ?? 0;
  const average = results?.length ? (total / results.length).toFixed(1) : "0";

  return (
    <TableRow>
      <TableCell>{rollNumber}</TableCell>
      <TableCell>{studentName}</TableCell>
      <TableCell>{isLoading ? "..." : results?.length ?? 0}</TableCell>
      <TableCell>{isLoading ? "..." : total}</TableCell>
      <TableCell className="text-right font-semibold">
        {isLoading ? "..." : average}
      </TableCell>
    </TableRow>
  );
}