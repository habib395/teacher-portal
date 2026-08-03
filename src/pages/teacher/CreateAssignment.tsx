import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  useCreateAssignmentMutation,
} from "@/features/assignment/assignmentApi";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");

  const { data: assignments, isLoading } = useGetAssignmentsQuery();
  const [createAssignment, { isLoading: isCreating }] = useCreateAssignmentMutation();

  const handleCreate = async () => {
    if (!title || !subject || !deadline) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await createAssignment({ title, subject, deadline }).unwrap();
      setTitle("");
      setSubject("");
      setDeadline("");
      alert("Assignment created successfully!");
    } catch (err) {
      console.error("Failed to create assignment:", err);
      alert("Failed to create assignment.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create Assignment</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 md:grid-cols-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="deadline">Deadline</Label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="flex items-end">
          <Button onClick={handleCreate} disabled={isCreating} className="w-full">
            {isCreating ? "Creating..." : "Create Assignment"}
          </Button>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">All Assignments</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4}>Loading...</TableCell>
              </TableRow>
            )}
            {assignments?.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell className="text-right">
                  {assignment.submittedBy.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}