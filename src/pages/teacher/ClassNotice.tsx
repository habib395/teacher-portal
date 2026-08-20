import { useState, useMemo } from "react";
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
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const myTeacherRecord = teachers?.find((t) => t._id === teacherProfileId);

  const myClassIds = useMemo(() => {
    const ids = new Set<string>();
    if (myTeacherRecord?.classTeacherOf) {
      if (Array.isArray(myTeacherRecord.classTeacherOf)) {
        myTeacherRecord.classTeacherOf.forEach((id) => ids.add(id));
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ids.add(myTeacherRecord.classTeacherOf as any);
      }
    }
    return ids;
  }, [myTeacherRecord]);

  const myClasses = useMemo(() => {
    if (!classGroups) return [];
    return classGroups.filter((cg) => myClassIds.has(cg._id));
  }, [classGroups, myClassIds]);

  const defaultClassId = myClasses.length > 0 ? myClasses[0]._id : "";
  const activeClassId = selectedClassId || defaultClassId;

  const myClassNotices = notices?.filter(
    (n) => n.targetClassGroupId && myClassIds.has(n.targetClassGroupId)
  ) ?? [];

  const handleCreate = async () => {
    if (!title || !message) {
      toast.error("Please fill in both fields.");
      return;
    }
    if (!activeClassId) {
      toast.error("Please select a target class for the notice.");
      return;
    }
    try {
      await createNotice({
        title,
        message,
        targetClassGroupId: activeClassId,
      }).unwrap();
      setTitle("");
      setMessage("");
      toast.success("Notice posted to the selected class!");
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

  if (myClasses.length === 0) {
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
      <h1 className="text-2xl font-bold">Class Notice Board</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 bg-white shadow-sm">
        {myClasses.length > 1 && (
          <div>
            <Label htmlFor="targetClass">Select Target Class</Label>
            <Select value={activeClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select class to post notice" />
              </SelectTrigger>
              <SelectContent>
                {myClasses.map((cg) => (
                  <SelectItem key={cg._id} value={cg._id}>
                    {cg.programName} — {cg.yearName} {cg.section ? `(${cg.section})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notice title..." />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write notice details here..."
            className="w-full rounded-md border border-gray-300 p-2 text-sm mt-1"
          />
        </div>
        <Button onClick={handleCreate} disabled={isCreating} className="w-fit">
          {isCreating ? "Posting..." : "Post to Class"}
        </Button>
      </div>

      <h2 className="mt-8 text-lg font-semibold">My Class Notices</h2>
      <div className="mt-3 space-y-3">
        {isLoading && <p>Loading...</p>}
        {myClassNotices.map((notice) => {
          const targetClass = classGroups?.find((cg) => cg._id === notice.targetClassGroupId);
          return (
            <div
              key={notice._id}
              className="flex items-start justify-between rounded-md border p-4 bg-white shadow-sm"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-base">{notice.title}</h3>
                  {targetClass && (
                    <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-full">
                      {targetClass.programName} {targetClass.section ? `(${targetClass.section})` : ""}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-600">{notice.message}</p>
                <p className="mt-2 text-xs text-gray-400">
                  {new Date(notice.createdAt).toLocaleString()}
                </p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(notice._id)}>
                Delete
              </Button>
            </div>
          );
        })}
        {myClassNotices.length === 0 && !isLoading && (
          <p className="text-sm text-gray-500">No notices posted to your classes yet.</p>
        )}
      </div>
    </div>
  );
}