import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookOpen, Download, Search, FileText, Sparkles, FolderArchive, Video, FileCheck, AlertCircle } from "lucide-react";

interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  category: "PDF Notes" | "Video Lecture" | "Source Code" | "Assignment Guide";
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
}

const initialMaterials: StudyMaterial[] = [
  {
    id: "1",
    title: "Complete MERN Stack Architecture Guide",
    subject: "Web Development",
    category: "PDF Notes",
    fileSize: "4.5 MB",
    uploadDate: "2026-08-01",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Docker & Kubernetes Deployment Masterclass",
    subject: "Cloud & DevOps",
    category: "Video Lecture",
    fileSize: "120 MB",
    uploadDate: "2026-08-03",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "React Redux Toolkit Boilerplate Code",
    subject: "Frontend Engineering",
    category: "Source Code",
    fileSize: "2.1 MB",
    uploadDate: "2026-08-05",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Database Normalization & Indexing Notes",
    subject: "Database Systems",
    category: "PDF Notes",
    fileSize: "3.2 MB",
    uploadDate: "2026-08-06",
    downloadUrl: "#",
  },
];

export default function StudyMaterials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // ফিল্টারড মেটেরিয়ালস
  const filteredMaterials = useMemo(() => {
    return initialMaterials.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const totalCount = initialMaterials.length;
  const pdfCount = initialMaterials.filter((m) => m.category === "PDF Notes").length;
  const videoCount = initialMaterials.filter((m) => m.category === "Video Lecture").length;

  return (
    <div className="space-y-8 pb-10">
      {/* Top Gradient Banner Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" /> Resource Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Study Materials & Resources</h1>
          <p className="text-sm text-slate-300 max-w-xl">
            Access, explore, and download semester notes, video lectures, and source code instantly.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Resources</p>
            <h3 className="text-3xl font-black text-slate-800">{totalCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FolderArchive className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">PDF Notes</p>
            <h3 className="text-3xl font-black text-emerald-600">{pdfCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Lectures</p>
            <h3 className="text-3xl font-black text-amber-600">{videoCount}</h3>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Video className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200/80 w-full sm:max-w-md focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder="Search by title or subject name..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-slate-700 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {["All", "PDF Notes", "Video Lecture", "Source Code"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Study Materials Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Available Resources</h2>
          <span className="text-xs font-semibold text-slate-400">Showing {filteredMaterials.length} items</span>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              <TableHead className="py-4 px-6">Material Title</TableHead>
              <TableHead className="py-4 px-6">Category</TableHead>
              <TableHead className="py-4 px-6">Size & Date</TableHead>
              <TableHead className="py-4 px-6 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100 text-sm">
            {filteredMaterials.length > 0 ? (
              filteredMaterials.map((item) => (
                <TableRow key={item.id} className="hover:bg-slate-50/60 transition-colors group">
                  <TableCell className="py-4 px-6 space-y-1">
                    <div className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      {item.title}
                    </div>
                    <span className="inline-block px-2.5 py-0.5 bg-slate-100 rounded-md text-xs font-semibold text-slate-600 ml-11">
                      {item.subject}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-6 space-y-0.5 text-xs font-semibold">
                    <div className="text-slate-700 font-mono">{item.fileSize}</div>
                    <div className="text-slate-400">{item.uploadDate}</div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <Button
                      size="sm"
                      onClick={() => alert(`Downloading "${item.title}"...`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold px-4 h-9 shadow-sm shadow-indigo-600/20 flex items-center gap-1.5 ml-auto"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-slate-400">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-300" />
                    <p className="font-semibold text-slate-500">No study materials found matching your search.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}