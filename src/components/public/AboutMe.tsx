export default function AboutMe() {
    return (
      <section id="about" className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold text-center">About Me</h2>
  
          <div className="mt-10 flex flex-col items-center gap-8 md:flex-row">
            {/* Photo */}
            <img
              src="https://via.placeholder.com/300"
              alt="Md. Habibur Rahman"
              className="h-64 w-64 rounded-full object-cover"
            />
  
            {/* Text */}
            <div>
              <p className="text-gray-600">
                I am a dedicated Class Teacher with years of experience in
                helping students understand concepts clearly and build a
                strong foundation for their future. I believe every student
                has the potential to succeed with the right guidance and
                support.
              </p>
  
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>🎓 M.Sc in Mathematics</li>
                <li>📚 8+ Years of Teaching Experience</li>
                <li>🏆 Best Teacher Award, 2022</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }