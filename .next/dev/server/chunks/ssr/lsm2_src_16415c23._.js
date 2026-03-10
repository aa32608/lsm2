module.exports = [
"[project]/lsm2/src/lib/firebaseAdmin.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "admin",
    ()=>admin,
    "db",
    ()=>db
]);
// Firebase Admin SDK - server-side only
// Safe for client-side (returns mock objects)
let admin = null;
let db = null;
// Initialize Firebase Admin (server-side only) - lazy initialization
async function initFirebaseAdmin() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        // Dynamic import for ES modules
        const firebaseAdminModule = await __turbopack_context__.A("[externals]/firebase-admin [external] (firebase-admin, cjs, [project]/lsm2/node_modules/firebase-admin, async loader)");
        admin = firebaseAdminModule.default || firebaseAdminModule;
        if (!admin.apps.length) {
            try {
                const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON) : null;
                if (serviceAccount && process.env.FIREBASE_DATABASE_URL) {
                    admin.initializeApp({
                        credential: admin.credential.cert(serviceAccount),
                        databaseURL: process.env.FIREBASE_DATABASE_URL
                    });
                    console.log("[Firebase Admin] Initialized successfully.");
                } else {
                    console.warn("[Firebase Admin] Missing configuration. Skipping initialization.");
                }
            } catch (error) {
                console.error("[Firebase Admin] Initialization error:", error);
            }
        }
        if (admin && admin.apps.length) {
            db = admin.database();
        }
    } catch (error) {
        // Firebase Admin not available - use mock
        console.warn("[Firebase Admin] Not available:", error.message);
    }
}
// Lazy initialization - only when needed (server-side)
let initPromise = null;
function ensureInitialized() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!initPromise) {
        initPromise = initFirebaseAdmin();
    }
    return initPromise;
}
// Export mock db (will be replaced if admin initializes successfully)
db = {
    ref: (path)=>({
            orderByChild: (field)=>({
                    equalTo: (value)=>({
                            limitToLast: (limit)=>({
                                    once: async ()=>{
                                        await ensureInitialized();
                                        if (admin && admin.apps.length && db && typeof db.ref === 'function') {
                                            try {
                                                return await db.ref(path).orderByChild(field).equalTo(value).limitToLast(limit).once('value');
                                            } catch (e) {
                                                return {
                                                    val: ()=>null,
                                                    exists: ()=>false
                                                };
                                            }
                                        }
                                        return {
                                            val: ()=>null,
                                            exists: ()=>false
                                        };
                                    },
                                    on: (event, callback, errorCallback)=>{
                                        ensureInitialized().then(()=>{
                                            if (admin && admin.apps.length && db && typeof db.ref === 'function') {
                                                try {
                                                    return db.ref(path).orderByChild(field).equalTo(value).limitToLast(limit).on(event, callback, errorCallback);
                                                } catch (e) {
                                                // Ignore errors
                                                }
                                            }
                                        });
                                        return ()=>{};
                                    }
                                })
                        })
                }),
            child: ()=>({
                    get: async ()=>({
                            val: ()=>null,
                            exists: ()=>false
                        }),
                    set: async ()=>{},
                    update: async ()=>{},
                    remove: async ()=>{},
                    once: async ()=>({
                            val: ()=>null,
                            exists: ()=>false
                        })
                }),
            once: async ()=>({
                    val: ()=>null,
                    exists: ()=>false
                }),
            update: async ()=>{},
            push: ()=>({
                    key: 'mock-id',
                    set: async ()=>{}
                })
        })
};
;
}),
"[project]/lsm2/src/constants.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lsm2/src/lib/serverListingsCache.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCachedListings",
    ()=>getCachedListings,
    "refreshCache",
    ()=>refreshCache
]);
// Server-side listings cache with real-time Firebase sync
// Fetches once, caches in memory, syncs updates immediately when Firebase changes
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/lib/firebaseAdmin.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/constants.js [app-rsc] (ecmascript)");
;
;
const FIREBASE_DB_URL = 'https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app';
// Check if Firebase Admin SDK is properly initialized (not mock)
function isAdminSDKAvailable() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"] && __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].ref && typeof __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].ref === 'function' && __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].ref('test').orderByChild !== undefined; // Check if real SDK methods exist
}
// In-memory cache (shared across all server requests)
let listingsCache = {
    publicListings: [],
    allListings: [],
    lastFetch: 0,
    isInitialized: false,
    isSyncing: false,
    listener: null
};
// Initialize cache and set up real-time sync
async function initializeCache() {
    if (listingsCache.isInitialized) {
        return; // Already initialized
    }
    listingsCache.isInitialized = true;
    // Initial fetch
    await fetchAndUpdateCache();
    // Set up real-time sync
    startRealtimeSync();
}
// Fetch listings from Firebase and update cache
async function fetchAndUpdateCache() {
    if (listingsCache.isSyncing) {
        return; // Already syncing, skip
    }
    try {
        listingsCache.isSyncing = true;
        // Try Firebase Admin SDK first (faster, real-time)
        if (isAdminSDKAvailable()) {
            try {
                const verifiedRef = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].ref('listings').orderByChild('status').equalTo('verified').limitToLast(250);
                const snapshot = await verifiedRef.once('value');
                const verifiedData = snapshot.val() || {};
                // Convert to array and filter expired
                const now = Date.now();
                const publicListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(Object.entries(verifiedData).map(([id, data])=>({
                        id,
                        ...data
                    })).filter((l)=>!l.expiresAt || l.expiresAt > now));
                listingsCache.publicListings = publicListings;
                listingsCache.lastFetch = Date.now();
                console.log(`[Server Cache] Updated ${publicListings.length} verified listings (Admin SDK)`);
                return;
            } catch (adminError) {
                console.warn('[Server Cache] Admin SDK failed, falling back to REST API:', adminError.message);
            }
        }
        // Fallback: Use REST API
        const verifiedUrl = `${FIREBASE_DB_URL}/listings.json?orderBy="status"&equalTo="verified"&limitToLast=250`;
        const verifiedResponse = await fetch(verifiedUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!verifiedResponse.ok) {
            throw new Error(`Firebase API error: ${verifiedResponse.status}`);
        }
        const verifiedData = await verifiedResponse.json() || {};
        // Convert to array and filter expired
        const now = Date.now();
        const publicListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(Object.entries(verifiedData).map(([id, data])=>({
                id,
                ...data
            })).filter((l)=>!l.expiresAt || l.expiresAt > now));
        // Update cache
        listingsCache.publicListings = publicListings;
        listingsCache.lastFetch = Date.now();
        console.log(`[Server Cache] Updated ${publicListings.length} verified listings (REST API)`);
    } catch (error) {
        console.error('[Server Cache] Error fetching listings:', error);
    // Keep existing cache on error
    } finally{
        listingsCache.isSyncing = false;
    }
}
// Set up real-time Firebase listener for immediate updates
function startRealtimeSync() {
    // Try Firebase Admin SDK listener first (real-time, immediate updates)
    if (isAdminSDKAvailable()) {
        try {
            const verifiedRef = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$lib$2f$firebaseAdmin$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"].ref('listings').orderByChild('status').equalTo('verified').limitToLast(250);
            // Real-time listener - updates cache immediately when Firebase changes
            listingsCache.listener = verifiedRef.on('value', (snapshot)=>{
                if (snapshot.exists()) {
                    const verifiedData = snapshot.val() || {};
                    // Convert to array and filter expired
                    const now = Date.now();
                    const publicListings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sortFeaturedFirst"])(Object.entries(verifiedData).map(([id, data])=>({
                            id,
                            ...data
                        })).filter((l)=>!l.expiresAt || l.expiresAt > now));
                    // Update cache immediately
                    listingsCache.publicListings = publicListings;
                    listingsCache.lastFetch = Date.now();
                    console.log(`[Server Cache] Real-time sync: Updated ${publicListings.length} listings`);
                }
            }, (error)=>{
                console.error('[Server Cache] Real-time listener error:', error);
                // Fallback to polling if listener fails
                startPollingSync();
            });
            console.log('[Server Cache] Real-time Firebase listener started (immediate updates)');
            return;
        } catch (error) {
            console.warn('[Server Cache] Failed to start Admin SDK listener, using polling:', error.message);
        }
    }
    // Fallback: Use polling if Admin SDK not available
    startPollingSync();
}
// Fallback: Efficient polling sync (checks every 2 seconds for changes)
let syncInterval = null;
function startPollingSync() {
    if (syncInterval) return; // Already started
    syncInterval = setInterval(async ()=>{
        // Sync updates every 2 seconds - catches changes ASAP
        await fetchAndUpdateCache();
    }, 2000); // Check every 2 seconds
    console.log('[Server Cache] Polling sync started (2s interval - updates sync ASAP)');
}
function getCachedListings() {
    // Initialize if not already done
    if (!listingsCache.isInitialized) {
        initializeCache();
    }
    // Return cached data immediately
    return {
        publicListings: listingsCache.publicListings,
        allListings: listingsCache.allListings
    };
}
async function refreshCache() {
    await fetchAndUpdateCache();
}
// Initialize cache on module load (server-side only)
// Use try-catch to prevent errors during AdSense preview or other edge cases
// Delay initialization to avoid blocking module load
if ("TURBOPACK compile-time truthy", 1) {
    // Use setTimeout to defer initialization and prevent blocking
    setTimeout(()=>{
        try {
            initializeCache();
        } catch (error) {
            console.error('[Server Cache] Initialization error (non-fatal):', error);
        // Continue without cache - client will fetch
        }
    }, 0);
}
}),
];

//# sourceMappingURL=lsm2_src_16415c23._.js.map