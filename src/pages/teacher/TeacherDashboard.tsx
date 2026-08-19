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
import type { RootState } from "@/app/store";
import { useGetAttendanceByClassAndDateQuery } from "@/features/attendance/attendanceApi";

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

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);
  const myClassGroup = classGroups?.find((cg) => cg._id === myTeacherRecord?.classTeacherOf);

  const myClassIds = new Set<string>();
  if (myTeacherRecord?.classTeacherOf) myClassIds.add(myTeacherRecord.classTeacherOf);
  myTeacherRecord?.teachingAssignments.forEach((a) => myClassIds.add(a.classGroupId));

  const myClassStudents =
    students?.filter((s) => s.classGroupId === myTeacherRecord?.classTeacherOf) ?? [];
    // console.log(myClassStudents)
  const myTeachingStudents =
    students?.filter((s) => s.classGroupId && myClassIds.has(s.classGroupId)) ?? [];

  const myAssignments =
    assignments?.filter((a) => a.createdByTeacherId === teacherProfileId) ?? [];

  const myClassLeaves =
    leaves?.filter((l) => {
      const student = students?.find((s) => s._id === l.studentId);
      return student?.classGroupId === myTeacherRecord?.classTeacherOf;
    }) ?? [];
  const pendingLeaves = myClassLeaves.filter((l) => l.status === "pending");

  const myPresentations =
    presentations?.filter((p) => myClassIds.has(p.classGroupId)) ?? [];
  const now = new Date();
  const upcomingPresentations = myPresentations.filter(
    (p) => new Date(`${p.date}T${p.time}`) > now
  );

  const activeClassId = myTeacherRecord?.classTeacherOf || "";
  const { data: todayAttendance } = useGetAttendanceByClassAndDateQuery(
    { classGroupId: activeClassId, date: today },
    { skip: !activeClassId }
  );
  const attendanceRecords = todayAttendance?.records ?? [];
  const presentToday = attendanceRecords.filter((r) => r.status === "present").length;
  const absentToday = attendanceRecords.filter((r) => r.status === "absent").length;

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>

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

      <h2 className="mt-6 text-lg font-semibold">My Teaching Overview</h2>
      <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">
              Students I Teach (All Batches)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myTeachingStudents.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">My Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myAssignments.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Classes I Teach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myClassIds.size}</p>
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

      {myClassGroup ? (
        <>
          <h2 className="mt-8 text-lg font-semibold">
            My Class Overview — {myClassGroup.programName} ({myClassGroup.yearName})
          </h2>
          <div className="mt-3 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-500">Total Students in My Class</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{myClassStudents.length}</p>
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
                <CardTitle className="text-sm text-gray-500">Today's Attendance ({today})</CardTitle>
              </CardHeader>
              <CardContent>
                {attendanceRecords.length > 0 ? (
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xl font-bold text-green-600">{presentToday}</p>
                      <p className="text-xs text-gray-500">Present</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-red-600">{absentToday}</p>
                      <p className="text-xs text-gray-500">Absent</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Not taken yet today.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">Pending Leave Requests</h3>
            <div className="mt-2 rounded-md border p-4">
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
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold">My Class Students</h3>
            <div className="mt-2 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  
                  {myClassStudents.map((student) => (
                    <TableRow key={student._id}>
                      <TableCell>{student.rollNumber}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      {/* <TableCell>{student.phone}</TableCell> */}
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
        </>
      ) : (
        <p className="mt-8 text-sm text-gray-500">
          You are not currently assigned as a Class Teacher of any class.
        </p>
      )}
    </div>
  );
}