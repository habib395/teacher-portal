import { useState } from "react";
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
import { dummyMarks } from "@/features/marks/marksData";
import type { MarksRecord } from "@/types";

export default function MarksEntry() {
  const [records, setRecords] = useState<MarksRecord[]>(dummyMarks);

  const updateMarks = (studentId: string, value: string) => {
    const newMarks = Number(value);
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId ? { ...r, marks: newMarks } : r
      )
    );
  };

  const handleSaveMarks = () => {
    // এখানে পরে API call বসবে (backend বানানোর সময়)
    console.log("Saving marks:", records);
    alert("Marks saved! (check console for now)");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Marks Entry</h1>
        <Button onClick={handleSaveMarks}>Save Marks</Button>
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
                    onChange={(e) =>
                      updateMarks(record.studentId, e.target.value)
                    }
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