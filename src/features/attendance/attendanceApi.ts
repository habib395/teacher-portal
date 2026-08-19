import { apiSlice } from "@/features/api/apiSlice";
import type { AttendanceStatus } from "@/types";

export interface IAttendanceRecordPayload {
  studentId: string;
  status: AttendanceStatus;
}

interface SaveAttendancePayload {
  classGroupId: string;
  date: string;
  records: IAttendanceRecordPayload[];
}

interface AttendanceResponse {
  classGroupId: string;
  date: string;
  records: {
    studentId: string;
    status: AttendanceStatus;
    _id?: string;
  }[];
}

interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendanceRate: number;
}

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceByClassAndDate: builder.query<AttendanceResponse, { classGroupId: string; date: string }>({
      query: ({ classGroupId, date }) => `/attendance?classGroupId=${classGroupId}&date=${date}`,
      providesTags: ["Attendance"],
    }),
    getAttendanceSummary: builder.query<AttendanceSummary, string>({
      query: (studentId) => `/attendance/summary?studentId=${studentId}`,
      providesTags: ["Attendance"],
    }),
    saveAttendance: builder.mutation<{ message: string; attendance: AttendanceResponse }, SaveAttendancePayload>({
      query: (payload) => ({
        url: "/attendance",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Attendance"],
    }),
  }),
});

export const {
  useGetAttendanceByClassAndDateQuery,
  useGetAttendanceSummaryQuery,
  useSaveAttendanceMutation,
} = attendanceApi;