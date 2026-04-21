"use client";

import Link from "next/link";

export default function SuiteLandingPage() {
  const GUMROAD_LINK = "https://qusaialahmad.gumroad.com/l/jeh-accounting-suite";

  const features = [
    {
      title: "Native VBA Engine",
      desc: "Fully automated data entry via custom UserForms. Standardize your ledger and eliminate manual input errors.",
      icon: "⚡"
    },
    {
      title: "Smart PDF Vouchers",
      desc: "Generate professional, white-labeled Journal Vouchers featuring your Tax ID and digital signature instantly.",
      icon: "📄"
    },
    {
      title: "Live Dashboard",
      desc: "Real-time visual tracking of Revenue vs. Expenses with high-fidelity charts and 'Top 5' expense leaks.",
      icon: "📊"
    },
    {
      title: "Period Locking",
      desc: "Integrated System Lock Date logic to secure finalized months and prevent accidental data tampering.",
      icon: "🔒"
    },
    {
      title: "Financial Ratios",
      desc: "Live tracking of critical KPIs including ROE, Debt-to-Equity, Profit Margin, and Current Ratios.",
      icon: "📈"
    },
    {
      title: "Full-Cycle Reporting",
      desc: "Automated Trial Balance, Balance Sheet, and Income Statements generated directly from your ledger.",
      icon: "🛡️"
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* 1. STICKY NAV CTA */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="hidden md:block">
            <span className="font-black text-lg text-slate-900 uppercase tracking-tighter">
              JEH <span className="text-emerald-600">Accounting Suite</span>
            </span>
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xl font-black text-slate-900">$49 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] ml-1">Lifetime</span></span>
            <a href={GUMROAD_LINK} target="_blank" className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200">
              Get Access
            </a>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="py-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest mb-8">
          VBA-Powered Professional ERP • v1.0
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
          Professional ERP Power. <br/>
          <span className="text-emerald-600 text-4xl md:text-6xl">Owned by You. Hosted in Excel.</span>
        </h1>
        <p className="text-slate-500 text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed">
          Stop "renting" your financial data from cloud subscriptions. The <strong>JEH Accounting Suite</strong> provides a local, secure, and fully automated double-entry engine.
        </p>
        
        <div className="relative rounded-[48px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[12px] border-white max-w-6xl mx-auto bg-slate-100 aspect-video mb-20">
          <img 
            src="/dashboard.png" 
            alt="JEH Accounting Suite Dashboard - Professional Financial Management" 
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 3. TECHNICAL ARCHITECTURE (TRUTHFUL SEO) */}
      <section className="py-24 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter italic">Engineered for Technical Integrity</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              This isn't a basic template; it's a <strong>VBA-coded accounting engine</strong>. Built on a standardized <strong>Double-Entry</strong> core, the Suite ensures your <strong>General Ledger</strong>, <strong>Trial Balance</strong>, and <strong>Financial Statements</strong> remain in perfect sync with zero manual reconciliation required.
            </p>
            <div className="space-y-4">
               <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-emerald-500">
                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Automated Aging Reports</h4>
                  <p className="text-xs text-slate-500">Real-time AR/AP tracking to monitor customer payments and vendor obligations without manual filtering.</p>
               </div>
               <div className="p-5 bg-slate-50 rounded-2xl border-l-4 border-emerald-500">
                  <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Internal Control & Security</h4>
                  <p className="text-xs text-slate-500">Includes system-wide Lock Dates and Void functionality to maintain a clean, tamper-proof audit trail.</p>
               </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
               <span className="block text-2xl font-black text-emerald-600 italic">VBA</span>
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Macro Engine</span>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
               <span className="block text-2xl font-black text-emerald-600">7</span>
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Core Modules</span>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
               <span className="block text-2xl font-black text-emerald-600">VAT</span>
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Compliant Logic</span>
            </div>
            <div className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm text-center">
               <span className="block text-2xl font-black text-emerald-600">100%</span>
               <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Local Privacy</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 7 CORE MODULES TOUR */}
      <section className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-black mb-4">A Complete Financial Ecosystem</h2>
          <p className="text-slate-500 font-medium">Seven integrated modules designed for audit-ready bookkeeping.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { t: "Command Center", d: "Real-time dashboard with Profit Margins, ROE, and Top 5 Expense doughbut charts." },
            { t: "Balance Sheet", d: "Automated Statement of Financial Position with dynamic Retained Earnings calculation." },
            { t: "Income Statement", d: "Precise Profit & Loss tracking for any period, categorized for tax and business analysis." },
            { t: "Trial Balance", d: "Instantly verifiable list of every account balance to ensure ledger integrity." },
            { t: "Smart COA", d: "Flexible Chart of Accounts that automatically maps codes to all financial reports." },
            { t: "Transactions Ledger", d: "Centralized, audit-ready record featuring receipts hyperlinks and color-coding." },
            { t: "Individual Ledgers", d: "Deep-dive Statements of Account for any specific Customer, Vendor, or Bank." },
            { t: "PDF Voucher Engine", d: "Custom branded journal vouchers generated directly from the VBA form." },
            { t: "Migration Tool", d: "Built-in module to seamlessly import data from previous versions or external files." }
          ].map((m) => (
            <div key={m.t} className="bg-white p-10 rounded-[32px] border border-slate-200 transition-all hover:border-emerald-500">
              <h3 className="text-lg font-black mb-2 text-slate-900 uppercase tracking-tighter italic">{m.t}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section id="pricing" className="py-24 bg-slate-950 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-white">Own Your Financial Engine.</h2>
          <p className="text-slate-400 mb-16 text-lg">One payment. Lifetime access. Zero subscription fees.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-slate-900 p-10 rounded-[40px] border border-slate-800 flex flex-col h-full">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Standard License</h3>
                <p className="text-slate-500 text-sm italic">Complete DIY ERP Ecosystem.</p>
              </div>
              <div className="text-5xl font-black mb-8 text-white">$49</div>
              <ul className="space-y-4 text-sm text-slate-400 mb-12 flex-grow">
                <li className="flex items-center gap-2">✓ Master JEH Suite (.xlsm)</li>
                <li className="flex items-center gap-2">✓ Sample Data Practice File</li>
                <li className="flex items-center gap-2">✓ 5-Step Roadmap Manual (PDF)</li>
                <li className="flex items-center gap-2">✓ Digital Branding Guide (PDF)</li>
                <li className="flex items-center gap-2">✓ Perpetual Lifetime Updates</li>
              </ul>
              <a href={GUMROAD_LINK} target="_blank" className="w-full py-5 bg-white text-slate-950 text-center rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Buy Standard</a>
            </div>

            <div className="bg-emerald-600 p-10 rounded-[40px] shadow-2xl shadow-emerald-500/20 flex flex-col h-full">
              <div className="mb-8 text-white">
                <h3 className="text-xl font-bold mb-2 text-white">Professional Setup</h3>
                <p className="text-emerald-100 text-sm italic">Implementation & Strategy.</p>
              </div>
              <div className="text-5xl font-black mb-8 text-white">$100</div>
              <ul className="space-y-4 text-sm text-emerald-50 mb-12 flex-grow">
                <li className="flex items-center gap-2">✓ Everything in Standard Package</li>
                <li className="flex items-center gap-2 font-bold text-white">✓ 1-on-1 Zoom Consultation</li>
                <li className="flex items-center gap-2">✓ Custom Chart of Accounts Setup</li>
                <li className="flex items-center gap-2">✓ Opening Balance Migration</li>
                <li className="flex items-center gap-2 font-bold text-white">✓ Priority Developer Access</li>
              </ul>
              <a href={GUMROAD_LINK} target="_blank" className="w-full py-5 bg-slate-950 text-white text-center rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-950 transition-all">Get Pro Setup</a>
            </div>
          </div>
        </div>
      </section>

{/* 8. FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto border-t border-slate-100">
         <h3 className="text-2xl font-black text-center mb-12 uppercase tracking-tighter italic text-slate-900">Technical Frequently Asked Questions</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
               <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-slate-900">Can I export my data for custom analysis?</h4>
               <p className="text-slate-500 text-xs leading-relaxed">
                 Absolutely. While the core financial reports (P&L, Balance Sheet) are locked to ensure 100% mathematical accuracy and system integrity, your raw data in the <strong>Transactions Ledger</strong> is fully accessible. You can easily copy your data or link it to external Excel PowerPivots or BI tools for custom visualization.
               </p>
            </div>
            <div>
               <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-slate-900">Is my data stored in the cloud?</h4>
               <p className="text-slate-500 text-xs leading-relaxed">
                 No. Your data stays 100% local on your hard drive. This system provides total data sovereignty—no third party ever has access to your business financials. This makes it ideal for businesses with strict data privacy requirements.
               </p>
            </div>
            <div>
               <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-slate-900">Can I add my own branding to the reports?</h4>
               <p className="text-slate-500 text-xs leading-relaxed">
                 Yes. The <strong>Smart PDF Voucher</strong> engine is designed to be white-labeled. You can customize the company name, Tax ID, and logo headers so that every voucher you generate professionally represents your brand.
               </p>
            </div>
            <div>
               <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-slate-900">Does it support multi-currency?</h4>
               <p className="text-slate-500 text-xs leading-relaxed">
                 Version 1.0 is designed as a single-currency system to maintain ledger simplicity. However, you can designate your "Base Currency" (e.g., JOD, USD, EUR) during the initial setup in the Chart of Accounts.
               </p>
            </div>
         </div>
      </section>

    </main>
  );
}