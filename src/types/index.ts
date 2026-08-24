export type UserRole = "admin" | "teacher" | "student";
export type AttendanceStatus = "present" | "absent";


export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "teacher" | "student";
  studentProfile?: string;
  teacherProfile?: string; 
}

export interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
}

export interface TeachingAssignment {
  classGroupId: string;
  subject: string;
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
  classTeacherOf?: string[];
  teachingAssignments: TeachingAssignment[];
}


export interface Student {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  className: string;
  rollNumber: string;
  classGroupId?: string;
}


export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  rollNumber: string;
  status: AttendanceStatus;
}

  export interface MarksRecord {
    studentId: string;
    studentName: string;
    rollNumber: string;
    subject: string;
    marks: number;
  }

  export interface SubjectResult {
    subject: string;
    marks: number;
    grade: string;
  }
  
  export interface Assignment {
    id: string;
    title: string;
    subject: string;
    deadline: string;
    status: "pending" | "submitted";
  }

  export interface Assignment {
    _id: string;
    title: string;
    subject: string;
    deadline: string;
    submittedBy: string[];
    classGroupId: string;
    createdByTeacherId: string;
  }

  export interface Presentation {
    _id: string;
    studentId: string;
    studentName: string;
    classGroupId: string;
    topic: string;
    subject: string;
    date: string;
    time: string;
  }

  export interface Course {
    _id: string;
    name: string;
    subject: string;
    teacherId: string;
    teacherName: string;
  }

  export interface Notice {
    _id: string;
    title: string;
    message: string;
    postedBy: string;
    createdAt: string;
  }

export type MaterialCategory =
  | "PDF Notes"
  | "Video Lecture"
  | "Source Code"
  | "Assignment Guide";

export interface StudyMaterial {
  _id: string;
  title: string;
  subject: string;
  category: MaterialCategory;
  fileSize: string;
  uploadDate: string;
  downloadUrl: string;
}

export type LeaveStatus = "pending" | "approved" | "rejected";

export interface Leave {
  _id: string;
  studentId: string;
  studentName: string;
  classGroupId: string;
  reason: string;
  fromDate: string;
  toDate: string;
  attachmentUrl?: string;
  status: LeaveStatus;
}

export type ClassSection = "College" | "Institute";

export interface ClassGroup {
  _id: string;
  programName: string;
  yearName: string;
  section?: ClassSection;
}

export interface Notice {
  _id: string;
  title: string;
  message: string;
  postedBy: string;
  targetClassGroupId?: string;
  createdAt: string;
}