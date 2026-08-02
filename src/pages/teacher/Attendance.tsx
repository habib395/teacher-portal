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
import {
  useGetAttendanceByDateQuery,
  useSaveAttendanceMutation,
} from "@/features/attendance/attendanceApi";
import type { AttendanceRecord, AttendanceStatus } from "@/types";

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [manualOverrides, setManualOverrides] = useState<Record<string, AttendanceStatus>>({});

  const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
  const { data: existingAttendance } = useGetAttendanceByDateQuery(selectedDate);
  const [saveAttendance, { isLoading: isSaving }] = useSaveAttendanceMutation();

  const records: AttendanceRecord[] = useMemo(() => {
    if (!students) return [];

    return students.map((student) => {
      const existing = existingAttendance?.find(
        (record) => record.studentId === student._id
      );
      return {
        studentId: student._id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        status: manualOverrides[student._id] || existing?.status || "present",
      };
    });
  }, [students, existingAttendance, manualOverrides]);

  const updateStatus = (studentId: string, status: AttendanceStatus) => {
    setManualOverrides((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSaveAttendance = async () => {
    try {
      await saveAttendance({ date: selectedDate, records }).unwrap();
      alert("Attendance saved successfully!");
      setManualOverrides({});
    } catch (err) {
      console.error("Failed to save attendance:", err);
      alert("Failed to save attendance.");
    }
  };

  if (studentsLoading) return <p>Loading students...</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <div className="flex items-center gap-3">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setManualOverrides({});
            }}
            className="w-40"
          />
          <Button onClick={handleSaveAttendance} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Attendance"}
          </Button>
        </div>
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