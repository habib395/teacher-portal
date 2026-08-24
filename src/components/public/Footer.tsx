import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoFacebook } from "react-icons/io";

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

const socialLinks = [
  {
    icon: BsLinkedin,
    href: "https://www.linkedin.com/in/md-habibur-rahman-205038350/",
    label: "LinkedIn",
  },
  {
    icon: IoLogoFacebook,
    href: "https://www.facebook.com/md.habibur.rahman.sujon.788802",
    label: "Facebook",
  },
  {
    icon: MdEmail,
    href: "mailto:md.habiburrahmanjwd@gmail.com",
    label: "Email",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#10231F] text-gray-300 border-t border-[#A8C3B8]/30">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Brand & Bio */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl font-bold text-white tracking-wide">
              Md. Habibur Rahman
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Nursing Student, Nursing Teacher & Web Developer. Empowering education and building digital solutions.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-9 h-9 border border-[#A8C3B8]/40 text-[#A8C3B8] hover:bg-[#0F766E] hover:text-white hover:border-[#0F766E] transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#A8C3B8] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#classes" className="hover:text-white transition-colors">Classes</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Details from Contact Component */}
          <div>
            <h4 className="font-mono text-[10px] tracking-widest uppercase text-[#A8C3B8] mb-4">
              Direct Contact
            </h4>
            <div className="space-y-3 text-sm">
              {contactDetails.map(({ label, value, href }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-mono text-[9px] tracking-wider uppercase text-gray-500">
                    {label}
                  </span>
                  {href ? (
                    <a href={href} className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm break-all">
                      {value}
                    </a>
                  ) : (
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-[#A8C3B8]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {currentYear} Md. Habibur Rahman. All rights reserved.</p>
          <p className="font-mono text-[10px] tracking-wider uppercase text-[#A8C3B8]/80">
            Designed with Care & Code
          </p>
        </div>
      </div>
    </footer>
  );
}