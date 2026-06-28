"use client";

import React, { useState } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle, 
  Download, RotateCcw, ShieldCheck, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AwaazApp() {
  const [step, setStep] = useState(1);
  const [demographic, setDemographic] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [incident, setIncident] = useState("");

  const PROBLEMS: any = {
    Youth: [
      { id: "cyber", title: "Cyber Harassment", rights: ["Section 66E IT Act: Privacy Protection", "Right to immediate digital content removal", "Zero-FIR: File at any station"] },
      { id: "rti", title: "RTI for Education", rights: ["Right to inspect evaluated scripts", "30-Day Mandatory Disclosure", "Protection against retaliation"] }
    ],
    "Working Adult": [
      { id: "wages", title: "Unpaid Wages Recovery", rights: ["Payment of Wages Act 1936", "Interest on delayed salary", "Right to notice period pay"] },
      { id: "scheme", title: "Govt Scheme Access", rights: ["Transparency in Benefit Allocation", "Direct Benefit Transfer Rights", "15-Day Grievance Window"] }
    ],
    Senior: [
      { id: "pension", title: "Pension & Arrears", rights: ["Pension as a Fundamental Right", "Digital Life Certificate Access", "Senior Citizen Welfare Act 2007"] }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* CLEAN MINIMAL NAV */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gavel className="w-6 h-6 text-indigo-900" />
            <span className="font-bold text-lg tracking-tight text-indigo-950 uppercase">Awaaz</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black bg-indigo-50 text-indigo-700 px-2 py-1 rounded tracking-widest uppercase">Anonymous Mode</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
              <div className="space-y-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Legal documentation, <br />
                  <span className="text-indigo-600">simplified and private.</span>
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
                  Understand your rights and generate formal applications without revealing your identity.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { id: "Youth", label: "Youth & Students", sub: "Education, Cyber Safety, Internships", icon: User },
                  { id: "Working Adult", label: "Working Professionals", sub: "Labor Rights, Salary, Grievances", icon: Briefcase },
                  { id: "Senior", label: "Senior Citizens", sub: "Pensions, Wills, Elder Care", icon: HeartPulse }
                ].map((card) => (
                  <button 
                    key={card.id}
                    onClick={() => { setDemographic(card.id); setStep(2); }}
                    className="flex items-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-indigo-400 hover:shadow-lg transition-all group text-left"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <card.icon className="w-6 h-6" />
                    </div>
                    <div className="ml-5">
                      <h3 className="font-bold text-slate-900 text-lg tracking-tight">{card.label}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{card.sub}</p>
                    </div>
                    <ChevronRight className="ml-auto w-5 h-5 text-slate-300" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROBLEM SELECTION */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <button onClick={() => setStep(1)} className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Select your concern:</h2>
              <div className="grid gap-3">
                {demographic && PROBLEMS[demographic].map((p: any) => (
                  <button 
                    key={p.id}
                    onClick={() => { setSelectedProblem(p); setStep(3); }}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:border-indigo-600 flex justify-between items-center group transition-all"
                  >
                    <span className="font-bold text-slate-700 tracking-tight">{p.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: THE KNOWLEDGE CARD */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="bg-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl space-y-8">
                <div className="space-y-2">
                  <span className="text-indigo-400 font-black text-[10px] uppercase tracking-[0.3em]">Knowledge Base</span>
                  <h2 className="text-3xl font-bold tracking-tight leading-tight">{selectedProblem?.title}</h2>
                </div>
                
                <div className="space-y-4">
                  {selectedProblem?.rights.map((r: string, i: number) => (
                    <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
                      <p className="text-indigo-50 text-base leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setStep(4)}
                  className="w-full py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/40 transition-all"
                >
                  Draft Application
                </button>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-relaxed font-medium">
                  We generate a standard legal template based on these rights. You can edit the details in the next step.
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 4: INPUT FORM */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Application Details</h2>
                <p className="text-slate-500 text-sm leading-relaxed italic">Provide necessary details for the formal document.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Your Name</label>
                  <input className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium text-slate-700" placeholder="E.g. Rajesh Kumar or 'Anonymous'" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Opponent Name</label>
                  <input className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium text-slate-700" placeholder="E.g. ABC Pvt Ltd or Police Station Head" value={opponent} onChange={e => setOpponent(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Brief Description</label>
                  <textarea rows={4} className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 outline-none transition-all font-medium text-slate-700" placeholder="State exactly what happened..." value={incident} onChange={e => setIncident(e.target.value)} />
                </div>
                <button onClick={() => setStep(5)} className="w-full py-5 bg-indigo-950 text-white rounded-xl font-bold text-lg hover:shadow-2xl transition-all">
                  Generate Final Document
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: FINAL OUTPUT */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-20">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">Final Application</h2>
                <div className="flex gap-2">
                  <button onClick={() => window.print()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-100">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                  <button onClick={() => setStep(1)} className="px-4 py-2 border border-slate-200 text-slate-500 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-white transition-all">
                    <RotateCcw className="w-4 h-4" /> Restart
                  </button>
                </div>
              </div>

              <div className="legal-paper p-10 md:p-14 text-slate-800 text-base md:text-lg whitespace-pre-line leading-[2] border-t-8 border-indigo-900">
                <div className="font-serif">
                  {`To,
                  The Authority In-Charge,
                  ${opponent || "[Recipient Name]"}

                  Subject: FORMAL NOTICE REGARDING ${selectedProblem?.title.toUpperCase()}

                  Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

                  Dear Sir/Madam,

                  I, ${userName || "Anonymous Participant"}, wish to bring to your formal attention the following grievance:

                  ${incident || "[Details omitted]"}

                  As per my rights under ${selectedProblem?.rights[0]}, I request immediate action regarding this matter. Please treat this as a formal notice.

                  Sincerely,

                  (Signature)
                  ${userName || "Anonymous Participant"}`}
                </div>
              </div>

              <div className="p-6 bg-slate-900 text-slate-300 rounded-2xl space-y-4">
                <h4 className="text-white font-bold tracking-tight">Next Steps:</h4>
                <ul className="text-sm space-y-3 list-decimal list-inside leading-relaxed opacity-90">
                  <li>Print 2 copies of this document.</li>
                  <li>Sign both copies by hand.</li>
                  <li>Hand one copy to the recipient and keep one as an "Office Copy".</li>
                  <li>Ask the recipient to sign/stamp your Office Copy as "Received".</li>
                </ul>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}