import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { dummyTeachers } from "@/features/teacher/teacherData";
import type { Teacher } from "@/types";
import { useState } from "react";

export default function ManageTeachers() {

  const [teachers, setTeachers] = useState<Teacher[]>(dummyTeachers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] =useState<Teacher | null>(null);

  //form filed
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
    setIsDialogOpen(true)
  }

  const openEditDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setName(teacher.name);
    setEmail(teacher.email);
    setSubject(teacher.subject);
    setPhone(teacher.phone);
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id))
  }

  const handleSave = () => {
    if(editingTeacher) {
      setTeachers((prev) => 
        prev.map((t) => 
          t.id === editingTeacher.id ? {...t, name, email, subject, phone }  : t
        )
      )
    } else {
      const newTeacher: Teacher = {
        id: Date.now().toString(),
        name,
        email,
        subject,
        phone
      };
      setTeachers((prev) => [...prev, newTeacher]);
    }
    setIsDialogOpen(false)
  }

    return (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Manage Teachers</h1>
            <Button onClick={openAddDialog}>+ Add Teacher</Button>
          </div>

          <div className="mt-6 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((teacher) => (
                  <TableRow key={teacher.id}>
                    <TableCell>{teacher.name}</TableCell>
                    <TableCell>{teacher.email}</TableCell>
                    <TableCell>{teacher.subject}</TableCell>
                    <TableCell>{teacher.phone}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(teacher)}>Edit</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(teacher.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

        {/* add/edit dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingTeacher ? "Edit Teacher" : "Add Teacher"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave}>{editingTeacher ? "Update" : "Add" }</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        </div>
    )
  }