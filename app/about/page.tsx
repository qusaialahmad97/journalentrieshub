import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Qusai Ahmad | Professional Profile",
  description: "Executive profile of Qusai Ahmad, Accounts Payable Supervisor at alfanar. Expert in IFRS reporting and financial automation.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* 1. MINIMALIST HERO SECTION */}
      <section className="pt-32 pb-20 border-b border-slate-100 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-emerald-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
            <Image 
              src="/Qusai_Ahmad.jpg" 
              alt="Qusai Ahmad - Accounts Payable Supervisor" 
              width={180} 
              height={180} 
              className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-slate-200 shadow-2xl"
              priority 
            />
          </div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
            Qusai <span className="text-emerald-600">Ahmad</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium tracking-tight max-w-2xl">
            Accounts Payable Supervisor at alfanar & Founder of Journal Entries Hub. 
            Specializing in IFRS compliance and financial system automation.
          </p>
        </div>
      </section>

      {/* 2. EXECUTIVE SUMMARY & STATS */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Left: Biography */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-emerald-600 mb-6">Executive Summary</h2>
              <div className="prose prose-slate prose-xl text-slate-600 leading-relaxed font-medium">
                <p>
                  As a General Accountant and Accounts Payable Supervisor based in Amman, Jordan, I lead financial operations that demand absolute precision. Currently at alfanar, I manage high-volume workflows where technical accuracy meets operational efficiency.
                </p>
                <p>
                  My career is built on a foundation of IFRS standards and regional tax compliance. I believe that modern accounting is no longer just about recording—it&apos;s about building systems that scale.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">The Initiative</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                I founded Journal Entries Hub to solve a specific problem: the lack of standardized, high-level resources for active practitioners. This platform serves as a technical bridge between academic theory and corporate reality.
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
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-emerald-500 font-bold">02</span>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Technical Expertise</p>
                    <p className="font-bold text-sm">IFRS & Tax</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-emerald-500 font-bold">03</span>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Strategic Focus</p>
                    <p className="font-bold text-sm">Financial Automation & SAP</p>
                  </div>
                </li>
              </ul>

              <a 
                href="https://www.linkedin.com/in/qusaialahmad" 
                target="_blank" 
                className="mt-12 flex items-center justify-center gap-3 w-full bg-white text-slate-900 p-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all duration-500 group"
              >
                LinkedIn Profile
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            
            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] py-4">
              Verified Technical Resource
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOGO WALL / TRUST (Subtle) */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-12">Core Competencies</h3>
          <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 opacity-40 grayscale">
            <span className="text-2xl font-black text-slate-900 tracking-tighter italic underline decoration-emerald-500">IFRS</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter">TAX</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter italic">CMA</span>
            <span className="text-2xl font-black text-slate-900 tracking-tighter underline decoration-emerald-500">SAP</span>
          </div>
        </div>
      </section>
    </main>
  );
}