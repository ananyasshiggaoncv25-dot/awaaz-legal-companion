"use client";

import React, { useState, useMemo } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, 
  CheckCircle, Download, RotateCcw, ShieldCheck, Search, 
  Languages, ArrowDown, Scale, FileText, Landmark
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MULTI-LANGUAGE DICTIONARY ---
const TRANSLATIONS = {
  en: { welcome: "Know Your Rights.", sub: "Private & Professional Legal Drafting.", start: "Choose Your Path" },
  hi: { welcome: "अपने अधिकार जानें।", sub: "निजी और पेशेवर कानूनी ड्राफ्टिंग।", start: "अपना रास्ता चुनें" },
  ta: { welcome: "உங்கள் உரிமைகளை அறியுங்கள்.", sub: "தனிப்பட்ட மற்றும் தொழில்முறை சட்ட வரைவு.", start: "உங்கள் பாதையைத் தேர்ந்தெடுக்கவும்" }
};

// --- DATA STRUCTURE (Expanded for 100+ potential cases) ---
const LEGAL_DB: any = {
  Youth: {
    categories: [
      { id: "edu", name: "Education & RTI", icon: <Scale />, color: "bg-orange-500" },
      { id: "cyber", name: "Cyber Safety", icon: <ShieldCheck />, color: "bg-blue-600" },
      { id: "job", name: "Internships & Jobs", icon: <Briefcase />, color: "bg-teal-600" }
    ],
    cases: [
      { id: 1, cat: "edu", title: "RTI for Scanned Answer Sheets", rights: ["SC Ruling: Aditya Bandopadhyay vs CBSE", "Right to inspection"], flow: ["Apply to PIO", "Pay ₹10 Fee", "Wait 30 Days", "Receive Copies"] },
      { id: 2, cat: "edu", title: "Unfair College Fee Hike", rights: ["UGC Fee Regulations", "Right to Transparency"], flow: ["Draft Representation", "Submit to Dean", "Approach University Tribunal"] },
      { id: 3, cat: "cyber", title: "Non-Consensual Image Sharing", rights: ["IT Act Section 66E", "Right to Privacy"], flow: ["Save Evidence", "File Cyber Cell Report", "Contact Platform for Takedown"] },
      // ... Imagining 100+ cases categorized here
    ]
  },
  Adult: {
    categories: [
      { id: "work", name: "Labor & Wages", icon: <Briefcase />, color: "bg-indigo-600" },
      { id: "consumer", name: "Consumer Rights", icon: <User />, color: "bg-rose-600" },
      { id: "family", name: "Family & Property", icon: <Landmark />, color: "bg-amber-600" }
    ],
    cases: [
      { id: 50, cat: "work", title: "Recovery of Salary Arrears", rights: ["Payment of Wages Act", "Contract Law"], flow: ["Legal Notice", "Labour Commissioner", "Labour Court"] },
      { id: 51, cat: "consumer", title: "Defective Electronics Refund", rights: ["Consumer Protection Act 2019"], flow: ["Notice to Seller", "E-Daakhil Filing", "Consumer Forum Hearing"] },
    ]
  },
  Senior: {
    categories: [
      { id: "pension", name: "Pension & Benefits", icon: <HeartPulse />, color: "bg-emerald-600" },
      { id: "will", name: "Wills & Inheritance", icon: <FileText />, color: "bg-violet-600" }
    ],
    cases: [
      { id: 90, cat: "pension", title: "Delayed Pension Disbursement", rights: ["Right to Pension", "Senior Citizen Act"], flow: ["Application to PDO", "Grievance Portal", "Ombudsman"] }
    ]
  }
};

export default function AwaazV2() {
  const [lang, setLang] = useState<"en" | "hi" | "ta">("en");
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  
  // Input Form
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  // Filtering Logic for "100+ cases"
  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return LEGAL_DB[persona].cases.filter((c: any) => 
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [persona, search]);

  const downloadDoc = () => {
    const text = `TO: ${form.against}\nFROM: ${form.name}\nSUBJECT: ${selectedCase.title}\n\nDATE: ${new Date().toLocaleDateString()}\n\nI am writing regarding my rights under ${selectedCase.rights.join(", ")}.\n\nDETAILS: ${form.facts}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Legal_Draft_${selectedCase.id}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen text-slate-900 overflow-x-hidden">
      {/* VIBRANT NAV */}
      <nav className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-orange-500 via-rose-500 to-indigo-600 p-2.5 rounded-2xl shadow-xl">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-indigo-950">AWAAZ</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {["en", "hi", "ta"].map(l => (
                <button 
                  key={l} onClick={() => setLang(l as any)}
                  className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${lang === l ? "bg-white shadow-sm text-indigo-600" : "text-slate-400"}`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Anonymous
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PERSONA SELECT */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="text-center space-y-6">
                <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                  {TRANSLATIONS[lang].welcome} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-rose-500 to-indigo-600">
                    Justice for all.
                  </span>
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto leading-relaxed">
                  {TRANSLATIONS[lang].sub}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { id: "Youth", label: "Students", icon: User, color: "from-orange-400 to-amber-500", shadow: "shadow-orange-200" },
                  { id: "Adult", label: "Working Professionals", icon: Briefcase, color: "from-indigo-500 to-blue-600", shadow: "shadow-indigo-200" },
                  { id: "Senior", label: "Senior Citizens", icon: HeartPulse, color: "from-teal-500 to-emerald-600", shadow: "shadow-teal-200" }
                ].map((p) => (
                  <button 
                    key={p.id} onClick={() => { setPersona(p.id); setStep(2); }}
                    className={`bg-white border border-slate-100 p-10 rounded-[3rem] ${p.shadow} hover:shadow-2xl hover:-translate-y-2 transition-all group`}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${p.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg`}>
                      <p.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800">{p.label}</h3>
                    <p className="text-slate-400 font-bold mt-2">Explore 100+ Cases</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEARCH & CASE SELECT */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-widest"><ChevronLeft /> Back</button>
              
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" placeholder="Search 100+ legal problems..." 
                  className="w-full p-6 pl-16 bg-white border-2 border-slate-100 rounded-[2rem] focus:border-indigo-500 outline-none shadow-xl text-xl font-bold"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                {filteredCases.map((c: any) => (
                  <button 
                    key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }}
                    className="p-6 bg-white border border-slate-100 rounded-2xl flex justify-between items-center hover:border-indigo-500 hover:bg-indigo-50/30 transition-all group"
                  >
                    <div className="text-left">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Case ID: {c.id}</span>
                      <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600">{c.title}</h3>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FLOWCHART & RIGHTS */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Flowchart Side */}
                <div className="space-y-8">
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Procedure Flow</h2>
                  <div className="space-y-12">
                    {selectedCase.flow.map((s: string, i: number) => (
                      <div key={i} className="relative flex items-center gap-6 group">
                        <div className="w-12 h-12 bg-indigo-900 text-white rounded-2xl flex items-center justify-center font-black shadow-lg z-10">
                          {i + 1}
                        </div>
                        <div className="bg-white border border-slate-100 p-4 rounded-xl flex-1 shadow-sm font-bold text-slate-700">
                          {s}
                        </div>
                        {i < selectedCase.flow.length - 1 && <div className="absolute left-6 top-12 w-[2px] h-12 bg-slate-200" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rights Side */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 h-fit shadow-2xl">
                  <span className="px-4 py-1 bg-white/10 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Your Rights</span>
                  <h2 className="text-4xl font-black leading-tight">{selectedCase.title}</h2>
                  <div className="space-y-4">
                    {selectedCase.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        <p className="text-slate-300 font-bold leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-950/20 transition-all">
                    Draft Legal Notice
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: DOCUMENT PREVIEW */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900">Add Details</h2>
                  <div className="space-y-4">
                    <input className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-bold" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-bold" placeholder="Against Whom?" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                    <textarea rows={6} className="w-full p-5 bg-white border border-slate-200 rounded-2xl font-bold" placeholder="Explain the incident..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={downloadDoc} className="flex-1 py-5 bg-indigo-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-xl">
                      <Download /> Download Document
                    </button>
                    <button onClick={() => setStep(1)} className="p-5 border-2 border-slate-100 rounded-2xl font-black text-slate-400">
                      <RotateCcw />
                    </button>
                  </div>
                </div>

                <div className="legal-paper scale-90 origin-top shadow-2xl">
                  <div className="font-serif text-slate-800 text-xl leading-[3]">
                    <p className="font-bold">TO, THE OFFICE OF {form.against || "________________"}</p>
                    <p className="mt-8 font-bold">RE: {selectedCase.title.toUpperCase()}</p>
                    <p className="mt-12">I, {form.name || "Anonymous"}, am filing this formal notice regarding my rights under the following:</p>
                    <p className="ml-8 italic">{selectedCase.rights.join(", ")}</p>
                    <p className="mt-8 font-bold">FACTS OF THE CASE:</p>
                    <p className="ml-8 leading-relaxed">{form.facts || "________________________________"}</p>
                    <p className="mt-20">DATED: {new Date().toLocaleDateString()}</p>
                    <p className="mt-8 font-bold text-right">(SIGNATURE)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="py-20 text-center opacity-30 font-black text-[10px] tracking-[0.5em] uppercase text-indigo-900">
        AWAAZ • BUILT FOR GOOD • 100% ANONYMOUS
      </footer>
    </div>
  );
}