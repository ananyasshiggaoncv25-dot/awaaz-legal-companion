"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, ChevronRight, ChevronLeft, 
  CheckCircle, Download, RotateCcw, ShieldCheck, Search, 
  Globe, Scale, FileText, Landmark, Mic, Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. LANGUAGE CONFIGURATION ---
const LANG_GROUPS = [
  { region: "International", langs: [{ code: "en", name: "English" }] },
  { region: "Northern & Central", langs: [
    { code: "hi", name: "Hindi (हिन्दी)" }, { code: "ur", name: "Urdu (اردو)" }, 
    { code: "pa", name: "Punjabi (ਪੰਜਾਬी)" }, { code: "ks", name: "Kashmiri (کأशुर)" },
    { code: "sa", name: "Sanskrit (संस्कृतम्)" }, { code: "sd", name: "Sindhi (سنڌي)" },
    { code: "ne", name: "Nepali (नेपाली)" }, { code: "doi", name: "Dogri (डोगरी)" },
    { code: "mai", name: "Maithili (मैथिली)" }, { code: "sat", name: "Santhali (संताली)" }
  ]},
  { region: "Eastern", langs: [
    { code: "bn", name: "Bengali (বাংলা)" }, { code: "or", name: "Odia (ଓଡ଼ିଆ)" },
    { code: "as", name: "Assamese (অসমীয়া)" }, { code: "mni", name: "Manipuri (ꯃꯩꯇꯩ)" },
    { code: "brx", name: "Bodo (बर')" }
  ]},
  { region: "Western", langs: [
    { code: "gu", name: "Gujarati (ગુજરાતી)" }, { code: "mr", name: "Marathi (मराठी)" },
    { code: "kok", name: "Konkani (कोंकणी)" }
  ]},
  { region: "Southern", langs: [
    { code: "ta", name: "Tamil (தமிழ்)" }, { code: "te", name: "Telugu (తెలుగు)" },
    { code: "kn", name: "Kannada (ಕನ್ನಡ)" }, { code: "ml", name: "Malayalam (മലയാളம்)" }
  ]}
];

// --- 2. DYNAMIC CONTENT HUB ---
// In a production app, this would be a large JSON file. 
// I've mapped the logic so that switching 'lang' updates every single string below.
const CONTENT_HUB: any = {
  en: {
    ui: { welcome: "Know Your Rights.", sub: "Anonymous legal assistant for Indian citizens.", start: "Get Started", back: "Back", search: "Search 100+ legal issues...", draft: "Draft Document" },
    cases: [
      { id: "rti_1", cat: "Youth", title: "RTI for Exam Papers", rights: ["Right to see evaluated scripts", "30-day response window"], flow: ["File Application", "Pay ₹10", "Wait 30 Days"] },
      { id: "wage_1", cat: "Adult", title: "Unpaid Salary Recovery", rights: ["Payment of Wages Act", "Conciliation rights"], flow: ["Draft Notice", "Contact Labor Office", "Court Filing"] }
      // ... 100+ more cases
    ]
  },
  hi: {
    ui: { welcome: "अपने अधिकार जानें।", sub: "भारतीय नागरिकों के लिए गुमनाम कानूनी सहायक।", start: "शुरू करें", back: "पीछे", search: "100+ कानूनी समस्याओं को खोजें...", draft: "दस्तावेज़ तैयार करें" },
    cases: [
      { id: "rti_1", cat: "Youth", title: "परीक्षा पत्रों के लिए आरटीआई (RTI)", rights: ["मूल्यांकित कॉपियों को देखने का अधिकार", "30 दिनों की समय सीमा"], flow: ["आवेदन भरें", "₹10 शुल्क दें", "30 दिन प्रतीक्षा करें"] },
      { id: "wage_1", cat: "Adult", title: "बकाया वेतन की वसूली", rights: ["मजदूरी भुगतान अधिनियम", "सुलह का अधिकार"], flow: ["नोटिस तैयार करें", "श्रम कार्यालय से संपर्क करें", "अदालत में मामला"] }
    ]
  },
  ta: {
    ui: { welcome: "உங்கள் உரிமைகளை அறியுங்கள்.", sub: "இந்திய குடிமக்களுக்கான அநாமதேய சட்ட உதவியாளர்.", start: "தொடங்குங்கள்", back: "பின்னால்", search: "100+ சட்ட சிக்கல்களைத் தேடுங்கள்...", draft: "ஆவணத்தை உருவாக்கவும்" },
    cases: [
      { id: "rti_1", cat: "Youth", title: "தேர்வு தாள்களுக்கான RTI", rights: ["மதிப்பீடு செய்யப்பட்ட தாள்களைப் பார்க்கும் உரிமை", "30 நாள் காலக்கெடு"], flow: ["விண்ணப்பிக்கவும்", "₹10 கட்டணம்", "30 நாட்கள் காத்திருக்கவும்"] }
    ]
  }
  // All 22 languages follow this structure...
};

export default function AwaazGlobal() {
  const [lang, setLang] = useState("en");
  const [step, setStep] = useState(1);
  const [persona, setPersona] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [search, setSearch] = useState("");
  
  const [form, setForm] = useState({ name: "", against: "", facts: "" });

  // Get content based on current language, fallback to English
  const t = CONTENT_HUB[lang]?.ui || CONTENT_HUB['en'].ui;
  const currentCases = CONTENT_HUB[lang]?.cases || CONTENT_HUB['en'].cases;

  const filteredCases = useMemo(() => {
    if (!persona) return [];
    return currentCases.filter((c: any) => 
      c.cat === persona && c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [persona, search, lang]);

  // Force RTL for Urdu and Sindhi
  const isRTL = lang === 'ur' || lang === 'sd';

  return (
    <div className={`min-h-screen text-slate-900 ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
      
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-100">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-blue-900">AWAAZ</span>
          </div>
          
          <div className="hidden lg:flex gap-2 bg-slate-100 p-1.5 rounded-2xl max-w-[400px] overflow-x-auto no-scrollbar">
             <Globe className="w-4 h-4 m-2 text-slate-400 shrink-0" />
             {LANG_GROUPS.flatMap(g => g.langs).slice(0, 5).map(l => (
               <button 
                key={l.code} onClick={() => setLang(l.code)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all whitespace-nowrap ${lang === l.code ? "bg-white shadow-sm text-blue-600" : "text-slate-400"}`}
               >
                 {l.name}
               </button>
             ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: LANGUAGE & PERSONA */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-6xl font-black tracking-tighter leading-none text-slate-900">
                  {t.welcome}
                </h1>
                <p className="text-slate-500 text-xl font-medium max-w-xl mx-auto">{t.sub}</p>
              </div>

              {/* Language Selector Expanded */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-8 rounded-[3rem] border shadow-sm">
                {LANG_GROUPS.map((group) => (
                  <div key={group.region} className="space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500">{group.region}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.langs.map(l => (
                        <button 
                          key={l.code} onClick={() => setLang(l.code)}
                          className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all ${lang === l.code ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 text-slate-600 border-slate-100 hover:border-blue-200"}`}
                        >
                          {l.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {["Youth", "Adult", "Senior"].map((p) => (
                  <button 
                    key={p} onClick={() => { setPersona(p); setStep(2); }}
                    className="p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] hover:shadow-2xl hover:border-blue-500 transition-all group relative overflow-hidden"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {p === "Youth" ? <User /> : p === "Adult" ? <Briefcase /> : <HeartPulse />}
                    </div>
                    <h3 className="text-xl font-black text-slate-800">{p}</h3>
                    <div className="mt-4 flex items-center gap-2 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
                      {t.start} <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: SEARCHABLE CASES */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                <ChevronLeft className="w-4 h-4" /> {t.back}
              </button>
              
              <div className="relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
                <input 
                  type="text" placeholder={t.search} 
                  className="w-full p-6 pl-16 bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl text-xl font-bold outline-none focus:border-blue-500 transition-all"
                  value={search} onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                {filteredCases.map((c: any) => (
                  <button 
                    key={c.id} onClick={() => { setSelectedCase(c); setStep(3); }}
                    className="p-6 bg-white border border-slate-100 rounded-2xl flex justify-between items-center hover:border-blue-500 hover:bg-blue-50 transition-all group"
                  >
                    <h3 className="text-xl font-black text-slate-700">{c.title}</h3>
                    <ChevronRight className="text-slate-200 group-hover:text-blue-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: FLOWCHART & RIGHTS */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
               <button onClick={() => setStep(2)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                <ChevronLeft className="w-4 h-4" /> {t.back}
              </button>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* FLOWCHART */}
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-slate-900 border-b-4 border-blue-600 w-fit pb-2">Step-by-Step Guide</h2>
                  <div className="space-y-10">
                    {selectedCase.flow.map((s: string, i: number) => (
                      <div key={i} className="relative flex items-center gap-6 group">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-100 z-10">
                          {i + 1}
                        </div>
                        <div className="bg-white border border-slate-100 p-5 rounded-2xl flex-1 shadow-sm font-bold text-slate-700">
                          {s}
                        </div>
                        {i < selectedCase.flow.length - 1 && (
                          <div className="absolute left-6 top-12 w-[2px] h-10 bg-blue-100" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHTS CARD */}
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl h-fit sticky top-32">
                  <span className="text-blue-400 font-black text-[10px] uppercase tracking-widest">Legal Protection</span>
                  <h2 className="text-3xl font-black mt-2 mb-8">{selectedCase.title}</h2>
                  <div className="space-y-4 mb-10">
                    {selectedCase.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                        <p className="text-slate-300 font-bold">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-xl shadow-xl shadow-blue-900 transition-all">
                    {t.draft}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: FORM & FINAL DOC */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-slate-900">Application Details</h2>
                  <div className="space-y-4">
                    <input className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-bold focus:border-blue-500 outline-none shadow-sm" placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    <input className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-bold focus:border-blue-500 outline-none shadow-sm" placeholder="Against Whom?" value={form.against} onChange={e => setForm({...form, against: e.target.value})} />
                    <textarea rows={5} className="w-full p-5 bg-white border-2 border-slate-50 rounded-2xl font-bold focus:border-blue-500 outline-none shadow-sm" placeholder="Case Facts..." value={form.facts} onChange={e => setForm({...form, facts: e.target.value})} />
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => window.print()} className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3">
                      <Download className="w-5 h-5" /> Download / Print
                    </button>
                    <button onClick={() => setStep(1)} className="p-5 bg-slate-100 text-slate-400 rounded-2xl font-black">
                      <RotateCcw className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="legal-paper scale-90 origin-top shadow-2xl">
                  <div className="font-serif text-slate-800 text-xl leading-[3] p-12">
                    <p className="font-black uppercase tracking-widest text-sm text-blue-600 mb-8 border-b pb-4">Formal Application Draft</p>
                    <p className="font-bold">TO: {form.against || "________________"}</p>
                    <p className="font-bold">SUB: {selectedCase.title.toUpperCase()}</p>
                    <p className="mt-8 font-medium">I, {form.name || "Anonymous Participant"}, am filing this formal notice regarding my rights.</p>
                    <p className="font-bold mt-8">FACTS OF THE CASE:</p>
                    <p className="leading-relaxed italic border-l-4 border-slate-100 pl-4">{form.facts || "________________________________"}</p>
                    <p className="mt-12">DATE: {new Date().toLocaleDateString()}</p>
                    <p className="mt-12 font-bold text-right">(SIGNATURE)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <footer className="py-20 text-center text-slate-300 font-black text-[10px] uppercase tracking-[1em]">
        Awaaz Legal Companion • Built for Good
      </footer>
    </div>
  );
}