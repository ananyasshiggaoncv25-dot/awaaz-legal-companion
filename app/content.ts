// app/content.ts

export const LANG_GROUPS = [
  { region: "International", langs: [{ code: "en", name: "English" }] },
  { region: "Northern & Central", langs: [
    { code: "hi", name: "Hindi (हिन्दी)" }, { code: "ur", name: "Urdu (اردو)" }, 
    { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" }, { code: "ks", name: "Kashmiri (कأशुर)" },
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
    { code: "gu", name: "Gujarati (ગુજરાતી)" }, { code: "mr", name: "Marathi (मராठी)" },
    { code: "kok", name: "Konkani (कोंकणी)" }
  ]},
  { region: "Southern", langs: [
    { code: "ta", name: "Tamil (தமிழ்)" }, { code: "te", name: "Telugu (తెలుగు)" },
    { code: "kn", name: "Kannada (கன்னட)" }, { code: "ml", name: "Malayalam (മലയാളം)" }
  ]}
];

export const CONTENT_HUB: any = {
  en: {
    ui: {
      welcome: "Know Your Rights.",
      sub: "Completely anonymous legal assistance for Indian citizens. No login required.",
      selectLang: "Select Language",
      selectPersona: "Who are you?",
      searchPlh: "Search 100+ legal cases (e.g., 'salary', 'RTI', 'harassment')...",
      back: "Go Back",
      draft: "Draft Application",
      next: "Next Step",
      download: "Download PDF / Print"
    },
    cases: [
      { 
        id: "rti_1", 
        cat: "Youth", 
        title: "RTI for Scanned Answer Sheets", 
        rights: ["Right to see evaluated scripts (SC Ruling)", "Response within 30 days"], 
        flow: ["Draft RTI Application", "Pay ₹10 Postal Order", "Submit to PIO", "Wait for response"] 
      },
      { 
        id: "wage_1", 
        cat: "Adult", 
        title: "Recovery of Unpaid Salary", 
        rights: ["Payment of Wages Act 1936", "Interest on delayed payment"], 
        flow: ["Send Demand Notice", "Visit Labor Commissioner", "File Conciliation Case"] 
      },
      // You can add 100+ cases here
    ]
  },
  hi: {
    ui: {
      welcome: "अपने अधिकार जानें।",
      sub: "भारतीय नागरिकों के लिए पूरी तरह से गुमनाम कानूनी सहायता। कोई लॉगिन आवश्यक नहीं।",
      selectLang: "भाषा चुनें",
      selectPersona: "आप कौन हैं?",
      searchPlh: "100+ कानूनी मामलों की खोज करें...",
      back: "पीछे हटें",
      draft: "दस्तावेज़ तैयार करें",
      next: "अगला कदम",
      download: "PDF डाउनलोड / प्रिंट"
    },
    cases: [
      { 
        id: "rti_1", 
        cat: "Youth", 
        title: "परीक्षा पेपर के लिए आरटीआई (RTI)", 
        rights: ["मूल्यांकित कॉपियों को देखने का अधिकार", "30 दिनों के भीतर जवाब"], 
        flow: ["आरटीआई आवेदन ड्राफ्ट करें", "₹10 का पोस्टल ऑर्डर दें", "PIO को जमा करें"] 
      }
    ]
  }
  // Add other languages like ta, bn, te following the same structure
};