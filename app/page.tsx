"use client"; // CRITICAL: This allows the buttons to work!

import React, { useState } from "react";
import { 
  Gavel, User, Briefcase, HeartPulse, 
  ChevronRight, ChevronLeft, CheckCircle, 
  Download, RotateCcw, Globe 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 1. DATA DEFINITIONS
type Demographic = "Youth" | "Working Adult" | "Senior";

const PROBLEMS = {
  Youth: [
    { id: "cyber", title: "Cyber Harassment & Privacy", rights: ["Right to be forgotten", "Section 66E protection", "Zero FIR registration"] },
    { id: "rti", title: "Filing RTI for Exams", rights: ["Right to see answer scripts", "30-day response time"] }
  ],
  "Working Adult": [
    { id: "wages", title: "Unpaid Wages / Labor Dispute", rights: ["Payment of Wages Act", "Right to interest", "Termination notice"] },
    { id: "scheme", title: "Govt Scheme Eligibility", rights: ["DBT Transparency", "Grievance redressal"] }
  ],
  Senior: [
    { id: "pension", title: "Pending Pensions", rights: ["Pension is a Right", "Digital Life Certificate"] },
    { id: "wills", title: "Understanding Wills", rights: ["No mandatory registration", "Two witnesses needed"] }
  ]
};

export default function AwaazApp() {
  // 2. STATE (The Brain)
  const [step, setStep] = useState(1);
  const [demographic, setDemographic] = useState<Demographic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<any>(null);
  
  // Input States
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [incident, setIncident] = useState("");

  // 3. ACTIONS
  const handleStart = (type: Demographic) => {
    console.log("Selecting Demographic:", type); // Debugging
    setDemographic(type);
    setStep(2);
  };

  const handleProblemSelect = (prob: any) => {
    console.log("Selecting Problem:", prob.title); // Debugging
    setSelectedProblem(prob);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HEADER */}
      <header className="bg-white border-b p-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep(1)}>
            <Gavel className="text-blue-600 w-7 h-7" />
            <span className="font-bold text-xl tracking-tighter">AWAAZ</span>
          </div>
          <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full border border-green-100">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-700 uppercase">Secure & Anonymous</span>
          </div>
        </div>
      </header>

      {/* PROGRESS BAR */}
      <div className="w-full h-1 bg-slate-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-500" 
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <main className="max-w-xl mx-auto p-6 pt-12">
        <AnimatePresence mode="wait">

          {/* STEP 1: DEMOGRAPHIC */}
          {step === 1 && (
            <motion.div 
              key="step1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-4xl font-black tracking-tight">Legal access for all.</h1>
                <p className="text-slate-500 text-lg">Choose a category to start completely anonymously.</p>
              </div>

              <div className="grid gap-4 mt-8">
                <button onClick={() => handleStart("Youth")} className="group p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all flex items-center text-left">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><User /></div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg">Youth & Students</h3>
                    <p className="text-slate-400 text-sm italic">Ages 15-25 • Education, Cyber, Internships</p>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </button>

                <button onClick={() => handleStart("Working Adult")} className="group p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all flex items-center text-left">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><Briefcase /></div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg">Working Adults</h3>
                    <p className="text-slate-400 text-sm italic">Ages 26-60 • Labor, Schemes, Consumer</p>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </button>

                <button onClick={() => handleStart("Senior")} className="group p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all flex items-center text-left">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors"><HeartPulse /></div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg">Senior Citizens</h3>
                    <p className="text-slate-400 text-sm italic">Ages 60+ • Pension, Wills, Healthcare</p>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PROBLEM SELECTION */}
          {step === 2 && demographic && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}>
              <button onClick={() => setStep(1)} className="text-blue-600 flex items-center mb-6 font-bold uppercase text-xs tracking-widest"><ChevronLeft className="w-4 h-4" /> Back</button>
              <h2 className="text-2xl font-bold mb-4">What is the problem?</h2>
              <div className="grid gap-3">
                {PROBLEMS[demographic].map((p) => (
                  <button 
                    key={p.id} onClick={() => handleProblemSelect(p)}
                    className="p-5 bg-white border rounded-xl hover:bg-blue-50 hover:border-blue-200 text-left font-bold transition-all flex justify-between"
                  >
                    {p.title} <ChevronRight className="text-blue-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: KNOWLEDGE */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <button onClick={() => setStep(2)} className="text-blue-600 flex items-center mb-6 font-bold uppercase text-xs tracking-widest"><ChevronLeft className="w-4 h-4" /> Back</button>
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl mb-6">
                <h2 className="text-3xl font-bold mb-6 underline decoration-blue-500 underline-offset-8">{selectedProblem?.title}</h2>
                <p className="text-slate-400 mb-6 font-medium">Under Indian Law, you have the following rights:</p>
                <ul className="space-y-4">
                  {selectedProblem?.rights.map((r: string, i: number) => (
                    <li key={i} className="flex gap-3"><CheckCircle className="text-green-400 w-6 h-6 flex-shrink-0" /> <span className="text-lg">{r}</span></li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setStep(4)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all">Continue to Draft</button>
            </motion.div>
          )}

          {/* STEP 4: INPUT */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold mb-6">Application Details</h2>
              <div className="bg-white p-6 rounded-2xl border space-y-4 shadow-sm">
                <input className="w-full p-4 border rounded-xl" placeholder="Your Name (can be Anonymous)" value={userName} onChange={e => setUserName(e.target.value)} />
                <input className="w-full p-4 border rounded-xl" placeholder="Opposing Party (Person/Company Name)" value={opponent} onChange={e => setOpponent(e.target.value)} />
                <textarea rows={4} className="w-full p-4 border rounded-xl" placeholder="Describe what happened..." value={incident} onChange={e => setIncident(e.target.value)} />
              </div>
              <button onClick={() => setStep(5)} className="w-full mt-6 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg">Generate Formal Document</button>
            </motion.div>
          )}

          {/* STEP 5: FINAL */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="bg-white p-8 rounded-xl border-t-8 border-blue-600 shadow-2xl font-serif text-slate-800 whitespace-pre-line leading-relaxed mb-6">
                {`To, 
                The Relevant Authority, ${opponent || "Concerned Department"}

                Subject: Formal Application regarding ${selectedProblem?.title}

                I, ${userName || "An Indian Citizen"}, am filing this formal complaint regarding the following incident:

                ${incident}

                I request you to take cognizance of this matter under the applicable provisions of the law.

                Regards,
                ${userName || "Anonymous"}
                Date: ${new Date().toLocaleDateString()}`}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => window.print()} className="bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><Download className="w-4 h-4"/> Print / PDF</button>
                <button onClick={() => { setStep(1); setIncident(""); setOpponent(""); }} className="border-2 py-4 rounded-xl font-bold flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4"/> Reset</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}