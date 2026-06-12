import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { ANIMAL_TYPES } from "@/lib/insurers";

const animalIcons: Record<string, string> = {
  dog: "🐕",
  cat: "🐈",
  bird: "🦜",
  exotic: "✨",
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      {/* Hero */}
      <div className="bg-[#1E3A8A] border-b border-white/10 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-bebas text-6xl tracking-widest text-white mb-4">
            PET INSURANCE <span className="text-brand-red">RESOURCES</span>
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Everything you need to know about pet insurance — from deductibles to exotic pet coverage.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group bg-[#0D1B3E] border border-white/10 p-6 hover:border-brand-blue/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 bg-black/30 border border-white/10 px-3 py-1">
                  <span>{animalIcons[article.animal] || "🐾"}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">
                    {ANIMAL_TYPES.find((a) => a.id === article.animal)?.label || article.animal}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </div>
              </div>
              <h2 className="font-bebas text-2xl tracking-wide text-white mb-2 group-hover:text-brand-blue transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{article.description}</p>
              <div className="flex items-center gap-1.5 text-brand-blue text-sm font-semibold">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
