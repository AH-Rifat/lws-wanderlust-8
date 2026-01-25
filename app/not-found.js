"use client";

import { useRouter } from "next/navigation";
import { MapPin, Plane, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 px-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <Plane size={32} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Destination Not Found
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 mb-6">
          Looks like this route doesn’t exist. Your journey might have taken a
          wrong turn.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white font-medium hover:bg-sky-700 transition"
          >
            <MapPin size={18} />
            Back to Home
          </button>

          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Footer text */}
        <p className="mt-6 text-sm text-gray-400">
          ✈️ Travel Planner — plan smarter, travel better
        </p>
      </div>
    </div>
  );
}
