import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "About Journal Entries Hub | The Global Accounting Library",
  description: "The world's premier technical resource for modern accountants, providing standardized, expert-verified journal entries for the global finance community.",
};

export default function AboutHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Journal Entries Hub",
    "url": "https://www.journalentrieshub.com",
    "logo": "https://www.journalentrieshub.com/journalentrieshublogo.png",
    "founder": {
      "@type": "Person",
      "name": "Qusai Ahmad"
    },
    "description": "The world's premier technical resource for modern accountants, providing standardized, expert-verified journal entries for the global finance community."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
        
        {/* 1. HERO SECTION */}
        <section className="pt-32 pb-20 border-b border-slate-100 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-100">
              Our Global Mission
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
              The World's #1 Library for <br />
              <span className="text-emerald-600">Accounting Professionals.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium tracking-tight max-w-2xl leading-relaxed">
              Journal Entries Hub is the definitive, globally recognized resource for active finance professionals—delivering expert-verified accounting logic, universal IFRS/GAAP standards, and enterprise automation strategies.
            </p>
          </div>
        </section>

        {/* 2. THE PROBLEM & THE SOLUTION */}
        <section className="py-24 px-6 max-w-6xl mx-auto border-b border-slate-100">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">The Global Gap</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  The internet is saturated with basic bookkeeping tutorials, but there is a severe lack of standardized, high-level resources for active practitioners. When accountants worldwide face complex consolidations, cross-border tax treatments, or new IFRS adoptions, they are often left to piece together ambiguous, fragmented guidelines.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">The Universal Standard</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We are building the internet's most comprehensive, searchable library of advanced accounting logic. Every entry, regulatory breakdown, and workflow automation on this platform is designed to be immediately applicable in any high-volume corporate environment, anywhere in the world.
                </p>
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Editorial Compliance</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  Every transaction guide, debit/credit matrix, and workflow automation model on Journal Entries Hub undergoes rigorous internal review against current IFRS and US GAAP frameworks before publication. We maintain strict compliance standards to ensure all data is immediately audit-ready for enterprise environments.
                </p>
              </div>
            </div>

            {/* Visual Data Representation */}
            <div className="bg-slate-900 rounded-[40px] p-10 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
              <h3 className="text-white font-black text-2xl mb-8 relative z-10">The Global Ecosystem</h3>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">1</div>
                  Deep-Dive IFRS & US GAAP Standards
                </li>
                <li className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">2</div>
                  Complex Cross-Border Tax & VAT Logic
                </li>
                <li className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">3</div>
                  Enterprise-Grade Financial Automation
                </li>
                <li className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shrink-0">4</div>
                  Weekly Insights for 1,000+ Global Pros
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. FOUNDER CALL-OUT SECTION */}
        <section className="py-24 px-6 bg-slate-50/50">
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-[40px] p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center gap-10">
            <div className="shrink-0 relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-2xl opacity-20"></div>
              <Image 
                src="/Qusai_Ahmad.jpg" 
                alt="Qusai Ahmad" 
                width={140} 
                height={140} 
                className="relative rounded-full grayscale border-4 border-white shadow-lg object-cover w-[140px] h-[140px]"
              />
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">The Architect</h3>
              <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Built by an Active Practitioner.</h4>
              <p className="text-slate-500 font-medium leading-relaxed mb-6">
                Journal Entries Hub is managed and curated by Qusai Ahmad, an accounting professional dedicated to elevating the technical standards of the global finance community through practical precision and automation.
              </p>
              <Link 
                href="/founder" 
                className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md active:scale-95 group"
              >
                View Qusai&apos;s Profile 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
