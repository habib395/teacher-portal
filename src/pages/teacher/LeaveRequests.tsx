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
  useGetLeavesQuery,
  useUpdateLeaveStatusMutation,
} from "@/features/leave/leaveApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";

const statusColor: Record<string, string> = {
  pending: "text-amber-600",
  approved: "text-green-600",
  rejected: "text-red-600",
};

export default function LeaveRequests() {
  const { data: leaves, isLoading } = useGetLeavesQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateLeaveStatusMutation();

  const getClassGroupLabel = (classGroupId: string) => {
    if (!classGroups) return classGroupId;
    const cg = classGroups.find((c) => c._id === classGroupId);
    if (!cg) return "Unknown Class";
    return `${cg.programName} — ${cg.yearName}${cg.section ? ` (${cg.section})` : ""}`;
  };

  const handleApprove = async (id: string) => {
    try {
      await updateStatus({ id, status: "approved" }).unwrap();
    } catch (err) {
      console.error("Failed to approve leave:", err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateStatus({ id, status: "rejected" }).unwrap();
    } catch (err) {
      console.error("Failed to reject leave:", err);
    }
  };

  if (isLoading) return <p>Loading leave requests...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Leave Requests</h1>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Attachment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaves?.map((leave) => (
              <TableRow key={leave._id}>
                <TableCell>{leave.studentName}</TableCell>
                <TableCell>{getClassGroupLabel(leave.classGroupId)}</TableCell>
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
                <TableCell className={`font-medium ${statusColor[leave.status]}`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    disabled={leave.status !== "pending" || isUpdating}
                    onClick={() => handleApprove(leave._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={leave.status !== "pending" || isUpdating}
                    onClick={() => handleReject(leave._id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {leaves?.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500">
                  No leave requests yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}