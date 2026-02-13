// Category groups for North Macedonia – local & professional services (easier to find/pick)
export const categoryGroups = [
  {
    id: "food",
    labelKey: "catGroupFood",
    categories: ["food", "restaurant", "cafe", "bakery", "catering", "fastFood", "grocery", "butcher", "bar", "pastry"],
  },
  {
    id: "transport",
    labelKey: "catGroupTransport",
    categories: ["car", "carRepair", "carWash", "tires", "autoParts", "taxi", "drivingSchool", "towing"],
  },
  {
    id: "home",
    labelKey: "catGroupHome",
    categories: ["homeRepair", "plumbing", "electrical", "painting", "carpentry", "cleaning", "landscaping", "locksmith", "hvac", "moving"],
  },
  {
    id: "health",
    labelKey: "catGroupHealth",
    categories: ["health", "pharmacy", "dentist", "doctor", "clinic", "physiotherapy", "hairdresser", "barber", "beautySalon", "massage", "gym"],
  },
  {
    id: "education",
    labelKey: "catGroupEducation",
    categories: ["education", "tutoring", "languageSchool", "musicSchool", "privateLessons"],
  },
  {
    id: "professional",
    labelKey: "catGroupProfessional",
    categories: [
      "services",
      "lawyer",
      "accountant",
      "notary",
      "insurance",
      "realEstate",
      "photography",
      "printing",
      "translation",
      "architect",
      "taxAdvisor",
      "bookkeeping",
      "auditing",
      "businessConsulting",
      "hrRecruitment",
      "marketing",
      "copywriting",
      "graphicDesign",
      "videography",
      "consulting",
      "legalServices",
      "customsBroker",
    ],
  },
  {
    id: "tech",
    labelKey: "catGroupTech",
    categories: ["tech", "electronics", "phoneRepair", "computerRepair", "internet", "software"],
  },
  {
    id: "events",
    labelKey: "catGroupEvents",
    categories: ["entertainment", "events", "eventPlanning", "dj", "musician", "weddingVenue"],
  },
  {
    id: "other",
    labelKey: "catGroupOther",
    categories: ["clothing", "pets", "tailor", "laundry", "other", "otherServices"],
  },
];

// Flat list of all category ids (for backward compatibility and filtering)
export const categories = categoryGroups.flatMap((g) => g.categories);

// Icons for every category
export const categoryIcons = {
  food: "🍔",
  restaurant: "🍽️",
  cafe: "☕",
  bakery: "🥖",
  catering: "📦",
  fastFood: "🍟",
  grocery: "🛒",
  butcher: "🥩",
  bar: "🍺",
  pastry: "🧁",
  car: "🚗",
  carRepair: "🔧",
  carWash: "🚿",
  tires: "🛞",
  autoParts: "⚙️",
  taxi: "🚕",
  drivingSchool: "📜",
  towing: "🚛",
  homeRepair: "🧰",
  plumbing: "🔩",
  electrical: "⚡",
  painting: "🖌️",
  carpentry: "🪚",
  cleaning: "🧹",
  landscaping: "🌳",
  locksmith: "🔑",
  hvac: "❄️",
  moving: "📦",
  health: "💅",
  pharmacy: "💊",
  dentist: "🦷",
  doctor: "👨‍⚕️",
  clinic: "🏥",
  physiotherapy: "🦵",
  hairdresser: "💇",
  barber: "💈",
  beautySalon: "💄",
  massage: "💆",
  gym: "🏋️",
  education: "🎓",
  tutoring: "📚",
  languageSchool: "🌍",
  musicSchool: "🎵",
  privateLessons: "✏️",
  services: "💼",
  lawyer: "⚖️",
  accountant: "📊",
  notary: "📝",
  insurance: "🛡️",
  realEstate: "🏠",
  photography: "📷",
  printing: "🖨️",
  translation: "🌐",
  architect: "🏗️",
  taxAdvisor: "📋",
  bookkeeping: "📒",
  auditing: "🔍",
  businessConsulting: "💼",
  hrRecruitment: "👥",
  marketing: "📢",
  copywriting: "✍️",
  graphicDesign: "🎨",
  videography: "🎬",
  consulting: "🤝",
  legalServices: "⚖️",
  customsBroker: "📦",
  otherServices: "🔧",
  tech: "💻",
  electronics: "💡",
  phoneRepair: "📱",
  computerRepair: "🖥️",
  internet: "🌐",
  software: "📲",
  entertainment: "🎮",
  events: "🎟️",
  eventPlanning: "📅",
  dj: "🎧",
  musician: "🎸",
  weddingVenue: "💒",
  clothing: "👕",
  pets: "🐾",
  tailor: "🧵",
  laundry: "🧺",
  other: "✨",
};

export const countryCodes = [
  { name: "MK", code: "+389" },
  { name: "AL", code: "+355" },
  { name: "KS", code: "+383" },
  { name: "SR", code: "+381" },
  { name: "GR", code: "+30" },
  { name: "BG", code: "+359" },
  { name: "TR", code: "+90" },
  { name: "DE", code: "+49" },
  { name: "US", code: "+1" },
];

export const currencyOptions = ["EUR", "MKD"];

export const mkSpotlightCities = [
  "Skopje",
  "Tetovo",
  "Gostivar",
  "Ohrid",
  "Kumanovo",
  "Bitola",
  "Prilep",
  "Kichevo",
];

/** For 12-month plan: listing is "featured" (top of search, badge) only for the first N days; then stays live for remainder. */
export const FEATURED_DURATION_DAYS = 90; // 3 months

/** True if listing is in featured period (12-month plan, featuredUntil > now). */
export function isFeatured(listing) {
  return listing && String(listing.plan) === "12" && (!listing.featuredUntil || listing.featuredUntil > Date.now());
}

/** Sort listings so featured are first, then by createdAt descending. Use when storing or displaying the 250 verified pool. */
export function sortFeaturedFirst(listings) {
  const now = Date.now();
  return [...listings].sort((a, b) => {
    const aF = isFeatured(a) ? 1 : 0;
    const bF = isFeatured(b) ? 1 : 0;
    if (bF !== aF) return bF - aF;
    return (b.createdAt || 0) - (a.createdAt || 0);
  });
}

export const PLANS = [
  { id: "1", label: "1 Month", price: "3 EUR", duration: "30 days", priceVal: 3 },
  { id: "3", label: "3 Months", price: "6 EUR", duration: "90 days", priceVal: 6 },
  { id: "6", label: "6 Months", price: "10 EUR", duration: "180 days", priceVal: 10 },
  { id: "12", label: "12 Months", price: "14 EUR", duration: "365 days", priceVal: 14 },
];
