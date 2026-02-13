# Freemius integration (BizCall MK)

How to wire Freemius so listing payments and webhooks work. The backend generates checkout links and matches completed payments to listings using the buyer’s email and plan.

**Backend base URL (for webhooks):** e.g. `https://lsm-wozo.onrender.com`  
**Webhook URL:** `https://YOUR_BACKEND_URL/api/webhook/freemius`

---

## What we need from you (Freemius Dashboard)

1. **Product ID** – One Freemius product that has 4 plans (1, 3, 6, 12 months).
2. **Plan IDs** – The Freemius plan ID for each duration (1 month, 3 months, 6 months, 12 months).
3. **Product Secret Key** – Used to verify webhook signatures.

**Where to find these:**

- **Developer Dashboard:** [dashboard.freemius.com](https://dashboard.freemius.com) → select your **product**.
- **Product ID:** In the product’s URL or on **Settings** / **Overview** (numeric ID).
- **Plan IDs:** **Plans** → click each plan (1m, 3m, 6m, 12m); the plan ID is in the URL or on the plan page.
- **Secret Key:** **Settings** → **API** (or **Keys**) → **Product Secret Key** (not the public key).

---

## 1. Backend env (e.g. Render)

Set these in your backend environment:

| Variable | Description |
|----------|-------------|
| **PAYMENT_PROVIDER** | `freemius` |
| **FREEMIUS_PRODUCT_ID** | Your single product’s numeric ID |
| **FREEMIUS_PLAN_1_MONTH** | Plan ID for 1‑month plan |
| **FREEMIUS_PLAN_3_MONTHS** | Plan ID for 3‑month plan |
| **FREEMIUS_PLAN_6_MONTHS** | Plan ID for 6‑month plan |
| **FREEMIUS_PLAN_12_MONTHS** | Plan ID for 12‑month plan |
| **FREEMIUS_SECRET_KEY** | Product Secret Key (for webhook signature verification) |

---

## 2. Create 4 plans in Freemius

In **Plans**, create (or use existing) plans that represent:

- 1 month
- 3 months  
- 6 months
- 12 months

Set pricing and billing (one-off or subscription) as you want. The backend only needs the **plan IDs** to build checkout URLs and to map `payment.created` webhooks to the correct listing.

---

## 3. Add a webhook in Freemius

1. In the Developer Dashboard go to **Integrations** → **Webhooks**.
2. Click **Add Webhook**.
3. **Callback URL:** `https://YOUR_BACKEND_URL/api/webhook/freemius`  
   Example: `https://lsm-wozo.onrender.com/api/webhook/freemius`
4. **Events:** Select at least **Payment** → **payment.created** (or “All events” for debugging).
5. Save and activate the webhook.

The backend will only process `payment.created`; other events are acknowledged and ignored.

---

## 4. Redirect after purchase (optional)

So users land back on your site after paying:

1. In Freemius go to **Plans** → **Customization** (or the product’s customization / checkout settings).
2. Enable **“Redirect Checkout to a custom URL”** (or similar).
3. Set the URL to: `https://www.bizcall.mk/mylistings?payment=success`

Listing activation is done by the webhook; the redirect is only for UX.

---

## 5. How it works

- **Create payment:** When a user clicks pay, the backend returns a Freemius hosted checkout URL for the right product/plan and stores a **pending payment** in Firebase: `pendingPayments/{listingId}` with `email`, `plan`, and `type`.
- **After purchase:** Freemius sends a `payment.created` webhook. The backend verifies the `x-signature` header (HMAC SHA256 of raw body with `FREEMIUS_SECRET_KEY`), then finds a pending payment with the same buyer email and plan, activates that listing, and removes the pending record.
- **Security:** Only the listing that matches the paying user’s email and plan is updated; purchaser email is checked against the listing owner.

---

## 6. Checklist

- [ ] One Freemius product with 4 plans (1 / 3 / 6 / 12 months).
- [ ] Env set: `PAYMENT_PROVIDER=freemius`, `FREEMIUS_PRODUCT_ID`, `FREEMIUS_PLAN_*`, `FREEMIUS_SECRET_KEY`.
- [ ] Webhook added in Freemius: URL = `https://YOUR_BACKEND/api/webhook/freemius`, event `payment.created`.
- [ ] Optional: Redirect URL set to `https://www.bizcall.mk/mylistings?payment=success`.
- [ ] Deploy backend and test a payment; check logs for `[Freemius]` and `[Payment]` to confirm webhook and listing update.
