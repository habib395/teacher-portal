import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Classes", href: "#classes" },
    { name: "Vision", href: "#vision" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#A8C3B8]/30 shadow-xs">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo / Brand Name */}
        <a href="#home" className="group flex flex-col">
          <span className="font-serif text-lg md:text-xl font-bold text-[#10231F] tracking-tight group-hover:text-[#0F766E] transition-colors">
            Md. Habibur Rahman
          </span>
          <span className="font-mono text-[9px] tracking-widest uppercase text-[#0F766E]/80">
            Teacher Portal
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#10231F]/80">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#0F766E] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0F766E] hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Login Button */}
        <div className="hidden md:block">
          <Link to="/login">
            <Button className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-mono text-xs uppercase tracking-wider px-5 py-2">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#10231F] focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#A8C3B8]/40 shadow-lg py-6 px-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#10231F] hover:text-[#0F766E] transition-colors py-2 border-b border-gray-100"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2">
            <Link to="/login" onClick={() => setIsOpen(false)} className="block w-full">
              <Button className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-mono text-xs uppercase tracking-wider py-2.5">
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}