const stats = [
    { label: "Total Students", value: "500+" },
    { label: "Classes Taught", value: "12+" },
    { label: "Years of Experience", value: "8+" },
    { label: "Awards Won", value: "3" },
  ];
  
  export default function TotalStudent() {
    return (
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="mt-2 text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }