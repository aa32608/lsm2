/* eslint-env node */
/* global process, Buffer */
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";
import admin from "firebase-admin";
import cors from "cors";
import { Resend } from "resend";

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

    const { data, error } = await resend.emails.send({
      from: "BizCall MK <onboarding@resend.dev>", // Replace with your verified domain
      to: [to],
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

app.post("/api/admin/send-weekly-marketing", async (req, res) => {
  const { adminKey } = req.body;
  
  // Basic security check
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();

    if (!users) {
      return res.status(200).json({ message: "No users found" });
    }

    const subscribedUsers = Object.values(users).filter(
      (user) => user.subscribedToMarketing && user.email
    );

    if (subscribedUsers.length === 0) {
      return res.status(200).json({ message: "No subscribed users" });
    }

    if (!resend) {
      throw new Error("Resend is not configured. Please set RESEND_API_KEY.");
    }

    const emailPromises = subscribedUsers.map(async (user) => {
      return resend.emails.send({
        from: "BizCall MK <onboarding@resend.dev>", // Replace with your verified domain
        to: [user.email],
        subject: "Your Weekly Update from BizCall MK!",
        text: `Hi ${user.name || "there"},\n\nCheck out the latest listings on BizCall MK!\n\nBest,\nThe Team`,
      });
    });

    const results = await Promise.all(emailPromises);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
      console.error("Some Resend emails failed:", errors);
    }

    res.json({ ok: true, sentCount: subscribedUsers.length - errors.length });
  } catch (err) {
    console.error("Weekly email error:", err);
    res.status(500).json({ error: "Failed to send emails" });
  }
});

/* -------------------------- START SERVER -------------------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
