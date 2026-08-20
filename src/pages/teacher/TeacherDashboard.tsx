import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useGetLeavesQuery } from "@/features/leave/leaveApi";
import { attendanceApi } from "@/features/attendance/attendanceApi";
import type { RootState } from "@/app/store";

// আজকের তারিখ বের করার হেল্পার ফাংশন
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function TeacherDashboard() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);
  const { data: teachers } = useGetTeachersQuery();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);

  const classTeacherIds: string[] = Array.isArray(myTeacherRecord?.classTeacherOf)
    ? myTeacherRecord.classTeacherOf
    : myTeacherRecord?.classTeacherOf 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? [myTeacherRecord.classTeacherOf as any] 
    : [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Teacher Dashboard</h1>

      {classTeacherIds.length > 0 ? (
        classTeacherIds.map((classId) => (
          <ClassOverviewSection key={classId} classGroupId={classId} />
        ))
      ) : (
        <p className="mt-8 text-sm text-gray-500">
          You are not currently assigned as a Class Teacher of any class.
        </p>
      )}
    </div>
  );
}

function ClassOverviewSection({ classGroupId }: { classGroupId: string }) {
  const { data: classGroups } = useGetClassGroupsQuery();
  const { data: students } = useGetStudentsQuery();
  const { data: leaves } = useGetLeavesQuery();
  const today = getTodayDate();

  const classGroup = classGroups?.find((cg) => cg._id === classGroupId);
  const classStudents = students?.filter((s) => s.classGroupId === classGroupId) ?? [];

  const classLeaves = leaves?.filter((l) => {
    const student = students?.find((s) => s._id === l.studentId);
    return student?.classGroupId === classGroupId;
  }) ?? [];
  const pendingLeaves = classLeaves.filter((l) => l.status === "pending");

  const { data: todayAttendance } = attendanceApi.useGetAttendanceByClassAndDateQuery(
    { classGroupId, date: today },
    { skip: !classGroupId }
  );
  
  const attendanceRecords = todayAttendance?.records ?? [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const presentToday = attendanceRecords.filter((r: any) => r.status === "present").length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const absentToday = attendanceRecords.filter((r: any) => r.status === "absent").length;

  if (!classGroup) return null;

  return (
    <div className="mt-8 border-t pt-6 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-semibold">
        My Class — {classGroup.programName} ({classGroup.yearName}
        {classGroup.section && `, ${classGroup.section}`})
      </h2>
      <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle className="text-sm text-gray-500">Total Students</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{classStudents.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-gray-500">Pending Leave Requests</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-amber-600">{pendingLeaves.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-gray-500">Today's Attendance</CardTitle></CardHeader>
          <CardContent>
            {attendanceRecords.length > 0 ? (
              <div className="flex gap-6">
                <div><p className="text-xl font-bold text-green-600">{presentToday}</p><p className="text-xs text-gray-500">Present</p></div>
                <div><p className="text-xl font-bold text-red-600">{absentToday}</p><p className="text-xs text-gray-500">Absent</p></div>
              </div>
            ) : (
              <p className="text-xs text-gray-500">Not taken yet today.</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Roll</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {classStudents.map((student) => (
              <TableRow key={student._id}>
                <TableCell>{student.rollNumber}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
              </TableRow>
            ))}
            {classStudents.length === 0 && (
              <TableRow><TableCell colSpan={3} className="text-center text-gray-500">No students yet.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}