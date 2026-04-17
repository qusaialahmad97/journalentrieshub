"use client"; // We need this for the smooth scroll behavior

import Link from "next/link";
import glossaryData from "../../data/glossary.json";

export default function GlossaryPage() {
  // 1. Sort and Group terms by Letter
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  const groupedGlossary = alphabet.reduce((acc, letter) => {
    const terms = glossaryData
      .filter((item) => item.term.toUpperCase().startsWith(letter))
      .sort((a, b) => a.term.localeCompare(b.term));
    
    if (terms.length > 0) {
      acc[letter] = terms;
    }
    return acc;
  }, {} as Record<string, typeof glossaryData>);

  const activeLetters = Object.keys(groupedGlossary);

  return (
    <main className="min-h-screen bg-slate-50 py-20 px-6 font-sans text-black">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
            Accounting Dictionary
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tighter">
            The <span className="text-emerald-600">Glossary</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Standardizing accounting, audit, and tax definitions for professional excellence.
          </p>
        </header>

        {/* 2. FUNCTIONAL ALPHABET NAVIGATION */}
        <nav className="sticky top-24 z-30 flex flex-wrap justify-center gap-2 mb-16 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm">
          {alphabet.map((letter) => {
            const hasTerms = activeLetters.includes(letter);
            return (
              <a
                key={letter}
                href={hasTerms ? `#letter-${letter}` : undefined}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all ${
                  hasTerms 
                    ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-100" 
                    : "text-slate-300 cursor-not-allowed"
                }`}
              >
                {letter}
              </a>
            );
          })}
        </nav>

        {/* 3. GROUPED GLOSSARY LIST */}
        <div className="space-y-20">
          {activeLetters.map((letter) => (
            <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-emerald-600">{letter}</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <div className="grid gap-6">
                {groupedGlossary[letter].map((item) => (
                  <div 
                    key={item.slug} 
                    className="group bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-emerald-600 transition-colors">
                      {item.term}
                    </h2>
                    <p className="text-slate-600 leading-relaxed font-medium text-base">
                      {item.definition}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Empty State if no terms exist */}
        {activeLetters.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium italic">Your glossary is currently empty. Start adding terms to your JSON file!</p>
          </div>
        )}
      </div>
    </main>
  );
}