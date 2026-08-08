import { FileText, Download } from "lucide-react";
import { useGetStudyMaterialsQuery } from "@/features/studymaterials/studyMaterialApi";

export default function StudyMaterials() {
  const { data: materials, isLoading } = useGetStudyMaterialsQuery();

  if (isLoading) return <p>Loading study materials...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Study Materials</h1>

      {materials && materials.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((material) => (
            <div
              key={material._id}
              className="rounded-md border p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-semibold">{material.title}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {material.subject} • {material.category}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {material.fileSize} • {material.uploadDate}
                </p>
              </div>

                <a href={material.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
                >
                <Download className="h-4 w-4" /> Download
                </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-gray-500">No study materials uploaded yet.</p>
      )}
    </div>
  );
}