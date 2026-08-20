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

import type { MaterialCategory, ClassGroup } from "@/types";
import { useDeleteStudyMaterialMutation, useGetStudyMaterialsQuery, useUploadStudyMaterialMutation } from "@/features/studymaterials/studyMaterialApi";
import { toast } from "sonner";
import { useGetMeQuery } from "@/features/teacher/teacherApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";

const categories: MaterialCategory[] = [
  "PDF Notes",
  "Video Lecture",
  "Source Code",
  "Assignment Guide",
];

export default function UploadMaterials() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState<MaterialCategory | "">("");
  const [classGroupId, setClassGroupId] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { data: materials, isLoading } = useGetStudyMaterialsQuery();
  const { data: classesData } = useGetClassGroupsQuery();
  const { data: teacherProfile } = useGetMeQuery(); 
  
  const [uploadMaterial, { isLoading: isUploading }] = useUploadStudyMaterialMutation();
  const [deleteMaterial] = useDeleteStudyMaterialMutation();

  const handleUpload = async () => {
    if (!title || !subject || !category || !classGroupId || !file) {
      toast.error("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("category", category);
    formData.append("classGroupId", classGroupId);
    formData.append("file", file);

    try {
      await uploadMaterial(formData).unwrap();
      setTitle("");
      setSubject("");
      setCategory("");
      setClassGroupId("");
      setFile(null);
      toast.success("Material uploaded successfully!");
    } catch (err) {
      console.error("Failed to upload material:", err);
      toast.error("Failed to upload material.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMaterial(id).unwrap();
      toast.success("Material deleted successfully!");
    } catch (err) {
      console.error("Failed to delete material:", err);
      toast.error("Failed to delete material.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Upload Materials</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 md:grid-cols-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as MaterialCategory)}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="w-[--radix-select-trigger-width] min-w-[200px]">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        <div>
          <Label htmlFor="classGroup">Class</Label>
          <Select value={classGroupId} onValueChange={(v) => setClassGroupId(v)}>
            <SelectTrigger id="classGroup">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent className="w-[--radix-select-trigger-width] min-w-[200px]">
              {classesData
                ?.filter((cls: ClassGroup) => 
                  teacherProfile?.teachingAssignments?.some(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (assignment: any) => assignment.classGroupId.toString() === cls._id.toString()
                  )
                )
                .map((cls: ClassGroup) => (
                  <SelectItem key={cls._id} value={cls._id}>
                    {cls.programName} — {cls.yearName}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="file">File</Label>
          <Input id="file" type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
        <div className="flex items-end">
          <Button onClick={handleUpload} disabled={isUploading} className="w-full">
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">All Materials</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={5}>Loading...</TableCell></TableRow>
            ) : (
              materials?.map((material) => (
                <TableRow key={material._id}>
                  <TableCell>{material.title}</TableCell>
                  <TableCell>{material.subject}</TableCell>
                  <TableCell>{material.category}</TableCell>
                  <TableCell>{material.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(material._id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}