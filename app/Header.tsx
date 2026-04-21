"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
          <Link href="/suite" className={pathname === '/suite' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>ERP Suite</Link>
          <Link href="/glossary" className={pathname === '/glossary' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>Glossary</Link>
          <Link href="/news" className={pathname === '/news' ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600 font-medium transition-colors'}>News</Link>
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* 1. Buy Me a Coffee (The Original Support) */}
          <a href="https://buymeacoffee.com/qusaiahmad" target="_blank" className="flex items-center gap-2 bg-[#FFDD00] text-black px-4 py-2 rounded-full font-bold text-[9px] uppercase tracking-wider transition-transform hover:scale-105 active:scale-95">
            <span>☕</span> Support
          </a>

          {/* 2. ERP Suite (The Product) */}
          <Link href="/suite" className="bg-slate-900 text-white px-5 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-md">
            ⚡ Get ERP Suite
          </Link>

          {/* 3. About (The Architect) */}
          <Link href="/about" className="bg-slate-50 text-slate-600 px-4 py-2.5 rounded-full font-bold text-[9px] uppercase tracking-wider hover:bg-slate-100 transition-all">
            About
          </Link>
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
        <div className={`fixed inset-0 bg-white z-[50] flex flex-col p-8 transition-transform duration-500 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="mt-20 flex flex-col gap-6 text-xl font-bold">
            <Link onClick={toggleMenu} href="/" className={pathname === '/' ? 'text-emerald-600' : 'text-slate-900'}>Home</Link>
            <Link onClick={toggleMenu} href="/suite" className={pathname === '/suite' ? 'text-emerald-600' : 'text-slate-900'}>JEH ERP Suite</Link>
            <Link onClick={toggleMenu} href="/glossary" className={pathname === '/glossary' ? 'text-emerald-600' : 'text-slate-900'}>Glossary</Link>
            <Link onClick={toggleMenu} href="/news" className={pathname === '/news' ? 'text-emerald-600' : 'text-slate-900'}>News</Link>
            <Link onClick={toggleMenu} href="/about" className={pathname === '/about' ? 'text-emerald-600' : 'text-slate-900'}>About Me</Link>
            
            <hr className="border-slate-100" />
            
            <Link onClick={toggleMenu} href="/suite" className="w-full text-center bg-slate-900 text-white py-4 rounded-2xl text-lg flex items-center justify-center gap-2">
              ⚡ Get Accounting Suite
            </Link>
            
            <a href="https://buymeacoffee.com/qusaiahmad" className="w-full text-center bg-[#FFDD00] text-black py-4 rounded-2xl text-lg flex items-center justify-center gap-2">
              ☕ Support the Project
            </a>
          </div>
        </div>

      </nav>
    </header>
  );
}