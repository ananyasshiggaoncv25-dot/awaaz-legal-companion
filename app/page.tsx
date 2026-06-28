"use client";

import React, { useState, useMemo } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, 
  CheckCircle, Download, RotateCcw, ShieldCheck, Search, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Content Hub (Simplified for Demo - you can expand this)
const CONTENT: any = {
  en: {
    welcome: "Know Your Rights.",
    sub: "A frictionless, anonymous legal assistant for Indian citizens to handle documentation without a lawyer.",
    cases: [
      { id: 1, cat: "Youth", title: "RTI for Exam Papers", rights: ["Right to see evaluated scripts", "30-day response window"], flow: ["File Application", "Pay ₹10 Fee", "Wait 30 Days"] },
      { id: 2, cat: "Adult", title: "Unpaid Salary Recovery", rights: ["Payment of Wages Act 1936", "Conciliation rights"], flow: ["Draft Legal Notice", "Contact Labor Office", "File in Court"] }
    ]
  },
  hi: { welcome: "अपने अधिकार जानें।", sub: "भारतीय नागरिकों के लिए बिना वकील के कानूनी सहायता।", cases: [] }
};

export default function AwaazClean() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  const t = CONTENT[lang] || CONTENT.en;

  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return t.cases.filter((c: any) => c.cat === persona && c.title.toLowerCase().includes(search.toLowerCase()));
  }, [persona, search, lang]);

  return (
    <div className="min-h-screen pb-20">
      {/* NAVBAR: Increased height and padding */}
      <nav className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 px-8">
        <div className="max-w-6xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="block font-black text-2xl tracking-tighter text-slate-900 uppercase">Awaaz</span>
              <span className="block text-[10px] font-bold text-blue-600 tracking-[0.3em] uppercase">Legal Companion</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {["en", "hi"].map(l => (
                  <button key={l} onClick={() => setLang(l)} className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${lang === l ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}>
                    {l.toUpperCase()}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-[10px] font-black tracking-widest">
                <ShieldCheck className="w-4 h-4" /> ANONYMOUS
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-16">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME (Large spacing) */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 text-center">
              <div className="space-y-6">
                <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  {t.welcome} <br />
                  <span className="text-blue-600">Justice is now simple.</span>
                </h1>
                <p className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                  {t.sub}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pt-8">
                {[
                  { id: "Youth", label: "Students", icon: User, color: "blue" },
                  { id: "Adult", label: "Professionals", icon: Briefcase, color: "indigo" },
                  { id: "Senior", label: "Seniors", icon: HeartPulse, color: "emerald" }
                ].map((p) => (
                  <button key={p.id} onClick={() => { setPersona(p.id); setStep(2); }} className="group bg-white border border-slate-200 p-10 rounded-[3rem] shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all text-left space-y-6">
                    <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <p.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight">{p.label}</h3>
                      <p className="text-slate-400 font-bold text-sm mt-2">100+ Legal Cases</p>
                    </div>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-600 transition-colors w-8 h-8" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEARCH (Bigger inputs) */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-4">
                <ChevronLeft className="w-4 h-4" /> Back to Categories
              </button>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">How can we help?</h2>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6" />
                  <input 
                    type="text" placeholder="Search by keyword (e.g. 'salary', 'college', 'pension')..." 
                    className="w-full p-8 pl-16 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl text-xl font-bold focus:border-blue-500 outline-none transition-all"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-4">
                {filteredCases.map((c: any) => (
                  <button key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }} className="p-8 bg-white border border-slate-100 rounded-[2rem] flex justify-between items-center hover:border-blue-600 group transition-all">
                    <h3 className="text-xl font-black text-slate-700 group-hover:text-blue-600">{c.title}</h3>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FLOWCHART (Better grouping) */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <button onClick={() => setStep(2)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <ChevronLeft className="w-4 h-4" /> Change Problem
              </button>
              
              <div className="grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight underline decoration-blue-600 decoration-8 underline-offset-8">Procedural Guide</h2>
                  <div className="space-y-10 pt-4">
                    {selectedCase.flow.map((s: string, i: number) => (
                      <div key={i} className="relative flex items-center gap-8">
                        <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl z-10">
                          {i + 1}
                        </div>
                        <div className="bg-white border border-slate-100 p-6 rounded-[1.5rem] flex-1 shadow-sm font-bold text-lg text-slate-700 leading-relaxed">
                          {s}
                        </div>
                        {i < selectedCase.flow.length - 1 && <div className="absolute left-7 top-14 w-[2px] h-10 bg-slate-200" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[3rem] p-12 text-white space-y-8 shadow-2xl h-fit sticky top-32">
                  <span className="bg-blue-400/30 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Rights Protection</span>
                  <h2 className="text-4xl font-black leading-tight tracking-tight">{selectedCase.title}</h2>
                  <div className="space-y-6">
                    {selectedCase.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <CheckCircle className="w-6 h-6 text-blue-200 shrink-0 mt-1" />
                        <p className="text-xl font-bold leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-6 bg-white text-blue-600 rounded-2xl font-black text-xl hover:bg-blue-50 transition-all shadow-xl">
                    Draft Legal Application
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: FORM & PAPER (Max whitespace) */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="space-y-16">
              <div className="grid lg:grid-cols-5 gap-16 items-start">
                <div className="lg:col-span-2 space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-900">Case Details</h2>
                    <p className="text-slate-500 font-medium">Input your facts to generate the formal draft.</p>
                  </div>
                  <div className="space-y-6">
                    <input className="w-full p-6 bg-white border border-slate-200 rounded-2xl font-bold text-lg focus:border-blue-600 outline-none" placeholder="Your Name (or Anonymous)" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input className="w-full p-6 bg-white border border-slate-200 rounded-2xl font-bold text-lg focus:border-blue-600 outline-none" placeholder="Against (Person/Company)" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                    <textarea rows={6} className="w-full p-6 bg-white border border-slate-200 rounded-2xl font-bold text-lg focus:border-blue-600 outline-none" placeholder="Explain what happened in 3-4 sentences..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                  </div>
                  <button onClick={() => window.print()} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-4 shadow-2xl">
                    <Download /> Print / Save as PDF
                  </button>
                </div>

                <div className="lg:col-span-3">
                   <div className="legal-paper font-serif text-slate-800 text-xl">
                      <p className="font-black text-blue-600 mb-12 tracking-widest text-xs uppercase border-b pb-4">Formal Legal Notice</p>
                      <p className="font-bold">TO: {form.against || "________________"}</p>
                      <p className="font-bold mb-12">SUB: {selectedCase.title.toUpperCase()}</p>
                      <p className="mb-8 font-medium italic">Date: {new Date().toLocaleDateString()}</p>
                      <p>I, {form.name || "Anonymous"}, am filing this formal notice regarding my rights under {selectedCase.rights[0]}.</p>
                      <p className="mt-8 font-bold">FACTS:</p>
                      <p className="leading-relaxed border-l-4 border-slate-100 pl-6 mb-20">{form.facts || "________________________________"}</p>
                      <div className="flex justify-between items-end pt-12">
                        <div className="text-xs text-slate-300 font-sans tracking-widest font-black uppercase">Awaaz Document ID: {selectedCase.id}</div>
                        <p className="font-bold text-right border-t-2 border-slate-900 pt-2 w-48">(SIGNATURE)</p>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}