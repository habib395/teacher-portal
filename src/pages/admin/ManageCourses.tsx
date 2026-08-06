import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, UserCheck, Trash2 } from "lucide-react";

export default function ManageCourses() {
  // ডেমো কোর্স ডেটা
  const [courses, setCourses] = useState([
    { id: 1, name: "Advanced Frontend Development (React & Next.js)", code: "FE-101", teacher: "Md. Habibur Rahman", studentsCount: 45 },
    { id: 2, name: "Backend Infrastructure & Docker", code: "BE-202", teacher: "Dr. Al Amin", studentsCount: 38 },
    { id: 3, name: "Database Systems & MongoDB", code: "DB-303", teacher: "Tanvir Ahmed", studentsCount: 50 },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: "", code: "", teacher: "" });

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.code) return;

    setCourses([
      ...courses,
      {
        id: courses.length + 1,
        name: newCourse.name,
        code: newCourse.code,
        teacher: newCourse.teacher || "Not Assigned",
        studentsCount: 0,
      },
    ]);
    setNewCourse({ name: "", code: "", teacher: "" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Courses & Subjects Setup</h1>
          <p className="text-sm text-slate-500">Manage courses, assign teachers, and control curriculum setup.</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </Button>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="p-4">Course Name</th>
              <th className="p-4">Course Code</th>
              <th className="p-4">Assigned Teacher</th>
              <th className="p-4">Enrolled Students</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  {course.name}
                </td>
                <td className="p-4 font-mono text-xs font-bold text-slate-500">{course.code}</td>
                <td className="p-4 flex items-center gap-2 mt-1">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  {course.teacher}
                </td>
                <td className="p-4 font-medium text-slate-700">{course.studentsCount} Students</td>
                <td className="p-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(course.id)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Course Modal / Simple Form Section */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Create New Course</h3>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course Name</label>
                <input 
                  type="text" 
                  value={newCourse.name} 
                  onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                  placeholder="e.g. Full Stack Web Development" 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Course Code</label>
                <input 
                  type="text" 
                  value={newCourse.code} 
                  onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                  placeholder="e.g. FS-404" 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assign Teacher Name</label>
                <input 
                  type="text" 
                  value={newCourse.teacher} 
                  onChange={(e) => setNewCourse({ ...newCourse, teacher: e.target.value })}
                  placeholder="e.g. Dr. Rahman" 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowModal(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl"
                >
                  Save Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}