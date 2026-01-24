/* eslint-env node */
/* global process, Buffer */
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import admin from "firebase-admin";
import cors from "cors";
import { Resend } from "resend";
import cron from "node-cron";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import DodoPayments from 'dodopayments';
import { EMAIL_TRANSLATIONS } from './translations.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';

console.log("Environment Variables Loaded:");


// Initialize Resend lazily to prevent crash if API key is missing during startup
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("WARNING: RESEND_API_KEY is not set. Email functionality will be disabled.");
}

/* -------------------- FIREBASE SETUP (Render-friendly) -------------------- */

// We now load the full service account JSON from an environment variable
let serviceAccount;
let isFirebaseInitialized = false;

if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.warn("WARNING: FIREBASE_SERVICE_ACCOUNT_JSON is not set in env! Firebase features will be disabled.");
} else {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    
    if (!process.env.FIREBASE_DATABASE_URL) {
      console.warn("WARNING: FIREBASE_DATABASE_URL is not set in env! Firebase features will be disabled.");
    } else {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
      isFirebaseInitialized = true;
      console.log("[Firebase] Initialized successfully.");
    }
  } catch (err) {
    console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", err);
  }
}

const db = isFirebaseInitialized ? admin.database() : {
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

/* --------------------------- EXPRESS SETUP --------------------------- */

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://lsm-bojr3c63z-artins-projects-8d0a28db.vercel.app",
        "https://bizcall.vercel.app",
        "https://lsm-wozo.onrender.com",
        "https://lsmtetovo.vercel.app",
        "https://bizcall.mk",
        "https://www.bizcall.mk"
      ];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Allow all in dev/production for now to prevent CORS issues during migration
      callback(null, true);
    },
    credentials: true,
  })
);

app.use(bodyParser.json());

/* ----------------------- EMAIL NOTIFICATIONS ----------------------- */

async function sendEmail(to, subject, text) {
  if (!to || !subject || !text) {
    console.error("sendEmail: Missing required fields");
    return { error: "Missing required fields" };
  }

  try {
    if (!resend) {
      console.warn("sendEmail: Resend is not configured.");
      return { error: "Resend not configured" };
    }

    const verifiedDomain = process.env.RESEND_DOMAIN;
    const isTestingMode = !verifiedDomain;
    
    let finalTo = to;
    let finalFrom = isTestingMode 
      ? "BizCall MK <onboarding@resend.dev>" 
      : `BizCall MK <notifications@${verifiedDomain}>`;

    if (isTestingMode) {
      finalTo = "artinalimi69@gmail.com"; 
      console.log(`[TEST MODE] Redirecting email for ${to} to ${finalTo}`);
      text = `[INTENDED FOR: ${to}]\n\n${text}`;
    }

    const { data, error } = await resend.emails.send({
      from: finalFrom, 
      to: [finalTo],
      subject: subject,
      text: text,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error };
    }

    return { ok: true, id: data.id };
  } catch (err) {
    console.error("Email send error:", err);
    return { error: err };
  }
}

app.post("/api/send-email", async (req, res) => {
  const { to, subject, text } = req.body;
  const result = await sendEmail(to, subject, text);
  if (result.error) {
    return res.status(500).json({ error: result.error });
  }
  res.json(result);
});


/* ----------------------- DODO PAYMENTS ----------------------- */

app.post("/api/create-payment", async (req, res) => {
  const { listingId, type, customerEmail, customerName, plan, userId } = req.body; // type: 'create' | 'extend'

  if (!listingId) {
    return res.status(400).json({ error: "Missing listingId" });
  }

  // --- FREE TRIAL LOGIC ---
  // If it's a new listing creation, we have a userId, AND the selected plan is "1" (1 Month)
  if (type === 'create' && userId && String(plan) === "1") {
      try {
        const userRef = db.ref(`users/${userId}`);
        const userSnap = await userRef.once('value');
        const userData = userSnap.val();

        // Check if user exists and hasn't used free trial
        if (userData && !userData.hasUsedFreeTrial) {
            // Activate Free Trial (1 Month)
            const now = Date.now();
            const durationMs = 30 * 24 * 60 * 60 * 1000; // 30 days
            
            const updates = {};
            updates[`listings/${listingId}/status`] = "verified";
            updates[`listings/${listingId}/createdAt`] = now;
            updates[`listings/${listingId}/expiresAt`] = now + durationMs;
            updates[`listings/${listingId}/plan`] = "free_trial";
            updates[`listings/${listingId}/pricePaid`] = 0;
            updates[`users/${userId}/hasUsedFreeTrial`] = true;

            await db.ref().update(updates);
            
            console.log(`[Free Trial] Activated for user ${userId}, listing ${listingId}`);
            
            // Send Confirmation Email
            const subject = "BizCall MK: Free Trial Activated / Provë Falas e Aktivizuar / Бесплатен Пробен Период Активиран";
            const text = `Hello / Përshëndetje / Здраво,\n\nYour first listing has been activated for free for 1 month! 🎉\nShpallja juaj e parë është aktivizuar falas për 1 muaj!\nВашиот прв оглас е активиран бесплатно за 1 месец!\n\nEnjoy the full benefits of BizCall MK.\nShijoni përfitimet e plota të BizCall MK.\nУживајте во целосните придобивки на BizCall MK.\n\nThe BizCall Team`;
            
            if (customerEmail) {
                sendEmail(customerEmail, subject, text);
            }

            return res.json({ success: true, isFreeTrial: true });
        }
      } catch (err) {
          console.error("[Free Trial] Error checking eligibility:", err);
          // Fall through to normal payment if error
      }
  }
  // ------------------------

  if (!process.env.DODO_PAYMENTS_API_KEY) {
    console.error("DODO_PAYMENTS_API_KEY is missing");
    return res.status(503).json({ error: "Payment service not configured" });
  }

  // Map plan to product ID
  let PRODUCT_ID;
  switch (String(plan)) {
    case "1":
      PRODUCT_ID = process.env.DODO_PRODUCT_1_MONTH;
      break;
    case "3":
      PRODUCT_ID = process.env.DODO_PRODUCT_3_MONTHS;
      break;
    case "6":
      PRODUCT_ID = process.env.DODO_PRODUCT_6_MONTHS;
      break;
    case "12":
      PRODUCT_ID = process.env.DODO_PRODUCT_12_MONTHS;
      break;
    default:
      PRODUCT_ID = process.env.DODO_PRODUCT_1_MONTH; // Default fallback
  }

  if (!PRODUCT_ID) {
     console.error(`Product ID missing for plan ${plan}`);
     // Fallback to the generic one if specific ones aren't set yet (for transition)
     PRODUCT_ID = process.env.DODO_PAYMENTS_PRODUCT_ID;
  }

  if (!PRODUCT_ID) {
     console.error("No Product ID configured");
     return res.status(503).json({ error: "Payment product not configured" });
  }

  try {
    const client = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
    });

    // Create Checkout Session
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }],
      customer: { 
        email: customerEmail || 'guest@example.com', 
        name: customerName || 'Guest User' 
      },
      metadata: { listingId, type, plan },
      return_url: `${req.headers.origin || 'https://bizcall.mk'}/?payment=success&listingId=${listingId}&type=${type}&plan=${plan}`,
    });

    res.json({ checkoutUrl: session.checkout_url });
  } catch (err) {
    console.error("Dodo Payment Error Full:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Failed to create payment session. Check server logs for details. " + err.message });
  }
});

app.post("/api/webhook", async (req, res) => {
  try {
    const event = req.body;
    
    // Log the event for debugging
    console.log("Webhook received:", JSON.stringify(event, null, 2));

    // Dodo Payments typically sends an event object
    // We care about payment success
    if (event.type === 'payment.succeeded') {
        const { metadata } = event.data;
        
        if (!metadata || !metadata.listingId) {
             console.log("Webhook: No metadata or listingId found, ignoring.");
             return res.json({ received: true });
        }

        const { listingId, type, plan } = metadata;

        const updates = {};
        const now = Date.now();
        
        // Calculate duration based on plan
        let durationDays = 30;
        switch(String(plan)) {
            case "1": durationDays = 30; break;
            case "3": durationDays = 90; break;
            case "6": durationDays = 180; break;
            case "12": durationDays = 365; break;
            default: durationDays = 30;
        }
        const durationMs = durationDays * 24 * 60 * 60 * 1000;

        // Fetch listing for details
        const snapshot = await db.ref(`listings/${listingId}`).once('value');
        const listing = snapshot.val();
        
        if (!listing) {
             console.log(`[Webhook] Listing ${listingId} not found.`);
             return res.json({ received: true });
        }

        if (type === 'create') {
            updates[`listings/${listingId}/status`] = "verified"; 
            updates[`listings/${listingId}/createdAt`] = now;
            updates[`listings/${listingId}/expiresAt`] = now + durationMs;
            updates[`listings/${listingId}/plan`] = plan;
        } else if (type === 'extend') {
            let currentExpiry = now;
            if (listing.expiresAt && listing.expiresAt > now) {
                currentExpiry = listing.expiresAt;
            }
            updates[`listings/${listingId}/expiresAt`] = currentExpiry + durationMs;
            updates[`listings/${listingId}/status`] = "verified";
            updates[`listings/${listingId}/plan`] = plan;
        }

        await db.ref().update(updates);
        console.log(`[Webhook] Listing ${listingId} updated successfully (Type: ${type}, Plan: ${plan})`);

        // Send Notification Email
        const userEmail = listing.userEmail || listing.email; 
        if (userEmail) {
            const listingName = listing.name || "Service";
            const link = `https://bizcall.mk/?listing=${listingId}`;
            const expiryDate = new Date(type === 'create' ? (now + durationMs) : (updates[`listings/${listingId}/expiresAt`])).toLocaleDateString();
            
            let subject = "";
            let text = "";
            
            if (type === 'create') {
                subject = `BizCall MK: Listing Activated / Shpallja u Aktivizua / Огласот е Активиран`;
                text = `Hello / Përshëndetje / Здраво,\n\nYour listing "${listingName}" has been successfully activated!\nShpallja juaj "${listingName}" është aktivizuar me sukses!\nВашиот оглас "${listingName}" е успешно активиран!\n\nIt is now live on BizCall MK.\nTani është aktiv në BizCall MK.\nСега е активен на BizCall MK.\n\nManage your listing here: ${link}\n\nThe BizCall Team`;
            } else if (type === 'extend') {
                subject = `BizCall MK: Listing Extended / Shpallja u Vazhdua / Огласот е Продолжен`;
                text = `Hello / Përshëndetje / Здраво,\n\nYour listing "${listingName}" has been successfully extended!\nShpallja juaj "${listingName}" është vazhduar me sukses!\nВашиот оглас "${listingName}" е успешно продолжен!\n\nNew Expiry Date: ${expiryDate}\nData e re e skadimit: ${expiryDate}\nНов датум на истекување: ${expiryDate}\n\nManage your listing here: ${link}\n\nThe BizCall Team`;
            }
            
            if (subject && text) {
                await sendEmail(userEmail, subject, text);
                console.log(`[Webhook] Notification email sent to ${userEmail}`);
            }
        }
    }

    res.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send("Webhook Error");
  }
});


/* ----------------------- DAILY MAINTENANCE CRON ----------------------- */
// Runs every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
    console.log("[Cron] Running daily maintenance tasks...");
    const now = Date.now();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    const TWENTY_SEVEN_DAYS_MS = 27 * 24 * 60 * 60 * 1000;

    try {
        const listingsRef = db.ref("listings");
        const snapshot = await listingsRef.once("value");
        const listings = snapshot.val();
        
        if (listings) {
            const updates = {};
            const listingsToDelete = [];
            let warningCount = 0;

            for (const [id, listing] of Object.entries(listings)) {
                // 1. Handle Verified Listings (Expiry Logic)
                if (listing.status === "verified" && listing.expiresAt) {
                    const timeUntilExpiry = listing.expiresAt - now;
                    const timeSinceExpiry = now - listing.expiresAt;

                    // A. Expiring Soon Warning (7 days before)
                    if (timeUntilExpiry > 0 && timeUntilExpiry <= SEVEN_DAYS_MS && !listing.expiryWarningSent) {
                        const email = listing.userEmail || listing.email;
                        if (email) {
                            const subject = EMAIL_TRANSLATIONS.listing.expiring_soon.subject.en + " / " + 
                                            EMAIL_TRANSLATIONS.listing.expiring_soon.subject.sq + " / " + 
                                            EMAIL_TRANSLATIONS.listing.expiring_soon.subject.mk;
                            
                            const text = EMAIL_TRANSLATIONS.listing.expiring_soon.text.en(listing.name || "Service", new Date(listing.expiresAt).toLocaleDateString(), "https://bizcall.mk/my-listings") + "\n\n---\n\n" +
                                         EMAIL_TRANSLATIONS.listing.expiring_soon.text.sq(listing.name || "Shërbimi", new Date(listing.expiresAt).toLocaleDateString(), "https://bizcall.mk/my-listings") + "\n\n---\n\n" +
                                         EMAIL_TRANSLATIONS.listing.expiring_soon.text.mk(listing.name || "Услуга", new Date(listing.expiresAt).toLocaleDateString(), "https://bizcall.mk/my-listings");

                            await sendEmail(email, subject, text);
                            updates[`listings/${id}/expiryWarningSent`] = true;
                            console.log(`[Cron] Sent expiry warning for listing ${id}`);
                            warningCount++;
                            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
                        }
                    }

                    // B. Pre-Deletion Warning (27 days AFTER expiry, i.e., 3 days before deletion)
                    if (timeSinceExpiry >= TWENTY_SEVEN_DAYS_MS && timeSinceExpiry < THIRTY_DAYS_MS && !listing.preDeletionWarningSent) {
                        const email = listing.userEmail || listing.email;
                        if (email) {
                             const listingName = listing.name || "Service";
                             const link = `https://bizcall.mk/?listing=${id}`; // Or renewal link
                             
                             const subject = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.en + " / " + 
                                             EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.sq + " / " + 
                                             EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.mk;
                             
                             const text = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.en(listingName, link) + "\n\n---\n\n" +
                                          EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.sq(listingName, link) + "\n\n---\n\n" +
                                          EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.mk(listingName, link);
 
                             await sendEmail(email, subject, text);
                             updates[`listings/${id}/preDeletionWarningSent`] = true;
                             console.log(`[Cron] Sent pre-deletion warning for listing ${id}`);
                             warningCount++;
                             await new Promise(resolve => setTimeout(resolve, 500));
                        }
                    }

                    // C. Delete Expired (> 30 days post-expiry)
                    if (timeSinceExpiry >= THIRTY_DAYS_MS) {
                        listingsToDelete.push({ id, email: listing.userEmail || listing.email, name: listing.name, reason: "expired" });
                    }
                }

                // 2. Handle Pending/Unpaid Listings (Cleanup after 30 days)
                if ((listing.status === "unpaid" || listing.status === "pending") && listing.createdAt) {
                    const timeSinceCreation = now - listing.createdAt;
                    if (timeSinceCreation >= THIRTY_DAYS_MS) {
                         listingsToDelete.push({ id, reason: "pending_stale" });
                    }
                }
            }

            // Perform updates for warnings
            if (Object.keys(updates).length > 0) {
                await db.ref().update(updates);
            }

            // Perform deletions
            for (const item of listingsToDelete) {
                await db.ref(`listings/${item.id}`).remove();
                console.log(`[Cron] Deleted listing ${item.id} (Reason: ${item.reason})`);
                
                // Send Deletion Email (only for verified expired listings)
                if (item.reason === "expired" && item.email) {
                    const subject = EMAIL_TRANSLATIONS.listing.expired_deleted.subject.en + " / " +
                                    EMAIL_TRANSLATIONS.listing.expired_deleted.subject.sq + " / " +
                                    EMAIL_TRANSLATIONS.listing.expired_deleted.subject.mk;
                    
                    const text = EMAIL_TRANSLATIONS.listing.expired_deleted.text.en(item.name || "Service", "https://bizcall.mk/add-listing") + "\n\n---\n\n" +
                                 EMAIL_TRANSLATIONS.listing.expired_deleted.text.sq(item.name || "Shërbimi", "https://bizcall.mk/add-listing") + "\n\n---\n\n" +
                                 EMAIL_TRANSLATIONS.listing.expired_deleted.text.mk(item.name || "Услуга", "https://bizcall.mk/add-listing");
                    
                    await sendEmail(item.email, subject, text);
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
        }
        
        // 3. Deleted User Cleanup
        // Remove listings where the user ID no longer exists in 'users' node
        const usersSnap = await db.ref("users").once("value");
        const users = usersSnap.val() || {};
        
        // Refresh listings snapshot as we might have deleted some
        const updatedListingsSnap = await listingsRef.once("value");
        const updatedListings = updatedListingsSnap.val();
        
        if (updatedListings) {
            Object.entries(updatedListings).forEach(async ([lid, l]) => {
                // If listing has a userId, check if it exists in users
                if (l.userId && !users[l.userId]) {
                     console.log(`[Cron] Removing listing ${lid} because user ${l.userId} does not exist.`);
                     await db.ref(`listings/${lid}`).remove();
                }
            });
        }

    } catch (err) {
        console.error("[Cron] Error:", err);
    }
});


/* ----------------------- WEEKLY MARKETING EMAILS ----------------------- */

async function sendMarketingEmails() {
  console.log("[Marketing] Starting weekly marketing email batch...");
  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();

    if (!users) {
      console.log("[Marketing] No users found in database.");
      return { message: "No users found", sentCount: 0 };
    }

    const subscribedUsers = Object.values(users).filter(
      (user) => user.subscribedToMarketing !== false && user.email
    );

    if (subscribedUsers.length === 0) {
      console.log("[Marketing] No subscribed users found.");
      return { message: "No subscribed users", sentCount: 0 };
    }

    if (!resend) {
      throw new Error("Resend is not configured. Please set RESEND_API_KEY.");
    }

    const verifiedDomain = process.env.RESEND_DOMAIN;
    const isTestingMode = !verifiedDomain;

    const websiteUrl = "https://bizcall.vercel.app"; // Or your production URL

    const templates = [
      {
        id: "weekly_roundup_cta",
        subjects: EMAIL_TRANSLATIONS.marketing.weekly_roundup.subject,
        texts: {
          en: (name) => EMAIL_TRANSLATIONS.marketing.weekly_roundup.text.en(name, websiteUrl),
          sq: (name) => EMAIL_TRANSLATIONS.marketing.weekly_roundup.text.sq(name, websiteUrl),
          mk: (name) => EMAIL_TRANSLATIONS.marketing.weekly_roundup.text.mk(name, websiteUrl)
        }
      },
      {
        id: "community_connection_cta",
        subjects: EMAIL_TRANSLATIONS.marketing.community_connection.subject,
        texts: {
          en: (name) => EMAIL_TRANSLATIONS.marketing.community_connection.text.en(name, websiteUrl),
          sq: (name) => EMAIL_TRANSLATIONS.marketing.community_connection.text.sq(name, websiteUrl),
          mk: (name) => EMAIL_TRANSLATIONS.marketing.community_connection.text.mk(name, websiteUrl)
        }
      },
      {
        id: "growth_marketing_cta",
        subjects: EMAIL_TRANSLATIONS.marketing.growth_marketing.subject,
        texts: {
          en: (name) => EMAIL_TRANSLATIONS.marketing.growth_marketing.text.en(name, websiteUrl),
          sq: (name) => EMAIL_TRANSLATIONS.marketing.growth_marketing.text.sq(name, websiteUrl),
          mk: (name) => EMAIL_TRANSLATIONS.marketing.growth_marketing.text.mk(name, websiteUrl)
        }
      },
      {
        id: "trust_and_quality_cta",
        subjects: EMAIL_TRANSLATIONS.marketing.trust_and_quality.subject,
        texts: {
          en: (name) => EMAIL_TRANSLATIONS.marketing.trust_and_quality.text.en(name, websiteUrl),
          sq: (name) => EMAIL_TRANSLATIONS.marketing.trust_and_quality.text.sq(name, websiteUrl),
          mk: (name) => EMAIL_TRANSLATIONS.marketing.trust_and_quality.text.mk(name, websiteUrl)
        }
      }
    ];

    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    const results = [];
    for (const user of subscribedUsers) {
      const userLang = user.language || "sq";
      let finalTo = user.email;
      let finalSubject = selectedTemplate.subjects[userLang] || selectedTemplate.subjects["en"];
      let finalText = (selectedTemplate.texts[userLang] || selectedTemplate.texts["en"])(user.name);
      let finalFrom = isTestingMode 
        ? "BizCall MK <onboarding@resend.dev>" 
        : `BizCall MK <notifications@${verifiedDomain}>`;

      if (isTestingMode) {
        finalTo = "artinalimi69@gmail.com";
        finalSubject = `[TEST FOR ${user.email}] ${finalSubject}`;
      }

      console.log(`[Marketing] Sending email to ${finalTo}...`);
      const result = await resend.emails.send({
        from: finalFrom, 
        to: [finalTo],
        subject: finalSubject,
        text: finalText,
      });
      results.push(result);

      // Wait 600ms between emails to respect Resend's 2 requests/second rate limit
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    const errors = results.filter((r) => r.error);
    if (errors.length > 0) console.error("[Marketing] Some emails failed:", errors);

    return { ok: true, sentCount: subscribedUsers.length - errors.length };
  } catch (err) {
    console.error("[Marketing] Batch error:", err);
    throw err;
  }
}

app.post("/api/admin/send-weekly-marketing", async (req, res) => {
  const { adminKey } = req.body;
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await sendMarketingEmails();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to send emails" });
  }
});

/* ----------------------- CRON SCHEDULER ----------------------- */

// Schedule the marketing emails to run every Monday at 9:00 AM UTC.
// Cron expression: minute hour dayOfMonth month dayOfWeek
// 0 9 * * 1 = At 09:00 on Monday
const cronExpression = "0 9 * * 1";

console.log(`[Cron] Marketing emails scheduled for every Monday at 9:00 AM UTC (Cron: ${cronExpression})`);

cron.schedule(cronExpression, async () => {
  console.log("[Cron] Triggering weekly marketing emails...");
  try {
    const result = await sendMarketingEmails();
    console.log(`[Cron] Successfully sent ${result.sentCount} marketing emails.`);
  } catch (err) {
    console.error("[Cron] Failed to send marketing emails:", err);
  }
});

/* ----------------------- EXPIRING LISTINGS CRON ----------------------- */

// Check for expiring listings every day at 9:00 AM
// Cron expression: 0 9 * * *
cron.schedule("0 9 * * *", async () => {
  console.log("[Cron] Checking for expiring listings (7 days warning)...");
  if (!isFirebaseInitialized) return;
  
  try {
    const now = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const eightDaysMs = 8 * 24 * 60 * 60 * 1000;
    
    // Range: Expires between 7 and 8 days from now (to catch them once)
    const startRange = now + sevenDaysMs;
    const endRange = now + eightDaysMs;
    
    const snapshot = await db.ref("listings").orderByChild("expiresAt").startAt(startRange).endAt(endRange).once("value");
    
    if (!snapshot.exists()) {
      console.log("[Cron] No listings expiring in 7 days.");
      return;
    }
    
    const listings = snapshot.val();
    let count = 0;
    
    for (const [id, listing] of Object.entries(listings)) {
      if (listing.status === "verified" && (listing.userEmail || listing.email)) {
        const userEmail = listing.userEmail || listing.email;
        const listingName = listing.name || "Service";
        const link = `https://bizcall.mk/?listing=${id}`;
        const expiryDate = new Date(listing.expiresAt).toLocaleDateString();
        
        const subject = EMAIL_TRANSLATIONS.listing.expiring_soon.subject.en + " / " + 
                        EMAIL_TRANSLATIONS.listing.expiring_soon.subject.sq + " / " + 
                        EMAIL_TRANSLATIONS.listing.expiring_soon.subject.mk;
        
        const text = EMAIL_TRANSLATIONS.listing.expiring_soon.text.en(listingName, expiryDate, link) + "\n\n---\n\n" +
                     EMAIL_TRANSLATIONS.listing.expiring_soon.text.sq(listingName, expiryDate, link) + "\n\n---\n\n" +
                     EMAIL_TRANSLATIONS.listing.expiring_soon.text.mk(listingName, expiryDate, link);
        
        await sendEmail(userEmail, subject, text);
        console.log(`[Cron] Sent expiry warning for listing ${id} to ${userEmail}`);
        count++;
        
        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    console.log(`[Cron] Processed ${count} expiring listings.`);
  } catch (err) {
    console.error("[Cron] Error checking expiring listings:", err);
  }
});

/* ----------------------- DAILY MAINTENANCE CRON ----------------------- */

// Runs daily at 00:00 (Midnight) to handle:
// 1. Pre-deletion warnings (3 days before deletion)
// 2. Deletion of expired listings (> 30 days past expiry)
// 3. Cleanup of old pending/unpaid listings (> 30 days old)
cron.schedule("0 0 * * *", async () => {
  console.log("[Cron] Running daily maintenance tasks...");
  if (!isFirebaseInitialized) return;

  try {
    const snapshot = await db.ref("listings").once("value");
    if (!snapshot.exists()) {
       console.log("[Cron] No listings to maintain.");
       return;
    }

    const listings = snapshot.val();
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    let warningCount = 0;
    let expiredDeletedCount = 0;
    let pendingDeletedCount = 0;

    for (const [id, listing] of Object.entries(listings)) {
       // 1. Handle Verified/Active Listings
       if (listing.status === "verified" && listing.expiresAt) {
          const daysSinceExpiry = (now - listing.expiresAt) / dayMs;

          // A. Pre-deletion Warning (27 days post-expiry, 3 days before deletion)
          // Check if between 27 and 30 days (to be safe) and no warning sent
          if (daysSinceExpiry >= 27 && daysSinceExpiry < 30 && !listing.preDeletionWarningSent) {
             const userEmail = listing.userEmail || listing.email;
             if (userEmail) {
                const listingName = listing.name || "Service";
                const link = `https://bizcall.mk/?listing=${id}`;
                
                const subject = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.en + " / " + 
                                EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.sq + " / " + 
                                EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.mk;
                
                const text = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.en(listingName, link) + "\n\n---\n\n" +
                             EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.sq(listingName, link) + "\n\n---\n\n" +
                             EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.mk(listingName, link);

                await sendEmail(userEmail, subject, text);
                await db.ref(`listings/${id}`).update({ preDeletionWarningSent: true });
                console.log(`[Cron] Sent pre-deletion warning for ${id}`);
                warningCount++;
                await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
             }
          }

          // B. Delete Expired Listings (> 30 days post-expiry)
          if (daysSinceExpiry >= 30) {
             const userEmail = listing.userEmail || listing.email;
             // Send notification
             if (userEmail) {
                 const listingName = listing.name || "Service";
                 const link = `https://bizcall.mk/create`; // Encourage new listing
                 
                 const subject = EMAIL_TRANSLATIONS.listing.expired_deleted.subject.en + " / " + 
                                 EMAIL_TRANSLATIONS.listing.expired_deleted.subject.sq + " / " + 
                                 EMAIL_TRANSLATIONS.listing.expired_deleted.subject.mk;
                 
                 const text = EMAIL_TRANSLATIONS.listing.expired_deleted.text.en(listingName, link) + "\n\n---\n\n" +
                              EMAIL_TRANSLATIONS.listing.expired_deleted.text.sq(listingName, link) + "\n\n---\n\n" +
                              EMAIL_TRANSLATIONS.listing.expired_deleted.text.mk(listingName, link);
                 
                 await sendEmail(userEmail, subject, text);
                 await new Promise(resolve => setTimeout(resolve, 500));
             }
             
             // Delete
             await db.ref(`listings/${id}`).remove();
             console.log(`[Cron] Deleted expired listing ${id}`);
             expiredDeletedCount++;
          }
       }

       // 2. Handle Pending/Unpaid Listings
       if ((listing.status === "unpaid" || listing.status === "pending") && listing.createdAt) {
           const daysSinceCreation = (now - listing.createdAt) / dayMs;
           if (daysSinceCreation >= 30) {
               await db.ref(`listings/${id}`).remove();
               console.log(`[Cron] Deleted old pending listing ${id}`);
               pendingDeletedCount++;
           }
       }
    }
    console.log(`[Cron] Maintenance complete: ${warningCount} warnings, ${expiredDeletedCount} expired deletions, ${pendingDeletedCount} pending deletions.`);

  } catch (err) {
     console.error("[Cron] Maintenance error:", err);
  }
});

/* ----------------------- SSR SETUP ----------------------- */

let vite;
if (!isProduction) {
  // Dev: Create Vite server
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    root: path.resolve(__dirname, '..'), // Go up to root
  });
  app.use(vite.middlewares);
} else {
  // Prod: Serve static files
  // serve assets from dist/assets (relative to root, which is one level up from backend)
  app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets'), {
    maxAge: '1y',
    immutable: true
  }));
  app.use(express.static(path.resolve(__dirname, '../dist'), {
    index: false // disable default index.html serving
  }));
}

// SSR Handler
app.use(async (req, res, next) => {
  // Skip API routes
  if (req.originalUrl.startsWith('/api')) {
    return next();
  }

  const url = req.originalUrl;

  try {
    let template, render;
    
    if (!isProduction) {
      // Dev: Read from source
      template = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render;
    } else {
      // Prod: Read from built dist
      const distPath = path.resolve(__dirname, '../dist');
      const indexPath = path.join(distPath, 'index.html');
      const templatePath = path.join(distPath, 'template.html');

      if (!fs.existsSync(indexPath) && !fs.existsSync(templatePath)) {
        console.warn('Frontend build not found at:', distPath);
        return res.status(503).send(`
          <html>
            <head><title>Maintenance</title></head>
            <body style="font-family: sans-serif; text-align: center; padding: 50px;">
              <h1>Site is Building</h1>
              <p>The frontend assets are currently being built. Please wait a moment and refresh.</p>
              <p style="color: #666; font-size: 0.9em;">(Error: Frontend build artifacts not found)</p>
            </body>
          </html>
        `);
      }

      try {
        template = fs.readFileSync(templatePath, 'utf-8');
      } catch (e) {
        template = fs.readFileSync(indexPath, 'utf-8');
      }
      // Import the built server entry
      const serverEntryPath = path.resolve(__dirname, '../dist-server/entry-server.js');
      if (!fs.existsSync(serverEntryPath)) {
         console.warn('Server entry not found at:', serverEntryPath);
         return res.status(503).send('Server entry missing. Please build the project.');
      }
      render = (await import(serverEntryPath)).render;
    }

    const context = {};
    const initialData = { listings: [], publicListings: [] };
    
    const { html, helmet } = render(url, context, initialData);

    const helmetTitle = helmet.title ? helmet.title.toString() : '';
    const helmetMeta = helmet.meta ? helmet.meta.toString() : '';
    const helmetLink = helmet.link ? helmet.link.toString() : '';
    const helmetScript = helmet.script ? helmet.script.toString() : '';

    let htmlWithHelmet = template;
    
    if (helmetTitle) {
      htmlWithHelmet = htmlWithHelmet.replace(/<title.*?>.*?<\/title>/s, helmetTitle);
    }
    
    htmlWithHelmet = htmlWithHelmet.replace(`</head>`, `${helmetMeta}${helmetLink}${helmetScript}</head>`);
    htmlWithHelmet = htmlWithHelmet.replace(`<!--app-html-->`, html);
    
    const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`;
    htmlWithHelmet = htmlWithHelmet.replace(`</body>`, `${dataScript}</body>`);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithHelmet);
  } catch (e) {
    if (!isProduction) {
      vite.ssrFixStacktrace(e);
    }
    console.error(e);
    next(e);
  }
});

/* -------------------------- START SERVER -------------------------- */

export default app;

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
