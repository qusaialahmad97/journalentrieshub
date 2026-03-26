import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand Section */}
        <div className="space-y-4">
          <h3 className="text-white text-xl font-bold tracking-tight">
            Journal Entries <span className="text-emerald-500">Hub</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-xs text-slate-400">
            The definitive resource for modern accountants. Specialized in IFRS, 
            Jordanian Tax, and financial automation. Expertise by Qusai Ahmad.
          </p>
        </div>

        {/* Quick Links & Legal (Point #11) */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Resources & Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400 transition-colors">Browse All Entries</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">About Me</Link>
            </li>
            {/* POINT #11: The Professional Shield Links */}
            <li>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors italic">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors italic">Terms & Disclaimers</Link>
            </li>
          </ul>
        </div>

        {/* Connect Section */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://linkedin.com/in/qusaialahmad" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-400 transition-colors"
              >
                LinkedIn Profile
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/qusaialahmad97" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-emerald-400 transition-colors"
              >
                GitHub Projects
              </a>
            </li>
            <li>
              <Link href="mailto:qusai@speakaccounting.com" className="hover:text-emerald-400 transition-colors font-bold">
                Consulting Inquiry
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div className="flex flex-col gap-1">
          <p>© {currentYear} Journal Entries Hub. All Rights Reserved.</p>
          <p>Created by Qusai Ahmad, General Accountant (Supervisor).</p>
        </div>
        
        <div className="flex gap-6 items-center">
          <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap</Link>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Status: Optimized
          </span>
        </div>
      </div>
    </footer>
  );
}