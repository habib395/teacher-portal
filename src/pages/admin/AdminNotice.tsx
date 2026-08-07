import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetNoticesQuery,
  useCreateNoticeMutation,
  useDeleteNoticeMutation,
} from "@/features/notice/noticeApi";

export default function GlobalNotice() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const { data: notices, isLoading } = useGetNoticesQuery();
  const [createNotice, { isLoading: isCreating }] = useCreateNoticeMutation();
  const [deleteNotice] = useDeleteNoticeMutation();

  const handleCreate = async () => {
    if (!title || !message) {
      alert("Please fill in both fields.");
      return;
    }
    try {
      await createNotice({ title, message }).unwrap();
      setTitle("");
      setMessage("");
    } catch (err) {
      console.error("Failed to create notice:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotice(id).unwrap();
    } catch (err) {
      console.error("Failed to delete notice:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Global Notice</h1>

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
          {isCreating ? "Posting..." : "Post Notice"}
        </Button>
      </div>

      <h2 className="mt-8 text-lg font-semibold">All Notices</h2>
      <div className="mt-3 space-y-3">
        {isLoading && <p>Loading...</p>}
        {notices?.map((notice) => (
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
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(notice._id)}
            >
              Delete
            </Button>
          </div>
        ))}
        {notices?.length === 0 && (
          <p className="text-sm text-gray-500">No notices posted yet.</p>
        )}
      </div>
    </div>
  );
}