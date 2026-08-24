import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

import { Sparkles } from "lucide-react";

const contactDetails = [
  {
    icon: MdEmail,
    label: "Email",
    value: "md.habiburrahmanjwd@gmail.com",
    href: "mailto:md.habiburrahmanjwd@gmail.com",
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "+880 1742923499",
    href: "tel:+8801742923499",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+880 1742923499",
    href: "https://wa.me/8801742923499",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Pabna, Bangladesh",
  },
];

const roles = ["Nursing Student", "Nursing Teacher", "Web Developer"];

const PulseDivider = () => (
  <svg
    viewBox="0 0 600 50"
    className="w-full h-8 md:h-10 my-14"
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

const Contact = () => {
  return (
    <div id="contact" className="bg-[#F4F6F5]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-28">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center px-4 py-1.5 bg-indigo-50 border border-indigo-200 rounded-full text-xs font-semibold text-indigo-600">
<Sparkles className="w-3.5 h-3.5 mr-1.5 animate-spin" style={{ animationDuration: '4s' }} />
Get in Touch
</div> 
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#10231F] mt-5 leading-tight">
            Let&apos;s build together
          </h1>
          <p className="text-[#10231F]/60 mt-4 text-base md:text-lg">
            A nursing question, a teaching collaboration, or a web project —
            I read every message myself.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {roles.map((role) => (
              <span
                key={role}
                className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 border border-[#A8C3B8]/60 text-[#10231F]/70"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Info + Form */}
        <div className="mt-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Contact details, framed like a chart card */}
          <div className="relative border border-[#A8C3B8]/60 bg-white/60">
            <div className="absolute -top-3 left-6 bg-[#F4F6F5] px-2 font-mono text-[10px] tracking-widest uppercase text-[#0F766E]">
              Contact Details
            </div>
            <div className="divide-y divide-[#A8C3B8]/40 px-6">
              {contactDetails.map(({ icon: Icon, label, value, href }) => {
                const row = (
                  <div className="flex items-center gap-4 py-5">
                    <div className="flex items-center justify-center w-10 h-10 border border-[#0F766E]/40 text-[#0F766E] shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-[#10231F]/40">
                        {label}
                      </p>
                      <p className="text-[#10231F] text-sm sm:text-base mt-0.5 break-all">
                        {value}
                      </p>
                    </div>
                  </div>
                );
                return href ? (
                  <a key={label} href={href} className="block hover:bg-[#0F766E]/5 transition-colors -mx-6 px-6">
                    {row}
                  </a>
                ) : (
                  <div key={label}>{row}</div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form className="border border-[#A8C3B8]/60 bg-white/60 p-6 sm:p-8 space-y-5">
            {["Your Name", "Your Email", "Your Message"].map((label) => (
              <div key={label}>
                <label className="block font-mono text-[10px] tracking-widest uppercase text-[#10231F]/50 mb-1.5">
                  {label}
                </label>
                {label === "Your Message" ? (
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent border border-[#A8C3B8]/60 px-3.5 py-2.5 text-[#10231F] text-sm outline-none focus:border-[#0F766E] transition-colors resize-none"
                  />
                ) : (
                  <input
                    type={label === "Your Email" ? "email" : "text"}
                    required
                    className="w-full bg-transparent border border-[#A8C3B8]/60 px-3.5 py-2.5 text-[#10231F] text-sm outline-none focus:border-[#0F766E] transition-colors"
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="w-full py-3 bg-[#0F766E] text-white font-mono text-sm tracking-wide uppercase hover:bg-[#0F766E]/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        <PulseDivider />

        
      </div>
    </div>
  );
};

export default Contact;