import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Qusai Ahmad | Founder & Accounting Professional",
  description: "Executive profile of Qusai Ahmad, Accounts Payable Supervisor at alfanar. Expert in IFRS reporting, regional tax, and financial automation.",
};

export default function FounderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Qusai Ahmad",
    "jobTitle": "Accounts Payable Supervisor & CMA Candidate",
    "worksFor": {
      "@type": "Organization",
      "name": "alfanar"
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Al-Zaytoonah University of Jordan"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Amman",
      "addressCountry": "JO"
    },
    "url": "https://www.journalentrieshub.com/founder",
    "sameAs": [
      "https://www.linkedin.com/in/qusaialahmad"
    ],
    "knowsAbout": [
      "Accounting",
      "IFRS",
      "US GAAP",
      "Financial Automation",
      "Accounts Payable",
      "SAP ERP",
      "Python",
      "VBA"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
        
        {/* 1. MINIMALIST HERO SECTION */}
        <section className="pt-32 pb-20 border-b border-slate-100 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
              <Image 
                src="/Qusai_Ahmad.jpg" 
                alt="Qusai Ahmad" 
                width={180} 
                height={180} 
                className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-slate-200 shadow-2xl object-cover"
                priority 
              />
            </div>
            <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
              Qusai <span className="text-emerald-600">Ahmad</span>
            </h1>
            <p className="text-2xl text-slate-600 font-bold tracking-tight max-w-2xl mb-6">
              The Accountant & The Founder of Journal Entries Hub.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Amman, Jordan
            </div>
          </div>
        </section>

        {/* 2. EXECUTIVE SUMMARY & STATS */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            
            {/* Left: Biography */}
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Executive Summary</h2>
                <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed font-medium">
                  <p>
                    As an Accounts Payable Supervisor and General Accountant based in Amman, I lead financial operations that demand absolute precision. Currently at alfanar, I manage high-volume corporate workflows where technical accuracy meets operational efficiency.
                  </p>
                  <p>
                    My career is built on a solid foundation of IFRS standards and regional tax compliance, and I am actively advancing my global expertise as a Certified Public Accountant (CPA) candidate. However, I believe that modern accounting is no longer just about recording historical data—it is about building resilient systems that scale. 
                  </p>
                  <p>
                    By integrating technical frameworks with automation logic, I focus on optimizing SAP GUI workflows, batch processing, and complex reconciliations to eliminate repetitive tasks and surface critical financial insights faster.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">The Philosophy</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  I founded Journal Entries Hub to elevate the technical standards of the global accounting community. By creating a bridge between academic accounting theory and rigorous corporate reality, I aim to provide professionals with the exact tools and logic required to excel in modern finance departments.
                </p>
              </div>
            </div>

            {/* Right: Credential Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                
                <h3 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-10">Professional Credentials</h3>
                
                <ul className="space-y-8">
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-500 font-bold">01</span>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Current Office</p>
                      <p className="font-bold text-sm">alfanar, Amman 🇯🇴</p>
                      <p className="text-xs text-slate-400 mt-1">Accounts Payable Supervisor</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-500 font-bold">02</span>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Education</p>
                      <p className="font-bold text-sm">B.S. Accounting (English)</p>
                      <p className="text-xs text-slate-400 mt-1">Al-Zaytoonah University of Jordan</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-500 font-bold">03</span>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Technical Expertise</p>
                      <p className="font-bold text-sm">IFRS, Tax Compliance & CPA Candidate</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-emerald-500 font-bold">04</span>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Strategic Focus</p>
                      <p className="font-bold text-sm">SAP ERP & Process Automation</p>
                      <p className="text-xs text-slate-400 mt-1">Python, VBA & VBScript</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <a 
                  href="https://www.linkedin.com/in/qusaialahmad" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all duration-300 group shadow-lg"
                >
                  Connect on LinkedIn
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
                
                <a 
                  href="mailto:admin@journalentrieshub.com" 
                  className="flex items-center justify-center gap-3 w-full bg-white border-2 border-slate-100 text-slate-900 p-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. LOGO WALL / TRUST (Subtle) */}
        <section className="py-20 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12">Core Competencies</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-50 grayscale">
              <span className="text-2xl font-black text-slate-900 tracking-tighter italic underline decoration-emerald-500">IFRS</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">TAX</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter underline decoration-emerald-500">SAP ERP</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter">PYTHON</span>
              <span className="text-2xl font-black text-slate-900 tracking-tighter italic">VBA</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
