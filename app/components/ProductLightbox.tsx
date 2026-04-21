"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductLightbox() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Check if user has already seen/closed it in this session
    const hasSeenPopup = localStorage.getItem("jeh_suite_popup_seen");
    
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShouldRender(true);
        setIsVisible(true);
      }, 7000); // 7 second delay

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    // Mark as seen so it doesn't show up again for 7 days
    localStorage.setItem("jeh_suite_popup_seen", "true");
    setTimeout(() => setShouldRender(false), 500); // Wait for animation to finish
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closePopup}></div>

      {/* Content Box */}
      <div className={`relative bg-white rounded-[40px] shadow-2xl max-w-2xl w-full overflow-hidden transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 z-10 p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Visual Side */}
          <div className="md:w-1/2 bg-emerald-600 p-12 text-white flex flex-col justify-center">
             <div className="text-4xl mb-4">⚡</div>
             <h3 className="text-3xl font-black leading-tight mb-4 uppercase italic tracking-tighter">
                Stop <br/> Renting <br/> Your Data.
             </h3>
             <p className="text-emerald-100 text-sm font-medium">Own the professional VBA Accounting engine for Excel.</p>
          </div>

          {/* Copy Side */}
          <div className="md:w-1/2 p-10 flex flex-col justify-center">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Exclusive Offer</span>
            <h4 className="text-xl font-bold text-slate-900 mb-4">JEH Accounting Suite</h4>
            <ul className="space-y-3 mb-8">
              {["No Monthly Fees", "Automated PDF Vouchers", "Live Financial Ratios"].map(item => (
                <li key={item} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  {item}
                </li>
              ))}
            </ul>

            <Link 
              href="/suite" 
              onClick={closePopup}
              className="block w-full text-center bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200"
            >
              Learn More — $49
            </Link>
            
            <button onClick={closePopup} className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 transition-colors">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}