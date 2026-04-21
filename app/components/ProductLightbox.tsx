"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductLightbox() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Check storage
    const hasSeenPopup = localStorage.getItem("jeh_suite_popup_seen");
    
    // 2. Logic: Show if never seen OR if we are in development mode to test
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (!hasSeenPopup || isDevelopment) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        // Small delay to allow the 'scale-95' transition to trigger
        setTimeout(() => setIsVisible(true), 100);
      }, 3000); // Reduced to 3 seconds for faster testing

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Mark as seen for production
    localStorage.setItem("jeh_suite_popup_seen", "true");
    // Delay unmounting to allow fade-out animation
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" 
        onClick={closePopup}
      ></div>

      {/* Content Box */}
      <div className={`relative bg-white rounded-[40px] shadow-2xl max-w-2xl w-full overflow-hidden transition-all duration-500 ease-out ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 z-20 p-2 bg-slate-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Branding/Hook */}
          <div className="md:w-5/12 bg-emerald-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             
             <div className="relative z-10">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-3xl font-black leading-tight mb-4 uppercase tracking-tighter italic">
                   Stop <br/> Renting <br/> Data.
                </h3>
                <p className="text-emerald-100 text-xs font-bold uppercase tracking-widest leading-relaxed">
                   Professional <br/> VBA ERP Suite <br/> v1.0
                </p>
             </div>
          </div>

          {/* Right Side: Details & CTA */}
          <div className="md:w-7/12 p-10 flex flex-col justify-center bg-white">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-2 block">Founders Launch Offer</span>
            <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">JEH Accounting Suite</h4>
            
            <ul className="space-y-3 mb-8">
              {[
                "No Subscription Fees", 
                "Automated PDF Vouchers", 
                "Live Financial Ratios"
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-[11px] font-bold text-slate-600 uppercase tracking-tight">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <Link 
              href="/suite" 
              onClick={closePopup}
              className="block w-full text-center bg-slate-950 text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              Get The Suite — $49
            </Link>
            
            <button 
              onClick={closePopup} 
              className="mt-4 w-full text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
            >
              No thanks, I&apos;ll keep browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}