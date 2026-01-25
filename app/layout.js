import FacebookSDK from "@/components/FacebookSDK";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Wanderlust - AI Trip Planner",
  description:
    "Plan your perfect trip with AI-powered itineraries tailored to your preferences.",
  openGraph: {
    title: "Wanderlust - AI Trip Planner",
    description:
      "Plan your perfect trip with AI-powered itineraries tailored to your preferences.",
    url: siteUrl,
    siteName: "Wanderlust",
    images: [
      {
        url: "/og-image.svg", // Must be a relative path
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wanderlust - AI Trip Planner",
    description:
      "Plan your perfect trip with AI-powered itineraries tailored to your preferences.",
    images: ["/og-image.svg"], // Must be a relative path
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-white text-slate-600 antialiased selection:bg-emerald-100 selection:text-emerald-900 relative`}
      >
        <div id="fb-root"></div>
        <FacebookSDK />
        {children}
      </body>
    </html>
  );
}
