export type UserRole = "admin" | "teacher" | "student";
export type AttendanceStatus = "present" | "absent";


export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ClassInfo {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
}

export interface Teacher {
  _id: string;
  name: string;
  email: string;
  subject: string;
  phone: string;
}

export interface Student {
  _id: string;

  name: string;
  email: string;
  classId?: string;
  className: string;
  rollNumber: string;
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
  }