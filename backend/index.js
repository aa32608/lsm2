/* eslint-env node */
/* global process, Buffer */
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";
import cors from "cors";
import { Resend } from "resend";
import cron from "node-cron";

dotenv.config();

// Initialize Resend lazily to prevent crash if API key is missing during startup
let resend;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("WARNING: RESEND_API_KEY is not set. Email functionality will be disabled.");
}

/* -------------------- FIREBASE SETUP (Render-friendly) -------------------- */

// We now load the full service account JSON from an environment variable
if (!process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  console.error("FIREBASE_SERVICE_ACCOUNT_JSON is not set in env!");
  process.exit(1);
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
} catch (err) {
  console.error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", err);
  process.exit(1);
}

if (!process.env.FIREBASE_DATABASE_URL) {
  console.error("FIREBASE_DATABASE_URL is not set in env!");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const db = admin.database();

/* --------------------------- EXPRESS SETUP --------------------------- */

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lsm-bojr3c63z-artins-projects-8d0a28db.vercel.app",
      "https://bizcall.vercel.app",
      "https://lsm-wozo.onrender.com",
      "https://lsmtetovo.vercel.app",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());

/* --------------------------- PAYPAL HELPER --------------------------- */

async function generateAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const url =
    process.env.PAYPAL_ENVIRONMENT === "sandbox"
      ? "https://api-m.sandbox.paypal.com/v1/oauth2/token"
      : "https://api-m.paypal.com/v1/oauth2/token";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!response.ok) {
    console.error("PayPal access token error:", data);
    throw new Error("Failed to get PayPal access token");
  }

  return data.access_token;
}

/* ----------------------- CREATE PAYPAL ORDER ------------------------ */

app.post("/api/paypal/create-order", async (req, res) => {
  const { listingId, amount, action } = req.body;
  console.log("Creating order for", listingId, "action:", action, "amount:", amount);

  if (!listingId || !amount) {
    return res.status(400).json({ error: "listingId and amount required" });
  }

  try {
    const accessToken = await generateAccessToken();

    const orderResponse = await fetch(
      process.env.PAYPAL_ENVIRONMENT === "sandbox"
        ? "https://api-m.sandbox.paypal.com/v2/checkout/orders"
        : "https://api-m.paypal.com/v2/checkout/orders",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              reference_id: listingId,
              amount: {
                currency_code: "EUR",
                value: String(amount),
              },
              description: "Digital Service Listing Payment",
            },
          ],
          application_context: {
            brand_name: "BizCall MK",
            landing_page: "NO_PREFERENCE",
            user_action: "PAY_NOW",
            shipping_preference: "NO_SHIPPING",
            locale: "mk-MK",
          },
        }),
      }
    );

    const order = await orderResponse.json();
    if (!order.id) {
      console.error("PayPal order creation failed:", order);
      await db.ref(`listings/${listingId}`).update({
        status: "expired",
      });
      return res.status(500).json({ error: order });
    }

    res.json({ orderID: order.id });
  } catch (err) {
    console.error("Create order error:", err);
    try {
      await db.ref(`listings/${req.body.listingId}`).update({
        status: "expired",
      });
    } catch (innerErr) {
      console.error("Failed to update Firebase on error:", innerErr);
    }
    res.status(500).json({ error: "Failed to create PayPal order" });
  }
});

/* ----------------------- CAPTURE PAYPAL ORDER ----------------------- */

app.post("/api/paypal/capture", async (req, res) => {
  const { orderID, listingId, action } = req.body;
  console.log("Capturing order:", orderID, "listingId:", listingId, "action:", action);

  if (!orderID || !listingId) {
    console.error("❌ Missing orderID or listingId in request body. Received:", {
      orderID: orderID ? "present" : "MISSING",
      listingId: listingId ? "present" : "MISSING",
      body: req.body 
    });
    return res.status(400).json({ 
      error: "orderID and listingId required",
      received: { orderID: !!orderID, listingId: !!listingId, action }
    });
  }

  try {
    const accessToken = await generateAccessToken();

    // Step 1: Attempt to capture directly (Optimization: Skip redundant order check)
    const captureResponse = await fetch(
      `${
        process.env.PAYPAL_ENVIRONMENT === "sandbox"
          ? "https://api-m.sandbox.paypal.com"
          : "https://api-m.paypal.com"
      }/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await captureResponse.json();

    // Handle successful completion
    if (captureData.status === "COMPLETED") {
      const amountPaid =
        captureData.purchase_units?.[0]?.payments?.captures?.[0]?.amount?.value || 0;

      await db.ref(`listings/${listingId}`).update({
        pricePaid: Number(amountPaid),
        status: "verified",
      });

      console.log("✅ Capture successful for", listingId);
      return res.json({ ok: true, status: captureData.status });
    }

    // Handle "Order already captured" (Step 2: Fallback for duplicate requests)
    if (
      captureData.name === "UNPROCESSABLE_ENTITY" &&
      captureData.details?.some((d) => d?.issue === "ORDER_ALREADY_CAPTURED")
    ) {
      console.log("⚠️ Order already captured, verifying status...");
      const orderCheck = await fetch(
        `${
          process.env.PAYPAL_ENVIRONMENT === "sandbox"
            ? "https://api-m.sandbox.paypal.com"
            : "https://api-m.paypal.com"
        }/v2/checkout/orders/${orderID}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const orderData = await orderCheck.json();
      
      if (orderData.status === "COMPLETED") {
        await db.ref(`listings/${listingId}`).update({ status: "verified" });
        return res.json({ ok: true, status: "ALREADY_CAPTURED" });
      }
    }

    // Handle "Instrument Declined" (Recoverable)
    if (
      captureData?.name === "UNPROCESSABLE_ENTITY" &&
      captureData.details?.some((d) => d?.issue === "INSTRUMENT_DECLINED")
    ) {
      console.warn("⚠️ Instrument declined for", listingId);
      const redirectLink =
        (captureData.links || []).find(
          (l) => l.rel === "redirect" || l.rel === "payer-action" || l.rel === "approve"
        )?.href || null;
      
      return res.status(400).json({
        ok: false,
        recoverable: true,
        issue: "INSTRUMENT_DECLINED",
        redirect: redirectLink,
        message: "The instrument was declined. Payer must choose another funding source.",
      });
    }

    // All other failures
    console.error("❌ Capture failed with status:", captureData.status, captureData);
    await db.ref(`listings/${listingId}`).update({ status: "expired" });
    return res.status(500).json({ error: captureData });

  } catch (err) {
    console.error("❌ Internal capture error:", err);
    try {
      await db.ref(`listings/${listingId}`).update({ status: "expired" });
    } catch (innerErr) {
      console.error("Failed to update Firebase after capture error:", innerErr);
    }
    res.status(500).json({ error: "PayPal capture failed" });
  }
});

/* ----------------------- VERIFY ORDER (OPTIONAL) ----------------------- */

app.get("/api/paypal/verify-order/:orderId/:listingId", async (req, res) => {
  const { orderId, listingId } = req.params;
  try {
    const accessToken = await generateAccessToken();
    const response = await fetch(
      `${
        process.env.PAYPAL_ENVIRONMENT === "sandbox"
          ? "https://api-m.sandbox.paypal.com"
          : "https://api-m.paypal.com"
      }/v2/checkout/orders/${orderId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await response.json();

    if (data.status === "COMPLETED") {
      await db.ref(`listings/${listingId}`).update({ status: "verified" });
      return res.json({ ok: true });
    }

    res.status(400).json({ error: "Order not completed", status: data.status });
  } catch (err) {
    console.error("Order verification failed", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

/* ----------------------- EMAIL NOTIFICATIONS ----------------------- */

app.post("/api/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    if (!resend) {
      throw new Error("Resend is not configured. Please set RESEND_API_KEY.");
    }

    // If we are in "testing" mode (no custom domain), Resend ONLY allows sending to your own email.
    // If you want to allow users to email EACH OTHER, you MUST verify a domain on Resend.
    
    // Check if we have a verified domain configured in environment variables
    const verifiedDomain = process.env.RESEND_DOMAIN; // e.g. "bizcall.mk"
    const isTestingMode = !verifiedDomain;
    
    let finalTo = to;
    let finalFrom = isTestingMode 
      ? "BizCall MK <onboarding@resend.dev>" 
      : `BizCall MK <notifications@${verifiedDomain}>`;

    if (isTestingMode) {
      // In testing, we can ONLY send to the account owner (artinalimi69@gmail.com).
      // We'll redirect all emails to the owner so you can at least see them working.
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
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.json({ ok: true, id: data.id });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ error: "Internal server error" });
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
      (user) => user.subscribedToMarketing && user.email
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

    const templates = [
      {
        id: "weekly_roundup",
        subjects: {
          en: "Your Weekly Roundup from BizCall MK!",
          sq: "Përmbledhja juaj javore nga BizCall MK!",
          mk: "Вашиот неделен преглед од BizCall MK!"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nNew opportunities are waiting for you! Check out the latest listings on BizCall MK and see what's new in your community this week.\n\nBest,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nMundësi të reja po ju presin! Shikoni listimet më të fundit në BizCall MK dhe shihni çfarë ka të re në komunitetin tuaj këtë javë.\n\nMe respekt,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nВе чекаат нови можности! Проверете ги најновите огласи на BizCall MK и видете што е ново во вашата заедница оваа недела.\n\nСо почит,\nТимот на BizCall`
        }
      },
      {
        id: "community_hub",
        subjects: {
          en: "Stay Connected with Your Local Community",
          sq: "Qëndroni të lidhur me komunitetin tuaj lokal",
          mk: "Останете поврзани со вашата локална заедница"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nBizCall MK is more than just listings—it's about people. Connect with trusted local professionals and support your neighbors today.\n\nWarmly,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nBizCall MK është më shumë se thjesht listime—është për njerëzit. Lidhuni me profesionistë lokalë të besuar dhe mbështesni fqinjët tuaj sot.\n\nMe ngроhtësi,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nBizCall MK е повеќе од само огласи—станува збор за луѓето. Поврзете се со доверливи локални професионалци и поддржете ги вашите соседи денес.\n\nСрдечно,\nТимот на BizCall`
        }
      },
      {
        id: "local_impact",
        subjects: {
          en: "Make an Impact: Support Local Services",
          sq: "Bëni një ndikim: Mbështetni shërbimet lokale",
          mk: "Направете влијание: Поддржете ги локалните услуги"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nEvery time you choose a local service on BizCall MK, you're helping our community grow. Discover top-rated local experts near you!\n\nBest regards,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nSa herë që zgjidhni një shërbim lokal në BizCall MK, ju po ndihmoni komunitetin tonë të rritet. Zbuloni ekspertët lokalë më të vlerësuar pranë jush!\n\nMe respekt,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nСекој пат кога избирате локална услуга на BizCall MK, му помагате на нашата заедница да расте. Откријте најдобро оценети локални експерти во ваша близина!\n\nСо почит,\nТимот на BizCall`
        }
      },
      {
        id: "visibility_boost",
        subjects: {
          en: "Get Noticed on BizCall MK!",
          sq: "Bëhuni të dukshëm në BizCall MK!",
          mk: "Бидете забележани на BizCall MK!"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nIs your service getting the attention it deserves? Update your listing or post a new one today to reach more people in your area.\n\nCheers,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nA po merr shërbimi juaj vëmendjen që meriton? Përditëсонi listimin tuaj ose postoni një të ri sot për të arritur më shumë njerëz në zonën tuaj.\n\nGëzuar,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nДали вашата услуга го добива вниманието што го заслужува? Ажурирајте го вашиот оглас или објавете нов денес за да допрете до повеќе луѓе во вашата област.\n\nПоздрав,\nТимот на BizCall`
        }
      }
    ];

    const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];

    const emailPromises = subscribedUsers.map(async (user) => {
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

      return resend.emails.send({
        from: finalFrom, 
        to: [finalTo],
        subject: finalSubject,
        text: finalText,
      });
    });

    const results = await Promise.all(emailPromises);
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

// Schedule the marketing emails to run 5 minutes from now and then every week at this time.
// Since the exact current server time might vary, we'll calculate the cron expression dynamically.
const now = new Date();
const targetDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes from now

const minute = targetDate.getMinutes();
const hour = targetDate.getHours();
const dayOfWeek = targetDate.getDay(); // 0-6 (Sun-Sat)

// Cron expression: minute hour dayOfMonth month dayOfWeek
// To run every week at this exact time:
const cronExpression = `${minute} ${hour} * * ${dayOfWeek}`;

console.log(`[Cron] Marketing emails scheduled to start at ${targetDate.toLocaleTimeString()} and repeat every week (Cron: ${cronExpression})`);

cron.schedule(cronExpression, async () => {
  console.log("[Cron] Triggering weekly marketing emails...");
  try {
    const result = await sendMarketingEmails();
    console.log(`[Cron] Successfully sent ${result.sentCount} marketing emails.`);
  } catch (err) {
    console.error("[Cron] Failed to send marketing emails:", err);
  }
});

/* -------------------------- START SERVER -------------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
