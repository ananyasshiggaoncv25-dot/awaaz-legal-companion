// app/legalData.ts

export const LANGUAGES = [
  { code: "en", name: "English" }, { code: "hi", name: "Hindi" }, { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" }, { code: "bn", name: "Bengali" }, { code: "mr", name: "Marathi" },
  { code: "gu", name: "Gujarati" }, { code: "kn", name: "Kannada" }, { code: "ml", name: "Malayalam" },
  { code: "pa", name: "Punjabi" }, { code: "ur", name: "Urdu" }, { code: "as", name: "Assamese" },
  { code: "or", name: "Odia" }, { code: "ks", name: "Kashmiri" }, { code: "kok", name: "Konkani" },
  { code: "mni", name: "Manipuri" }, { code: "ne", name: "Nepali" }, { code: "sd", name: "Sindhi" },
  { code: "sa", name: "Sanskrit" }, { code: "doi", name: "Dogri" }, { code: "mai", name: "Maithili" },
  { code: "sat", name: "Santhali" }, { code: "brx", name: "Bodo" }
];

export const LEGAL_CASES: Record<string, any[]> = {
  Youth: [
    { 
      id: "rti_exam", 
      title: { en: "RTI for Exam Papers", hi: "परीक्षा पेपर के लिए आरटीआई" },
      rights: ["Right to see evaluated scripts", "30-day response window"],
      flowchart: ["Draft Application", "Pay ₹10 Fee", "Submit to PIO", "Acknowledgment Receipt"],
      template: "I am writing to request my evaluated answer scripts for..."
    },
    // Add 100+ cases here following this structure
  ],
  Adult: [
    { 
      id: "wage_recovery", 
      title: { en: "Unpaid Salary Recovery", hi: "बकाया वेतन की वसूली" },
      rights: ["Payment of Wages Act 1936", "Interest on arrears"],
      flowchart: ["Demand Notice", "Labor Commissioner Visit", "Conciliation", "Legal Filing"],
      template: "This is a formal notice regarding the non-payment of my salary for the period of..."
    }
  ],
  Senior: [
    {
      id: "pension_delay",
      title: { en: "Delayed Pension", hi: "पेंशन में देरी" },
      rights: ["Right to Pension as Property", "Senior Citizens Act"],
      flowchart: ["Bank Branch Manager Letter", "Pension Ombudsman", "Tribunal Filing"],
      template: "I am a senior citizen writing to report the delay in my pension disbursement..."
    }
  ]
};