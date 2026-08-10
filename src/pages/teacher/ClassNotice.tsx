import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetTeachersQuery } from "@/features/teacher/teacherApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import {
  useGetNoticesQuery,
  useCreateNoticeMutation,
  useDeleteNoticeMutation,
} from "@/features/notice/noticeApi";
import type { RootState } from "@/app/store";

export default function ClassNotice() {
  const teacherProfileId = useSelector((state: RootState) => state.auth.teacherProfile);

  const { data: teachers } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const { data: notices, isLoading } = useGetNoticesQuery();
  const [createNotice, { isLoading: isCreating }] = useCreateNoticeMutation();
  const [deleteNotice] = useDeleteNoticeMutation();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);
  const myClassGroup = classGroups?.find((cg) => cg._id === myTeacherRecord?.classTeacherOf);

  const myClassNotices = notices?.filter(
    (n) => n.targetClassGroupId === myTeacherRecord?.classTeacherOf
  ) ?? [];

  const handleCreate = async () => {
    if (!title || !message) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (!myTeacherRecord?.classTeacherOf) {
      toast.error("You are not assigned as a Class Teacher.");
      return;
    }
    try {
      await createNotice({
        title,
        message,
        targetClassGroupId: myTeacherRecord.classTeacherOf,
      }).unwrap();
      setTitle("");
      setMessage("");
      toast.success("Notice posted to your class!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to post notice.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotice(id).unwrap();
      toast.success("Notice deleted!");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to delete notice.");
    }
  };

  if (!myTeacherRecord?.classTeacherOf) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Class Notice</h1>
        <p className="mt-4 text-gray-500">
          You are not currently assigned as a Class Teacher of any class.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Class Notice
        {myClassGroup && ` — ${myClassGroup.programName} (${myClassGroup.yearName})`}
      </h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 text-sm"
          />
        </div>
        <Button onClick={handleCreate} disabled={isCreating} className="w-fit">
          {isCreating ? "Posting..." : "Post to My Class"}
        </Button>
      </div>

      <h2 className="mt-8 text-lg font-semibold">My Class Notices</h2>
      <div className="mt-3 space-y-3">
        {isLoading && <p>Loading...</p>}
        {myClassNotices.map((notice) => (
          <div
            key={notice._id}
            className="flex items-start justify-between rounded-md border p-4"
          >
            <div>
              <h3 className="font-semibold">{notice.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{notice.message}</p>
              <p className="mt-2 text-xs text-gray-400">
                {new Date(notice.createdAt).toLocaleString()}
              </p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(notice._id)}>
              Delete
            </Button>
          </div>
        ))}
        {myClassNotices.length === 0 && !isLoading && (
          <p className="text-sm text-gray-500">No notices posted to your class yet.</p>
        )}
      </div>
    </div>
  );
}