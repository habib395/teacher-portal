import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Teacher } from "@/types";
import {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} from "@/features/teacher/teacherApi";
import { UserPlus, Edit3, Trash2, Mail, Phone, BookOpen, Sparkles, AlertCircle, Users } from "lucide-react";
import { toast } from "sonner";

export default function ManageTeachers() {
  const { data: teachers, isLoading, isError } = useGetTeachersQuery();
  const [createTeacher, { isLoading: isCreating }] = useCreateTeacherMutation();
  const [updateTeacher, { isLoading: isUpdating }] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");

  const openAddDialog = () => {
    setEditingTeacher(null);
    setName("");
    setEmail("");
    setSubject("");
    setPhone("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setSubject(teacher.subject);
    setPhone(teacher.phone);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteTeacher(id).unwrap();
        toast.success("Teacher deleted successfully!");
      } catch (err) {
        console.error("Failed to delete teacher:", err);
        toast.error("Failed to delete teacher.");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (editingTeacher) {
        await updateTeacher({
          id: editingTeacher._id,
          data: { name, email, subject, phone },
        }).unwrap();
        toast.success("Teacher updated successfully!");
      } else {
        await createTeacher({ name, email, subject, phone }).unwrap();
        toast.success("Teacher added successfully!");
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save teacher:", err);
      toast.error("Failed to save teacher.");
    }
  };

  const totalTeachers = teachers?.length || 0;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Faculty Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Manage Teachers</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Add new faculty members, update academic contact details, and manage teaching assignments seamlessly.
          </p>
        </div>
        <Button 
          onClick={openAddDialog}
          className="bg-white hover:bg-slate-100 text-indigo-950 font-bold px-6 py-3 h-12 rounded-2xl shadow-lg transition-all flex items-center gap-2 shrink-0 z-10"
        >
          <UserPlus className="w-4 h-4 text-indigo-600" />
          Add Teacher
        </Button>
      </div>

      {/* Teachers Table Section */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Faculty Members List</h2>
          <span className="text-xs font-semibold px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> Total: {totalTeachers} Faculty
          </span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Teacher Name & Email</TableHead>
              <TableHead className="py-4 px-6">Subject Expert</TableHead>
              <TableHead className="py-4 px-6">Phone Contact</TableHead>
              <TableHead className="py-4 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-semibold text-slate-500">Loading teachers directory...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-rose-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8" />
                    <p className="font-semibold">Failed to load teachers.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : teachers && teachers.length > 0 ? (
              teachers.map((teacher) => (
                <TableRow key={teacher._id} className="hover:bg-slate-50/60 transition-colors">
                  <TableCell className="py-4 px-6 space-y-1">
                    <div className="font-bold text-slate-800 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      {teacher.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400 ml-11">
                      <Mail className="w-3 h-3" /> {teacher.email}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                      <BookOpen className="w-3 h-3" /> {teacher.subject}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-xs font-semibold text-slate-600 font-mono">
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {teacher.phone}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(teacher)}
                      className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-100 h-9 px-3 font-semibold"
                    >
                      <Edit3 className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(teacher._id)}
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
                    <p className="font-semibold text-slate-500">No teachers found in the directory.</p>
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
              {editingTeacher ? "Edit Teacher Information" : "Add New Teacher"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., Dr. John Doe" 
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
                placeholder="e.g., john.doe@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500">Subject / Specialization</Label>
              <Input
                id="subject"
                placeholder="e.g., Web Engineering"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-500">Phone Number</Label>
              <Input 
                id="phone" 
                placeholder="e.g., +8801700000000" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 h-12 text-sm font-semibold text-slate-700 outline-none font-mono"
              />
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
              {isCreating || isUpdating ? "Saving..." : editingTeacher ? "Update Teacher" : "Add Teacher"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}