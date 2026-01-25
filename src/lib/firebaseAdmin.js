import admin from 'firebase-admin';

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

const db = admin.apps.length ? admin.database() : {
    ref: () => ({
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
