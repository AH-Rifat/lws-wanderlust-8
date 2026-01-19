import "./globals.css";

export const metadata = {
  title: "Wanderlust - AI Trip Planner",
  description:
    "Plan your perfect trip with AI-powered itineraries tailored to your preferences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-slate-600 antialiased selection:bg-emerald-100 selection:text-emerald-900 relative`}
      >
        {children}
      </body>
    </html>
  );
}
