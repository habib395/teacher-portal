import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useGetTeachersQuery } from "@/features/teacher/teacherApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import type { RootState } from "@/app/store";

export default function CreateAssignment() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [deadline, setDeadline] = useState("");
  const [classGroupId, setClassGroupId] = useState("");

  const { data: assignments, isLoading } = useGetAssignmentsQuery();
  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const [createAssignment, { isLoading: isCreating }] = useCreateAssignmentMutation();

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);

  // Teacher যেই যেই ব্যাচে পড়ান (classTeacherOf + teachingAssignments থেকে) — এই ক্লাসগুলোই assignment দিতে পারবেন
  const myClassIds = new Set<string>();
  if (myTeacherRecord?.classTeacherOf) myClassIds.add(myTeacherRecord.classTeacherOf);
  myTeacherRecord?.teachingAssignments.forEach((a) => myClassIds.add(a.classGroupId));

  const myClasses = classGroups?.filter((cg) => myClassIds.has(cg._id)) ?? [];

  // এই Teacher এর নিজের বানানো assignment গুলোই দেখাবে
  const myAssignments =
    assignments?.filter((a) => a.createdByTeacherId === teacherProfileId) ?? [];

  const getClassGroupLabel = (id: string) => {
    const cg = classGroups?.find((c) => c._id === id);
    return cg ? `${cg.programName} — ${cg.yearName}` : "Unknown";
  };

  const handleCreate = async () => {
    if (!title || !subject || !deadline || !classGroupId) {
      toast.error("Please fill in all fields, including the class.");
      return;
    }
    try {
      await createAssignment({ title, subject, deadline, classGroupId }).unwrap();
      setTitle("");
      setSubject("");
      setDeadline("");
      setClassGroupId("");
      toast.success("Assignment created successfully!");
    } catch (err) {
      console.error("Failed to create assignment:", err);
      toast.error("Failed to create assignment.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Create Assignment</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 md:grid-cols-5">
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
        <div>
          <Label>Class</Label>
          <Select value={classGroupId} onValueChange={setClassGroupId}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {myClasses.map((cg) => (
                <SelectItem key={cg._id} value={cg._id}>
                  {cg.programName} — {cg.yearName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleCreate} disabled={isCreating} className="w-full">
            {isCreating ? "Creating..." : "Create Assignment"}
          </Button>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">My Assignments</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Submissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            )}
            {myAssignments.map((assignment) => (
              <TableRow key={assignment._id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.subject}</TableCell>
                <TableCell>{getClassGroupLabel(assignment.classGroupId)}</TableCell>
                <TableCell>{assignment.deadline}</TableCell>
                <TableCell className="text-right">{assignment.submittedBy.length}</TableCell>
              </TableRow>
            ))}
            {myAssignments.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  You haven't created any assignments yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}