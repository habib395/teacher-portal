import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStudentsQuery } from "@/features/student/studentApi";
import type { MarksRecord } from "@/types";
import { useSaveMarksMutation } from "@/features/marks/markApi";

export default function MarksEntry() {
  const [subject, setSubject] = useState("Mathematics");
  const [manualMarks, setManualMarks] = useState<Record<string, number>>({});

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const [saveMarks, { isLoading: isSaving }] = useSaveMarksMutation();

  const records: MarksRecord[] = useMemo(() => {
    if (!students) return [];

    return students.map((student) => ({
      studentId: student._id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      subject,
      marks: manualMarks[student._id] ?? 0,
    }));
  }, [students, subject, manualMarks]);

  const updateMarks = (studentId: string, value: string) => {
    const newMarks = Number(value);
    setManualMarks((prev) => ({ ...prev, [studentId]: newMarks }));
  };

  const handleSaveMarks = async () => {
    try {
      await saveMarks({ records }).unwrap();
      alert("Marks saved successfully!");
      setManualMarks({});
    } catch (err) {
      console.error("Failed to save marks:", err);
      alert("Failed to save marks.");
    }
  };

  if (studentsLoading) return <p>Loading students...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marks Entry</h1>
        <div className="flex items-center gap-3">
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-48"
          />
          <Button onClick={handleSaveMarks} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Marks"}
          </Button>
        </div>
      </div>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead className="text-right">Marks (out of 100)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.studentId}>
                <TableCell>{record.rollNumber}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    value={record.marks}
                    onChange={(e) => updateMarks(record.studentId, e.target.value)}
                    className="ml-auto w-24 text-right"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}