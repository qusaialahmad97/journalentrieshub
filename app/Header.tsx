"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo Section - Back in place! */}
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <Image
            src="/journalentrieshublogo.png" 
            alt="Journal Entries Hub Logo"
            width={160} 
            height={40} 
            className="group-hover:opacity-90 group-hover:scale-[1.01] transition"
            priority 
          />
        </Link>

        {/* Updated Nav Links: Simple and Clean */}
        <div className="flex items-center gap-6 text-sm font-semibold">
          <Link 
            href="/" 
            className={`hover:text-emerald-600 transition-colors ${pathname === '/' ? 'text-emerald-600' : 'text-slate-600'}`}
          >
            Home
          </Link>
          
          <Link 
            href="/about" 
            className="bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 transition shadow-md"
          >
            About Me
          </Link>
        </div>
      </nav>
    </header>
  );
}