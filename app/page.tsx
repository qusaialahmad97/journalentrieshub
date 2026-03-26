"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import entries from "../data/entries.json";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const totalEntriesCount = entries.length;

  // SEO Strategy: Define your "Power Pillars" (Main focus)
  const primaryPillars = ["Tax", "IFRS", "Advanced"];
  
  // Extract all other industries for the secondary grid
  const allCategories = Array.from(new Set(entries.map((item) => item.category)));
  const secondaryIndustries = allCategories.filter(cat => !primaryPillars.includes(cat) && cat !== "General");

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dropdownResults = entries
    .filter((entry) =>
      entry.title.toLowerCase().includes(query.toLowerCase()) ||
      entry.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. HERO & GOOGLE-STYLE SEARCH */}
      <section className="relative py-28 px-4 bg-[#f8fafc] border-b border-slate-200 overflow-visible">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {totalEntriesCount} Expert-Verified Entries
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Find Any <span className="text-emerald-600">Journal Entry</span> Instantly.
          </h1>
          <p className="text-slate-500 text-lg mb-12 font-medium max-w-xl mx-auto leading-relaxed">
            The definitive professional library for IFRS standards, Middle Eastern tax compliance, and industry-specific accounting logic.
          </p>

          {/* FLOATING SEARCH BAR */}
          <div className="relative max-w-2xl mx-auto" ref={searchRef}>
            <div className={`relative z-50 flex items-center bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] border transition-all duration-300 ${
              showDropdown && query ? 'rounded-t-[24px] border-slate-200' : 'rounded-full border-transparent'
            }`}>
              <div className="pl-6 text-slate-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by keyword (e.g. 'VAT', 'Prepaid', 'IFRS 16')..."
                className="w-full p-6 pl-4 rounded-full outline-none text-lg font-medium text-black bg-transparent placeholder:text-slate-300"
                value={query}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* FLOATING DROPDOWN */}
            {showDropdown && query && (
              <div className="absolute top-full left-0 w-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-b-[24px] border-x border-b border-slate-200 z-[100] overflow-hidden">
                {dropdownResults.length > 0 ? (
                  <div className="py-2">
                    {dropdownResults.map((entry) => (
                      <Link
                        key={entry.slug}
                        href={`/entries/${entry.slug}`}
                        className="flex items-center px-8 py-5 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group"
                      >
                        <div className="flex-1 text-left">
                          <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{entry.category}</span>
                          <span className="block text-slate-900 font-bold text-lg group-hover:text-emerald-700 transition-colors">{entry.title}</span>
                        </div>
                        <div className="text-slate-200 group-hover:text-emerald-500 transition-colors">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-400 font-medium italic">No entries found for &quot;{query}&quot;</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. THE PRIMARY PILLARS (The Big Focus) */}
      <section id="categories" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Professional Pillars</h2>
            <p className="text-slate-500 font-medium text-lg">Deep technical hubs curated for complex reporting roles.</p>
          </div>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {/* TAX PILLAR */}
          <Link href="/categories/Tax" className="group relative bg-white border border-slate-200 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-200 mb-10 transform group-hover:rotate-6 transition-transform">T</div>
            <h3 className="text-2xl font-black mb-4">Tax & VAT</h3>
            <p className="text-slate-500 leading-relaxed mb-10 text-sm">Jordanian VAT compliance, Withholding Tax, and regional Zakat entries.</p>
            <div className="flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View Tax Library <span>→</span>
            </div>
          </Link>

          {/* IFRS PILLAR */}
          <Link href="/categories/IFRS" className="group relative bg-slate-900 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)]">
            <div className="w-16 h-16 bg-white text-slate-900 rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl mb-10 transform group-hover:rotate-6 transition-transform">I</div>
            <h3 className="text-2xl font-black mb-4 text-white">IFRS Hub</h3>
            <p className="text-slate-400 leading-relaxed mb-10 text-sm">IFRS 16 Leases, IFRS 15 Revenue, and complex consolidation logic.</p>
            <div className="flex items-center text-emerald-400 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View IFRS Hub <span>→</span>
            </div>
          </Link>

          {/* ADVANCED PILLAR */}
          <Link href="/categories/Advanced" className="group relative bg-white border border-slate-200 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-200 mb-10 transform group-hover:rotate-6 transition-transform text-blue-100">A</div>
            <h3 className="text-2xl font-black mb-4">Advanced</h3>
            <p className="text-slate-500 leading-relaxed mb-10 text-sm">Equity methods, Bond amortizations, and intercompany reconciliations.</p>
            <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View Advanced <span>→</span>
            </div>
          </Link>
        </div>

        {/* 3. SECONDARY INDUSTRY GRID */}
        <div className="pt-20 border-t border-slate-100">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">Browse Specialized Industries</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {secondaryIndustries.map((industry) => (
              <Link 
                key={industry}
                href={`/categories/${encodeURIComponent(industry)}`}
                className="group p-8 bg-white border border-slate-100 rounded-[32px] text-center transition-all hover:border-emerald-500 hover:shadow-xl hover:bg-emerald-50/30"
              >
                <span className="block text-slate-800 font-bold group-hover:text-emerald-700 transition-colors">
                  {industry}
                </span>
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 block opacity-60">
                  Sector Hub
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUBSCRIPTION / LEAD MAGNET */}
      <section className="py-24 px-4 bg-[#0f172a] relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 border border-emerald-500/20">
            Verified Expertise by Qusai Ahmad
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Master Your <span className="text-emerald-500">Career.</span></h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Join 1,000+ professionals receiving deep-dive IFRS guides and Jordanian tax updates.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Professional email address" 
              className="flex-1 p-5 rounded-[20px] bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition-all placeholder:text-slate-500" 
            />
            <button className="bg-emerald-600 text-white font-black px-10 py-5 rounded-[20px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40 uppercase text-[10px] tracking-widest">
              Join for Free
            </button>
          </form>
          <p className="mt-8 text-slate-500 text-[10px] uppercase font-bold tracking-widest opacity-50">
            No Spam. Just high-quality technical accounting.
          </p>
        </div>
      </section>
    </main>
  );
}