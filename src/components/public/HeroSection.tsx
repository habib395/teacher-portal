import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section id="home" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Hi, I'm Md. Habibur Rahman
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A Class Teacher passionate about helping students learn and grow.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button>View Classes</Button>
          <Button variant="outline">Contact Me</Button>
        </div>
      </div>
    </section>
  );
}