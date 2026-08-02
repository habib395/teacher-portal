
export type UserRole = "admin" | "teacher" | "student";

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

export interface Student {
    id: string;
    name: string;
    classId: string;
    rollNumber: string;
}