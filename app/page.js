import Image from "next/image";
import PromptForm from "@/components/PromptForm";
import dbConnect from "@/lib/dbConnect";
import Plan from "@/models/Plan";
import Link from "next/link";
import { Clock, Map, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

async function getRecentPlans() {
  await dbConnect();
  const plans = await Plan.find().sort({ createdAt: -1 }).limit(3);
  return plans;
}

export default async function Home() {
  const recentPlans = await getRecentPlans();

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
            <Sparkles className="w-3 h-3 " />
            <span>AI-Powered Itineraries</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 tracking-tight leading-[1.1]">
            Where do you want to <br />
            go next?
          </h1>
          <p className="text-lg text-slate-500 font-normal">
            Describe your dream trip. We`ll handle the logistics, hotels, and
            hidden gems.
          </p>
        </div>

        {/* AI Prompt Field - Updated to use PromptForm component */}
        <div className="w-full max-w-3xl mb-24 relative group z-20">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-100 rounded-2xl blur opacity-40 group-hover:opacity-65 transition duration-500" />

          {/* Using the PromptForm component */}
          <PromptForm />

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
          {recentPlans.map((plan) => (
            <Link key={plan._id} href={`/plan/${plan.slug}`}>
              <div className="group relative aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer">
                <Image
                  src={plan.imageUrl}
                  alt={plan.destination}
                  fill
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {plan.days} Days
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-2xl font-medium text-white tracking-tight leading-tight mb-1 group-hover:text-emerald-200 transition-colors">
                    {plan.destination}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {plan.description ||
                      `${plan.days} days trip to ${plan.destination}`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
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
