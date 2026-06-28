"use client";

import React, { useState } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle, 
  Download, RotateCcw, Globe, Mic, Volume2, ShieldCheck 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Demographic = "Youth" | "Working Adult" | "Senior";

export default function AwaazApp() {
  const [step, setStep] = useState(1);
  const [demographic, setDemographic] = useState<Demographic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [incident, setIncident] = useState("");

  const PROBLEMS = {
    Youth: [
      { id: "cyber", title: "Cyber Harassment & Privacy", rights: ["Section 66E: Privacy Protection", "Right to be Forgotten", "Zero FIR Policy"] },
      { id: "rti", title: "RTI for Answer Scripts", rights: ["SC Ruling: Right to Inspection", "30-Day Mandatory Response", "Nominal Student Fees"] }
    ],
    "Working Adult": [
      { id: "wages", title: "Unpaid Wages Recovery", rights: ["Payment of Wages Act", "Interest on Arrears", "Conciliation Rights"] },
      { id: "scheme", title: "Govt Scheme Access", rights: ["Right to Information", "DBT Verification", "Public Grievance Redressal"] }
    ],
    Senior: [
      { id: "pension", title: "Pension & Arrears", rights: ["Pension as a Fundamental Right", "Digital Life Certification", "Welfare of Parents Act"] },
      { id: "wills", title: "Basic Will Guidance", rights: ["Legal Validity Guidelines", "Witness Requirements", "Revocation Rights"] }
    ]
  };

  return (
    <div className="min-h-screen selection:bg-blue-100 selection:text-blue-900">
      {/* PROFESSIONAL HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setStep(1)}>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <div>
              <span className="block font-black text-xl tracking-tight text-slate-900">AWAAZ</span>
              <span className="block text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase">Legal Companion</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Anonymous
            </div>
            <div className="h-4 w-[1px] bg-slate-200" />
            <button className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">
              <Globe className="w-4 h-4" /> EN / HI / TA
            </button>
          </div>
        </div>
        {/* Animated Progress Bar */}
        <div className="w-full h-[2px] bg-slate-100">
          <motion.div 
            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            initial={{ width: "0%" }}
            animate={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: DEMOGRAPHICS */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-6">Empowering Citizens</span>
              <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">Know your rights. <br/><span className="text-blue-600">Voice your grievance.</span></h1>
              <p className="text-slate-500 text-lg max-w-xl mx-auto mb-12 font-medium">Select your category to generate official legal documents without sharing your identity.</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: "Youth", label: "Youth", sub: "Students & Early Career", icon: User, color: "blue" },
                  { id: "Working Adult", label: "Working", sub: "Salaried & Professionals", icon: Briefcase, color: "indigo" },
                  { id: "Senior", label: "Seniors", sub: "Pensioners & Elders", icon: HeartPulse, color: "emerald" },
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setDemographic(item.id as Demographic); setStep(2); }}
                    className="glass-card group p-8 rounded-3xl text-left hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{item.label}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.sub}</p>
                    <div className="mt-6 flex items-center text-blue-600 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      Begin <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROBLEMS */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl mx-auto">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-8 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back to start
              </button>
              <h2 className="text-3xl font-black mb-8 text-slate-900 tracking-tight">How can we assist you today?</h2>
              <div className="grid gap-4">
                {demographic && PROBLEMS[demographic].map((p) => (
                  <button 
                    key={p.id}
                    onClick={() => { setSelectedProblem(p); setStep(3); }}
                    className="glass-card p-6 rounded-2xl flex justify-between items-center group hover:border-blue-200 transition-all"
                  >
                    <span className="font-bold text-lg text-slate-700 group-hover:text-blue-600">{p.title}</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: RIGHTS (The Knowledge Section) */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <span className="text-blue-400 font-black text-xs uppercase tracking-[0.2em]">Legal Handbook</span>
                      <h2 className="text-3xl font-bold mt-2">{selectedProblem?.title}</h2>
                    </div>
                    <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                      <Volume2 className="w-6 h-6 text-blue-300" />
                    </button>
                  </div>
                  
                  <div className="space-y-6 mb-10">
                    {selectedProblem?.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="mt-1"><CheckCircle className="w-5 h-5 text-emerald-400" /></div>
                        <p className="text-slate-300 font-medium text-lg leading-snug">{r}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={() => setStep(4)} className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/50">
                    Proceed to Draft Document
                  </button>
                </div>
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]" />
              </div>
            </motion.div>
          )}

          {/* STEP 4: FORM */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto">
              <h2 className="text-3xl font-black mb-2 text-slate-900 tracking-tight">Case Details</h2>
              <p className="text-slate-500 mb-8 font-medium">This information stays only in your browser.</p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Your Identity</label>
                  <input 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    placeholder="Enter Name or 'Anonymous'"
                    value={userName} onChange={e => setUserName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Opposing Party</label>
                  <input 
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    placeholder="Company, Department or Individual"
                    value={opponent} onChange={e => setOpponent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1 flex justify-between">
                    Statement of Facts
                    <span className="text-blue-600 flex items-center gap-1 cursor-pointer"><Mic className="w-3 h-3" /> Voice</span>
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                    placeholder="Describe the incident in plain English..."
                    value={incident} onChange={e => setIncident(e.target.value)}
                  />
                </div>
                <button onClick={() => setStep(5)} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all">
                  Generate Application
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: OUTPUT DASHBOARD */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <div className="flex justify-between items-end mb-6">
                  <h2 className="text-xs font-black uppercase text-slate-400 tracking-widest">Document Preview</h2>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Verified Template</span>
                </div>
                <div className="document-paper p-12 text-slate-800 leading-[1.8] text-lg min-h-[600px] relative">
                  <div className="absolute top-0 right-12 w-20 h-24 border-b border-l border-slate-100 flex items-center justify-center text-[8px] text-slate-300 uppercase vertical-text">Awaaz Legal</div>
                  <p className="mb-10 uppercase tracking-widest font-bold text-sm">To,<br/>The Concerned Authority,<br/>{opponent || "[Recipient Name]"}</p>
                  <p className="font-bold mb-8">SUBJECT: FORMAL GRIEVANCE REGARDING {selectedProblem?.title.toUpperCase()}</p>
                  <p className="mb-6 italic text-slate-500 text-base">Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  <p className="mb-8">I, {userName || "An Indian Citizen"}, am writing this application to formally bring to your notice a grievance under {selectedProblem?.rights[0]}.</p>
                  <p className="mb-12 font-medium">{incident || "[Incident Description]"}</p>
                  <p className="mb-20">I request you to look into this matter with immediate priority and provide a resolution as per my legal rights.</p>
                  <div className="flex flex-col items-end">
                    <div className="w-48 border-b border-slate-900 mb-2" />
                    <p className="font-bold text-sm">({userName || "Anonymous Participant"})</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-6">Next Steps</h3>
                  <div className="space-y-6">
                    {[
                      { t: "Print Document", s: "Print two copies on A4 paper." },
                      { t: "Wet Signature", s: "Sign both copies in blue or black ink." },
                      { t: "Submit & Acknowledge", s: "Hand over one copy. Get a stamp on the second copy for your records." }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">{i+1}</div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{step.t}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.s}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button onClick={() => window.print()} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center justify-center gap-3 shadow-lg shadow-blue-100 hover:scale-[1.02] transition-transform">
                    <Download className="w-5 h-5" /> Download PDF
                  </button>
                  <button onClick={() => { setStep(1); setIncident(""); setOpponent(""); }} className="w-full py-4 border-2 border-slate-100 text-slate-400 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors">
                    <RotateCcw className="w-5 h-5" /> Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}