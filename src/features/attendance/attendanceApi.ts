import { apiSlice } from "@/features/api/apiSlice";
import type { AttendanceRecord } from "@/types";

interface SaveAttendancePayload {
  date: string;
  records: AttendanceRecord[];
}

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAttendanceByDate: builder.query<AttendanceRecord[], string>({
      query: (date) => `/attendance?date=${date}`,
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

export const { useGetAttendanceByDateQuery, useSaveAttendanceMutation } = attendanceApi;