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
  const { listingId, type, customerEmail, customerName, plan } = req.body; // type: 'create' | 'extend'

  if (!listingId) {
    return res.status(400).json({ error: "Missing listingId" });
  }

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
          en: (name) => `Hello ${name || "there"},\n\nIs your service getting the visibility it deserves? 🚀\n\nThousands of local users are searching for services like yours on BizCall MK every week. If you haven't updated your listing lately, you might be missing out on valuable leads and new customers.\n\nTake 2 minutes to refresh your profile, add new photos, or update your description to stay at the top of the search results. Your next big client is just one click away!\n\n✨ Manage your listings here: ${websiteUrl}\n\nTo your growth,\nThe BizCall Team`,
          sq: (name) => `Përshëndetje ${name || "ju"},\n\nA po merr shërbimi juaj dukshmërinë që meriton? 🚀\n\nMijëra përdorues lokalë kërkojnë shërbime si tuajat në BizCall MK çdo javë. Nëse nuk e keni përditësuar listimin tuaj së fundmi, mund të jeni duke humbur klientë të rëndësishëm dhe mundësi të reja.\n\nMerrni 2 minuta për të rifreskuar profilin tuaj, shtoni foto të reja ose përditësoni përshkrimin tuaj për të qëndruar në krye të rezultateve të kërkimit. Klienti juaj i radhës është vetëm një klikim larg!\n\n✨ Menaxhoni listimet tuaja këtu: ${websiteUrl}\n\nPër rritjen tuaj,\nEkipi i BizCall`,
          mk: (name) => `Здраво ${name || "таму"},\n\nДали вашата услуга ја добива видливоста што ја заслужува? 🚀\n\nИлјадници локални корисници бараат услуги како вашата на BizCall MK секоја недела. Ако не сте го ажурирале вашиот оглас неодамна, можеби пропуштате вредни контакти и нови клиенти.\n\nОдвојте 2 минути за да го освежите вашиот профил, додадете нови фотографии или ажурирајте го вашиот опис за да останете на врвот на резултатите од пребарувањето. Вашиот следен голем клиент е на само еден клик подалеку!\n\n✨ Менаџирајте ги вашите огласи тука: ${websiteUrl}\n\nЗа вашиот раст,\nТимот на BizCall`
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
        
        // Trilingual Subject
        const subject = `BizCall MK: Action Required - Listing Expiring Soon / Veprim Kërkohet - Shpallja Skadon Së Shpejti / Потребна е Акција - Огласот Истекува Наскоро`;
        
        // Trilingual Text
        const text = `Hello / Përshëndetje / Здраво,\n\nYour listing "${listingName}" will expire in 7 days (${expiryDate}).\nShpallja juaj "${listingName}" skadon në 7 ditë (${expiryDate}).\nВашиот оглас "${listingName}" истекува за 7 дена (${expiryDate}).\n\nTo keep your listing active and maintain your visibility, please extend it now:\nPër ta mbajtur shpalljen aktive dhe për të ruajtur dukshmërinë tuaj, ju lutemi zgjateni atë tani:\nЗа да го задржите вашиот оглас активен и да ја одржите вашата видливост, ве молиме продолжете го сега:\n\n👉 ${link}\n\nIf you do not renew, your listing will be removed from search results.\nNëse nuk e rinovoni, shpallja juaj do të hiqet nga rezultatet e kërkimit.\nАко не го обновите, вашиот оглас ќе биде отстранет од резултатите од пребарувањето.\n\nThe BizCall Team`;
        
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
