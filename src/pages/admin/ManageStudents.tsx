import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Student } from "@/types";
import {
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} from "@/features/student/studentApi";
import { UserPlus, Edit3, Trash2, Mail, GraduationCap, Hash, Sparkles, AlertCircle, Users } from "lucide-react";
import { toast } from "sonner";

export default function ManageStudents() {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [deleteStudent] = useDeleteStudentMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [className, setClassName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const { data: classGroups } = useGetClassGroupsQuery();
const [classGroupId, setClassGroupId] = useState<string>("none");

// const getClassGroupLabel = (id?: string) => {
//   if (!id || !classGroups) return "—";
//   const cg = classGroups.find((c) => c._id === id);
//   return cg ? `${cg.programName} — ${cg.yearName}` : "Unknown";
// };

const openAddDialog = () => {
  setEditingStudent(null);
  setName("");
  setEmail("");
  setClassName("");
  setRollNumber("");
  setClassGroupId("none");
  setIsDialogOpen(true);
};

const openEditDialog = (student: Student) => {
  setEditingStudent(student);
  setName(student.name);
  setEmail(student.email);
  setClassName(student.className);
  setRollNumber(student.rollNumber);
  setClassGroupId(student.classGroupId || "none");
  setIsDialogOpen(true);
};

  const handleDelete = async (id: string) => {
    try {
      await deleteStudent(id).unwrap();
      toast.success("Student deleted successfully!");
    } catch (err) {
      console.error("Failed to delete student:", err);
      toast.error("Failed to delete student.");
    }
  };
  
  const handleSave = async () => {
    const payload = {
      name,
      email,
      className,
      rollNumber,
      classGroupId: classGroupId === "none" ? undefined : classGroupId,
    };
  
    try {
      if (editingStudent) {
        await updateStudent({ id: editingStudent._id, data: payload }).unwrap();
        toast.success("Student updated successfully!");
      } else {
        await createStudent(payload).unwrap();
        toast.success("Student added successfully!");
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save student:", err);
      toast.error("Failed to save student.");
    }
  };

  const totalStudents = students?.length || 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Student Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manage Students</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Register new students, update academic class details, and manage student enrollment directory seamlessly.
          </p>
        </div>
        <Button 
          onClick={openAddDialog}
          className="bg-white hover:bg-slate-100 text-indigo-950 font-bold px-6 py-3 h-12 rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 z-10"
        >
          <UserPlus className="w-4 h-4 text-indigo-600" />
          Add Student
        </Button>
      </div>

      {/* Students Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Students Directory List</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Total: {totalStudents} Students
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Student Name & Email</TableHead>
              <TableHead className="py-4 px-6">Class Name</TableHead>
              <TableHead className="py-4 px-6">Roll Number</TableHead>
              <TableHead className="py-4 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-semibold text-slate-500">Loading students directory...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-rose-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8" />
                    <p className="font-semibold">Failed to load students.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : students && students.length > 0 ? (
              students.map((student) => (
                <TableRow key={student._id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="py-4 px-6 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                        {student.name.charAt(0)}
                      </div>
                      {student.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 ml-11">
                      <Mail className="w-3 h-3" /> {student.email}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      <GraduationCap className="w-3 h-3" /> {student.className}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-xs font-semibold text-slate-600 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Hash className="w-3.5 h-3.5 text-slate-400" />
                      {student.rollNumber}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(student)}
                      className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 h-9 px-3 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(student._id)}
                      className="rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 h-9 px-3 font-semibold shadow-none"
                    >
                      <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No students found in the directory.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add / Edit Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-6 sm:p-8 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {editingStudent ? "Edit Student Information" : "Add New Student"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Alex Johnson" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g., alex.johnson@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="className" className="text-xs font-bold uppercase tracking-wider text-slate-500">Class / Program Name</Label>
              <Input
                id="className"
                placeholder="e.g., B.Sc in Computer Science"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="text-xs font-bold uppercase tracking-wider text-slate-500">Roll Number</Label>
              <Input 
                id="rollNumber" 
                placeholder="e.g., CS-2026-01" 
                value={rollNumber} 
                onChange={(e) => setRollNumber(e.target.value)} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none font-mono"
              />
              <div>
  <Label htmlFor="classGroup">Class (Batch)</Label>
  {classGroups ? (
    <Select value={classGroupId} onValueChange={setClassGroupId}>
      <SelectTrigger id="classGroup">
        <SelectValue placeholder="Select class" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">Not Assigned</SelectItem>
        {classGroups.map((cg) => (
          <SelectItem key={cg._id} value={cg._id}>
            {cg.programName} — {cg.yearName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <p className="text-sm text-gray-400">Loading classes...</p>
  )}
</div>
            </div>
          </div>

          <DialogFooter className="pt-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className="rounded-2xl border-slate-200 text-slate-600 font-bold h-12 px-6"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isCreating || isUpdating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl h-12 px-8 shadow-lg shadow-indigo-600/20"
            >
              {isCreating || isUpdating ? "Saving..." : editingStudent ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}