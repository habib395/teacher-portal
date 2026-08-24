import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Baby, Brain, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";

type Program = {
  name: string;
  year: string;
  note?: string;
};

type Subject = {
  icon: LucideIcon;
  title: string;
  programs: Program[];
};

const subjects: Subject[] = [
  {
    icon: Baby,
    title: "Pediatric Nursing",
    programs: [
      { name: "Diploma in Nursing & Midwifery", year: "2nd Year", note: "Old · College" },
    ],
  },
  {
    icon: Brain,
    title: "Anatomy",
    programs: [
      { name: "BSc in Nursing (Basic)", year: "1st Year" },
      { name: "Diploma in Midwifery", year: "1st Year" },
    ],
  },
  {
    icon: FlaskConical,
    title: "Research",
    programs: [
      { name: "Diploma in Midwifery", year: "2nd Year", note: "New" },
      { name: "Diploma in Midwifery", year: "2nd Year", note: "Old" },
      { name: "Diploma in Nursing & Midwifery", year: "3rd Year", note: "Old · College" },
    ],
  },
];

export default function AllClasses() {
  return (
    <section id="classes" className="bg-[#F4F6F5] py-12 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
             <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-600">
<Sparkles className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '4s' }} />
Currently Teaching
</div> 
         
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#10231F] mt-4">
            All Classes
          </h2>
          <p className="text-[#10231F]/60 mt-2 max-w-xl mx-auto text-sm md:text-base">
            Subjects taught across nursing &amp; midwifery programs, grouped by focus area.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <Card
                key={subject.title}
                className="relative rounded-none border-[#A8C3B8]/60 bg-white/70 shadow-none pt-2"
              >
                <div className="absolute -top-3 left-6 bg-[#F4F6F5] px-2 font-mono text-[10px] tracking-widest uppercase text-[#0F766E]">
                  Subject
                </div>

                <CardHeader className="flex-row items-center gap-3 pb-3">
                  <div className="flex items-center justify-center w-9 h-9 border border-[#0F766E]/40 text-[#0F766E] shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#10231F] leading-tight">
                      {subject.title}
                    </h3>
                    <p className="font-mono text-[11px] text-[#10231F]/50">
                      {subject.programs.length}{" "}
                      {subject.programs.length === 1 ? "batch" : "batches"}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <ul className="divide-y divide-[#A8C3B8]/40">
                    {subject.programs.map((program, i) => (
                      <li
                        key={`${program.name}-${i}`}
                        className="flex items-start justify-between gap-3 py-2.5 text-sm"
                      >
                        <span className="text-[#10231F]/80">{program.name}</span>
                        <span className="flex flex-col items-end gap-1 shrink-0">
                          <span className="font-mono text-[11px] text-[#0F766E]">
                            {program.year}
                          </span>
                          {program.note && (
                            <span className="font-mono text-[10px] text-[#10231F]/40">
                              {program.note}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}