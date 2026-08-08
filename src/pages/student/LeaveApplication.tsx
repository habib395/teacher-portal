import { useSelector } from "react-redux";
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
  useGetLeavesQuery,
  useCreateLeaveMutation,
} from "@/features/leave/leaveApi";
import type { RootState } from "@/app/store";

const statusColor: Record<string, string> = {
  pending: "text-amber-600",
  approved: "text-green-600",
  rejected: "text-red-600",
};

export default function LeaveApplication() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: leaves, isLoading } = useGetLeavesQuery();
  const [createLeave, { isLoading: isSubmitting }] = useCreateLeaveMutation();

  const myLeaves = leaves?.filter((l) => l.studentId === studentProfileId) ?? [];

  const handleSubmit = async () => {
    if (!reason || !fromDate || !toDate) {
      alert("Please fill in reason, from date, and to date.");
      return;
    }

    const formData = new FormData();
    formData.append("reason", reason);
    formData.append("fromDate", fromDate);
    formData.append("toDate", toDate);
    if (file) formData.append("file", file);

    try {
      await createLeave(formData).unwrap();
      setReason("");
      setFromDate("");
      setToDate("");
      setFile(null);
      alert("Leave application submitted successfully!");
    } catch (err) {
      console.error("Failed to submit leave application:", err);
      alert("Failed to submit leave application.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Leave Application</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4">
        <div>
          <Label htmlFor="reason">Reason</Label>
          <textarea
            id="reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="fromDate">From Date</Label>
            <Input
              id="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="toDate">To Date</Label>
            <Input
              id="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="file">Attachment (optional — e.g. prescription photo)</Label>
          <Input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="w-fit">
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </div>

      <h2 className="mt-8 text-lg font-semibold">My Leave Applications</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reason</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            )}
            {myLeaves.map((leave) => (
              <TableRow key={leave._id}>
                <TableCell>{leave.reason}</TableCell>
                <TableCell>{leave.fromDate}</TableCell>
                <TableCell>{leave.toDate}</TableCell>
                <TableCell>
                  {leave.attachmentUrl ? (
                    <a
                      href={leave.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 underline"
                    >
                      View
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className={`text-right font-medium ${statusColor[leave.status]}`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </TableCell>
              </TableRow>
            ))}
            {myLeaves.length === 0 && !isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No leave applications yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}