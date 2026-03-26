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
        
        {/* Logo Section - SEO Optimized */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-all"
          aria-label="Journal Entries Hub Home"
        >
          <Image 
            src="/journalentrieshublogo.png" 
            alt="Journal Entries Hub - Professional Accounting & IFRS Resource Logo" 
            width={150} 
            height={50} 
            // The Fix: Setting width and height to auto in the style prop 
            // satisfies the Next.js warning while keeping it responsive.
            style={{ width: 'auto', height: 'auto' }} 
            priority 
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          
          <Link 
            href="/" 
            className={`hover:text-emerald-600 transition-colors ${
              pathname === '/' ? 'text-emerald-600 underline decoration-2 underline-offset-8' : 'text-slate-600'
            }`}
            aria-current={pathname === '/' ? 'page' : undefined}
          >
            Home
          </Link>

          {/* GLOSSARY LINK */}
          <Link 
            href="/glossary" 
            className={`hover:text-emerald-600 transition-colors ${
              pathname === '/glossary' ? 'text-emerald-600 underline decoration-2 underline-offset-8' : 'text-slate-600'
            }`}
          >
            Glossary
          </Link>

          {/* NEWS LINK */}
          <Link 
            href="/news" 
            className={`relative hover:text-emerald-600 transition-colors ${
              pathname === '/news' ? 'text-emerald-600 underline decoration-2 underline-offset-8' : 'text-slate-600'
            }`}
          >
            News
            <span className="absolute -top-1 -right-2 h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
          </Link>
          
          <Link 
            href="/about" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-md focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            title="Learn more about the expert behind the hub"
          >
            About Me
          </Link>
        </div>
      </nav>
    </header>
  );
}