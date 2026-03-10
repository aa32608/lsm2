module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/lsm2/src/lib/queryClient.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "queryClient",
    ()=>queryClient
]);
// React Query configuration optimized for 20k+ listings
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            // Cache data for 5 minutes - balance between freshness and performance
            staleTime: 5 * 60 * 1000,
            // Keep unused data in cache for 15 minutes (optimized for memory)
            gcTime: 15 * 60 * 1000,
            // Retry failed requests once
            retry: 1,
            // Don't refetch on window focus - use cached data immediately
            refetchOnWindowFocus: false,
            // Don't refetch on reconnect - use cached data
            refetchOnReconnect: false,
            // Don't refetch on mount if data exists - use cached data
            refetchOnMount: false,
            // Use cached data immediately while fetching in background
            placeholderData: (previousData)=>previousData,
            // Network mode: prefer cached data, fetch in background
            networkMode: 'offlineFirst'
        },
        mutations: {
            // Retry mutations once
            retry: 1
        }
    }
});
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[project]/lsm2/src/firebase.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "createRecaptcha",
    ()=>createRecaptcha,
    "db",
    ()=>db,
    "default",
    ()=>__TURBOPACK__default__export__
]);
// src/firebase.js
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$app$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/app/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$database$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/database/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
;
;
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: "https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID
};
let app;
let auth;
let db;
// Initialize Firebase immediately when module loads (client-side only)
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    // SSR environment - create mock objects
    app = {};
    auth = {};
    db = {};
}
;
function createRecaptcha(containerId = "recaptcha-container") {
    if ("TURBOPACK compile-time truthy", 1) return null; // safety for SSR/build
    //TURBOPACK unreachable
    ;
}
const __TURBOPACK__default__export__ = app;
}),
"[project]/lsm2/src/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Category groups for North Macedonia – local & professional services (easier to find/pick)
__turbopack_context__.s([
    "FEATURED_DURATION_DAYS",
    ()=>FEATURED_DURATION_DAYS,
    "PLANS",
    ()=>PLANS,
    "categories",
    ()=>categories,
    "categoryGroups",
    ()=>categoryGroups,
    "categoryIcons",
    ()=>categoryIcons,
    "countryCodes",
    ()=>countryCodes,
    "currencyOptions",
    ()=>currencyOptions,
    "isFeatured",
    ()=>isFeatured,
    "mkSpotlightCities",
    ()=>mkSpotlightCities,
    "sortFeaturedFirst",
    ()=>sortFeaturedFirst
]);
const categoryGroups = [
    {
        id: "food",
        labelKey: "catGroupFood",
        categories: [
            "food",
            "restaurant",
            "cafe",
            "bakery",
            "catering",
            "fastFood",
            "grocery",
            "butcher",
            "bar",
            "pastry"
        ]
    },
    {
        id: "transport",
        labelKey: "catGroupTransport",
        categories: [
            "car",
            "carRepair",
            "carWash",
            "tires",
            "autoParts",
            "taxi",
            "drivingSchool",
            "towing"
        ]
    },
    {
        id: "home",
        labelKey: "catGroupHome",
        categories: [
            "homeRepair",
            "plumbing",
            "electrical",
            "painting",
            "carpentry",
            "cleaning",
            "landscaping",
            "locksmith",
            "hvac",
            "moving"
        ]
    },
    {
        id: "health",
        labelKey: "catGroupHealth",
        categories: [
            "health",
            "pharmacy",
            "dentist",
            "doctor",
            "clinic",
            "physiotherapy",
            "hairdresser",
            "barber",
            "beautySalon",
            "massage",
            "gym"
        ]
    },
    {
        id: "education",
        labelKey: "catGroupEducation",
        categories: [
            "education",
            "tutoring",
            "languageSchool",
            "musicSchool",
            "privateLessons"
        ]
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
            "customsBroker"
        ]
    },
    {
        id: "tech",
        labelKey: "catGroupTech",
        categories: [
            "tech",
            "electronics",
            "phoneRepair",
            "computerRepair",
            "internet",
            "software"
        ]
    },
    {
        id: "events",
        labelKey: "catGroupEvents",
        categories: [
            "entertainment",
            "events",
            "eventPlanning",
            "dj",
            "musician",
            "weddingVenue"
        ]
    },
    {
        id: "other",
        labelKey: "catGroupOther",
        categories: [
            "clothing",
            "pets",
            "tailor",
            "laundry",
            "other",
            "otherServices"
        ]
    }
];
const categories = categoryGroups.flatMap((g)=>g.categories);
const categoryIcons = {
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
    other: "✨"
};
const countryCodes = [
    {
        name: "MK",
        code: "+389"
    },
    {
        name: "AL",
        code: "+355"
    },
    {
        name: "KS",
        code: "+383"
    },
    {
        name: "SR",
        code: "+381"
    },
    {
        name: "GR",
        code: "+30"
    },
    {
        name: "BG",
        code: "+359"
    },
    {
        name: "TR",
        code: "+90"
    },
    {
        name: "DE",
        code: "+49"
    },
    {
        name: "US",
        code: "+1"
    }
];
const currencyOptions = [
    "EUR",
    "MKD"
];
const mkSpotlightCities = [
    "Skopje",
    "Tetovo",
    "Gostivar",
    "Ohrid",
    "Kumanovo",
    "Bitola",
    "Prilep",
    "Kichevo"
];
const FEATURED_DURATION_DAYS = 90; // 3 months
function isFeatured(listing) {
    return listing && String(listing.plan) === "12" && (!listing.featuredUntil || listing.featuredUntil > Date.now());
}
function sortFeaturedFirst(listings) {
    const now = Date.now();
    return [
        ...listings
    ].sort((a, b)=>{
        const aF = isFeatured(a) ? 1 : 0;
        const bF = isFeatured(b) ? 1 : 0;
        if (bF !== aF) return bF - aF;
        return (b.createdAt || 0) - (a.createdAt || 0);
    });
}
const PLANS = [
    {
        id: "1",
        label: "1 Month",
        price: "3 EUR",
        duration: "30 days",
        priceVal: 3
    },
    {
        id: "3",
        label: "3 Months",
        price: "6 EUR",
        duration: "90 days",
        priceVal: 6
    },
    {
        id: "6",
        label: "6 Months",
        price: "10 EUR",
        duration: "180 days",
        priceVal: 10
    },
    {
        id: "12",
        label: "12 Months",
        price: "14 EUR",
        duration: "365 days",
        priceVal: 14
    }
];
}),
"[project]/lsm2/src/hooks/useListings.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePrefetchListings",
    ()=>usePrefetchListings,
    "usePublicListings",
    ()=>usePublicListings,
    "useUserListings",
    ()=>useUserListings
]);
// React Query hooks for Firebase listings - optimized for 20k+ listings
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$database$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/database/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/database/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/constants.js [app-ssr] (ecmascript)");
;
;
;
;
function usePublicListings(initialData = []) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'listings',
            'public'
        ],
        queryFn: async ()=>{
            // Fallback fetch if no initial data (shouldn't happen with server fetch)
            const verifiedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'listings'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderByChild"])('status'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalTo"])('verified'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limitToLast"])(250));
            const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(verifiedQuery);
            const val = snapshot.val() || {};
            const arr = Object.entries(val).map(([id, data])=>({
                    id,
                    ...data
                }));
            // Filter expired listings
            const now = Date.now();
            const filtered = arr.filter((l)=>!l.expiresAt || l.expiresAt > now);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(filtered);
        },
        // Use initial data for instant loading (from server fetch)
        // Only use initialData if it has items, otherwise let React Query fetch
        initialData: initialData.length > 0 ? initialData : undefined,
        // Use cached data immediately while fetching (fallback)
        placeholderData: (previousData)=>previousData || (initialData.length > 0 ? initialData : undefined),
        // If no initial data, ensure React Query fetches
        enabled: true,
        // Cache settings optimized for large datasets
        staleTime: 5 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        // Don't refetch unnecessarily - server already provided data, real-time listener syncs updates
        // But if no initial data, we need to fetch on mount
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: initialData.length === 0
    });
}
function useUserListings(userId, initialData = []) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQuery"])({
        queryKey: [
            'listings',
            'user',
            userId
        ],
        queryFn: async ()=>{
            if (!userId) return [];
            const userQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'listings'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderByChild"])('userId'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalTo"])(userId));
            const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(userQuery);
            const val = snapshot.val() || {};
            const arr = Object.entries(val).map(([id, data])=>({
                    id,
                    ...data
                }));
            // Sort by creation date (newest first)
            arr.sort((a, b)=>(b.createdAt || 0) - (a.createdAt || 0));
            return arr;
        },
        enabled: !!userId,
        // Use initial data for instant loading
        initialData: initialData.length > 0 ? initialData : undefined,
        placeholderData: (previousData)=>previousData || initialData,
        // Cache settings
        staleTime: 3 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false
    });
}
function usePrefetchListings() {
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    return {
        prefetchPublicListings: ()=>{
            queryClient.prefetchQuery({
                queryKey: [
                    'listings',
                    'public'
                ],
                queryFn: async ()=>{
                    const verifiedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], 'listings'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderByChild"])('status'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalTo"])('verified'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limitToLast"])(250));
                    const snapshot = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(verifiedQuery);
                    const val = snapshot.val() || {};
                    const arr = Object.entries(val).map(([id, data])=>({
                            id,
                            ...data
                        }));
                    const now = Date.now();
                    const filtered = arr.filter((l)=>!l.expiresAt || l.expiresAt > now);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(filtered);
                }
            });
        }
    };
}
}),
"[project]/lsm2/src/translations.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// import { log } from "console";
__turbopack_context__.s([
    "TRANSLATIONS",
    ()=>TRANSLATIONS
]);
const TRANSLATIONS = {
    en: {
        // Cookie Consent
        cookieConsentText: "We use cookies to ensure you get the best experience on our website.",
        accept: "Accept",
        close: "Close",
        adBlocked: "Ads are blocked by your browser. Please consider supporting us by disabling your ad blocker.",
        maxImagesError: "Maximum 4 images allowed",
        // Sidebar
        quickStats: "Quick Stats",
        activeListings: "Active Listings",
        verifiedListings: "Verified Listings",
        publicListings: "Public Listings",
        noCommissions: "No Commissions",
        easyContact: "Easy Contact",
        ratingsReviews: "Ratings & Reviews",
        totalViews: "Total Views",
        joinCommunity: "Join Community",
        joinCommunityDesc: "Post your services and reach thousands of locals.",
        homepage: "Homepage",
        explore: "Explore",
        contactUs: "Contact Us",
        myListings: "My Listings",
        account: "Account",
        menu: "Menu",
        navigation: "Navigation",
        appName: "BizCall.mk",
        submitListing: "Submit Listing",
        login: "Login",
        logout: "Logout",
        loading: "Loading...",
        reportListing: "Report Listing",
        reportReason: "Report Reason",
        spam: "Spam",
        inappropriate: "Inappropriate Content",
        other: "Other",
        description: "Description",
        cancel: "Cancel",
        sendReport: "Send Report",
        reportSuccess: "Report submitted successfully",
        error: "Error",
        fillAllFields: "Please fill in all required fields",
        addPhoneInAccountSettings: "Please add a phone number in your account settings",
        enterValidPhone: "Please enter a valid phone number",
        listingCreatedSuccessFreeTrial: "Listing created successfully! Free trial activated.",
        redirectingToPayment: "Redirecting to payment...",
        support: "Support",
        contactSupport: "Contact Support",
        supportDesc: "Need help? We're here for you.",
        uploadAlt: "Upload",
        // Business Hours
        businessHours: "Business Hours",
        openNow: "Open Now",
        closed: "Closed",
        opensAt: "Opens at",
        closesAt: "Closes at",
        opensOn: "Opens on",
        // Quick Contact Form
        sendMessage: "Send Message",
        contactBusiness: "Contact Business",
        enterYourMessage: "Enter your message...",
        messageSentSuccessfully: "Message sent successfully!",
        errorSendingMessage: "Error sending message. Please try again.",
        // Enhanced Search Filters
        priceRange: "Price Range",
        minPrice: "Min Price",
        maxPrice: "Max Price",
        searchRadius: "Search Radius",
        anyDistance: "Any Distance",
        businessStatus: "Business Status",
        allBusinesses: "All Businesses",
        verifiedOnly: "Verified Only",
        // Post Listing Page
        basicInfo: "Basic Information",
        enterBusinessName: "Enter your business name",
        locationInfo: "Location Information",
        enterPhone: "Enter phone number",
        enterWebsite: "https://example.com",
        describeService: "Describe your service in detail...",
        pricing: "Pricing (Optional)",
        max4: "Max 4",
        uploadImages: "Upload Images",
        // General
        ",": ",",
        noMyListings: "You have no listings yet",
        myListingsSubtitle: "Manage your active and expired listings",
        exploreSubtitle: "Browse all verified listings in your area",
        saveChanges: "Save Changes",
        allRightsReserved: "All rights reserved.",
        madeWithLove: "Made with love in North Macedonia",
        version: "Version",
        build: "Build",
        cookiesPolicy: "Cookies Policy",
        differentEmailRequired: "Please enter a different email address",
        verifyCurrentEmailBeforeChange: "Please verify your current email address before changing it.",
        emailChangeRestricted: "Email change is not available for this account.",
        emailChangeFailed: "Email change failed. Please try again.",
        recentLoginRequired: "Please log out and log in again before changing your email.",
        emailEnumProtection: "Email changes are blocked by security settings.",
        phoneAlreadyInUse: "This phone number is already in use by another account.",
        reauthRequired: "Please log out and log in again to delete your account.",
        images: "Images",
        imagesMax4: "Images (Max 4)",
        uploadImages: "Upload Images",
        title: "BizCall MK",
        appName: "BizCall MK",
        bizcallLogo: "BizCall MK logo",
        previewAlt: "preview",
        close: "Close",
        welcome: "Welcome!",
        hello: "Hello",
        logout: "Log Out",
        loading: "Loading...",
        cancel: "Cancel",
        save: "Save",
        continue: "Continue",
        back: "Back",
        noListingsYet: "No listings available yet",
        signedOutAs: "Sign out",
        categories: "Categories",
        browseByCategory: "Browse by category",
        browseByCategoryHint: "Narrow your search by selecting a category below.",
        responsiveLayout: "Responsive layout",
        // Plans
        month1: "1 Month",
        month3: "3 Months",
        month6: "6 Months",
        month12: "12 Months",
        days30: "30 days",
        days90: "90 days",
        days180: "180 days",
        days365: "365 days",
        selectPlan: "Select Plan",
        planUpdated: "Plan updated successfully",
        plan1Month: "1 Month",
        plan3Months: "3 Months",
        plan6Months: "6 Months",
        plan12Months: "12 Months",
        planBasic: "Basic",
        planStandard: "Standard",
        planPro: "Pro",
        planPremium: "Premium",
        extendDescription: "Choose a plan to extend your listing duration.",
        getVisibleToLocalCustomers: "Get visible to local customers",
        findLocalService: "Find a service",
        featured: "Featured",
        featuredListingsGetMoreViews: "Featured listings get up to 3x more views.",
        featuredBenefitsTooltip: "Featured listings appear first in search, have a highlighted card, and get more visibility.",
        featuredCtaTitle: "Featured listing — Top of search",
        featuredCtaDesc: "12-month listing: featured for the first 3 months (top of search, highlighted badge, more views). Your listing stays live for all 12 months.",
        featuredCtaCta: "12 months total: 3 months featured, then 9 months standard",
        featuredPlanLabel: "12 months",
        featuredDurationNote: "Featured for first 3 months",
        extendListing: "Extend Listing",
        listingNeedsPayment: "This listing needs payment to be activated.",
        completePaymentToActivate: "Complete payment to activate your listing and make it visible to users.",
        completePayment: "Complete Payment",
        proceedToPayment: "Proceed to Payment",
        choosePayment: "Choose Payment",
        freeTrialActivated: "Free trial activated",
        // Currency / amounts
        eur: "EUR",
        sixMonths: "6 Months",
        twelveMonths: "12 Months",
        threeMonths: "3 Months",
        totalAmount: "Total amount",
        thankYou: "Thank you",
        // Account / profile
        accountSettings: "Account settings",
        listingDeletedSuccess: "Listing deleted successfully",
        deleteAccountConfirm: "Delete account",
        // Header / Navigation
        openDashboard: "Open Dashboard",
        closeDashboard: "Close Dashboard",
        myListings: "My Listings",
        account: "Account",
        explore: "Explore",
        homepage: "Home",
        community: "Community marketplace",
        primaryNav: "Primary navigation",
        // Hero / Landing
        heroTitle: "Find and share trustworthy services across North Macedonia",
        heroSubtitle: "From Skopje to Ohrid, discover locals who can help you today or showcase your own expertise.",
        quickStart: "Quick start",
        heroPanelTitle: "Post with confidence",
        heroPanelSubtitle: "Add your details, pick your plan, and let neighbours reach you with verified contact info.",
        heroPointOne: "Choose a category, city, and a short description.",
        heroPointTwo: "Verify your email or phone for extra trust.",
        heroPointThree: "Highlight your offer and duration to stay visible.",
        getMoreCallsForBusiness: "Get more calls for your business",
        heroPostCtaShort: "Post your listing",
        browseServicesCta: "Browse services",
        browseServicesHint: "Find a plumber, electrician, or any local service in your city.",
        exploreListingsCta: "Explore all listings",
        homepageReboot: "New responsive hub",
        ctaWatchDemo: "See the tour",
        mobileFirstTitle: "Responsive by default",
        mobileFirstSubtitle: "Layouts collapse gracefully on phones, tablets, and desktops.",
        growthBoardTitle: "Growth playbook",
        growthBoardSubtitle: "Get found faster",
        growthBoardHelper: "Three steps that keep your listing discoverable and above the fold.",
        trafficIdeasTitle: "Traffic ideas",
        trafficIdeasSubtitle: "Keep eyes on your listing",
        trafficIdeasTrending: "Trending carousel",
        trafficIdeasFeedback: "Collect replies",
        trafficIdeasFeedbackDesc: "Showcase reviews, tags, and verification for instant trust.",
        trafficIdeasLocal: "Local focus",
        trafficIdeasLocalDesc: "Use city and category chips to target nearby buyers.",
        growthStepPost: "Post today",
        growthStepPostDesc: "Launch with verified contact, city tag, and price window.",
        growthStepShare: "Share fast",
        growthStepRespond: "Respond anywhere",
        growthStepRespondDesc: "Compact cards and quick actions stay thumb-friendly on mobile.",
        phoneVerified: "Phone verified",
        mkRibbonTitle: "Made for North Macedonia",
        mkRibbonSubtitle: "Local-first layout, Macedonian-friendly language, and city shortcuts you know.",
        cityShortcuts: "Popular cities",
        categorySpotlight: "Popular categories",
        neighborhoodFriendly: "Neighbourhood-friendly navigation",
        exploreHeroTitle: "Explore trusted local listings",
        exploreHeroSubtitle: "Use quick filters to keep cards tidy and open details when you're ready.",
        city: "city",
        cities: "cities",
        todaySpotlight: "Today's spotlight board",
        spotlightHint: "A tight carousel of trusted listings that stays visible without endless scrolling.",
        homeDigest: "Live snapshot",
        // Form / Listings
        submitListing: "Submit Your Listing",
        browse: "Browse Listings",
        browseAllCategories: "All categories",
        name: "Business or Service Name",
        category: "Category",
        catGroupFood: "Food & Drinks",
        catGroupTransport: "Transport & Auto",
        catGroupHome: "Home & Garden",
        catGroupHealth: "Health & Beauty",
        catGroupEducation: "Education",
        catGroupProfessional: "Professional Services",
        catGroupTech: "Tech & Electronics",
        catGroupEvents: "Events & Entertainment",
        catGroupOther: "Other",
        location: "Location",
        description: "Description",
        contact: "Contact Phone",
        selectCategory: "Select category",
        verified: "Verified",
        selectCity: "Select city",
        // Legal & Account
        legal: "Legal",
        termsOfService: "Terms of Service",
        privacyPolicy: "Privacy Policy",
        readTerms: "Read our terms",
        readPrivacy: "Read our privacy policy",
        reportListing: "Report Listing",
        reportReason: "Reason for reporting",
        spam: "Spam",
        inappropriate: "Inappropriate Content",
        other: "Other",
        sendReport: "Submit Report",
        reportSuccess: "Listing reported. Thank you.",
        deleteAccount: "Delete Account",
        dangerZoneDesc: "Irreversible account actions",
        deleteAccountWarning: "Once you delete your account, there is no going back. Please be certain.",
        deleteAccountConfirm: "Are you sure you want to delete your account? This action cannot be undone and will remove all your listings.",
        editProfile: "Edit Profile",
        updateProfile: "Update Profile",
        displayName: "Display Name",
        profileUpdated: "Profile updated successfully",
        accountDeleted: "Your account has been deleted",
        dangerZone: "Danger Zone",
        report: "Report",
        locationExtra: "Town / village / neighborhood (optional)",
        chooseOnMap: "Choose on map",
        locationSetTo: "Location set to",
        // Filters / Search
        search: "Search",
        searchPlaceholder: "Search by name or description...",
        filterByCategory: "Filter by category",
        allCategories: "All categories",
        filterByLocation: "Filter by location",
        allLocations: "All locations",
        sortBy: "Sort by",
        sortTopRated: "Highest rated",
        sortNewest: "Newest",
        sortExpiring: "Expiring soon",
        sortAZ: "A → Z",
        resultsSummary: "Sorted by rating with trimmed descriptions for easy scanning.",
        refineResults: "Refine results",
        filterHelper: "Narrow down by name, city, category, or sort preference.",
        resetFilters: "Reset filters",
        quickFilters: "Quick filters",
        showFilters: "Show filters",
        hideFilters: "Hide filters",
        menu: "Menu",
        filters: "Filters",
        filterSubtitle: "Refine your search",
        favoritesOnly: "Favorites only",
        language: "Language",
        activeFilters: "Active filters",
        closeFilters: "Close filters",
        clearAll: "Clear all",
        clearSearch: "Clear search",
        clearFilters: "Clear all filters",
        switchToListView: "Switch to list view",
        switchToGridView: "Switch to grid view",
        switchToGrid: "Switch to grid view",
        switchToList: "Switch to list view",
        gridView: "Grid View",
        listView: "List View",
        noListingsFound: "No listings found",
        tryAdjustingFilters: "Try adjusting your filters to see more results.",
        searchListings: "Search listings",
        addFavorite: "Add to favorites",
        removeFavorite: "Remove from favorites",
        viewListing: "View listing",
        removeCategoryFilter: "Remove category filter",
        removeLocationFilter: "Remove location filter",
        clearAllFilters: "Clear All Filters",
        previous: "Previous",
        next: "Next",
        pagination: "Pagination",
        sidebar: "Sidebar",
        loadingListings: "Loading listings",
        tryDifferentFilters: "Try adjusting your search or filters to find more listings.",
        noListingsAvailable: "There are currently no listings available.",
        verifiedListingsLabel: "verified listings",
        pendingListingsLabel: "pending listings",
        totalListingsLabel: "total listings",
        searchYourListings: "Search your listings...",
        searchYourListingsLabel: "Search your listings",
        toggleFilters: "Toggle filters",
        newListing: "New Listing",
        createYourFirstListing: "Create Your First Listing",
        noListingsYetDescription: "Start by creating your first listing!",
        noListingsMatchFiltersDescription: "Try adjusting your filters to see more results.",
        yourListings: "Your listings",
        removeSearchFilter: "Remove search filter",
        removeStatusFilter: "Remove status filter",
        removeExpiryFilter: "Remove expiry filter",
        categoryLabel: "Category",
        locationLabel: "Location",
        ratingStars: "stars",
        feedbackCountLabel: "feedback",
        engagementLabel: "Engagement",
        listingIdLabel: "Listing ID",
        additionalActions: "Additional actions",
        emailListingOwner: "Email listing owner",
        copyContactInfo: "Copy contact information",
        deleteListing: "Delete listing",
        listing: "listing",
        listingsLabel: "listings",
        resultsLabel: "Results",
        resultsPerPage: "Per page",
        previousPage: "Previous page",
        nextPage: "Next page",
        // Authentication
        login: "Login",
        signup: "Sign Up",
        sendVerifyLink: "Send Verification Link",
        email: "Email Address",
        password: "Password",
        phoneNumber: "Phone Number",
        confirmPassword: "Confirm Password",
        loginWithEmail: "Login with Email Link",
        sendLink: "Send Login Link",
        enterCode: "Enter verification code",
        verificationCode: "Verification Code",
        verifyPhone: "Verify Phone Number",
        codeSent: "Code sent successfully!",
        verifying: "Verifying...",
        loginSuccess: "Login successful!",
        signupSuccess: "Account created successfully!",
        invalidCredentials: "Invalid email or password.",
        passwordMismatch: "Passwords do not match.",
        enterValidEmail: "Please enter a valid email.",
        enterValidPhone: "Please enter a valid phone number.",
        resendCode: "Resend Code",
        authOptional: "Authentication (Optional)",
        signedIn: "Signed in",
        signedUp: "Signed up",
        signedOut: "Signed out",
        emailLinkSent: "Email link sent",
        loginRequired: "Please log in to post a listing.",
        verifyEmailFirst: "Please verify your email before posting.",
        enterEmail: "Please provide your email for confirmation",
        addPhoneInAccount: "Please add your phone number in your account first.",
        contactAutofill: "We use your account phone for trust and safety.",
        favorites: "Favorites",
        goToAccount: "Go to account",
        phoneSynced: "Using your account phone number.",
        contactEditLocked: "Phone number can't be changed here. Update it in Account settings.",
        plan: "Plan",
        postingReady: "Posting ready",
        postingReadyHint: "Listings reuse your saved phone number and location for faster posting.",
        useAccountPhone: "Use account phone",
        signInWithPhone: "Phone Number",
        loginSubtitle: "Access your BizCall account to explore and manage listings.",
        signupSubtitle: "Create your BizCall account to post and contact local businesses.",
        createAccount: "Create account",
        // PayPal / Payments (Removed)
        // Dashboard / Data
        dashboard: "Dashboard",
        profile: "Profile",
        updateProfile: "Update Profile",
        transactions: "Transactions",
        transactionHistory: "Transaction History",
        noTransactions: "No transactions yet.",
        viewDetails: "View Details",
        amount: "Amount",
        date: "Date",
        status: "Status",
        success: "Success",
        failed: "Failed",
        pending: "Pending",
        pendingVerification: "Pending Verification",
        pendingPayment: "Pending Payment",
        // Errors / Messages
        errorOccured: "An error occurred. Please try again later.",
        fillAllFields: "Please fill in all required fields.",
        invalidCode: "Invalid verification code.",
        networkError: "Network error. Check your connection.",
        error: "Error:",
        // Listing actions
        edit: "Edit",
        extend: "Extend",
        del: "Delete",
        deleteListing: "Delete listing",
        call: "Call",
        emailAction: "Email",
        copy: "Copy",
        copied: "Copied to clipboard",
        listedOn: "Listed on",
        quickFacts: "Quick facts",
        pricing: "Pricing",
        pricingIntro: "Choose how long you want your listing to stay active on BizCall MK. Longer plans are more cost-effective and keep your service visible for more time.",
        pricingPlan1Point1: "Ideal for testing BizCall MK or short campaigns.",
        pricingPlan1Point2: "Your listing stays active for 30 days.",
        pricingPlan3Point1: "Better value for seasonal or medium-term services.",
        pricingPlan3Point2: "Keep your listing live for a full 3 months.",
        pricingPlan6Point1: "Great for stable, ongoing local services.",
        pricingPlan6Point2: "Lower monthly cost compared to short plans.",
        pricingPlan12Point1: "Best long-term visibility: your listing stays active for a full year.",
        pricingPlan12Point2: "Featured for the first 3 months — top of search and highlighted badge.",
        pricingPlan12Point3: "Then remains a standard active listing for the remaining 9 months.",
        pricingPaymentMethodsTitle: "Payments & billing",
        pricingPaymentMethodsText: "Listing fees are one-time charges in EUR for the selected duration. Payments are processed securely through Whop. There are no automatic renewals or recurring subscriptions.",
        pricingRefundsTitle: "Refunds & cancellations",
        pricingRefundsText: "Because BizCall MK provides access to a digital listing service, payments are generally non-refundable once your listing is activated. If you believe you were charged in error, contact us and we will review your case.",
        pricingPlatformNoteTitle: "About this platform",
        pricingPlatformNoteText: "BizCall MK is a local services marketplace. We connect people looking for services with local providers; we do not sell the services ourselves and are not a party to the contract between customers and providers.",
        contactEmail: "Contact email",
        reputation: "Reputation",
        communityFeedback: "Community feedback",
        ratingLabel: "Your rating",
        commentPlaceholderDetailed: "Share your experience, notes, or questions for the owner.",
        saveFeedback: "Save feedback",
        feedbackSaved: "Feedback saved",
        feedbackSaveError: "Could not save feedback right now.",
        deleteReview: "Delete review",
        deleteReviewConfirm: "Delete this review?",
        reviewDeleted: "Review deleted.",
        cannotDeleteReview: "You cannot delete this review.",
        feedbackDeleteError: "Failed to delete review.",
        cannotLeaveFeedbackOnInactive: "You can only leave feedback on active, paid listings.",
        noFeedback: "No feedback yet",
        noFeedbackYet: "No feedback yet. Be the first to review!",
        recentFeedback: "Recent feedback",
        cloudFeedbackNote: "Ratings and comments are stored securely so everyone can see them.",
        averageRating: "Average rating",
        reviews: "reviews",
        shareListing: "Share listing",
        shareHint: "Share your listing with neighbours to collect feedback and boost visibility.",
        updateListing: "Refresh one listing",
        statusLabel: "Status",
        locationLabelFull: "Location",
        feedbackSidebarBlurb: "Ratings and notes help everyone see the most trusted listings.",
        expires: "Expires",
        months: "month/s",
        allListingsHint: "View and filter all verified listings on the platform.",
        expiringSoon: "Expiring soon",
        expired: "Expired",
        day: "day",
        days: "days",
        remaining: "left",
        noExpiry: "No expiration",
        view: "View",
        views: "Views",
        totalViews: "Total views",
        allStatuses: "All statuses",
        allExpiry: "All",
        active: "Active",
        sortOldest: "Oldest first",
        noListingsMatchFilters: "No listings match your filters. Try adjusting your search.",
        food: "Food & Groceries",
        restaurant: "Restaurants",
        cafe: "Cafés & Coffee",
        bakery: "Bakeries",
        catering: "Catering",
        fastFood: "Fast Food",
        grocery: "Grocery Stores",
        butcher: "Butchers",
        bar: "Bars & Pubs",
        pastry: "Pastry & Sweets",
        car: "Car Sales & Services",
        carRepair: "Car Repair",
        carWash: "Car Wash",
        tires: "Tires & Wheels",
        autoParts: "Auto Parts",
        taxi: "Taxi",
        drivingSchool: "Driving Schools",
        towing: "Towing",
        homeRepair: "Home Repair & Maintenance",
        plumbing: "Plumbing",
        electrical: "Electrical Services",
        painting: "Painting & Decorating",
        carpentry: "Carpentry",
        cleaning: "Cleaning Services",
        landscaping: "Landscaping & Gardening",
        locksmith: "Locksmith",
        hvac: "HVAC & Heating",
        moving: "Moving & Relocation",
        health: "Health & Wellness",
        pharmacy: "Pharmacies",
        dentist: "Dentists",
        doctor: "Doctors",
        clinic: "Clinics",
        physiotherapy: "Physiotherapy",
        hairdresser: "Hairdressers",
        barber: "Barbers",
        beautySalon: "Beauty Salons",
        massage: "Massage",
        gym: "Gyms & Fitness",
        education: "Education & Training",
        tutoring: "Tutoring",
        languageSchool: "Language Schools",
        musicSchool: "Music Schools",
        privateLessons: "Private Lessons",
        services: "General Professional Services",
        lawyer: "Lawyers",
        accountant: "Accountants",
        notary: "Notaries",
        insurance: "Insurance",
        realEstate: "Real Estate",
        photography: "Photography",
        printing: "Printing",
        translation: "Translation Services",
        architect: "Architects",
        taxAdvisor: "Tax Advisors",
        bookkeeping: "Bookkeeping",
        auditing: "Auditing",
        businessConsulting: "Business Consulting",
        hrRecruitment: "HR & Recruitment",
        marketing: "Marketing",
        copywriting: "Copywriting",
        graphicDesign: "Graphic Design",
        videography: "Videography",
        consulting: "Consulting",
        legalServices: "Legal Services",
        customsBroker: "Customs Broker",
        tech: "IT & Software",
        electronics: "Electronics",
        phoneRepair: "Phone Repair",
        computerRepair: "Computer Repair",
        internet: "Internet & ISP",
        software: "Software Development",
        entertainment: "Entertainment",
        events: "Events & Venues",
        eventPlanning: "Event Planning",
        dj: "DJs",
        musician: "Musicians",
        weddingVenue: "Wedding Venues",
        clothing: "Clothing & Accessories",
        pets: "Pets",
        tailor: "Tailors & Alterations",
        laundry: "Laundry & Dry Cleaning",
        other: "Other",
        otherServices: "Other Services (not listed)",
        // Cities (North Macedonia – display in filters; value stored in DB unchanged)
        Skopje: "Skopje",
        Tetovo: "Tetovo",
        Gostivar: "Gostivar",
        Kumanovo: "Kumanovo",
        Bitola: "Bitola",
        Ohrid: "Ohrid",
        Prilep: "Prilep",
        Veles: "Veles",
        Kavadarci: "Kavadarci",
        Strumica: "Strumica",
        Kochani: "Kochani",
        Shtip: "Shtip",
        Debar: "Debar",
        Kichevo: "Kichevo",
        Struga: "Struga",
        Radovish: "Radovish",
        Gevgelija: "Gevgelija",
        Negotino: "Negotino",
        "Sveti Nikole": "Sveti Nikole",
        Delchevo: "Delchevo",
        Vinica: "Vinica",
        Berovo: "Berovo",
        Probishtip: "Probishtip",
        Kratovo: "Kratovo",
        Krushevo: "Krushevo",
        Valandovo: "Valandovo",
        Resen: "Resen",
        "Makedonski Brod": "Makedonski Brod",
        "Makedonska Kamenica": "Makedonska Kamenica",
        Pehcevo: "Pehcevo",
        "Kriva Palanka": "Kriva Palanka",
        "Demir Kapija": "Demir Kapija",
        Bogdanci: "Bogdanci",
        "Demir Hisar": "Demir Hisar",
        enterPhone: "Please enter your phone number",
        enterName: "Please enter your name",
        agreeTo: "I agree to the",
        and: "and",
        mustAgreeToTerms: "You must agree to the Terms of Service and Privacy Policy.",
        loginToPost: "Please log in to post a listing",
        mustLoginToCreate: "You must be logged in to create a listing",
        stepBasic: "Basic",
        stepDetails: "Details",
        stepPlanPreview: "Plan & Preview",
        offerPriceLabel: "Offer price range (optional)",
        minPrice: "Min",
        maxPrice: "Max",
        tagsPlaceholder: "Tags, comma-separated (optional)",
        socialPlaceholder: "Social / Website (optional)",
        previewTitlePlaceholder: "Your Business Name",
        previewDescriptionPlaceholder: "A short description appears here...",
        priceRangePlaceholder: "Price range (e.g. 500 - 800 MKD)",
        tagsShortPlaceholder: "Tags (optional)",
        socialShortPlaceholder: "Social / Website",
        uploadCoverLocal: "Upload cover (local)",
        emailLabel: "Email",
        verifiedLabel: "Verified",
        yes: "Yes",
        no: "No",
        resendVerificationEmail: "Resend verification email",
        verificationSent: "Verification email sent — check your inbox.",
        verificationError: "Error sending verification:",
        emailLoginSignup: "Email login / signup",
        emailTab: "Email",
        priceLabel: "Price",
        tagsLabel: "Tags",
        websiteLabel: "Website",
        cityLabel: "City",
        areaLabel: "Area",
        manageListings: "Manage Listings",
        accountSince: "Account created",
        accountTitle: "Account",
        accountSubtitle: "Manage your login status, verification and security settings.",
        accountLoginDescription: "Login to manage your profile and account settings.",
        updateProfileDesc: "Update your public profile information",
        displayNamePlaceholder: "Enter your display name",
        confirmDeleteAccount: "Are you sure you want to delete your account? This cannot be undone.",
        enterPasswordToConfirm: "Please enter your password to confirm:",
        deleteAccountError: "Could not delete account",
        loginToViewAccount: "Please login to view your account",
        errorSendingCode: "Error sending verification code",
        userAvatar: "User avatar",
        securitySettings: "Security & login",
        securitySettingsText: "Update your email and password to keep your account safe.",
        changeEmail: "Change email",
        newEmail: "New email",
        newEmailPlaceholder: "Enter new email",
        currentPassword: "Current password",
        currentPasswordPlaceholder: "Enter current password",
        saveEmail: "Save email",
        changePassword: "Change password",
        newPassword: "New password",
        newPasswordPlaceholder: "Enter new password",
        repeatNewPassword: "Repeat new password",
        repeatNewPasswordPlaceholder: "Repeat new password",
        savePassword: "Save password",
        saving: "Saving...",
        favorite: "Favorite",
        emailChangeNotAvailable: "Email change is not available for this account.",
        emailUpdateSuccess: "Email updated successfully.",
        emailUpdateError: "Could not update email.",
        passwordTooShort: "Password must be at least 8 characters and include at least 2 numbers.",
        passwordRequirement: "At least 8 characters and 2 numbers",
        passwordsDontMatch: "New passwords do not match.",
        passwordChangeNotAvailable: "Password change is not available for this account.",
        passwordUpdateSuccess: "Password updated successfully.",
        passwordUpdateError: "Could not update password.",
        enterCurrentPassword: "Please enter your current password.",
        myListingsHint: "Manage, edit and extend your listings.",
        priceRangeLabel: "Price range",
        tagsFieldLabel: "Tags",
        websiteFieldLabel: "Website / Social link",
        websitePlaceholder: "Paste a link (optional)",
        coverImage: "Cover image",
        nameFieldHint: "Short title for your service (e.g. Plumber in Skopje).",
        categoryFieldHint: "Pick the category that best matches what you offer.",
        locationFieldHint: "City and optional area so clients can find you.",
        descriptionFieldHint: "Describe your service and what you offer. Be clear and concise.",
        priceRangeFieldHint: "Optional. Set a range so clients know what to expect.",
        tagsFieldHint: "Optional. Comma-separated keywords (e.g. urgent, weekend).",
        socialLinkFieldHint: "Optional. Link to your Facebook, Instagram, or website.",
        imagesFieldHint: "Up to 4 images. First image is shown as the main one.",
        // Form Field Placeholders
        namePlaceholder: "e.g. Sunny Cafe & Bakery",
        descriptionPlaceholder: "Tell people about your services, experience, and what makes you special...",
        clickToUpload: "Click to upload images",
        priceRange: "Price Range",
        tags: "Tags",
        socialLink: "Social Link",
        // NEW: Sharing & trust
        share: "Share",
        shareText: "Shared from BizCall MK",
        shareCopied: "Listing link copied to clipboard ✅",
        shareNotSupported: "This device does not support sharing.",
        whyTrustUs: "Why BizCall MK?",
        trustPoint1: "All listings are manually reviewed before they are verified.",
        trustPoint2: "Direct contact with businesses, with no hidden commissions or fees.",
        trustPoint3: "Built for cities across North Macedonia, with a focus on local businesses.",
        trustPoint4: "Option to report suspicious or abusive listings.",
        verifyYourEmail: "Verify your email",
        verifyEmailHint: "We sent a verification link to your inbox. You can keep browsing, but you can’t submit listings until you verify.",
        resendEmail: "Resend email",
        verifyLater: "Verify later",
        verifying: "Checking…",
        emailVerified: "Email verified!",
        notVerifiedYet: "Still not verified. Check your inbox (and spam) and try again.",
        verifyFootnote: "Tip: it can take a minute. If you used a wrong email, log out and sign up again.",
        iVerified: "I verified",
        phoneLoginSubtitle: "Log in quickly with an SMS code on your phone.",
        unspecified: "Unspecified",
        map: "Map",
        openInMaps: "Open in Maps",
        postedOn: "Posted on",
        locationDetails: "Location details",
        aboutListing: "About this listing",
        quickActions: "Quick actions",
        // Home section - simplified
        homeSimpleTitle: "Find a handyman, seller or service in your city",
        homeSimpleCtaPostBenefit: "Get more calls for your business",
        homeSimpleCtaBrowseBenefit: "Get visible to local customers",
        localBusinessesJoiningBizCall: "Local Businesses Are Joining BizCall",
        overViews: "Over {{count}} views",
        overContactAttempts: "Over {{count}} contacting attempts",
        homeTopFeaturedTitle: "Top featured listings",
        homeTopFeaturedSubtitle: "Listings benefiting from BizCall — views & contacts",
        lastMonth: "Last month",
        thisMonth: "This month",
        chartAmount: "Amount",
        viewsCount: "{{count}} views",
        callsMessagesEmails: "{{count}} calls/messages/emails",
        listingPerformingAboveAverage: "Performing above your average ({{pct}}%)",
        listingPerformingBelowAverage: "Underperforming vs your average ({{pct}}%)",
        listingPerformingAverage: "Performing around your average",
        listingExpiresInDays: "Your listing expires in {{days}} days. Renew for €2 to keep getting clients.",
        renewNow: "Renew now",
        listingPausedRenewToReactivate: "Your listing is paused. Renew to reactivate.",
        trustNoCommissions: "No commissions",
        trustDirectContact: "Direct contact with customers",
        trustCancelAnytime: "Cancel anytime",
        trustLocalPlatform: "Trusted local platform in North Macedonia",
        contactByPhone: "Calls",
        contactByEmail: "Emails",
        contactByWhatsapp: "WhatsApp",
        homeSimpleSubtitle: "Post a small ad with your phone number and city, or quickly search what others offer.",
        homeSimpleCtaPost: "Post an ad",
        homeSimpleCtaBrowse: "Browse ads",
        homeSimpleTrustLine: "No commissions, you talk directly by phone or Viber.",
        homePopularCategoriesTitle: "Most used categories",
        homePopularCitiesTitle: "Popular cities",
        homeHowItWorksTitle: "How it works",
        homeHowItWorksStep1: "Post an ad with your phone, city and short description.",
        homeHowItWorksStep2: "People call you or write on Viber / WhatsApp.",
        homeHowItWorksStep3: "They leave ratings so others know who is trusted.",
        step: "Step",
        mainActions: "Main actions",
        popularCategories: "Popular categories",
        whyChooseUs: "Why Choose BizCall MK?",
        verifiedListingsDesc: "All listings are verified for authenticity and trustworthiness.",
        noCommissionsDesc: "Connect directly with service providers. No middleman, no fees.",
        easyContactDesc: "Contact listings directly via phone, WhatsApp, or email.",
        ratingsReviewsDesc: "Read reviews from real users to make informed decisions.",
        // Payment notifications (return from payment provider)
        paymentSuccess: "Payment successful. Your listing was published.",
        paymentSuccessfulListingActivated: "Payment successful. Your listing was published.",
        paymentFailed: "Payment failed. Your listing is saved in My Listings.",
        listingExtendedSuccess: "Listing extended successfully!",
        listingExtendedSuccessfully: "Listing extended successfully!",
        paymentSucceededButListingUpdateFailed: "Payment succeeded but listing update failed. Please contact support.",
        listingSavedButPaymentFailed: "Listing saved but payment failed. Please try again from My Listings.",
        youMustBeLoggedIn: "You must be logged in.",
        listingCreatedSuccess: "Listing created successfully!",
        listingSavedUnpaid: "Listing saved but payment failed. Please try again from My Listings.",
        redirectingToPayment: "Redirecting to payment...",
        paymentTimeout: "Payment request timed out. Please try again.",
        paymentSuccessPageTitle: "Payment complete",
        paymentSuccessPageBody: "Your listing is being activated and will appear in search shortly.",
        paymentFailedPageTitle: "Payment didn't go through",
        paymentFailedPageBody: "No charges were made. Your listing is saved — try again from My Listings when you're ready.",
        viewMyListings: "View My Listings",
        // Login/Signup notifications
        loginSuccess: "Login successful! Welcome back.",
        signupSuccess: "Account created successfully! Please verify your email.",
        loginError: "Login failed. Please check your credentials.",
        signupError: "Signup failed. Please try again.",
        userNotFound: "No account found with this email address.",
        wrongPassword: "Incorrect password. Please try again.",
        tooManyAttempts: "Too many failed attempts. Please try again later.",
        networkError: "Network error. Please check your connection.",
        // Other notifications
        listingDeleted: "Listing deleted successfully.",
        listingUpdated: "Listing updated successfully.",
        profileUpdated: "Profile updated successfully.",
        // New keys added
        commentEmptyError: "Comment cannot be empty",
        trustSafetyLane: "Trust & Safety lane",
        trustSafetyLaneDesc: "Keep conversations secure with verified contacts, transparent pricing, and a consistent city tag.",
        localMissions: "Local missions",
        localMissionsDesc: "Rotate through weekly prompts to keep your profile fresh and boost visibility in the spotlight rail.",
        spotlightHintHero: "Track momentum, stay verified, and guide neighbours toward your best offers without digging through menus.",
        submitListingDesc: "Post, verify contact info, and publish in minutes.",
        exploreHint: "Search by category, price, and location for quick matches.",
        verifiedHint: "Keep trust high with verified profiles and plans.",
        browseMarketplace: "Browse the marketplace",
        postService: "Post a service",
        updateListingHint: "Add a new tag or price range to appear in curated lanes.",
        shareLinkHint: "Send your listing link to neighbours and collect feedback.",
        pickCityChip: "Pick a city chip to get discovered faster.",
        getStartedFast: "Get started fast",
        preview: "Preview",
        currency: "Currency",
        listingCreatedSuccessFreeTrial: "Listing created successfully! Free trial activated.",
        zeroEur: "0 EUR",
        loadingMap: "Loading Map...",
        bizCall: "BizCall",
        emailSameAsCurrent: "Please enter a different email address",
        verifyCurrentEmailFirst: "Please verify your current email address before changing it.",
        emailUpdateSuccessVerify: "Email updated successfully! Please check your new email for verification.",
        passwordIncorrect: "Incorrect password. Please try again.",
        browseListings: "Browse Listings",
        createListing: "Create Listing",
        // Phone Login
        loginPhoneSubtitle: "Login with your phone number for quick access.",
        otpSent: "OTP sent to your phone number.",
        otpError: "Failed to send OTP",
        enterOtp: "Please enter the OTP sent to your phone.",
        otpVerifyError: "Invalid OTP. Please try again.",
        sendCode: "Send OTP Code",
        verifyAndLogin: "Verify OTP and Login",
        codeSent: "Verification code sent successfully.",
        invalidCode: "Invalid verification code. Please try again.",
        // Listing Details & Feedback
        listingNotFound: "Listing not found",
        errorLoadingListing: "Error loading listing",
        loadingListing: "Loading listing...",
        clickToEnlarge: "Click to enlarge",
        noImageAvailable: "No image available",
        previousImage: "Previous image",
        nextImage: "Next image",
        imageThumbnails: "Image thumbnails",
        viewImage: "View image",
        thumbnail: "Thumbnail",
        openWhatsApp: "Open WhatsApp chat",
        sendEmail: "Send email",
        additionalInfo: "Additional Information",
        expiresOn: "Expires On",
        daysLeft: "days left",
        noDescription: "No description provided.",
        yourRating: "Your Rating",
        selectRating: "Select rating",
        star: "star",
        stars: "stars",
        yourReview: "Your Review",
        reviewComment: "Review comment",
        writeFeedback: "Write a review...",
        submitting: "Submitting...",
        loginToReview: "Login to leave a review",
        anonymous: "Anonymous",
        fullSizeImageViewer: "Full size image viewer",
        closeImageViewer: "Close image viewer",
        fullSize: "Full size",
        likes: "Likes",
        basedOn: "based on",
        onlinePresence: "Online Presence",
        writeReviewPlaceholder: "Share your experience with this listing...",
        submitReview: "Submit Review",
        noFeedbackYet: "No feedback yet. Be the first to review!",
        whatsapp: "WhatsApp",
        sending: "Sending...",
        phone: "Phone",
        phonePlaceholder: "70 123 456",
        verificationCodePlaceholder: "123456",
        signupNameLabel: "Name",
        reviewRestrictedSignin: "⚠️ Reviewing is restricted. You must be signed in to leave feedback.",
        reviewRestrictedVerified: "⚠️ Only verified users who haven't reviewed this listing yet can leave feedback.",
        communityTagline: "Trusted local services",
        browseListingsHint: "Browse all listings",
        createListingHint: "Create a new listing",
        // Free Trial
        freeTrialAvailable: "Free Trial Available!",
        freeTrialDesc: "Select the 1 Month plan to get your first month completely free.",
        freeFor1Month: "1 month free",
        freeTrialEndsIn: "Offer ends in",
        freeTrialCountdown: "Time left for free offer",
        hours: "h",
        minutes: "min",
        seconds: "sec",
        free: "FREE",
        manageListingsHint: "Manage everything in one place",
        reviewsLabel: "Reviews",
        memberSince: "Member since",
        profileInfo: "Profile Information",
        accountDetails: "Your account details",
        updateEmailDesc: "Update your email address",
        addPhoneNumber: "Add phone number",
        subscriptionUpdated: "Subscription updated successfully!",
        errorUpdatingSubscription: "Error updating subscription",
        emailSubscription: "Email Subscription",
        subscribeToWeeklyEmails: "Subscribe to weekly emails",
        phoneUpdated: "Phone number updated successfully!",
        errorUpdatingPhone: "Error updating phone number:",
        passwordRequired: "Password is required for this action.",
        changePhone: "Change phone number",
        newPhone: "New phone number",
        savePhone: "Save phone",
        expiry: "Expiry",
        resultsLabel: "results",
        removeFilter: "Remove filter",
        listingDeleted: "Listing deleted",
        notSignedIn: "Not signed in.",
        saveSuccess: "Saved successfully!",
        sendingCode: "Sending code...",
        verifying: "Verifying...",
        verifyCode: "Verify Code",
        phoneAlreadyInUse: "This phone number is already in use by another account.",
        phoneAlreadyInUseTitle: "Phone number already in use",
        invalidPhone: "Invalid phone number.",
        errorOccurred: "An error occurred.",
        copiedToClipboard: "Copied to clipboard!",
        shareVia: "Share via",
        loginToSeeMore: "Login to see more",
        noAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        forgotPassword: "Forgot password?",
        resetPassword: "Reset password",
        passwordResetEmailSent: "Password reset email sent. Check your inbox.",
        passwordResetError: "Failed to send password reset email. Please try again.",
        enterEmailForReset: "Please enter your email address first.",
        terms: "Terms",
        privacy: "Privacy",
        emailUpdated: "Email updated successfully",
        phoneUpdated: "Phone number updated successfully",
        emailRequired: "Email is required.",
        phoneRequired: "Phone number is required.",
        passwordRequired: "Password is required.",
        invalidEmail: "Invalid email address.",
        unauthorized: "Unauthorized access.",
        forbidden: "Forbidden access.",
        sessionExpired: "Session expired. Please login again.",
        loadingMore: "Loading more...",
        noMoreData: "No more data to load.",
        searchNoResults: "No results found for your search.",
        somethingWentWrong: "Something went wrong. Please try again.",
        somethingWentWrongTitle: "Something went wrong.",
        apologizeInconvenience: "We apologize for the inconvenience. Please try refreshing the page.",
        refreshPage: "Refresh Page",
        tryAgain: "Try again",
        goBack: "Go back",
        pageNotFound: "Page not found.",
        pageNotFoundTitle: "404 - Page Not Found",
        pageNotFoundDescription: "The page you are looking for does not exist or has been moved.",
        goHome: "Go Home",
        closeNotification: "Close notification",
        advertisement: "Advertisement",
        loginToSubmitListing: "Login to submit listing",
        home: "Home",
        dashboard: "Dashboard",
        settings: "Settings",
        profile: "Profile",
        security: "Security",
        notifications: "Notifications",
        help: "Help",
        faq: "FAQ",
        contactUs: "Contact",
        contactDescription: "Have a question or feedback? We'd love to hear from you!",
        contactFormSuccess: "Thank you! Your message has been sent successfully.",
        contactFormError: "Sorry, there was an error sending your message. Please try again.",
        sendMessage: "Send Message",
        sending: "Sending...",
        contactAlternative: "Alternatively, you can reach us at:",
        contactAlternativeTitle: "Other Ways to Reach Us",
        newMessage: "New Message",
        contactFormSubmission: "New contact form submission",
        from: "from",
        noSubject: "No subject",
        contactFormFooter: "This email was sent from the contact form on bizcall.mk",
        enterName: "Enter your name",
        enterEmail: "Enter your email",
        subject: "Subject",
        message: "Message",
        enterSubject: "Enter subject",
        enterMessage: "Enter your message",
        termsOfService: "Terms of Service",
        reviewNotificationSubject: "New review for your listing",
        reviewNotificationText: "Hi, someone just left a review for your listing.",
        reviewNotificationComment: "Comment",
        reviewNotificationCheck: "Check it out here",
        seoTitle: "BizCall - Local Services",
        seoDescription: "Find and share trusted local services across North Macedonia",
        seoKeywords: "local services, marketplace, North Macedonia, Skopje, Tetovo",
        page: "Page",
        of: "of",
        exploreSubtitle: "Find and share trusted local services across North Macedonia",
        allCities: "All cities",
        privacyPolicy: "Privacy Policy",
        cookiesPolicy: "Cookies Policy",
        allRightsReserved: "All rights reserved.",
        madeWithLove: "Made with love in North Macedonia",
        version: "Version",
        build: "Build",
        // Added/Refined keys
        differentEmailRequired: "Please enter a different email address",
        verifyCurrentEmailBeforeChange: "Please verify your current email address before changing it.",
        addPhoneInAccountSettings: "Add your phone in account settings first.",
        createListing: "Create listing",
        browseListings: "Browse listings",
        emailChangeRestricted: "⚠️ Email change is restricted by Firebase. Your new email has been saved in your profile, but you'll need to sign out and sign in with your new email address. Alternatively, contact support to enable email changes in Firebase Console.",
        reviewRestrictedSignin: "⚠️ Review restricted. You must be signed in to leave feedback.",
        reviewRestrictedVerified: "⚠️ Only verified users who haven't reviewed this listing yet can leave feedback.",
        emailChangeFailed: "Email change failed. Firebase has restricted email changes. Please contact support or check Firebase Console > Authentication > Settings.",
        emailInUse: "This email is already in use by another account.",
        recentLoginRequired: "Please log out and log back in before changing your email.",
        emailEnumProtection: "Email changes are blocked by 'Email Enumeration Protection' in Firebase. To fix: Install Google Cloud SDK, then run: gcloud identity-platform settings update --project=YOUR_PROJECT_ID --disable-email-enum. Or check Firebase Console > Authentication > Settings for email enumeration protection settings.",
        previousPage: "Previous page",
        nextPage: "Next page",
        callAction: "Call",
        share: "Share",
        day: "day",
        days: "days",
        all: "All",
        allCategories: "All Categories",
        allLocations: "All Locations",
        any: "Any",
        confirmDelete: "Are you sure you want to delete this listing?",
        emailAction: "Email",
        shareAction: "Share",
        websiteLabel: "Website",
        unspecified: "Unspecified",
        notOwner: "You are not the owner of this listing.",
        verifyEmailFirst: "Please verify your email first.",
        saveSuccess: "Changes saved successfully!",
        // Plans
        month1: "1 Month",
        month3: "3 Months",
        month6: "6 Months",
        month12: "12 Months",
        days30: "30 days",
        days90: "90 days",
        days180: "180 days",
        days365: "365 days",
        selectPlan: "Select Plan",
        planBasic: "Basic",
        planStandard: "Standard",
        planPro: "Pro",
        planPremium: "Premium",
        extendDescription: "Choose a plan to extend your listing duration.",
        freeTrialAvailable: "Free Trial Available!",
        freeTrialDesc: "Select the 1 Month plan to get your first month completely free.",
        free: "FREE",
        // Legal Modals
        termsLastUpdated: "Last Updated:",
        termsIntro: "Welcome to BizCall MK. By using our app, you agree to these terms.",
        terms1Title: "1. Acceptance of Terms",
        terms1Text: "By accessing and using this service, you accept and agree to be bound by the terms and provisions of this agreement.",
        terms2Title: "2. User Conduct",
        terms2Text: "You agree to use the service only for lawful purposes. You are responsible for all content you post.",
        terms2List1: "No spam or deceptive content.",
        terms2List2: "No illegal goods or services.",
        terms2List3: "No harassment or hate speech.",
        terms3Title: "3. Listing Rules",
        terms3Text: "We reserve the right to remove any listing that violates our policies without refund.",
        terms4Title: "4. Liability",
        terms4Text: "BizCall is a platform connecting users. We are not responsible for the quality of services provided by users.",
        terms5Title: "5. Termination",
        terms5Text: "We may terminate your access to the site, without cause or notice.",
        terms6Title: "6. Service Modifications",
        terms6Text: "BizCall MK reserves the right to modify or discontinue the service with or without notice to the user.",
        terms7Title: "7. Limitation of Liability",
        terms7Text: "We are not liable for any damages that may occur to you as a result of your use of our website.",
        terms8Title: "8. Contact",
        terms8Text: "For any questions regarding these terms, please contact us.",
        terms3List1: "All payments are processed securely through our payment provider (Whop).",
        terms3List2: "Payment information is handled according to industry security standards by the payment provider.",
        terms3List3: "Refunds and cancellations for listing fees are handled according to our listing policies and, where applicable, the payment provider's terms.",
        terms3List4: "We reserve the right to verify payment transactions and may require additional verification",
        terms3List5: "All prices are displayed in the selected currency and are final at the time of purchase",
        terms3List6: "For payment disputes, please contact our support team or refer to the payment provider's dispute resolution process.",
        terms4List1: "We use Google Ads to display relevant advertisements on our platform",
        terms4List2: "Google may use cookies and tracking technologies to show personalized ads",
        terms4List3: "You can manage your ad preferences through Google's Ad Settings",
        terms4List4: "We are not responsible for the content of third-party advertisements",
        terms4List5: "Advertisements are clearly marked and separated from our content",
        terms4List6: "We comply with Google Ads policies and guidelines",
        terms5List1: "We use Google Search Console to monitor and improve our website's search performance",
        terms5List2: "Our website is indexed by Google and other major search engines",
        terms5List3: "We follow Google's Webmaster Guidelines and best practices",
        terms5List4: "Listings may appear in search engine results to help users find services",
        terms5List5: "We implement structured data and schema markup for better search visibility",
        terms5List6: "Our sitemap is submitted to Google Search Console for efficient crawling",
        terms2TextNew: "Users are responsible for the accuracy of their listings. You agree not to post content that is illegal, offensive, or fraudulent.",
        terms2List1New: "Maintain accurate contact information",
        terms2List2New: "Respect intellectual property rights",
        terms2List3New: "Do not engage in spam or harassment",
        terms3TextNew: "BizCall MK uses a secure third-party payment processor. By making a payment, you agree to:",
        terms4TextNew: "BizCall MK displays advertisements through Google Ads. By using our service, you acknowledge:",
        terms5TextNew: "BizCall MK is optimized for search engines and uses Google Search Console for website management:",
        privacyLastUpdated: "Last Updated:",
        privacyIntro: "Your privacy is important to us. This policy explains how we treat your data.",
        privacy1Title: "1. Information We Collect",
        privacy1Text: "We collect information you provide directly to us, such as email address, phone number, and listing details.",
        privacy2Title: "2. How We Use Information",
        privacy2Text: "We use your information to operate and improve our services, facilitate payments, and communicate with you.",
        privacy3Title: "3. Data Sharing",
        privacy3Text: "We do not sell your personal data. We may share data with service providers (e.g. Firebase) to operate the app.",
        privacy4Title: "4. Your Rights",
        privacy4Text: "You have the right to access, update, or delete your personal information at any time through your account settings.",
        privacy5Title: "5. Contact",
        privacy5Text: "If you have questions about this policy, please contact us.",
        privacy6Title: "6. Your Rights",
        privacy6Text: "You have the right to:",
        privacy7Title: "7. Contact",
        privacy7Text: "For privacy-related questions or concerns, please contact us.",
        privacy1TextNew: "We collect information you provide directly to us, such as when you create an account, post a listing, or contact us. This includes:",
        privacy1List1: "Account information (name, email, phone number)",
        privacy1List2: "Listing information (descriptions, images, location, pricing)",
        privacy1List3: "Payment information processed securely through our payment provider (Whop)",
        privacy1List4: "Usage data and analytics through Google Search Console",
        privacy1List5: "Cookies and tracking technologies for Google Ads",
        privacy2TextNew: "We use the information we collect to:",
        privacy2List1: "Operate, maintain, and improve our services",
        privacy2List2: "Process payments securely through our payment provider (Whop)",
        privacy2List3: "Display relevant advertisements through Google Ads",
        privacy2List4: "Optimize our website for search engines using Google Search Console",
        privacy2List5: "Communicate with you about your account and listings",
        privacy2List6: "Analyze usage patterns and improve user experience",
        privacy3TextNew: "We work with trusted third-party services:",
        privacy3List1: "Payment provider (Whop): We share payment information with Whop to process listing fees securely. Payment data is handled according to the provider's security standards.",
        privacy3List2: "Google Ads: We use Google Ads to display advertisements. Google may use cookies and collect data for ad personalization. You can opt out through Google's Ad Settings.",
        privacy3List3: "Google Search Console: We use Google Search Console to monitor website performance and search visibility. This helps us improve our services and ensure listings are discoverable.",
        privacy3List4: "Firebase: We use Firebase for authentication and database services, which processes your account and listing data securely.",
        privacy4TextNew: "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access. This includes:",
        privacy4List1: "Encrypted data transmission (HTTPS/SSL)",
        privacy4List2: "Secure payment processing through our payment provider (Whop)",
        privacy4List3: "Firebase security rules and authentication",
        privacy4List4: "Regular security audits and updates",
        privacy5TextNew: "We use cookies and similar technologies:",
        privacy5List1: "Essential Cookies: Required for website functionality and authentication",
        privacy5List2: "Analytics Cookies: Used to understand how visitors interact with our website through Google Search Console and analytics",
        privacy5List3: "Advertising Cookies: Used by Google Ads to show relevant advertisements and measure ad effectiveness",
        privacy5List4: "You can control cookies through your browser settings or Google's Ad Settings for advertising preferences",
        essentialCookies: "Essential Cookies",
        analyticsCookies: "Analytics Cookies",
        advertisingCookies: "Advertising Cookies",
        privacy6List1: "Access and update your personal information",
        privacy6List2: "Delete your account and associated data",
        privacy6List3: "Opt out of personalized advertising through Google Ad Settings",
        privacy6List4: "Request information about data we collect and how it's used",
        privacy6List5: "Contact us with privacy concerns or questions",
        // Missing keys added
        namePlaceholder: "Enter listing title",
        titlePlaceholder: "Enter listing title",
        descriptionPlaceholder: "Describe your service...",
        clickToUpload: "Click to upload images",
        priceRange: "Price Range",
        tags: "Tags",
        socialLink: "Social Link",
        phoneLogin: "Phone Login",
        phoneLoginTitle: "Login with Phone",
        phoneLoginSubtitle: "We'll send a 6-digit code to verify your number.",
        sendCode: "Send Code",
        sending: "Sending...",
        enterOtp: "Enter Code",
        verifyOtp: "Verify & Login",
        verifyingOtp: "Verifying...",
        otpSentTo: "Code sent to",
        changeNumber: "Change number",
        onlinePresence: "Online Presence",
        writeReviewPlaceholder: "Write a review...",
        submitReview: "Submit Review",
        whatsapp: "WhatsApp",
        callNow: "Call Now",
        emailNow: "Email Now",
        visitWebsite: "Visit Website",
        maximize: "Maximize",
        loginPhoneSubtitle: "Login with your phone number for quick access.",
        otpSent: "OTP sent to your phone number.",
        otpError: "Failed to send OTP",
        enterOtp: "Please enter the OTP sent to your phone.",
        otpVerifyError: "Invalid OTP. Please try again.",
        verifyAndLogin: "Verify OTP and Login"
    },
    sq: {
        // Sidebar
        quickStats: "Statistika të shpejta",
        activeListings: "Listimet aktive",
        verifiedListings: "Listimet e Verifikuara",
        publicListings: "Listimet Publike",
        noCommissions: "Pa Komisione",
        easyContact: "Kontakt i Lehtë",
        ratingsReviews: "Vlerësime dhe Recensione",
        totalViews: "Shikimet totale",
        joinCommunity: "Bashkohuni me Komunitetin",
        joinCommunityDesc: "Postoni shërbimet tuaja dhe arrini mijëra vendas.",
        support: "Mbështetje",
        contactSupport: "Kontaktoni Mbështetjen",
        supportDesc: "Keni nevojë për ndihmë? Jemi këtu për ju.",
        uploadAlt: "Ngarko",
        // Cookie Consent
        verified: "I verifikuar",
        pending: "Në pritje",
        closeFilters: "Mbyll filtrat",
        close: "Mbyll",
        filterSubtitle: "Rafino kërkimin tënd",
        clearSearch: "Pastro kërkimin",
        status: "Statusi",
        allStatuses: "Të gjitha statuset",
        allExpiry: "Të gjitha",
        active: "Aktiv",
        sortTopRated: "Më të vlerësuarat",
        sortNewest: "Më të rejat",
        sortExpiring: "Skadon së shpejti",
        sortAZ: "A → Z",
        contactEditLocked: "Numri i telefonit nuk mund të ndryshohet këtu. Përditësojeni në cilësimet e llogarisë.",
        goToAccount: "Shko te llogaria",
        priceRangeLabel: "Gama e çmimit",
        tagsFieldLabel: "Etiketat",
        tagsPlaceholder: "Etiketa, të ndara me presje (opsionale)",
        websiteFieldLabel: "Website / Link social",
        websitePlaceholder: "Ngjitni një link (opsionale)",
        communityTagline: "Shërbime lokale të besuara",
        reviewsLabel: "Vlerësime",
        cookieConsentText: "Ne përdorim cookies për të siguruar që të merrni përvojën më të mirë në faqen tonë të internetit.",
        accept: "Prano",
        maxImagesError: "Maksimumi 4 imazhe të lejuara",
        completePayment: "Plotësoni pagesën",
        legal: "Ligjore",
        readTerms: "Lexoni Kushtet",
        readPrivacy: "Lexoni Privatësinë",
        plan: "Plan",
        pendingPayment: "Pagesë në pritje",
        noFeedbackYet: "Ende pa reagime",
        agreeTo: "Pajtohem me",
        and: "dhe",
        mustAgreeToTerms: "Duhet të pajtoheni me Kushtet dhe Politikanë e Privatësisë.",
        namePlaceholder: "Emri i biznesit",
        descriptionPlaceholder: "Përshkrimi i shkurtër",
        clickToUpload: "Klikoni për të ngarkuar",
        priceRange: "Gama e çmimit",
        tags: "Etiketa",
        socialLink: "Linku social",
        onlinePresence: "Prania online",
        writeReviewPlaceholder: "Shkruani vlerësimin tuaj...",
        submitReview: "Dërgo vlerësimin",
        titlePlaceholder: "Emri i biznesit",
        phoneLogin: "Hyrje me telefon",
        phoneLoginTitle: "Verifikimi me telefon",
        verifyOtp: "Verifiko kodin",
        verifyingOtp: "Duke verifikuar...",
        otpSentTo: "Kodi u dërgua në",
        changeNumber: "Ndrysho numrin",
        whatsapp: "WhatsApp",
        callNow: "Telefono tani",
        emailNow: "Dërgo email tani",
        editProfile: "Ndrysho profilin",
        deleteAccountConfirm: "Konfirmoni fshirjen e llogarisë",
        // Business Hours
        businessHours: "Orari i Punës",
        openNow: "Hapur Tani",
        closed: "Mbyllur",
        opensAt: "Hapet në",
        closesAt: "Mbyllet në",
        opensOn: "Hapet në",
        // Quick Contact Form
        sendMessage: "Dërgo Mesazh",
        contactBusiness: "Kontakto Biznesin",
        enterYourMessage: "Shkruani mesazhin tuaj...",
        messageSentSuccessfully: "Mesazhi u dërgua me sukses!",
        errorSendingMessage: "Gabim në dërgim. Provo përsëri.",
        // Enhanced Search Filters
        priceRange: "Qmimi i Varion",
        minPrice: "Qmimi Minimal",
        maxPrice: "Qmimi Maksimal",
        searchRadius: "Rrethi i Kërkimit",
        anyDistance: "Çdo distancë",
        businessStatus: "Statusi i Biznesit",
        allBusinesses: "Të gjitha Bizneset",
        verifiedOnly: "Vetëm të Verifikuara",
        // Verification Badge
        verified: "I verifikuar",
        pending: "Në pritje",
        unverified: "I paverifikuar",
        // General
        ",": ",",
        noMyListings: "Nuk keni asnjë listim ende",
        myListingsSubtitle: "Menaxhoni listimet tuaja aktive dhe të skaduara",
        exploreSubtitle: "Shfletoni të gjitha listimet e verifikuara në zonën tuaj",
        saveChanges: "Ruaj Ndryshimet",
        reauthRequired: "Ju lutemi dilni dhe hyni përsëri për të fshirë llogarinë tuaj.",
        images: "Imazhe",
        imagesMax4: "Imazhe (Maksimumi 4)",
        uploadImages: "Ngarko Imazhe",
        title: "BizCall MK",
        appName: "BizCall MK",
        bizcallLogo: "Logo BizCall",
        previewAlt: "parapamje",
        close: "Mbyll",
        welcome: "Mirë se erdhët!",
        hello: "Përshëndetje",
        logout: "Dil",
        loading: "Duke u ngarkuar...",
        cancel: "Anulo",
        save: "Ruaj",
        continue: "Vazhdo",
        back: "Kthehu",
        noListingsYet: "Ende nuk ka listime",
        signedOutAs: "Dil",
        categories: "Kategori",
        browseByCategory: "Shfletoni sipas kategorisë",
        browseByCategoryHint: "Zushtroni kërkimin duke zgjedhur një kategori më poshtë.",
        responsiveLayout: "Pamje responsive",
        // Plans
        month1: "1 Muaj",
        month3: "3 Muaj",
        month6: "6 Muaj",
        month12: "12 Muaj",
        days30: "30 ditë",
        days90: "90 ditë",
        days180: "180 ditë",
        days365: "365 ditë",
        selectPlan: "Zgjidhni Planin",
        planUpdated: "Plani u përditësua me sukses",
        plan1Month: "1 Muaj",
        plan3Months: "3 Muaj",
        plan6Months: "6 Muaj",
        plan12Months: "12 Muaj",
        planBasic: "Bazë",
        planStandard: "Standard",
        planPro: "Pro",
        planPremium: "Premium",
        extendDescription: "Zgjidhni një plan për të zgjatur kohëzgjatjen e listimit tuaj.",
        getVisibleToLocalCustomers: "Bëhuni i dukshëm për klientët lokalë",
        findLocalService: "Gjeni një shërbim lokal",
        getMoreCallsForBusiness: "Merrni më shumë thirrje për biznesin tuaj",
        heroPostCtaShort: "Postoni listimin tuaj",
        browseServicesCta: "Shfletoni shërbimet",
        browseServicesHint: "Gjeni një hidraulik, elektricist ose çdo shërbim lokal në qytetin tuaj.",
        exploreListingsCta: "Eksploroni të gjitha listimet",
        featured: "E Veçuar",
        featuredListingsGetMoreViews: "Listimet e veçuara marrin deri në 3x më shumë shikime.",
        featuredBenefitsTooltip: "Listimet e veçuara shfaqen së pari në kërkim, kanë kartë të theksuar dhe marrin më shumë dukshmëri.",
        featuredCtaTitle: "Listim i veçuar — Krye i kërkimit",
        featuredCtaDesc: "Listim 12 muaj: i veçuar për 3 muajt e parë (krye i kërkimit, badge, më shumë shikime). Listimi mbetet aktiv për të gjithë 12 muajt.",
        featuredCtaCta: "12 muaj gjithsej: 3 muaj të veçuar, pastaj 9 muaj standard",
        featuredPlanLabel: "12 muaj",
        featuredDurationNote: "I veçuar për 3 muajt e parë",
        extendListing: "Zgjat Listimin",
        listingNeedsPayment: "Ky listim ka nevojë për pagesë për t'u aktivizuar.",
        completePaymentToActivate: "Plotësoni pagesën për të aktivizuar listimin tuaj dhe për ta bërë të dukshëm për përdoruesit.",
        proceedToPayment: "Vazhdo te Pagesa",
        choosePayment: "Zgjidhni pagesën",
        freeTrialActivated: "Prova falas u aktivizua",
        sixMonths: "6 Muaj",
        twelveMonths: "12 Muaj",
        threeMonths: "3 Muaj",
        totalAmount: "Shuma totale",
        thankYou: "Faleminderit",
        accountSettings: "Cilësimet e llogarisë",
        listingDeletedSuccess: "Listimi u fshi me sukses",
        visitWebsite: "Vizitoni faqen",
        maximize: "Maksimizo",
        category: "Kategoria",
        catGroupFood: "Ushqim & Pije",
        catGroupTransport: "Transport & Auto",
        catGroupHome: "Shtëpi & Kopsht",
        catGroupHealth: "Shëndet & Bukuri",
        catGroupEducation: "Edukim",
        catGroupProfessional: "Shërbime Profesionale",
        catGroupTech: "Teknologji & Elektronikë",
        catGroupEvents: "Ngjarje & Argëtim",
        catGroupOther: "Të tjera",
        location: "Vendndodhja",
        contact: "Telefoni i Kontaktit",
        login: "Hyr",
        email: "Adresa e Email-it",
        password: "Fjalëkalimi",
        food: "Ushqim & Pije",
        restaurant: "Restorante",
        cafe: "Kafe & Kafe",
        bakery: "Furra",
        catering: "Catering",
        fastFood: "Ushqim i shpejtë",
        grocery: "Dyqane ushqimore",
        butcher: "Mishnori",
        bar: "Bare & Pube",
        pastry: "Ëmbëlsira",
        car: "Makina & Shërbime",
        carRepair: "Riparime makina",
        carWash: "Larje makina",
        tires: "Goma & Rrota",
        autoParts: "Pjesë makina",
        taxi: "Taksi",
        drivingSchool: "Shkolla të drejtimit",
        towing: "Tërheqje",
        homeRepair: "Riparime & Mirëmbajtje shtëpie",
        plumbing: "Instalime uji",
        electrical: "Shërbime elektrike",
        painting: "Bojë & Dekorim",
        carpentry: "Druar",
        cleaning: "Shërbime pastrimi",
        landscaping: "Kopshtari & Peizazh",
        locksmith: "Bravar",
        hvac: "Ngrohje & Ftohje",
        moving: "Transfer & Relokim",
        health: "Shëndet & Bukuri",
        pharmacy: "Farmaci",
        dentist: "Dentistë",
        doctor: "Mjekë",
        clinic: "Klinika",
        physiotherapy: "Fizioterapi",
        hairdresser: "Parukier",
        barber: "Berber",
        beautySalon: "Salone bukurie",
        massage: "Masazh",
        gym: "Palaestra & Fitnes",
        education: "Edukim & Trajnim",
        tutoring: "Mësim privat",
        languageSchool: "Shkolla gjuhësh",
        musicSchool: "Shkolla muzike",
        privateLessons: "Mësime private",
        services: "Shërbime profesionale të përgjithshme",
        lawyer: "Avokatë",
        accountant: "Kontabilistë",
        notary: "Noterë",
        insurance: "Sigurime",
        realEstate: "Pasuri të paluajtshme",
        photography: "Fotografi",
        printing: "Printim",
        translation: "Shërbime përkthimi",
        architect: "Arkitektë",
        taxAdvisor: "Këshilltarë tatimore",
        bookkeeping: "Kontabilitet",
        auditing: "Auditim",
        businessConsulting: "Këshillim biznesi",
        hrRecruitment: "Burime njerëzore & Rekrutim",
        marketing: "Marketing",
        copywriting: "Shkrim reklamash",
        graphicDesign: "Dizajn grafik",
        videography: "Videografi",
        consulting: "Këshillim",
        legalServices: "Shërbime ligjore",
        customsBroker: "Agjent doganore",
        tech: "IT & Software",
        electronics: "Elektronikë",
        phoneRepair: "Riparime telefoni",
        computerRepair: "Riparime kompjuteri",
        internet: "Internet & ISP",
        software: "Zhvillim software",
        entertainment: "Argëtim",
        events: "Ngjarje & Vende",
        eventPlanning: "Planifikim ngjarjesh",
        dj: "DJ",
        musician: "Muzikantë",
        weddingVenue: "Vende dasmash",
        clothing: "Veshje & Aksesorë",
        pets: "Kafshë shtëpiake",
        tailor: "Rrobaqepës & Alterime",
        laundry: "Larje & Pastrim të thatë",
        other: "Të tjera",
        otherServices: "Shërbime të tjera (jo të listuara)",
        // Cities (North Macedonia)
        Skopje: "Shkup",
        Tetovo: "Tetovë",
        Gostivar: "Gostivar",
        Kumanovo: "Kumanovë",
        Bitola: "Manastir",
        Ohrid: "Ohër",
        Prilep: "Prilep",
        Veles: "Veles",
        Kavadarci: "Kavadarci",
        Strumica: "Strumicë",
        Kochani: "Koçani",
        Shtip: "Shtip",
        Debar: "Dibër",
        Kichevo: "Kërçovë",
        Struga: "Strugë",
        Radovish: "Radovisht",
        Gevgelija: "Gevgjelijë",
        Negotino: "Negotinë",
        "Sveti Nikole": "Shën Nikolla",
        Delchevo: "Dellçevë",
        Vinica: "Vinicë",
        Berovo: "Berovë",
        Probishtip: "Probishtip",
        Kratovo: "Kratovë",
        Krushevo: "Krushevë",
        Valandovo: "Valandovë",
        Resen: "Resen",
        "Makedonski Brod": "Brod",
        "Makedonska Kamenica": "Kamenicë",
        Pehcevo: "Pehçevë",
        "Kriva Palanka": "Kriva Palankë",
        "Demir Kapija": "Demir Kapia",
        Bogdanci: "Bogdanci",
        "Demir Hisar": "Demir Hisar",
        // Header / Navigation
        openDashboard: "Hap Panelin",
        closeDashboard: "Mbyll Panelin",
        myListings: "Listimet e mia",
        account: "Llogaria",
        explore: "Eksploro",
        homepage: "Kreu",
        community: "Marketplace i komunitetit",
        primaryNav: "Navigimi kryesor",
        // Hero / Landing
        heroTitle: "Gjej dhe shpërndaj shërbime të besueshme në gjithë Maqedoninë",
        heroSubtitle: "Nga Shkupi në Ohër, gjej vendas që të ndihmojnë sot ose prezanto aftësitë e tua.",
        quickStart: "Nis shpejt",
        heroPanelTitle: "Posto me besim",
        heroPanelSubtitle: "Shto detajet, zgjidh planin dhe lejo fqinjët të të kontaktojnë me të dhënat e verifikuara.",
        heroPointOne: "Zgjidh kategorinë, qytetin dhe një përshkrim të shkurtër.",
        heroPointTwo: "Verifiko emailin ose telefonin për më shumë besim.",
        heroPointThree: "Thekso ofertën dhe kohëzgjatjen për të mbetur i dukshëm.",
        homepageReboot: "Qendër e re responsive",
        ctaWatchDemo: "Shiko turin",
        mobileFirstTitle: "Responsive që në fillim",
        mobileFirstSubtitle: "Pamjet përshtaten bukur në telefona, tableta dhe desktop.",
        growthBoardTitle: "Plani i rritjes",
        growthBoardSubtitle: "Gjej më shpejt",
        growthBoardHelper: "Tre hapa që e mbajnë listimin të dukshëm dhe mbi pjesën kryesore.",
        trafficIdeasTitle: "Ide trafiku",
        trafficIdeasSubtitle: "Mbaj sytë mbi listimin",
        trafficIdeasTrending: "Karusel trendi",
        trafficIdeasFeedback: "Mblidh reagime",
        trafficIdeasFeedbackDesc: "Shfaq vlerësime, etiketa dhe verifikim për besim të menjëhershëm.",
        trafficIdeasLocal: "Fokus lokal",
        trafficIdeasLocalDesc: "Përdor qytetet dhe kategoritë për të synuar blerësit pranë teje.",
        growthStepPost: "Posto sot",
        subscriptionUpdated: "Abonimi u përditësua me sukses!",
        errorUpdatingSubscription: "Gabim gjatë përditësimit të abonimit",
        emailSubscription: "Abonimi me email",
        subscribeToWeeklyEmails: "Abonohu në email-et javore",
        phoneUpdated: "Numri i telefonit u përditësua me sukses!",
        errorUpdatingPhone: "Gabim gjatë përditësimit të numrit të telefonit:",
        phoneVerified: "Telefoni u verifikua",
        passwordRequired: "Fjalëkalimi kërkohet për këtë veprim.",
        changePhone: "Ndrysho numrin e telefonit",
        newPhone: "Numri i ri i telefonit",
        savePhone: "Ruaj telefonin",
        expiry: "Skadimi",
        resultsLabel: "rezultate",
        removeFilter: "Hiq filtrin",
        aboutListing: "Rreth këtij listimi",
        accountDetails: "Detajet e llogarisë tuaj",
        accountSince: "Anëtar që nga",
        accountSubtitle: "Menaxhoni statusin tuaj, verifikimin dhe sigurinë.",
        accountLoginDescription: "Hyni për të menaxhuar profilin dhe cilësimet e llogarisë.",
        updateProfileDesc: "Përditësoni informacionin e profilit tuaj publik",
        displayNamePlaceholder: "Shkruani emrin tuaj të shfaqur",
        confirmDeleteAccount: "Jeni të sigurt që dëshironi të fshini llogarinë tuaj? Kjo nuk mund të zhbëhet.",
        enterPasswordToConfirm: "Ju lutemi shkruani fjalëkalimin tuaj për të konfirmuar:",
        deleteAccountError: "Nuk mund të fshihej llogaria",
        loginToViewAccount: "Ju lutemi hyni për të parë llogarinë tuaj",
        errorSendingCode: "Gabim gjatë dërgimit të kodit të verifikimit",
        userAvatar: "Avatar i përdoruesit",
        activeFilters: "Filtrat aktivë",
        addPhoneInAccount: "Ju lutemi shtoni numrin e telefonit në llogarinë tuaj.",
        addPhoneNumber: "Shto numrin e telefonit",
        averageRating: "Vlerësimi mesatar",
        bizCall: "BizCall",
        browseListingsHint: "Shfletoni të gjitha listimet",
        browseMarketplace: "Shfletoni tregun",
        extend: "Zgjat",
        call: "Telefono",
        categorySpotlight: "Kategoritë e njohura",
        changeEmail: "Ndrysho email-in",
        changePassword: "Ndrysho fjalëkalimin",
        chooseOnMap: "Zgjidh në hartë",
        cities: "qytetet",
        clearAll: "Pastro të gjitha",
        clearFilters: "Pastro filtrat",
        cloudFeedbackNote: "Vlerësimet ruhen në mënyrë të sigurt.",
        codeSent: "Kodi u dërgua me sukses!",
        commentEmptyError: "Komenti nuk mund të jetë bosh",
        commentPlaceholderDetailed: "Ndani përvojën tuaj ose bëni pyetje.",
        communityFeedback: "Feedback-u i komunitetit",
        contactAutofill: "Ne përdorim telefonin e llogarisë tuaj për siguri.",
        contactEmail: "Email-i i kontaktit",
        copied: "U kopjua në clipboard",
        copy: "Kopjo",
        createAccount: "Krijo llogari",
        createListingHint: "Krijo një listim të ri",
        currentPassword: "Fjalëkalimi aktual",
        currentPasswordPlaceholder: "Shkruani fjalëkalimin aktual",
        dashboard: "Paneli",
        day: "ditë",
        days: "ditë",
        del: "Fshij",
        description: "Përshkrimi",
        edit: "Ndrysho",
        emailAction: "Email",
        emailChangeNotAvailable: "Ndryshimi i email-it nuk është i disponueshëm.",
        emailLabel: "Email",
        emailLinkSent: "Linku i email-it u dërgua",
        emailLoginSignup: "Hyrje / Regjistrim me Email",
        emailTab: "Email",
        emailUpdateError: "Nuk u mundësua përditësimi i email-it.",
        emailUpdateSuccess: "Email-i u përditësua me sukses.",
        emailVerified: "Email-i u verifikua!",
        enterCode: "Shkruani kodin e verifikimit",
        enterCurrentPassword: "Ju lutemi shkruani fjalëkalimin aktual.",
        enterEmail: "Ju lutemi jepni email-in tuaj",
        enterValidEmail: "Ju lutemi shkruani një email të vlefshëm.",
        enterValidPhone: "Ju lutemi shkruani një numër telefoni të vlefshëm.",
        error: "Gabim:",
        errorUpdatingPhone: "Gabim gjatë përditësimit të telefonit:",
        eur: "EUR",
        expired: "Ka skaduar",
        expires: "Skadon",
        expiringSoon: "Skadon së shpejti",
        exploreHint: "Kërko sipas kategorisë, çmimit dhe vendndodhjes.",
        favorite: "I preferuar",
        favorites: "Të preferuarat",
        feedbackSaved: "Feedback-u u ruajt",
        feedbackSaveError: "Nuk u mundësua ruajtja e feedback-ut.",
        deleteReview: "Fshi vlerësimin",
        deleteReviewConfirm: "Të fshihet ky vlerësim?",
        reviewDeleted: "Vlerësimi u fshi.",
        cannotDeleteReview: "Nuk mund ta fshish këtë vlerësim.",
        feedbackDeleteError: "Nuk u fshi vlerësimi.",
        cannotLeaveFeedbackOnInactive: "Mund të lini feedback vetëm për listimet aktive dhe të paguara.",
        feedbackSidebarBlurb: "Vlerësimet ndihmojnë të gjithë të shohin listimet më të besuara.",
        fillAllFields: "Ju lutemi plotësoni të gjitha fushat e kërkuara.",
        filters: "Filtrat",
        getStartedFast: "Fillo shpejt",
        goToAccount: "Shko te llogaria",
        hideFilters: "Fshih filtrat",
        homeDigest: "Pasqyra live",
        homeHowItWorksTitle: "Si funksionon",
        homeHowItWorksStep1: "Postoni një njoftim me telefonin tuaj, qytetin dhe një përshkrim të shkurtër.",
        homeHowItWorksStep2: "Njerëzit ju telefonojnë ose ju shkruajnë në Viber / WhatsApp.",
        homeHowItWorksStep3: "Ata lënë vlerësime që të tjerët të dinë kush është i besuar.",
        step: "Hapi",
        mainActions: "Veprimet kryesore",
        popularCategories: "Kategoritë popullore",
        homePopularCategoriesTitle: "Kategoritë më të përdorura",
        homePopularCitiesTitle: "Qytetet e njohura",
        homeSimpleCtaBrowse: "Shfleto listimet",
        homeSimpleCtaPost: "Posto një listim",
        homeSimpleSubtitle: "Postoni një listim të vogël me informacionin tuaj dhe qytetin tuaj.",
        homeSimpleTitle: "Gjeni një mjeshtër, shitës ose shërbim në qytetin tuaj",
        homeSimpleCtaPostBenefit: "Merrni më shumë thirrje për biznesin tuaj",
        homeSimpleCtaBrowseBenefit: "Bëhuni i dukshëm për klientët lokalë",
        localBusinessesJoiningBizCall: "Bizneset Lokale po i bashkohen BizCall",
        overViews: "Mbi {{count}} shikime",
        overContactAttempts: "Mbi {{count}} përpjekje kontakti",
        homeTopFeaturedTitle: "Listimet e veçuara kryesore",
        homeTopFeaturedSubtitle: "Listimet që përfitojnë nga BizCall — shikime dhe kontakte",
        lastMonth: "Muaji i kaluar",
        thisMonth: "Ky muaj",
        chartAmount: "Shuma",
        viewsCount: "{{count}} shikime",
        callsMessagesEmails: "{{count}} thirrje/mesazhe/email",
        listingPerformingAboveAverage: "Më mirë se mesatarja juaj ({{pct}}%)",
        listingPerformingBelowAverage: "Nën mesataren tuaj ({{pct}}%)",
        listingPerformingAverage: "Rreth mesatares tuaj",
        listingExpiresInDays: "Listimi juaj skadon në {{days}} ditë. Rinovoni për 3€ për të vazhduar të merrni klientë.",
        renewNow: "Rinovoni tani",
        listingPausedRenewToReactivate: "Listimi juaj është ndalur. Rinovoni për ta riaktivizuar.",
        trustNoCommissions: "Pa komisione",
        trustDirectContact: "Kontakt i drejtpërdrejtë me klientët",
        trustCancelAnytime: "Anuloni kur të doni",
        trustLocalPlatform: "Platformë e besuar lokale në Maqedoninë e Veriut",
        contactByPhone: "Thirrje",
        contactByEmail: "Email",
        contactByWhatsapp: "WhatsApp",
        homeSimpleTrustLine: "Pa komisione, flisni drejtpërdrejt me telefon ose Viber.",
        invalidCode: "Kodi i verifikimit është i pavlefshëm.",
        iVerified: "Unë e verifikova",
        listedOn: "Listuar më",
        listing: "listim",
        listingsLabel: "listime",
        localMissions: "Misionet lokale",
        localMissionsDesc: "Përditësoni profilin tuaj për të rritur dukshmërinë.",
        locationDetails: "Detajet e vendndodhjes",
        locationExtra: "Qyteti / fshati / lagjia (opsionale)",
        locationLabelFull: "Vendndodhja",
        locationSetTo: "Vendndodhja u caktua në",
        loginRequired: "Ju lutemi hyni për të postuar një listim.",
        loginSubtitle: "Hyni në llogarinë tuaj BizCall.",
        manageListings: "Menaxho Listimet",
        maxPrice: "Maks",
        memberSince: "Anëtar që nga",
        menu: "Menu",
        minPrice: "Min",
        myListingsHint: "Menaxhoni, ndryshoni dhe zgjatni listimet tuaja.",
        name: "Emri i Biznesit ose Shërbimit",
        newEmail: "Email i ri",
        newEmailPlaceholder: "Shkruani email-in e ri",
        newPassword: "Fjalëkalimi i ri",
        newPasswordPlaceholder: "Shkruani fjalëkalimin i ri",
        noExpiry: "Pa skadim",
        noFeedback: "Ende nuk ka feedback",
        noListingsAvailable: "Aktualisht nuk ka listime të disponueshme.",
        noListingsFound: "Nuk u gjet asnjë listim",
        noListingsMatchFilters: "Asnjë listim nuk përputhet me filtrat tuaj.",
        notOwner: "Ju mund të zgjatni vetëm listimin tuaj.",
        notVerifiedYet: "Ende i paverifikuar. Kontrolloni email-in tuaj.",
        offerPriceLabel: "Gama e çmimit të ofertës (opsionale)",
        openInMaps: "Hap në Hartë",
        passwordChangeNotAvailable: "Ndryshimi i fjalëkalimit nuk është i disponueshëm.",
        passwordsDontMatch: "Fjalëkalimet e reja nuk përputhen.",
        passwordTooShort: "Fjalëkalimi duhet të jetë të paktën 8 karaktere dhe të përmbajë të paktën 2 numra.",
        passwordRequirement: "Të paktën 8 karaktere dhe 2 numra",
        passwordUpdateError: "Nuk u mundësua përditësimi i fjalëkalimit.",
        passwordUpdateSuccess: "Fjalëkalimi u përditësua me sukses.",
        pending: "Në pritje",
        pendingVerification: "Duke u verifikuar",
        phoneLoginSubtitle: "Hyni shpejt me një kod SMS në telefonin tuaj.",
        loginPhoneSubtitle: "Hyni me numrin tuaj të telefonit për akses të shpejtë.",
        otpSent: "OTP u dërgua në numrin tuaj të telefonit.",
        otpError: "Dërgimi i OTP dështoi",
        enterOtp: "Ju lutemi shkruani OTP-në që u dërgua në telefonin tuaj.",
        otpVerifyError: "OTP e pavlefshme. Ju lutemi provoni përsëri.",
        sendCode: "Dërgo Kod OTP",
        verifyAndLogin: "Verifiko OTP dhe Hyr",
        codeSent: "Kodi i verifikimit u dërgua me sukses.",
        invalidCode: "Kodi i verifikimit është i pavlefshëm. Ju lutemi provoni përsëri.",
        phonePlaceholder: "70 123 456",
        verificationCodePlaceholder: "123456",
        signupNameLabel: "Emri",
        phoneNumber: "Numri i Telefonit",
        phoneSynced: "Duke përdorur numrin e telefonit të llogarisë tuaj.",
        pickCityChip: "Zgjidhni një qytet për t'u zbuluar më shpejt.",
        postedOn: "Postuar më",
        postingReadyHint: "Listimet përdorin telefonin dhe vendndodhjen tuaj të ruajtur.",
        postService: "Posto një shërbim",
        previewDescriptionPlaceholder: "Një përshkrim i shkurtër shfaqet këtu...",
        previewTitlePlaceholder: "Emri i Biznesit Tuaj",
        priceLabel: "Çmimi",
        priceRangeLabel: "Gama e çmimit",
        pricing: "Çmimet",
        pricingIntro: "Zgjidhni sa kohë dëshironi që listimi juaj të mbetet aktiv në BizCall MK. Planet më të gjata ofrojnë vlerë më të mirë dhe e mbajnë shërbimin tuaj të dukshëm për më shumë kohë.",
        pricingPlan1Point1: "Ideale për testimin e BizCall MK ose fushata të shkurtra.",
        pricingPlan1Point2: "Listimi juaj mbetet aktiv për 30 ditë.",
        pricingPlan3Point1: "Vlerë më e mirë për shërbime sezonale ose afatmesme.",
        pricingPlan3Point2: "Mbani listimin tuaj aktiv për 3 muaj të plotë.",
        pricingPlan6Point1: "E shkëlqyer për shërbime lokale të qëndrueshme dhe të vazhdueshme.",
        pricingPlan6Point2: "Kosto më e ulët mujore në krahasim me planet e shkurtra.",
        pricingPlan12Point1: "Vizibiliteti më i mirë afatgjatë: listimi juaj mbetet aktiv për një vit të plotë.",
        pricingPlan12Point2: "I veçuar për 3 muajt e parë — krye i kërkimit dhe badge e theksuar.",
        pricingPlan12Point3: "Pastaj mbetet një listim standard aktiv për 9 muajt e mbetur.",
        pricingPaymentMethodsTitle: "Pagesat & faturimi",
        pricingPaymentMethodsText: "Tarifat e listimit janë pagesa njëherëshe në EUR për kohëzgjatjen e zgjedhur. Pagesat përpunohen në mënyrë të sigurt përmes Whop. Nuk ka rinovime automatike apo abonime mujore.",
        pricingRefundsTitle: "Rimbursime & anulime",
        pricingRefundsText: "Meqenëse BizCall MK ofron akses në një shërbim listimi digjital, pagesat në përgjithësi nuk rimbursohen pasi listimi juaj të jetë aktivizuar. Nëse mendoni se jeni ngarkuar gabimisht, na kontaktoni dhe ne do ta rishikojmë rastin tuaj.",
        pricingPlatformNoteTitle: "Rreth kësaj platforme",
        pricingPlatformNoteText: "BizCall MK është një treg lokal shërbimesh. Ne lidhim njerëzit që kërkojnë shërbime me ofrues lokalë; ne nuk i shesim vetë shërbimet dhe nuk jemi palë në kontratën midis klientëve dhe ofruesve.",
        profileInfo: "Informacioni i Profilit",
        quickActions: "Veprime të shpejta",
        quickFacts: "Fakte të shpejta",
        ratingLabel: "Vlerësimi juaj",
        recentFeedback: "Feedback-u i fundit",
        remaining: "mbetur",
        repeatNewPassword: "Përsërit fjalëkalimin e ri",
        repeatNewPasswordPlaceholder: "Përsërit fjalëkalimin e ri",
        reputation: "Reputacioni",
        resendEmail: "Ridërgo email-in",
        resendVerificationEmail: "Ridërgo email-in e verifikimit",
        resultsPerPage: "Për faqe",
        reviews: "vlerësime",
        saveEmail: "Ruaj email-in",
        saveFeedback: "Ruaj feedback-un",
        savePassword: "Ruaj fjalëkalimin",
        saving: "Duke u ruajtur...",
        search: "Kërko",
        securitySettings: "Siguria dhe hyrja",
        securitySettingsText: "Përditësoni email-in dhe fjalëkalimin tuaj.",
        selectCategory: "Zgjidh kategorinë",
        selectCity: "Zgjidh qytetin",
        sendLink: "Dërgo Linkun e Hyrjes",
        sendVerifyLink: "Dërgo Linkun e Verifikimit",
        share: "Shpërndaj",
        shareCopied: "Linku i listimit u kopjua ✅",
        shareLinkHint: "Dërgoni linkun e listimit fqinjëve tuaj.",
        shareListing: "Shpërndaj listimin",
        shareNotSupported: "Kjo pajisje nuk mbështet shpërndarjen.",
        shareText: "Shpërndarë nga BizCall MK",
        showFilters: "Shfaq filtrat",
        signedIn: "I hyrë",
        signedOut: "I dalë",
        signInWithPhone: "Numri i Telefonit",
        signup: "Regjistrohu",
        signupSubtitle: "Krijoni llogarinë tuaj BizCall.",
        createAccount: "Krijo llogari",
        enterCode: "Shkruani kodin e verifikimit",
        verifyPhone: "Verifiko Numrin e Telefonit",
        codeSent: "Kodi u dërgua me sukses!",
        invalidCode: "Kodi i verifikimit është i pavlefshëm.",
        signupSuccess: "Llogaria u krijua me sukses!",
        socialPlaceholder: "Social / Web (opsionale)",
        sortAZ: "A → Zh",
        sortExpiring: "Skadon së shpejti",
        sortNewest: "Më të rejat",
        sortTopRated: "Më të vlerësuarat",
        spotlightHintHero: "Ndiqni progresin dhe qëndroni të verifikuar.",
        status: "Statusi",
        statusLabel: "Statusi",
        stepBasic: "Bazë",
        stepDetails: "Detajet",
        stepPlanPreview: "Plani & Shikimi paraprak",
        submitListing: "Dërgo Listimin Tënd",
        submitListingDesc: "Posto, verifiko dhe publiko në pak minuta.",
        switchToGridView: "Kalo në pamjen rrjetë",
        switchToListView: "Kalo në pamjen listë",
        switchToGrid: "Kalo në pamjen rrjetë",
        switchToList: "Kalo në pamjen listë",
        gridView: "Pamje Rrjetë",
        listView: "Pamje Listë",
        tryAdjustingFilters: "Provoni të rregulloni filtrat tuaj për të parë më shumë rezultate.",
        searchListings: "Kërko listime",
        addFavorite: "Shto te të preferuarat",
        removeFavorite: "Hiq nga të preferuarat",
        viewListing: "Shiko listimin",
        removeCategoryFilter: "Hiq filtrin e kategorisë",
        removeLocationFilter: "Hiq filtrin e vendndodhjes",
        clearAllFilters: "Pastro Të Gjitha Filtrat",
        previous: "I mëparshëm",
        next: "Tjetër",
        pagination: "Faqëzimi",
        sidebar: "Shiriti anësor",
        loadingListings: "Duke ngarkuar listime",
        verifiedListingsLabel: "listime të verifikuara",
        pendingListingsLabel: "listime në pritje",
        totalListingsLabel: "listime totale",
        searchYourListings: "Kërko listimet tuaja...",
        searchYourListingsLabel: "Kërko listimet tuaja",
        toggleFilters: "Ndrysho filtrat",
        newListing: "Listim i Ri",
        createYourFirstListing: "Krijo Listimin tënd të Parë",
        noListingsYetDescription: "Filloni duke krijuar listimin tuaj të parë!",
        noListingsMatchFiltersDescription: "Provoni të rregulloni filtrat tuaj për të parë më shumë rezultate.",
        yourListings: "Listimet tuaja",
        removeSearchFilter: "Hiq filtrin e kërkimit",
        removeStatusFilter: "Hiq filtrin e statusit",
        removeExpiryFilter: "Hiq filtrin e skadimit",
        categoryLabel: "Kategoria",
        locationLabel: "Vendndodhja",
        ratingStars: "yje",
        feedbackCountLabel: "komente",
        engagementLabel: "Angazhimi",
        listingIdLabel: "ID e Listimit",
        additionalActions: "Veprime shtesë",
        emailListingOwner: "Dërgo email pronarit të listimit",
        copyContactInfo: "Kopjo informacionin e kontaktit",
        deleteListing: "Fshi listimin",
        tagsPlaceholder: "Etiketa, të ndara me presje (opsionale)",
        trustPoint1: "Të gjitha listimet rishikohen manualisht.",
        trustPoint2: "Kontakt i drejtpërdrejtë me bizneset, pa komisione.",
        trustPoint3: "Ndërtuar për qytetet në të gjithë Maqedoninë e Veriut.",
        trustPoint4: "Mundësia për të raportuar listime të dyshimta.",
        trustSafetyLane: "Korsia e Besimit dhe Sigurisë",
        trustSafetyLaneDesc: "Mbani bisedat të sigurta me kontakte të verifikuara.",
        tryDifferentFilters: "Provoni të rregulloni kërkimin ose filtrat tuaj.",
        unspecified: "E papërcaktuar",
        updateEmailDesc: "Përditësoni adresën tuaj të email-it",
        updateListing: "Rifresko listimin",
        updateListingHint: "Shto një etiketë të re për të dalë në pah.",
        useAccountPhone: "Përdor telefonin e llogarisë",
        verificationError: "Gabim gjatë dërgimit të verifikimit:",
        verificationSent: "Email-i i verifikimit u dërgua.",
        verified: "I verifikuar",
        verifiedHint: "Ruani besimin me profile të verifikuara.",
        verifyEmailFirst: "Ju lutemi verifikoni email-in para postimit.",
        verifyEmailHint: "Ne dërguam një link verifikimi në kutinë tuaj të hyrjes.",
        verifyFootnote: "Këshillë: mund të zgjasë një minutë.",
        verifying: "Duke u kontrolluar...",
        verifyLater: "Verifiko më vonë",
        verifyPhone: "Verifiko Numrin e Telefonit",
        verifyYourEmail: "Verifikoni email-in tuaj",
        view: "Shiko",
        views: "Shikime",
        websiteLabel: "Website",
        whyTrustUs: "Pse BizCall MK?",
        whyChooseUs: "Pse të zgjidhni BizCall MK?",
        verifiedListingsDesc: "Të gjitha listimet janë të verifikuara për autenticitet dhe besueshmëri.",
        noCommissionsDesc: "Lidhuni drejtpërdrejt me ofruesit e shërbimeve. Pa ndërmjetës, pa tarifa.",
        easyContactDesc: "Kontaktoni listimet drejtpërdrejt përmes telefonit, WhatsApp ose email.",
        ratingsReviewsDesc: "Lexoni vlerësimet nga përdoruesit realë për të marrë vendime të informuara.",
        // Payment notifications
        paymentSuccess: "Pagesa u krye me sukses. Listimi juaj u publikua.",
        paymentSuccessfulListingActivated: "Pagesa u krye me sukses. Listimi juaj u publikua.",
        paymentFailed: "Pagesa dështoi. Listimi juaj është i ruajtur te Listimet e Mia.",
        listingExtendedSuccess: "Listimi u zgjat me sukses!",
        listingExtendedSuccessfully: "Listimi u zgjat me sukses!",
        paymentSucceededButListingUpdateFailed: "Pagesa u krye me sukses por përditësimi i listimit dështoi. Ju lutemi kontaktoni mbështetjen.",
        listingSavedButPaymentFailed: "Listimi u ruajt por pagesa dështoi. Ju lutemi provoni përsëri nga Listimet e Mia.",
        youMustBeLoggedIn: "Ju duhet të jeni të kyçur.",
        listingCreatedSuccess: "Listimi u krijua me sukses!",
        listingNotFound: "Listimi nuk u gjet",
        errorLoadingListing: "Gabim gjatë ngarkimit të listimit",
        loadingListing: "Duke ngarkuar listimin...",
        clickToEnlarge: "Kliko për të zmadhuar",
        noImageAvailable: "Nuk ka imazh të disponueshëm",
        previousImage: "Imazhi i mëparshëm",
        nextImage: "Imazhi tjetër",
        imageThumbnails: "Miniaturat e imazheve",
        viewImage: "Shiko imazhin",
        thumbnail: "Miniaturë",
        openWhatsApp: "Hap bisedën në WhatsApp",
        sendEmail: "Dërgo email",
        additionalInfo: "Informacione Shtesë",
        expiresOn: "Skadon Më",
        daysLeft: "ditë të mbetura",
        noDescription: "Nuk ka përshkrim të dhënë.",
        yourRating: "Vlerësimi Juaj",
        selectRating: "Zgjidh vlerësimin",
        star: "yll",
        stars: "yje",
        yourReview: "Recensioni Juaj",
        reviewComment: "Komenti i recensionit",
        writeFeedback: "Shkruaj një recension...",
        submitting: "Duke dërguar...",
        loginToReview: "Hyni për të lënë një recension",
        anonymous: "Anonim",
        fullSizeImageViewer: "Shikues i imazhit me madhësi të plotë",
        closeImageViewer: "Mbyll shikuesin e imazhit",
        fullSize: "Madhësi e plotë",
        likes: "Pëlqime",
        basedOn: "bazuar në",
        listingSavedUnpaid: "Listimi u ruajt por pagesa dështoi. Ju lutemi provoni përsëri nga Listimet e Mia.",
        redirectingToPayment: "Po ridrejtohet te pagesa...",
        paymentTimeout: "Kërkesa për pagesë ka kaluar kohën. Ju lutemi provoni përsëri.",
        paymentSuccessPageTitle: "Pagesa u përfundua",
        paymentSuccessPageBody: "Listimi juaj po aktivizohet dhe do të shfaqet në kërkim së shpejti.",
        paymentFailedPageTitle: "Pagesa nuk u krye",
        paymentFailedPageBody: "Nuk u bënë asnjë tarifë. Listimi juaj është i ruajtur — provoni përsëri nga Listimet e Mia kur jeni gati.",
        // Login/Signup notifications
        loginSuccess: "Hyrja u krye me sukses! Mirë se erdhët.",
        signupSuccess: "Llogaria u krijua me sukses! Ju lutemi verifikoni email-in tuaj.",
        loginError: "Hyrja dështoi. Ju lutemi kontrolloni kredencialet tuaja.",
        signupError: "Regjistrimi dështoi. Ju lutemi provoni përsëri.",
        userNotFound: "Nuk u gjet llogari me këtë adresë email.",
        wrongPassword: "Fjalëkalim i pasaktë. Ju lutemi provoni përsëri.",
        tooManyAttempts: "Shumë përpjekje të dështuara. Ju lutemi provoni përsëri më vonë.",
        networkError: "Gabim rrjeti. Ju lutemi kontrolloni lidhjen tuaj.",
        // Other notifications
        listingDeleted: "Listimi u fshi me sukses.",
        listingUpdated: "Listimi u përditësua me sukses.",
        profileUpdated: "Profili u përditësua me sukses.",
        accountTitle: "Llogaria",
        active: "Aktiv",
        allCategories: "Të gjitha kategoritë",
        allExpiry: "Të gjitha",
        allListingsHint: "Shikoni dhe filtroni të gjitha njoftimet e verifikuara.",
        allLocations: "Të gjitha vendndodhjet",
        allStatuses: "Të gjitha statuseve",
        amount: "Shuma",
        areaLabel: "Zona",
        authOptional: "Identifikimi (Opsional)",
        browse: "Shfleto Njoftimet",
        browseAllCategories: "Të gjitha kategoritë",
        city: "qytet",
        cityLabel: "Qyteti",
        cityShortcuts: "Qytetet e njohura",
        clearSearch: "Pastro kërkimin",
        closeFilters: "Mbyll filtrat",
        communityTagline: "Shërbime lokale të besuara",
        confirmPassword: "Konfirmo Fjalëkalimin",
        contactEditLocked: "Numri i telefonit nuk mund të ndryshohet këtu. Përditësojeni atë te cilësimet e Llogarisë.",
        coverImage: "Imazhi i kopertinës",
        date: "Data",
        emailSameAsCurrent: "Ju lutemi jepni një adresë tjetër email-i",
        emailUpdateSuccessVerify: "Email-i u përditësua me sukses! Ju lutemi kontrolloni email-in tuaj të ri për verifikim.",
        enterPhone: "Ju lutemi shkruani numrin tuaj të telefonit",
        enterName: "Ju lutemi shkruani emrin tuaj",
        errorOccured: "Ndodhi një gabim. Ju lutemi provoni përsëri më vonë.",
        exploreHeroSubtitle: "Përdorni filtrat e shpejtë për të mbajtur kartat e rregullta dhe hapni detajet kur të jeni gati.",
        exploreHeroTitle: "Eksploroni njoftimet lokale të besuara",
        failed: "Dështoi",
        favoritesOnly: "Vetëm të preferuarat",
        filterByCategory: "Filtro sipas kategorisë",
        filterByLocation: "Filtro sipas vendndodhjes",
        filterHelper: "Ngushtoni kërkimin sipas emrit, qytetit, kategorisë ose preferencës së renditjes.",
        filterSubtitle: "Rafinoni kërkimin tuaj",
        growthStepPostDesc: "Nisni me kontakt të verifikuar, etiketë qyteti dhe dritare çmimi.",
        growthStepRespond: "Përgjigju kudo",
        growthStepRespondDesc: "Kartat kompakte dhe veprimet e shpejtë mbeten të lehta për t'u përdorur në celular.",
        growthStepShare: "Shpërndaj shpejt",
        invalidCredentials: "Email-i ose fjalëkalimi i pavlefshëm.",
        language: "Gjuha",
        loginSuccess: "Hyrja u krye me sukses!",
        loginToPost: "Ju lutemi hyni për të postuar një njoftim",
        loginWithEmail: "Hyni me Linkun e Email-it",
        manageListingsHint: "Menaxhoni gjithçka në një vend",
        map: "Harta",
        mkRibbonSubtitle: "Pamje e fokusuar në lokalen, gjuhë miqësore shqipe dhe shkurtore qytetesh që njihni.",
        mkRibbonTitle: "Ndërtuar për Maqedoninë e Veriut",
        months: "muaj",
        mustLoginToCreate: "Duhet të jeni të hyrë për të krijuar një njoftim",
        neighborhoodFriendly: "Navigim miqësor për lagjen",
        networkError: "Gabim rrjeti. Kontrolloni lidhjen tuaj.",
        no: "Jo",
        noTransactions: "Ende nuk ka transaksione.",
        passwordIncorrect: "Fjalëkalimi i pasaktë. Ju lutemi provoni përsëri.",
        passwordMismatch: "Fjalëkalimet nuk përputhen.",
        postingReady: "Gati për postim",
        preview: "Shikim paraprak",
        currency: "Monedha",
        listingCreatedSuccessFreeTrial: "Listimi u krijua me sukses! Provë falas aktivizuar.",
        zeroEur: "0 EUR",
        loadingMap: "Duke ngarkuar hartën...",
        priceRangePlaceholder: "Gama e çmimit (p.sh. 500 - 800 MKD)",
        profile: "Profili",
        quickFilters: "Filtrat e shpejtë",
        refineResults: "Rafino rezultatet",
        resendCode: "Ridërgo Kodin",
        resetFilters: "Resetoni filtrat",
        resultsSummary: "Renditur sipas vlerësimit me përshkrime të shkurtuara për skanim të lehtë.",
        reviewsLabel: "Vlerësime",
        searchPlaceholder: "Kërko sipas emrit ose përshkrimit...",
        shareHint: "Shpërndani njoftimin tuaj me fqinjët për të mbledhur feedback dhe për të rritur dukshmërinë.",
        signedUp: "U regjistrua",
        socialShortPlaceholder: "Social / Website",
        sortBy: "Rendit sipas",
        sortOldest: "Më të vjetrat",
        spotlightHint: "Një karusel i njoftimeve të besuara që qëndron i dukshëm pa lëvizje të pafundme.",
        success: "Sukses",
        tagsFieldLabel: "Etiketat",
        tagsLabel: "Etiketat",
        tagsShortPlaceholder: "Etiketat (opsionale)",
        todaySpotlight: "Bordi i vëmendjes së sotme",
        transactionHistory: "Historia e Transaksioneve",
        transactions: "Transaksionet",
        updateProfile: "Përditëso Profilin",
        uploadCoverLocal: "Ngarko kopertinën (lokale)",
        verifiedLabel: "I verifikuar",
        verifyCurrentEmailFirst: "Ju lutemi verifikoni adresën tuaj aktuale të email-it përpara se ta ndryshoni atë.",
        viewDetails: "Shiko Detajet",
        websiteFieldLabel: "Website / Link social",
        websitePlaceholder: "Ngjitni një link (opsionale)",
        yes: "Po",
        removeFilter: "Largo filtrin",
        listingDeleted: "Listimi u fshi",
        notSignedIn: "Nuk jeni kyçur.",
        saveSuccess: "U ruajt me sukses!",
        sendingCode: "Duke dërguar kodin...",
        verifying: "Duke verifikuar...",
        verifyCode: "Verifiko Kodin",
        phoneAlreadyInUse: "Ky numër telefoni është tashmë në përdorim nga një llogari tjetër.",
        phoneAlreadyInUseTitle: "Numri i telefonit është në përdorim",
        invalidPhone: "Numër telefoni i pavlefshëm.",
        errorOccurred: "Ndodhi një gabim.",
        copiedToClipboard: "U kopjua në clipboard!",
        shareVia: "Shpërndaj përmes",
        loginToSeeMore: "Kyçuni për të parë më shumë",
        noAccount: "Nuk keni llogari?",
        alreadyHaveAccount: "Keni llogari?",
        forgotPassword: "Keni harruar fjalëkalimin?",
        resetPassword: "Rivendos fjalëkalimin",
        passwordResetEmailSent: "Email-i për rivendosjen e fjalëkalimit u dërgua. Kontrolloni inbox-in tuaj.",
        passwordResetError: "Dërgimi i email-it për rivendosjen e fjalëkalimit dështoi. Ju lutemi provoni përsëri.",
        enterEmailForReset: "Ju lutemi shkruani adresën tuaj të email-it fillimisht.",
        terms: "Kushtet",
        privacy: "Privatësia",
        emailUpdated: "Email-i u përditësua me sukses",
        phoneUpdated: "Numri i telefonit u përditësua me sukses",
        emailRequired: "Email-i është i detyrueshëm.",
        phoneRequired: "Numri i telefonit është i detyrueshëm.",
        passwordRequired: "Fjalëkalimi është i detyrueshëm.",
        invalidEmail: "Adresë email-i e pavlefshme.",
        unauthorized: "Qasje e paautorizuar.",
        forbidden: "Qasje e ndaluar.",
        sessionExpired: "Seanca ka skaduar. Ju lutemi kyçuni përsëri.",
        loadingMore: "Duke ngarkuar më shumë...",
        noMoreData: "Nuk ka më të dhëna për të ngarkuar.",
        searchNoResults: "Nuk u gjet asnjë rezultat për kërkimin tuaj.",
        somethingWentWrong: "Diçka shkoi keq. Ju lutemi provoni përsëri.",
        somethingWentWrongTitle: "Diçka shkoi keq.",
        apologizeInconvenience: "Kërkojmë ndjesë për shqetësimin. Ju lutemi provoni të rifreskoni faqen.",
        refreshPage: "Rifresko Faqen",
        tryAgain: "Provo përsëri",
        goBack: "Kthehu mbrapa",
        pageNotFound: "Faqja nuk u gjet.",
        pageNotFoundTitle: "404 - Faqja Nuk U Gjet",
        pageNotFoundDescription: "Faqja që po kërkoni nuk ekziston ose është zhvendosur.",
        goHome: "Shko në Shtëpi",
        closeNotification: "Mbyll njoftimin",
        advertisement: "Reklamë",
        loginToSubmitListing: "Hyni për të dërguar një listim",
        home: "Kreu",
        dashboard: "Paneli",
        settings: "Cilësimet",
        profile: "Profili",
        security: "Siguria",
        notifications: "Njoftimet",
        help: "Ndihmë",
        faq: "Pyetjet e shpeshta",
        contactUs: "Kontakt",
        contactDescription: "Keni një pyetje ose reagim? Do të donim të dëgjojmë nga ju!",
        contactFormSuccess: "Faleminderit! Mesazhi juaj u dërgua me sukses.",
        contactFormError: "Na vjen keq, ka ndodhur një gabim gjatë dërgimit të mesazhit tuaj. Ju lutemi provoni përsëri.",
        sendMessage: "Dërgo Mesazhin",
        sending: "Duke dërguar...",
        contactAlternative: "Alternativisht, mund të na kontaktoni në:",
        contactAlternativeTitle: "Mënyra Të Tjera Për Të Na Kontaktuar",
        newMessage: "Mesazh i Ri",
        contactFormSubmission: "Dërgesë e re nga forma e kontaktit",
        from: "nga",
        noSubject: "Pa temë",
        contactFormFooter: "Ky email u dërgua nga forma e kontaktit në bizcall.mk",
        enterName: "Shkruani emrin tuaj",
        enterEmail: "Shkruani email-in tuaj",
        subject: "Tema",
        message: "Mesazh",
        enterSubject: "Shkruani temën",
        enterMessage: "Shkruani mesazhin tuaj",
        reportListing: "Raporto Listimin",
        reportReason: "Arsyeja e raportimit",
        spam: "Spam",
        inappropriate: "Përmbajtje e papërshtatshme",
        other: "Tjetër",
        sendReport: "Dërgo Raportin",
        reportSuccess: "Listimi u raportua. Faleminderit.",
        deleteAccount: "Fshi Llogarinë",
        deleteAccountConfirm: "Jeni të sigurt se dëshironi të fshini llogarinë tuaj? Ky veprim nuk mund të zhbëhet dhe do të fshijë të gjitha listimet tuaja.",
        dangerZoneDesc: "Veprime të pakthyeshme të llogarisë",
        deleteAccountWarning: "Pasi të fshini llogarinë tuaj, nuk ka kthim prapa. Ju lutemi të jeni të sigurt.",
        editProfile: "Ndrysho Profilin",
        displayName: "Emri i shfaqjes",
        profileUpdated: "Profili u përditësua me sukses",
        accountDeleted: "Llogaria juaj është fshirë",
        dangerZone: "Zona e Rrezikut",
        report: "Raporto",
        termsOfService: "Kushtet e Shërbimit",
        reviewNotificationSubject: "Recension i ri për oazën tuaj",
        reviewNotificationText: "Përshëndetje, dikush sapo ka lënë një recension për oazën tuaj.",
        reviewNotificationComment: "Koment",
        reviewNotificationCheck: "Shikoje këtu",
        seoTitle: "BizCall - Shërbime Lokale",
        seoDescription: "Gjeni dhe ndani shërbime lokale të besueshme në të gjithë Maqedoninë e Veriut",
        seoKeywords: "shërbime lokale, tregu, Maqedonia e Veriut, Shkup, Tetovë",
        page: "Faqe",
        of: "nga",
        exploreSubtitle: "Gjeni dhe ndani shërbime lokale të besueshme në të gjithë Maqedoninë e Veriut",
        allCities: "Të gjithë qytetet",
        privacyPolicy: "Politika e Privatësisë",
        cookiesPolicy: "Politika e Cookies",
        allRightsReserved: "Të gjitha të drejtat e rezervuara.",
        madeWithLove: "Ndërtuar me dashuri në Maqedoninë e Veriut",
        version: "Versioni",
        build: "Build",
        // Added/Refined keys
        differentEmailRequired: "Ju lutemi jepni një adresë tjetër email-i",
        verifyCurrentEmailBeforeChange: "Ju lutemi verifikoni adresën tuaj aktuale të email-it përpara se ta ndryshoni atë.",
        addPhoneInAccountSettings: "Shtoni telefonin tuaj në cilësimet e llogarisë së pari.",
        createListing: "Krijo listim",
        browseListings: "Shfleto listimet",
        emailChangeRestricted: "⚠️ Ndryshimi i email-it është i kufizuar nga Firebase. Email-i juaj i ri është ruajtur në profil, por do t'ju duhet të dilni dhe të hyni përsëri me adresën tuaj të re të email-it. Përndryshe, kontaktoni mbështetjen për të mundësuar ndryshimet e email-it në Firebase Console.",
        reviewRestrictedSignin: "⚠️ Reagimi është i kufizuar. Duhet të jeni të hyrë për të lënë feedback.",
        reviewRestrictedVerified: "⚠️ Vetëm përdoruesit e verifikuar që nuk e kanë vlerësuar ende këtë listim mund të lënë feedback.",
        emailChangeFailed: "Ndryshimi i email-it dështoi. Firebase ka kufizuar ndryshimet e email-it. Ju lutemi kontaktoni mbështetjen.",
        emailInUse: "Ky email është tashmë në përdorim nga një llogari tjetër.",
        recentLoginRequired: "Ju lutemi dilni dhe hyni përsëri përpara se të ndryshoni email-in tuaj.",
        emailEnumProtection: "Ndryshimet e email-it janë bllokuar nga 'Email Enumeration Protection' në Firebase.",
        previousPage: "Faqja e mëparshme",
        nextPage: "Faqja tjetër",
        callAction: "Telefono",
        share: "Shpërndaj",
        day: "ditë",
        days: "ditë",
        all: "Të gjitha",
        allCategories: "Të gjitha kategoritë",
        allLocations: "Të gjitha vendndodhjet",
        any: "Çdo",
        confirmDelete: "A jeni të sigurt që dëshironi ta fshini këtë listim?",
        emailAction: "Email",
        shareAction: "Shpërndaj",
        websiteLabel: "Faqja e internetit",
        unspecified: "E papërcaktuar",
        notOwner: "Ju nuk jeni pronari i këtij listimi.",
        verifyEmailFirst: "Ju lutemi verifikoni email-in tuaj së pari.",
        saveSuccess: "Ndryshimet u ruajtën me sukses!",
        subscriptionUpdated: "Abonimi u përditësua me sukses!",
        errorUpdatingSubscription: "Gabim në përditësimin e abonimit",
        passwordRequired: "Kërkohet fjalëkalimi për këtë veprim.",
        enterValidPhone: "Ju lutemi shkruani një numër telefoni të vlefshëm.",
        codeSent: "Kodi u dërgua me sukses!",
        enterCode: "Shkruani kodin e verifikimit",
        verificationCode: "Kodi i Verifikimit",
        verifying: "Duke verifikuar...",
        phoneUpdated: "Numri i telefonit u përditësua me sukses!",
        errorUpdatingPhone: "Gabim në përditësimin e numrit të telefonit:",
        reauthRequired: "Ju lutemi dilni dhe hyni përsëri për të fshirë llogarinë tuaj.",
        error: "Gabim:",
        enterEmail: "Ju lutemi shkruani email-in tuaj",
        signedIn: "I kyçur",
        loginRequired: "Ju lutemi hyni për të vazhduar.",
        enterValidEmail: "Ju lutemi shkruani një email të vlefshëm.",
        enterCurrentPassword: "Ju lutemi shkruani fjalëkalimin tuaj aktual.",
        emailChangeNotAvailable: "Ndryshimi i email-it nuk është i disponueshëm për këtë llogari.",
        emailUpdateSuccess: "Email-i u përditësua me sukses.",
        emailUpdateError: "Nuk mund të përditësohej email-i.",
        freeTrialAvailable: "Provë Falas e Disponueshme!",
        freeTrialDesc: "Zgjidhni planin 1 Mujor për të marrë muajin e parë plotësisht falas.",
        freeFor1Month: "1 muaj falas",
        freeTrialEndsIn: "Oferta mbaron në",
        freeTrialCountdown: "Kohë e mbetur për ofertën falas",
        hours: "o",
        minutes: "min",
        seconds: "sek",
        free: "FALAS",
        // Legal Modals
        termsLastUpdated: "Përditësuar së fundmi:",
        termsIntro: "Mirësevini në BizCall. Duke përdorur aplikacionin tonë, ju pranoni këto kushte.",
        terms1Title: "1. Pranimi i Kushteve",
        terms1Text: "Duke hyrë dhe përdorur këtë shërbim, ju pranoni dhe bini dakord të jeni të lidhur me kushtet dhe dispozitat e kësaj marrëveshjeje.",
        terms2Title: "2. Sjellja e Përdoruesit",
        terms2Text: "Ju pranoni të përdorni shërbimin vetëm për qëllime të ligjshme. Ju jeni përgjegjës për të gjithë përmbajtjen që postoni.",
        terms2List1: "Jo spam ose përmbajtje mashtruese.",
        terms2List2: "Jo mallra ose shërbime të paligjshme.",
        terms2List3: "Jo ngacmime ose gjuhë urrejtjeje.",
        terms3Title: "3. Rregullat e Listimit",
        terms3Text: "Ne rezervojmë të drejtën të heqim çdo listim që shkel politikat tona pa rimbursim.",
        terms4Title: "4. Përgjegjësia",
        terms4Text: "BizCall është një platformë që lidh përdoruesit. Ne nuk jemi përgjegjës për cilësinë e shërbimeve të ofruara nga përdoruesit.",
        terms5Title: "5. Ndërprerja",
        terms5Text: "Ne mund të ndërpresim qasjen tuaj në faqe, pa shkak ose njoftim.",
        terms6Title: "6. Modifikimet e Shërbimit",
        terms6Text: "BizCall MK rezervon të drejtën të modifikojë ose të ndërpresë shërbimin me ose pa njoftim për përdoruesin.",
        terms7Title: "7. Kufizimi i Përgjegjësisë",
        terms7Text: "Ne nuk jemi përgjegjës për çdo dëmtim që mund të ju ndodhë si rezultat i përdorimit të faqes sonë.",
        terms8Title: "8. Kontakt",
        terms8Text: "Për çdo pyetje në lidhje me këto kushte, ju lutemi na kontaktoni.",
        terms3List1: "Të gjitha pagesat përpunohen në mënyrë të sigurt përmes ofruesit tonë të pagesave (Whop).",
        terms3List2: "Informacionet e pagesës trajtohen sipas standardeve të sigurisë në industri (p.sh. përputhshmëri PCI-DSS) nga këta ofrues.",
        terms3List3: "Rimbursimet dhe anulimet për tarifat e listimit trajtohen sipas politikave tona të listimit dhe, kur është e zbatueshme, kushteve të ofruesit të pagesave.",
        terms3List4: "Ne rezervojmë të drejtën të verifikojmë transaksionet e pagesës dhe mund të kërkojmë verifikim shtesë",
        terms3List5: "Të gjitha çmimet shfaqen në monedhën e zgjedhur dhe janë përfundimtare në kohën e blerjes",
        terms3List6: "Për mosmarrëveshjet e pagesës, ju lutemi kontaktoni ekipin tonë të mbështetjes ose referojuni procesit të zgjidhjes së mosmarrëveshjeve të ofruesit të pagesave.",
        terms4List1: "Ne përdorim Google Ads për të shfaqur reklama relevante në platformën tonë",
        terms4List2: "Google mund të përdorë cookies dhe teknologji ndjekjeje për të shfaqur reklama të personalizuara",
        terms4List3: "Ju mund të menaxhoni preferencat tuaja të reklamave përmes Cilësimeve të Reklamave të Google",
        terms4List4: "Ne nuk jemi përgjegjës për përmbajtjen e reklamave të palëve të treta",
        terms4List5: "Reklamat janë të shënuara qartë dhe të ndara nga përmbajtja jonë",
        terms4List6: "Ne përputhemi me politikën dhe udhëzimet e Google Ads",
        terms5List1: "Ne përdorim Google Search Console për të monitoruar dhe përmirësuar performancën e kërkimit të faqes sonë",
        terms5List2: "Faqja jonë është e indeksuar nga Google dhe motorët e tjerë kryesorë të kërkimit",
        terms5List3: "Ne ndjekim Udhëzimet e Webmaster-it të Google dhe praktikat më të mira",
        terms5List4: "Listimet mund të shfaqen në rezultatet e motorit të kërkimit për të ndihmuar përdoruesit të gjejnë shërbime",
        terms5List5: "Ne zbatojmë të dhëna të strukturuara dhe shënim skema për dukshmëri më të mirë kërkimi",
        terms5List6: "Harta jonë e faqes dorëzohet në Google Search Console për kërkime efikase",
        terms2TextNew: "Përdoruesit janë përgjegjës për saktësinë e listimeve të tyre. Ju pranoni të mos postoni përmbajtje që është e paligjshme, ofenduese ose mashtruese.",
        terms2List1New: "Mbani informacione të sakta kontakti",
        terms2List2New: "Respektoni të drejtat e pronësisë intelektuale",
        terms2List3New: "Mos u përfshini në spam ose ngacmime",
        terms3TextNew: "BizCall MK përdor një përpunues të sigurt të palës së tretë për pagesat. Duke bërë një pagesë, ju pranoni:",
        terms4TextNew: "BizCall MK shfaq reklama përmes Google Ads. Duke përdorur shërbimin tonë, ju pranoni:",
        terms5TextNew: "BizCall MK është i optimizuar për motorët e kërkimit dhe përdor Google Search Console për menaxhimin e faqes:",
        privacyLastUpdated: "Përditësuar së fundmi:",
        privacyIntro: "Privatësia juaj është e rëndësishme për ne. Kjo politikë shpjegon se si ne trajtojmë të dhënat tuaja.",
        privacy1Title: "1. Informacioni që Mbledhim",
        privacy1Text: "Ne mbledhim informacione që ju na jepni drejtpërdrejt, si adresa e emailit, numri i telefonit dhe detajet e listimit.",
        privacy2Title: "2. Si i Përdorim Informacionet",
        privacy2Text: "Ne i përdorim informacionet tuaja për të operuar dhe përmirësuar shërbimet tona, për të lehtësuar pagesat dhe për të komunikuar me ju.",
        privacy3Title: "3. Ndarja e Të Dhënave",
        privacy3Text: "Ne nuk i shesim të dhënat tuaja personale. Ne mund të ndajmë të dhëna me ofruesit e shërbimeve (p.sh., Firebase) për të operuar aplikacionin.",
        privacy4Title: "4. Të Drejtat Tuaja",
        privacy4Text: "Ju keni të drejtë të qaseni, përditësoni ose fshini informacionet tuaja personale në çdo kohë përmes cilësimeve të llogarisë suaj.",
        privacy5Title: "5. Kontakt",
        privacy5Text: "Nëse keni pyetje në lidhje me këtë politikë, ju lutemi na kontaktoni.",
        privacy6Title: "6. Të Drejtat Tuaja",
        privacy6Text: "Ju keni të drejtë të:",
        privacy7Title: "7. Kontakt",
        privacy7Text: "Për pyetje ose shqetësime në lidhje me privatësinë, ju lutemi na kontaktoni.",
        privacy1TextNew: "Ne mbledhim informacione që ju na jepni drejtpërdrejt, si kur krijoni një llogari, postoni një listim ose na kontaktoni. Kjo përfshin:",
        privacy1List1: "Informacione llogarie (emri, email, numri i telefonit)",
        privacy1List2: "Informacione listimi (përshkrimet, imazhet, vendndodhja, çmimi)",
        privacy1List3: "Informacione pagese të përpunuara në mënyrë të sigurt përmes ofruesit tonë të pagesave (Whop)",
        privacy1List4: "Të dhëna përdorimi dhe analitikë përmes Google Search Console",
        privacy1List5: "Cookies dhe teknologji ndjekjeje për Google Ads",
        privacy2TextNew: "Ne i përdorim informacionet që mbledhim për të:",
        privacy2List1: "Operojmë, mirëmbajmë dhe përmirësojmë shërbimet tona",
        privacy2List2: "Përpunojmë pagesat në mënyrë të sigurt përmes ofruesit tonë të pagesave (Whop)",
        privacy2List3: "Shfaqim reklama relevante përmes Google Ads",
        privacy2List4: "Optimizojmë faqen tonë për motorët e kërkimit duke përdorur Google Search Console",
        privacy2List5: "Komunikojmë me ju për llogarinë dhe listimet tuaja",
        privacy2List6: "Analizojmë modelet e përdorimit dhe përmirësojmë përvojën e përdoruesit",
        privacy3TextNew: "Ne punojmë me shërbime të besueshme të palëve të treta:",
        privacy3List1: "Ofruesi i pagesave (Whop): Ne ndajmë informacione pagese me Whop për të përpunuar tarifat e listimit në mënyrë të sigurt.",
        privacy3List2: "Google Ads: Ne përdorim Google Ads për të shfaqur reklama. Google mund të përdorë cookies dhe të mbledhë të dhëna për personalizimin e reklamave. Ju mund të hiqni dorë përmes Cilësimeve të Reklamave të Google.",
        privacy3List3: "Google Search Console: Ne përdorim Google Search Console për të monitoruar performancën e faqes dhe dukshmërinë e kërkimit. Kjo na ndihmon të përmirësojmë shërbimet tona dhe të sigurojmë që listimet janë të zbulueshme.",
        privacy3List4: "Firebase: Ne përdorim Firebase për autentifikim dhe shërbime baze të dhënash, që përpunon të dhënat e llogarisë dhe listimit tuaj në mënyrë të sigurt.",
        privacy4TextNew: "Ne marrim masa të arsyeshme për të ndihmuar në mbrojtjen e informacioneve për ju nga humbja, vjedhja, keqpërdorimi dhe qasja e paautorizuar. Kjo përfshin:",
        privacy4List1: "Transmetim të dhënash të enkriptuara (HTTPS/SSL)",
        privacy4List2: "Përpunim të sigurt pagesash përmes ofruesve të përputhshëm me PCI",
        privacy4List3: "Rregullat e sigurisë dhe autentifikimi i Firebase",
        privacy4List4: "Auditime dhe përditësime të rregullta sigurie",
        privacy5TextNew: "Ne përdorim cookies dhe teknologji të ngjashme:",
        privacy5List1: "Cookies Themelore: Të nevojshme për funksionalitetin e faqes dhe autentifikimin",
        privacy5List2: "Cookies Analitike: Përdoren për të kuptuar se si vizitorët ndërveprojnë me faqen tonë përmes Google Search Console dhe analitikës",
        privacy5List3: "Cookies Reklamash: Përdoren nga Google Ads për të shfaqur reklama relevante dhe për të matur efektivitetin e reklamave",
        privacy5List4: "Ju mund të kontrolloni cookies përmes cilësimeve të shfletuesit tuaj ose Cilësimeve të Reklamave të Google për preferencat e reklamave",
        essentialCookies: "Cookies Themelore",
        analyticsCookies: "Cookies Analitike",
        advertisingCookies: "Cookies Reklamash",
        privacy6List1: "Qasje dhe përditësim të informacioneve tuaja personale",
        privacy6List2: "Fshirje të llogarisë tuaj dhe të dhënave të lidhura",
        privacy6List3: "Hiqje nga reklamat e personalizuara përmes Cilësimeve të Reklamave të Google",
        privacy6List4: "Kërkesë për informacione për të dhënat që mbledhim dhe si përdoren",
        privacy6List5: "Kontakt me ne me shqetësime ose pyetje privatësie"
    },
    mk: {
        // Cookie Consent
        // Plans
        month1: "1 Месец",
        month3: "3 Месеци",
        month6: "6 Месеци",
        month12: "12 Месеци",
        days30: "30 дена",
        days90: "90 дена",
        days180: "180 дена",
        days365: "365 дена",
        selectPlan: "Избери План",
        planUpdated: "Планот беше успешно ажуриран",
        plan1Month: "1 Месец",
        plan3Months: "3 Месеци",
        plan6Months: "6 Месеци",
        plan12Months: "12 Месеци",
        planBasic: "Основен",
        planStandard: "Стандарден",
        planPro: "Про",
        planPremium: "Премиум",
        extendDescription: "Изберете план за продолжување на времетраењето на вашиот оглас.",
        getVisibleToLocalCustomers: "Бидете видливи за локалните клиенти",
        findLocalService: "Пронајдете локална услуга",
        getMoreCallsForBusiness: "Добијте повеќе повици за вашиот бизнис",
        heroPostCtaShort: "Објавете оглас",
        browseServicesCta: "Преглед на услуги",
        browseServicesHint: "Најдете водоинсталатер, електричар или друга локална услуга во вашиот град.",
        exploreListingsCta: "Сите огласи",
        featured: "Истакнато",
        featuredListingsGetMoreViews: "Истакнатите огласи добиваат до 3x повеќе прегледи.",
        featuredBenefitsTooltip: "Истакнатите огласи се појавуваат први во пребарувањето, имаат истакната картичка и добиваат поголема видливост.",
        featuredCtaTitle: "Истакнат оглас — Врв на пребарувањето",
        featuredCtaDesc: "Оглас 12 месеци: истакнат првите 3 месеци (врв на пребарувањето, ознака, повеќе прегледи). Огласот останува активен сите 12 месеци.",
        featuredCtaCta: "12 месеци вкупно: 3 месеци истакнато, потоа 9 месеци стандардно",
        featuredPlanLabel: "12 месеци",
        featuredDurationNote: "Истакнато првите 3 месеци",
        extendListing: "Продолжи Оглас",
        listingNeedsPayment: "Овој оглас треба плаќање за да се активира.",
        completePaymentToActivate: "Завршете го плаќањето за да го активирате вашиот оглас и да го направите видлив за корисниците.",
        completePayment: "Заврши Плаќање",
        proceedToPayment: "Продолжи кон Плаќање",
        choosePayment: "Избери плаќање",
        freeTrialActivated: "Бесплатна проба активирана",
        eur: "EUR",
        accountSettings: "Поставки за сметка",
        listingDeletedSuccess: "Огласот е успешно избришан",
        deleteAccountConfirm: "Избриши сметка",
        editProfile: "Измени профил",
        pendingPayment: "Плаќање во исчекување",
        agreeTo: "Се согласувам со",
        and: "и",
        mustAgreeToTerms: "Морате да се согласите со Условите и Политиката за приватност.",
        namePlaceholder: "Име на бизнис",
        descriptionPlaceholder: "Краток опис",
        clickToUpload: "Кликни за прикачување",
        tags: "Ознаки",
        socialLink: "Социјален линк",
        titlePlaceholder: "Име на бизнис",
        closeFilters: "Затвори филтри",
        close: "Затвори",
        filterSubtitle: "Прецизирај го твоето пребарување",
        clearSearch: "Исчисти пребарување",
        status: "Статус",
        allStatuses: "Сите статуси",
        allExpiry: "Сите",
        active: "Активен",
        verified: "Верификуван",
        pending: "Во исчекување",
        sortTopRated: "Највисоко оценети",
        sortNewest: "Најнови",
        sortExpiring: "Истекуваат наскоро",
        sortAZ: "А → Ш",
        sortOldest: "Најстари прво",
        unspecified: "Неодредено",
        locationExtra: "Град / село / населба (опционално)",
        phoneAlreadyInUse: "Овој телефонски број е веќе во употреба од друга сметка.",
        verifyCurrentEmailBeforeChange: "Ве молиме потврдете ја вашата тековна е-пошта пред да ја промените.",
        emailChangeRestricted: "Промената на е-пошта е ограничена.",
        passwordIncorrect: "Неточна лозинка.",
        emailInUse: "Оваа е-пошта веќе се користи.",
        contactEditLocked: "Телефонскиот број не може да се промени овде. Ажурирајте го во поставките за сметка.",
        goToAccount: "Одете во сметката",
        priceRangeLabel: "Опсег на цени",
        priceRangePlaceholder: "Опсег на цени (на пр. 500 - 800 МКД)",
        tagsFieldLabel: "Ознаки",
        tagsPlaceholder: "Ознаки, одделени со запирка (опционално)",
        websiteFieldLabel: "Веб-страница / Социјален линк",
        websitePlaceholder: "Залепете линк (опционално)",
        communityTagline: "Доверливи локални услуги",
        reviewsLabel: "Рецензии",
        maxImagesError: "Дозволени се максимум 4 слики",
        confirmDelete: "Дали сте сигурни дека сакате да го избришете овој оглас?",
        addPhoneInAccountSettings: "Додадете го вашиот телефон во поставките за сметка прво.",
        cookieConsentText: "Користиме колачиња за да се осигураме дека ќе го добиете најдоброто искуство на нашата веб-страница.",
        accept: "Прифати",
        // Business Hours
        businessHours: "Работно Време",
        openNow: "Отворено Сега",
        closed: "Затворено",
        opensAt: "Отвора во",
        closesAt: "Затвора во",
        opensOn: "Отвора во",
        // Quick Contact Form
        sendMessage: "Испрати Порака",
        contactBusiness: "Контактирај Бизнис",
        enterYourMessage: "Внесете ја вашата порака...",
        messageSentSuccessfully: "Пораката е испратена успешно!",
        errorSendingMessage: "Грешка при испраќање. Обидете се повторно.",
        // Enhanced Search Filters
        priceRange: "Опсег на Цени",
        minPrice: "Минимална Цена",
        maxPrice: "Максимална Цена",
        searchRadius: "Радиус на Пребарување",
        anyDistance: "Било кое растојание",
        businessStatus: "Статус на Бизнис",
        allBusinesses: "Сите Бизнеси",
        verifiedOnly: "Само Верификувани",
        // Verification Badge
        verified: "Верификуван",
        pending: "Во Чекање",
        unverified: "Неверификуван",
        // General
        reauthRequired: "Ве молиме одјавете се и најавете се повторно за да ја избришете вашата сметка.",
        noMyListings: "Сè уште немате огласи",
        myListingsSubtitle: "Управувајте со вашите активни и истечени огласи",
        exploreSubtitle: "Прелистајте ги сите верификувани огласи во вашата област",
        differentEmailRequired: "Ве молиме внесете различна е-пошта",
        emailChangeFailed: "Промената на е-пошта не успеа.",
        recentLoginRequired: "Ве молиме одјавете се и најавете се повторно пред да ја промените вашата е-пошта.",
        emailEnumProtection: "Промените на е-пошта се блокирани од безбедносни причини.",
        privacyPolicy: "Политика за приватност",
        allRightsReserved: "Сите права се задржани.",
        madeWithLove: "Направено со љубов во Северна Македонија",
        version: "Верзија",
        build: "Верзија",
        cookiesPolicy: "Политика за колачиња",
        images: "Слики",
        imagesMax4: "Слики (Макс 4)",
        uploadImages: "Вчитај слики",
        updateProfileDesc: "Ажурирајте го вашиот јавен профил",
        displayName: "Име за Приказ",
        displayNamePlaceholder: "Внесете го вашиот приказен имиња",
        saveChanges: "Зачувај Промени",
        accountSettings: "Поставки за Сметка",
        dangerZone: "Опасна Зона",
        dangerZoneDesc: "Неповратни акции со сметката",
        deleteAccount: "Избриши Сметка",
        deleteAccountWarning: "Откако ќе ја избришете вашата сметка, нема повраток. Ве молиме бидете сигурни.",
        legal: "Правни",
        readTerms: "Прочитајте ги нашите услови",
        readPrivacy: "Прочитајте ја нашата политика за приватност",
        reportListing: "Пријави оглас",
        reportReason: "Причина за пријавување",
        spam: "Спам",
        inappropriate: "Несоодветна содржина",
        other: "Друго",
        sendReport: "Испрати пријава",
        reportSuccess: "Огласот е пријавен. Ви благодариме.",
        accountDeleted: "Вашата сметка е избришана",
        profileUpdated: "Профилот е успешно ажуриран",
        report: "Пријави",
        ",": ",",
        title: "BizCall MK",
        appName: "BizCall MK",
        bizcallLogo: "BizCall лого",
        previewAlt: "преглед",
        close: "Затвори",
        welcome: "Добредојдовте!",
        hello: "Здраво",
        logout: "Одјави се",
        loading: "Се вчитува...",
        cancel: "Откажи",
        save: "Зачувај",
        continue: "Продолжи",
        back: "Назад",
        noListingsYet: "Сè уште нема огласи",
        signedOutAs: "Одјави се",
        categories: "Категории",
        browseByCategory: "Преглед по категорија",
        browseByCategoryHint: "Стеснете го пребарувањето со избор на категорија подолу.",
        responsiveLayout: "Респонзивен изглед",
        category: "Категорија",
        catGroupFood: "Храна и пијалоци",
        catGroupTransport: "Транспорт и авто",
        catGroupHome: "Дом и градина",
        catGroupHealth: "Здравје и убавина",
        catGroupEducation: "Едукација",
        catGroupProfessional: "Професионални услуги",
        catGroupTech: "Технологија и електроника",
        catGroupEvents: "Настани и забава",
        catGroupOther: "Друго",
        location: "Локација",
        contact: "Телефон за контакт",
        login: "Најава",
        email: "Е-пошта",
        password: "Лозинка",
        food: "Храна и пијалоци",
        restaurant: "Ресторани",
        cafe: "Кафе и кафе",
        bakery: "Пекарници",
        catering: "Кетеринг",
        fastFood: "Брза храна",
        grocery: "Продавници за храна",
        butcher: "Месари",
        bar: "Барови и пабови",
        pastry: "Слаткиши",
        car: "Автомобили и услуги",
        carRepair: "Поправка на автомобили",
        carWash: "Миење автомобили",
        tires: "Гуми и тркала",
        autoParts: "Авто делови",
        taxi: "Такси",
        drivingSchool: "Автошколи",
        towing: "Влечење",
        homeRepair: "Поправки и одржување дома",
        plumbing: "Водоинсталатер",
        electrical: "Електричарски услуги",
        painting: "Бојадисување и декорација",
        carpentry: "Столарство",
        cleaning: "Услуги за чистење",
        landscaping: "Градинарство и пејзаж",
        locksmith: "Бравар",
        hvac: "Греење и ладење",
        moving: "Селење и преселување",
        health: "Здравје и убавина",
        pharmacy: "Апотеки",
        dentist: "Стоматолози",
        doctor: "Лекари",
        clinic: "Клиники",
        physiotherapy: "Физиотерапија",
        hairdresser: "Фризери",
        barber: "Бербери",
        beautySalon: "Салон за убавина",
        massage: "Масажа",
        gym: "Теретани и фитнес",
        education: "Едукација и обука",
        tutoring: "Приватен туторинг",
        languageSchool: "Јазични училишта",
        musicSchool: "Музички училишта",
        privateLessons: "Приватни часови",
        services: "Општи професионални услуги",
        lawyer: "Адвокати",
        accountant: "Сметководители",
        notary: "Нотарски услуги",
        insurance: "Осигурување",
        realEstate: "Недвижен имот",
        photography: "Фотографија",
        printing: "Печатење",
        translation: "Услуги за превод",
        architect: "Архитекти",
        taxAdvisor: "Даночни советници",
        bookkeeping: "Сметководство",
        auditing: "Ревизија",
        businessConsulting: "Бизнис консултирање",
        hrRecruitment: "Човечки ресурси и регрутирање",
        marketing: "Маркетинг",
        copywriting: "Копирајтинг",
        graphicDesign: "Графички дизајн",
        videography: "Видеографија",
        consulting: "Консултирање",
        legalServices: "Правни услуги",
        customsBroker: "Царински брокер",
        tech: "ИТ и софтвер",
        electronics: "Електроника",
        phoneRepair: "Поправка на телефони",
        computerRepair: "Поправка на компјутери",
        internet: "Интернет и ISP",
        software: "Развој на софтвер",
        entertainment: "Забава",
        events: "Настани и места",
        eventPlanning: "Планирање настани",
        dj: "ДЈ",
        musician: "Музичари",
        weddingVenue: "Места за свадби",
        clothing: "Облека и аксесоари",
        pets: "Домашни миленици",
        tailor: "Шнајдер и изменувања",
        laundry: "Перење и хемиско чистење",
        other: "Друго",
        otherServices: "Други услуги (не наведени)",
        // Cities (North Macedonia – Macedonian)
        Skopje: "Скопје",
        Tetovo: "Тетово",
        Gostivar: "Гостивар",
        Kumanovo: "Куманово",
        Bitola: "Битола",
        Ohrid: "Охрид",
        Prilep: "Прилеп",
        Veles: "Велес",
        Kavadarci: "Кавадарци",
        Strumica: "Струмица",
        Kochani: "Кочани",
        Shtip: "Штип",
        Debar: "Дебар",
        Kichevo: "Кичево",
        Struga: "Струга",
        Radovish: "Радовиш",
        Gevgelija: "Гевгелија",
        Negotino: "Неготино",
        "Sveti Nikole": "Свети Николе",
        Delchevo: "Делчево",
        Vinica: "Виница",
        Berovo: "Берово",
        Probishtip: "Пробиштип",
        Kratovo: "Кратово",
        Krushevo: "Крушево",
        Valandovo: "Валандово",
        Resen: "Ресен",
        "Makedonski Brod": "Македонски Брод",
        "Makedonska Kamenica": "Македонска Каменица",
        Pehcevo: "Пехчево",
        "Kriva Palanka": "Крива Паланка",
        "Demir Kapija": "Демир Капија",
        Bogdanci: "Богданци",
        "Demir Hisar": "Демир Хисар",
        // Header / Navigation
        openDashboard: "Отвори го панелот",
        closeDashboard: "Затвори го панелот",
        myListings: "Мои огласи",
        account: "Сметка",
        explore: "Истражи",
        homepage: "Почетна",
        community: "Пазар на заедницата",
        primaryNav: "Главна навигација",
        // Hero / Landing
        heroTitle: "Најди и сподели доверливи услуги низ цела Македонија",
        heroSubtitle: "Од Скопје до Охрид, пронајди локалци кои можат да ти помогнат денес или покажи ја својата експертиза.",
        quickStart: "Брз почеток",
        heroPanelTitle: "Објави со доверба",
        heroPanelSubtitle: "Додај ги твоите детали, избери го твојот план и дозволи им на соседите да те контактираат со проверени информации за контакт.",
        heroPointOne: "Избери категорија, град и краток опис.",
        heroPointTwo: "Потврди ја твојата е-пошта или телефон за дополнителна доверба.",
        heroPointThree: "Истакни ја твојата понуда и времетраење за да останеш видлив.",
        homepageReboot: "Нов респонзивен центар",
        ctaWatchDemo: "Погледни ја турата",
        mobileFirstTitle: "Респонзивен по дифолт",
        mobileFirstSubtitle: "Изгледот се прилагодува грациозно на телефони, таблети и десктоп компјутери.",
        growthBoardTitle: "План за раст",
        growthBoardSubtitle: "Биди пронајден побрзо",
        growthBoardHelper: "Три чекори кои го одржуваат твојот оглас видлив и над главниот дел.",
        trafficIdeasTitle: "Идеи за сообраќај",
        trafficIdeasSubtitle: "Задржи ги очите на твојот оглас",
        trafficIdeasTrending: "Карусел со трендови",
        trafficIdeasFeedback: "Собери одговори",
        trafficIdeasFeedbackDesc: "Прикажи рецензии, ознаки и верификација за инстант доверба.",
        trafficIdeasLocal: "Локален фокус",
        trafficIdeasLocalDesc: "Користи ги градските и категорийските чипови за да ги насочиш купувачите во близина.",
        growthStepPost: "Објави денес",
        subscriptionUpdated: "Претплатата е успешно ажурирана!",
        errorUpdatingSubscription: "Грешка при ажурирање на претплатата",
        emailSubscription: "Претплата преку е-пошта",
        subscribeToWeeklyEmails: "Претплатете се на неделни е-пошти",
        phoneUpdated: "Телефонскиот број е успешно ажуриран!",
        errorUpdatingPhone: "Грешка при ажурирање на телефонскиот број:",
        phoneVerified: "Телефонот е верификуван",
        passwordRequired: "Потребна е лозинка за оваа акција.",
        changePhone: "Промени го телефонскиот број",
        newPhone: "Нов телефонски број",
        savePhone: "Зачувај телефон",
        // Legal Modals
        // Sidebar
        quickStats: "Брза статистика",
        activeListings: "Активни огласи",
        verifiedListings: "Верификувани огласи",
        publicListings: "Јавни огласи",
        noCommissions: "Без провизии",
        easyContact: "Лесен контакт",
        ratingsReviews: "Оцени и рецензии",
        totalViews: "Вкупни прегледи",
        joinCommunity: "Приклучи се на заедницата",
        joinCommunityDesc: "Објавете ги вашите услуги и стигнете до илјадници локалци.",
        support: "Поддршка",
        contactSupport: "Контактирајте поддршка",
        supportDesc: "Ви треба помош? Тука сме за вас.",
        uploadAlt: "Вчитај",
        termsLastUpdated: "Последно ажурирање:",
        termsIntro: "Добредојдовте во BizCall. Со користење на нашата апликација, се согласувате со овие услови.",
        terms1Title: "1. Прифаќање на Условите",
        terms1Text: "Со пристап и користење на оваа услуга, прифаќате и се согласувате да бидете обврзани со условите и одредбите на овој договор.",
        terms2Title: "2. Однесување на Корисникот",
        terms2Text: "Се согласувате да ја користите услугата само за законски цели. Вие сте одговорни за целата содржина што ја објавувате.",
        terms2List1: "Без спам или измамничка содржина.",
        terms2List2: "Без нелегални стоки или услуги.",
        terms2List3: "Без вознемирување или говор на омраза.",
        terms3Title: "3. Правила за Огласување",
        terms3Text: "Го задржуваме правото да отстраниме секој оглас што ги прекршува нашите политики без враќање на средствата.",
        terms4Title: "4. Одговорност",
        terms4Text: "BizCall е платформа што поврзува корисници. Не сме одговорни за квалитетот на услугите што ги нудат корисниците.",
        terms5Title: "5. Прекин",
        terms5Text: "Можеме да го прекинеме вашиот пристап до страницата, без причина или известување.",
        terms6Title: "6. Модификации на Услугата",
        terms6Text: "BizCall MK го задржува правото да ја модифицира или прекине услугата со или без известување до корисникот.",
        terms7Title: "7. Ограничување на Одговорноста",
        terms7Text: "Ние не сме одговорни за какви било штети што може да ви се случат како резултат на користењето на нашата веб-страница.",
        terms8Title: "8. Контакт",
        terms8Text: "За какви било прашања во врска со овие услови, ве молиме контактирајте не.",
        terms3List1: "Сите плаќања се обработуваат безбедно преку нашиот давател на плаќања (Whop).",
        terms3List2: "Информациите за плаќање се обработуваат согласно индустриските стандарди за безбедност (на пр. PCI-DSS усогласеност) од овие даватели.",
        terms3List3: "Рефундациите и откажувањата за надоместоците за огласи се управуваат според нашите политики за огласи и, каде што е применливо, условите на давателот на плаќања.",
        terms3List4: "Го задржуваме правото да ги верификуваме трансакциите за плаќање и може да побараме дополнителна верификација",
        terms3List5: "Сите цени се прикажани во избраната валута и се конечни во времето на купување",
        terms3List6: "За спорови за плаќање, ве молиме контактирајте го нашиот тим за поддршка или упатете се на процесот за решавање спорови на давателот на плаќања.",
        terms4List1: "Користиме Google Ads за прикажување релевантни реклами на нашата платформа",
        terms4List2: "Google може да користи колачиња и технологии за следење за прикажување персонализирани реклами",
        terms4List3: "Можете да ги управувате вашите преференци за реклами преку Поставките за реклами на Google",
        terms4List4: "Ние не сме одговорни за содржината на рекламите на трети страни",
        terms4List5: "Рекламите се јасно означени и одвоени од нашата содржина",
        terms4List6: "Се усогласуваме со политиките и упатствата на Google Ads",
        terms5List1: "Користиме Google Search Console за следење и подобрување на перформансите за пребарување на нашата веб-страница",
        terms5List2: "Нашата веб-страница е индексирана од Google и други главни пребарувачи",
        terms5List3: "Ги следиме Упатствата за вебмастер на Google и најдобрите практики",
        terms5List4: "Огласите може да се појават во резултатите од пребарувачот за да им помогнеме на корисниците да најдат услуги",
        terms5List5: "Вметнуваме структурирани податоци и означување на шема за подобра видливост при пребарување",
        terms5List6: "Нашата карта на страницата е поднесена до Google Search Console за ефикасно индексирање",
        terms2TextNew: "Корисниците се одговорни за точноста на нивните огласи. Се согласувате да не објавувате содржина што е нелегална, навредлива или измамничка.",
        terms2List1New: "Одржување точни информации за контакт",
        terms2List2New: "Почитување на правата за интелектуална сопственост",
        terms2List3New: "Не се вклучувајте во спам или вознемирување",
        terms3TextNew: "BizCall MK користи безбеден давател на плаќања од трета страна. Со правење плаќање, се согласувате:",
        terms4TextNew: "BizCall MK прикажува реклами преку Google Ads. Со користење на нашиот сервис, признавате:",
        terms5TextNew: "BizCall MK е оптимизиран за пребарувачи и користи Google Search Console за управување со веб-страницата:",
        privacyLastUpdated: "Последно ажурирање:",
        privacyIntro: "Вашата приватност е важна за нас. Оваа политика објаснува како ги третираме вашите податоци.",
        privacy1Title: "1. Информации што ги собираме",
        privacy1Text: "Собираме информации што ни ги давате директно, како е-пошта, телефонски број и детали за огласот.",
        privacy2Title: "2. Како ги користиме информациите",
        privacy2Text: "Ги користиме вашите информации за да управуваме и ги подобруваме нашите услуги, да олесниме плаќања и да комуницираме со вас.",
        privacy3Title: "3. Споделување на податоци",
        privacy3Text: "Не ги продаваме вашите лични податоци. Можеме да споделиме податоци со даватели на услуги (на пр. Firebase) за да работи апликацијата.",
        privacy4Title: "4. Вашите права",
        privacy4Text: "Имате право да пристапите, ажурирате или избришете вашите лични информации во секое време преку поставките на вашата сметка.",
        privacy5Title: "5. Контакт",
        privacy5Text: "Ако имате прашања во врска со оваа политика, ве молиме контактирајте не.",
        listingDeletedSuccess: "Огласот е успешно избришан.",
        expiry: "Истекување",
        resultsLabel: "резултати",
        removeFilter: "Отстрани филтер",
        aboutListing: "За овој оглас",
        accountDetails: "Вашите детали за сметката",
        accountSince: "Член од",
        accountSubtitle: "Управувајте со вашиот статус, верификација и безбедност.",
        accountLoginDescription: "Најавете се за да управувате со вашиот профил и поставки на сметката.",
        updateProfileDesc: "Ажурирајте го вашиот јавен профил",
        displayNamePlaceholder: "Внесете го вашиот приказен имиња",
        confirmDeleteAccount: "Дали сте сигурни дека сакате да ја избришете вашата сметка? Ова не може да се врати.",
        enterPasswordToConfirm: "Ве молиме внесете ја вашата лозинка за потврда:",
        deleteAccountError: "Не можеше да се избрише сметката",
        loginToViewAccount: "Ве молиме најавете се за да ја видите вашата сметка",
        errorSendingCode: "Грешка при испраќање на код за верификација",
        userAvatar: "Аватар на корисник",
        activeFilters: "Активни филтри",
        addPhoneInAccount: "Ве молиме прво додадете го вашиот телефонски број во вашата сметка.",
        addPhoneNumber: "Додај телефонски број",
        averageRating: "Просечна оцена",
        bizCall: "BizCall",
        browseListingsHint: "Прелистај ги сите огласи",
        browseMarketplace: "Прелистај го пазарот",
        extend: "Продолжи",
        deleteListing: "Избриши оглас",
        call: "Повикај",
        categorySpotlight: "Популарни категории",
        changeEmail: "Промени е-пошта",
        changePassword: "Промени лозинка",
        chooseOnMap: "Избери на мапа",
        cities: "градови",
        clearAll: "Исчисти сè",
        clearFilters: "Исчисти филтри",
        cloudFeedbackNote: "Оцените се чуваат безбедно.",
        codeSent: "Кодот е успешно испратен!",
        enterCode: "Внесете го кодот за верификација",
        verificationCode: "Код за верификација",
        verifying: "Се проверува...",
        commentEmptyError: "Коментарот не може да биде празен",
        commentPlaceholderDetailed: "Споделете го вашето искуство или поставете прашање.",
        communityFeedback: "Повратни информации од заедницата",
        contactAutofill: "Го користиме телефонот од вашата сметка за доверба и безбедност.",
        contactEmail: "Е-пошта за контакт",
        copied: "Копирано во клипборд",
        copy: "Копирај",
        createAccount: "Креирај сметка",
        createListingHint: "Креирај нов оглас",
        currentPassword: "Тековна лозинка",
        currentPasswordPlaceholder: "Внесете ја тековната лозинка",
        dashboard: "Панел",
        day: "ден",
        days: "дена",
        del: "Избриши",
        description: "Опис",
        edit: "Уреди",
        emailAction: "Е-пошта",
        emailChangeNotAvailable: "Промената на е-пошта не е достапна за оваа сметка.",
        emailLabel: "Е-пошта",
        emailLinkSent: "Испратена врска по е-пошта",
        emailLoginSignup: "Најава / Регистрација преку е-пошта",
        emailTab: "Е-пошта",
        emailUpdateError: "Не можеше да се ажурира е-поштата.",
        emailUpdateSuccess: "Е-поштата е успешно ажурирана.",
        emailVerified: "Е-поштата е потврдена!",
        enterCode: "Внесете го кодот за верификација",
        enterCurrentPassword: "Ве молиме внесете ја вашата тековна лозинка.",
        enterEmail: "Ве молиме внесете ја вашата е-пошта",
        enterValidEmail: "Ве молиме внесете валидна е-пошта.",
        enterValidPhone: "Ве молиме внесете валиден телефонски број.",
        error: "Грешка:",
        errorUpdatingPhone: "Грешка при ажурирање на телефонот:",
        eur: "EUR",
        expired: "Истечен",
        expires: "Истекува",
        expiringSoon: "Истекува наскоро",
        exploreHint: "Пребарувај по категорија, цена и локација.",
        favorite: "Омилено",
        favorites: "Омилени",
        feedbackSaved: "Повратните информации се зачувани",
        feedbackSaveError: "Не можеше да се зачуваат повратните информации.",
        deleteReview: "Избриши рецензија",
        deleteReviewConfirm: "Да се избрише оваа рецензија?",
        reviewDeleted: "Рецензијата е избришана.",
        cannotDeleteReview: "Не можете да ја избришете оваа рецензија.",
        feedbackDeleteError: "Не успеа бришењето на рецензијата.",
        cannotLeaveFeedbackOnInactive: "Можете да оставате повратни информации само за активни, платени огласи.",
        feedbackSidebarBlurb: "Оцените им помагаат на сите да ги видат најдоверливите огласи.",
        fillAllFields: "Ве молиме пополнете ги сите задолжителни полиња.",
        filters: "Филтри",
        getStartedFast: "Започни брзо",
        goToAccount: "Оди до сметката",
        hideFilters: "Скриј филтри",
        homeDigest: "Слика во живо",
        homeHowItWorksTitle: "Како работи",
        homeHowItWorksStep1: "Објавете оглас со вашиот телефонски број, град и краток опис.",
        homeHowItWorksStep2: "Луѓето ве повикуваат или ви пишуваат на Viber / WhatsApp.",
        homeHowItWorksStep3: "Тие оставаат оцени за другите да знаат кој е доверлив.",
        step: "Чекор",
        mainActions: "Главни акции",
        popularCategories: "Популарни категории",
        homePopularCategoriesTitle: "Најкористени категории",
        whyChooseUs: "Зошто да изберете BizCall MK?",
        verifiedListingsDesc: "Сите огласи се верификувани за автентичност и доверливост.",
        noCommissionsDesc: "Поврзете се директно со давателите на услуги. Без посредник, без провизии.",
        easyContactDesc: "Контактирајте ги огласите директно преку телефон, WhatsApp или е-пошта.",
        ratingsReviewsDesc: "Прочитајте ги оцените од вистински корисници за да донесете информирани одлуки.",
        homePopularCitiesTitle: "Популарни градови",
        homeSimpleCtaBrowse: "Прелистај огласи",
        homeSimpleCtaPost: "Објави оглас",
        homeSimpleSubtitle: "Објавете мал оглас со вашиот телефонски број и град.",
        homeSimpleTitle: "Најдете мајстор, продавач или услуга во вашиот град",
        homeSimpleCtaPostBenefit: "Добијте повеќе повици за вашиот бизнис",
        homeSimpleCtaBrowseBenefit: "Бидете видливи за локалните клиенти",
        localBusinessesJoiningBizCall: "Локалните бизниси им се приклучуваат на BizCall",
        overViews: "Над {{count}} прегледи",
        overContactAttempts: "Над {{count}} обиди за контакт",
        homeTopFeaturedTitle: "Топ истакнати огласи",
        homeTopFeaturedSubtitle: "Огласи кои имаат корист од BizCall — прегледи и контакти",
        lastMonth: "Минатиот месец",
        thisMonth: "Овој месец",
        chartAmount: "Износ",
        viewsCount: "{{count}} прегледи",
        callsMessagesEmails: "{{count}} повици/пораки/е-пошта",
        listingPerformingAboveAverage: "Над просекот ({{pct}}%)",
        listingPerformingBelowAverage: "Под просекот ({{pct}}%)",
        listingPerformingAverage: "Околу просекот",
        listingExpiresInDays: "Вашиот оглас истекува за {{days}} дена. Обновете за 3€ за да продолжите да добивате клиенти.",
        renewNow: "Обнови сега",
        listingPausedRenewToReactivate: "Вашиот оглас е паузиран. Обновете за повторна активација.",
        trustNoCommissions: "Без провизии",
        trustDirectContact: "Директен контакт со клиентите",
        trustCancelAnytime: "Откажете се во секое време",
        trustLocalPlatform: "Доверлива локална платформа во Северна Македонија",
        contactByPhone: "Повици",
        contactByEmail: "Е-пошта",
        contactByWhatsapp: "WhatsApp",
        homeSimpleTrustLine: "Без провизии, разговарате директно преку телефон или Viber.",
        invalidCode: "Невалиден код за верификација.",
        iVerified: "Потврдив",
        listedOn: "Објавено на",
        listing: "оглас",
        listingsLabel: "огласи",
        localMissions: "Локални мисии",
        localMissionsDesc: "Ажурирајте го вашиот профил за да ја зголемите видливоста.",
        locationDetails: "Детали за локацијата",
        locationExtra: "Град / село / населба (опционално)",
        locationLabelFull: "Локација",
        locationSetTo: "Локацијата е поставена на",
        loginRequired: "Ве молиме најавете се за да објавите оглас.",
        loginSubtitle: "Пристапете до вашата BizCall сметка.",
        manageListings: "Управувај со огласи",
        maxPrice: "Макс",
        priceRange: "Опсег на цени",
        memberSince: "Член од",
        menu: "Мени",
        minPrice: "Мин",
        myListingsHint: "Управувајте, уредувајте и продолжувајте ги вашите огласи.",
        name: "Име на бизнис или услуга",
        newEmail: "Нова е-пошта",
        newEmailPlaceholder: "Внесете нова е-пошта",
        newPassword: "Нова лозинка",
        newPasswordPlaceholder: "Внесете нова лозинка",
        noExpiry: "Без истекување",
        noFeedback: "Сè уште нема повратни информации",
        noFeedbackYet: "Сè уште нема повратни информации. Бидете првиот што ќе рецензира!",
        noListingsAvailable: "Моментално нема достапни огласи.",
        noListingsFound: "Не се пронајдени огласи",
        noListingsMatchFilters: "Ниту еден оглас не одговара на вашите филтри.",
        notOwner: "Можете да го продолжите само вашиот сопствен оглас.",
        notVerifiedYet: "Сè уште не е потврдено. Проверете ја вашата е-пошта.",
        offerPriceLabel: "Опсег на понудена цена (опционално)",
        openInMaps: "Отвори во Мапи",
        passwordChangeNotAvailable: "Промената на лозинка не е достапна за оваа сметка.",
        passwordsDontMatch: "Новите лозинки не се совпаѓаат.",
        passwordTooShort: "Лозинката мора да има најмалку 8 карактери и најмалку 2 броеви.",
        passwordRequirement: "Најмалку 8 карактери и 2 броеви",
        passwordUpdateError: "Не можеше да се ажурира лозинката.",
        passwordUpdateSuccess: "Лозинката е успешно ажурирана.",
        pending: "Во исчекување",
        pendingVerification: "Верификацијата е во тек",
        phoneLoginSubtitle: "Најавете се брзо со SMS код на вашиот телефон.",
        phoneNumber: "Телефонски број",
        phoneSynced: "Користење на телефонскиот број од вашата сметка.",
        pickCityChip: "Изберете град за да бидете пронајдени побрзо.",
        postedOn: "Објавено на",
        postingReadyHint: "Огласите го користат вашиот зачуван телефон и локација.",
        postService: "Објави услуга",
        previewDescriptionPlaceholder: "Тука се појавува краток опис...",
        previewTitlePlaceholder: "Име на вашиот бизнис",
        priceLabel: "Цена",
        priceRangeLabel: "Опсег на цени",
        pricing: "Цени",
        pricingIntro: "Изберете колку долго сакате вашиот оглас да остане активен на BizCall MK. Подолгите планови се поекономични и ја одржуваат вашата услуга видлива подолго време.",
        pricingPlan1Point1: "Идеално за тестирање на BizCall MK или кратки кампањи.",
        pricingPlan1Point2: "Вашиот оглас останува активен 30 дена.",
        pricingPlan3Point1: "Подобра вредност за сезонски или среднорочни услуги.",
        pricingPlan3Point2: "Одржете го вашиот оглас активен целосни 3 месеци.",
        pricingPlan6Point1: "Одлично за стабилни, постојани локални услуги.",
        pricingPlan6Point2: "Помала месечна цена во споредба со кратките планови.",
        pricingPlan12Point1: "Најдобар долгорочен видливост: вашиот оглас останува активен цела година.",
        pricingPlan12Point2: "Истакнато првите 3 месеци — врв на пребарувањето и истакната ознака.",
        pricingPlan12Point3: "Потоа останува стандарден активен оглас за преостанатите 9 месеци.",
        pricingPaymentMethodsTitle: "Плаќања и наплата",
        pricingPaymentMethodsText: "Надоместоците за огласување се еднократни уплати во EUR за избраниот период. Плаќањата се обработуваат безбедно преку Whop. Нема автоматски обновувања или претплати.",
        pricingRefundsTitle: "Рефундации и откажувања",
        pricingRefundsText: "Бидејќи BizCall MK обезбедува пристап до дигитална услуга за огласување, уплатите вообичаено не се рефундираат откако огласот ќе биде активиран. Ако сметате дека сте наплатени по грешка, контактирајте не и ќе го разгледаме случајот.",
        pricingPlatformNoteTitle: "За оваа платформа",
        pricingPlatformNoteText: "BizCall MK е пазар за локални услуги. Ние ги поврзуваме луѓето кои бараат услуги со локални даватели; ние не ги продаваме услугите сами и не сме страна во договорот меѓу клиентите и давателите.",
        profileInfo: "Информации за профилот",
        quickActions: "Брзи акции",
        quickFacts: "Брзи факти",
        ratingLabel: "Ваша оцена",
        recentFeedback: "Неодамнешни повратни информации",
        remaining: "преостанато",
        repeatNewPassword: "Повторете ја новата лозинка",
        repeatNewPasswordPlaceholder: "Повторете ја новата лозинка",
        reputation: "Репутација",
        resendEmail: "Препрати е-пошта",
        resendVerificationEmail: "Препрати е-пошта за верификација",
        resultsPerPage: "По страница",
        reviews: "рецензии",
        saveEmail: "Зачувај е-пошта",
        saveFeedback: "Зачувај повратни информации",
        savePassword: "Зачувај лозинка",
        saving: "Се зачувува...",
        search: "Пребарај",
        securitySettings: "Безбедност и најава",
        securitySettingsText: "Ажурирајте ги вашата е-пошта и лозинка.",
        selectCategory: "Избери категорија",
        selectCity: "Избери град",
        sendLink: "Испрати врска за најава",
        sendVerifyLink: "Испрати врска за верификација",
        share: "Сподели",
        shareCopied: "Врската до огласот е копирана ✅",
        shareLinkHint: "Испратете ја врската до вашиот оглас на соседите.",
        shareListing: "Сподели оглас",
        shareNotSupported: "Овој уред не поддржува споделување.",
        shareText: "Споделено од BizCall MK",
        showFilters: "Прикажи филтри",
        signedIn: "Најавен",
        signedOut: "Одјавен",
        signInWithPhone: "Телефонски број",
        signup: "Регистрирај се",
        signupSubtitle: "Креирајте ја вашата BizCall сметка.",
        createAccount: "Креирај сметка",
        enterCode: "Внесете го кодот за верификација",
        verifyPhone: "Потврди телефонски број",
        codeSent: "Кодот е успешно испратен!",
        invalidCode: "Невалиден код за верификација.",
        signupSuccess: "Сметката е успешно креирана!",
        sixMonths: "6 месеци",
        socialPlaceholder: "Социјални мрежи / Веб (опционално)",
        sortAZ: "А → Ш",
        sortExpiring: "Истекува наскоро",
        sortNewest: "Најнови",
        sortTopRated: "Највисоко оценети",
        spotlightHintHero: "Следете го моментумот и останете верификувани.",
        status: "Статус",
        statusLabel: "Статус",
        stepBasic: "Основно",
        stepDetails: "Детали",
        stepPlanPreview: "План и преглед",
        submitListing: "Објави го твојот оглас",
        submitListingDesc: "Објави, потврди и публикувај за неколку минути.",
        switchToGridView: "Префрли на приказ во мрежа",
        switchToListView: "Префрли на приказ во листа",
        switchToGrid: "Префрли на приказ во мрежа",
        switchToList: "Префрли на приказ во листа",
        gridView: "Приказ во мрежа",
        listView: "Приказ во листа",
        tryAdjustingFilters: "Обидете се да ги прилагодите вашите филтри за да видите повеќе резултати.",
        searchListings: "Пребарај огласи",
        addFavorite: "Додај во омилени",
        removeFavorite: "Отстрани од омилени",
        viewListing: "Види оглас",
        removeCategoryFilter: "Отстрани филтер за категорија",
        removeLocationFilter: "Отстрани филтер за локација",
        clearAllFilters: "Исчисти Сите Филтри",
        previous: "Претходна",
        next: "Следна",
        pagination: "Страницирање",
        sidebar: "Странична лента",
        loadingListings: "Се вчитуваат огласи",
        verifiedListingsLabel: "верификувани огласи",
        pendingListingsLabel: "огласи на чекање",
        totalListingsLabel: "вкупно огласи",
        searchYourListings: "Пребарај ги твоите огласи...",
        searchYourListingsLabel: "Пребарај ги твоите огласи",
        toggleFilters: "Промени филтри",
        newListing: "Нов оглас",
        createYourFirstListing: "Креирај го твојот прв оглас",
        noListingsYetDescription: "Започнете со креирање на вашиот прв оглас!",
        noListingsMatchFiltersDescription: "Обидете се да ги прилагодите вашите филтри за да видите повеќе резултати.",
        yourListings: "Твоите огласи",
        removeSearchFilter: "Отстрани филтер за пребарување",
        removeStatusFilter: "Отстрани филтер за статус",
        removeExpiryFilter: "Отстрани филтер за истекување",
        categoryLabel: "Категорија",
        locationLabel: "Локација",
        ratingStars: "ѕвезди",
        feedbackCountLabel: "коментари",
        engagementLabel: "Ангажираност",
        listingIdLabel: "ID на оглас",
        additionalActions: "Дополнителни дејства",
        emailListingOwner: "Испрати е-пошта на сопственикот на огласот",
        copyContactInfo: "Копирај информации за контакт",
        deleteListing: "Избриши оглас",
        tagsPlaceholder: "Ознаки, одвоени со запирка (опционално)",
        thankYou: "Ви благодариме за вашето плаќање!",
        threeMonths: "3 месеци",
        totalAmount: "Вкупен износ",
        trustPoint1: "Сите огласи се рачно прегледани.",
        trustPoint2: "Директен контакт со бизнисите, без провизии.",
        trustPoint3: "Изградено за градови низ Северна Македонија.",
        trustPoint4: "Опција за пријавување сомнителни огласи.",
        trustSafetyLane: "Патека за доверба и безбедност",
        trustSafetyLaneDesc: "Чувајте ги разговорите безбедни со верификувани контакти.",
        tryDifferentFilters: "Обидете се да го прилагодите вашето пребарување или филтри.",
        twelveMonths: "12 месеци",
        unspecified: "Неодредено",
        updateEmailDesc: "Ажурирајте ја вашата е-пошта",
        updateListing: "Освежи го огласот",
        updateListingHint: "Додајте нова ознака за да се истакнете.",
        useAccountPhone: "Користи го телефонот од сметката",
        verificationError: "Грешка при испраќање верификација:",
        verificationSent: "Испратена е е-пошта за верификација.",
        verified: "Верификуван",
        verifiedHint: "Задржете ја довербата со верификувани профили.",
        verifyEmailFirst: "Ве молиме потврдете ја вашата е-пошта пред објавување.",
        verifyEmailHint: "Испративме врска за верификација на вашата е-пошта.",
        verifyFootnote: "Совет: може да потрае една минута.",
        verifying: "Се проверува...",
        verifyLater: "Потврди подоцна",
        verifyPhone: "Потврди телефонски број",
        verifyYourEmail: "Потврдете ја вашата е-пошта",
        view: "Види",
        views: "Прегледи",
        totalViews: "Вкупно прегледи",
        websiteLabel: "Веб-страница",
        whyTrustUs: "Зошто BizCall MK?",
        whyChooseUs: "Зошто да изберете BizCall MK?",
        verifiedListingsDesc: "Сите огласи се верификувани за автентичност и доверливост.",
        noCommissionsDesc: "Поврзете се директно со давателите на услуги. Без посредник, без провизии.",
        easyContactDesc: "Контактирајте ги огласите директно преку телефон, WhatsApp или е-пошта.",
        ratingsReviewsDesc: "Прочитајте ги оцените од вистински корисници за да донесете информирани одлуки.",
        // Payment notifications
        paymentSuccess: "Плаќањето е успешно. Вашиот оглас е објавен.",
        paymentSuccessfulListingActivated: "Плаќањето е успешно. Вашиот оглас е објавен.",
        paymentFailed: "Плаќањето не успеа. Вашиот оглас е зачуван во Мои огласи.",
        listingExtendedSuccess: "Огласот е успешно продолжен!",
        listingExtendedSuccessfully: "Огласот е успешно продолжен!",
        paymentSucceededButListingUpdateFailed: "Плаќањето е успешно, но ажурирањето на огласот не успеа. Ве молиме контактирајте ја поддршката.",
        listingSavedButPaymentFailed: "Огласот е зачуван, но плаќањето не успеа. Ве молиме пробајте повторно од Мои огласи.",
        youMustBeLoggedIn: "Мора да бидете најавени.",
        listingCreatedSuccess: "Огласот е успешно креиран!",
        listingNotFound: "Огласот не е пронајден",
        errorLoadingListing: "Грешка при вчитување на огласот",
        loadingListing: "Се вчитува огласот...",
        clickToEnlarge: "Кликнете за зголемување",
        noImageAvailable: "Нема достапна слика",
        previousImage: "Претходна слика",
        nextImage: "Следна слика",
        imageThumbnails: "Минијатури на слики",
        viewImage: "Види слика",
        thumbnail: "Минијатура",
        openWhatsApp: "Отвори разговор на WhatsApp",
        sendEmail: "Испрати е-пошта",
        additionalInfo: "Дополнителни Информации",
        expiresOn: "Истекува На",
        daysLeft: "дена останати",
        noDescription: "Нема даден опис.",
        yourRating: "Вашата Оцена",
        selectRating: "Избери оценка",
        star: "ѕвезда",
        stars: "ѕвезди",
        yourReview: "Вашата Рецензија",
        reviewComment: "Коментар на рецензијата",
        writeFeedback: "Напиши рецензија...",
        submitting: "Се испраќа...",
        loginToReview: "Најавете се за да оставите рецензија",
        anonymous: "Анонимен",
        fullSizeImageViewer: "Прегледувач на слика со полна големина",
        closeImageViewer: "Затвори прегледувач на слика",
        fullSize: "Полна големина",
        likes: "Омилени",
        basedOn: "базирано на",
        listingSavedUnpaid: "Огласот е зачуван, но плаќањето не успеа. Ве молиме пробајте повторно од Мои огласи.",
        redirectingToPayment: "Пренасочување кон плаќање...",
        paymentTimeout: "Барањето за плаќање истече. Ве молиме пробајте повторно.",
        paymentSuccessPageTitle: "Плаќањето е завршено",
        paymentSuccessPageBody: "Вашиот оглас се активира и наскоро ќе се појави во пребарувањето.",
        paymentFailedPageTitle: "Плаќањето не помина",
        paymentFailedPageBody: "Не беа направени наплати. Вашиот оглас е зачуван — пробајте повторно од Мои огласи кога сте подготвени.",
        // Login/Signup notifications
        loginSuccess: "Најавата е успешна! Добредојдовте назад.",
        signupSuccess: "Сметката е успешно креирана! Ве молиме потврдете ја вашата е-пошта.",
        loginError: "Најавата не успеа. Ве молиме проверете ги вашите податоци.",
        signupError: "Регистрацијата не успеа. Ве молиме пробајте повторно.",
        userNotFound: "Не е пронајдена сметка со оваа е-пошта адреса.",
        wrongPassword: "Неточна лозинка. Ве молиме пробајте повторно.",
        tooManyAttempts: "Премногу неуспешни обиди. Ве молиме пробајте повторно подоцна.",
        networkError: "Грешка во мрежата. Ве молиме проверете ја вашата врска.",
        // Other notifications
        listingDeleted: "Огласот е успешно избришан.",
        listingUpdated: "Огласот е успешно ажуриран.",
        profileUpdated: "Профилот е успешно ажуриран.",
        accountTitle: "Сметка",
        active: "Активен",
        allCategories: "Сите категории",
        allExpiry: "Сите",
        allListingsHint: "Прегледајте ги и филтрирајте ги сите верификувани огласи.",
        allLocations: "Сите локации",
        allStatuses: "Сите статуси",
        amount: "Износ",
        areaLabel: "Област",
        authOptional: "Автентикација (Опционално)",
        browse: "Прелистај огласи",
        browseAllCategories: "Сите категории",
        choosePayment: "Изберете метод на плаќање",
        city: "град",
        cityLabel: "Град",
        cityShortcuts: "Популарни градови",
        clearSearch: "Исчисти пребарување",
        closeFilters: "Затвори филтри",
        communityTagline: "Доверливи локални услуги",
        confirmPassword: "Потврди лозинка",
        contactEditLocked: "Телефонскиот број не може да се промени овде. Ажурирајте го во поставките за Сметка.",
        coverImage: "Насловна слика",
        date: "Датум",
        emailSameAsCurrent: "Ве молиме внесете различна е-пошта",
        emailUpdateSuccessVerify: "Е-поштата е успешно ажурирана! Ве молиме проверете ја вашата нова е-пошта за верификација.",
        listingCreatedSuccess: "Огласот е успешно креиран!",
        freeTrialActivated: "Бесплатниот пробен период е активиран! Вашиот оглас е сега активен за 1 месец.",
        freeTrialAvailable: "Достапен е Бесплатен Пробен Период!",
        freeTrialDesc: "Изберете го планот од 1 месец за да го добиете првиот месец целосно бесплатно.",
        freeFor1Month: "1 месец бесплатно",
        freeTrialEndsIn: "Понудата истекува за",
        freeTrialCountdown: "Преостанато време за бесплатна понуда",
        hours: "ч",
        minutes: "мин",
        seconds: "сек",
        free: "БЕСПЛАТНО",
        enterPhone: "Ве молиме внесете го вашиот телефонски број",
        enterName: "Ве молиме внесете го вашето име",
        errorOccured: "Се појави грешка. Ве молиме обидете се подоцна.",
        exploreHeroSubtitle: "Користете ги брзите филтри за да ги одржувате картичките уредни и отворете ги деталите кога ќе бидете подготвени.",
        exploreHeroTitle: "Истражете доверливи локални огласи",
        failed: "Неуспешно",
        favoritesOnly: "Само омилени",
        filterByCategory: "Филтрирај по категорија",
        filterByLocation: "Филтрирај по локација",
        filterHelper: "Скратете го пребарувањето по име, град, категорија или преференца за сортирање.",
        // Phone Login
        phoneLogin: "Најава со телефон",
        phoneLoginTitle: "Најава со телефон",
        phoneLoginSubtitle: "Ќе испратиме 6-цифрен код за верификација.",
        loginPhoneSubtitle: "Најавете се со вашиот телефонски број за брз пристап.",
        otpSent: "OTP е испратен на вашиот телефонски број.",
        otpError: "Неуспешно испраќање на OTP",
        enterOtp: "Ве молиме внесете го OTP кој е испратен на вашиот телефон.",
        otpVerifyError: "Невалиден OTP. Ве молиме обидете се повторно.",
        sendCode: "Испрати OTP код",
        verifyAndLogin: "Потврди OTP и најави се",
        codeSent: "Кодот за верификација е успешно испратен.",
        invalidCode: "Невалиден код за верификација. Ве молиме обидете се повторно.",
        phonePlaceholder: "70 123 456",
        verificationCodePlaceholder: "123456",
        signupNameLabel: "Име",
        sending: "Се испраќа...",
        verifyOtp: "Потврди и најави се",
        verifyingOtp: "Се потврдува...",
        otpSentTo: "Кодот е испратен на",
        changeNumber: "Промени број",
        // Listing Detail
        onlinePresence: "Онлајн присуство",
        writeReviewPlaceholder: "Напиши рецензија...",
        submitReview: "Испрати рецензија",
        whatsapp: "WhatsApp",
        callNow: "Јави се веднаш",
        emailNow: "Испрати е-пошта веднаш",
        visitWebsite: "Посети веб-сајт",
        maximize: "Зголеми",
        filterSubtitle: "Прочистете го вашето пребарување",
        growthStepPostDesc: "Започнете со верификуван контакт, ознака за град и опсег на цени.",
        growthStepRespond: "Одговорете насекаде",
        growthStepRespondDesc: "Компактните картички и брзите акции остануваат лесни за користење на мобилен.",
        growthStepShare: "Споделете брзо",
        invalidCredentials: "Невалидна е-пошта или лозинка.",
        language: "Јазик",
        loginSuccess: "Најавата е успешна!",
        loginToPost: "Ве молиме најавете се за да објавите оглас",
        loginWithEmail: "Најавете се со линк преку е-пошта",
        manageListingsHint: "Управувајте со сè на едно место",
        map: "Мапа",
        mkRibbonSubtitle: "Локален распоред, јазик на македонски и кратенки за градови што ги знаете.",
        mkRibbonTitle: "Направено за Северна Македонија",
        months: "месец/и",
        mustLoginToCreate: "Мора да бидете најавени за да креирате оглас",
        neighborhoodFriendly: "Навигација прилагодена на маалските потреби",
        networkError: "Мрежна грешка. Проверете ја вашата врска.",
        no: "Не",
        noTransactions: "Сè уште нема трансакции.",
        passwordIncorrect: "Неточна лозинка. Ве молиме обидете се повторно.",
        passwordMismatch: "Лозинките не се совпаѓаат.",
        plan: "План",
        postingReady: "Објавата е подготвена",
        preview: "Преглед",
        currency: "Валута",
        listingCreatedSuccessFreeTrial: "Огласот е успешно креиран! Бесплатниот пробен период е активиран.",
        zeroEur: "0 EUR",
        loadingMap: "Се вчитува картата...",
        priceRangePlaceholder: "Опсег на цени (на пр. 500 - 800 MKD)",
        profile: "Профил",
        quickFilters: "Брзи филтри",
        refineResults: "Прочисти резултати",
        resendCode: "Препрати код",
        resetFilters: "Ресетирај филтри",
        resultsSummary: "Сортирано по рејтинг со скратени описи за лесно скенирање.",
        reviewsLabel: "Рецензии",
        searchPlaceholder: "Пребарувај по име или опис...",
        shareHint: "Споделете го вашиот оглас со соседите за да соберете повратни информации и да ја зголемите видливоста.",
        signedUp: "Регистриран",
        socialShortPlaceholder: "Социјални мрежи / Веб-страница",
        sortBy: "Сортирај по",
        sortOldest: "Прво најстари",
        spotlightHint: "Рингишпил од доверливи огласи кој останува видлив без бескрајно скролање.",
        success: "Успех",
        tagsFieldLabel: "Тагови",
        tagsLabel: "Тагови",
        tagsShortPlaceholder: "Тагови (опционално)",
        todaySpotlight: "Денешна табла во фокус",
        transactionHistory: "Историја на трансакции",
        transactions: "Трансакции",
        updateProfile: "Ажурирај профил",
        uploadCoverLocal: "Поставете насловна слика (локално)",
        verifiedLabel: "Верификуван",
        verifyCurrentEmailFirst: "Ве молиме верификувајте ја вашата моментална е-пошта пред да ја промените.",
        viewDetails: "Види детали",
        websiteFieldLabel: "Веб-страница / Социјална мрежа",
        websitePlaceholder: "Залепете линк (опционално)",
        yes: "Да",
        removeFilter: "Отстрани филтер",
        listingDeleted: "Огласот е избришан",
        notSignedIn: "Не сте најавени.",
        saveSuccess: "Успешно зачувано!",
        sendingCode: "Се испраќа код...",
        verifying: "Се верификува...",
        verifyCode: "Верификувај код",
        phoneAlreadyInUse: "Овој телефонски број веќе се користи од друга сметка.",
        phoneAlreadyInUseTitle: "Телефонскиот број е веќе во употреба",
        invalidPhone: "Невалиден телефонски број.",
        errorOccurred: "Се појави грешка.",
        copiedToClipboard: "Копирано во клипборд!",
        shareVia: "Сподели преку",
        loginToSeeMore: "Најавете се за да видите повеќе",
        noAccount: "Немате сметка?",
        alreadyHaveAccount: "Веќе имате сметка?",
        forgotPassword: "Ја заборавивте лозинката?",
        resetPassword: "Ресетирај лозинка",
        passwordResetEmailSent: "Е-поштата за ресетирање на лозинката е испратена. Проверете го вашиот inbox.",
        passwordResetError: "Неуспешно испраќање на е-пошта за ресетирање на лозинката. Ве молиме обидете се повторно.",
        enterEmailForReset: "Ве молиме прво внесете ја вашата е-пошта.",
        terms: "Услови",
        privacy: "Приватност",
        emailUpdated: "Е-поштата е успешно ажурирана",
        phoneUpdated: "Телефонскиот број е успешно ажуриран",
        emailRequired: "Е-поштата е задолжителна.",
        phoneRequired: "Телефонскиот број е задолжителен.",
        passwordRequired: "Лозинката е задолжителна.",
        invalidEmail: "Невалидна е-пошта.",
        unauthorized: "Неовластен пристап.",
        forbidden: "Забранет пристап.",
        sessionExpired: "Сесијата истече. Ве молиме најавете се повторно.",
        loadingMore: "Се вчитуваат повеќе...",
        noMoreData: "Нема повеќе податоци за вчитување.",
        searchNoResults: "Не се пронајдени резултати за вашето пребарување.",
        somethingWentWrong: "Нешто тргна наопаку. Ве молиме обидете се повторно.",
        somethingWentWrongTitle: "Нешто тргна наопаку.",
        apologizeInconvenience: "Се извинуваме за незгодата. Ве молиме обидете се да ја освежите страницата.",
        refreshPage: "Освежи Страница",
        tryAgain: "Обидете се повторно",
        goBack: "Одете назад",
        pageNotFound: "Страницата не е пронајдена.",
        pageNotFoundTitle: "404 - Страницата Не Е Пронајдена",
        pageNotFoundDescription: "Страницата што ја барате не постои или е преместена.",
        goHome: "Оди на Почетна",
        closeNotification: "Затвори известување",
        advertisement: "Реклама",
        loginToSubmitListing: "Најавете се за да поднесете оглас",
        home: "Почетна",
        dashboard: "Табла",
        settings: "Поставки",
        profile: "Профил",
        security: "Безбедност",
        notifications: "Известувања",
        help: "Помош",
        faq: "ЧПП",
        contactUs: "Контакт",
        contactDescription: "Имате прашање или повратни информации? Би сакале да слушнеме од вас!",
        contactFormSuccess: "Ви благодариме! Вашата порака беше успешно испратена.",
        contactFormError: "Извинете, имаше грешка при испраќање на вашата порака. Ве молиме обидете се повторно.",
        sendMessage: "Испрати Порака",
        sending: "Се испраќа...",
        contactAlternative: "Алтернативно, можете да не контактирате на:",
        contactAlternativeTitle: "Други Начини Да Не Контактирате",
        newMessage: "Нова Порака",
        contactFormSubmission: "Нова порака од контакт формата",
        from: "од",
        noSubject: "Без тема",
        contactFormFooter: "Овој email беше испратен од контакт формата на bizcall.mk",
        enterName: "Внесете го вашето име",
        enterEmail: "Внесете го вашиот email",
        subject: "Тема",
        message: "Порака",
        enterSubject: "Внесете тема",
        enterMessage: "Внесете ја вашата порака",
        termsOfService: "Услови за користење",
        reviewNotificationSubject: "Нова рецензија за вашиот оглас",
        reviewNotificationText: "Здраво, некој штотуку остави рецензија за вашиот оглас.",
        reviewNotificationComment: "Коментар",
        reviewNotificationCheck: "Проверете го овде",
        seoTitle: "BizCall - Локални услуги",
        seoDescription: "Најдете и споделете доверливи локални услуги низ цела Северна Македонија",
        seoKeywords: "локални услуги, пазар, Северна Македонија, Скопје, Тетово",
        page: "Страница",
        of: "од",
        exploreSubtitle: "Најдете и споделете доверливи локални услуги низ цела Северна Македонија",
        allCities: "Сите градови",
        privacyPolicy: "Политика за приватност",
        cookiesPolicy: "Политика за колачиња",
        allRightsReserved: "Сите права се задржани.",
        madeWithLove: "Изработено со љубов во Северна Македонија",
        version: "Верзија",
        build: "Билд",
        // Added/Refined keys
        differentEmailRequired: "Ве молиме внесете поинаква адреса на е-пошта",
        verifyCurrentEmailBeforeChange: "Ве молиме потврдете ја вашата моментална е-пошта пред да ја промените.",
        addPhoneInAccountSettings: "Прво додадете го вашиот телефон во поставките на сметката.",
        createListing: "Креирај оглас",
        browseListings: "Прелистај огласи",
        emailChangeRestricted: "⚠️ Промената на е-пошта е ограничена од Firebase. Вашата нова е-пошта е зачувана во вашиот профил, но ќе треба да се одјавите и да се најавите со вашата нова адреса на е-пошта. Алтернативно, контактирајте со поддршката за да овозможите промени на е-пошта во Firebase Console.",
        reviewRestrictedSignin: "⚠️ Прегледот е ограничен. Мора да бидете најавени за да оставите повратни информации.",
        reviewRestrictedVerified: "⚠️ Само верификуваните корисници кои сè уште не го прегледале овој оглас можат да остават повратни информации.",
        emailChangeFailed: "Промената на е-пошта не успеа. Firebase ги ограничи промените на е-пошта. Ве молиме контактирајте со поддршката.",
        emailInUse: "Оваа е-пошта веќе се користи од друга сметка.",
        recentLoginRequired: "Ве молиме одјавете се и повторно најавете се пред да ја промените вашата е-пошта.",
        emailEnumProtection: "Промените на е-пошта се блокирани од 'Email Enumeration Protection' во Firebase.",
        previousPage: "Претходна страница",
        nextPage: "Следна страница",
        callAction: "Повикај",
        share: "Сподели",
        day: "ден",
        days: "дена",
        all: "Сите",
        allCategories: "Сите категории",
        allLocations: "Сите локации",
        any: "Било кој",
        confirmDelete: "Дали сте сигурни дека сакате да го избришете овој оглас?",
        emailAction: "Е-пошта",
        shareAction: "Сподели",
        websiteLabel: "Веб-страница",
        unspecified: "Неодредено",
        notOwner: "Вие не сте сопственик на овој оглас.",
        verifyEmailFirst: "Ве молиме прво потврдете ја вашата е-пошта.",
        saveSuccess: "Промените се успешно зачувани!",
        // Legal Modals
        termsLastUpdated: "Последно ажурирано:",
        termsIntro: "Добредојдовте во BizCall. Со користење на нашата апликација, се согласувате со овие услови.",
        terms1Title: "1. Прифаќање на условите",
        terms1Text: "Со пристап и користење на оваа услуга, прифаќате и се согласувате да бидете обврзани со условите и одредбите на овој договор.",
        terms2Title: "2. Однесување на корисникот",
        terms2Text: "Се согласувате да ја користите услугата само за законски цели. Вие сте одговорни за целата содржина што ја објавувате.",
        terms2List1: "Без спам или содржина што доведува во заблуда.",
        terms2List2: "Без нелегални стоки или услуги.",
        terms2List3: "Без вознемирување или говор на омраза.",
        terms3Title: "3. Правила за огласување",
        terms3Text: "Го задржуваме правото да отстраниме секој оглас што ги прекршува нашите политики без враќање на средствата.",
        terms4Title: "4. Одговорност",
        terms4Text: "BizCall е платформа што поврзува корисници. Ние не сме одговорни за квалитетот на услугите што ги даваат корисниците.",
        terms5Title: "5. Прекин",
        terms5Text: "Можеме да го прекинеме вашиот пристап до страницата, без причина или известување.",
        terms6Title: "6. Модификации на Услугата",
        terms6Text: "BizCall MK го задржува правото да ја модифицира или прекине услугата со или без известување до корисникот.",
        terms7Title: "7. Ограничување на Одговорноста",
        terms7Text: "Ние не сме одговорни за какви било штети што може да ви се случат како резултат на користењето на нашата веб-страница.",
        terms8Title: "8. Контакт",
        terms8Text: "За какви било прашања во врска со овие услови, ве молиме контактирајте не.",
        terms3List1: "Сите плаќања се обработуваат безбедно преку нашиот давател на плаќања (Whop).",
        terms3List2: "Информациите за плаќање се обработуваат согласно индустриските стандарди за безбедност (на пр. PCI-DSS усогласеност) од овие даватели.",
        terms3List3: "Рефундациите и откажувањата за надоместоците за огласи се управуваат според нашите политики за огласи и, каде што е применливо, условите на давателот на плаќања.",
        terms3List4: "Го задржуваме правото да ги верификуваме трансакциите за плаќање и може да побараме дополнителна верификација",
        terms3List5: "Сите цени се прикажани во избраната валута и се конечни во времето на купување",
        terms3List6: "За спорови за плаќање, ве молиме контактирајте го нашиот тим за поддршка или упатете се на процесот за решавање спорови на давателот на плаќања",
        terms4List1: "Користиме Google Ads за прикажување релевантни реклами на нашата платформа",
        terms4List2: "Google може да користи колачиња и технологии за следење за прикажување персонализирани реклами",
        terms4List3: "Можете да ги управувате вашите преференци за реклами преку Поставките за реклами на Google",
        terms4List4: "Ние не сме одговорни за содржината на рекламите на трети страни",
        terms4List5: "Рекламите се јасно означени и одвоени од нашата содржина",
        terms4List6: "Се усогласуваме со политиките и упатствата на Google Ads",
        terms5List1: "Користиме Google Search Console за следење и подобрување на перформансите за пребарување на нашата веб-страница",
        terms5List2: "Нашата веб-страница е индексирана од Google и други главни пребарувачи",
        terms5List3: "Ги следиме Упатствата за вебмастер на Google и најдобрите практики",
        terms5List4: "Огласите може да се појават во резултатите од пребарувачот за да им помогнеме на корисниците да најдат услуги",
        terms5List5: "Вметнуваме структурирани податоци и означување на шема за подобра видливост при пребарување",
        terms5List6: "Нашата карта на страницата е поднесена до Google Search Console за ефикасно индексирање",
        terms2TextNew: "Корисниците се одговорни за точноста на нивните огласи. Се согласувате да не објавувате содржина што е нелегална, навредлива или измамничка.",
        terms2List1New: "Одржување точни информации за контакт",
        terms2List2New: "Почитување на правата за интелектуална сопственост",
        terms2List3New: "Не се вклучувајте во спам или вознемирување",
        terms3TextNew: "BizCall MK користи безбеден давател на плаќања (Whop). Со правење плаќање, се согласувате:",
        terms4TextNew: "BizCall MK прикажува реклами преку Google Ads. Со користење на нашиот сервис, признавате:",
        terms5TextNew: "BizCall MK е оптимизиран за пребарувачи и користи Google Search Console за управување со веб-страницата:",
        privacyLastUpdated: "Последно ажурирано:",
        privacyIntro: "Вашата приватност е важна за нас. Оваа политика објаснува како постапуваме со вашите податоци.",
        privacy1Title: "1. Информации што ги собираме",
        privacy1Text: "Ние собираме информации што ни ги давате директно, како што се вашата адреса за е-пошта, телефонски број и детали за огласот.",
        privacy2Title: "2. Како ги користиме информациите",
        privacy2Text: "Ние ги користиме вашите информации за да работиме и да ги подобриме нашите услуги, да олесниме плаќања и да комуницираме со вас.",
        privacy3Title: "3. Споделување податоци",
        privacy3Text: "Ние не ги продаваме вашите лични податоци. Можеме да споделуваме податоци со даватели на услуги (на пр., Firebase) за да работиме со апликацијата.",
        privacy4Title: "4. Вашите права",
        privacy4Text: "Имате право да пристапите, ажурирате или избришете вашите лични информации во секое време преку поставките на вашата сметка.",
        privacy5Title: "5. Контакт",
        privacy5Text: "Ако имате прашања во врска со оваа политика, ве молиме контактирајте не.",
        privacy6Title: "6. Вашите Права",
        privacy6Text: "Имате право да:",
        privacy7Title: "7. Контакт",
        privacy7Text: "За прашања или загрижености поврзани со приватноста, ве молиме контактирајте не.",
        privacy1TextNew: "Собираме информации што ни ги давате директно, како кога креирате сметка, објавувате оглас или не контактирате. Ова вклучува:",
        privacy1List1: "Информации за сметката (име, е-пошта, телефонски број)",
        privacy1List2: "Информации за огласот (описи, слики, локација, цени)",
        privacy1List3: "Информации за плаќање обработени безбедно преку нашиот давател на плаќања (Whop)",
        privacy1List4: "Податоци за употреба и аналитика преку Google Search Console",
        privacy1List5: "Колачиња и технологии за следење за Google Ads",
        privacy2TextNew: "Ги користиме информациите што ги собираме за да:",
        privacy2List1: "Работиме, одржуваме и ги подобруваме нашите услуги",
        privacy2List2: "Обработуваме плаќања безбедно преку нашиот давател на плаќања (Whop)",
        privacy2List3: "Прикажеме релевантни реклами преку Google Ads",
        privacy2List4: "Оптимизираме нашата веб-страница за пребарувачи користејќи Google Search Console",
        privacy2List5: "Комуницираме со вас за вашата сметка и огласи",
        privacy2List6: "Анализираме модели на употреба и ја подобруваме корисничката искуство",
        privacy3TextNew: "Работиме со доверливи услуги на трети страни:",
        privacy3List1: "Давател на плаќања (Whop): Споделуваме информации за плаќање со Whop за безбедна обработка на надоместоците за огласување.",
        privacy3List2: "Google Ads: Користиме Google Ads за прикажување реклами. Google може да користи колачиња и да собира податоци за персонализација на реклами. Можете да се откажете преку Поставките за реклами на Google.",
        privacy3List3: "Google Search Console: Користиме Google Search Console за следење на перформансите на веб-страницата и видливоста при пребарување. Ова ни помага да ги подобриме нашите услуги и да обезбедиме дека огласите се откривачки.",
        privacy3List4: "Firebase: Користиме Firebase за автентификација и услуги за база на податоци, што безбедно ги обработува податоците за вашата сметка и оглас.",
        privacy4TextNew: "Превземаме разумни мерки за да помогнеме во заштитата на информациите за вас од загуба, кражба, злоупотреба и неовластен пристап. Ова вклучува:",
        privacy4List1: "Шифриран пренос на податоци (HTTPS/SSL)",
        privacy4List2: "Безбедна обработка на плаќања преку PCI-усогласени даватели на плаќања",
        privacy4List3: "Правила за безбедност и автентификација на Firebase",
        privacy4List4: "Редовни ревизии и ажурирања на безбедноста",
        privacy5TextNew: "Користиме колачиња и слични технологии:",
        privacy5List1: "Основни Колачиња: Потребни за функционалноста на веб-страницата и автентификацијата",
        privacy5List2: "Аналитички Колачиња: Користени за разбирање како посетителите комуницираат со нашата веб-страница преку Google Search Console и аналитика",
        privacy5List3: "Рекламни Колачиња: Користени од Google Ads за прикажување релевантни реклами и мерење на ефективноста на рекламите",
        privacy5List4: "Можете да ги контролирате колачињата преку поставките на вашиот прелистувач или Поставките за реклами на Google за преференци за реклами",
        essentialCookies: "Основни Колачиња",
        analyticsCookies: "Аналитички Колачиња",
        advertisingCookies: "Рекламни Колачиња",
        privacy6List1: "Пристап и ажурирање на вашите лични информации",
        privacy6List2: "Бришење на вашата сметка и поврзаните податоци",
        privacy6List3: "Откажување од персонализирани реклами преку Поставките за реклами на Google",
        privacy6List4: "Барање информации за податоците што ги собираме и како се користат",
        privacy6List5: "Контактирање со нас со загрижености или прашања за приватност"
    }
}; // export default TRANSLATIONS;
}),
"[project]/lsm2/src/mkCities.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/locationsMK.js
// Existing export you already had (keep it):
__turbopack_context__.s([
    "CITIES_WITH_COORDS",
    ()=>CITIES_WITH_COORDS,
    "MK_CITIES",
    ()=>MK_CITIES
]);
const MK_CITIES = [
    "Skopje",
    "Tetovo",
    "Gostivar",
    "Kumanovo",
    "Bitola",
    "Ohrid",
    "Prilep",
    "Veles",
    "Kavadarci",
    "Strumica",
    "Kochani",
    "Shtip",
    "Debar",
    "Kichevo",
    "Struga",
    "Radovish",
    "Gevgelija",
    "Negotino",
    "Sveti Nikole",
    "Delchevo",
    "Vinica",
    "Berovo",
    "Probishtip",
    "Kratovo",
    "Krushevo",
    "Valandovo",
    "Resen",
    "Makedonski Brod",
    "Makedonska Kamenica",
    "Pehcevo",
    "Kriva Palanka",
    "Demir Kapija",
    "Bogdanci",
    "Demir Hisar"
];
const CITIES_WITH_COORDS = [
    {
        name: "Skopje",
        lat: 41.9973,
        lng: 21.4280
    },
    {
        name: "Tetovo",
        lat: 42.0069,
        lng: 20.9715
    },
    {
        name: "Gostivar",
        lat: 41.8020,
        lng: 20.9082
    },
    {
        name: "Kumanovo",
        lat: 42.1354,
        lng: 21.7146
    },
    {
        name: "Bitola",
        lat: 41.0314,
        lng: 21.3347
    },
    {
        name: "Ohrid",
        lat: 41.1231,
        lng: 20.8016
    },
    {
        name: "Prilep",
        lat: 41.3451,
        lng: 21.5550
    },
    {
        name: "Veles",
        lat: 41.7156,
        lng: 21.7756
    },
    {
        name: "Kavadarci",
        lat: 41.4331,
        lng: 22.0115
    },
    {
        name: "Strumica",
        lat: 41.4378,
        lng: 22.6435
    },
    {
        name: "Kochani",
        lat: 41.9161,
        lng: 22.4128
    },
    {
        name: "Shtip",
        lat: 41.7458,
        lng: 22.1953
    },
    {
        name: "Kichevo",
        lat: 41.5127,
        lng: 20.9589
    },
    {
        name: "Struga",
        lat: 41.1780,
        lng: 20.6761
    },
    {
        name: "Radovish",
        lat: 41.6389,
        lng: 22.4642
    },
    {
        name: "Gevgelija",
        lat: 41.1417,
        lng: 22.5028
    },
    {
        name: "Negotino",
        lat: 41.4845,
        lng: 22.0907
    },
    {
        name: "Sveti Nikole",
        lat: 41.8696,
        lng: 21.9527
    },
    {
        name: "Delchevo",
        lat: 41.9672,
        lng: 22.7694
    },
    {
        name: "Vinica",
        lat: 41.8828,
        lng: 22.5092
    },
    {
        name: "Berovo",
        lat: 41.7047,
        lng: 22.8556
    },
    {
        name: "Probishtip",
        lat: 42.0019,
        lng: 22.1784
    },
    {
        name: "Kratovo",
        lat: 42.0800,
        lng: 22.1800
    },
    {
        name: "Valandovo",
        lat: 41.3172,
        lng: 22.5606
    },
    {
        name: "Resen",
        lat: 41.0888,
        lng: 21.0128
    },
    {
        name: "Makedonski Brod",
        lat: 41.5135,
        lng: 21.2153
    },
    {
        name: "Makedonska Kamenica",
        lat: 42.0208,
        lng: 22.5878
    },
    {
        name: "Pehcevo",
        lat: 41.7619,
        lng: 22.8892
    },
    {
        name: "Kriva Palanka",
        lat: 42.2000,
        lng: 22.3300
    },
    {
        name: "Demir Kapija",
        lat: 41.4054,
        lng: 22.2446
    },
    {
        name: "Bogdanci",
        lat: 41.2031,
        lng: 22.5753
    },
    {
        name: "Demir Hisar",
        lat: 41.2200,
        lng: 21.2030
    }
];
}),
"[project]/lsm2/src/context/AppContext.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "default",
    ()=>__TURBOPACK__default__export__,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$hooks$2f$useListings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/hooks/useListings.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$database$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/database/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/database/dist/node-esm/index.node.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/auth/dist/node-esm/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/translations.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$mkCities$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/mkCities.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/constants.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
const API_BASE = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "https://lsm-wozo.onrender.com";
const AGGREGATE_STATS_CACHE_KEY = "bizcall_aggregate_stats";
const defaultAggregateStats = ()=>({
        totalViews: 0,
        totalContacts: 0,
        totalByPhone: 0,
        totalByEmail: 0,
        totalByWhatsapp: 0,
        top5Featured: [],
        lastMonthKey: null,
        thisMonthKey: null
    });
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])();
const useApp = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
};
/* Helpers */ const stripDangerous = (v = "")=>v.replace(/[<>]/g, "");
// Helper to translate Firebase error messages
const translateFirebaseError = (error, t)=>{
    if (!error) return t("error");
    // If error is a string, try to translate it
    if (typeof error === 'string') {
        // Check if it's already a translation key
        const translation = t(error);
        if (translation !== error) return translation;
        // Try common error patterns
        if (error.toLowerCase().includes('network')) return t("networkError");
        if (error.toLowerCase().includes('timeout')) return t("timeoutError") || t("error");
        if (error.toLowerCase().includes('permission')) return t("permissionDenied") || t("error");
        // Return generic error with message
        return `${t("error")}: ${error}`;
    }
    // If error has a code, translate it
    if (error.code) {
        const codeMap = {
            'auth/user-not-found': t("userNotFound"),
            'auth/wrong-password': t("wrongPassword"),
            'auth/invalid-email': t("enterValidEmail"),
            'auth/too-many-requests': t("tooManyAttempts"),
            'auth/network-request-failed': t("networkError"),
            'auth/invalid-phone-number': t("enterValidPhone"),
            'auth/credential-already-in-use': t("phoneAlreadyInUse") || t("emailAlreadyInUse"),
            'auth/requires-recent-login': t("reauthRequired") || t("loginRequired"),
            'auth/operation-not-allowed': t("operationNotAllowed") || t("error"),
            'auth/email-already-in-use': t("emailAlreadyInUse"),
            'auth/invalid-credential': t("wrongPassword"),
            'auth/weak-password': t("passwordTooShort")
        };
        if (codeMap[error.code]) return codeMap[error.code];
        // Fallback to error message if available
        if (error.message) {
            return `${t("error")}: ${error.message}`;
        }
        return t("error");
    }
    // If error has a message property
    if (error.message) {
        return translateFirebaseError(error.message, t);
    }
    return t("error");
};
const formatOfferPrice = (min, max, currency)=>{
    const cleanMin = String(min || "").trim();
    const cleanMax = String(max || "").trim();
    const cur = currency || "EUR";
    if (!cleanMin && !cleanMax) return "";
    if (cleanMin && cleanMax) return `${cleanMin} - ${cleanMax} ${cur}`;
    if (cleanMin) return `from ${cleanMin} ${cur}`;
    if (cleanMax) return `up to ${cleanMax} ${cur}`;
    return "";
};
const buildLocationString = (city, extra)=>{
    const c = (city || "").trim();
    const e = (extra || "").trim();
    if (!c && !e) return "";
    if (c && e) return `${c} - ${e}`;
    return c || e;
};
const countryCodes = [
    {
        name: "MK",
        code: "+389"
    },
    {
        name: "AL",
        code: "+355"
    },
    {
        name: "KS",
        code: "+383"
    },
    {
        name: "SR",
        code: "+381"
    },
    {
        name: "GR",
        code: "+30"
    },
    {
        name: "BG",
        code: "+359"
    },
    {
        name: "TR",
        code: "+90"
    },
    {
        name: "DE",
        code: "+49"
    },
    {
        name: "US",
        code: "+1"
    }
];
const validatePhone = (p)=>{
    // Simple check
    return p && p.length > 6;
};
const AppProvider = ({ children, initialListings = [], initialPublicListings = [] })=>{
    /* i18n: default "en" for Google AdSense (supported language); user can switch to sq/mk */ const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Initialize user from cache - use null on server, load after mount on client to avoid hydration mismatch
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userProfile, setUserProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Load user from cache after mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }, []);
    // Initialize Firebase ready state immediately if auth is available
    const [firebaseReady, setFirebaseReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return false;
    });
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((k)=>{
        try {
            const translation = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRANSLATIONS"][lang]?.[k] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRANSLATIONS"].sq?.[k] ?? __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$translations$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TRANSLATIONS"].en?.[k] ?? k;
            // Always ensure we return a string, never a function or undefined
            if (typeof translation === 'string') {
                return translation;
            }
            return String(k || '');
        } catch (error) {
            return String(k || '');
        }
    }, [
        lang
    ]);
    // Set up global translations for components outside context
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        lang
    ]);
    // CRITICAL: Preload Firebase immediately and synchronously
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            // If Firebase isn't ready, mark as ready anyway to prevent blocking
            setTimeout(()=>setFirebaseReady(true), 100);
            return;
        }
        //TURBOPACK unreachable
        ;
        // Set up listener for auth state changes (async, but we already have initial state)
        const unsubscribe = undefined;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        localStorage.setItem("lang", lang);
        if (user) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `users/${user.uid}`), {
                language: lang
            }).catch((err)=>{
                console.warn("Failed to sync language to profile:", err);
            });
        }
    }, [
        lang,
        user
    ]);
    /* Core state - Initialize with server-side data */ const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        step: 1,
        name: "",
        category: "",
        locationCity: "",
        locationExtra: "",
        locationData: null,
        description: "",
        contact: "",
        offerMin: "",
        offerMax: "",
        offerCurrency: "EUR",
        offerprice: "",
        tags: "",
        socialLink: "",
        imagePreview: null,
        images: [],
        plan: "1"
    });
    // React Query for listings - optimized for 20k+ listings
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    // Use React Query hooks with initial data for instant loading
    const { data: publicListings = [], isLoading: publicListingsLoading, isFetching: publicListingsFetching, isSuccess: publicListingsSuccess } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$hooks$2f$useListings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePublicListings"])(initialPublicListings);
    const { data: userListingsData = [], isLoading: userListingsLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$hooks$2f$useListings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserListings"])(user?.uid, []);
    // Merge public + user listings (user overrides by id) — avoids loading ALL listings from Firebase
    const mergedListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const map = new Map();
        (publicListings || []).forEach((l)=>map.set(l.id, l));
        (userListingsData || []).forEach((l)=>map.set(l.id, l));
        return Array.from(map.values()).sort((a, b)=>(b.createdAt || 0) - (a.createdAt || 0));
    }, [
        publicListings,
        userListingsData
    ]);
    const [listings, setListings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialListings);
    const [userListings, setUserListings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Keep listings in sync with merged data (from queries); no full-DB listener
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mergedListings.length > 0 || !publicListingsLoading) {
            setListings(mergedListings);
        }
    }, [
        mergedListings,
        publicListingsLoading
    ]);
    // Data is loaded only when React Query has finished loading
    const listingsLoaded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const hasInitialData = initialPublicListings.length > 0 || initialListings.length > 0;
        if (hasInitialData) return true;
        return !publicListingsLoading && !userListingsLoading;
    }, [
        publicListings.length,
        listings.length,
        publicListingsLoading,
        userListingsLoading,
        initialPublicListings.length,
        initialListings.length
    ]);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        text: "",
        type: "info"
    });
    const showMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((text, type = "info")=>{
        // If text is an error object, translate it
        if (text && typeof text === 'object' && (text.code || text.message)) {
            text = translateFirebaseError(text, t);
        } else if (typeof text === 'string') {
            // If it contains common error patterns but isn't already translated, try to translate
            const errorPatterns = [
                'error',
                'failed',
                'invalid',
                'network',
                'timeout',
                'permission'
            ];
            const looksLikeError = errorPatterns.some((pattern)=>text.toLowerCase().includes(pattern));
            if (looksLikeError && !text.startsWith(t("error"))) {
                // Try to translate it as a key first
                const translated = t(text);
                if (translated !== text) {
                    text = translated;
                } else {
                    // If not a translation key, wrap it with error prefix
                    text = `${t("error")}: ${text}`;
                }
            }
        }
        setMessage({
            text,
            type
        });
        setTimeout(()=>setMessage({
                text: "",
                type: "info"
            }), 5000);
    }, []);
    const [selectedListing, setSelectedListing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    /* Filters / search */ const [q, setQ] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const deferredQ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDeferredValue"])(q);
    const [catFilter, setCatFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [locFilter, setLocFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("topRated");
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(12);
    const [filtersOpen, setFiltersOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [feedbackAverages, setFeedbackAverages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Derived filtered listings - only verified, active, and not expired
    const verifiedListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const now = Date.now();
        return listings.filter((l)=>l.status === "verified" && (!l.expiresAt || l.expiresAt > now));
    }, [
        listings
    ]);
    const filtered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        let arr = [
            ...verifiedListings
        ];
        if (deferredQ.trim()) {
            const term = deferredQ.trim().toLowerCase();
            arr = arr.filter((l)=>(l.name || "").toLowerCase().includes(term) || (l.description || "").toLowerCase().includes(term));
        }
        if (catFilter) {
            // Handle both raw category and translated category match
            arr = arr.filter((l)=>t(l.category) === catFilter || l.category === catFilter);
        }
        if (locFilter) arr = arr.filter((l)=>l.locationCity === locFilter || l.location === locFilter);
        // Featured = 12-month plan and within featured period (first 3 months); then listing stays live but not featured
        const isFeatured12 = (l)=>String(l.plan) === "12" && (!l.featuredUntil || l.featuredUntil > Date.now());
        const featuredPerf = (a, b)=>{
            const aF = isFeatured12(a) ? 1 : 0;
            const bF = isFeatured12(b) ? 1 : 0;
            if (bF !== aF) return bF - aF;
            if (aF && bF) {
                const aViews = Number(a.views) || 0;
                const bViews = Number(b.views) || 0;
                if (bViews !== aViews) return bViews - aViews;
                const aContacts = Number(a.contacts) || 0;
                const bContacts = Number(b.contacts) || 0;
                if (bContacts !== aContacts) return bContacts - aContacts;
                const aStats = feedbackAverages[a.id] || {};
                const bStats = feedbackAverages[b.id] || {};
                const aAvg = aStats.avg ?? -1;
                const bAvg = bStats.avg ?? -1;
                if (bAvg !== aAvg) return bAvg - aAvg;
            }
            return 0;
        };
        if (sortBy === "topRated") {
            arr.sort((a, b)=>{
                const cmp = featuredPerf(a, b);
                if (cmp !== 0) return cmp;
                const aStats = feedbackAverages[a.id] || {};
                const bStats = feedbackAverages[b.id] || {};
                const bAvg = bStats.avg ?? -1;
                const aAvg = aStats.avg ?? -1;
                if (bAvg !== aAvg) return bAvg - aAvg;
                const bCount = bStats.count || 0;
                const aCount = aStats.count || 0;
                if (bCount !== aCount) return bCount - aCount;
                return (b.createdAt || 0) - (a.createdAt || 0);
            });
        } else if (sortBy === "newest") {
            arr.sort((a, b)=>{
                const cmp = featuredPerf(a, b);
                if (cmp !== 0) return cmp;
                return (b.createdAt || 0) - (a.createdAt || 0);
            });
        } else if (sortBy === "expiring") {
            arr.sort((a, b)=>{
                const cmp = featuredPerf(a, b);
                if (cmp !== 0) return cmp;
                return (a.expiresAt || 0) - (b.expiresAt || 0);
            });
        } else if (sortBy === "az") {
            arr.sort((a, b)=>{
                const cmp = featuredPerf(a, b);
                if (cmp !== 0) return cmp;
                return (a.name || "").localeCompare(b.name || "");
            });
        } else {
            arr.sort((a, b)=>{
                const cmp = featuredPerf(a, b);
                if (cmp !== 0) return cmp;
                return (b.createdAt || 0) - (a.createdAt || 0);
            });
        }
        return arr;
    }, [
        verifiedListings,
        deferredQ,
        catFilter,
        locFilter,
        sortBy,
        feedbackAverages,
        t
    ]);
    const totalPages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>Math.max(1, Math.ceil(filtered.length / pageSize)), [
        filtered.length,
        pageSize
    ]);
    const pagedFiltered = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [
        filtered,
        page,
        pageSize
    ]);
    // Use predefined MK_CITIES list for faster filtering and to show all cities
    const allLocations = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$mkCities$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MK_CITIES"], []);
    const [favorites, setFavorites] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return [];
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        favorites
    ]);
    const toggleFav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>setFavorites((prev)=>prev.includes(id) ? prev.filter((x)=>x !== id) : [
                ...prev,
                id
            ]), []);
    // Derived counts
    const activeListingCount = publicListings.length;
    const verifiedListingCount = listings.filter((l)=>l.status === "verified").length;
    /* Dashboard/UI */ const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Set view mode - initialize with consistent default, then load from localStorage after mount
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("list"); // Default for SSR/hydration
    // Load view mode preference after mount to avoid hydration mismatch
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        // Check for user preference first
        const saved = undefined;
        // Default to grid view on mobile, list view on desktop
        const isMobile = undefined;
    }, []);
    // Save view mode preference when user changes it
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        viewMode
    ]);
    const [showPostForm, setShowPostForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Editing */ const [editingListing, setEditingListing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editForm, setEditForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [showEditMapPicker, setShowEditMapPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    /* Edit Flow */ const handleImageUpload = (e, isEditOverride = null)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        // Determine which state to update and current image count
        const isEdit = isEditOverride !== null ? isEditOverride : !!editingListing;
        const currentImages = isEdit ? editForm?.images || [] : form.images || [];
        // Check limit
        if (currentImages.length + files.length > 4) {
            showMessage(t("maxImagesError"), "error");
            return;
        }
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = (ev)=>{
                const img = new Image();
                img.onload = ()=>{
                    const canvas = document.createElement("canvas");
                    const MAX_WIDTH = 1200;
                    const MAX_HEIGHT = 1200;
                    let width = img.width;
                    let height = img.height;
                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);
                    // Compress with 0.7 quality
                    const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                    if (isEdit) {
                        setEditForm((prev)=>{
                            const newImages = [
                                ...prev.images || [],
                                dataUrl
                            ];
                            return {
                                ...prev,
                                images: newImages,
                                imagePreview: newImages[0] // Set first image as preview
                            };
                        });
                    } else {
                        setForm((prev)=>{
                            const newImages = [
                                ...prev.images || [],
                                dataUrl
                            ];
                            return {
                                ...prev,
                                images: newImages,
                                imagePreview: newImages[0] // Set first image as preview
                            };
                        });
                    }
                };
                img.src = ev.target?.result;
            };
            reader.readAsDataURL(file);
        });
        // Reset input
        e.target.value = "";
    };
    const handleRemoveImage = (index, isEdit = false)=>{
        if (isEdit) {
            setEditForm((prev)=>{
                const newImages = [
                    ...prev.images || []
                ];
                newImages.splice(index, 1);
                return {
                    ...prev,
                    images: newImages,
                    imagePreview: newImages.length > 0 ? newImages[0] : null
                };
            });
        } else {
            setForm((prev)=>{
                const newImages = [
                    ...prev.images || []
                ];
                newImages.splice(index, 1);
                return {
                    ...prev,
                    images: newImages,
                    imagePreview: newImages.length > 0 ? newImages[0] : null
                };
            });
        }
    };
    const saveEdit = async ()=>{
        if (!editingListing || !editForm) return;
        const normalizePhoneForStorage = (p)=>p ? String(p).replace(/\s/g, "") : "";
        const finalLocation = buildLocationString(editForm.locationCity, editForm.locationExtra);
        const accountPhone = normalizePhoneForStorage(user?.phoneNumber || userProfile?.phone || "");
        const phoneForListing = editForm.contact || accountPhone || editingListing.contact;
        if (!phoneForListing) return showMessage(t("addPhoneInAccountSettings"), "error");
        if (!editForm.name || !editForm.category || !editForm.locationCity || !editForm.description) return showMessage(t("fillAllFields"), "error");
        const normalizedContact = normalizePhoneForStorage(phoneForListing);
        if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");
        // Recalc offerprice string
        const finalOfferPrice = formatOfferPrice(editForm.offerMin, editForm.offerMax, editForm.offerCurrency);
        const updates = {
            name: stripDangerous(editForm.name),
            category: editForm.category,
            location: finalLocation,
            locationCity: editForm.locationCity,
            locationExtra: editForm.locationExtra,
            locationData: editForm.locationData || null,
            description: stripDangerous(editForm.description),
            contact: normalizedContact,
            offerprice: finalOfferPrice,
            tags: stripDangerous(editForm.tags || ""),
            socialLink: stripDangerous(editForm.socialLink || ""),
            imagePreview: editForm.imagePreview || null,
            images: editForm.images || []
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["update"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `listings/${editingListing.id}`), updates);
            showMessage(t("saveSuccess"), "success");
            setEditingListing(null);
            setEditForm(null);
        } catch (err) {
            console.error(err);
            showMessage(t("error") + " " + err.message, "error");
        }
    };
    const handleOpenEdit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((listing)=>{
        setEditingListing(listing);
        setEditForm({
            ...listing
        });
    }, []);
    /* Auth modal */ const [showAuthModal, setShowAuthModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("login");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [displayName, setDisplayName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [phoneNumber, setPhoneNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [countryCode, setCountryCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("+389");
    const [verificationCode, setVerificationCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [confirmationResult, setConfirmationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [phoneLoading, setPhoneLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreedToTerms, setAgreedToTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [passwordForm, setPasswordForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    /* Static Pages Modals */ const [showTerms, setShowTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showPrivacy, setShowPrivacy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Initialize Firebase Auth immediately - check cached state first
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setFirebaseReady(true);
            setAuthLoading(false);
            return;
        }
        //TURBOPACK unreachable
        ;
        // Use auth state persistence - Firebase will verify cached state
        const unsubscribe = undefined;
    }, []);
    const [feedbackSaving, setFeedbackSaving] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const submitFeedback = async (listingId, rating, comment)=>{
        if (!user) {
            setAuthMode("login");
            setShowAuthModal(true);
            return;
        }
        const safeRating = Math.min(Math.max(Number(rating) || 0, 1), 5);
        const safeComment = (comment || "").trim();
        if (!safeRating) return false;
        if (!safeComment) return false;
        try {
            setFeedbackSaving(true);
            // Load listing and validate status (no feedback on unpaid, inactive or expired listings)
            let listing = listings.find((l)=>l.id === listingId) || userListings.find((l)=>l.id === listingId) || null;
            if (!listing && __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
                try {
                    const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `listings/${listingId}`));
                    if (snap.exists()) {
                        listing = {
                            id: listingId,
                            ...snap.val()
                        };
                    }
                } catch (e) {
                    console.error("[Feedback] Failed to load listing for feedback:", e);
                }
            }
            const now = Date.now();
            const isPendingOrUnpaid = listing && (listing.status === "pending" || listing.status === "unpaid");
            const isExpired = listing && listing.expiresAt && listing.expiresAt <= now;
            if (!listing || isPendingOrUnpaid || isExpired || listing.status !== "verified") {
                showMessage(t("cannotLeaveFeedbackOnInactive") || t("feedbackSaveError"), "error");
                return false;
            }
            const feedbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `feedback/${listingId}`);
            // Anti-abuse: limit to 1 review per user per listing (updates existing instead of creating many)
            let existingKey = null;
            let existingCreatedAt = null;
            try {
                const existingSnap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(feedbackRef);
                if (existingSnap.exists()) {
                    const val = existingSnap.val() || {};
                    for (const [fid, fb] of Object.entries(val)){
                        if (fb.userId === user.uid) {
                            existingKey = fid;
                            existingCreatedAt = fb.createdAt || null;
                            break;
                        }
                    }
                }
            } catch (e) {
                console.error("[Feedback] Failed to check existing feedback:", e);
            }
            const payload = {
                listingId,
                userId: user.uid,
                userName: userProfile?.name || user.displayName || "Anonymous",
                rating: safeRating,
                comment: stripDangerous(safeComment),
                createdAt: existingCreatedAt || now,
                updatedAt: now
            };
            if (existingKey) {
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `feedback/${listingId}/${existingKey}`), payload);
            } else {
                const newReviewRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["push"])(feedbackRef);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["set"])(newReviewRef, payload);
            }
            // Notify listing owner via backend API (so email logic stays server-side)
            try {
                const ownerEmail = listing?.userEmail;
                if (ownerEmail) {
                    const reviewerName = userProfile?.name || user.displayName || (user.email ? user.email.split("@")[0] : "User");
                    console.log("[Feedback] Sending notification email to:", ownerEmail);
                    const response = await fetch(`${API_BASE}/api/send-feedback-notification`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            listingId,
                            listingName: listing?.name,
                            ownerEmail,
                            ownerUserId: listing?.userId,
                            reviewerName,
                            rating: safeRating,
                            comment: safeComment
                        })
                    });
                    if (response.ok) {
                        const result = await response.json();
                        console.log("[Feedback] ✅ Notification email sent successfully:", result);
                    } else {
                        const errorText = await response.text();
                        console.error("[Feedback] ❌ Failed to send notification email:", response.status, errorText);
                    }
                } else {
                    console.warn("[Feedback] ⚠️ No owner email found for listing:", listingId);
                }
            } catch (err) {
                console.error("[Feedback] ❌ Error sending notification email:", err);
            }
            showMessage(t("feedbackSaved"), "success");
            return true;
        } catch (err) {
            console.error(err);
            showMessage(t("feedbackSaveError"), "error");
            return false;
        } finally{
            setFeedbackSaving(false);
        }
    };
    const deleteFeedback = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (listingId, feedbackId, { isListingOwner, feedbackUserId })=>{
        if (!user || !__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) {
            showMessage(t("unauthorized") || "Unauthorized", "error");
            return false;
        }
        const canDelete = isListingOwner === true || feedbackUserId && feedbackUserId === user.uid;
        if (!canDelete) {
            showMessage(t("cannotDeleteReview") || "You cannot delete this review.", "error");
            return false;
        }
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `feedback/${listingId}/${feedbackId}`));
            showMessage(t("reviewDeleted") || "Review deleted.", "success");
            return true;
        } catch (err) {
            console.error("[Feedback] Delete error:", err);
            showMessage(t("feedbackDeleteError") || "Failed to delete review.", "error");
            return false;
        }
    }, [
        user,
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"],
        showMessage,
        t
    ]);
    // Load Reviews Logic - REMOVED (We load per listing now)
    /*
  useEffect(() => {
    const reviewsRef = dbRef(db, "reviews");
    // ...
  }, []);
  */ // Session-based cache key for fresh data on each session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    // Real-time listener for public listings only (limit 250 — saves Firebase bandwidth)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"] || !firebaseReady) return;
        const verifiedQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "listings"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderByChild"])("status"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalTo"])("verified"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["limitToLast"])(250));
        let isFirstSync = true;
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(verifiedQuery, (snapshot)=>{
            if (snapshot.exists()) {
                const val = snapshot.val() || {};
                const arr = Object.entries(val).map(([id, data])=>({
                        id,
                        ...data
                    }));
                const now = Date.now();
                const filtered = arr.filter((l)=>!l.expiresAt || l.expiresAt > now);
                const sorted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(filtered);
                if (isFirstSync && publicListings.length > 0) {
                    isFirstSync = false;
                    const currentIds = new Set(publicListings.map((l)=>l.id));
                    const newIds = new Set(sorted.map((l)=>l.id));
                    if (currentIds.size === newIds.size && [
                        ...currentIds
                    ].every((id)=>newIds.has(id))) return;
                }
                queryClient.setQueryData([
                    'listings',
                    'public'
                ], sorted);
                isFirstSync = false;
            }
        }, (error)=>{
            console.error("Public listings listener error:", error);
        });
        return ()=>unsubscribe();
    }, [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"],
        firebaseReady,
        queryClient,
        publicListings.length
    ]);
    // Load Feedback Averages (Effect) - OPTIMIZED: Lazy load only when needed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]) return;
        // OPTIMIZATION: Only load feedback after listings are loaded and user might view them
        // This prevents loading feedback data unnecessarily
        if (!listingsLoaded || publicListings.length === 0) {
            return;
        }
        // OPTIMIZATION: Use once() for initial fetch (faster)
        const feedbackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "feedback");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["get"])(feedbackRef).then((snapshot)=>{
            if (snapshot.exists()) {
                const data = snapshot.val();
                const averages = {};
                // OPTIMIZATION: Only process feedback for listings that exist in publicListings
                const publicListingIds = new Set(publicListings.map((l)=>l.id));
                Object.keys(data).forEach((listingId)=>{
                    // Skip if listing is not in public listings (saves processing)
                    if (!publicListingIds.has(listingId)) return;
                    const feedbacks = data[listingId];
                    if (feedbacks && typeof feedbacks === 'object') {
                        const values = Object.values(feedbacks);
                        const ratings = values.map((f)=>Number(f.rating) || 0).filter((r)=>r > 0);
                        if (ratings.length > 0) {
                            const sum = ratings.reduce((acc, r)=>acc + r, 0);
                            averages[listingId] = {
                                avg: parseFloat((sum / ratings.length).toFixed(1)),
                                count: ratings.length
                            };
                        } else {
                            averages[listingId] = {
                                avg: null,
                                count: 0
                            };
                        }
                    }
                });
                setFeedbackAverages(averages);
            } else {
                setFeedbackAverages({});
            }
        }).catch((error)=>{
            console.error("Feedback fetch error:", error);
        });
        // Single get() only — no real-time feedback listener to save Firebase bandwidth
        return undefined;
    }, [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"],
        listingsLoaded,
        publicListings
    ]);
    // Payment return handler – show toast when user lands with ?payment=success or ?payment=failed
    // When listingId is present, App.jsx handles success toast; here we handle Freemius-style return (no listingId) and failed
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
        const params = undefined;
        const paymentStatus = undefined;
        const listingId = undefined;
        const type = undefined; // 'create' or 'extend'
    }, []); // Run once on mount
    // Filter user listings
    // Update user listings from React Query data
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user && userListingsData.length > 0) {
            setUserListings(userListingsData);
        } else {
            setUserListings([]);
        }
    }, [
        user,
        userListingsData
    ]);
    // Real-time Firebase listener for user listings - updates React Query cache
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"] || !firebaseReady || !user) return;
        const userQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], "listings"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["orderByChild"])("userId"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["equalTo"])(user.uid));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["onValue"])(userQuery, (snapshot)=>{
            if (snapshot.exists()) {
                const val = snapshot.val() || {};
                const arr = Object.entries(val).map(([id, data])=>({
                        id,
                        ...data
                    }));
                // Sort by creation date (newest first)
                arr.sort((a, b)=>(b.createdAt || 0) - (a.createdAt || 0));
                // Update React Query cache silently
                queryClient.setQueryData([
                    'listings',
                    'user',
                    user.uid
                ], arr);
            }
        }, (error)=>{
            console.error("User listings listener error:", error);
        });
        return ()=>unsubscribe();
    }, [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"],
        firebaseReady,
        user,
        queryClient
    ]);
    const getDaysUntilExpiry = (expiresAt)=>{
        if (!expiresAt) return 0;
        const diff = expiresAt - Date.now();
        if (diff <= 0) return 0;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };
    const getListingStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((listing)=>{
        if (!listing) return {
            views: 0,
            contacts: 0,
            likes: 0,
            avgRating: 0,
            feedbackCount: 0,
            engagement: 0
        };
        const stats = feedbackAverages[listing.id] || {};
        const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
        const avgRating = listing.avgRating ?? stats.avg ?? 0;
        const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);
        return {
            views: listing.views || 0,
            contacts: listing.contacts || 0,
            likes: listing.likes || 0,
            avgRating,
            feedbackCount,
            engagement
        };
    }, [
        feedbackAverages,
        favorites
    ]);
    const getDescriptionPreview = (desc)=>{
        if (!desc) return "";
        return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
    };
    const handleShareListing = (listing)=>{
        if (!listing) return;
        if (navigator.share) {
            navigator.share({
                title: listing.name,
                text: listing.description,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback
            navigator.clipboard.writeText(window.location.href);
            showMessage(t("linkCopied"), "success");
        }
    };
    const confirmDelete = async (id)=>{
        if (window.confirm(t("deleteConfirm"))) {
            await deleteListing(id);
        }
    };
    const deleteListing = async (id)=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `listings/${id}`));
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["remove"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$node$2d$esm$2f$index$2e$node$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"], `feedback/${id}`));
            showMessage(t("listingDeleted"), "success");
        } catch (err) {
            console.error(err);
            showMessage(t("error"), "error");
        } finally{
            setLoading(false);
        }
    };
    const handleSelectListing = (listing)=>{
        setSelectedListing(listing);
    // Navigate or open modal
    };
    // Memoize listings for performance
    const myListingsRaw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>userListings, [
        userListings
    ]);
    const [showReportModal, setShowReportModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [reportingListingId, setReportingListingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Extend Listing Flow
    const [extendModalOpen, setExtendModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [extendTarget, setExtendTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedExtendPlan, setSelectedExtendPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1");
    // Social proof aggregate stats — prefetch on app load, cache in sessionStorage for instant display
    const [aggregateStats, setAggregateStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) return defaultAggregateStats();
        //TURBOPACK unreachable
        ;
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let cancelled = false;
        const fetchStats = ()=>{
            fetch(`${API_BASE}/api/listing-stats-aggregate`).then((res)=>res.json()).then((data)=>{
                if (cancelled) return;
                const next = {
                    totalViews: data.totalViews ?? 0,
                    totalContacts: data.totalContacts ?? 0,
                    totalByPhone: data.totalByPhone ?? 0,
                    totalByEmail: data.totalByEmail ?? 0,
                    totalByWhatsapp: data.totalByWhatsapp ?? 0,
                    top5Featured: data.top5Featured ?? [],
                    lastMonthKey: data.lastMonthKey ?? null,
                    thisMonthKey: data.thisMonthKey ?? null
                };
                setAggregateStats((prev)=>({
                        ...prev,
                        ...next
                    }));
                try {
                    sessionStorage.setItem(AGGREGATE_STATS_CACHE_KEY, JSON.stringify(next));
                } catch (e) {}
            }).catch(()=>{});
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5 * 60 * 1000);
        return ()=>{
            cancelled = true;
            clearInterval(interval);
        };
    }, []);
    const handleStartExtendFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((listing)=>{
        // For pending/unpaid listings, handle payment flow instead
        if (listing.status === "pending" || listing.status === "unpaid") {
            // This will be handled by MyListingCard button
            return;
        }
        setExtendTarget(listing);
        setSelectedExtendPlan("1");
        setExtendModalOpen(true);
    }, []);
    const handleProceedExtend = async ()=>{
        if (!extendTarget) return;
        const listing = extendTarget;
        const planId = selectedExtendPlan;
        // For pending/unpaid listings, use type "create" instead of "extend"
        const listingType = listing.status === "pending" || listing.status === "unpaid" ? "create" : "extend";
        try {
            setLoading(true);
            // Pre-warm connection to payment API
            const controller = new AbortController();
            const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
            // For pending/unpaid listings, use type "create" instead of "extend"
            const listingType = listing.status === "pending" || listing.status === "unpaid" ? "create" : "extend";
            const res = await fetch(`${API_BASE}/api/create-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    listingId: listing.id,
                    type: listingType,
                    customerEmail: user?.email,
                    customerName: userProfile?.name || user?.displayName,
                    plan: planId,
                    userId: user?.uid
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!res.ok) {
                throw new Error(`Payment API error: ${res.status}`);
            }
            const data = await res.json();
            if (data.checkoutUrl) {
                // Show notification before redirecting
                showMessage(t("redirectingToPayment"), "info");
                // Redirect immediately without delay
                setTimeout(()=>{
                    window.location.href = data.checkoutUrl;
                }, 100);
            } else {
                throw new Error("No checkout URL returned");
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                console.error("Payment request timeout:", err);
                showMessage(t("paymentTimeout"), "error");
            } else {
                console.error(err);
                showMessage(t("paymentError"), "error");
            }
            setLoading(false);
        }
    };
    const onLogout = async ()=>{
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$node$2d$esm$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOut"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"]);
        showMessage(t("signedOut"), "success");
    // Navigation should be handled by the component calling this or effect
    };
    const onLogin = ()=>{
        setShowAuthModal(true);
    };
    /* Context Value */ const value = {
        lang,
        setLang,
        user,
        userProfile,
        t,
        form,
        setForm,
        listings,
        setListings,
        publicListings,
        userListings,
        loading,
        setLoading,
        message,
        showMessage,
        q,
        setQ,
        catFilter,
        setCatFilter,
        locFilter,
        setLocFilter,
        sortBy,
        setSortBy,
        page,
        setPage,
        totalPages,
        pageSize,
        setPageSize,
        pagedFiltered,
        filtersOpen,
        setFiltersOpen,
        allLocations,
        sidebarOpen,
        setSidebarOpen,
        viewMode,
        setViewMode,
        showPostForm,
        setShowPostForm,
        editingListing,
        setEditingListing,
        editForm,
        setEditForm,
        showEditMapPicker,
        setShowEditMapPicker,
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
        showTerms,
        setShowTerms,
        showPrivacy,
        setShowPrivacy,
        showReportModal,
        setShowReportModal,
        reportingListingId,
        setReportingListingId,
        onLogout,
        onLogin,
        favorites,
        feedbackAverages,
        submitFeedback,
        deleteFeedback,
        feedbackSaving,
        // Auth State
        email,
        setEmail,
        password,
        setPassword,
        displayName,
        setDisplayName,
        phoneNumber,
        setPhoneNumber,
        countryCode,
        setCountryCode,
        verificationCode,
        setVerificationCode,
        confirmationResult,
        setConfirmationResult,
        phoneLoading,
        setPhoneLoading,
        agreedToTerms,
        setAgreedToTerms,
        passwordForm,
        setPasswordForm,
        authLoading,
        firebaseReady,
        listingsLoaded,
        // Constants
        categories: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categories"],
        categoryGroups: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryGroups"],
        categoryIcons: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["categoryIcons"],
        mkSpotlightCities: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mkSpotlightCities"],
        countryCodes,
        MK_CITIES: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$mkCities$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MK_CITIES"],
        // Helpers
        formatOfferPrice,
        stripDangerous,
        buildLocationString,
        getDaysUntilExpiry,
        getListingStats,
        getDescriptionPreview,
        handleShareListing,
        confirmDelete,
        deleteListing,
        handleStartExtendFlow,
        handleProceedExtend,
        handleOpenEdit,
        saveEdit,
        myListingsRaw,
        verifiedListings,
        publicListings,
        allLocations,
        extendModalOpen,
        setExtendModalOpen,
        extendTarget,
        setExtendTarget,
        selectedExtendPlan,
        setSelectedExtendPlan,
        aggregateStats,
        // Auth Actions (Expose auth for components to use directly if needed, or wrap them)
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"],
        db: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["db"]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lsm2/src/context/AppContext.js",
        lineNumber: 1451,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = AppContext;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[project]/lsm2/src/assets/logo.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/logo.8695a34c.png");}),
"[project]/lsm2/src/assets/logo.png.mjs { IMAGE => \"[project]/lsm2/src/assets/logo.png (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/lsm2/src/assets/logo.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1024,
    height: 1024,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABE0lEQVR42gEIAff+AE5PUAAqMDIAHDc9BiRbZiUrZ3EhJEVJBC41NgBNTk8AADw/QAAfMjYCIWBtTTSQnmE4mqd4MXuDPCQ6PAA5PDwAADc7PAAeO0EJKHmIfT6nsnlAqLNbOJWfXSZHSgMyNzcAADY4OQAaLzQCH2BuUDSToXo8pK+MM4SMQiA7PQExNTYAADk8PQAaKy8AGUVPECJre1wrfIlYI1VcCxwuMQA1ODkAADY/QQAgSFIkHldlOCFgcDkiYnE3IFdjKiFHTx0zPD0AAC45PAAfS1U0G1ZlWRtWZVEbVmVGG1VkWh9IUiktNjgAADxAQQAiMzcCEy0zAhArMQMQKzEDFC0zAyAwMwE6Pj4AbcA860emoI8AAAAASUVORK5CYII="
};
}),
"[project]/lsm2/src/components/Header.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/lsm2/src/assets/logo.png.mjs { IMAGE => "[project]/lsm2/src/assets/logo.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
;
"use client";
;
;
;
;
;
;
// Dynamically import Link to avoid SSR issues
const Link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/lsm2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null
});
const Header = ({ sidebarOpen, onMenuToggle })=>{
    const { t, lang, setLang, user, onLogout, verifiedListings, myListingsRaw, authLoading, firebaseReady, setAuthMode, setShowAuthModal } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = (path)=>{
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname.startsWith(path)) return true;
        return false;
    };
    const navItems = [
        {
            path: "/",
            label: t("homepage"),
            icon: "🏠"
        },
        {
            path: "/listings",
            label: t("explore"),
            icon: "🧭",
            badge: verifiedListings?.length || 0
        },
        {
            path: "/contact",
            label: t("contactUs"),
            icon: "✉️"
        },
        ...user ? [
            {
                path: "/mylistings",
                label: t("myListings"),
                icon: "📂",
                badge: myListingsRaw?.length || 0
            },
            {
                path: "/account",
                label: t("account"),
                icon: "👤"
            }
        ] : []
    ];
    const stagger = (i)=>sidebarOpen ? `${90 + i * 65}ms` : "0ms";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "app-header",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `mobile-header-drawer ${sidebarOpen ? "is-open" : ""}`,
                "aria-hidden": !sidebarOpen,
                id: "mobile-header-drawer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mobile-header-drawer-inner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "mobile-header-drawer-nav",
                            children: navItems.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                    href: item.path,
                                    className: `mobile-header-drawer-item ${isActive(item.path) ? "active" : ""}`,
                                    style: {
                                        transitionDelay: stagger(i)
                                    },
                                    onClick: onMenuToggle,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mobile-header-drawer-item-icon",
                                            "aria-hidden": true,
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Header.jsx",
                                            lineNumber: 68,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mobile-header-drawer-item-label",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Header.jsx",
                                            lineNumber: 71,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.path, true, {
                                    fileName: "[project]/lsm2/src/components/Header.jsx",
                                    lineNumber: 61,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/Header.jsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mobile-header-drawer-footer",
                            style: {
                                transitionDelay: stagger(navItems.length)
                            },
                            children: user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mobile-header-drawer-logout-btn",
                                onClick: ()=>{
                                    onLogout?.();
                                    onMenuToggle();
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobile-header-drawer-logout-icon",
                                        children: "🚪"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 86,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    t("logout")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mobile-header-drawer-login-btn",
                                onClick: ()=>{
                                    setAuthMode("login");
                                    setShowAuthModal(true);
                                    onMenuToggle();
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobile-header-drawer-login-icon",
                                        children: "👤"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 99,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    t("login")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/Header.jsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/Header.jsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/Header.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "header-bar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `hamburger-btn ${sidebarOpen ? "open" : ""}`,
                                onClick: onMenuToggle,
                                "aria-label": sidebarOpen ? t("close") : t("menu"),
                                "aria-expanded": !!sidebarOpen,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hamburger-box",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hamburger-inner"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/lsm2/src/components/Header.jsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/",
                                className: "header-logo",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "brand-mark",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src || __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$lsm2$2f$src$2f$assets$2f$logo$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                                            alt: t("bizcallLogo"),
                                            className: "brand-logo",
                                            style: {
                                                height: "32px",
                                                width: "auto"
                                            },
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Header.jsx",
                                            lineNumber: 123,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: t("bizCall")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 131,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "desktop-nav",
                                children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                        href: item.path,
                                        className: `desktop-nav-item ${isActive(item.path) ? "active" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                                lineNumber: 141,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                                lineNumber: 142,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            item.badge > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "badge-count",
                                                style: {
                                                    background: "var(--primary)",
                                                    color: "white",
                                                    fontSize: "0.7rem",
                                                    padding: "2px 6px",
                                                    borderRadius: "10px"
                                                },
                                                children: item.badge
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                                lineNumber: 144,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, item.path, true, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/Header.jsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-actions",
                        children: [
                            authLoading || !firebaseReady ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "header-loading-placeholder desktop-only",
                                style: {
                                    width: "80px",
                                    height: "36px",
                                    background: "linear-gradient(90deg, var(--border) 25%, var(--surface-hover) 50%, var(--border) 75%)",
                                    backgroundSize: "200% 100%",
                                    borderRadius: "var(--radius-md)",
                                    animation: "shimmer 1.5s infinite"
                                }
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-ghost desktop-only",
                                onClick: onLogout,
                                children: t("logout")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 178,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "btn btn-primary desktop-only",
                                onClick: ()=>{
                                    setAuthMode("login");
                                    setShowAuthModal(true);
                                },
                                children: t("login")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                className: "select header-lang-select",
                                value: lang,
                                onChange: (e)=>setLang(e.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "sq",
                                        children: "🇦🇱 SQ"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "mk",
                                        children: "🇲🇰 MK"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "en",
                                        children: "🇬🇧 EN"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Header.jsx",
                                        lineNumber: 201,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Header.jsx",
                                lineNumber: 194,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/Header.jsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/Header.jsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/Header.jsx",
        lineNumber: 51,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Header;
}),
"[project]/lsm2/src/components/Sidebar.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
// Dynamically import Link to avoid SSR issues
const Link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/lsm2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null
});
/**
 * Mobile nav: top-down drawer with handle, synced with hamburger.
 * Drawer drops from top; inner elements cascade in with stagger.
 */ const Sidebar = ({ onClose, isOpen })=>{
    const { t, user, onLogout, setShowPostForm, setShowAuthModal, setAuthMode, setForm } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const isActive = (path)=>{
        if (path === "/" && pathname === "/") return true;
        if (path !== "/" && pathname?.startsWith(path)) return true;
        return false;
    };
    const links = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            {
                path: "/",
                label: t("homepage"),
                icon: "🏠"
            },
            {
                path: "/listings",
                label: t("explore"),
                icon: "🔍"
            },
            {
                path: "/contact",
                label: t("contactUs"),
                icon: "✉️"
            },
            ...user ? [
                {
                    path: "/mylistings",
                    label: t("myListings"),
                    icon: "📋"
                },
                {
                    path: "/account",
                    label: t("account"),
                    icon: "👤"
                }
            ] : []
        ], [
        user,
        t
    ]);
    const stagger = (i)=>isOpen ? `${60 + i * 48}ms` : "0ms";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `mobile-drawer ${isOpen ? "is-open" : ""}`,
        "aria-hidden": !isOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mobile-drawer-backdrop",
                onClick: onClose,
                onKeyDown: (e)=>e.key === "Escape" && onClose(),
                role: "button",
                tabIndex: -1,
                "aria-label": t("close")
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "mobile-drawer-panel",
                role: "dialog",
                "aria-modal": "true",
                "aria-label": t("menu") || t("navigation"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-drawer-handle",
                        "aria-hidden": true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mobile-drawer-handle-bar"
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-drawer-header",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mobile-drawer-title",
                                children: t("appName")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mobile-drawer-close",
                                onClick: onClose,
                                "aria-label": t("close"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "22",
                                    height: "22",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2.5",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "18",
                                            y1: "6",
                                            x2: "6",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                            lineNumber: 69,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                            x1: "6",
                                            y1: "6",
                                            x2: "18",
                                            y2: "18"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mobile-drawer-nav",
                        children: [
                            links.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                    href: item.path,
                                    className: `mobile-drawer-item ${isActive(item.path) ? "active" : ""}`,
                                    style: {
                                        transitionDelay: stagger(i)
                                    },
                                    onClick: onClose,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mobile-drawer-item-icon",
                                            "aria-hidden": true,
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mobile-drawer-item-label",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, item.path, true, {
                                    fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))),
                            user?.emailVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/post-listing",
                                className: "mobile-drawer-cta",
                                style: {
                                    transitionDelay: stagger(links.length)
                                },
                                onClick: onClose,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobile-drawer-cta-icon",
                                        children: "➕"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    t("submitListing")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mobile-drawer-cta mobile-drawer-cta--secondary",
                                style: {
                                    transitionDelay: stagger(links.length)
                                },
                                onClick: ()=>{
                                    setAuthMode("login");
                                    setShowAuthModal(true);
                                    onClose();
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mobile-drawer-cta-icon",
                                        children: "🔐"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    t("login"),
                                    " / ",
                                    t("submitListing")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 100,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-drawer-footer",
                        style: {
                            transitionDelay: stagger(links.length + 1)
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mobile-drawer-email",
                                title: user.email,
                                children: user.email
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mobile-drawer-logout",
                                onClick: ()=>{
                                    onLogout?.();
                                    onClose();
                                },
                                children: t("logout")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/Sidebar.jsx",
                lineNumber: 49,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/Sidebar.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Sidebar;
}),
"[project]/lsm2/src/components/NotificationToast.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotificationToast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function NotificationToast({ message, type = "info", onClose }) {
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(()=>{
                setIsVisible(false);
                setTimeout(()=>onClose?.(), 300); // Wait for animation
            }, 5000);
            return ()=>clearTimeout(timer);
        }
    }, [
        message,
        onClose
    ]);
    if (!message) return null;
    const icons = {
        success: "✅",
        error: "❌",
        warning: "⚠️",
        info: "ℹ️"
    };
    const colors = {
        success: {
            bg: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            border: "#10b981"
        },
        error: {
            bg: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            border: "#ef4444"
        },
        warning: {
            bg: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
            border: "#f59e0b"
        },
        info: {
            bg: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            border: "#3b82f6"
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                opacity: 0,
                y: -50,
                scale: 0.95
            },
            animate: {
                opacity: 1,
                y: 0,
                scale: 1
            },
            exit: {
                opacity: 0,
                y: -30,
                scale: 0.95
            },
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300
            },
            className: `notification-toast notification-toast-${type}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "notification-toast-content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "notification-toast-icon",
                        children: icons[type] || icons.info
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "notification-toast-message",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
                        lineNumber: 63,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setIsVisible(false);
                            setTimeout(()=>onClose?.(), 300);
                        },
                        className: "notification-toast-close",
                        "aria-label": t("closeNotification"),
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
                        lineNumber: 64,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
                lineNumber: 59,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
            lineNumber: 52,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/lsm2/src/components/NotificationToast.jsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
"[project]/lsm2/src/components/CookieConsent.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CookieConsent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function CookieConsent({ t }) {
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);
    const handleAccept = ()=>{
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "cookie-consent-banner",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cookie-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: t('cookieConsentText')
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/CookieConsent.jsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/CookieConsent.jsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "cookie-actions",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "btn btn-primary btn-sm",
                    onClick: handleAccept,
                    children: t('accept')
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/CookieConsent.jsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/CookieConsent.jsx",
                lineNumber: 26,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/CookieConsent.jsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/lsm2/src/components/FirebaseLoader.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FirebaseLoader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/styled-jsx/style.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$firebase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/firebase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/auth/dist/index.mjs [app-ssr] (ecmascript) <locals>");
"use client";
;
;
;
;
;
function FirebaseLoader({ children }) {
    const [firebaseReady, setFirebaseReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time truthy", 1) {
            setFirebaseReady(true);
            return;
        }
        //TURBOPACK unreachable
        ;
        // CRITICAL: Block page render until Firebase is fully initialized
        let unsubscribe;
        let timeout;
        const checkAuthState = undefined;
        const initFirebase = undefined;
    }, []);
    // Don't block render - show content immediately, Firebase will hydrate in background
    // Only show loader if Firebase takes too long (after 200ms)
    const [showLoader, setShowLoader] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!firebaseReady) {
            // Only show loader after 200ms delay to allow content to render first
            const timer = setTimeout(()=>{
                if (!firebaseReady) {
                    setShowLoader(true);
                }
            }, 200);
            return ()=>clearTimeout(timer);
        } else {
            setShowLoader(false);
        }
    }, [
        firebaseReady
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showLoader && !firebaseReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(255, 255, 255, 0.9)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                },
                className: "jsx-50399fb64100c3c0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: '48px',
                            height: '48px',
                            border: '4px solid var(--border)',
                            borderTopColor: 'var(--primary)',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        },
                        className: "jsx-50399fb64100c3c0"
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/FirebaseLoader.jsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        id: "50399fb64100c3c0",
                        children: "@keyframes spin{to{transform:rotate(360deg)}}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/FirebaseLoader.jsx",
                lineNumber: 103,
                columnNumber: 9
            }, this),
            children
        ]
    }, void 0, true);
}
}),
"[project]/lsm2/src/components/LayoutWrapper.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$Header$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/Header.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/Sidebar.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$NotificationToast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/NotificationToast.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$CookieConsent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/CookieConsent.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$FirebaseLoader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/FirebaseLoader.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
;
"use client";
;
;
;
;
;
;
;
;
;
;
// Dynamically import Link to avoid SSR issues
const Link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/lsm2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null
});
const API_BASE = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : "https://lsm-wozo.onrender.com";
// Lazy load heavy modals for better performance
const AuthModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/components/AuthModal.jsx [app-ssr] (ecmascript, async loader)"));
const PostListingDrawer = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/components/PostListingDrawer.jsx [app-ssr] (ecmascript, async loader)"));
const ExtendListingModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/components/ExtendListingModal.jsx [app-ssr] (ecmascript, async loader)"));
const EditListingModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/components/EditListingModal.jsx [app-ssr] (ecmascript, async loader)"));
const ReportModal = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/components/ReportModal.jsx [app-ssr] (ecmascript, async loader)"));
// LegalModals exports named exports - create a wrapper component for lazy loading
const LegalModalsLoader = ({ showTerms, showPrivacy, onCloseTerms, onClosePrivacy, t })=>{
    const [Modals, setModals] = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useState(null);
    __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].useEffect(()=>{
        if ((showTerms || showPrivacy) && !Modals) {
            __turbopack_context__.A("[project]/lsm2/src/components/LegalModals.jsx [app-ssr] (ecmascript, async loader)").then((m)=>setModals(m));
        }
    }, [
        showTerms,
        showPrivacy,
        Modals
    ]);
    if (!Modals) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            showTerms && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Modals.TermsModal, {
                onClose: onCloseTerms,
                t: t
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 42,
                columnNumber: 21
            }, ("TURBOPACK compile-time value", void 0)),
            showPrivacy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Modals.PrivacyModal, {
                onClose: onClosePrivacy,
                t: t
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 43,
                columnNumber: 23
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
// Helper component to consume context
const LayoutContent = ({ children })=>{
    const { showTerms, setShowTerms, showPrivacy, setShowPrivacy, t, sidebarOpen, setSidebarOpen, showAuthModal, message, setMessage, user, myListingsRaw, getDaysUntilExpiry, setExtendModalOpen, setExtendTarget, setSelectedExtendPlan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useApp"])();
    const [expiryBannerDismissed, setExpiryBannerDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const dismissExpiryBanner = ()=>{
        setExpiryBannerDismissed(true);
    };
    // Expiring listing (≤5 days left) for banner
    const expiringListing = myListingsRaw?.find((l)=>{
        if (l.status !== "verified" || !l.expiresAt) return false;
        const days = getDaysUntilExpiry(l.expiresAt);
        return days <= 5 && days > 0;
    });
    const openRenewModal = ()=>{
        if (expiringListing) {
            setExtendTarget(expiringListing);
            setSelectedExtendPlan("1");
            setExtendModalOpen(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$Header$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sidebarOpen: sidebarOpen,
                onMenuToggle: ()=>setSidebarOpen((prev)=>!prev)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$Sidebar$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                isOpen: sidebarOpen,
                onClose: ()=>setSidebarOpen(false)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 80,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            user && expiringListing && !expiryBannerDismissed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "expiry-banner",
                role: "alert",
                style: {
                    position: "fixed",
                    top: "90px",
                    background: "var(--warning)",
                    color: "#1f2937",
                    padding: "0.75rem 1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "1rem",
                    flexWrap: "wrap",
                    zIndex: 1000,
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    maxWidth: "100%",
                    width: "100%",
                    margin: "0 auto"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            flex: 1,
                            textAlign: "center"
                        },
                        children: t("listingExpiresInDays").replace("{{days}}", String(getDaysUntilExpiry(expiringListing.expiresAt)))
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-primary btn-sm",
                                onClick: openRenewModal,
                                "aria-label": t("renewNow"),
                                children: t("renewNow")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 104,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "btn btn-ghost btn-sm",
                                onClick: dismissExpiryBanner,
                                "aria-label": t("close"),
                                style: {
                                    background: "rgba(0,0,0,0.1)",
                                    color: "#1f2937",
                                    border: "1px solid rgba(0,0,0,0.2)",
                                    padding: "0.25rem 0.5rem",
                                    borderRadius: "4px",
                                    fontSize: "0.875rem",
                                    minWidth: "auto"
                                },
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 107,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 103,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 82,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "main-content-wrapper",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 127,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "footer-links",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/terms",
                                className: "btn-link",
                                children: t("terms")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "separator",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/privacy",
                                className: "btn-link",
                                children: t("privacy")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "separator",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/pricing",
                                className: "btn-link",
                                children: t("pricing")
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "© 2026 ",
                            t("appName"),
                            " • ",
                            t("bizCall")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 133,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {}, void 0, false, {
                            fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                            lineNumber: 146,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PostListingDrawer, {}, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ExtendListingModal, {}, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(EditListingModal, {}, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportModal, {}, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LegalModalsLoader, {
                        showTerms: showTerms,
                        showPrivacy: showPrivacy,
                        onCloseTerms: ()=>setShowTerms(false),
                        onClosePrivacy: ()=>setShowPrivacy(false),
                        t: t
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 144,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$NotificationToast$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                message: message?.text,
                type: message?.type,
                onClose: ()=>setMessage?.({
                        text: "",
                        type: "info"
                    })
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 160,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$CookieConsent$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                t: t
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 165,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "recaptcha-signup",
                style: {
                    display: "none"
                }
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 167,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "recaptcha-container",
                style: {
                    display: "none"
                }
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 168,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
        lineNumber: 78,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const LayoutWrapper = ({ children, initialListings = [], initialPublicListings = [] })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$FirebaseLoader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AppProvider"], {
            initialListings: initialListings,
            initialPublicListings: initialPublicListings,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(LayoutContent, {
                children: children
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
                lineNumber: 177,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
            lineNumber: 176,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/lsm2/src/components/LayoutWrapper.jsx",
        lineNumber: 175,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = LayoutWrapper;
}),
"[project]/lsm2/src/app/ClientLayout.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ClientLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/lib/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$LayoutWrapper$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/LayoutWrapper.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
function ClientLayout({ children, initialListings = [], initialPublicListings = [] }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["queryClient"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$LayoutWrapper$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            initialListings: initialListings,
            initialPublicListings: initialPublicListings,
            children: children
        }, void 0, false, {
            fileName: "[project]/lsm2/src/app/ClientLayout.jsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/lsm2/src/app/ClientLayout.jsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__3fe585af._.js.map