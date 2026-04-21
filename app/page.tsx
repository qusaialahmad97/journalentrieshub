"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import entriesData from "../data/entries.json";

// 1. Define the interfaces
interface JournalRow {
  account: string;
}

interface Entry {
  title: string;
  slug: string;
  category: string;
  explanation: string;
  description: string;
  entries: JournalRow[];
}

const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// SEO slug generator
const generateCategorySlug = (categoryName: string) => {
  return categoryName
    .toLowerCase()
    .replace(/ & /g, '-and-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const totalEntriesCount = entriesData.length;

  const primaryPillars = ["Tax", "IFRS", "Advanced"];
  
  // Count entries per category
  const categoryCounts = (entriesData as Entry[]).reduce((acc, entry) => {
    if (entry.category) {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  // Convert the tally into an array
  const secondaryIndustries = Object.entries(categoryCounts)
    .filter(([catName]) => !primaryPillars.includes(catName) && catName !== "General")
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  const handleSearchRedirect = () => {
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  // Dropdown Search Logic
  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const allMatches = (entriesData as Entry[]).filter((entry) => {
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

  const dropdownResults = allMatches.slice(0, 8);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      
      {/* 1. HERO */}
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
              showDropdown && query ? 'rounded-t-3xl border-slate-200' : 'rounded-full border-transparent hover:border-emerald-200'
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearchRedirect()} 
              />
              <button 
                onClick={handleSearchRedirect} 
                className="hidden sm:block absolute right-3 top-3 bg-emerald-600 text-white font-black text-xs uppercase tracking-wider px-6 py-4 rounded-full hover:bg-emerald-500 transition shadow-emerald-200"
              >
                Search
              </button>
            </div>

            {/* FLOATING DROPDOWN */}
            {showDropdown && query && (
              <div className="absolute top-full left-0 w-full bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-b-3xl border-x border-b border-slate-200 z-100 overflow-hidden text-left">
                {dropdownResults.length > 0 ? (
                  <div className="py-2">
                    {dropdownResults.map((entry) => (
                      <Link
                        key={entry.slug}
                        href={`/entries/${entry.slug}`}
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-8 py-4 hover:bg-slate-50 transition-all border-b border-slate-50 last:border-0 group"
                      >
                        <div className="flex-1 text-left">
                          <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1 opacity-80">{entry.category}</span>
                          <span className="block text-slate-900 font-bold text-lg group-hover:text-emerald-700 transition-colors">{entry.title}</span>
                          <span className="block text-slate-500 text-xs mt-1 leading-relaxed line-clamp-1">{entry.description}</span>
                        </div>
                        <div className="text-slate-200 group-hover:text-emerald-500 transition-colors ml-4">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                        </div>
                      </Link>
                    ))}
                    
                    {allMatches.length > 0 && (
                      <Link 
                        href={`/search?q=${encodeURIComponent(query)}`} 
                        className="block text-center pt-4 pb-3 font-bold text-sm text-emerald-700 hover:text-emerald-500 group bg-slate-50 border-t border-slate-100"
                      >
                        See all {allMatches.length} matches for "{query}" <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-400 font-medium italic">No entries found for &quot;{query}&quot;</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. THE PRIMARY PILLARS */}
      <section id="categories" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">Professional Pillars</h2>
            <p className="text-slate-500 font-medium text-lg">Deep technical hubs curated for complex reporting roles.</p>
          </div>
          <div className="h-1.5 w-24 bg-emerald-500 rounded-full hidden md:block"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          <Link href={`/categories/${generateCategorySlug("Tax")}`} className="group relative bg-white border border-slate-200 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-emerald-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl shadow-emerald-200 mb-10 transform group-hover:rotate-6 transition-transform">T</div>
            <h3 className="text-2xl font-black mb-4">Tax & VAT</h3>
            <p className="text-slate-500 leading-relaxed mb-10 text-sm">Jordanian VAT compliance, Withholding Tax, and regional Zakat entries.</p>
            <div className="flex items-center text-emerald-600 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View Tax Library <span>→</span>
            </div>
          </Link>

          <Link href={`/categories/${generateCategorySlug("IFRS")}`} className="group relative bg-slate-900 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.3)]">
            <div className="w-16 h-16 bg-white text-slate-900 rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl mb-10 transform group-hover:rotate-6 transition-transform">I</div>
            <h3 className="text-2xl font-black mb-4 text-white">IFRS Hub</h3>
            <p className="text-slate-400 leading-relaxed mb-10 text-sm">IFRS 16 Leases, IFRS 15 Revenue, and complex consolidation logic.</p>
            <div className="flex items-center text-emerald-400 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View IFRS Hub <span>→</span>
            </div>
          </Link>

          <Link href={`/categories/${generateCategorySlug("Advanced")}`} className="group relative bg-white border border-slate-200 p-12 rounded-[48px] transition-all hover:-translate-y-3 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-[20px] flex items-center justify-center font-black text-2xl shadow-xl shadow-blue-200 mb-10 transform group-hover:rotate-6 transition-transform">A</div>
            <h3 className="text-2xl font-black mb-4">Advanced</h3>
            <p className="text-slate-500 leading-relaxed mb-10 text-sm">Equity methods, Bond amortizations, and intercompany reconciliations.</p>
            <div className="flex items-center text-blue-600 font-black text-xs uppercase tracking-widest gap-2 group-hover:gap-4 transition-all">
              View Advanced <span>→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. PRODUCT SHOWCASE: JEH ACCOUNTING SUITE */}
      <section className="py-20 px-6 bg-emerald-50/50 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-emerald-200">
              New: Version 1.0 ERP Suite
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              Professional Accounting. <br/>
              <span className="text-emerald-600">Zero Monthly Fees.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Stop renting your data. The <strong>JEH Accounting Suite</strong> is a professional, VBA-powered ERP engine designed for Excel. Get automated PDF vouchers, live dashboards, and audit-ready reports in one lifetime payment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                "Automated PDF Vouchers",
                "Live Financial Ratios",
                "VBA-Powered UserForms",
                "No Subscriptions Forever"
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-slate-700 font-bold text-sm">
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {feat}
                </div>
              ))}
            </div>

            <a 
              href="https://qusaialahmad.gumroad.com/l/jeh-accounting-suite" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-slate-900 text-white font-black px-10 py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl hover:shadow-emerald-200 uppercase text-xs tracking-[0.2em]"
            >
              Get the Suite — $49 <span>&nbsp;→</span>
            </a>
          </div>

          {/* UPDATED: Visual Box with dashboard.png Background */}
          <div className="flex-1 w-full">
            <div 
              className="relative rounded-[40px] overflow-hidden shadow-2xl border-8 border-white aspect-video group bg-cover bg-center"
              style={{ backgroundImage: "url('/dashboard.png')" }}
            >
              {/* Subtle Dark Overlay that lightens on hover */}
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-all duration-300 flex items-center justify-center">
                <span className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full font-black text-xs uppercase tracking-tighter shadow-2xl transform group-hover:scale-110 transition-transform duration-300 text-slate-900">
                  View Live Dashboard
                </span>
              </div>
            </div>
            <p className="text-center mt-6 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Visual interface of the JEH v1.0 Command Center
            </p>
          </div>
        </div>
      </section>

      {/* 4. SECONDARY INDUSTRY GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12 text-center">Browse Specialized Industries</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {secondaryIndustries.map((industry) => (
            <Link 
              key={industry.name}
              href={`/categories/${generateCategorySlug(industry.name)}`}
              className="group p-8 bg-white border border-slate-100 rounded-4xl text-center transition-all hover:border-emerald-500 hover:shadow-xl hover:bg-emerald-50/30"
            >
              <span className="block text-slate-800 font-bold group-hover:text-emerald-700 transition-colors">
                {industry.name}
              </span>
              
              <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 block opacity-80">
                {industry.count} {industry.count === 1 ? 'Entry' : 'Entries'}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. SUBSCRIPTION / LEAD MAGNET */}
      <section id="subscribe" className="py-24 px-4 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-8 border border-emerald-500/20">
            Verified Expertise by Qusai Ahmad
          </div>
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Master Your <span className="text-emerald-500">Career.</span></h2>
          
          {status === "success" ? (
            <div className="bg-emerald-500/20 text-emerald-400 p-8 rounded-4xl border border-emerald-500/30 animate-in fade-in zoom-in max-w-lg mx-auto">
              <p className="font-bold text-lg text-white mb-2">You&apos;re in! 🎉</p>
              <p className="text-emerald-400">Welcome to the Hub. Check your inbox for your first technical accounting guide.</p>
            </div>
          ) : (
            <>
              <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                Join 1,000+ professionals receiving deep-dive IFRS guides and professional automation tips.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Professional email address" 
                  className="flex-1 p-5 rounded-[20px] bg-slate-800 border border-slate-700 text-white outline-none focus:border-emerald-500 transition-all placeholder:text-slate-500" 
                />
                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-emerald-600 text-white font-black px-10 py-5 rounded-[20px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/40 uppercase text-[10px] tracking-widest disabled:opacity-50"
                >
                  {status === "loading" ? "Joining..." : "Join Free"}
                </button>
              </form>
              {status === "error" && (
                <p className="text-red-400 text-xs mt-4 font-bold uppercase tracking-widest">Something went wrong. Please try again.</p>
              )}
            </>
          )}
          
          <p className="mt-8 text-slate-500 text-[10px] uppercase font-bold tracking-widest opacity-50">
            No Spam. Just high-quality technical accounting.
          </p>
        </div>
      </section>
    </main>
  );
}