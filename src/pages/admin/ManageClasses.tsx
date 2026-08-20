import { useState } from "react";
import { toast } from "sonner";
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
  useGetClassGroupsQuery,
  useCreateClassGroupMutation,
  useDeleteClassGroupMutation,
} from "@/features/classGroup/classGroupApi";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"; 

export default function ManageClasses() {
  const [programName, setProgramName] = useState("");
  const [yearName, setYearName] = useState("");
  const [section, setSection] = useState<string>("none"); 

  const { data: classGroups, isLoading } = useGetClassGroupsQuery();
  const [createClassGroup, { isLoading: isCreating }] = useCreateClassGroupMutation();
  const [deleteClassGroup] = useDeleteClassGroupMutation();

  const handleCreate = async () => {
    if (!programName || !yearName) {
      toast.error("Please fill in both fields.");
      return;
    }
    try {
      await createClassGroup({
        programName,
        yearName,
        section: section === "none" ? undefined : section,
      }).unwrap();
      setProgramName("");
      setYearName("");
      setSection("none");
      toast.success("Class group created successfully!");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create class group.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteClassGroup(id).unwrap();
      toast.success("Class group deleted successfully!");
    } catch (err) {
      console.error("Failed to delete class group:", err);
      toast.error("Failed to delete class group.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Classes (Batches)</h1>

      <div className="mt-6 grid gap-4 rounded-md border p-4 md:grid-cols-4">
        <div>
          <Label htmlFor="programName">Program Name</Label>
          <Input
            id="programName"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            placeholder="e.g. Diploma in Nursing & Midwifery"
          />
        </div>
        <div>
          <Label htmlFor="yearName">Year</Label>
          <Input
            id="yearName"
            value={yearName}
            onChange={(e) => setYearName(e.target.value)}
            placeholder="e.g. 2nd Year"
          />
        </div>
        <div>
          <Label htmlFor="section">Section (optional)</Label>
          <Select value={section} onValueChange={setSection}>
            <SelectTrigger id="section">
              <SelectValue placeholder="No section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Section (Regular Class)</SelectItem>
              <SelectItem value="College">College</SelectItem>
              <SelectItem value="Institute">Institute</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button onClick={handleCreate} disabled={isCreating} className="w-full">
            {isCreating ? "Adding..." : "Add Class"}
          </Button>
        </div>
      </div>

      <h2 className="mt-8 text-lg font-semibold">All Classes</h2>
      <div className="mt-3 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Year / Section</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>Loading...</TableCell>
              </TableRow>
            )}
            {classGroups?.map((cg) => (
              <TableRow key={cg._id}>
                <TableCell>{cg.programName}</TableCell>
                <TableCell>
                  {cg.yearName} {cg.section && `(${cg.section})`}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(cg._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {classGroups?.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  No classes added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}