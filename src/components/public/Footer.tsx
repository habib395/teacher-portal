export default function Footer() {
    return (
      <footer className="bg-neutral-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center">
          <h3 className="text-lg font-bold">Md. Habibur Rahman</h3>
          <p className="mt-2 text-sm text-gray-400">
            Class Teacher | Helping students learn and grow.
          </p>
  
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <a href="#home" className="hover:text-gray-300">Home</a>
            <a href="#about" className="hover:text-gray-300">About</a>
            <a href="#classes" className="hover:text-gray-300">Classes</a>
            <a href="#contact" className="hover:text-gray-300">Contact</a>
          </div>
  
          <p className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Md. Habibur Rahman. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }