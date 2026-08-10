import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";
import { useGetLeavesQuery } from "@/features/leave/leaveApi";
import { useGetPresentationsQuery } from "@/features/presentation/presentationApi";
import { useGetAttendanceByDateQuery } from "@/features/attendance/attendanceApi";
import type { RootState } from "@/app/store";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function TeacherDashboard() {
  const name = useSelector((state: RootState) => state.auth.name);
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);
  const today = getTodayDate();

  const { data: students } = useGetStudentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const { data: assignments } = useGetAssignmentsQuery();
  const { data: leaves } = useGetLeavesQuery();
  const { data: presentations } = useGetPresentationsQuery();
  const { data: todayAttendance } = useGetAttendanceByDateQuery(today);

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);
  const myClassGroup = classGroups?.find((cg) => cg._id === myTeacherRecord?.classTeacherOf);
  const myClassStudents =
    students?.filter((s) => s.classGroupId === myTeacherRecord?.classTeacherOf) ?? [];

  const pendingLeaves = leaves?.filter((l) => l.status === "pending") ?? [];
  const presentToday = todayAttendance?.filter((r) => r.status === "present").length ?? 0;
  const absentToday = todayAttendance?.filter((r) => r.status === "absent").length ?? 0;

  const now = new Date();
  const upcomingPresentations =
    presentations?.filter((p) => new Date(`${p.date}T${p.time}`) > now) ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>

      {/* Class Teacher Badge */}
      {myClassGroup && (
        <div className="mt-4 rounded-md border bg-indigo-50 p-4">
          <p className="text-sm text-indigo-700">
            You are the <span className="font-semibold">Class Teacher</span> of{" "}
            <span className="font-semibold">
              {myClassGroup.programName} — {myClassGroup.yearName}
            </span>
          </p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{students?.length ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{assignments?.length ?? 0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{pendingLeaves.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Upcoming Presentations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{upcomingPresentations.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance ({today})</CardTitle>
          </CardHeader>
          <CardContent>
            {todayAttendance && todayAttendance.length > 0 ? (
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-green-600">{presentToday}</p>
                  <p className="text-sm text-gray-500">Present</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">{absentToday}</p>
                  <p className="text-sm text-gray-500">Absent</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">Attendance not taken yet for today.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingLeaves.length > 0 ? (
              <ul className="space-y-2">
                {pendingLeaves.slice(0, 4).map((leave) => (
                  <li key={leave._id} className="text-sm">
                    <span className="font-medium">{leave.studentName}</span> — {leave.reason}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No pending leave requests.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* My Class Section */}
      {myClassGroup && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">
            My Class — {myClassGroup.programName} ({myClassGroup.yearName})
          </h2>
          <div className="mt-3 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myClassStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                  </TableRow>
                ))}
                {myClassStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No students assigned to this class yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}