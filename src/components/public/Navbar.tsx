import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-xl font-bold">Md. Habibur Rahman</h1>

        {/* Links */}
        <div className="flex gap-6">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#classes">Classes</a>
          <a href="#vision">Vision</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Login Button */}
        <Button>Login</Button>
      </nav>
    </header>
  );
}