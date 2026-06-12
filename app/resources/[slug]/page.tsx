import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import { ANIMAL_TYPES } from "@/lib/insurers";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

function renderMarkdown(content: string) {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-bebas text-3xl tracking-wide text-white mt-10 mb-4">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      elements.push(
        <p key={i} className="font-semibold text-white mb-2">
          {line.slice(2, -2)}
        </p>
      );
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-4 text-gray-300 text-sm leading-relaxed">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
          ))}
        </ul>
      );
      continue;
    } else if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\. /, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-1 mb-4 text-gray-300 text-sm leading-relaxed">
          {items.map((item, j) => (
            <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
          ))}
        </ol>
      );
      continue;
    } else if (line.trim() !== "") {
      elements.push(
        <p
          key={i}
          className="text-gray-300 text-sm leading-relaxed mb-4"
          dangerouslySetInnerHTML={{
            __html: line.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>'),
          }}
        />
      );
    }
    i++;
  }

  return elements;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const animalLabel = ANIMAL_TYPES.find((a) => a.id === article.animal)?.label || article.animal;
  const animalIcon = ANIMAL_TYPES.find((a) => a.id === article.animal)?.icon || "🐾";

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <Link
              href="/resources"
              className="flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{animalIcon}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest">{animalLabel}</span>
              <span className="text-gray-700">·</span>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </div>

            <h1 className="font-bebas text-5xl tracking-widest text-white mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-blue-200 text-lg mb-10 leading-relaxed border-l-4 border-brand-red pl-4">
              {article.description}
            </p>

            <div className="prose prose-invert max-w-none">
              {renderMarkdown(article.content)}
            </div>
          </article>

          {/* Sidebar CTA */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 bg-[#0D1B3E] border border-white/10 p-6 space-y-4">
              <div className="text-2xl">{animalIcon}</div>
              <h3 className="font-bebas text-xl tracking-wide text-white">
                Compare {animalLabel} Plans
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Ready to find coverage for your {animalLabel.toLowerCase()}? Compare top-rated plans side-by-side for free.
              </p>
              <Link
                href={`/compare?animal=${article.animal}`}
                className="flex items-center justify-center gap-2 w-full bg-brand-red text-white py-3 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Compare Plans
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/resources"
                className="flex items-center justify-center gap-2 w-full border border-white/20 text-gray-400 py-2.5 text-sm font-semibold uppercase tracking-widest hover:text-white hover:border-white/40 transition-colors"
              >
                More Articles
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
