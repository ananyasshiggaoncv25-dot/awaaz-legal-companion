"use client";

import React, { useState } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle, 
  Download, RotateCcw, ShieldCheck, Zap, Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AwaazVibrantApp() {
  const [step, setStep] = useState(1);
  const [demographic, setDemographic] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [incident, setIncident] = useState("");

  const PROBLEMS: any = {
    Youth: [
      { id: "cyber", title: "Cyber Harassment", color: "bg-orange-500", rights: ["Section 66E IT Act: Privacy Protection", "Right to have content removed", "Zero-FIR: File anywhere"] },
      { id: "rti", title: "RTI for Exams", color: "bg-amber-500", rights: ["Right to inspect answer sheets", "30-Day Mandatory Disclosure", "Nominal Student Fees"] }
    ],
    "Working Adult": [
      { id: "wages", title: "Unpaid Wages", color: "bg-blue-600", rights: ["Payment of Wages Act 1936", "Interest on delayed salary", "Conciliation Rights"] },
      { id: "scheme", title: "Govt Schemes", color: "bg-teal-600", rights: ["Transparency in Benefits", "Direct Benefit Transfer Rights", "15-Day Resolution Window"] }
    ],
    Senior: [
      { id: "pension", title: "Pension Issues", color: "bg-rose-600", rights: ["Pension is a Fundamental Right", "Digital Life Certificate Access", "Senior Citizen Act Protection"] }
    ]
  };

  // --- DOWNLOAD LOGIC ---
  const downloadAsFile = () => {
    const docText = `
TO: The Authority In-Charge, ${opponent || "Concerned Department"}
SUBJECT: FORMAL APPLICATION REGARDING ${selectedProblem?.title.toUpperCase()}
DATE: ${new Date().toLocaleDateString()}

Dear Sir/Madam,

I, ${userName || "Anonymous Participant"}, am filing this formal grievance.

INCIDENT DETAILS:
${incident || "No details provided."}

As per my rights under Indian Law (specifically ${selectedProblem?.rights[0]}), I request immediate action.

Regards,
${userName || "Anonymous Participant"}
    `;

    const blob = new Blob([docText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Awaaz_Legal_Draft_${selectedProblem?.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-slate-900 font-sans">
      {/* VIBRANT NAV */}
      <nav className="bg-white/90 backdrop-blur-md border-b-2 border-orange-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-orange-200">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-blue-900 uppercase">Awaaz</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Secure & Anonymous</span>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CATEGORIES */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-5xl font-black text-blue-950 leading-[1.1] tracking-tight">
                  Your voice, <span className="text-orange-500">legally protected.</span>
                </h1>
                <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                  Generate formal legal letters in 2 minutes. No sign-in, 100% private.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: "Youth", label: "Students", icon: User, color: "from-orange-400 to-amber-500", shadow: "shadow-orange-100" },
                  { id: "Working Adult", label: "Working", icon: Briefcase, color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-100" },
                  { id: "Senior", label: "Seniors", icon: HeartPulse, color: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-100" }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => { setDemographic(item.id); setStep(2); }}
                    className={`p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] ${item.shadow} hover:shadow-2xl transition-all group relative overflow-hidden`}
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-black text-xl text-slate-800">{item.label}</h3>
                    <ChevronRight className="mt-4 w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROBLEM SELECTION */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <button onClick={() => setStep(1)} className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-[0.2em]">
                <ChevronLeft className="w-4 h-4" /> Go Back
              </button>
              <h2 className="text-3xl font-black text-blue-950 tracking-tight">Select the issue:</h2>
              <div className="grid gap-4">
                {demographic && PROBLEMS[demographic].map((p: any) => (
                  <button 
                    key={p.id}
                    onClick={() => { setSelectedProblem(p); setStep(3); }}
                    className="p-6 bg-white border-l-8 border-l-blue-500 border border-slate-200 rounded-2xl flex justify-between items-center group hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-blue-50 p-2 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
                      <span className="font-bold text-xl text-slate-700 tracking-tight">{p.title}</span>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: THE VIBRANT KNOWLEDGE CARD */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
                <Star className="absolute top-10 right-10 w-20 h-20 text-white/5 rotate-12" />
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 font-black text-[10px] uppercase tracking-widest mb-4">Indian Law Guide</span>
                  <h2 className="text-4xl font-black mb-8 leading-tight">{selectedProblem?.title}</h2>
                  <div className="space-y-4 mb-10">
                    {selectedProblem?.rights.map((r: string, i: number) => (
                      <div key={i} className="flex gap-4 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                        <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        <p className="text-lg font-medium text-blue-50 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(4)} className="w-full py-5 bg-orange-500 hover:bg-orange-400 text-white rounded-2xl font-black text-xl shadow-xl shadow-orange-950/20 transition-all">
                    Start Drafting Document
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: FORM */}
          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <h2 className="text-3xl font-black text-blue-950 tracking-tight">Case Details</h2>
              <div className="space-y-6 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-blue-400 tracking-widest ml-1">Your Name</label>
                  <input className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold text-slate-700" placeholder="E.g. Rajesh Kumar" value={userName} onChange={e => setUserName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-blue-400 tracking-widest ml-1">Against Whom?</label>
                  <input className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold text-slate-700" placeholder="Person or Department" value={opponent} onChange={e => setOpponent(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-blue-400 tracking-widest ml-1">What happened?</label>
                  <textarea rows={4} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-orange-500 outline-none transition-all font-bold text-slate-700" placeholder="Tell us what occurred..." value={incident} onChange={e => setIncident(e.target.value)} />
                </div>
                <button onClick={() => setStep(5)} className="w-full py-5 bg-blue-900 text-white rounded-2xl font-black text-xl">Generate Letter</button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: OUTPUT & DOWNLOAD */}
          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              <div className="flex justify-between items-center bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm font-bold text-blue-700">Document ready for download.</p>
                <div className="flex gap-2">
                  <button onClick={downloadAsFile} className="px-6 py-3 bg-orange-600 text-white rounded-xl font-black text-sm flex items-center gap-2 hover:bg-orange-500 transition-all shadow-lg shadow-orange-200">
                    <Download className="w-5 h-5" /> Download File
                  </button>
                  <button onClick={() => setStep(1)} className="px-6 py-3 border-2 border-blue-200 text-blue-600 rounded-xl font-black text-sm">
                    <RotateCcw className="w-5 h-5" /> Reset
                  </button>
                </div>
              </div>

              <div className="legal-paper p-10 md:p-16 text-slate-800 leading-[2.2] border-t-[12px] border-orange-500">
                <div className="font-serif text-lg md:text-xl">
                  {`To,
                  The Authority In-Charge,
                  ${opponent || "[Recipient Name]"}

                  SUBJECT: FORMAL GRIEVANCE REGARDING ${selectedProblem?.title.toUpperCase()}

                  Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}

                  Respected Authority,

                  I, ${userName || "Anonymous Participant"}, am filing this formal notice regarding:

                  ${incident || "[No incident details provided]"}

                  I request you to take action as per my rights under ${selectedProblem?.rights[0]}.

                  Thanking you,

                  (Signed)
                  ${userName || "Anonymous Participant"}`}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}