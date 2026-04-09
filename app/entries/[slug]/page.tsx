import { notFound } from "next/navigation";
import Link from "next/link";
import entries from "../../../data/entries.json";
import Comments from "../../components/Comments";
import { Metadata } from "next";

// 1. UPDATED INTERFACE: Added the Practitioner Notes structure
interface PractitionerNotes {
  erp_application?: string;
  audit_triggers?: string;
  required_documentation?: string;
}

interface JournalEntry {
  slug: string;
  title: string;
  category: string;
  description: string;
  explanation: string;
  entries: { account: string; type: string; dr: number; cr: number }[];
  practitioner_notes?: PractitionerNotes; // Added this line
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = (entries as JournalEntry[]).find((e) => e.slug === resolvedParams.slug);

  if (!entry) return { title: "Entry Not Found" };

  const baseUrl = "https://www.journalentrieshub.com";

  return {
    title: `${entry.title} | Journal Entries Hub`,
    description: entry.description,
    alternates: {
      canonical: `${baseUrl}/entries/${resolvedParams.slug}`,
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      type: "article",
      url: `${baseUrl}/entries/${resolvedParams.slug}`,
      images: [
        {
          url: `${baseUrl}/entries/${resolvedParams.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export default async function EntryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const allEntries = entries as JournalEntry[];
  const entry = allEntries.find((e) => e.slug === slug);

  if (!entry) return notFound();

  const relatedEntries = allEntries
    .filter((e) => e.category === entry.category && e.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": entry.title,
    "description": entry.description,
    "image": `https://www.journalentrieshub.com/entries/${slug}/opengraph-image`,
    "author": {
      "@type": "Person",
      "name": "Qusai Ahmad",
      "jobTitle": "General Accountant Supervisor",
      "url": "https://www.linkedin.com/in/qusaialahmad"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Journal Entries Hub",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.journalentrieshub.com/journalentrieshublogo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.journalentrieshub.com/entries/${slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-black">
        <div className="max-w-4xl mx-auto">
          
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest mb-6" aria-label="Breadcrumb">
            <Link href="/" className="text-slate-400 hover:text-emerald-600 transition-colors">Hub</Link>
            <span className="text-slate-300">/</span>
            <Link href={`/categories/${encodeURIComponent(entry.category)}`} className="text-emerald-600 hover:text-emerald-700 transition-colors">
              {entry.category}
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-500 truncate max-w-[150px] md:max-w-none">{entry.title}</span>
          </nav>

          <div className="flex justify-end items-center mb-6">
            <div className="flex gap-2">
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.journalentrieshub.com/entries/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs bg-[#0077b5] text-white px-3 py-2 rounded-lg font-bold hover:bg-[#005582] transition-colors shadow-sm"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>

          <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            
            <header className="p-8 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800">
              <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-500/30">
                {entry.category}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{entry.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed">{entry.description}</p>
            </header>

            <div className="p-8">
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 uppercase text-xs font-bold tracking-wider">
                      <th className="px-6 py-4">Account Name</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4 text-right">Debit ($)</th>
                      <th className="px-6 py-4 text-right">Credit ($)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {entry.entries.map((line, idx) => {
                      const isCredit = line.type.toLowerCase() === 'cr' || line.cr > 0;
                      
                      return (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className={`px-6 py-4 font-semibold text-slate-800 ${isCredit ? 'pl-12' : ''}`}>
                            {line.account}
                          </td>
                          <td className="px-6 py-4 text-slate-500 italic text-sm">{line.type}</td>
                          <td className="px-6 py-4 text-right text-emerald-600 font-bold">
                            {line.dr > 0 ? line.dr.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}
                          </td>
                          <td className="px-6 py-4 text-right text-rose-600 font-bold">
                            {line.cr > 0 ? line.cr.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-2">
                  💡 Accountant&apos;s Note
                </h3>
                <p className="text-blue-800 leading-relaxed italic">{entry.explanation}</p>
              </div>

              {/* 2. NEW: PRACTITIONER & COMPLIANCE NOTES */}
              {entry.practitioner_notes && (
                <div className="mt-10 mb-6">
                  <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">
                    Practitioner & Systems Framework
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* ERP Application Info */}
                    {entry.practitioner_notes.erp_application && (
                      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col h-full">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                          💻 ERP Architecture
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed flex-grow">
                          {entry.practitioner_notes.erp_application}
                        </p>
                      </div>
                    )}

                    {/* Audit Triggers */}
                    {entry.practitioner_notes.audit_triggers && (
                      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col h-full">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
                          ⚠️ Audit Flags
                        </h4>
                        <p className="text-rose-900 text-sm leading-relaxed flex-grow">
                          {entry.practitioner_notes.audit_triggers}
                        </p>
                      </div>
                    )}

                    {/* Required Documentation (Spans full width at bottom) */}
                    {entry.practitioner_notes.required_documentation && (
                      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl md:col-span-2">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                          📄 Required Documentation
                        </h4>
                        <p className="text-emerald-900 text-sm leading-relaxed">
                          {entry.practitioner_notes.required_documentation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Lead Magnet Section */}
              <div className="mt-12 p-1 bg-gradient-to-br from-emerald-400 to-blue-600 rounded-2xl shadow-lg">
                <div className="bg-white rounded-[14px] p-8 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Professional Excel Template</h2>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Get the automated version of this entry. Includes built-in IFRS checks, 
                    VAT calculators, and SAP-ready upload formats.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button disabled className="w-full sm:w-auto bg-slate-100 text-slate-400 cursor-not-allowed px-10 py-4 rounded-full font-bold border border-slate-200">
                      Download .xlsx (Coming Soon)
                    </button>
                    <Link href="/about" className="w-full sm:w-auto bg-emerald-600 text-white px-10 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-md">
                      Notify Me on Release
                    </Link>
                  </div>
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-emerald-500 relative flex items-center justify-center shrink-0">
                  <span className="text-slate-400 font-bold text-xl uppercase">QA</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-lg font-bold text-slate-900">Expert Analysis by Qusai Ahmad</h4>
                  <p className="text-sm text-slate-600 mb-2">General Accountant Supervisor & IFRS Specialist</p>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Specialized in SAP GUI automation and Middle Eastern tax compliance. 
                    Building digital tools for the next generation of finance leaders.
                  </p>
                </div>
                <a href="https://linkedin.com/in/qusaialahmad" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 border border-emerald-200 px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors">
                  LinkedIn Profile
                </a>
              </div>

              {/* Related Entries */}
              {relatedEntries.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Related Journal Entries</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedEntries.map((rel) => (
                      <Link key={rel.slug} href={`/entries/${rel.slug}`} className="block p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group bg-white">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1">{rel.category}</p>
                        <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-slate-100">
                <Comments />
              </div>

            </div>
          </article>
        </div>
      </main>
    </>
  );
}