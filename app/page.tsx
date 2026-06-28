"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Gavel, 
  User, 
  Briefcase, 
  Stethoscope, 
  Volume2, 
  Mic, 
  Download, 
  CheckCircle, 
  RotateCcw, 
  Globe 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Data ---

type Demographic = "Youth" | "Working Adult" | "Senior";

interface Problem {
  id: string;
  title: string;
  rights: string[];
  template: (name: string, opponent: string, details: string) => string;
}

const PROBLEMS: Record<Demographic, Problem[]> = {
  Youth: [
    {
      id: "cyber",
      title: "Cyber Harassment & Privacy",
      rights: [
        "Right to be forgotten and data privacy under IT Act.",
        "Protection against non-consensual image sharing (Section 66E).",
        "Mandatory FIR registration at any Cyber Cell (Zero FIR)."
      ],
      template: (n, o, d) => `To, The Cyber Cell Officer,\n\nSubject: Formal Complaint regarding Cyber Harassment by ${o || "Unknown"}.\n\nI, ${n || "Anonymous"}, am writing to report an incident of harassment. Details: ${d}.\n\nRequesting immediate action under the IT Act.\n\nRegards,\n${n || "An Indian Citizen"}`
    },
    {
      id: "rti",
      title: "Filing RTI for Exam Papers",
      rights: [
        "Right to inspect evaluated answer scripts (Supreme Court ruling).",
        "Fixed timeline: Information must be provided within 30 days.",
        "Nominal fee (usually ₹10) for BPL/Students."
      ],
      template: (n, o, d) => `To, The Public Information Officer (PIO),\n\nSubject: Application under RTI Act 2005.\n\nI, ${n || "Anonymous"}, request the certified copies of my answer sheets for ${o}. \n\nDetails: ${d}.\n\nEnclosed: Application Fee.\n\nRegards,\n${n}`
    }
  ],
  "Working Adult": [
    {
      id: "wages",
      title: "Unpaid Wages / Labor Dispute",
      rights: [
        "Payment of Wages Act ensures timely salary disbursement.",
        "Right to interest on delayed payments.",
        "Protection against arbitrary termination without notice."
      ],
      template: (n, o, d) => `To, The Management, ${o},\n\nSubject: Legal Notice for Recovery of Unpaid Dues.\n\nI, ${n}, served as an employee at your organization. My salary for the period ${d} remains unpaid despite multiple reminders.\n\nPlease treat this as a formal demand for payment within 7 days.\n\nSincerely,\n${n}`
    },
    {
      id: "scheme",
      title: "Govt Scheme Eligibility",
      rights: [
        "Right to transparency in benefit allocation.",
        "Direct Benefit Transfer (DBT) mandatory for most schemes.",
        "Grievance redressal officer must respond within 15 days."
      ],
      template: (n, o, d) => `To, The District Collector,\n\nSubject: Inquiry/Grievance regarding Scheme Eligibility: ${o}.\n\nI, ${n}, wish to apply for the mentioned scheme. Details provided: ${d}.\n\nRequesting a status update or reason for rejection if applicable.\n\nRegards,\n${n}`
    }
  ],
  Senior: [
    {
      id: "pension",
      title: "Accessing Pending Pensions",
      rights: [
        "Pension is a fundamental right, not a bounty.",
        "Right to 'Life Certificate' submission via digital channels.",
        "Protection under the Maintenance and Welfare of Parents and Senior Citizens Act."
      ],
      template: (n, o, d) => `To, The Pension Disbursement Officer, ${o},\n\nSubject: Formal Request for Release of Arrears.\n\nI, ${n}, a senior citizen, have not received my pension for the last cycles. Details: ${d}.\n\nKindly expedite the process as per Senior Citizen welfare norms.\n\nRegards,\n${n}`
    },
    {
      id: "wills",
      title: "Understanding Basic Wills",
      rights: [
        "A Will does not require mandatory registration (though recommended).",
        "Two witnesses must sign in the presence of the testator.",
        "Right to revoke or change a Will at any time during your lifetime."
      ],
      template: (n, o, d) => `LAST WILL AND TESTAMENT\n\nI, ${n}, hereby declare this to be my last will. I bequeath my assets as follows: ${d}.\n\nWitnessed by: ${o}.\n\nDate: ${new Date().toLocaleDateString()}`
    }
  ]
};

// --- Components ---

export default function AwaazLegalApp() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState("English");
  const [demographic, setDemographic] = useState<Demographic | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  
  // Form State
  const [userName, setUserName] = useState("");
  const [opponent, setOpponent] = useState("");
  const [incident, setIncident] = useState("");
  const [generatedDoc, setGeneratedDoc] = useState("");

  const totalSteps = 5;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));
  const resetApp = () => {
    setStep(1);
    setDemographic(null);
    setSelectedProblem(null);
    setUserName("");
    setOpponent("");
    setIncident("");
  };

  const handleDemographicSelect = (type: Demographic) => {
    setDemographic(type);
    nextStep();
  };

  const handleProblemSelect = (prob: Problem) => {
    setSelectedProblem(prob);
    nextStep();
  };

  const generateFinalDoc = () => {
    if (selectedProblem) {
      const doc = selectedProblem.template(userName, opponent, incident);
      setGeneratedDoc(doc);
      nextStep();
    }
  };

  const simulateTTS = () => {
    if ('speechSynthesis' in window && selectedProblem) {
      const text = selectedProblem.rights.join(". ");
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is starting...");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      {/* Header & Progress */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Gavel className="text-white w-6 h-6" />
            </div>
            <h1 className="font-bold text-xl tracking-tight text-slate-800">AWAAZ</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
              <Globe className="w-4 h-4" />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent border-none focus:ring-0 cursor-pointer"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              Anonymous Mode
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100">
          <motion.div 
            className="h-full bg-blue-600"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 pt-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Onboarding */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Legal help, minus the lawyer.</h2>
                <p className="text-slate-500 text-lg">Select your group to see relevant rights and documents.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: "Youth", label: "Youth & Students", age: "15-25", icon: User },
                  { id: "Working Adult", label: "Working Adults", age: "26-60", icon: Briefcase },
                  { id: "Senior", label: "Senior Citizens", age: "60+", icon: Stethoscope },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleDemographicSelect(item.id as Demographic)}
                    className="group p-6 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all text-left flex flex-col justify-between h-48"
                  >
                    <item.icon className="w-10 h-10 text-slate-400 group-hover:text-blue-600 transition-colors" />
                    <div>
                      <h3 className="font-bold text-lg">{item.label}</h3>
                      <p className="text-slate-400 text-sm">Ages {item.age}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Problem Selection */}
          {step === 2 && demographic && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button onClick={prevStep} className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">What is the issue?</h2>
                <p className="text-slate-500">Choose a category to understand your legal standing.</p>
              </div>
              <div className="grid gap-4">
                {PROBLEMS[demographic].map((prob) => (
                  <button
                    key={prob.id}
                    onClick={() => handleProblemSelect(prob)}
                    className="p-5 bg-white border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 flex justify-between items-center group transition-all"
                  >
                    <span className="font-semibold text-slate-700 text-lg group-hover:text-blue-700">{prob.title}</span>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Jargon Buster */}
          {step === 3 && selectedProblem && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }}
              className="space-y-6"
            >
              <button onClick={prevStep} className="flex items-center text-slate-500">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="bg-blue-600 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-sm uppercase tracking-widest font-bold opacity-80 mb-2">Know Your Rights</h2>
                  <h3 className="text-3xl font-bold mb-6">{selectedProblem.title}</h3>
                  <ul className="space-y-4 mb-8">
                    {selectedProblem.rights.map((right, i) => (
                      <li key={i} className="flex gap-3 items-start text-blue-50">
                        <div className="mt-1 bg-blue-400 rounded-full p-1"><CheckCircle className="w-3 h-3 text-white" /></div>
                        <span className="text-lg leading-snug">{right}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={simulateTTS}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full transition-all text-sm font-medium"
                  >
                    <Volume2 className="w-4 h-4" /> Listen to this Guide
                  </button>
                </div>
                {/* Decorative background circle */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              </div>
              <button 
                onClick={nextStep}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all shadow-lg"
              >
                Next: Draft Application
              </button>
            </motion.div>
          )}

          {/* STEP 4: Case Form */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <button onClick={prevStep} className="flex items-center text-slate-500">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold italic">"Your voice is your weapon."</h2>
                <p className="text-slate-500">Fill in the blanks. We will handle the legal formatting.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Rajesh Kumar or 'Anonymous'" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Opposing Party</label>
                  <input 
                    type="text" 
                    placeholder="E.g. Airtel, Local Police Station, or Landlord Name" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={opponent}
                    onChange={(e) => setOpponent(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1 flex justify-between">
                    Details of the Incident
                    <button className="text-blue-600 flex items-center gap-1 text-xs">
                      <Mic className="w-3 h-3" /> Voice Input
                    </button>
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Explain what happened in simple words..." 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={incident}
                    onChange={(e) => setIncident(e.target.value)}
                  />
                </div>
              </div>

              <button 
                onClick={generateFinalDoc}
                disabled={!incident}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                  incident ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Generate Legal Document
              </button>
            </motion.div>
          )}

          {/* STEP 5: Output Dashboard */}
          {step === 5 && (
            <motion.div 
              key="step5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Preview */}
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Document Preview</h3>
                  <div className="bg-white p-8 rounded-lg border border-slate-200 shadow-inner min-h-[400px] font-serif text-slate-800 whitespace-pre-wrap leading-relaxed border-t-4 border-t-blue-600">
                    {generatedDoc}
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>

                {/* Column 2: Steps */}
                <div className="space-y-6">
                  <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest">Your Action Steps</h3>
                  <div className="space-y-4">
                    {[
                      { s: "Print this document", d: "Take 2 physical copies. One for submission, one for your own record." },
                      { s: "Add your Signature", d: "Sign at the bottom of the page. No notary is required for this specific filing." },
                      { s: "Submit to Authority", d: `Visit the nearest office of ${opponent || "the concerned department"} and hand it over.` },
                      { s: "Get an Acknowledgment", d: "Crucial: Ask them to stamp your 'Office Copy' with the date and receipt number." },
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{step.s}</h4>
                          <p className="text-sm text-slate-500">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm italic">
                    Note: This is a guide for self-representation. For complex criminal litigation, please consult a Legal Aid clinic.
                  </div>

                  <button 
                    onClick={resetApp}
                    className="w-full flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-100 transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Start New Application
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <footer className="mt-20 text-center space-y-4 opacity-50 px-4">
        <p className="text-xs max-w-lg mx-auto">
          Awaaz is a 100% anonymous platform. We do not store your personal details, IP address, or document content on our servers.
        </p>
        <div className="text-[10px] font-mono">
          BUILT FOR GOOD • AWAAZ PROJECT • v1.0.0
        </div>
      </footer>
    </main>
  );
}