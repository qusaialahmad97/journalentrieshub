import newsData from "../../data/news.json";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white py-20 px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        
        {/* News Header */}
        <header className="mb-20 text-center">
          <div className="inline-block px-3 py-1 rounded-md bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-4 border border-emerald-100">
            Real-Time Updates
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
            The Accounting <span className="text-emerald-600">Wire</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            Professional briefs on IFRS shifts, tax regulations, and global accounting trends.
          </p>
        </header>

        {/* News Feed */}
        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-0">
          {newsData.map((item) => (
            <article 
              key={item.id} 
              className="relative mb-16 pl-10 group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-2.25 top-1.5 h-4 w-4 rounded-full border-4 border-white bg-slate-200 group-hover:bg-emerald-500 transition-colors"></div>
              
              <div className="flex flex-col gap-2">
                <time className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {item.date} — {item.category}
                </time>
                
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors leading-tight">
                  {item.title}
                </h2>
                
                <p className="text-slate-600 mt-2 leading-relaxed text-base font-medium">
                  {item.excerpt}
                </p>

                {/* Trending Badge (Optional) */}
                {item.trending && (
                  <div className="mt-4 inline-flex items-center gap-1.5 text-emerald-600 font-black text-[9px] uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Trending Topic
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Status */}
        <div className="mt-20 pt-10 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            End of Wire — Updates Posted Weekly
          </p>
        </div>
      </div>
    </main>
  );
}