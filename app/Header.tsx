"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav 
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        aria-label="Main Navigation"
      >
        
        {/* Logo Section */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-all"
        >
          <Image 
            src="/journalentrieshublogo.png" 
            alt="Journal Entries Hub Logo" 
            width={150} 
            height={50} 
            style={{ width: 'auto', height: 'auto' }} 
            priority 
          />
        </Link>

        {/* Navigation & Action Links */}
        <div className="flex items-center gap-3 md:gap-6 text-sm font-semibold">
          
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link href="/" className={pathname === '/' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600 transition-colors'}>Home</Link>
            <Link href="/glossary" className={pathname === '/glossary' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600 transition-colors'}>Glossary</Link>
            <Link href="/news" className={pathname === '/news' ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600 transition-colors'}>News</Link>
          </div>

          {/* DONATION BUTTON (Buy Me a Coffee) */}
          <a 
            href="https://buymeacoffee.com/qusaiahmad" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#FFDD00] text-black px-4 py-2 rounded-full hover:bg-[#ffea5c] transition-all shadow-sm active:scale-95"
          >
            <span className="text-base">☕</span>
            <span className="hidden lg:inline text-[11px] font-black uppercase tracking-tighter">Support</span>
          </a>

          {/* SUBSCRIBE BUTTON */}
          <Link 
            href="/#subscribe" 
            className="hidden sm:block px-4 py-2 border-2 border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-300 active:scale-95 text-[11px] font-black uppercase tracking-tighter"
          >
            Join Hub
          </Link>
          
          <Link 
            href="/about" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-md text-[11px] font-black uppercase tracking-tighter"
          >
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}