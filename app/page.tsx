"use client";

import React, { useState, useMemo } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, 
  CheckCircle, Download, RotateCcw, ShieldCheck, Search, Globe, 
  X, Scale, Info, ArrowRight, Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. THE 22 LANGUAGES CONFIGURATION ---
const ALL_LANGUAGES = [
  { code: "en", name: "English" }, { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "ur", name: "Urdu (اردو)" }, { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "ks", name: "Kashmiri (کأशुर)" }, { code: "sa", name: "Sanskrit (संस्कृतम्)" },
  { code: "sd", name: "Sindhi (سنڌي)" }, { code: "ne", name: "Nepali (नेपाली)" },
  { code: "doi", name: "Dogri (डोगरी)" }, { code: "mai", name: "Maithili (मैथिली)" },
  { code: "sat", name: "Santhali (संताली)" }, { code: "bn", name: "Bengali (বাংলা)" },
  { code: "or", name: "Odia (ଓଡ଼ିଆ)" }, { code: "as", name: "Assamese (অसमীয়া)" },
  { code: "mni", name: "Manipuri (ꯃꯩꯇꯩ)" }, { code: "brx", name: "Bodo (बर')" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" }, { code: "mr", name: "Marathi (मराठी)" },
  { code: "kok", name: "Konkani (कोंकणी)" }, { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" }, { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "ml", name: "Malayalam (മലയാളம்)" }
];

// --- 2. THE MULTI-LANGUAGE LEGAL BRAIN ---
const MASTER_CONTENT: any = {
  en: {
    ui: { welcome: "Voice Your Rights.", sub: "Anonymous legal aid for Indian citizens. No login, 100% private.", start: "Get Started", back: "Go Back", search: "Search 100+ legal cases...", draft: "Draft Now", next: "Continue", download: "Download / Print" },
    cases: [
      { id: 1, cat: "Youth", title: "RTI for Answer Scripts", rights: ["Right to see evaluated scripts (SC Ruling)", "Response within 30 days"], flow: ["Draft RTI Letter", "Pay ₹10 Fee", "Submit to PIO", "Wait 30 Days"] },
      { id: 2, cat: "Adult", title: "Recovery of Unpaid Salary", rights: ["Payment of Wages Act 1936", "Interest on arrears"], flow: ["Send Legal Notice", "Approach Labor Office", "File in Labor Court"] },
      { id: 3, cat: "Senior", title: "Maintenance from Children", rights: ["Senior Citizens Act 2007", "Right to speedy disposal"], flow: ["Application to Tribunal", "Conciliation Officer Meeting", "Order for Maintenance"] }
    ]
  },
  hi: {
    ui: { welcome: "अपने अधिकार बुलंद करें।", sub: "भारतीय नागरिकों के लिए गुमनाम कानूनी सहायता। कोई लॉगिन नहीं, 100% निजी।", start: "शुरू करें", back: "पीछे", search: "100+ कानूनी मामले खोजें...", draft: "अभी ड्राफ्ट करें", next: "आगे बढ़ें", download: "डाउनलोड / प्रिंट" },
    cases: [
      { id: 1, cat: "Youth", title: "परीक्षा उत्तर पुस्तिकाओं के लिए आरटीआई", rights: ["मूल्यांकित कॉपियों को देखने का अधिकार", "30 दिनों के भीतर जवाब"], flow: ["आरटीआई पत्र तैयार करें", "₹10 शुल्क दें", "PIO को जमा करें", "30 दिन प्रतीक्षा करें"] }
    ]
  }
};

export default function AwaazV3() {
  const [lang, setLang] = useState("en");
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  // Get current translation or fallback safely to English
  const t = MASTER_CONTENT[lang]?.ui || MASTER_CONTENT['en'].ui;
  const currentCases = MASTER_CONTENT[lang]?.cases || MASTER_CONTENT['en'].cases;

  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return currentCases.filter((c: any) => 
      c.cat === persona && c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [persona, search, lang, currentCases]);

  const resetAll = () => {
    setStep(1);
    setPersona(null);
    setSearch("");
    setSelectedCase(null);
    setForm({ name: "", against: "", facts: "" });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER */}
      <nav className="fixed top-0 w-full h-20 bg-white/90 backdrop-blur-md border-b z-50 px-6">
        <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={resetAll}>
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">AWAAZ</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLangOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-sm font-bold text-slate-700"
            >
              <Globe className="w-4 h-4 text-blue-600" /> {ALL_LANGUAGES.find(l => l.code === lang)?.name}
            </button>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Anonymous
            </div>
          </div>
        </div>
      </nav>

      {/* LANGUAGE MODAL */}
      <AnimatePresence>
        {isLangOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b flex justify-between items-center bg-slate-50">
                <h2 className="text-2xl font-black text-slate-900">Select Language</h2>
                <button onClick={() => setIsLangOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X /></button>
              </div>
              <div className="p-8 overflow-y-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                {ALL_LANGUAGES.map(l => (
                  <button 
                    key={l.code}
                    onClick={() => { setLang(l.code); setIsLangOpen(false); }}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all text-left ${lang === l.code ? "border-blue-600 bg-blue-50 text-blue-700 shadow-md" : "border-slate-100 hover:border-blue-200 text-slate-600"}`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: PERSONA */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-16 text-center">
              <div className="space-y-6">
                <h1 className="text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  {t.welcome} <br />
                  <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">No Lawyer Required.</span>
                </h1>
                <p className="text-slate-500 text-2xl font-medium max-w-2xl mx-auto leading-relaxed">{t.sub}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { id: "Youth", label: "Students", icon: User },
                  { id: "Adult", label: "Working", icon: Briefcase },
                  { id: "Senior", label: "Seniors", icon: HeartPulse }
                ].map((p) => (
                  <button 
                    key={p.id} onClick={() => { setPersona(p.id); setStep(2); }}
                    className="p-12 bg-white border border-slate-200 rounded-[3rem] hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-all group flex flex-col items-center gap-8"
                  >
                    <div className="w-24 h-24 bg-slate-50 text-slate-400 rounded-[2.5rem] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                      <p.icon className="w-12 h-12" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">{p.label}</h3>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: CASE SELECTION */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <ChevronLeft className="w-4 h-4" /> {t.back}
              </button>
              
              <div className="space-y-6">
                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Case Database</h2>
                <div className="relative">
                  <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 w-7 h-7" />
                  <input 
                    type="text" placeholder={t.search} 
                    className="w-full p-10 pl-20 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-2xl text-2xl font-bold focus:border-blue-500 outline-none transition-all"
                    value={search} onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredCases.map((c: any) => (
                  <button 
                    key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }}
                    className="p-10 bg-white border border-slate-100 rounded-[2.5rem] flex justify-between items-center hover:border-blue-600 hover:bg-blue-50/50 transition-all group"
                  >
                    <h3 className="text-2xl font-black text-slate-700 group-hover:text-blue-600 tracking-tight">{c.title}</h3>
                    <ChevronRight className="w-8 h-8 text-slate-200 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FLOWCHART */}
          {step === 3 && selectedCase && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
              <div className="grid lg:grid-cols-2 gap-20">
                <div className="space-y-12 relative">
                  <h2 className="text-4xl font-black text-slate-900 border-b-8 border-blue-600 w-fit pb-4 leading-none">Process</h2>
                  <div className="space-y-12 relative">
                    <div className="absolute left-6 top-10 w-[2px] h-[80%] bg-slate-200 z-0" />
                    {selectedCase.flow.map((s: string, i: number) => (
                      <div key={i} className="relative flex items-center gap-10 z-10">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-xl">
                          {i + 1}
                        </div>
                        <div className="bg-white border border-slate-100 p-8 rounded-[2rem] flex-1 shadow-sm font-bold text-xl text-slate-700">
                          {s}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-600 rounded-[4rem] p-16 text-white h-fit sticky top-40 shadow-2xl space-y-10">
                  <div className="flex gap-4 items-center bg-white/20 w-fit px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                    <Info className="w-4 h-4" /> Know Your Rights
                  </div>
                  <h2 className="text-5xl font-black leading-tight tracking-tight">{selectedCase.title}</h2>
                  <div className="space-y-6">
                    {selectedCase.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start">
                        <CheckCircle className="w-7 h-7 text-blue-200 shrink-0 mt-1" />
                        <p className="text-2xl font-bold leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-7 bg-white text-blue-600 rounded-[2.5rem] font-black text-2xl hover:bg-blue-50 transition-all flex items-center justify-center gap-3 shadow-xl">
                    {t.draft} <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: FINAL DRAFT */}
          {step === 4 && selectedCase && (
            <motion.div key="s4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-16 pb-32">
              <div className="grid lg:grid-cols-5 gap-20 items-start">
                <div className="lg:col-span-2 space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">Final Draft</h2>
                    <p className="text-xl text-slate-500 font-medium">Drafting for {selectedCase.title}</p>
                  </div>
                  <div className="space-y-6">
                    <input className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2rem] font-bold text-xl focus:border-blue-600 outline-none" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2rem] font-bold text-xl focus:border-blue-600 outline-none" placeholder="Opponent Name" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                    <div className="relative">
                      <textarea rows={6} className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2rem] font-bold text-xl focus:border-blue-600 outline-none" placeholder="Case Facts..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                      <button className="absolute bottom-6 right-6 p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Mic /></button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => window.print()} className="flex-1 py-7 bg-blue-600 text-white rounded-[2rem] font-black text-2xl flex items-center justify-center gap-4 shadow-xl">
                      <Download /> {t.download}
                    </button>
                    <button onClick={resetAll} className="p-7 bg-slate-100 text-slate-400 rounded-[2rem] hover:bg-slate-200 transition-all">
                      <RotateCcw className="w-8 h-8" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-3 document-preview bg-white shadow-2xl border-t-[12px] border-blue-600 p-20 min-h-[1000px] font-serif text-slate-800 text-2xl leading-[2.5]">
                    <div className="border-b-2 border-slate-100 pb-8 mb-16 flex justify-between items-center">
                      <span className="font-sans text-[10px] font-black text-blue-600 tracking-[0.5em] uppercase">Grievance Application</span>
                      <span className="font-sans text-[10px] text-slate-300">ID: AWZ-{selectedCase.id}</span>
                    </div>
                    <p className="font-bold">TO: THE AUTHORITY IN-CHARGE,</p>
                    <p className="font-bold uppercase tracking-tight">{form.against || "________________"}</p>
                    <p className="font-bold mt-12">SUBJECT: {selectedCase.title.toUpperCase()}</p>
                    <p className="mt-8 italic text-lg text-slate-400 font-sans tracking-tight">Dated: {new Date().toLocaleDateString()}</p>
                    <p className="mt-12">I, {form.name || "________________"}, am formally submitting this application regarding my rights under {selectedCase.rights[0]}.</p>
                    <p className="mt-12 font-bold uppercase underline underline-offset-8 decoration-4 decoration-slate-100">Fact Statement:</p>
                    <p className="leading-[2.2] mt-6 italic bg-slate-50 p-10 rounded-[2rem] border border-dashed border-slate-200">{form.facts || "Enter facts to see preview..."}</p>
                    <div className="mt-32 flex justify-between items-end border-t border-slate-100 pt-10">
                      <div className="text-[10px] font-sans text-slate-300 font-black tracking-widest">Awaaz Anonymous Assist</div>
                      <p className="font-bold text-right border-t-2 border-slate-900 pt-4 w-64">(SIGNATURE)</p>
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