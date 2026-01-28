// Firebase Admin SDK - server-side only
// Safe for client-side (returns mock objects)

let admin = null;
let db = null;

// Initialize Firebase Admin (server-side only) - lazy initialization
async function initFirebaseAdmin() {
  if (typeof window !== 'undefined') {
    // Client-side - return mock
    return;
  }

  try {
    // Dynamic import for ES modules
    const firebaseAdminModule = await import('firebase-admin');
    admin = firebaseAdminModule.default || firebaseAdminModule;
    
    if (!admin.apps.length) {
      try {
        const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON 
          ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
          : null;

        if (serviceAccount && process.env.FIREBASE_DATABASE_URL) {
          admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
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
  if (typeof window !== 'undefined') return Promise.resolve();
  if (!initPromise) {
    initPromise = initFirebaseAdmin();
  }
  return initPromise;
}

// Export mock db (will be replaced if admin initializes successfully)
db = {
  ref: (path) => ({
    orderByChild: (field) => ({
      equalTo: (value) => ({
        limitToLast: (limit) => ({
          once: async () => {
            await ensureInitialized();
            if (admin && admin.apps.length && db && typeof db.ref === 'function') {
              try {
                return await db.ref(path).orderByChild(field).equalTo(value).limitToLast(limit).once('value');
              } catch (e) {
                return { val: () => null, exists: () => false };
              }
            }
            return { val: () => null, exists: () => false };
          },
          on: (event, callback, errorCallback) => {
            ensureInitialized().then(() => {
              if (admin && admin.apps.length && db && typeof db.ref === 'function') {
                try {
                  return db.ref(path).orderByChild(field).equalTo(value).limitToLast(limit).on(event, callback, errorCallback);
                } catch (e) {
                  // Ignore errors
                }
              }
            });
            return () => {};
          }
        })
      })
    }),
    child: () => ({
      get: async () => ({ val: () => null, exists: () => false }),
      set: async () => {},
      update: async () => {},
      remove: async () => {},
      once: async () => ({ val: () => null, exists: () => false })
    }),
    once: async () => ({ val: () => null, exists: () => false }),
    update: async () => {},
    push: () => ({ key: 'mock-id', set: async () => {} })
  })
};

export { admin, db };
