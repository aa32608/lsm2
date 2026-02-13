# Gumroad integration (BizCall MK)

How to wire Gumroad so listing payments and webhooks work.

**Backend URL (webhooks):** `https://lsm-wozo.onrender.com`  
**Product permalinks (set in env):** 1m=`vkkqnu`, 3m=`nwavhh`, 6m=`gzkhsp`, 12m=`cqyrwu`

---

## 1. Backend env (e.g. Render)

Set these in your backend environment:

- **PAYMENT_PROVIDER** = `gumroad`
- **GUMROAD_PRODUCT_1_MONTH** = `vkkqnu`
- **GUMROAD_PRODUCT_3_MONTHS** = `nwavhh`
- **GUMROAD_PRODUCT_6_MONTHS** = `gzkhsp`
- **GUMROAD_PRODUCT_12_MONTHS** = `cqyrwu`
- **GUMROAD_WEBHOOK_SECRET** = your Gumroad application secret (for webhook signature verification)

Permalink: from a product URL like `https://gumroad.com/l/AbCdEf` the permalink is `AbCdEf`.

Optional (only if Gumroad does not return custom fields in the webhook): **GUMROAD_PRODUCT_ID_1_MONTH**, **GUMROAD_PRODUCT_ID_3_MONTHS**, **GUMROAD_PRODUCT_ID_6_MONTHS**, **GUMROAD_PRODUCT_ID_12_MONTHS** (Gumroad numeric product IDs for plan mapping).

---

## 2. Custom fields in Gumroad (required for webhooks)

Add these three custom fields to each of your 4 products (1m, 3m, 6m, 12m). Names must match exactly.

- **listing_id** – we pass our listing ID in the checkout URL; Gumroad should return it in the sale webhook.
- **type** – we send `create` or `extend`.
- **plan** – we send `1`, `3`, `6`, or `12`.

In Gumroad: edit product, find Custom fields / Advanced, add the three fields. You can make them hidden so buyers do not see them.

---

## 3. Subscribe to sales (webhook) via Gumroad API

Gumroad has no “Webhooks” page; you subscribe via the API once.

1. In Gumroad: **Settings → Advanced** → create an **Application** (if not done) → **Generate access token**.
2. Run this once (replace `YOUR_ACCESS_TOKEN` with your token):

```bash
curl -X PUT "https://api.gumroad.com/v2/resource_subscriptions" \
  -d "access_token=YOUR_ACCESS_TOKEN" \
  -d "resource_name=sale" \
  -d "post_url=https://lsm-wozo.onrender.com/api/webhook/gumroad"
```

3. Set **GUMROAD_WEBHOOK_SECRET** in your backend env to your Gumroad **application secret** (for signature verification).

---

## 4. Redirect URL (post-purchase)

So users land back on My Listings after paying, set a redirect URL in Gumroad. **Gumroad does not document this in their help; the exact location can vary.**

**Where to look (exact locations to try):**

1. **Dashboard → Products** → click the product name (e.g. 1‑month plan).
2. On the **product edit** page, check:
   - **Right column or bottom:** look for **"Redirect"**, **"Redirect URL"**, **"Thank you page"**, **"Success URL"** or **"Post-purchase redirect"**.
   - **"..." or "More" menu** on the product page (top right).
   - **Configure** / **Advanced** / **Checkout** section if the product page has tabs or sections.
3. **Settings (gear)** → **Checkout** or **Default thank you page** (account-level).
4. If you use **Overlay** on your site: there is no product-level redirect; redirect is done with JavaScript (see [Gumroad overlay redirect](https://stackoverflow.com/questions/57433503/how-to-use-gumroads-listener-to-redirect-to-url-from-their-overlay)).

**URL to set (when you find the field):**  
`https://www.bizcall.mk/mylistings?payment=success`

Activation is done by the webhook; the redirect is for UX only. If you still can’t find the option, ask Gumroad support: “Where do I set a custom redirect URL after a customer completes purchase?”

---

## 5. Checklist

- Create 4 products (1 / 3 / 6 / 12 months).
- Add custom fields `listing_id`, `type`, `plan` to each product.
- Set env: PAYMENT_PROVIDER=gumroad, GUMROAD_PRODUCT_*_MONTH (permalinks), GUMROAD_WEBHOOK_SECRET.
- Run the curl above to subscribe to sales; set GUMROAD_WEBHOOK_SECRET in backend env.
- Deploy and test a payment; check backend logs for [Gumroad] and [Payment] to confirm webhook and listing update.
