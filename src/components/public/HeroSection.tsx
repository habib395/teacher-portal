import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Play } from "lucide-react";

const floatingElements = [
  { left: "15%", top: "25%", delay: "0.2s" },
  { left: "35%", top: "65%", delay: "1.5s" },
  { left: "55%", top: "20%", delay: "0.8s" },
  { left: "75%", top: "75%", delay: "2.1s" },
  { left: "85%", top: "35%", delay: "1.1s" },
  { left: "25%", top: "80%", delay: "2.5s" },
];

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-20 overflow-hidden flex items-center">
      
      {/* Professional Background Glow & Geometric Pattern Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-indigo-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-32 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-violet-400/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Professional Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((el, i) => (
          <div
            key={i}
            className="absolute opacity-15 animate-pulse"
            style={{
              left: el.left,
              top: el.top,
              animationDelay: el.delay,
            }}
          >
            <Shield className="w-5 h-5 text-indigo-300" />
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Badge Tag with Glow Effect */}
            <div className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 backdrop-blur-md border border-indigo-400/30 rounded-full text-sm font-medium shadow-lg shadow-indigo-500/10">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-indigo-100">Smart Class Teacher Portal & Portfolio</span>
            </div>

            {/* Main Title with Animated Gradients */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              Hi, I'm{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-indigo-300 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Md. Habibur Rahman
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 rounded-full"></div>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-300 max-w-xl leading-relaxed">
              A passionate Class Teacher & Developer dedicated to streamlining student management, chapter-wise file sharing, and seamless attendance tracking.
            </p>

            {/* Action Buttons with Hover Effect */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-6 py-6 text-base rounded-xl shadow-xl shadow-indigo-600/30 transition-all duration-300 group transform hover:scale-105 border-0">
                Explore Dashboard 
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-2 border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-600 text-slate-200 px-6 py-6 text-base rounded-xl backdrop-blur-md transform hover:scale-105 transition-all duration-300">
                <Play className="w-4 h-4 mr-2" /> Contact Me
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-slate-300">Secure Portal</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300">Real-time Tracking</span>
              </div>
            </div>

          </div>

          {/* Right Side: Image and Shapes Container */}
          <div className="lg:col-span-5 relative">
        
            <div className="absolute -top-8 -right-6 w-28 h-28 bg-gradient-to-br from-cyan-400/40 to-indigo-500/40 rounded-3xl rotate-12 animate-pulse backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none z-0"></div>
            
            <div
              className="absolute bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-teal-400/40 to-emerald-500/40 rounded-3xl -rotate-12 animate-pulse backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none z-0"
              style={{ animationDelay: "1.5s" }}
            ></div>
            
            <div
              className="absolute top-1/2 -right-10 w-20 h-20 bg-gradient-to-br from-violet-400/40 to-purple-500/40 rounded-full animate-bounce backdrop-blur-md border border-white/20 shadow-2xl pointer-events-none z-0"
              style={{ animationDelay: "1s" }}
            ></div>

            {/* Background Aura Glow behind the card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/25 via-indigo-500/25 to-teal-400/25 rounded-[2.5rem] blur-2xl opacity-75 animate-pulse pointer-events-none z-0"></div>

            {/* Main Content Card (Keeping it above shapes using z-10) */}
            <div className="relative mx-auto max-w-md lg:max-w-none p-2 group z-10">
              
              {/* Profile Image Cinematic Box */}
              <div className="relative w-full h-[450px] sm:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl flex items-center justify-center border border-white/10 bg-slate-900/40 backdrop-blur-xl">
                
                {/* Cinematic Spotlight Effect Inside Image Box */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>

                {/* Bottom Smooth Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none" />

                <img 
                  src="/habibur.png" 
                  alt="Md. Habibur Rahman" 
                  className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 relative z-0 filter contrast-105"
                />

                {/* Floating Glass Badge over Image */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/75 backdrop-blur-xl border border-white/15 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shadow-lg shadow-emerald-400/50" />
                    <div>
                      <p className="text-xs font-bold text-white tracking-wide">Md. Habibur Rahman</p>
                      <p className="text-[10px] text-cyan-300 font-medium">Class Teacher & Developer</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">Active</span>
                </div>
              </div>

              {/* Minimalist Stats Row Below Image */}
              <div className="grid grid-cols-2 gap-4 mt-4 px-2">
                <div className="p-3 text-center bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-lg">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">100%</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">Chapter Notes</div>
                </div>
                <div className="p-3 text-center bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-lg">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-white via-cyan-200 to-teal-300 bg-clip-text text-transparent">94%</div>
                  <div className="text-xs text-slate-300 mt-0.5 font-medium">Avg Attendance</div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Professional bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent"></div>
    </section>
  );
}