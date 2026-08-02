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
import { dummyAttendance } from "@/features/attendance/attendanceData";
import type { AttendanceRecord, AttendanceStatus } from "@/types";

export default function Attendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(dummyAttendance);

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId === studentId ? { ...r, status } : r
      )
    );
  };

  const handleSaveAttendance = () => {
    // এখানে পরে API call বসবে (backend বানানোর সময়)
    console.log("Saving attendance:", records);
    alert("Attendance saved! (check console for now)");
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <Button onClick={handleSaveAttendance}>Save Attendance</Button>
      </div>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Roll</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Mark</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.studentId}>
                <TableCell>{record.rollNumber}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>
                  <span
                    className={
                      record.status === "present"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {record.status === "present" ? "Present" : "Absent"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant={record.status === "present" ? "default" : "outline"}
                    onClick={() => updateStatus(record.studentId, "present")}
                  >
                    Present
                  </Button>
                  <Button
                    size="sm"
                    variant={record.status === "absent" ? "destructive" : "outline"}
                    onClick={() => updateStatus(record.studentId, "absent")}
                  >
                    Absent
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