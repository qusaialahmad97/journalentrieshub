"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // New Subscription State
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleMenu = () => setIsOpen(!isOpen);

  // Subscription Handler
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
        setTimeout(() => setStatus("idle"), 3000); 
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm antialiased">
      <nav 
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 z-[60]">
          <Image 
            src="/journalentrieshublogo.png" 
            alt="Journal Entries Hub Logo" 
            width={140} 
            height={45} 
            className="w-auto h-auto"
            priority 
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/" className={pathname === '/' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>Home</Link>
          <Link href="/glossary" className={pathname === '/glossary' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>Glossary</Link>
          <Link href="/about" className={pathname === '/about' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>About</Link>
          <Link href="/founder" className={pathname === '/founder' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>Founder</Link>
          <Link href="/contact" className={pathname === '/contact' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>Contact</Link>
        </div>

        {/* Action Buttons & Desktop Subscription */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* Compact Desktop Subscription Form */}
          <form onSubmit={handleSubscribe} className="hidden xl:flex relative items-center mr-2">
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Join newsletter..." 
              className="w-48 py-2 pl-4 pr-16 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-emerald-500 transition-all placeholder:text-slate-400"
              disabled={status === "loading" || status === "success"}
            />
            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className={`absolute right-1 top-1 bottom-1 px-3 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                status === "success" 
                  ? "bg-emerald-100 text-emerald-700" 
                  : status === "error"
                  ? "bg-rose-100 text-rose-700"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
              }`}
            >
              {status === "idle" && "Join"}
              {status === "loading" && "..."}
              {status === "success" && "✓"}
              {status === "error" && "Err"}
            </button>
          </form>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={toggleMenu}
          className="md:hidden p-2 text-slate-600 z-[60]"
          aria-label="Toggle Menu"
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-slate-900 rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>

        {/* MOBILE MENU OVERLAY */}
        <div className={`fixed inset-0 bg-white z-[50] flex flex-col p-8 transition-transform duration-500 ease-in-out md:hidden overflow-y-auto ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mt-20 flex flex-col gap-6 text-xl font-bold">
            <Link onClick={toggleMenu} href="/" className={pathname === '/' ? 'text-emerald-600' : 'text-slate-900'}>Home</Link>
            <Link onClick={toggleMenu} href="/glossary" className={pathname === '/glossary' ? 'text-emerald-600' : 'text-slate-900'}>Glossary</Link>
            <Link onClick={toggleMenu} href="/about" className={pathname === '/about' ? 'text-emerald-600' : 'text-slate-900'}>About</Link>
            <Link onClick={toggleMenu} href="/founder" className={pathname === '/founder' ? 'text-emerald-600' : 'text-slate-900'}>Founder</Link>
            <Link onClick={toggleMenu} href="/contact" className={pathname === '/contact' ? 'text-emerald-600' : 'text-slate-900'}>Contact</Link>
            
            <hr className="border-slate-100 my-2" />

            {/* Mobile Subscription Form */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
              <h4 className="text-sm text-slate-900 font-bold mb-3">Get Weekly Technical Guides</h4>
              <form onSubmit={handleSubscribe} className="relative flex items-center">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  className="w-full py-3 pl-4 pr-20 rounded-xl bg-white border border-slate-200 text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all"
                  disabled={status === "loading" || status === "success"}
                />
                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                    status === "success" 
                      ? "bg-emerald-100 text-emerald-700" 
                      : status === "error"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  {status === "idle" && "Join"}
                  {status === "loading" && "..."}
                  {status === "success" && "Done"}
                  {status === "error" && "Error"}
                </button>
              </form>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
}