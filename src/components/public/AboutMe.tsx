
import { Code2, Layers, Server, Palette, GraduationCap, Stethoscope, Sparkles, ArrowUpRight } from "lucide-react";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io";
import SectionTitle from "../shared/SectionTitle";
import { MdEmail } from "react-icons/md";

const socialLinks = [
  {
    icon: BsLinkedin,
    title: "LinkedIn",
    description: "Professional updates & networking.",
    href: "https://www.linkedin.com/in/md-habibur-rahman-205038350/",
  },
  {
    icon: IoLogoFacebook,
    title: "Facebook",
    description: "Casual updates & behind the scenes.",
    href: "https://www.facebook.com/md.habibur.rahman.sujon.788802",
  },
  {
    icon: MdEmail,
    title: "Email",
    description: "The most direct line — anytime.",
    href: "mailto:md.habiburrahmanjwd@gmail.com",
  },
];

const PulseDivider = () => (
  <svg
    viewBox="0 0 600 50"
    className="w-full h-8 md:h-10 my-10"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <line x1="0" y1="25" x2="600" y2="25" stroke="#A8C3B8" strokeOpacity="0.6" strokeWidth="1" />
    <path
      d="M0,25 L120,25 L133,8 L146,42 L159,25 L230,25
         L243,14 L252,36 L261,25 L330,25"
      fill="none"
      stroke="#E11D48"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text x="348" y="34" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="28" fontWeight="600" fill="#0F766E">
      {"</>"}
    </text>
  </svg>
);

const coursesList = [
  {
    icon: Code2,
    title: "MERN Stack Development",
    description: "MongoDB, Express, React, and Node.js for full-stack applications.",
  },
  {
    icon: Layers,
    title: "Next.js & Advanced React",
    description: "Fast, SEO-friendly apps built with the modern App Router.",
  },
  {
    icon: Server,
    title: "Docker & DevOps Essentials",
    description: "Containerization and modern deployment pipelines.",
  },
  {
    icon: Palette,
    title: "Tailwind CSS & UI/UX",
    description: "Responsive, accessible interfaces people actually enjoy using.",
  },
];

export default function AboutMe() {
  return (
    <section id="about" className="bg-[#F4F6F5] py-12 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionTitle heading={"About Me"} />

        <div className="mt-14 flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Left: photo, styled like a chart / ID frame — no blur glow */}
          <div className="relative mx-auto lg:mx-0 shrink-0">
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#0F766E]" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#0F766E]" />
            <img
              src="/habibur.png"
              alt="Md. Habibur Rahman"
              className="relative h-72 w-72 sm:h-80 sm:w-80 object-cover object-top grayscale-[15%] border border-[#A8C3B8]/60"
            />
            <div className="absolute bottom-3 left-3 bg-[#F4F6F5] border border-[#0F766E]/40 px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase text-[#0F766E]">
              Pabna, BD
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex-1 space-y-5 text-left">
            <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-600">
<Sparkles className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '4s' }} />
Professional Overview
</div> 

            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#10231F] tracking-tight">
              Hi, I&apos;m Md. Habibur Rahman
            </h3>

            <p className="text-[#10231F]/70 leading-relaxed text-base max-w-xl">
              I spent years learning to read a patient&apos;s vitals. Now I read
              the vitals of an interface — where it&apos;s slow, where it
              breaks, where it needs care. I build responsive, user-friendly
              web applications using React, Next.js, and Tailwind CSS.
            </p>

            {/* Credentials — replaces the generic ping-dot bullet list */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <div className="flex items-center gap-2.5 border border-[#A8C3B8]/60 bg-white/60 px-3.5 py-2">
                <GraduationCap size={16} className="text-[#0F766E] shrink-0" />
                <span className="text-sm text-[#10231F]/80">
                  B.Sc. in Nursing — Rajshahi Nursing College
                </span>
              </div>
              <div className="flex items-center gap-2.5 border border-[#A8C3B8]/60 bg-white/60 px-3.5 py-2">
                <Stethoscope size={16} className="text-[#0F766E] shrink-0 rotate-180" />
                <span className="text-sm text-[#10231F]/80">
                  Frontend Developer — MERN Stack & Next.js
                </span>
              </div>
            </div>
          </div>
        </div>

        <PulseDivider />

        {/* Courses — reworked as log/chart entries, not generic glow cards */}
        <div>
          <h4 className="font-serif text-xl font-bold text-[#10231F] mb-8">
            Completed Courses &amp; Training
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {coursesList.map((course, index) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.title}
                  className="group flex items-start gap-4 border-l-2 border-[#A8C3B8]/50 pl-5 py-1 transition-colors duration-300 hover:border-[#0F766E]"
                >
                  <span className="font-mono text-xs text-[#0F766E]/70 mt-1 shrink-0 w-6">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon size={18} className="text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-[#10231F] text-base group-hover:text-[#0F766E] transition-colors">
                      {course.title}
                    </h5>
                    <p className="text-sm text-[#10231F]/60 mt-1 leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>


        </div>
      {/* Connect with me */}
      <div>
          <SectionTitle heading="Connect with Me" />
          <div className="mt-10 divide-y divide-[#A8C3B8]/40 border-t border-b border-[#A8C3B8]/40">
            {socialLinks.map(({ icon: Icon, title, description, href }, index) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 py-5 hover:bg-[#0F766E]/5 transition-colors px-2"
              >
                <span className="font-mono text-xs text-[#0F766E]/70 w-6 shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center justify-center w-10 h-10 border border-[#0F766E]/40 text-[#0F766E] shrink-0">
                  <Icon size={18} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#10231F] group-hover:text-[#0F766E] transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm text-[#10231F]/60 mt-0.5">{description}</p>
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-[#10231F]/30 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0F766E]"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
