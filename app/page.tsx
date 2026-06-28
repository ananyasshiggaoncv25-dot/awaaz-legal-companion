"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, 
  CheckCircle, Download, RotateCcw, ShieldCheck, Search, Globe 
} from "lucide-react";
// Import the content we created above
import { LANG_GROUPS, CONTENT_HUB } from "./content";

export default function AwaazFinal() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  // Get translated UI and cases
  const t = CONTENT_HUB[lang]?.ui || CONTENT_HUB['en'].ui;
  const currentCases = CONTENT_HUB[lang]?.cases || CONTENT_HUB['en'].cases;

  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return currentCases.filter((c: any) => 
      c.cat === persona && c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [persona, search, lang]);

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER: High contrast, clean spacing */}
      <nav className="h-24 bg-white/90 backdrop-blur-md border-b-2 border-slate-50 sticky top-0 z-50 px-8">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-3 rounded-2xl shadow-xl shadow-blue-100">
              <Gavel className="text-white w-7 h-7" />
            </div>
            <span className="font-black text-3xl tracking-tighter text-slate-900 uppercase">Awaaz</span>
          </div>
          <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-5 py-2.5 rounded-full border border-emerald-100">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-black uppercase tracking-widest">100% Anonymous</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-8 py-20">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: LANGUAGE & PERSONA (Vibrant Grid) */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-24">
              <div className="text-center space-y-8">
                <h1 className="text-7xl font-black text-slate-900 leading-none tracking-tight">
                  {t.welcome} <br />
                  <span className="text-blue-600">Voice your rights.</span>
                </h1>
                <p className="text-slate-500 text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                  {t.sub}
                </p>
              </div>

              {/* Language Selector Grid: Clean and not mushed */}
              <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 space-y-10 shadow-inner">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 text-center">{t.selectLang}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                  {LANG_GROUPS.map((group) => (
                    <div key={group.region} className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest">{group.region}</h4>
                      <div className="flex flex-wrap gap-2">
                        {group.langs.map(l => (
                          <button 
                            key={l.code} onClick={() => setLang(l.code)}
                            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${lang === l.code ? "bg-blue-600 text-white border-blue-600 shadow-lg" : "bg-white text-slate-600 border-slate-200 hover:border-blue-400"}`}
                          >
                            {l.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Persona Selection */}
              <div className="grid md:grid-cols-3 gap-10 pt-10">
                {[
                  { id: "Youth", label: "Students", icon: User, color: "orange" },
                  { id: "Adult", label: "Working", icon: Briefcase, color: "blue" },
                  { id: "Senior", label: "Seniors", icon: HeartPulse, color: "emerald" }
                ].map((p) => (
                  <button 
                    key={p.id} onClick={() => { setPersona(p.id); setStep(2); }}
                    className="group bg-white border-2 border-slate-100 p-12 rounded-[3.5rem] hover:border-blue-500 hover:shadow-2xl transition-all text-left space-y-8"
                  >
                    <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <p.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{p.label}</h3>
                    <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {t.start} <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEARCHABLE CASES */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <ChevronLeft className="w-4 h-4" /> {t.back}
              </button>
              
              <div className="space-y-6">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight">Legal Knowledge Base</h2>
                <div className="relative">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 w-7 h-7" />
                  <input 
                    type="text" placeholder={t.searchPlh} 
                    className="w-full p-10 pl-20 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl text-2xl font-bold focus:border-blue-500 outline-none transition-all"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-6 custom-scrollbar">
                {filteredCases.map((c: any) => (
                  <button key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }} className="p-10 bg-white border border-slate-100 rounded-[2.5rem] flex justify-between items-center hover:border-blue-600 group transition-all hover:bg-blue-50">
                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-blue-600">{c.title}</h3>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-600 w-8 h-8" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: PROCEDURAL FLOWCHART */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <h2 className="text-4xl font-black text-slate-900 tracking-tight border-b-8 border-blue-600 w-fit pb-4">Procedure</h2>
                  <div className="space-y-12 relative pt-6">
                    {selectedCase.flow.map((s: string, i: number) => (
                      <div key={i} className="relative flex items-center gap-10">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center font-black text-2xl shadow-2xl z-10">
                          {i + 1}
                        </div>
                        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex-1 shadow-sm font-bold text-xl text-slate-700">
                          {s}
                        </div>
                        {i < selectedCase.flow.length - 1 && <div className="absolute left-8 top-16 w-[3px] h-12 bg-slate-100" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[4rem] p-16 text-white space-y-10 shadow-2xl h-fit sticky top-40">
                  <span className="bg-white/20 px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Case Rights</span>
                  <h2 className="text-5xl font-black leading-tight tracking-tight">{selectedCase.title}</h2>
                  <div className="space-y-6">
                    {selectedCase.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <CheckCircle className="w-7 h-7 text-blue-200 shrink-0 mt-1" />
                        <p className="text-2xl font-bold leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-7 bg-white text-blue-600 rounded-[2rem] font-black text-2xl shadow-xl hover:bg-blue-50 transition-all">
                    {t.draft}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: FINAL DOCUMENT (The Paper) */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-32">
              <div className="grid lg:grid-cols-5 gap-20 items-start">
                <div className="lg:col-span-2 space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Generate Draft</h2>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">Fill in the details to create your formal legal application.</p>
                  </div>
                  <div className="space-y-6">
                    <input className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold text-xl focus:border-blue-600 focus:bg-white outline-none" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold text-xl focus:border-blue-600 focus:bg-white outline-none" placeholder="Opposing Party Name" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                    <textarea rows={6} className="w-full p-8 bg-slate-50 border-2 border-slate-100 rounded-3xl font-bold text-xl focus:border-blue-600 focus:bg-white outline-none" placeholder="Brief facts of your case..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                  </div>
                  <button onClick={() => window.print()} className="w-full py-7 bg-blue-600 text-white rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-2xl">
                    <Download /> {t.download}
                  </button>
                </div>

                <div className="lg:col-span-3">
                   {/* Legal Paper Mockup */}
                   <div className="bg-white p-16 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-l-[16px] border-blue-600 min-h-[1000px] font-serif text-slate-800 text-2xl leading-[2.5]">
                      <p className="font-sans text-[10px] font-black text-blue-600 mb-16 tracking-[0.5em] uppercase border-b pb-6">Formal Grievance Application</p>
                      <p className="font-bold">TO: THE OFFICE OF {form.against || "________________"}</p>
                      <p className="font-bold mb-16">SUBJECT: {selectedCase.title.toUpperCase()}</p>
                      <p className="mb-10 italic text-lg text-slate-400">Dated: {new Date().toLocaleDateString()}</p>
                      <p>I, {form.name || "________________"}, am writing to formally submit a grievance regarding my rights under {selectedCase.rights[0]}.</p>
                      <p className="mt-12 font-bold uppercase underline underline-offset-8 decoration-4 decoration-slate-200">Summary of Facts:</p>
                      <p className="leading-relaxed mt-6 italic text-slate-600">{form.facts || "________________________________"}</p>
                      <div className="mt-32 flex justify-between items-end">
                        <div className="text-[10px] font-sans text-slate-200 uppercase tracking-widest font-black">Generated via Awaaz Project</div>
                        <p className="font-bold text-right border-t-4 border-slate-900 pt-4 w-64">(SIGNATURE)</p>
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