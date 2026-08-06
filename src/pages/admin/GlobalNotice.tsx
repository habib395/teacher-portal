import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Megaphone, Plus, Trash2, Calendar, AlertCircle, Info, CheckCircle2 } from "lucide-react";

export default function GlobalNotice() {
  // ডেমো নোটিশ ডেটা
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Upcoming Semester Final Examination Schedule",
      description: "All students and teachers are requested to check their specific course timelines. Finals will start from next month.",
      priority: "High",
      date: "2026-06-10",
    },
    {
      id: 2,
      title: "Campus Maintenance & Network Outage",
      description: "Portal services might experience brief downtimes due to scheduled server upgrades this Friday night.",
      priority: "Medium",
      date: "2026-06-05",
    },
    {
      id: 3,
      title: "Library Hours Extended",
      description: "The digital and physical library will remain open until 10:00 PM starting from next week.",
      priority: "Low",
      date: "2026-06-01",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newNotice, setNewNotice] = useState({ title: "", description: "", priority: "Medium" });

  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.title || !newNotice.description) return;

    const currentDate = new Date().toISOString().split("T")[0];

    setNotices([
      {
        id: notices.length + 1,
        title: newNotice.title,
        description: newNotice.description,
        priority: newNotice.priority,
        date: currentDate,
      },
      ...notices,
    ]);

    setNewNotice({ title: "", description: "", priority: "Medium" });
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    setNotices(notices.filter((notice) => notice.id !== id));
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return (
          <span className="flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold">
            <AlertCircle className="w-3 h-3" /> High Priority
          </span>
        );
      case "Medium":
        return (
          <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-semibold">
            <Info className="w-3 h-3" /> Medium
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold">
            <CheckCircle2 className="w-3 h-3" /> Normal
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Global Notice Board</h1>
          <p className="text-sm text-slate-500">Publish announcements and important alerts for all teachers and students.</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-2 rounded-xl"
        >
          <Plus className="w-4 h-4" /> Publish New Notice
        </Button>
      </div>

      {/* Notices List */}
      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-rose-200 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-1">
                <Megaphone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-800">{notice.title}</h3>
                  {getPriorityBadge(notice.priority)}
                </div>
                <p className="text-sm text-slate-600">{notice.description}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <Calendar className="w-3.5 h-3.5" /> Published on: {notice.date}
                </div>
              </div>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => handleDelete(notice.id)}
              className="text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl self-end md:self-center"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {/* Modal for Creating Notice */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Publish Global Notice</h3>
            <form onSubmit={handleAddNotice} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Notice Title</label>
                <input 
                  type="text" 
                  value={newNotice.title} 
                  onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                  placeholder="Enter notice title..." 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none" 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority Level</label>
                <select 
                  value={newNotice.priority}
                  onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none bg-white"
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Normal / Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Message</label>
                <textarea 
                  value={newNotice.description} 
                  onChange={(e) => setNewNotice({ ...newNotice, description: e.target.value })}
                  placeholder="Write full notice details here..." 
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-rose-500 outline-none h-32 resize-none" 
                  required 
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
                  Post Notice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}