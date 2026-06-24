"use client";

import { useState } from "react";
import Link from "next/link";
export const dynamic = 'force-static';

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call for the contact form
    // Replace this with your actual form submission logic (e.g., Formspree, Resend, or your own API)
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-slate-900 selection:bg-emerald-100">
      
      {/* 1. MINIMALIST HERO SECTION */}
      <section className="pt-32 pb-20 border-b border-slate-100 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-100">
            Get in Touch
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Contact the <span className="text-emerald-600">Hub.</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium tracking-tight max-w-2xl leading-relaxed">
            Whether you want to request a specific journal entry, report a technical correction, or discuss a partnership, I am here to help.
          </p>
        </div>
      </section>

      {/* 2. CONTACT LAYOUT */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16">
          
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Direct Channels</h2>
              
              <div className="space-y-6">
                {/* Email Block */}
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:border-emerald-200 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm mb-6">
                    ✉️
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Email Admin</h3>
                  <p className="text-sm text-slate-500 mb-4">For general inquiries, technical corrections, and platform support.</p>
                  <a href="mailto:admin@journalentrieshub.com" className="text-emerald-600 font-bold text-sm hover:text-emerald-700 transition-colors">
                    admin@journalentrieshub.com
                  </a>
                </div>

                {/* LinkedIn Block */}
                <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm mb-6">
                    💼
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Professional Network</h3>
                  <p className="text-sm text-slate-500 mb-4">Connect with Qusai Ahmad directly for platform partnerships.</p>
                  <a href="https://linkedin.com/in/qusaialahmad" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors">
                    View LinkedIn Profile ↗
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Response Time</h2>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                As an active practitioner managing global corporate workflows, please allow up to 48 hours for a response to technical queries.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-slate-200 p-10 md:p-14 rounded-[40px] shadow-2xl shadow-slate-200/50">
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Send a Message</h2>
              <p className="text-slate-500 text-sm mb-8">Fill out the form below and I'll get back to you as soon as possible.</p>

              {status === "success" ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-8 rounded-3xl text-center animate-in fade-in slide-in-from-bottom-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    ✨
                  </div>
                  <h3 className="font-black text-lg mb-2">Message Sent Successfully!</h3>
                  <p className="text-sm">Thank you for reaching out. I'll review your message and reply to the email provided.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Professional Email</label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inquiry Type</label>
                    <select 
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a topic...</option>
                      <option value="Entry Request">Journal Entry Request</option>
                      <option value="Technical Correction">Technical Correction</option>
                      <option value="Partnership">Partnership Proposal</option>
                      <option value="General">General Inquiry</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Message</label>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm font-medium resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 uppercase text-[11px] tracking-[0.2em] disabled:opacity-50 active:scale-95 flex justify-center items-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Sending...
                      </>
                    ) : "Send Message"}
                  </button>
                  
                  {status === "error" && (
                    <p className="text-center text-red-500 text-xs font-bold mt-2">Something went wrong. Please try again later.</p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
