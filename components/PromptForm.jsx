"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, ArrowRight } from "lucide-react";

export default function PromptForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Something went wrong");
      }

      const data = await response.json();
      if (data && data.plan && data.plan.slug) {
        router.push(`/plan/${data.plan.slug}`);
      } else {
        throw new Error("Failed to get plan slug from response.");
      }
    } catch (error) {
      if (error.message.includes("leaked")) {
        setError(
          "Your API key was reported as leaked. Please use another API key",
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 flex items-start p-3 transition-all focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500">
          <div className="p-4 pt-5">
            <Bot className="w-7 h-7 text-emerald-600" />
          </div>
          <textarea
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg text-slate-900 placeholder:text-slate-400 py-4 px-3 resize-none h-[140px] leading-relaxed"
            placeholder="e.g. A romantic 4-day trip to Paris in Spring, focusing on art museums and hidden cafes..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            required
          />
          <div className="p-2 pt-3">
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-slate-900 text-white p-3.5 rounded-xl hover:bg-emerald-600 transition-all duration-300 shadow-md focus-within:bg-emerald-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ArrowRight className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    </div>
  );
}
