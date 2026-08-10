import { useState } from "react";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Teacher, TeachingAssignment } from "@/types";
import {
  useGetTeachersQuery,
  useCreateTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} from "@/features/teacher/teacherApi";
import { useGetClassGroupsQuery } from "@/features/classGroup/classGroupApi";
import { UserPlus, Edit, Trash2, Plus, X, BookOpen, UserCheck } from "lucide-react";

export default function ManageTeachers() {
  const { data: teachers, isLoading } = useGetTeachersQuery();
  const { data: classGroups } = useGetClassGroupsQuery();
  const [createTeacher] = useCreateTeacherMutation();
  const [updateTeacher] = useUpdateTeacherMutation();
  const [deleteTeacher] = useDeleteTeacherMutation();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [classTeacherOf, setClassTeacherOf] = useState<string>("none");
  const [assignments, setAssignments] = useState<TeachingAssignment[]>([]);

  const getClassGroupLabel = (id: string) => {
    if (!classGroups) return "Loading...";
    const cg = classGroups.find((c) => c._id === id);
    return cg ? `${cg.programName} — ${cg.yearName}` : "Unknown";
  };

  const openAddDialog = () => {
    setEditingTeacher(null);
    setName("");
    setEmail("");
    setSubject("");
    setPhone("");
    setClassTeacherOf("none");
    setAssignments([]);
    setIsDialogOpen(true);
  };

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setSubject(teacher.subject);
    setPhone(teacher.phone);
    setClassTeacherOf(teacher.classTeacherOf || "none");
    setAssignments(teacher.teachingAssignments || []);
    setIsDialogOpen(true);
  };

  const addAssignmentRow = () => {
    setAssignments((prev) => [...prev, { classGroupId: "", subject: "" }]);
  };

  const updateAssignmentRow = (
    index: number,
    field: "classGroupId" | "subject",
    value: string
  ) => {
    setAssignments((prev) =>
      prev.map((a, i) => (i === index ? { ...a, [field]: value } : a))
    );
  };

  const removeAssignmentRow = (index: number) => {
    setAssignments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeacher(id).unwrap();
      toast.success("Teacher deleted successfully!");
    } catch (err) {
      console.error("Failed to delete teacher:", err);
      toast.error("Failed to delete teacher.");
    }
  };

  const handleSave = async () => {
    const validAssignments = assignments.filter((a) => a.classGroupId && a.subject);

    const payload = {
      name,
      email,
      subject,
      phone,
      classTeacherOf: classTeacherOf === "none" ? undefined : classTeacherOf,
      teachingAssignments: validAssignments,
    };

    try {
      if (editingTeacher) {
        await updateTeacher({ id: editingTeacher._id, data: payload }).unwrap();
        toast.success("Teacher updated successfully!");
      } else {
        await createTeacher(payload).unwrap();
        toast.success("Teacher added successfully!");
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Failed to save teacher:", err);
      toast.error("Failed to save teacher.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading teachers directory...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* পেজ হেডার */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Manage Teachers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add, edit, and organize faculty members, class roles, and subject assignments.
          </p>
        </div>
        <Button onClick={openAddDialog} className="gap-2 shadow-sm">
          <UserPlus className="h-4 w-4" /> Add Teacher
        </Button>
      </div>

      {/* টেবিল কার্ড */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Class Teacher Of</TableHead>
              <TableHead className="font-semibold">Subjects Taught</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers?.map((teacher) => (
              <TableRow key={teacher._id} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-medium text-foreground">{teacher.name}</TableCell>
                <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                <TableCell>
                  {teacher.classTeacherOf ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {getClassGroupLabel(teacher.classTeacherOf)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60">—</span>
                  )}
                </TableCell>
                <TableCell>
                  {teacher.teachingAssignments.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {teacher.teachingAssignments.map((a, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-secondary text-secondary-foreground border border-border">
                          {a.subject} ({getClassGroupLabel(a.classGroupId)})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted-foreground/60">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => openEditDialog(teacher)}
                  >
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1 bg-destructive/10 text-destructive hover:bg-destructive/20 border-transparent shadow-none"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {teachers?.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  No teachers added yet. Click "+ Add Teacher" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* মডার্ন ও প্রশস্ত পপআপ (Dialog) */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl lg:max-w-4xl w-full max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl shadow-2xl border">
          
          {/* পপআপ হেডার */}
          <DialogHeader className="px-6 py-4 border-b bg-muted/40">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              {editingTeacher ? <Edit className="h-5 w-5 text-primary" /> : <UserPlus className="h-5 w-5 text-primary" />}
              {editingTeacher ? "Edit Teacher Information" : "Register New Teacher"}
            </DialogTitle>
          </DialogHeader>

          {/* পপআপ বডি */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            
            {/* ১. Basic Info */}
            <div className="rounded-xl border bg-card p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b pb-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Sujon Ahmed"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sujon@example.com"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Main Specialization / Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Anatomy & Physiology"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01700000000"
                  />
                </div>
              </div>
            </div>

            {/* ২. Class Teacher Role */}
            <div className="rounded-xl border bg-card p-5 shadow-2xs space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b pb-2">
                <UserCheck className="h-4 w-4 text-primary" />
                Administrative Role
              </h3>
              <div className="space-y-1.5">
                <Label>Assigned Class Teacher Role (Optional)</Label>
                {classGroups ? (
                  <Select value={classTeacherOf} onValueChange={setClassTeacherOf}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select class group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Not a Class Teacher</SelectItem>
                      {classGroups.map((cg) => (
                        <SelectItem key={cg._id} value={cg._id}>
                          {cg.programName} — {cg.yearName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs text-muted-foreground">Loading available classes...</p>
                )}
              </div>
            </div>

            {/* ৩. Teaching Assignments */}
            <div className="rounded-xl border bg-card p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Subject Teaching Assignments
                </h3>
                <Button variant="outline" size="sm" onClick={addAssignmentRow} className="h-8 gap-1 text-xs">
                  <Plus className="h-3.5 w-3.5" /> Add Subject
                </Button>
              </div>

              <div className="space-y-3">
                {assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-center gap-3 rounded-lg border bg-muted/20 p-3"
                  >
                    <span className="hidden sm:inline-flex text-xs font-semibold text-muted-foreground w-4 text-center">
                      {index + 1}
                    </span>

                    {classGroups ? (
                      <Select
                        value={assignment.classGroupId}
                        onValueChange={(v) =>
                          updateAssignmentRow(index, "classGroupId", v)
                        }
                      >
                        <SelectTrigger className="w-full sm:w-[240px] bg-background">
                          <SelectValue placeholder="Select Class / Program" />
                        </SelectTrigger>
                        <SelectContent>
                          {classGroups.map((cg) => (
                            <SelectItem key={cg._id} value={cg._id}>
                              {cg.programName} — {cg.yearName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="flex-1 text-xs text-muted-foreground">Loading classes...</div>
                    )}

                    <Input
                      placeholder="Subject Name (e.g. Pharmacology)"
                      value={assignment.subject}
                      onChange={(e) =>
                        updateAssignmentRow(index, "subject", e.target.value)
                      }
                      className="w-full flex-1 bg-background"
                    />

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full sm:w-auto h-9 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeAssignmentRow(index)}
                    >
                      <X className="h-4 w-4 sm:mr-0 mr-1" /> <span className="sm:hidden">Remove</span>
                    </Button>
                  </div>
                ))}

                {assignments.length === 0 && (
                  <div className="rounded-lg border border-dashed p-6 text-center">
                    <p className="text-sm text-muted-foreground">No extra subjects assigned yet.</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Click "+ Add Subject" to assign classes and subjects.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          <DialogFooter className="px-6 py-4 border-t bg-muted/40 flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="px-6">
              {editingTeacher ? "Save Changes" : "Create Teacher"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}