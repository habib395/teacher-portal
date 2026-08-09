import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";
import { useGetAttendanceSummaryQuery } from "@/features/attendance/attendanceApi";
import type { RootState } from "@/app/store";

export default function StudentDashboard() {
  const name = useSelector((state: RootState) => state.auth.name);
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const { data: assignments } = useGetAssignmentsQuery();
  const { data: attendanceSummary } = useGetAttendanceSummaryQuery(studentProfileId ?? "", {
    skip: !studentProfileId,
  });

  const pendingAssignments =
    assignments?.filter(
      (a) => !studentProfileId || !a.submittedBy.includes(studentProfileId)
    ) ?? [];

  const nextDeadline = pendingAssignments
    .slice()
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())[0];

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {attendanceSummary?.attendanceRate ?? 0}%
            </p>
            <p className="text-xs text-gray-500">
              {attendanceSummary?.presentDays ?? 0} of {attendanceSummary?.totalDays ?? 0} days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Pending Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{pendingAssignments.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Next Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">
              {nextDeadline ? nextDeadline.title : "No pending assignments"}
            </p>
            {nextDeadline && (
              <p className="text-sm text-gray-500">{nextDeadline.deadline}</p>
            )}
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
      </div>
    </div>
  );
}