import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dummyResult } from "@/features/result/resultData";

export default function MyResult() {
  const totalMarks = dummyResult.reduce((sum, r) => sum + r.marks, 0);
  const averageMarks = (totalMarks / dummyResult.length).toFixed(1);

  return (
    <div>
      <h1 className="text-2xl font-bold">My Result</h1>

      <div className="mt-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Marks</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyResult.map((result) => (
              <TableRow key={result.subject}>
                <TableCell>{result.subject}</TableCell>
                <TableCell>{result.marks}</TableCell>
                <TableCell>{result.grade}</TableCell>
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