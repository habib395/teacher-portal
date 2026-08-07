import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetTeachersQuery } from "@/features/teacher/teacherApi";
import { useGetStudentsQuery } from "@/features/student/studentApi";
import { useGetAssignmentsQuery } from "@/features/assignment/assignmentApi";

export default function AdminDashboard() {
  const { data: teachers } = useGetTeachersQuery();
  const { data: students } = useGetStudentsQuery();
  const { data: assignments } = useGetAssignmentsQuery();

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">Total Teachers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{teachers?.length ?? 0}</p>
          </CardContent>
        </Card>

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
      </div>
    </div>
  );
}