import {
  Map,
  Share2,
  Clock,
  TowerControl,
  Frame,
  Crown,
  Croissant,
  Lightbulb,
  Wallet,
  Instagram,
  Twitter,
  Facebook,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Plan() {
  return (
    <>
      {/* Navbar (Overlay) */}
      <nav className="absolute top-0 left-0 right-0 z-50 w-full py-6 px-6 lg:px-12 flex justify-between items-center text-white">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
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
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2679&auto=format&fit=crop"
          alt="Paris Landscape"
          fill
          className="object-cover transform scale-105 group-hover:scale-100 ease-in-out duration-700"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-black/30" />
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16 flex flex-col items-start gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-sm font-medium drop-shadow-lg">
            <Clock className="w-3.5 h-3.5" />
            <span>4 Days</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl drop-shadow-lg font-medium text-white tracking-tight leading-[1.1]">
            Paris: The Ultimate <br />
            <span className="text-emerald-400">City of Lights</span>
          </h1>
          <p className="text-lg text-gray-50 max-w-2xl drop-shadow-lg font-normal leading-relaxed">
            Experience the romance, history, and flavor of the French capital.
            From the heights of the Eiffel Tower to the artistic streets of
            Montmartre.
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
              Parisian Journey
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed">
              We&apos;ve curated the must-see landmarks, crucial travel tips,
              and culinary experiences into one seamless plan. Don&apos;t just
              visit Paris—live it.
            </p>
          </div>
        </div>

        {/* Grid Features (Mapped from Attractions, Tips, Food) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {/* Feature 1: Key Attraction */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-emerald-50 mb-6 group-hover:bg-emerald-100 transition-colors">
              <TowerControl className="text-emerald-600 w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                Eiffel Tower
              </h3>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded">
                4.8 ★
              </span>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed">
              The iron lady of Paris. Pre-book tickets to save waiting time and
              catch the sparkling lights at the top of every hour.
            </p>
          </div>

          {/* Feature 2: Key Attraction */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-orange-50 mb-6 group-hover:bg-orange-100 transition-colors">
              <Frame className="text-orange-500 w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                The Louvre
              </h3>
              <span className="text-xs font-semibold bg-orange-100 text-orange-800 px-2 py-1 rounded">
                4.9 ★
              </span>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed">
              Home to the Mona Lisa. Expert tip: Enter through the Carrousel du
              Louvre underground entrance to avoid the main pyramid lines.
            </p>
          </div>

          {/* Feature 3: Key Attraction */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-50 mb-6 group-hover:bg-blue-100 transition-colors">
              <Crown className="text-blue-500 w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-medium text-slate-900 tracking-tight">
                Versailles
              </h3>
              <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded">
                4.7 ★
              </span>
            </div>
            <p className="text-lg text-slate-500 leading-relaxed">
              A royal masterpiece. Explore the Hall of Mirrors and rent a bike
              to traverse the massive, perfectly manicured gardens.
            </p>
          </div>

          {/* Feature 4: Food Experience */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-purple-50 mb-6 group-hover:bg-purple-100 transition-colors">
              <Croissant className="text-purple-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">
              Gastronomy
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              Must try: Duck Confit, Crème Brûlée, and Pain au Chocolat. Best
              areas: Le Marais and Latin Quarter. Look for &apos;Formule&apos;
              lunch menus.
            </p>
          </div>

          {/* Feature 5: Travel Tips */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-yellow-50 mb-6 group-hover:bg-yellow-100 transition-colors">
              <Lightbulb className="text-yellow-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">
              Smart Travel
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              Buy a &apos;Paris Visite&apos; pass for Metro. Always say
              &quot;Bonjour&quot; when entering shops. Be cautious of bracelet
              scams near Sacré-Cœur.
            </p>
          </div>

          {/* Feature 6: Budget */}
          <div className="group">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 mb-6 group-hover:bg-rose-100 transition-colors">
              <Wallet className="text-rose-500 w-6 h-6" />
            </div>
            <h3 className="text-xl font-medium text-slate-900 mb-3 tracking-tight">
              Budget Estimate
            </h3>
            <p className="text-lg text-slate-500 leading-relaxed">
              <span className="font-semibold text-slate-900">€500 - €800</span>
              per person. Covers moderate meals, transport, and entry tickets
              (excluding flights/hotels).
            </p>
          </div>
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
                Your 4-Day <br />
                Parisian Itinerary
              </h2>
            </div>
          </div>

          {/* Cards Container (2x2 Grid for 4 Days) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Day 1 Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1592680105872-50fafe39a5e1?q=80&w=2076&auto=format&fit=crop"
                  alt="Eiffel Tower"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-90"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                  Day 01: Landmarks &amp; River
                </h3>
                {/* Timeline */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      09:00 AM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Eiffel Tower Summit
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Pre-book tickets to save 2h waiting
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      01:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Lunch at Champ de Mars
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Grab a baguette &amp; cheese for a picnic
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      04:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Seine River Cruise
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 2 Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1697397571919-714081e8684a?q=80&w=1974&auto=format&fit=crop"
                  alt="Louvre Museum"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-90"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                  Day 02: Artistic Immersion
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      10:00 AM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Louvre Museum
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Enter via Carrousel du Louvre
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      03:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Tuileries Garden Walk
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      07:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Dinner: Saint-Germain
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Historic literary cafes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 3 Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610379957144-8809927428e4?q=80&w=1974&auto=format&fit=crop"
                  alt="Montmartre"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-90"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                  Day 03: Bohemian Vibe
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      09:00 AM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Montmartre &amp; Sacré-Cœur
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        See local artists at Place du Tertre
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      01:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Le Marais District
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Vintage shopping &amp; falafel
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      08:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Moulin Rouge Show
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Book months in advance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Day 4 Card */}
            <div className="group relative rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800/50 hover:border-emerald-700 transition-all duration-300">
              <div className="aspect-[16/9] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1706192878987-f893eb8cd632?q=80&w=1974&auto=format&fit=crop"
                  alt="Versailles"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 opacity-90"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-medium text-white mb-4 tracking-tight">
                  Day 04: Palatial Grandeur
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      09:00 AM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Palace of Versailles
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        RER C train from central
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      02:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Gardens &amp; Grand Trianon
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Rent a bike to explore
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-emerald-400 font-mono text-sm w-16 pt-0.5 whitespace-nowrap">
                      06:00 PM
                    </span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        Farewell: Latin Quarter
                      </p>
                      <p className="text-emerald-200/60 text-xs">
                        Try traditional Onion Soup
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              Curating the world&apos;s best quick escapes. Plan less, live
              more.
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
    </>
  );
}
