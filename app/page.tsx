"use client";

import { useState } from "react";
import Link from "next/link";
import entries from "../data/entries.json";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  const totalEntriesCount = entries.length;
  const categories = ["All", ...new Set(entries.map((item) => item.category))];

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = activeCategory === "All" || entry.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedEntries = filteredEntries.slice(0, visibleCount);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          {/* 4- New placement for the count: A subtle badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {totalEntriesCount} Entries Cataloged
          </div>

          <h1 className="text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find Any <span className="text-emerald-600">Journal Entry</span> Instantly.
          </h1>
          
          <div className="relative max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by keyword (e.g. 'Tax', 'SaaS', 'Loan')..."
              className="w-full p-5 pl-8 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all outline-none text-lg shadow-sm text-black"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisibleCount(6);
              }}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/entries/${entry.slug}`}
              className="group p-6 border border-slate-100 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all bg-white flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-4">
                  {entry.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 mb-2 leading-snug">
                  {entry.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">{entry.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 text-emerald-600 text-xs font-bold flex items-center gap-2">
                View Detailed Entry →
              </div>
            </Link>
          ))}
        </div>

        {visibleCount < filteredEntries.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition shadow-lg"
            >
              Show More Entries
            </button>
          </div>
        )}
      </section>

      {/* Subscription Section */}
      <section className="py-20 px-4 bg-slate-900 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
            Weekly Automation Tips
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Master Accounting <span className="text-emerald-500">Automation</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join 1,000+ accountants receiving weekly Python scripts, SAP GUI automation tips, and advanced IFRS journal entries.
          </p>
          
          <form className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your professional email"
              className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500 transition-all"
              required
            />
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-emerald-900/20">
              Join for Free
            </button>
          </form>
          <p className="mt-6 text-slate-500 text-sm">
            No spam. Only high-value technical accounting content.
          </p>
        </div>
      </section>
    </main>
  );
}