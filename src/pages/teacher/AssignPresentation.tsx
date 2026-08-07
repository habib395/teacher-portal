import { useState } from "react";
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
import { useGetStudentsQuery } from "@/features/student/studentApi";
import {
  useGetPresentationsQuery,
  useCreatePresentationMutation,
  useDeletePresentationMutation,
} from "@/features/presentation/presentationApi";

export default function AssignPresentation() {
  const [studentId, setStudentId] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const { data: students } = useGetStudentsQuery();
  const { data: presentations, isLoading } = useGetPresentationsQuery();
  const [createPresentation, { isLoading: isCreating }] = useCreatePresentationMutation();
  const [deletePresentation] = useDeletePresentationMutation();

  const handleAssign = async () => {
    if (!studentId || !topic || !subject || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    const selectedStudent = students?.find((s) => s._id === studentId);
    if (!selectedStudent) {
      alert("Please select a valid student.");
      return;
    }

    try {
      await createPresentation({
        studentId,
        studentName: selectedStudent.name,
        topic,
        subject,
        date,
        time,
      }).unwrap();

      setStudentId("");
      setTopic("");
      setSubject("");
      setDate("");
      setTime("");
      alert("Presentation assigned successfully!");
    } catch (err) {
      console.error("Failed to assign presentation:", err);
      alert("Failed to assign presentation.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePresentation(id).unwrap();
    } catch (err) {
      console.error("Failed to delete presentation:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Assign Presentation</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 md:grid-cols-5">
        <div>
          <Label htmlFor="student">Student</Label>
          <Select value={studentId} onValueChange={setStudentId}>
            <SelectTrigger id="student">
              <SelectValue placeholder="Select student" />
            </SelectTrigger>
            <SelectContent>
              {students?.map((student) => (
                <SelectItem key={student._id} value={student._id}>
                  {student.name} ({student.rollNumber})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="topic">Topic</Label>
          <Input id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={handleAssign} disabled={isCreating} className="mt-4">
        {isCreating ? "Assigning..." : "Assign Presentation"}
      </Button>

      <h2 className="mt-8 text-lg font-semibold">All Presentations</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            )}
            {presentations?.map((presentation) => (
              <TableRow key={presentation._id}>
                <TableCell>{presentation.studentName}</TableCell>
                <TableCell>{presentation.topic}</TableCell>
                <TableCell>{presentation.subject}</TableCell>
                <TableCell>{presentation.date}</TableCell>
                <TableCell>{presentation.time}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(presentation._id)}
                  >
                    Delete
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