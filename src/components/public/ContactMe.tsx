import SectionTitle from "../shared/SectionTitle";
import { Sparkles, Code, Server, Database, Layers } from "lucide-react";

export default function AboutMe() {

  const coursesList = [
    {
      icon: <Code className="w-5 h-5 text-indigo-500" />,
      title: "MERN Stack Development",
      description: "Mastered MongoDB, Express, React, and Node.js for full-stack apps.",
    },
    {
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      title: "Next.js & Advanced React",
      description: "Building fast, SEO-friendly web apps with modern App Router.",
    },
    {
      icon: <Server className="w-5 h-5 text-teal-500" />,
      title: "Docker & DevOps Essentials",
      description: "Learning containerization and modern deployment pipelines.",
    },
    {
      icon: <Database className="w-5 h-5 text-purple-500" />,
      title: "Tailwind CSS & UI/UX",
      description: "Creating responsive, beautiful, and interactive user interfaces.",
    },
  ];

  return (
    <section id="about" className="bg-slate-50 py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Shared Section Title Use */}
        <SectionTitle heading={"About Me"} subHeading={"Get to Know More"} />

        {/* Main Content Area */}
        <div className="mt-12 flex flex-col items-center gap-12 lg:flex-row">
          
          {/* Left Side: Photo with Living Glow Effect */}
          <div className="relative group mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-cyan-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
            <img
              src="/habibur.png"
              alt="Md. Habibur Rahman"
              className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-3xl object-cover object-top shadow-2xl border-4 border-white transform group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

          {/* Right Side: Bio & Interactive Details */}
          <div className="flex-1 space-y-6 text-left">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-600">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '4s' }} />
              Professional Overview
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Hi, I'm Md. Habibur Rahman
            </h3>
            
            <p className="text-slate-600 leading-relaxed text-base">
              A passionate Frontend Developer and B.Sc. Nursing Graduate. I bridge the gap between healthcare expertise and modern web technology, building responsive and user-friendly web applications using React, Next.js, and Tailwind CSS.
            </p>

            {/* Quick Highlights */}
            <ul className="space-y-2.5 text-slate-700 font-medium text-sm">
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-ping"></span>
                🎓 B.Sc. in Nursing Graduate (Rajshahi Nursing College)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-2 h-2 bg-cyan-600 rounded-full"></span>
                💻 Frontend Developer (MERN Stack & Next.js Enthusiast)
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: 2-Sided Course List with Living Scroll Effect */}
        <div className="mt-16">
          <h4 className="text-xl font-bold text-slate-800 text-center mb-8">
            Completed Courses & Training
          </h4>

          {/* 2-Side Grid Layout for Courses (Halka description সহ) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coursesList.map((course, index) => (
              <div 
                key={index}
                className="group relative bg-white p-6 rounded-2xl shadow-md border border-slate-200/80 hover:shadow-xl hover:border-indigo-400 transition-all duration-500 transform hover:-translate-y-1.5 flex items-start gap-4"
              >
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 transition-colors duration-300">
                  {course.icon}
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 text-base group-hover:text-indigo-600 transition-colors">
                    {course.title}
                  </h5>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                    {course.description}
                  </p>
                </div>
                
                {/* Side glow accent on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-cyan-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}