/* eslint-env node */
/* global process, Buffer */
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";
import admin from "firebase-admin";
import cors from "cors";
import { Resend } from "resend";
import cron from "node-cron";

dotenv.config();

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
      remove: async () => {}
    })
  })
};

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
  const env = (process.env.PAYPAL_ENVIRONMENT || "live").toLowerCase().trim();
  const clientId = (process.env.PAYPAL_CLIENT_ID || "").trim();
  const clientSecret = (process.env.PAYPAL_CLIENT_SECRET || "").trim();

  console.log(`[PayPal] [${new Date().toISOString()}] Generating access token for env: ${env}...`);
  console.log(`[PayPal] Using Client ID: ${clientId.substring(0, 10)}...`);
  if (!clientId || !clientSecret) {
    console.error("[PayPal] ERROR: PAYPAL_CLIENT_ID or PAYPAL_CLIENT_SECRET is missing from environment variables!");
    throw new Error("PayPal credentials missing");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const url = env === "sandbox"
    ? "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    : "https://api-m.paypal.com/v1/oauth2/token";

  try {
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
      console.error("[PayPal] Token Error Response:", JSON.stringify(data, null, 2));
      throw new Error(`PayPal Token Error: ${data.error_description || data.error || response.statusText}`);
    }
    console.log("[PayPal] Access token generated successfully.");
    return data.access_token;
  } catch (err) {
    console.error("[PayPal] generateAccessToken exception:", err);
    throw err;
  }
}

async function generateClientToken() {
  const env = (process.env.PAYPAL_ENVIRONMENT || "live").toLowerCase().trim();
  const clientId = (process.env.PAYPAL_CLIENT_ID || "").trim();
  const clientSecret = (process.env.PAYPAL_CLIENT_SECRET || "").trim();

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials missing");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const url = env === "sandbox"
    ? "https://api-m.sandbox.paypal.com/v1/oauth2/token"
    : "https://api-m.paypal.com/v1/oauth2/token";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials&response_type=client_token",
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("[PayPal] Client Token Gen Error:", JSON.stringify(data, null, 2));
      throw new Error(`PayPal Token Error: ${data.error_description || data.error}`);
    }
    return data.access_token;
  } catch (err) {
    console.error("[PayPal] generateClientToken exception:", err);
    throw err;
  }
}

/* ----------------------- GET PAYPAL CONFIG ---------------- */

app.get("/api/paypal/config", (req, res) => {
  const clientId = (process.env.PAYPAL_CLIENT_ID || "").trim();
  res.json({ clientId });
});

/* ----------------------- GET PAYPAL TOKEN (for v6 SDK) ---------------- */

app.get("/api/paypal/token", async (req, res) => {
  try {
    const clientToken = await generateClientToken();
    res.json({ accessToken: clientToken });
  } catch (err) {
    console.error("[PayPal] Token Endpoint Error:", err);
    res.status(500).json({ error: "Failed to generate token" });
  }
});

/* ----------------------- CREATE PAYPAL ORDER ------------------------ */

app.post("/api/paypal/create-order", async (req, res) => {
  const { listingId, amount, action, returnUrl, cancelUrl } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [PayPal] Create Order:`, { listingId, amount, action });

  try {
    const accessToken = await generateAccessToken();
    const env = (process.env.PAYPAL_ENVIRONMENT || "live").toLowerCase().trim();
    const url = env === "sandbox"
      ? "https://api-m.sandbox.paypal.com/v2/checkout/orders"
      : "https://api-m.paypal.com/v2/checkout/orders";

    const formattedAmount = parseFloat(amount).toFixed(2);

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: `BC-${listingId}-${Date.now()}`.substring(0, 50),
          amount: {
            currency_code: "EUR",
            value: formattedAmount,
          }
        },
      ],
      application_context: {
        brand_name: "BizCall MK",
        landing_page: "BILLING",
        user_action: "PAY_NOW",
        shipping_preference: "NO_SHIPPING",
        return_url: returnUrl || "https://bizcall.vercel.app",
        cancel_url: cancelUrl || "https://bizcall.vercel.app"
      }
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("[PayPal] Create Order Failed:", JSON.stringify(data, null, 2));
      throw new Error(data.message || "PayPal order creation failed");
    }

    res.json({ orderID: data.id });
  } catch (err) {
    console.error("[PayPal] Create Order Exception:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ----------------------- CAPTURE PAYPAL ORDER ----------------------- */

app.post("/api/paypal/capture", async (req, res) => {
  const { orderID } = req.body;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [PayPal] Capture Order: ${orderID}`);

  try {
    const accessToken = await generateAccessToken();
    const env = (process.env.PAYPAL_ENVIRONMENT || "live").toLowerCase().trim();
    const url = env === "sandbox"
      ? `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`
      : `https://api-m.paypal.com/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("[PayPal] Capture Failed:", JSON.stringify(data, null, 2));
      
      // Handle declined payments gracefully
      if (data.details && data.details[0]?.issue === "INSTRUMENT_DECLINED") {
        return res.status(400).json({ 
          ok: false, 
          recoverable: true, 
          error: "Payment declined. Please try a different card." 
        });
      }
      throw new Error(data.message || "Capture failed");
    }

    console.log(`[PayPal] Capture Success: ${orderID}`);
    res.json({ ok: true, data });
  } catch (err) {
    console.error("[PayPal] Capture Exception:", err);
    res.status(500).json({ error: err.message });
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
        subjects: {
          en: "🔥 Don't Miss Out! New Local Services Just Added on BizCall MK",
          sq: "🔥 Mos e humbisni! Shërbime të reja lokale sapo u shtuan në BizCall MK",
          mk: "🔥 Не пропуштајте! Нови локални услуги штотуку се додадени на BizCall MK"
        },
        texts: {
          en: (name) => `Hello ${name || "there"},\n\nLooking for the best local experts in your area? 🧐\n\nNew opportunities and trusted services are being added to BizCall MK every single day. Whether you need a quick home repair, a reliable mechanic, or the best catering in town, we've got you covered.\n\nOur community is growing fast, and we don't want you to be the last to know. Find exactly what you need in seconds and support your local community at the same time.\n\n👉 Discover what's new today: ${websiteUrl}\n\nTo your success,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nPo kërkoni ekspertët më të mirë lokalë në zonën tuaj? 🧐\n\nMundësi të reja dhe shërbime të besueshme po shtohen në BizCall MK çdo ditë. Pavarësisht nëse keni nevojë për një riparim të shpejtë në shtëpi, një mekanik të besueshëm apo kateringun më të mirë në qytet, ne jemi këtu për ju.\n\nKomuniteti ynë po rritet me shpejtësi dhe nuk duam që ju të jeni të fundit që e merrni vesh. Gjeni saktësisht atë që ju nevojitet në pak sekonda dhe mbështetni komunitetin tuaj lokal në të njëjtën kohë.\n\n👉 Zbuloni çfarë ka të re sot: ${websiteUrl}\n\nMe respekt,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nГи барате најдобрите локални експерти во вашата област? 🧐\n\nНови можности и доверливи услуги се додаваат на BizCall MK секој ден. Без разлика дали ви треба брза поправка дома, сигурен механичар или најдобриот кетеринг во градот, ние сме тука за вас.\n\nНашата заедница расте брзо и не сакаме да бидете последните што ќе дознаат. Најдете го точно она што ви треба за неколку секунди и поддржете ја вашата локална заедница во исто време.\n\n👉 Откријте што е ново денес: ${websiteUrl}\n\nСо почит,\nТимот на BizCall`
        }
      },
      {
        id: "community_connection_cta",
        subjects: {
          en: "🤝 Your Community is Calling! Connect with Pros on BizCall MK",
          sq: "🤝 Komuniteti juaj po ju thërret! Lidhuni me profesionistët në BizCall MK",
          mk: "🤝 Вашата заедnica ве повикува! Поврзете се со професионалци на BizCall MK"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nWhy search for hours when the best pros are right in your neighborhood? 🏠\n\nAt BizCall MK, we believe in the power of community. We've built a platform where you can find verified local talent for any task, big or small. From tech support to health services, your neighbors are here to help.\n\nStop scrolling and start connecting. Save time, save money, and get the job done right by someone you can trust.\n\n🔗 Browse the community map now: ${websiteUrl}\n\nBest regards,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nPse të kërkoni me orë të tëra kur profesionistët më të mirë janë pikërisht në lagjen tuaj? 🏠\n\nNë BizCall MK, ne besojmë në fuqinë e komunitetit. Ne kemi ndërtuar një platformë ku mund të gjeni talente lokale të verifikuara për çdo detyrë, të madhe apo të vogël. Nga mbështetja teknike te shërbimet shëndetësore, fqinjët tuaj janë këtu për t'ju ndihmuar.\n\nMos kërkoni më tej dhe filloni të lidheni. Kurseni kohë, kurseni para dhe kryejeni punën siç duhet nga dikush që mund t'i besoni.\n\n🔗 Shfletoni hartën e komunitetit tani: ${websiteUrl}\n\nMe respekt,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nЗошто да барате со часови кога најдобрите професионалци се токму во вашето соседство? 🏠\n\nВо BizCall MK, веруваме во моќта на заедницата. Изградивме платформа каде што можете да најдете проверени локални таленти за која било задача, голема или мала. Од техничка поддршка до здравствени услуги, вашите соседи се тука да ви помогнат.\n\nПрестанете да барате бесконечно и почнете да се поврзувате. Заштедете време, заштедете пари и завршете ја работата правилно со некој на кој можете да му верувате.\n\n🔗 Прелистајте ја мапата на заедницата сега: ${websiteUrl}\n\nСо почит,\nТимот на BizCall`
        }
      },
      {
        id: "growth_marketing_cta",
        subjects: {
          en: "📈 Boost Your Local Business Today on BizCall MK",
          sq: "📈 Rritni biznesin tuaj lokal sot në BizCall MK",
          mk: "📈 Подобрете го вашиот локален бизнис денес на BizCall MK"
        },
        texts: {
          en: (name) => `Hello ${name || "there"},\n\nIs your service getting the visibility it deserves? 🚀\n\nThousands of local users are searching for services like yours on BizCall MK every week. If you haven't updated your listing lately, you might be missing out on valuable leads and new customers.\n\nTake 2 minutes to refresh your profile, add new photos, or post a featured listing to stay at the top of the search results. Your next big client is just one click away!\n\n✨ Manage your listings here: ${websiteUrl}\n\nTo your growth,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nA po merr shërbimi juaj dukshmërinë që meriton? 🚀\n\nMijëra përdorues lokalë kërkojnë shërbime si tuajat në BizCall MK çdo javë. Nëse nuk e keni përditësuar listimin tuaj së fundmi, mund të jeni duke humbur klientë të rëndësishëm dhe mundësi të reja.\n\nMerrni 2 minuta për të rifreskuar profilin tuaj, shtoni foto të reja ose postoni një listim të veçuar për të qëndruar në krye të rezultateve të kërkimit. Klienti juaj i radhës është vetëm një klikim larg!\n\n✨ Menaxhoni listimet tuaja këtu: ${websiteUrl}\n\nPër rritjen tuaj,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nДали вашата услуга ја добива видливоста што ја заслужува? 🚀\n\nИлјадници локални корисници бараат услуги како вашата на BizCall MK секоја недела. Ако не сте го ажурирале вашиот оглас неодамна, можеби пропуштате вредни контакти и нови клиенти.\n\nОдвојте 2 минути за да го освежите вашиот профил, додадете нови фотографии или објавете истакнат оглас за да останете на врвот на резултатите од пребарувањето. Вашиот следен голем клиент е на само еден клик подалеку!\n\n✨ Менаџирајте ги вашите огласи тука: ${websiteUrl}\n\nЗа вашиот раст,\nТимот на BizCall`
        }
      },
      {
        id: "trust_verified_cta",
        subjects: {
          en: "💎 Quality You Can Trust: Verified Pros on BizCall MK",
          sq: "💎 Cilësi që mund t'i besoni: Profesionistë të verifikuar në BizCall MK",
          mk: "💎 Квалитет на кој можете да му верувате: Проверени професионалци на BizCall MK"
        },
        texts: {
          en: (name) => `Hi ${name || "there"},\n\nTired of unreliable services? We hear you. 🤝\n\nThat's why BizCall MK is dedicated to connecting you with the highest-rated, most trusted local experts in North Macedonia. Our platform makes it easy to read reviews, compare services, and find someone who actually delivers on their promises.\n\nDon't settle for less. Choose quality, choose local, and get the peace of mind you deserve for your next project.\n\n🎯 Find a trusted pro today: ${websiteUrl}\n\nStay safe,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nJeni lodhur nga shërbimet jo të besueshme? Ne ju kuptojmë. 🤝\n\nKjo është arsyeja pse BizCall MK i është përkushtuar lidhjes tuaj me ekspertët lokalë më të vlerësuar dhe më të besuar në Maqedoninë e Veriut. Platforma jonë e bën të lehtë leximin e vlerësimeve, krahasimin e shërbimeve dhe gjetjen e dikujt që me të vërtetë i mban premtimet e veta.\n\nMos u kënaqni me pak. Zgjidhni cilësinë, zgjidhni lokalet dhe fitoni qetësinë që meritoni për projektin tuaj të radhës.\n\n🎯 Gjeni një profesionist të besuar sot: ${websiteUrl}\n\nGjithë të mirat,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nУморни сте од несигурни услуги? Ве разбираме. 🤝\n\nЗатоа BizCall MK е посветен на тоа да ве поврзе со најдобро оценетите и најдоверливите локални експерти во Северна Македонија. Нашата платформа го олеснува читањето на рецензии, споредувањето услуги и наоѓањето на некој кој навистина ги исполнува своите ветувања.\n\nНе се задоволувајте со помалку. Изберете квалитет, изберете локално и добијте го мирот што го заслужувате за вашиот следен проект.\n\n🎯 Најдете доверлив професионалец денес: ${websiteUrl}\n\nСо почит,\nТимот на BizCall`
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



/* -------------------------- START SERVER -------------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});