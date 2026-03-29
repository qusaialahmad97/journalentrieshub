"use client";

import { Suspense } from "react"; // 1. We imported Suspense
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import entriesData from "../../data/entries.json"; 

interface JournalRow {
  account: string;
  type: string;
  dr: number;
  cr: number;
}

interface Entry {
  slug: string;
  category: string;
  title: string;
  description: string;
  explanation: string; 
  entries: JournalRow[]; 
}

const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  
  const terms = query.trim().split(/\s+/).filter(Boolean).map(escapeRegExp);
  const regex = new RegExp(`(\\b(?:${terms.join('|')}))`, "gi");
  
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = terms.some(term => part.toLowerCase() === term.toLowerCase());
        return isMatch ? (
          <mark key={i} className="bg-emerald-100 text-emerald-900 px-1 rounded-sm shadow-sm">
            {part}
          </mark>
        ) : (
          part
        );
      })}
    </>
  );
}

// 2. We renamed the main logic to "SearchContent"
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";

  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results = (entriesData as Entry[]).filter((entry) => {
    if (searchTerms.length === 0) return false;

    const searchableContent = [
      entry.title,
      entry.category,
      entry.description,
      entry.explanation,
      ...(entry.entries || []).map(row => row.account)
    ].join(" ").toLowerCase();

    return searchTerms.every(term => {
      const regex = new RegExp(`\\b${escapeRegExp(term)}`, 'i');
      return regex.test(searchableContent);
    });
  });

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 pb-8 border-b border-slate-100">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            Search results for: <span className="text-emerald-600">&quot;{query}&quot;</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Found {results.length} matches in the technical library.
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-10">
            {results.map((entry) => {
              let snippet = entry.description;
              
              const firstTerm = searchTerms[0];
              if (firstTerm) {
                const matchRegex = new RegExp(`\\b${escapeRegExp(firstTerm)}`, 'i');
                const match = entry.explanation.match(matchRegex);
                
                if (match && match.index !== undefined) {
                  const start = Math.max(0, match.index - 50);
                  const end = Math.min(entry.explanation.length, match.index + 90);
                  snippet = "..." + entry.explanation.substring(start, end) + "...";
                }
              }

              return (
                <Link key={entry.slug} href={`/entries/${entry.slug}`} className="group block">
                  <div className="p-10 border border-slate-100 rounded-4xl hover:border-emerald-500 hover:bg-emerald-50/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] block mb-1">
                          {entry.category}
                        </span>
                        <h2 className="text-3xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {entry.title}
                        </h2>
                      </div>
                      <span className="text-slate-200 group-hover:text-emerald-500 transition-colors">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5-5 5M6 7l5 5-5 5" /></svg>
                      </span>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border-l-4 border-emerald-500 italic text-sm text-slate-600 leading-relaxed font-medium">
                      <Highlight text={snippet} query={query} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-40 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-2xl font-medium">No results found for &quot;{query}&quot;.</p>
            <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm leading-relaxed">Try using fewer words or broader terms.</p>
          </div>
        )}
      </div>
    </main>
  );
}

// 3. We create a NEW default export that wraps the SearchContent in <Suspense>
export default function SearchPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          {/* A professional loading spinner */}
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold tracking-widest uppercase text-xs">Loading Hub Data...</p>
        </div>
      </main>
    }>
      <SearchContent />
    </Suspense>
  );
}