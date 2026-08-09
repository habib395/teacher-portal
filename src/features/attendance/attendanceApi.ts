import { apiSlice } from "@/features/api/apiSlice";
import type { AttendanceRecord } from "@/types";

interface SaveAttendancePayload {
  date: string;
  records: AttendanceRecord[];
}

interface AttendanceSummary {
  totalDays: number;
  presentDays: number;
  absentDays: number;
  attendanceRate: number;
}

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceByDate: builder.query<AttendanceRecord[], string>({
      query: (date) => `/attendance?date=${date}`,
      providesTags: ["Attendance"],
    }),
    getAttendanceSummary: builder.query<AttendanceSummary, string>({
      query: (studentId) => `/attendance/summary?studentId=${studentId}`,
      providesTags: ["Attendance"],
    }),
    saveAttendance: builder.mutation<{ message: string }, SaveAttendancePayload>({
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
  useGetAttendanceByDateQuery,
  useGetAttendanceSummaryQuery,
  useSaveAttendanceMutation,
} = attendanceApi;