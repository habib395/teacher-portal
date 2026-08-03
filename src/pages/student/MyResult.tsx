import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RootState } from "@/app/store";
import { useGetMarksByStudentQuery } from "@/features/marks/markApi";

export default function MyResult() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);

const { data: results, isLoading, isError } = useGetMarksByStudentQuery(
  studentProfileId ?? "",
  { skip: !studentProfileId }
);

  if (isLoading) return <p>Loading result...</p>;
  if (isError) return <p className="text-red-600">Failed to load result.</p>;

  const totalMarks = results?.reduce((sum, r) => sum + r.marks, 0) ?? 0;
  const averageMarks = results?.length ? (totalMarks / results.length).toFixed(1) : "0";

  return (
    <div>
      <h1 className="text-2xl font-bold">My Result</h1>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results?.map((result) => (
              <TableRow key={result.subject}>
                <TableCell>{result.subject}</TableCell>
                <TableCell>{result.marks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex gap-8">
        <div>
          <p className="text-sm text-gray-500">Total Marks</p>
          <p className="text-xl font-bold">{totalMarks}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Average</p>
          <p className="text-xl font-bold">{averageMarks}</p>
        </div>
      </div>
    </div>
  );
}