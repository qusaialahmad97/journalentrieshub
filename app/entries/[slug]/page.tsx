import { notFound } from "next/navigation";
import Link from "next/link";
import entries from "../../../data/entries.json";
import Comments from "../../components/Comments";
import UtilityPrompt from "../../components/UtilityPrompt";
import { Metadata } from "next";

export const dynamic = 'force-static';
export const dynamicParams = false;

interface PractitionerNotes {
  erp_application?: string;
  audit_triggers?: string;
  required_documentation?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

// 1. UPDATED INTERFACE: Supports BOTH old and new formats simultaneously
interface JournalEntry {
  slug: string;
  title: string;
  description: string;
  generated_related_html?: string; // <-- Added this field for the Python-generated HTML
  
  // Legacy fields (Old Format)
  category?: string;
  explanation?: string;
  entries?: { account: string; type: string; dr: number; cr: number }[];
  
  // V2 fields (New Format)
  core_accounting?: {
    category: string;
    entities?: string[];
    entries: { account: string; type: string; dr: number; cr: number }[];
  };
  content_sections?: {
    detailed_explanation: string;
    step_by_step_guide?: string[];
    financial_impact?: string;
  };
  practitioner_notes?: PractitionerNotes;
  faqs?: FAQ[];
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = (entries as unknown as JournalEntry[]).find((e) => e.slug === resolvedParams.slug);

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
  const allEntries = entries as unknown as JournalEntry[];
  return allEntries.map((entry) => ({
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
  const allEntries = entries as unknown as JournalEntry[];
  const entry = allEntries.find((e) => e.slug === slug);

  if (!entry) return notFound();

  // 2. DATA HELPERS: Safely extract data whether it's an old or new entry
  const displayCategory = entry.core_accounting?.category || entry.category || 'Uncategorized';
  const displayEntries = entry.core_accounting?.entries || entry.entries || [];
  const displayExplanation = entry.content_sections?.detailed_explanation || entry.explanation || '';
  const displayEntities = entry.core_accounting?.entities || [];

  const relatedEntries = allEntries
    .filter((e) => {
      const eCategory = e.core_accounting?.category || e.category;
      return eCategory === displayCategory && e.slug !== slug;
    })
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
      "jobTitle": "Accounts Payable Supervisor & CPA Candidate",
      "url": "https://www.linkedin.com/in/qusaialahmad",
      "worksFor": {
        "@type": "Organization",
        "name": "alfanar"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Al-Zaytoonah University of Jordan"
      }
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
            <Link href={`/categories/${encodeURIComponent(displayCategory)}`} className="text-emerald-600 hover:text-emerald-700 transition-colors">
              {displayCategory}
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
                {displayCategory}
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">{entry.title}</h1>
              <p className="text-slate-300 text-lg leading-relaxed">{entry.description}</p>
              
              {displayEntities.length > 0 && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {displayEntities.map((ent, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wide bg-slate-700/50 border border-slate-600 text-slate-300 px-3 py-1.5 rounded-full">
                      {ent}
                    </span>
                  ))}
                </div>
              )}
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
                    {displayEntries.map((line, idx) => {
                      const isCredit = line.type.toLowerCase().includes('(-)') || line.type.toLowerCase() === 'cr' || line.cr > 0;
                      
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

              {/* NEW STYLED CONTENT SECTIONS */}
              <div className="mt-10 space-y-8">
                
                {/* Detailed Explanation / Accountant's Note */}
                {displayExplanation && (
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm">
                    <h3 className="text-blue-900 font-bold flex items-center gap-2 mb-3 text-lg">
                      💡 {entry.content_sections?.detailed_explanation ? "Detailed Explanation" : "Accountant's Note"}
                    </h3>
                    <p className="text-blue-800 leading-relaxed">
                      {displayExplanation}
                    </p>
                  </div>
                )}

                {/* Step by Step Guide */}
                {entry.content_sections?.step_by_step_guide && (
                  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4 flex items-center gap-3">
                      📋 Step-by-Step Guide
                    </h3>
                    <ol className="space-y-6">
                      {entry.content_sections.step_by_step_guide.map((step, idx) => (
                        <li key={idx} className="flex gap-4 group">
                          <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            {idx + 1}
                          </span>
                          <span className="pt-1 text-slate-700 leading-relaxed font-medium">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Financial Impact */}
                {entry.content_sections?.financial_impact && (
                  <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm">
                    <h3 className="text-purple-900 font-bold flex items-center gap-2 mb-3 text-lg">
                      📈 Financial Impact
                    </h3>
                    <p className="text-purple-800 leading-relaxed">
                      {entry.content_sections.financial_impact}
                    </p>
                  </div>
                )}
              </div>

              {/* Practitioner Notes */}
              {entry.practitioner_notes && (
                <div className="mt-12 mb-6">
                  <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4 mb-6">
                    Practitioner & Systems Framework
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {entry.practitioner_notes.erp_application && (
                      <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col h-full hover:border-emerald-200 transition-colors">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                          💻 ERP Architecture
                        </h4>
                        <p className="text-slate-700 text-sm leading-relaxed flex-grow">
                          {entry.practitioner_notes.erp_application}
                        </p>
                      </div>
                    )}

                    {entry.practitioner_notes.audit_triggers && (
                      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl flex flex-col h-full hover:border-rose-200 transition-colors">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-3 flex items-center gap-2">
                          ⚠️ Audit Flags
                        </h4>
                        <p className="text-rose-900 text-sm leading-relaxed flex-grow">
                          {entry.practitioner_notes.audit_triggers}
                        </p>
                      </div>
                    )}

                    {entry.practitioner_notes.required_documentation && (
                      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl md:col-span-2 hover:border-emerald-200 transition-colors">
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

              {/* FAQs Section */}
              {entry.faqs && entry.faqs.length > 0 && (
                <div className="mt-12 mb-6 bg-slate-50 p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    ❓ Frequently Asked Questions
                  </h3>
                  <div className="space-y-6">
                    {entry.faqs.map((faq, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <h4 className="font-bold text-slate-900 mb-3 text-lg">{faq.question}</h4>
                        <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <UtilityPrompt 
                  entryTitle={entry.title} 
                  slug={entry.slug} 
                />
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden border-2 border-emerald-500 relative flex items-center justify-center shrink-0 shadow-inner">
                  <span className="text-slate-400 font-bold text-xl uppercase">QA</span>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-lg font-bold text-slate-900">Expert Analysis by Qusai Ahmad</h4>
                  <p className="text-sm text-slate-600 mb-2">Accounts Payable Supervisor & CPA Candidate</p>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    Specialized in SAP GUI automation and Middle Eastern tax compliance. 
                    Building digital tools for the next generation of finance leaders.
                  </p>
                </div>
                <a href="https://linkedin.com/in/qusaialahmad" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-emerald-600 border-2 border-emerald-200 bg-white px-6 py-3 rounded-full hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm">
                  Connect on LinkedIn
                </a>
              </div>

              {entry.generated_related_html ? (
                <div className="mt-12 pt-10 border-t border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Related Journal Entries</h3>
                  <div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    dangerouslySetInnerHTML={{ __html: entry.generated_related_html }}
                  />
                </div>
              ) : (
                relatedEntries.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Related Journal Entries</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {relatedEntries.map((rel) => {
                        const relCategory = rel.core_accounting?.category || rel.category || 'Uncategorized';
                        return (
                          <Link key={rel.slug} href={`/entries/${rel.slug}`} className="block p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group bg-white">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase mb-2 tracking-wider">{relCategory}</p>
                            <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                              {rel.title}
                            </h4>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )
              )}

              <div className="mt-12 pt-8 border-t border-slate-100">
                <Comments slug={entry.slug} />
              </div>

            </div>
          </article>
        </div>
      </main>
    </>
  );
}