/* eslint-env node */
/* global process, Buffer */
import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";
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

// Helper to get user language preference
async function getUserLanguage(userId) {
  if (!userId || !isFirebaseInitialized) return 'sq'; // Default to Albanian
  try {
    const userRef = db.ref(`users/${userId}`);
    const userSnap = await userRef.once('value');
    const userData = userSnap.val();
    return userData?.language || 'sq'; // Default to Albanian
  } catch (err) {
    console.warn(`[Language] Failed to get language for user ${userId}:`, err);
    return 'sq'; // Default fallback
  }
}

// Helper to get translation
function getTranslation(translations, lang = 'sq') {
  return translations[lang] || translations['en'] || translations['sq'] || '';
}

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* ----------------------- SITE URL HELPERS ----------------------- */
// Centralize all URLs used in emails/payments so they are always valid.
// Configure in production with SITE_URL="https://www.bizcall.mk"
const DEFAULT_SITE_URL = "https://www.bizcall.mk";
const SITE_URL = (() => {
  const raw =
    process.env.SITE_URL ||
    process.env.PUBLIC_SITE_URL ||
    process.env.FRONTEND_URL ||
    DEFAULT_SITE_URL;

  try {
    const withProto = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    const u = new URL(withProto);
    u.pathname = "/";
    return u.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
})();

function buildSiteUrl(pathname = "/", queryParams = null) {
  const u = new URL(SITE_URL);
  u.pathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (queryParams && typeof queryParams === "object") {
    for (const [k, v] of Object.entries(queryParams)) {
      if (v === undefined || v === null || v === "") continue;
      u.searchParams.set(k, String(v));
    }
  }
  return u.toString();
}

function listingPublicUrl(listingId) {
  return buildSiteUrl(`/listings/${encodeURIComponent(String(listingId || ""))}`);
}

function myListingsUrl() {
  return buildSiteUrl("/mylistings");
}

// 12-month plan: featured (top of search, badge) only for this many days; listing stays live for full 12 months
const FEATURED_DURATION_DAYS = 90; // 3 months

// Milestone emails: send when a listing reaches impressive view/contact counts (once per milestone)
const VIEW_MILESTONES = [100, 250, 500, 1000, 5000, 10000, 25000];
const CONTACT_MILESTONES = [25, 50, 100, 250, 500, 1000];

async function sendMilestoneEmailIfNeeded(listingId, type, data) {
  if (!data || !isFirebaseInitialized) return;
  const milestones = type === "views" ? VIEW_MILESTONES : CONTACT_MILESTONES;
  const value = type === "views" ? (Number(data.views) || 0) : (Number(data.contacts) || 0);
  const lastSent = type === "views" ? (Number(data.lastViewMilestoneSent) || 0) : (Number(data.lastContactMilestoneSent) || 0);
  const milestone = milestones.filter((m) => value >= m && m > lastSent).pop();
  if (milestone == null) return;
  const ownerEmail = data.userEmail || data.email;
  if (!ownerEmail) return;
  const listingName = data.name || "Your listing";
  const userLang = data.userId ? await getUserLanguage(data.userId) : "sq";
  const t = EMAIL_TRANSLATIONS.listing[type === "views" ? "milestone_views" : "milestone_contacts"];
  const subjectFn = t.subject[userLang] || t.subject.en;
  const textFn = t.text[userLang] || t.text.en;
  const url = listingPublicUrl(listingId);
  const subject = typeof subjectFn === "function" ? subjectFn(milestone) : subjectFn;
  const text = typeof textFn === "function" ? textFn(listingName, milestone, url) : textFn;
  const reason = type === "views" ? `milestone_views_${milestone}` : `milestone_contacts_${milestone}`;
  const emailResult = await sendEmail(ownerEmail, subject, text, false, null, reason);
  if (emailResult.ok) {
    await db.ref(`listings/${listingId}`).update(type === "views" ? { lastViewMilestoneSent: milestone } : { lastContactMilestoneSent: milestone });
    console.log(`[API] Milestone email sent: ${type} ${milestone} for listing ${listingId}`);
  } else if (!emailResult.skipped) {
    console.error(`[API] Milestone email failed for listing ${listingId}:`, emailResult.error);
  }
}

// Pre-initialize DodoPayments client at startup for faster payment processing
let dodoClient = null;
let productCache = {}; // Cache for preloaded products

if (process.env.DODO_PAYMENTS_API_KEY) {
  try {
    dodoClient = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
    });
    console.log('[DodoPayments] Client pre-initialized successfully');
    
    // Preload all 4 products at startup - cache product IDs and warm up HTTP connections
    const preloadProducts = async () => {
      const products = [
        { id: '1', envKey: 'DODO_PRODUCT_1_MONTH' },
        { id: '3', envKey: 'DODO_PRODUCT_3_MONTHS' },
        { id: '6', envKey: 'DODO_PRODUCT_6_MONTHS' },
        { id: '12', envKey: 'DODO_PRODUCT_12_MONTHS' }
      ];
      
      // Cache all product IDs
      for (const product of products) {
        const productId = process.env[product.envKey] || process.env.DODO_PAYMENTS_PRODUCT_ID;
        if (productId) {
          productCache[product.id] = productId;
          console.log(`[DodoPayments] Cached product ${product.id}: ${productId}`);
        }
      }
      
      // Pre-warm HTTP connections by making lightweight API calls
      // This establishes TCP connections to Dodo API servers for faster subsequent requests
      const preloadPromises = products.map(async (product) => {
        const productId = productCache[product.id];
        if (productId && dodoClient) {
          try {
            // Try to retrieve product info to warm up the connection
            // This is a lightweight GET request that won't create any sessions
            if (dodoClient.products && typeof dodoClient.products.retrieve === 'function') {
              await dodoClient.products.retrieve(productId).catch(() => {
                // Silently fail - we're just warming up connections
              });
            }
            console.log(`[DodoPayments] Pre-warmed connection for product ${product.id}`);
          } catch (err) {
            // Silently continue - preloading is optional
            // The connection will still be faster on first real use due to DNS/connection caching
          }
        }
      });
      
      // Wait for all preloads to complete (or fail silently)
      await Promise.allSettled(preloadPromises);
      console.log('[DodoPayments] Product preloading completed - connections ready');
    };
    
    // Preload products asynchronously after a short delay to not block startup
    setTimeout(() => {
      preloadProducts().catch(err => {
        console.warn('[DodoPayments] Product preloading failed:', err.message);
      });
    }, 2000);
  } catch (err) {
    console.error('[DodoPayments] Pre-initialization failed:', err);
  }
}
const isProduction = process.env.NODE_ENV === 'production';

console.log("Environment Variables Loaded:");


// Initialize Resend lazily to prevent crash if API key is missing during startup
let resend;
console.log("[Resend] Checking RESEND_API_KEY...");
if (process.env.RESEND_API_KEY) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    console.log(`[Resend] API Key found (length: ${apiKey.length} characters)`);
    console.log(`[Resend] API Key starts with: ${apiKey.substring(0, 10)}...`);
    resend = new Resend(apiKey);
    console.log("[Resend] ✅ Initialized successfully");
    console.log(`[Resend] Resend object type: ${typeof resend}`);
    console.log(`[Resend] Has emails.send method: ${!!(resend && resend.emails && resend.emails.send)}`);
  } catch (err) {
    console.error("[Resend] ❌ Failed to initialize:", err);
    console.error("[Resend] Error message:", err.message);
    console.error("[Resend] Error stack:", err.stack);
    resend = null;
  }
} else {
  console.error("❌ ERROR: RESEND_API_KEY is not set. Email functionality will be disabled.");
  console.error("Please set RESEND_API_KEY in your environment variables.");
  console.error("Current environment variables:", Object.keys(process.env).filter(k => k.includes('RESEND')));
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

// Keep raw body for Gumroad webhook signature verification
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));

/* ----------------------- HEALTH CHECK ENDPOINT ----------------------- */
// Health check endpoint to wake up backend and preload services
app.get("/api/health", async (req, res) => {
  // This endpoint wakes up the backend and ensures Dodo Payments is initialized
  // It's called from frontend on website visit to preload connections
  res.json({ 
    status: "ok", 
    timestamp: Date.now(),
    dodoPaymentsReady: !!dodoClient,
    firebaseReady: isFirebaseInitialized
  });
});

/* ----------------------- PAYMENTS WARMUP ENDPOINT ----------------------- */
// Dedicated warmup: ensures Dodo client is ready and performs a real API call
// so the first user payment doesn't wait for cold connections.
app.get("/api/payments-warmup", async (req, res) => {
  const start = Date.now();
  try {
    let client = dodoClient;
    if (!client && process.env.DODO_PAYMENTS_API_KEY) {
      client = new DodoPayments({
        bearerToken: process.env.DODO_PAYMENTS_API_KEY,
        environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
      });
      dodoClient = client;
      console.log('[DodoPayments] Client initialized on warmup');
    }
    if (client) {
      const productId = productCache['1'] || process.env.DODO_PRODUCT_1_MONTH || process.env.DODO_PAYMENTS_PRODUCT_ID;
      if (productId && client.products && typeof client.products.retrieve === 'function') {
        await client.products.retrieve(productId);
        console.log(`[DodoPayments] Warmup: product connection ready (${Date.now() - start}ms)`);
      }
    }
    res.json({ ready: true, dodoPaymentsReady: !!client, warmupMs: Date.now() - start });
  } catch (err) {
    console.warn('[DodoPayments] Warmup failed (non-fatal):', err.message);
    res.json({ ready: !!dodoClient, dodoPaymentsReady: !!dodoClient, warmupMs: Date.now() - start });
  }
});

/* ----------------------- EMAIL NOTIFICATIONS ----------------------- */

// Email cooldown tracking - prevent spam (only for marketing emails, 7 days between marketing emails)
// Other emails (listing expiry, deletion, etc.) are not subject to cooldown
const marketingEmailCooldowns = new Map(); // In-memory cache: email -> lastMarketingEmailSentTimestamp
const MARKETING_EMAIL_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days for marketing emails

async function checkMarketingEmailCooldown(email) {
  const lastSent = marketingEmailCooldowns.get(email);
  if (lastSent) {
    const timeSinceLastEmail = Date.now() - lastSent;
    if (timeSinceLastEmail < MARKETING_EMAIL_COOLDOWN_MS) {
      const daysRemaining = Math.ceil((MARKETING_EMAIL_COOLDOWN_MS - timeSinceLastEmail) / (24 * 60 * 60 * 1000));
      console.log(`[Email Cooldown] Marketing email to ${email} skipped. Last marketing email sent ${Math.floor(timeSinceLastEmail / (24 * 60 * 60 * 1000))} days ago. ${daysRemaining} days remaining.`);
      return false;
    }
  }
  return true;
}

function updateMarketingEmailCooldown(email) {
  marketingEmailCooldowns.set(email, Date.now());
}

// Email queue for rate limiting - ensures at least 1 second between emails
let lastEmailSentTime = 0;
const MIN_EMAIL_INTERVAL_MS = 1000; // 1 second minimum between emails

async function waitForEmailRateLimit() {
  const now = Date.now();
  const timeSinceLastEmail = now - lastEmailSentTime;
  
  if (timeSinceLastEmail < MIN_EMAIL_INTERVAL_MS) {
    const waitTime = MIN_EMAIL_INTERVAL_MS - timeSinceLastEmail;
    console.log(`[Email] Rate limiting: waiting ${waitTime}ms before next email`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastEmailSentTime = Date.now();
}

// Dedupe: prevent sending the same email twice for the SAME REASON within a short window.
// Different reasons bypass cooldown so important emails (e.g. payment success) are not blocked.
const EMAIL_DEDUPE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes
const recentEmailKeys = new Map(); // key = "to|reason" -> timestamp

function getEmailDedupeKey(to, reason) {
  const r = reason == null ? "generic" : String(reason);
  return `${to}|${r}`;
}

function wasRecentlySentForReason(to, reason) {
  const key = getEmailDedupeKey(to, reason);
  const sentAt = recentEmailKeys.get(key);
  if (!sentAt) return false;
  if (Date.now() - sentAt > EMAIL_DEDUPE_WINDOW_MS) {
    recentEmailKeys.delete(key);
    return false;
  }
  return true;
}

function markEmailSentForReason(to, reason) {
  const key = getEmailDedupeKey(to, reason);
  recentEmailKeys.set(key, Date.now());
  if (recentEmailKeys.size > 500) {
    const cutoff = Date.now() - EMAIL_DEDUPE_WINDOW_MS;
    for (const [k, ts] of recentEmailKeys.entries()) {
      if (ts < cutoff) recentEmailKeys.delete(k);
    }
  }
}

async function sendEmail(to, subject, text, isMarketingEmail = false, replyTo = null, reason = null) {
  if (!to || !subject || !text) {
    console.error("[Email] Missing required fields:", { to: !!to, subject: !!subject, text: !!text });
    return { error: EMAIL_TRANSLATIONS.errors.missing_required_fields.en };
  }

  const emailReason = reason == null ? "generic" : String(reason);
  if (wasRecentlySentForReason(to, emailReason)) {
    console.log(`[Email] Skipped duplicate (same reason "${emailReason}" to ${to} within ${EMAIL_DEDUPE_WINDOW_MS / 60000} min)`);
    return { skipped: true, reason: "duplicate" };
  }

  // Only check cooldown for marketing emails
  if (isMarketingEmail && !(await checkMarketingEmailCooldown(to))) {
    return { error: "Marketing email cooldown active", skipped: true };
  }

  // Wait for rate limit (non-blocking for the backend)
  await waitForEmailRateLimit();

  try {
    if (!resend) {
      console.error("[Email] Resend is not configured. RESEND_API_KEY missing.");
      console.error("[Email] Check if RESEND_API_KEY environment variable is set.");
      return { error: EMAIL_TRANSLATIONS.errors.resend_not_configured.en };
    }

    const verifiedDomain = process.env.RESEND_DOMAIN;
    
    let finalTo = to;
    let finalFrom = verifiedDomain 
      ? `BizCall MK <notifications@${verifiedDomain}>`
      : "BizCall MK <onboarding@resend.dev>";

    console.log(`[Email] ========================================`);
    console.log(`[Email] Attempting to send email:`);
    console.log(`[Email] To: ${finalTo}`);
    console.log(`[Email] From: ${finalFrom}`);
    console.log(`[Email] Subject: ${subject}`);
    console.log(`[Email] Text length: ${text.length} characters`);
    console.log(`[Email] Is Marketing: ${isMarketingEmail}`);
    console.log(`[Email] Resend initialized: ${!!resend}`);
    console.log(`[Email] Verified domain: ${verifiedDomain || 'none (using onboarding@resend.dev)'}`);

    console.log(`[Email] Calling resend.emails.send...`);
    const startTime = Date.now();
    
    let data, error;
    try {
      const emailOptions = {
        from: finalFrom, 
        to: [finalTo],
        subject: subject,
        text: text,
      };
      
      // Add reply-to if provided (useful for contact forms)
      if (replyTo) {
        emailOptions.replyTo = replyTo;
        console.log(`[Email] Reply-To: ${replyTo}`);
      }
      
      const response = await resend.emails.send(emailOptions);
      data = response.data;
      error = response.error;
    } catch (sendErr) {
      console.error(`[Email] Exception during resend.emails.send call:`, sendErr);
      error = sendErr;
      data = null;
    }
    
    const duration = Date.now() - startTime;
    console.log(`[Email] Resend API call completed in ${duration}ms`);

    if (error) {
      console.error("[Email] ========================================");
      console.error("[Email] RESEND API ERROR:");
      console.error("[Email] Error object:", JSON.stringify(error, null, 2));
      console.error("[Email] Error type:", typeof error);
      console.error("[Email] ========================================");
      return { error: error.message || JSON.stringify(error) };
    }

    if (!data || !data.id) {
      console.error("[Email] ========================================");
      console.error("[Email] RESEND RETURNED NO DATA/ID:");
      console.error("[Email] Data received:", JSON.stringify(data, null, 2));
      console.error("[Email] ========================================");
      return { error: "No email ID returned from Resend" };
    }

    // Update marketing email cooldown on success (only for marketing emails)
    if (isMarketingEmail) {
      updateMarketingEmailCooldown(to);
    }

    markEmailSentForReason(to, emailReason);
    
    console.log(`[Email] ========================================`);
    console.log(`[Email] ✅ SUCCESS! Email sent successfully`);
    console.log(`[Email] Email ID: ${data.id}`);
    console.log(`[Email] To: ${finalTo}`);
    console.log(`[Email] ========================================`);
    return { ok: true, id: data.id };
  } catch (err) {
    console.error("[Email] ========================================");
    console.error("[Email] EXCEPTION DURING SEND:");
    console.error("[Email] Error message:", err.message);
    console.error("[Email] Error stack:", err.stack);
    console.error("[Email] Error name:", err.name);
    console.error("[Email] Full error:", err);
    console.error("[Email] ========================================");
    return { error: err.message || String(err) };
  }
}

// Endpoint for feedback/review notifications
app.post("/api/send-feedback-notification", async (req, res) => {
  console.log("[API] ========================================");
  console.log("[API] 📧 Feedback notification request received");
  console.log("[API] Body:", JSON.stringify(req.body, null, 2));
  console.log("[API] ========================================");
  
  const { listingId, listingName, ownerEmail, reviewerName, rating, comment } = req.body;
  
  if (!ownerEmail || !listingId) {
    console.error("[API] ❌ Missing required fields:", { ownerEmail: !!ownerEmail, listingId: !!listingId });
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const userId = req.body.ownerUserId || null;
    const userLang = userId ? await getUserLanguage(userId) : 'sq';
    const link = listingPublicUrl(listingId);
    
    console.log(`[API] User language: ${userLang}, Listing: ${listingName}, Owner: ${ownerEmail}`);
    
    const subject = EMAIL_TRANSLATIONS.listing.feedback_received.subject[userLang] || 
                   EMAIL_TRANSLATIONS.listing.feedback_received.subject.en;
    const text = EMAIL_TRANSLATIONS.listing.feedback_received.text[userLang](
      listingName || "Your listing",
      reviewerName || "A user",
      rating || 5,
      comment || "",
      link
    ) || EMAIL_TRANSLATIONS.listing.feedback_received.text.en(
      listingName || "Your listing",
      reviewerName || "A user",
      rating || 5,
      comment || "",
      link
    );

    console.log(`[API] Calling sendEmail with subject: ${subject.substring(0, 50)}...`);
    const emailResult = await sendEmail(ownerEmail, subject, text, false, null, "feedback_notification");
    
    if (emailResult.ok) {
      console.log(`[API] ✅ Feedback notification sent to ${ownerEmail} for listing ${listingId}. Email ID: ${emailResult.id}`);
      res.json({ success: true, emailId: emailResult.id });
    } else if (emailResult.skipped) {
      console.log(`[API] ⏭️ Feedback notification skipped for ${ownerEmail} (cooldown)`);
      res.json({ success: false, skipped: true, error: emailResult.error });
    } else {
      console.error(`[API] ❌ Failed to send feedback notification:`, emailResult.error);
      res.status(500).json({ error: emailResult.error });
    }
  } catch (err) {
    console.error("[API] ========================================");
    console.error("[API] ❌ Exception sending feedback notification:");
    console.error("[API] Error:", err.message);
    console.error("[API] Stack:", err.stack);
    console.error("[API] ========================================");
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/send-email", async (req, res) => {
  const { to, subject, text, replyTo, reason } = req.body;
  console.log(`[API] /api/send-email called for ${to}`);
  const result = await sendEmail(to, subject, text, false, replyTo, reason || "contact_form");
  if (result.error && !result.skipped) {
    console.error(`[API] Email send failed:`, result.error);
    return res.status(500).json({ error: result.error });
  }
  if (result.skipped) {
    console.log(`[API] Email skipped:`, result.reason || "cooldown");
    return res.status(200).json({ skipped: true, message: result.reason === "duplicate" ? "Email skipped (duplicate)" : "Email skipped due to cooldown" });
  }
  console.log(`[API] Email sent successfully:`, result.id);
  res.json(result);
});

// Diagnostic endpoint to check email system status
app.get("/api/email-status", async (req, res) => {
  const status = {
    resendInitialized: !!resend,
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyLength: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.length : 0,
    hasDomain: !!process.env.RESEND_DOMAIN,
    domain: process.env.RESEND_DOMAIN || null,
    hasEmailsMethod: !!(resend && resend.emails && resend.emails.send),
    marketingCooldownsCount: marketingEmailCooldowns.size,
    timestamp: new Date().toISOString()
  };
  
  console.log("[Diagnostic] Email system status:", JSON.stringify(status, null, 2));
  res.json(status);
});


/* ----------------------- LISTING ANALYTICS (views, contacts) ----------------------- */
// Server-side dedupe: 5 min per IP per listing (each user has own cooldown, not global)
const viewDedupe = new Map(); // key: "ip_listingId" -> timestamp
const VIEW_DEDUPE_MS = 5 * 60 * 1000;
function cleanupViewDedupe() {
  const now = Date.now();
  for (const [k, ts] of viewDedupe.entries()) {
    if (now - ts > VIEW_DEDUPE_MS) viewDedupe.delete(k);
  }
}

// Increment view count for a listing (called when user opens listing detail page)
app.post("/api/listing-view", async (req, res) => {
  const { listingId } = req.body;
  if (!listingId) {
    return res.status(400).json({ error: "Missing listingId" });
  }
  if (!isFirebaseInitialized) {
    return res.status(503).json({ error: "Service unavailable" });
  }
  const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim() || "unknown";
  const viewKey = `${ip}_${listingId}`;
  cleanupViewDedupe();
  if (viewDedupe.has(viewKey)) {
    return res.json({ ok: true, skipped: true });
  }
  try {
    const listingRef = db.ref(`listings/${listingId}`);
    await listingRef.transaction((current) => {
      const data = current || {};
      const views = (Number(data.views) || 0) + 1;
      return { ...data, views };
    });
    viewDedupe.set(viewKey, Date.now());
    const snap = await listingRef.once("value");
    const data = snap.val() || {};
    sendMilestoneEmailIfNeeded(listingId, "views", data).catch((err) => console.error("[API] Milestone views check error:", err));
    res.json({ ok: true });
  } catch (err) {
    console.error("[API] listing-view error:", err);
    res.status(500).json({ error: err.message || "Failed to record view" });
  }
});

// Server-side contact dedupe: 40 sec per IP + listingId + type (each user has own cooldown)
const contactDedupe = new Map(); // key: "ip_listingId_type" -> timestamp
const CONTACT_DEDUPE_MS = 40 * 1000;
function cleanupContactDedupe() {
  const now = Date.now();
  for (const [k, ts] of contactDedupe.entries()) {
    if (now - ts > CONTACT_DEDUPE_MS) contactDedupe.delete(k);
  }
}

// Increment contact attempt count (phone, email, whatsapp). type: "phone" | "email" | "whatsapp"
app.post("/api/listing-contact", async (req, res) => {
  const { listingId, type } = req.body;
  if (!listingId) {
    return res.status(400).json({ error: "Missing listingId" });
  }
  if (!isFirebaseInitialized) {
    return res.status(503).json({ error: "Service unavailable" });
  }
  const contactType = (type && ["phone", "email", "whatsapp"].includes(type)) ? type : "phone";
  const ip = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "").split(",")[0].trim() || "unknown";
  const contactKey = `${ip}_${listingId}_${contactType}`;
  cleanupContactDedupe();
  if (contactDedupe.has(contactKey)) {
    return res.json({ ok: true, skipped: true });
  }
  try {
    const listingRef = db.ref(`listings/${listingId}`);
    await listingRef.transaction((current) => {
      const data = current || {};
      const contacts = (Number(data.contacts) || 0) + 1;
      const contactByPhone = Number(data.contactByPhone) || 0;
      const contactByEmail = Number(data.contactByEmail) || 0;
      const contactByWhatsapp = Number(data.contactByWhatsapp) || 0;
      return {
        ...data,
        contacts,
        contactByPhone: contactType === "phone" ? contactByPhone + 1 : contactByPhone,
        contactByEmail: contactType === "email" ? contactByEmail + 1 : contactByEmail,
        contactByWhatsapp: contactType === "whatsapp" ? contactByWhatsapp + 1 : contactByWhatsapp,
      };
    });
    contactDedupe.set(contactKey, Date.now());
    const snap = await listingRef.once("value");
    const data = snap.val() || {};
    sendMilestoneEmailIfNeeded(listingId, "contacts", data).catch((err) => console.error("[API] Milestone contacts check error:", err));
    res.json({ ok: true });
  } catch (err) {
    console.error("[API] listing-contact error:", err);
    res.status(500).json({ error: err.message || "Failed to record contact" });
  }
});

// Helper for last-month key (YYYY-MM) for chart comparison
function getLastMonthKeyAPI() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
function getThisMonthKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

// Aggregate stats for homepage social proof + top 5 featured listings (real-time from DB)
app.get("/api/listing-stats-aggregate", async (req, res) => {
  if (!isFirebaseInitialized) {
    return res.json({ totalViews: 0, totalContacts: 0, totalByPhone: 0, totalByEmail: 0, totalByWhatsapp: 0, top5Featured: [], lastMonthKey: null, thisMonthKey: null });
  }
  try {
    const snapshot = await db.ref("listings").once("value");
    const listings = snapshot.val() || {};
    const lastMonthKey = getLastMonthKeyAPI();
    const thisMonthKey = getThisMonthKey();
    let totalViews = 0, totalContacts = 0, totalByPhone = 0, totalByEmail = 0, totalByWhatsapp = 0;
    const featured = [];
    const now = Date.now();
    Object.entries(listings).forEach(([listingId, l]) => {
      const views = Number(l.views) || 0;
      const contacts = Number(l.contacts) || 0;
      totalViews += views;
      totalContacts += contacts;
      totalByPhone += Number(l.contactByPhone) || 0;
      totalByEmail += Number(l.contactByEmail) || 0;
      totalByWhatsapp += Number(l.contactByWhatsapp) || 0;
      const isFeatured = String(l.plan) === "12" && l.status === "verified" && (!l.featuredUntil || l.featuredUntil > now);
      if (isFeatured) {
        const monthly = l.monthlyStats && l.monthlyStats[lastMonthKey] ? l.monthlyStats[lastMonthKey] : null;
        const lastMonthViews = monthly ? Number(monthly.views) || 0 : 0;
        const lastMonthContacts = monthly ? Number(monthly.contacts) || 0 : 0;
        featured.push({
          id: listingId,
          name: l.name || "",
          category: l.category || "",
          location: l.location || "",
          city: l.city || l.location || "",
          views,
          contacts,
          lastMonthViews,
          lastMonthContacts,
        });
      }
    });
    // Only show listings with positive gain (this month >= last month)
    const withPositiveGain = featured.filter(
      (item) => (item.views + item.contacts) >= (item.lastMonthViews + item.lastMonthContacts)
    );
    withPositiveGain.sort((a, b) => (b.views + b.contacts) - (a.views + a.contacts));
    const top5Featured = withPositiveGain.slice(0, 5);
    res.json({ totalViews, totalContacts, totalByPhone, totalByEmail, totalByWhatsapp, top5Featured, lastMonthKey, thisMonthKey });
  } catch (err) {
    console.error("[API] listing-stats-aggregate error:", err);
    res.json({ totalViews: 0, totalContacts: 0, totalByPhone: 0, totalByEmail: 0, totalByWhatsapp: 0, top5Featured: [], lastMonthKey: null, thisMonthKey: null });
  }
});

/* ----------------------- SHARED: APPLY PAYMENT SUCCESS TO LISTING ----------------------- */
/** Applies payment success: updates listing in Firebase and sends confirmation email. Used by Dodo and Gumroad webhooks. */
async function applyPaymentSuccessToListing(listingId, type, plan) {
  const updates = {};
  const now = Date.now();
  let durationDays = 30;
  switch (String(plan)) {
    case "1": durationDays = 30; break;
    case "3": durationDays = 90; break;
    case "6": durationDays = 180; break;
    case "12": durationDays = 365; break;
    default: durationDays = 30;
  }
  const durationMs = durationDays * 24 * 60 * 60 * 1000;

  const snapshot = await db.ref(`listings/${listingId}`).once("value");
  const listing = snapshot.val();
  if (!listing) {
    console.log(`[Payment] Listing ${listingId} not found.`);
    return;
  }

  if (type === "create") {
    updates[`listings/${listingId}/status`] = "verified";
    updates[`listings/${listingId}/createdAt`] = now;
    updates[`listings/${listingId}/expiresAt`] = now + durationMs;
    updates[`listings/${listingId}/plan`] = plan;
    if (String(plan) === "12") {
      const featuredMs = FEATURED_DURATION_DAYS * 24 * 60 * 60 * 1000;
      updates[`listings/${listingId}/featuredUntil`] = now + featuredMs;
    }
  } else if (type === "extend") {
    let currentExpiry = now;
    if (listing.expiresAt && listing.expiresAt > now) currentExpiry = listing.expiresAt;
    updates[`listings/${listingId}/expiresAt`] = currentExpiry + durationMs;
    updates[`listings/${listingId}/status`] = "verified";
    updates[`listings/${listingId}/plan`] = plan;
    if (String(plan) === "12") {
      const featuredMs = FEATURED_DURATION_DAYS * 24 * 60 * 60 * 1000;
      updates[`listings/${listingId}/featuredUntil`] = now + featuredMs;
    }
  }

  await db.ref().update(updates);
  console.log(`[Payment] Listing ${listingId} updated (Type: ${type}, Plan: ${plan})`);

  const userEmail = listing.userEmail || listing.email;
  if (userEmail) {
    const link = listingPublicUrl(listingId);
    const expiryDate = new Date(type === "create" ? now + durationMs : updates[`listings/${listingId}/expiresAt`]).toLocaleDateString();
    const userId = listing.userId;
    const userLang = userId ? await getUserLanguage(userId) : "sq";
    const listingName = listing.name || (userLang === "sq" ? "Shërbimi" : userLang === "mk" ? "Услуга" : "Service");
    let subject = "";
    let text = "";
    if (type === "create") {
      subject = EMAIL_TRANSLATIONS.listing.listing_activated.subject[userLang] || EMAIL_TRANSLATIONS.listing.listing_activated.subject.en;
      text = EMAIL_TRANSLATIONS.listing.listing_activated.text[userLang](listingName, link) || EMAIL_TRANSLATIONS.listing.listing_activated.text.en(listingName, link);
    } else if (type === "extend") {
      subject = EMAIL_TRANSLATIONS.listing.listing_extended.subject[userLang] || EMAIL_TRANSLATIONS.listing.listing_extended.subject.en;
      text = EMAIL_TRANSLATIONS.listing.listing_extended.text[userLang](listingName, expiryDate, link) || EMAIL_TRANSLATIONS.listing.listing_extended.text.en(listingName, expiryDate, link);
    }
    if (subject && text) {
      const emailReason = type === "extend" ? "listing_extended" : "listing_activated";
      const emailResult = await sendEmail(userEmail, subject, text, false, null, emailReason);
      if (emailResult.ok) console.log(`[Payment] ✅ Email sent to ${userEmail}`);
      else if (!emailResult.skipped) console.error(`[Payment] ❌ Email failed for ${userEmail}:`, emailResult.error);
    }
  }
}

/* ----------------------- PAYMENTS (DODO / GUMROAD) ----------------------- */

const PAYMENT_PROVIDER = (process.env.PAYMENT_PROVIDER || "dodo").toLowerCase();

app.post("/api/create-payment", async (req, res) => {
  const { listingId, type, customerEmail, customerName, plan, userId } = req.body; // type: 'create' | 'extend'

  if (!listingId) {
    return res.status(400).json({ error: EMAIL_TRANSLATIONS.errors.missing_listing_id.en });
  }

  // --- FREE TRIAL LOGIC (permanent: first 1-month listing free per account) ---
  // If it's a new listing creation, we have a userId, and selected plan is "1"
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
            const userLang = await getUserLanguage(userId);
            const subject = EMAIL_TRANSLATIONS.listing.free_trial_activated.subject[userLang] || 
                           EMAIL_TRANSLATIONS.listing.free_trial_activated.subject.en;
            const text = EMAIL_TRANSLATIONS.listing.free_trial_activated.text[userLang]() || 
                        EMAIL_TRANSLATIONS.listing.free_trial_activated.text.en();
            
            if (customerEmail) {
                const emailResult = await sendEmail(customerEmail, subject, text, false, null, "free_trial_activated");
                if (emailResult.ok) {
                    console.log(`[Payment] Free trial email sent to ${customerEmail}`);
                } else if (!emailResult.skipped) {
                    console.error(`[Payment] Failed to send free trial email to ${customerEmail}:`, emailResult.error);
                }
            }

            return res.json({ success: true, isFreeTrial: true });
        }
      } catch (err) {
          console.error("[Free Trial] Error checking eligibility:", err);
          // Fall through to normal payment if error
      }
  }
  // ------------------------

  // --- GUMROAD: build checkout URL with custom params ---
  if (PAYMENT_PROVIDER === "gumroad") {
    let permalink;
    switch (String(plan)) {
      case "1": permalink = process.env.GUMROAD_PRODUCT_1_MONTH; break;
      case "3": permalink = process.env.GUMROAD_PRODUCT_3_MONTHS; break;
      case "6": permalink = process.env.GUMROAD_PRODUCT_6_MONTHS; break;
      case "12": permalink = process.env.GUMROAD_PRODUCT_12_MONTHS; break;
      default: permalink = process.env.GUMROAD_PRODUCT_1_MONTH;
    }
    if (!permalink) {
      console.error(`[Gumroad] Product permalink missing for plan ${plan}`);
      return res.status(503).json({ error: EMAIL_TRANSLATIONS.errors.payment_product_not_configured.en });
    }
    const base = "https://gumroad.com/l/" + encodeURIComponent(permalink.replace(/^https?:\/\/[^/]+\/l\//i, "").replace(/\/$/, ""));
    const params = new URLSearchParams({
      wanted: "true",
      listing_id: String(listingId),
      type: String(type || "create"),
      plan: String(plan),
    });
    if (customerEmail) params.set("email", customerEmail);
    const checkoutUrl = `${base}?${params.toString()}`;
    return res.json({ checkoutUrl });
  }

  // --- DODO PAYMENTS ---
  if (!process.env.DODO_PAYMENTS_API_KEY) {
    console.error("DODO_PAYMENTS_API_KEY is missing");
    return res.status(503).json({ error: EMAIL_TRANSLATIONS.errors.payment_service_not_configured.en });
  }

  let PRODUCT_ID;
  switch (String(plan)) {
    case "1": PRODUCT_ID = process.env.DODO_PRODUCT_1_MONTH; break;
    case "3": PRODUCT_ID = process.env.DODO_PRODUCT_3_MONTHS; break;
    case "6": PRODUCT_ID = process.env.DODO_PRODUCT_6_MONTHS; break;
    case "12": PRODUCT_ID = process.env.DODO_PRODUCT_12_MONTHS; break;
    default: PRODUCT_ID = process.env.DODO_PRODUCT_1_MONTH;
  }
  if (!PRODUCT_ID) PRODUCT_ID = process.env.DODO_PAYMENTS_PRODUCT_ID;
  if (!PRODUCT_ID) {
    return res.status(503).json({ error: EMAIL_TRANSLATIONS.errors.payment_product_not_configured.en });
  }

  try {
    const client = dodoClient || new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY,
      environment: process.env.NODE_ENV === 'production' ? 'live_mode' : 'test_mode',
    });
    const session = await client.checkoutSessions.create({
      product_cart: [{ product_id: PRODUCT_ID, quantity: 1 }],
      customer: { email: customerEmail || 'guest@example.com', name: customerName || EMAIL_TRANSLATIONS.errors.guest_user.en },
      metadata: { listingId, type, plan },
      return_url: buildSiteUrl("/", { payment: "success", listingId, type, plan }),
    });
    res.json({ checkoutUrl: session.checkout_url });
  } catch (err) {
    console.error("Dodo Payment Error Full:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: EMAIL_TRANSLATIONS.errors.failed_to_create_payment_session.en + " " + (err.message || "") });
  }
});

app.post("/api/webhook", async (req, res) => {
  try {
    const event = req.body;
    console.log("Webhook received (Dodo):", JSON.stringify(event, null, 2));
    if (event.type === "payment.succeeded" && event.data?.metadata?.listingId) {
      const { listingId, type, plan } = event.data.metadata;
      await applyPaymentSuccessToListing(listingId, type, plan);
    }
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook Error:", err);
    res.status(500).send(EMAIL_TRANSLATIONS.errors.webhook_error.en);
  }
});

/* ----------------------- GUMROAD WEBHOOK ----------------------- */
app.post("/api/webhook/gumroad", async (req, res) => {
  try {
    const secret = process.env.GUMROAD_WEBHOOK_SECRET;
    if (secret && req.rawBody) {
      const sig = req.headers["x-gumroad-signature"];
      const expected = crypto.createHmac("sha256", secret).update(req.rawBody).digest("hex");
      if (sig !== expected) {
        console.warn("[Gumroad] Webhook signature mismatch");
        return res.status(401).send("Invalid signature");
      }
    }
    const body = req.body;
    console.log("Webhook received (Gumroad):", JSON.stringify(body, null, 2));
    if (body.event !== "sale" || !body.sale) {
      return res.json({ received: true });
    }
    const sale = body.sale;
    const custom = sale.custom_fields || sale.custom_properties || {};
    let listingId = custom.listing_id || sale.listing_id;
    let type = custom.type || sale.type || "create";
    let plan = custom.plan || sale.plan;
    if (!plan && sale.product_id != null) {
      const pid = String(sale.product_id);
      const idMap = {};
      if (process.env.GUMROAD_PRODUCT_ID_1_MONTH) idMap[String(process.env.GUMROAD_PRODUCT_ID_1_MONTH)] = "1";
      if (process.env.GUMROAD_PRODUCT_ID_3_MONTHS) idMap[String(process.env.GUMROAD_PRODUCT_ID_3_MONTHS)] = "3";
      if (process.env.GUMROAD_PRODUCT_ID_6_MONTHS) idMap[String(process.env.GUMROAD_PRODUCT_ID_6_MONTHS)] = "6";
      if (process.env.GUMROAD_PRODUCT_ID_12_MONTHS) idMap[String(process.env.GUMROAD_PRODUCT_ID_12_MONTHS)] = "12";
      plan = idMap[pid] || null;
    }
    if (!listingId || !plan) {
      console.log("[Gumroad] Missing listing_id or plan in sale:", { listingId, plan, custom });
      return res.json({ received: true });
    }
    await applyPaymentSuccessToListing(String(listingId), String(type), String(plan));
    res.json({ received: true });
  } catch (err) {
    console.error("[Gumroad] Webhook error:", err);
    res.status(500).send("Webhook error");
  }
});


/* ----------------------- DAILY MAINTENANCE CRON ----------------------- */
// Runs every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
    console.log("[Cron] Running daily maintenance tasks...");
    const now = Date.now();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // For pending/unpaid cleanup only
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
                            const userLang = listing.userId ? await getUserLanguage(listing.userId) : 'sq';
                            const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                            const expiryDate = new Date(listing.expiresAt).toLocaleDateString();
                            const link = myListingsUrl();
                            
                            const subject = EMAIL_TRANSLATIONS.listing.expiring_soon.subject[userLang] || 
                                          EMAIL_TRANSLATIONS.listing.expiring_soon.subject.en;
                            const viewsContacts = { views: listing.views || 0, contacts: listing.contacts || 0 };
                            const text = EMAIL_TRANSLATIONS.listing.expiring_soon.text[userLang](listingName, expiryDate, link, viewsContacts) || 
                                        EMAIL_TRANSLATIONS.listing.expiring_soon.text.en(listingName, expiryDate, link, viewsContacts);

                            const emailResult = await sendEmail(email, subject, text, false, null, "expiring_soon");
                            if (emailResult.ok) {
                                updates[`listings/${id}/expiryWarningSent`] = true;
                                console.log(`[Cron] Sent expiry warning for listing ${id} to ${email}`);
                                warningCount++;
                            } else if (!emailResult.skipped) {
                                console.error(`[Cron] Failed to send expiry warning for listing ${id} to ${email}:`, emailResult.error);
                            }
                            await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
                        }
                    }

                    // B. Pre-Deletion Warning (27 days AFTER expiry, i.e., 3 days before deletion)
                    if (timeSinceExpiry >= TWENTY_SEVEN_DAYS_MS && timeSinceExpiry < THIRTY_DAYS_MS && !listing.preDeletionWarningSent) {
                        const email = listing.userEmail || listing.email;
                        if (email) {
                             const userLang = listing.userId ? await getUserLanguage(listing.userId) : 'sq';
                             const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                             const link = myListingsUrl(); // renew/manage listing
                             
                             const subject = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject[userLang] || 
                                            EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.en;
                             const text = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text[userLang](listingName, link) || 
                                         EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.en(listingName, link);
 
                             const emailResult = await sendEmail(email, subject, text, false, null, "pre_deletion_warning");
                             if (emailResult.ok) {
                                 updates[`listings/${id}/preDeletionWarningSent`] = true;
                                 console.log(`[Cron] Sent pre-deletion warning for listing ${id} to ${email}`);
                                 warningCount++;
                             } else if (!emailResult.skipped) {
                                 console.error(`[Cron] ❌ Failed to send pre-deletion warning for listing ${id} to ${email}:`, emailResult.error);
                             }
                        }
                    }

                    // C. Delete Expired (> 30 days post-expiry)
                    if (timeSinceExpiry >= THIRTY_DAYS_MS) {
                        listingsToDelete.push({ id, email: listing.userEmail || listing.email, name: listing.name, userId: listing.userId, reason: "expired" });
                    }
                }

                // 2. ONLY Pending/Unpaid Listings: delete after 1 week in that status (expired listings have their own deadline)
                if ((listing.status === "unpaid" || listing.status === "pending") && listing.createdAt) {
                    const timeSinceCreation = now - listing.createdAt;
                    const SIX_DAYS_MS = 6 * 24 * 60 * 60 * 1000;
                    
                    // Delete after 7 days
                    if (timeSinceCreation >= ONE_WEEK_MS) {
                         listingsToDelete.push({ id, reason: "pending_stale" });
                    }
                    // Send warning email at 6 days (1 day before deletion)
                    else if (timeSinceCreation >= SIX_DAYS_MS && !listing.pendingDeletionWarningSent) {
                        const email = listing.userEmail || listing.email;
                        if (email && listing.userId) {
                            const userLang = await getUserLanguage(listing.userId);
                            const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                            const link = buildSiteUrl("/mylistings");
                            
                            const subject = EMAIL_TRANSLATIONS.listing.pending_deletion_warning.subject[userLang] || 
                                           EMAIL_TRANSLATIONS.listing.pending_deletion_warning.subject.en;
                            const text = EMAIL_TRANSLATIONS.listing.pending_deletion_warning.text[userLang](listingName, link) || 
                                        EMAIL_TRANSLATIONS.listing.pending_deletion_warning.text.en(listingName, link);
                            
                            const emailResult = await sendEmail(email, subject, text, false, null, "pending_deletion_warning");
                            if (emailResult.ok) {
                                updates[`listings/${id}/pendingDeletionWarningSent`] = true;
                                console.log(`[Cron] Sent pending deletion warning for listing ${id} to ${email}`);
                            } else if (!emailResult.skipped) {
                                console.error(`[Cron] Failed to send pending deletion warning for ${id}:`, emailResult.error);
                            }
                            await new Promise(resolve => setTimeout(resolve, 500));
                        }
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
                await db.ref(`feedback/${item.id}`).remove();
                console.log(`[Cron] Deleted listing ${item.id} (Reason: ${item.reason})`);
                
                // Send Deletion Email (only for verified expired listings)
                if (item.reason === "expired" && item.email && item.userId) {
                    const userLang = await getUserLanguage(item.userId);
                    const listingName = item.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                    const link = buildSiteUrl("/"); // valid entry point (create listing UI is on home)
                    
                    const subject = EMAIL_TRANSLATIONS.listing.expired_deleted.subject[userLang] || 
                                   EMAIL_TRANSLATIONS.listing.expired_deleted.subject.en;
                    const text = EMAIL_TRANSLATIONS.listing.expired_deleted.text[userLang](listingName, link) || 
                                EMAIL_TRANSLATIONS.listing.expired_deleted.text.en(listingName, link);
                    
                    const emailResult = await sendEmail(item.email, subject, text, false, null, "expired_deleted");
                    if (emailResult.ok) {
                        console.log(`[Cron] Sent deletion notification for listing ${item.id} to ${item.email}`);
                    } else if (!emailResult.skipped) {
                        console.error(`[Cron] Failed to send deletion notification for listing ${item.id} to ${item.email}:`, emailResult.error);
                    }
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
                     await db.ref(`feedback/${lid}`).remove();
                }
            });
        }

    } catch (err) {
        console.error("[Cron] Error:", err);
    }
});


/* ----------------------- WEEKLY MARKETING EMAILS ----------------------- */

// TODO: In weekly marketing emails, optionally include random featured/success listing highlight and views/contacts stats
async function sendMarketingEmails() {
  console.log("[Marketing] ========================================");
  console.log("[Marketing] Starting weekly marketing email batch...");
  console.log("[Marketing] Timestamp:", new Date().toISOString());
  console.log("[Marketing] ========================================");
  
  try {
    if (!isFirebaseInitialized) {
      console.error("[Marketing] ❌ Firebase not initialized!");
      throw new Error("Firebase not initialized");
    }

    console.log("[Marketing] Fetching users from database...");
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();

    if (!users) {
      console.log("[Marketing] ⚠️ No users found in database.");
      return { message: EMAIL_TRANSLATIONS.errors.no_users_found.en, sentCount: 0 };
    }

    const userCount = Object.keys(users).length;
    console.log(`[Marketing] Found ${userCount} total users in database`);

    const subscribedUsers = Object.values(users).filter(
      (user) => user.subscribedToMarketing !== false && user.email
    );

    console.log(`[Marketing] Found ${subscribedUsers.length} subscribed users with emails`);

    if (subscribedUsers.length === 0) {
      console.log("[Marketing] ⚠️ No subscribed users found.");
      return { message: EMAIL_TRANSLATIONS.errors.no_subscribed_users.en, sentCount: 0 };
    }

    if (!resend) {
      console.error("[Marketing] ❌ Resend not initialized!");
      throw new Error(EMAIL_TRANSLATIONS.errors.resend_not_configured_error.en);
    }

    console.log("[Marketing] ✅ Resend initialized, proceeding with email send...");

    const verifiedDomain = process.env.RESEND_DOMAIN;

    const websiteUrl = buildSiteUrl("/");

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
      let finalText = (selectedTemplate.texts[userLang] || selectedTemplate.texts["en"])(user.name || user.email?.split('@')[0] || "there");
      let finalFrom = verifiedDomain 
        ? `BizCall MK <notifications@${verifiedDomain}>`
        : "BizCall MK <onboarding@resend.dev>";

      // Check marketing email cooldown before sending
      if (!(await checkMarketingEmailCooldown(finalTo))) {
        console.log(`[Marketing] Skipping ${finalTo} due to marketing email cooldown`);
        results.push({ skipped: true });
        continue;
      }

      console.log(`[Marketing] Sending email to ${finalTo}...`);
      const emailResult = await sendEmail(finalTo, finalSubject, finalText, true, null, "marketing");
      
      if (emailResult.ok) {
        console.log(`[Marketing] ✅ Successfully sent to ${finalTo}. Email ID: ${emailResult.id}`);
        results.push({ data: { id: emailResult.id } });
      } else if (emailResult.skipped) {
        console.log(`[Marketing] Skipped ${finalTo} due to cooldown`);
        results.push({ skipped: true });
      } else {
        console.error(`[Marketing] ❌ Failed to send to ${finalTo}:`, emailResult.error);
        results.push({ error: emailResult.error });
      }

      // Wait 600ms between emails to respect Resend's 2 requests/second rate limit
      await new Promise(resolve => setTimeout(resolve, 600));
    }

    const errors = results.filter((r) => r.error);
    const skipped = results.filter((r) => r.skipped);
    const successful = results.filter((r) => r.data && r.data.id);
    
    console.log("[Marketing] ========================================");
    console.log(`[Marketing] Email batch complete:`);
    console.log(`[Marketing] Total users: ${subscribedUsers.length}`);
    console.log(`[Marketing] ✅ Successful: ${successful.length}`);
    console.log(`[Marketing] ⏭️ Skipped (cooldown): ${skipped.length}`);
    console.log(`[Marketing] ❌ Failed: ${errors.length}`);
    
    if (errors.length > 0) {
      console.error("[Marketing] Failed emails:", errors);
    }
    
    if (successful.length > 0) {
      console.log("[Marketing] Successful email IDs:", successful.map(r => r.data?.id).filter(Boolean));
    }
    
    console.log("[Marketing] ========================================");

    return { ok: true, sentCount: successful.length, skipped: skipped.length, failed: errors.length };
  } catch (err) {
    console.error("[Marketing] ========================================");
    console.error("[Marketing] ❌ BATCH ERROR:");
    console.error("[Marketing] Error message:", err.message);
    console.error("[Marketing] Error stack:", err.stack);
    console.error("[Marketing] ========================================");
    throw err;
  }
}

app.post("/api/admin/send-weekly-marketing", async (req, res) => {
  const { adminKey } = req.body;
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: EMAIL_TRANSLATIONS.errors.unauthorized.en });
  }

  console.log("[API] ========================================");
  console.log("[API] Manual trigger: /api/admin/send-weekly-marketing");
  console.log("[API] Timestamp:", new Date().toISOString());
  console.log("[API] ========================================");

  try {
    const result = await sendMarketingEmails();
    console.log(`[API] ✅ Marketing emails sent: ${result.sentCount}`);
    console.log(`[API] Skipped: ${result.skipped || 0}, Failed: ${result.failed || 0}`);
    console.log(`[API] ========================================`);
    res.json(result);
  } catch (err) {
    console.error("[API] ❌ Marketing email error:", err);
    console.error("[API] Error message:", err.message);
    console.error("[API] Error stack:", err.stack);
    console.log(`[API] ========================================`);
    res.status(500).json({ 
      error: EMAIL_TRANSLATIONS.errors.failed_to_send_emails.en,
      details: err.message 
    });
  }
});

// Immediate test endpoint - no cron delay
app.post("/api/admin/test-marketing-now", async (req, res) => {
  const { adminKey } = req.body;
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  console.log("[API] ========================================");
  console.log("[API] 🚀 IMMEDIATE TEST: /api/admin/test-marketing-now");
  console.log("[API] Timestamp:", new Date().toISOString());
  console.log("[API] ========================================");

  try {
    const result = await sendMarketingEmails();
    console.log(`[API] ✅ Test complete: ${result.sentCount} emails sent`);
    console.log(`[API] Skipped: ${result.skipped || 0}, Failed: ${result.failed || 0}`);
    console.log(`[API] ========================================`);
    res.json({ 
      success: true, 
      ...result,
      message: "Test marketing emails sent immediately"
    });
  } catch (err) {
    console.error("[API] ❌ Test failed:", err);
    console.error("[API] Error message:", err.message);
    console.error("[API] Error stack:", err.stack);
    console.log(`[API] ========================================`);
    res.status(500).json({ 
      error: err.message,
      stack: err.stack
    });
  }
});

/* ----------------------- CRON SCHEDULER ----------------------- */

// Schedule the marketing emails to run every Tuesday at 7:15 PM CET.
// Cron expression: minute hour dayOfMonth month dayOfWeek
// 15 18 * * 2 = At 18:15 UTC (7:15 PM CET in winter, 8:15 PM CEST in summer) on Tuesday
// Note: North Macedonia uses CET (UTC+1) in winter and CEST (UTC+2) in summer
// This will send at 7:15 PM during winter (CET) and 8:15 PM during summer (CEST)
const cronExpression = "15 18 * * 2";

console.log(`[Cron] Marketing emails scheduled for every Tuesday at 7:15 PM CET / 18:15 UTC (Cron: ${cronExpression})`);
console.log(`[Cron] Note: During summer (CEST), emails will send at 8:15 PM local time due to daylight saving.`);

cron.schedule(cronExpression, async () => {
  console.log("[Cron] ========================================");
  console.log("[Cron] 🕐 REGULAR SCHEDULE: Triggering weekly marketing emails...");
  console.log("[Cron] Timestamp:", new Date().toISOString());
  console.log("[Cron] ========================================");
  try {
    const result = await sendMarketingEmails();
    console.log(`[Cron] ✅ Successfully sent ${result.sentCount} marketing emails.`);
    console.log(`[Cron] Skipped: ${result.skipped || 0}, Failed: ${result.failed || 0}`);
    console.log(`[Cron] ========================================`);
  } catch (err) {
    console.error("[Cron] ❌ Failed to send marketing emails:", err);
    console.error("[Cron] Error message:", err.message);
    console.error("[Cron] Error stack:", err.stack);
    console.log(`[Cron] ========================================`);
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
        const link = myListingsUrl(); // renew/manage listing
        const expiryDate = new Date(listing.expiresAt).toLocaleDateString();
        
        // Get user language preference
        const userLang = listing.userId ? await getUserLanguage(listing.userId) : 'sq';
        const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
        
        const subject = EMAIL_TRANSLATIONS.listing.expiring_soon.subject[userLang] || 
                       EMAIL_TRANSLATIONS.listing.expiring_soon.subject.en;
        const viewsContacts = { views: listing.views || 0, contacts: listing.contacts || 0 };
        const text = EMAIL_TRANSLATIONS.listing.expiring_soon.text[userLang](listingName, expiryDate, link, viewsContacts) || 
                    EMAIL_TRANSLATIONS.listing.expiring_soon.text.en(listingName, expiryDate, link, viewsContacts);
        
        const emailResult = await sendEmail(userEmail, subject, text, false, null, "expiring_soon");
        if (emailResult.ok) {
            console.log(`[Cron] Sent expiry warning for listing ${id} to ${userEmail}`);
            count++;
        } else if (!emailResult.skipped) {
            console.error(`[Cron] Failed to send expiry warning for listing ${id} to ${userEmail}:`, emailResult.error);
        }
        
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
// 3. ONLY pending/unpaid listings: delete after 1 week in that status (expired have their own deadline)
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
                const userLang = listing.userId ? await getUserLanguage(listing.userId) : 'sq';
                const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                const link = myListingsUrl(); // renew/manage listing
                
                const subject = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject[userLang] || 
                               EMAIL_TRANSLATIONS.listing.pre_deletion_warning.subject.en;
                const text = EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text[userLang](listingName, link) || 
                            EMAIL_TRANSLATIONS.listing.pre_deletion_warning.text.en(listingName, link);

                const emailResult = await sendEmail(userEmail, subject, text, false, null, "pre_deletion_warning");
                if (emailResult.ok) {
                    await db.ref(`listings/${id}`).update({ preDeletionWarningSent: true });
                    console.log(`[Cron] ✅ Sent pre-deletion warning for ${id} to ${userEmail}. Email ID: ${emailResult.id}`);
                    warningCount++;
                } else if (!emailResult.skipped) {
                    console.error(`[Cron] ❌ Failed to send pre-deletion warning for ${id} to ${userEmail}:`, emailResult.error);
                }
             }
          }

          // B. Clear feedback after a week of expiry (but before deletion)
          if (daysSinceExpiry >= 7 && daysSinceExpiry < 30) {
             try {
               await db.ref(`feedback/${id}`).remove();
               console.log(`[Cron] Cleared feedback for expired listing ${id} (>${Math.floor(daysSinceExpiry)} days past expiry).`);
             } catch (err) {
               console.error(`[Cron] Failed to clear feedback for expired listing ${id}:`, err);
             }
          }

          // C. Delete Expired Listings (> 30 days post-expiry)
          if (daysSinceExpiry >= 30) {
             const userEmail = listing.userEmail || listing.email;
             // Send notification
             if (userEmail && listing.userId) {
                 const userLang = await getUserLanguage(listing.userId);
                 const listingName = listing.name || (userLang === 'sq' ? "Shërbimi" : userLang === 'mk' ? "Услуга" : "Service");
                 const link = buildSiteUrl("/"); // valid entry point to create a new listing
                 
                 const subject = EMAIL_TRANSLATIONS.listing.expired_deleted.subject[userLang] || 
                                EMAIL_TRANSLATIONS.listing.expired_deleted.subject.en;
                 const text = EMAIL_TRANSLATIONS.listing.expired_deleted.text[userLang](listingName, link) || 
                             EMAIL_TRANSLATIONS.listing.expired_deleted.text.en(listingName, link);
                 
                 const emailResult = await sendEmail(userEmail, subject, text, false, null, "expired_deleted");
                 if (emailResult.ok) {
                     console.log(`[Cron] Sent deletion notification for ${id} to ${userEmail}`);
                 } else if (!emailResult.skipped) {
                     console.error(`[Cron] Failed to send deletion notification for ${id} to ${userEmail}:`, emailResult.error);
                 }
                 await new Promise(resolve => setTimeout(resolve, 500));
             }
             
             // Delete listing and its feedback
             await db.ref(`listings/${id}`).remove();
             await db.ref(`feedback/${id}`).remove();
             console.log(`[Cron] Deleted expired listing ${id}`);
             expiredDeletedCount++;
          }
       }

       // 2. ONLY Pending/Unpaid Listings: delete after 1 week in that status (expired listings have their own deadline)
       if ((listing.status === "unpaid" || listing.status === "pending") && listing.createdAt) {
           const daysSinceCreation = (now - listing.createdAt) / dayMs;
           if (daysSinceCreation >= 7) {
               await db.ref(`listings/${id}`).remove();
               await db.ref(`feedback/${id}`).remove();
               console.log(`[Cron] Deleted pending/unpaid listing ${id} (over 1 week in status)`);
               pendingDeletedCount++;
           }
       }
    }
    console.log(`[Cron] Maintenance complete: ${warningCount} warnings, ${expiredDeletedCount} expired deletions, ${pendingDeletedCount} pending deletions.`);

  } catch (err) {
     console.error("[Cron] Maintenance error:", err);
  }
});

// Runs on the 1st of each month at 00:05 — snapshot each listing's views/contacts for last month (for line chart comparison)
function getLastMonthKey() {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
cron.schedule("5 0 1 * *", async () => {
  console.log("[Cron] Running monthly stats snapshot…");
  if (!isFirebaseInitialized) return;
  try {
    const lastMonthKey = getLastMonthKey();
    const snapshot = await db.ref("listings").once("value");
    if (!snapshot.exists()) return;
    const listings = snapshot.val();
    const updates = {};
    for (const [id, listing] of Object.entries(listings)) {
      const views = Number(listing.views) || 0;
      const contacts = Number(listing.contacts) || 0;
      updates[`listings/${id}/monthlyStats/${lastMonthKey}`] = { views, contacts };
    }
    await db.ref().update(updates);
    console.log(`[Cron] Monthly snapshot saved for ${Object.keys(listings).length} listings (${lastMonthKey}).`);
  } catch (err) {
    console.error("[Cron] Monthly snapshot error:", err);
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
        // Try to detect language from Accept-Language header or default to English
        const acceptLang = req.headers['accept-language'] || 'en';
        const lang = acceptLang.includes('sq') ? 'sq' : acceptLang.includes('mk') ? 'mk' : 'en';
        
        return res.status(503).send(`
          <html>
            <head><title>${EMAIL_TRANSLATIONS.maintenance.site_building[lang] || EMAIL_TRANSLATIONS.maintenance.site_building.en}</title></head>
            <body style="font-family: sans-serif; text-align: center; padding: 50px;">
              <h1>${EMAIL_TRANSLATIONS.maintenance.site_building[lang] || EMAIL_TRANSLATIONS.maintenance.site_building.en}</h1>
              <p>${EMAIL_TRANSLATIONS.maintenance.building_message[lang] || EMAIL_TRANSLATIONS.maintenance.building_message.en}</p>
              <p style="color: #666; font-size: 0.9em;">${EMAIL_TRANSLATIONS.maintenance.build_artifacts_not_found[lang] || EMAIL_TRANSLATIONS.maintenance.build_artifacts_not_found.en}</p>
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
         const acceptLang = req.headers['accept-language'] || 'en';
         const lang = acceptLang.includes('sq') ? 'sq' : acceptLang.includes('mk') ? 'mk' : 'en';
         return res.status(503).send(EMAIL_TRANSLATIONS.errors.server_entry_missing[lang] || EMAIL_TRANSLATIONS.errors.server_entry_missing.en);
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
    console.log(`\n\n`);
    console.log(`╔══════════════════════════════════════════════════════════════╗`);
    console.log(`║              🚀 SERVER STARTED SUCCESSFULLY                   ║`);
    console.log(`╚══════════════════════════════════════════════════════════════╝`);
    console.log(`[Server] Port: ${PORT}`);
    console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`[Server] Timestamp: ${new Date().toISOString()}`);
    console.log(`[Server] Resend initialized: ${!!resend}`);
    console.log(`[Server] Firebase initialized: ${isFirebaseInitialized}`);
    console.log(`[Server] DodoPayments initialized: ${!!dodoClient}`);
    console.log(`\n[Server] Available endpoints:`);
    console.log(`[Server]   - POST /api/admin/test-marketing-now (with adminKey)`);
    console.log(`[Server]   - POST /api/admin/send-weekly-marketing (with adminKey)`);
    console.log(`[Server]   - GET /api/email-status`);
    console.log(`╚══════════════════════════════════════════════════════════════╝`);
    console.log(`\n\n`);
    console.log(`Server running on port ${PORT}`);
  });
}
