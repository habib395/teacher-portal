import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";
import { useGetAttendanceSummaryQuery } from "@/features/attendance/attendanceApi";
import { useGetStudentsQuery } from "@/features/student/studentApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import { useGetNoticesQuery } from "@/features/notice/noticeApi";
import type { RootState } from "@/app/store";

export default function StudentDashboard() {
  const name = useSelector((state: RootState) => state.auth.name);
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const { data: assignments } = useGetAssignmentsQuery();
  const { data: attendanceSummary } = useGetAttendanceSummaryQuery(studentProfileId ?? "", {
    skip: !studentProfileId,
  });
  const { data: students } = useGetStudentsQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const { data: notices } = useGetNoticesQuery();

  const myStudentRecord = students?.find((s) => s._id === studentProfileId);
  const myClassGroup = classGroups?.find((cg) => cg._id === myStudentRecord?.classGroupId);

  // Global notice (সবার জন্য) + নিজের ক্লাসের notice — দুটোই দেখাবে
  const relevantNotices =
    notices?.filter(
      (n) => !n.targetClassGroupId || n.targetClassGroupId === myStudentRecord?.classGroupId
    ) ?? [];

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

      {myClassGroup && (
        <div className="mt-4 rounded-md border bg-indigo-50 p-4">
          <p className="text-sm text-indigo-700">
            You are enrolled in{" "}
            <span className="font-semibold">
              {myClassGroup.programName} — {myClassGroup.yearName}
            </span>
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{attendanceSummary?.attendanceRate ?? 0}%</p>
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
            {nextDeadline && <p className="text-sm text-gray-500">{nextDeadline.deadline}</p>}
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

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Notices</h2>
        <div className="mt-3 space-y-3">
          {relevantNotices.slice(0, 5).map((notice) => (
            <div key={notice._id} className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{notice.title}</h3>
                <span className="text-xs text-gray-400">
                  {notice.targetClassGroupId ? "Class Notice" : "General"}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{notice.message}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(notice.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          {relevantNotices.length === 0 && (
            <p className="text-sm text-gray-500">No notices yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}