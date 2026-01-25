import dbConnect from "@/lib/dbConnect";
import Plan from "@/models/Plan";
import { notFound } from "next/navigation";
import { Map, Share2, Clock, Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getPlan(slug) {
  await dbConnect();
  const plan = await Plan.findOne({ slug }).lean();
  if (!plan) {
    notFound();
  }
  return plan;
}

export async function generateMetadata({ params }) {
  const plan = await getPlan(params.slug);

  return {
    title: plan.meta.title,
    description: plan.meta.description,
    openGraph: {
      title: plan.meta.title,
      description: plan.meta.description,
      images: [plan.imageUrl],
    },
  };
}

export default async function PlanPage({ params }) {
  const plan = await getPlan(params.slug);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Navbar (Overlay) */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full py-6 px-6 lg:px-12 flex justify-between items-center text-white">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Map className="w-6 h-6" />
            <span className="text-lg font-medium tracking-tight">
              Wanderlust
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button className="bg-white text-emerald-950 text-sm font-medium px-5 py-2 rounded-full hover:bg-emerald-50 transition-colors flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[85vh] min-h-[600px] overflow-hidden group">
        {/* Background Image with Next.js Image Component */}
        <div className="absolute inset-0 w-full h-full transform scale-105 group-hover:scale-100 ease-in-out duration-700">
          <Image
            src={plan.imageUrl}
            alt={plan.destination}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-black/30" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 flex flex-col items-start gap-6 max-w-4xl z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-medium drop-shadow-lg">
            <Clock className="w-3.5 h-3.5" />
            <span>{plan.days} Days</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl drop-shadow-lg font-medium text-white tracking-tight leading-[1.1]">
            {plan.destination}:
            <span className="text-emerald-400"> {plan.subtitle}</span>
          </h1>

          <p className="text-sm text-gray-50 max-w-2xl drop-shadow-lg font-normal leading-relaxed">
            {plan.description}
          </p>
        </div>
      </header>

      {/* Introduction / Highlights & Tips */}
      <section className="py-20 lg:py-32 px-6 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-emerald-600 font-medium tracking-wide uppercase text-xs mb-3 block">
              Destination Highlights
            </span>
            <h2 className="text-4xl lg:text-5xl font-medium text-slate-900 tracking-tight mb-6">
              Essentials for your <br />
              Journey
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              We&apos;ve curated the must-see landmarks, crucial travel tips,
              and culinary experiences into one seamless plan.
            </p>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plan.highlights.map((highlight, index) => (
            <div key={index} className="group">
              <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-50 mb-6 group-hover:bg-emerald-100 transition-colors">
                <span className="text-emerald-600 text-lg font-bold">
                  {highlight.icon}
                </span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                  {highlight.title}
                </h3>
                {highlight.rating && (
                  <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                    {highlight.rating} ★
                  </span>
                )}
              </div>

              <p className="text-lg text-slate-500 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dark Section: Itinerary Highlights */}
      <section className="bg-emerald-950 py-24 px-6 lg:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-emerald-400 font-medium tracking-wide uppercase text-xs mb-3 block">
                Travel Plan
              </span>
              <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight">
                Your {plan.days}-Day <br />
                Itinerary
              </h2>
            </div>
          </div>

          {/* Cards Container - 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plan.itinerary.map((day) => (
              <div
                key={day.day}
                className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300"
              >
                {/* Day Image with Next.js Image Component */}
                <div className="aspect-[16/9] w-full overflow-hidden relative">
                  <Image
                    src={day.imageUrl || plan.imageUrl}
                    alt={`Day ${day.day}: ${day.title}`}
                    fill
                    className="object-cover group-hover:scale-105 duration-700 opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                    Day {day.day.toString().padStart(2, "0")}: {day.title}
                  </h3>

                  {/* Timeline */}
                  <div className="space-y-4 mb-6">
                    {day.activities?.map((activity, index) => (
                      <div key={index} className="flex gap-4">
                        <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                          {activity.time}
                        </span>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {activity.title}
                          </p>
                          {activity.description && (
                            <p className="text-emerald-200/60 text-xs">
                              {activity.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Section */}
      {plan.budget && (
        <section className="py-20 px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center">
                <span className="text-emerald-600 text-lg font-bold">💰</span>
              </div>
              <div>
                <span className="text-emerald-600 font-medium tracking-wide uppercase text-xs">
                  Budget Estimate
                </span>
                <h3 className="text-2xl font-medium text-slate-900">
                  Cost Breakdown
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(plan.budget).map(([category, amount]) => (
                <div key={category} className="bg-white rounded-xl p-6">
                  <p className="text-slate-500 text-sm mb-2">{category}</p>
                  <p className="text-2xl font-bold text-slate-900">{amount}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white pt-24 pb-12 px-6 lg:px-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <Map className="w-6 h-6" />
              <span className="text-lg font-medium tracking-tight">
                Wanderlust
              </span>
            </div>
            <p className="text-lg text-slate-500 mb-8">
              Curating the world1s best quick escapes. Plan less, live more.
            </p>
            <div className="flex gap-4">
              <Instagram className="w-6 h-6 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
              <Facebook className="w-6 h-6 text-slate-400 hover:text-slate-900 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div>
              <h4 className="text-slate-900 font-medium mb-4">Company</h4>
              <ul className="space-y-3 text-lg text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-medium mb-4">Resources</h4>
              <ul className="space-y-3 text-lg text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Travel Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-medium mb-4">Legal</h4>
              <ul className="space-y-3 text-lg text-slate-500">
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-100 flex justify-between text-slate-400 text-sm">
          <p>© 2024 Wanderlust Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
