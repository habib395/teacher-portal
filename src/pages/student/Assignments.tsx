import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAssignmentsQuery,
  useSubmitAssignmentMutation,
} from "@/features/assignment/assignmentApi";
import type { RootState } from "@/app/store";

export default function Assignments() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const { data: assignments, isLoading, isError } = useGetAssignmentsQuery();
  const [submitAssignment, { isLoading: isSubmitting }] = useSubmitAssignmentMutation();

  const handleSubmit = async (assignmentId: string) => {
    try {
      await submitAssignment(assignmentId).unwrap();
    } catch (err) {
      console.error("Failed to submit assignment:", err);
      alert("Failed to submit assignment.");
    }
  };

  if (isLoading) return <p>Loading assignments...</p>;
  if (isError) return <p className="text-red-600">Failed to load assignments.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Assignments</h1>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments?.map((assignment) => {
              const isSubmitted = studentProfileId
                ? assignment.submittedBy.includes(studentProfileId)
                : false;

              return (
                <TableRow key={assignment._id}>
                  <TableCell>{assignment.title}</TableCell>
                  <TableCell>{assignment.subject}</TableCell>
                  <TableCell>{assignment.deadline}</TableCell>
                  <TableCell>
                    <span
                      className={
                        isSubmitted
                          ? "text-green-600 font-medium"
                          : "text-amber-600 font-medium"
                      }
                    >
                      {isSubmitted ? "Submitted" : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      disabled={isSubmitted || isSubmitting}
                      onClick={() => handleSubmit(assignment._id)}
                    >
                      {isSubmitted ? "Submitted" : "Submit"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}