import Image from "next/image";
import { Sparkles, Bot, ArrowRight, Clock, Map } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Background Decoration (Subtle Mesh) */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#ecfdf5_100%)]" />

      {/* Minimal Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full py-6 px-6 lg:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 text-slate-900">
          <Map className="w-6 h-6 text-emerald-600" />
          <span className="text-lg font-medium tracking-tight">Wanderlust</span>
        </div>
      </nav>

      {/* Main Container */}
      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative w-full max-w-7xl mx-auto">
        {/* Hero Text */}
        <div className="text-center mb-10 space-y-4 max-w-2xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium mb-2">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Itineraries</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1]">
            Where do you want to <br />
            go next?
          </h1>
          <p className="text-lg text-slate-500 font-normal">
            Describe your dream trip. We&apos;ll handle the logistics, hotels,
            and hidden gems.
          </p>
        </div>

        {/* AI Prompt Field */}
        <div className="w-full max-w-3xl mb-24 relative group z-20">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-2xl blur opacity-40 group-hover:opacity-75 transition duration-500" />
          <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-start p-3 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
            <div className="p-4 pt-5">
              <Bot className="w-7 h-7 text-emerald-600" />
            </div>
            <textarea
              className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg text-slate-900 placeholder:text-slate-400 py-4 px-3 resize-none h-[140px] leading-relaxed"
              placeholder="e.g. A romantic 4-day trip to Paris in Spring, focusing on art museums and hidden cafes..."
              defaultValue={""}
            />
            <div className="p-2 pt-3">
              <Link href={"plan/s"}>
                <button className="bg-slate-900 text-white p-3.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-md group-focus-within:bg-emerald-600 hover:shadow-lg">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>

          {/* Quick Suggestion Tags */}
          <div className="flex justify-center gap-3 mt-4 text-xs font-medium text-slate-500">
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              ✨ 3 Days in Tokyo
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full mt-2" />
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              🍷 Wine tasting in Tuscany
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full mt-2" />
            <span className="hover:text-emerald-600 cursor-pointer transition-colors">
              🏔️ Hiking in Patagonia
            </span>
          </div>
        </div>

        {/* Featured/Recent Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 opacity-0 animate-[fadeIn_0.8s_ease-out_0.5s_forwards]">
          {/* Card 1: Paris */}
          <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop"
              alt="Paris"
              width={400}
              height={500}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />4 Days
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-medium text-white tracking-tight leading-tight mb-1 group-hover:text-emerald-200 transition-colors">
                Paris: The Ultimate <br />
                City of Lights
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                Eiffel Tower summit, Louvre highlights, and sunset cruises on
                the Seine.
              </p>
            </div>
          </div>

          {/* Card 2: Kyoto */}
          <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2670&auto=format&fit=crop"
              alt="Kyoto"
              width={400}
              height={500}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />7 Days
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-medium text-white tracking-tight leading-tight mb-1 group-hover:text-orange-200 transition-colors">
                Kyoto: Ancient <br />
                Traditions
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                Bamboo groves, Fushimi Inari shrines, and traditional tea
                ceremonies.
              </p>
            </div>
          </div>

          {/* Card 3: Amalfi */}
          <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
            <Image
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2686&auto=format&fit=crop"
              alt="Amalfi Coast"
              width={400}
              height={500}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3 h-3" />5 Days
              </div>
            </div>
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="text-2xl font-medium text-white tracking-tight leading-tight mb-1 group-hover:text-blue-200 transition-colors">
                Amalfi: Coastal <br />
                Paradise
              </h3>
              <p className="text-white/70 text-sm line-clamp-2">
                Cliffside drives, Positano beaches, and authentic Italian pasta
                making.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="absolute bottom-0 w-full py-6 text-center text-slate-400 text-sm">
        <p>
          Press
          <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
            Enter
          </span>
          to generate your plan
        </p>
      </footer>
    </>
  );
}
