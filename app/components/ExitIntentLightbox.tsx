"use client";

import { useState, useEffect } from "react";

export default function ExitIntentLightbox() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const hasSubscribed = localStorage.getItem("jeh_exit_intent_seen");

    if (hasSubscribed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger only if mouse leaves through the top of the viewport (common exit behavior)
      if (e.clientY <= 0) {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 10);
        // Clean up listener so it only fires once per session
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("jeh_exit_intent_seen", "true");
    setTimeout(() => setShouldRender(false), 500);
  };

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
        setTimeout(closePopup, 3000); // Close automatically after success
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center px-4 transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closePopup}></div>

      <div className={`relative bg-white rounded-[40px] shadow-2xl max-w-lg w-full overflow-hidden transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
        
        <button onClick={closePopup} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-8 shadow-xl shadow-emerald-50">
            📬
          </div>

          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight italic">Wait! Don&apos;t go empty-handed.</h3>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Join 1,000+ finance pros. Get my weekly <strong>Technical Accounting Guide</strong> and automation tips delivered to your inbox.
          </p>

          {status === "success" ? (
            <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl font-bold text-sm animate-bounce">
              You&apos;re on the list! Check your inbox. 🎉
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your professional email" 
                className="w-full p-5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 outline-none focus:border-emerald-500 transition-all text-sm font-medium" 
              />
              <button 
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-100 uppercase text-[10px] tracking-widest disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Get Free Guides"}
              </button>
            </form>
          )}

          <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}