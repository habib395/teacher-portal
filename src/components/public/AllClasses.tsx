import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const classes = [
  {
    title: "Class 6 - Mathematics",
    description: "Basic algebra, geometry, and arithmetic for young learners.",
  },
  {
    title: "Class 8 - Mathematics",
    description: "Advanced arithmetic, algebra, and problem-solving skills.",
  },
  {
    title: "Class 10 - Mathematics",
    description: "SSC exam preparation with focused practice and mock tests.",
  },
  {
    title: "Class 10 - Physics",
    description: "Core physics concepts with real-life examples.",
  },
];

export default function AllClasses() {
  return (
    <section id="classes" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold text-center">All Classes</h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Card key={cls.title}>
              <CardHeader>
                <CardTitle>{cls.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{cls.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}