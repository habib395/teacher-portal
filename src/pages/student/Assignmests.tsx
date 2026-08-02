import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyAssignments } from "@/features/assignment/assignmentData";
import type { Assignment } from "@/types";

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(dummyAssignments);

  const handleSubmit = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "submitted" } : a))
    );
  };

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
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell>
                  <span
                    className={
                      assignment.status === "submitted"
                        ? "text-green-600 font-medium"
                        : "text-amber-600 font-medium"
                    }
                  >
                    {assignment.status === "submitted" ? "Submitted" : "Pending"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    disabled={assignment.status === "submitted"}
                    onClick={() => handleSubmit(assignment.id)}
                  >
                    {assignment.status === "submitted" ? "Submitted" : "Submit"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}