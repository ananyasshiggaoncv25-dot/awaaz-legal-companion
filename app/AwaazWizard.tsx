"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, Download, RotateCcw, Search, Globe, CheckCircle } from "lucide-react";
import { LANGUAGES, LEGAL_CASES } from "./legalData";

export default function AwaazWizard() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return LEGAL_CASES[persona].filter(c => 
      (c.title[lang] || c.title['en']).toLowerCase().includes(search.toLowerCase())
    );
  }, [persona, search, lang]);

  const handleDownload = () => {
    const text = `AWAAZ LEGAL DRAFT\nSubject: ${selectedCase?.title[lang]}\n\nFacts: ${form.facts}\n\nGenerated Anonymously.`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Awaaz_Legal_Draft.txt";
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* VIBRANT NAVBAR */}
      <nav className="h-20 bg-white border-b-4 border-orange-500 sticky top-0 z-50 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl"><Gavel className="text-white" /></div>
          <span className="font-black text-2xl tracking-tighter text-blue-900 uppercase">Awaaz</span>
        </div>
        <select 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
          className="bg-slate-100 p-2 rounded-lg font-bold text-sm outline-none border-2 border-transparent focus:border-blue-600"
        >
          {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.name}</option>)}
        </select>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PERSONA */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-6xl font-black text-blue-950 leading-tight">Your Rights. <span className="text-orange-500 underline">Simplified.</span></h1>
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Completely anonymous. Choose your category to begin.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { id: "Youth", label: "Students", icon: User, color: "bg-orange-500" },
                  { id: "Adult", label: "Professionals", icon: Briefcase, color: "bg-blue-600" },
                  { id: "Senior", label: "Seniors", icon: HeartPulse, color: "bg-emerald-600" }
                ].map(p => (
                  <button key={p.id} onClick={() => { setPersona(p.id); setStep(2); }} className="p-12 bg-white rounded-[3rem] shadow-xl hover:scale-105 transition-all flex flex-col items-center gap-6 border-2 border-transparent hover:border-blue-500">
                    <div className={`${p.color} p-6 rounded-3xl text-white`}><p.icon size={48} /></div>
                    <h3 className="text-2xl font-black">{p.label}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEARCH CASES */}
          {step === 2 && (
            <motion.div key="s2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-bold"><ChevronLeft /> Back</button>
              <h2 className="text-4xl font-black">Search 100+ Legal Cases</h2>
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" placeholder="Search (e.g. salary, exam, pension)..." 
                  className="w-full p-8 pl-16 rounded-[2rem] shadow-xl border-none text-xl font-bold focus:ring-4 focus:ring-blue-100"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4">
                {filteredCases.map(c => (
                  <button key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }} className="p-6 bg-white rounded-2xl flex justify-between items-center hover:bg-blue-50 transition-all font-bold text-xl">
                    {c.title[lang] || c.title['en']} <ChevronRight />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FLOWCHART & RIGHTS */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-10">
                <h2 className="text-3xl font-black border-b-8 border-orange-500 w-fit">Procedure Flow</h2>
                <div className="space-y-12 relative pt-6">
                  {selectedCase.flowchart.map((f: string, i: number) => (
                    <div key={i} className="flex items-center gap-6 relative">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-black z-10 shadow-lg">{i+1}</div>
                      <div className="bg-white p-5 rounded-xl shadow-sm flex-1 font-bold text-lg">{f}</div>
                      {i < selectedCase.flowchart.length - 1 && <div className="absolute left-6 top-12 w-0.5 h-12 bg-slate-200" />}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 rounded-[3rem] p-12 text-white space-y-10 shadow-2xl h-fit">
                <h2 className="text-4xl font-black leading-tight">{selectedCase.title[lang] || selectedCase.title['en']}</h2>
                <div className="space-y-6">
                  {selectedCase.rights.map((r: string, i: number) => (
                    <div key={i} className="flex gap-4"><CheckCircle className="text-emerald-400 shrink-0" /> <p className="text-xl font-bold">{r}</p></div>
                  ))}
                </div>
                <button onClick={() => setStep(4)} className="w-full py-6 bg-orange-500 text-white rounded-2xl font-black text-xl hover:bg-orange-400 transition-all">Draft Document</button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DRAFTING */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-black">Generate Letter</h2>
                <input className="w-full p-6 bg-white rounded-2xl font-bold border-2 border-slate-100" placeholder="Recipient Name" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                <textarea rows={6} className="w-full p-6 bg-white rounded-2xl font-bold border-2 border-slate-100" placeholder="Facts of the case..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                <button onClick={handleDownload} className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xl flex justify-center items-center gap-3"><Download /> Download Draft</button>
              </div>
              <div className="bg-white p-12 shadow-2xl border-l-[12px] border-orange-500 font-serif text-xl leading-relaxed">
                <p className="font-bold">TO: {form.against || "________"}</p>
                <p className="font-bold mt-6 underline uppercase">SUB: {selectedCase.title[lang]}</p>
                <p className="mt-10">I, Anonymous Participant, am filing this regarding my rights under the {selectedCase.rights[0]}.</p>
                <p className="mt-6 font-bold">FACTS:</p>
                <p className="italic">{form.facts || "________"}</p>
                <p className="mt-20 font-bold text-right">(SIGNATURE)</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}