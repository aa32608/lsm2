# Firebase Trigger Email extension with Resend

This guide walks you through installing the **Trigger Email** extension and configuring it to send emails via **Resend** (so emails come from your domain, e.g. `noreply@bizcall.mk`).

---

## 1. Resend setup

1. **Create a Resend account**  
   [resend.com](https://resend.com) → Sign up.

2. **Verify your domain**  
   - In Resend: **Domains** → **Add Domain** → enter your domain (e.g. `bizcall.mk`).  
   - Add the DNS records Resend shows (SPF, DKIM, etc.) at your DNS provider.  
   - Wait until the domain shows as verified.

3. **Create an API key**  
   - In Resend: **API Keys** → **Create API Key**.  
   - Name it (e.g. `Firebase Trigger Email`), choose **Sending access**.  
   - Copy the key (starts with `re_`). You’ll use it in step 3 below.

---

## 2. Firebase: enable Firestore (if needed)

The Trigger Email extension uses **Cloud Firestore** (not Realtime Database).

1. Open [Firebase Console](https://console.firebase.google.com) → your project.  
2. **Build** → **Firestore Database** → **Create database** (choose production or test mode; you can tighten rules later).  
3. Pick a region and finish.

---

## 3. Install the Trigger Email extension

1. In Firebase Console: **Build** → **Extensions** → **Explore extensions** (or open [Install Trigger Email](https://console.firebase.google.com/project/_/extensions/install?ref=firebase/firestore-send-email)).  
2. Find **“Trigger Email from Firestore”** (`firebase/firestore-send-email`) → **Install**.  
3. Select your Firebase project and follow the prompts.  
4. When asked for configuration, use the values below.

---

## 4. Extension configuration (Resend)

During installation you’ll be asked for:

| Parameter | Value |
|-----------|--------|
| **SMTP connection URI** | `smtps://resend:YOUR_API_KEY@smtp.resend.com:465` |
| **Email documents collection** | `mail` (or e.g. `email` – you’ll use this name in code) |
| **Default FROM address** | Your verified Resend address, e.g. `BizCall <noreply@bizcall.mk>` |
| **Default REPLY-TO address** | (optional) e.g. `support@bizcall.mk` |
| **Users collection** | (optional) Leave blank unless you use `toUids` |

Replace `YOUR_API_KEY` with your Resend API key (the one starting with `re_`).

- If the key contains special characters (e.g. `+`, `=`, `/`), **URL-encode** it in the URI (e.g. `+` → `%2B`, `=` → `%3D`).  
- Or use **Google Secret Manager**: store the key as a secret and reference it in the extension if your Firebase project is on the Blaze plan (see Firebase Extensions docs).

---

## 5. Firestore security rules (email collection)

Restrict who can create documents in the email collection so only your backend (or trusted Cloud Functions) can send mail. Don’t allow arbitrary client writes.

Example for a collection named `mail`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /mail/{docId} {
      // Only allow create; no read/update/delete by clients.
      // In production, allow create only from your backend/Cloud Functions
      // (e.g. use Firebase Admin SDK from a secure environment).
      allow create: if false;  // Clients cannot create. Your server/Cloud Functions will use Admin SDK.
      allow read, update, delete: if false;
    }
  }
}
```

Then **send emails only from a trusted environment** (e.g. Cloud Functions or your Node backend with Admin SDK), not from the client, by writing documents to `mail` (see step 6).

---

## 6. Sending an email (from backend / Cloud Functions)

The extension sends an email when a **new document** is added to the collection you configured (e.g. `mail`).

**From a Node backend (with Firebase Admin SDK):**

```javascript
const admin = require('firebase-admin');
// Ensure default app is initialized (e.g. with service account).

await admin.firestore().collection('mail').add({
  to: 'user@example.com',
  message: {
    subject: 'Verify your email',
    html: '<p>Click the link to verify: <a href="https://yoursite.com/verify?token=...">Verify</a></p>',
    text: 'Click the link to verify: https://yoursite.com/verify?token=...'
  },
  from: 'BizCall <noreply@bizcall.mk>'  // optional; uses default if omitted
});
```

**From a Cloud Function (triggered by Auth or HTTP):**

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.sendVerificationEmail = functions.https.onCall(async (data, context) => {
  const { to, subject, html, text } = data;
  await admin.firestore().collection('mail').add({
    to,
    message: { subject, html, text }
  });
  return { ok: true };
});
```

The extension will pick up the new document and send the email via Resend.

---

## 7. Using this for Auth verification / password reset

Firebase’s built-in **verification** and **password reset** emails cannot be sent through this extension directly; they are sent by Firebase Auth. To send those **from your Resend domain** instead:

1. **Custom Auth flow (recommended)**  
   - **Verification:** In your backend/Cloud Function, use Firebase Admin to create a custom email verification link (e.g. with `auth.generateEmailVerificationLink(email)`), then add a document to `mail` with that link in the body. The extension sends it via Resend from your domain.  
   - **Password reset:** Similarly, use `auth.generatePasswordResetLink(email)` in the backend, then write to `mail` with a custom reset email.  
   - In the client, don’t call `sendEmailVerification()` or `sendPasswordResetEmail()`; instead call your backend/Cloud Function, which writes to `mail`.

2. **Keep Firebase’s built-in emails**  
   You can keep using Firebase’s verification/reset and only use the Trigger Email extension for other emails (e.g. notifications, marketing). In that case you don’t change Auth flows; you just add code that writes to `mail` whenever you want to send something via Resend.

---

## 8. Checklist

- [ ] Resend account created, domain verified, API key created  
- [ ] Firestore enabled in Firebase project  
- [ ] Trigger Email extension installed with Resend SMTP URI  
- [ ] Default FROM set to your Resend address (e.g. `noreply@bizcall.mk`)  
- [ ] Firestore rules on `mail` (or your collection) prevent client writes; only backend/Cloud Functions write  
- [ ] Backend or Cloud Function writes to `mail` to send emails; test with a simple doc

For more on the extension: [Firebase Trigger Email docs](https://firebase.google.com/docs/extensions/official/firestore-send-email).  
For Resend SMTP: [Resend SMTP](https://resend.com/docs/send-with-smtp).

---

## Troubleshooting: "Some extension resources might not be deployed"

That message is a **summary**; the real cause is in the **error text above it** in the Firebase Console. Scroll up (or expand the error section) and read the first red error line.

### 1. Billing plan (Blaze required)

Extensions that use **Cloud Functions** (including Trigger Email) require the **Blaze (pay-as-you-go)** plan.

- Go to [Firebase Console](https://console.firebase.google.com) → your project → **⚙️ Project settings** → **Usage and billing**.
- If you're on the **Spark (free)** plan, upgrade to **Blaze**. You only pay when you exceed free tier (e.g. 2M invocations/month for Functions). No credit card needed to *install*; you may need to add a card to enable Blaze.
- Retry installing the extension after upgrading.

### 2. Required APIs

Make sure these are enabled for your Google Cloud project (same project as Firebase):

- **Cloud Functions API**
- **Cloud Firestore API**
- **Secret Manager API** (used if the extension stores the SMTP password as a secret)

Enable them: [Google Cloud Console](https://console.cloud.google.com) → your project → **APIs & Services** → **Enabled APIs** → enable any that are missing.

### 3. SMTP connection URI

- **Format:** `smtps://resend:YOUR_API_KEY@smtp.resend.com:465`  
  Use your Resend API key in place of `YOUR_API_KEY`. No spaces or line breaks.
- **Special characters:** If the API key contains `+`, `=`, `/`, `@`, etc., **URL-encode** them:
  - `+` → `%2B`
  - `=` → `%3D`
  - `/` → `%2F`
  - `@` → `%40`
- **Quotes:** Do not wrap the URI in quotes in the Firebase UI.
- If you prefer not to put the key in the URI, check whether the extension supports storing the password in **Google Secret Manager** (Blaze required) and reference the secret name instead.

### 4. Firestore and region

- **Firestore** must be created (Build → Firestore Database → Create database).
- The extension deploys a **Cloud Function**; its region is often chosen during install. If you see a region/quotas error, try another region (e.g. `us-central1` or `europe-west1`) if the installer allows it.

### 5. Clean retry

If the install partially succeeded:

1. **Extensions** → find **Trigger Email** → **⋮** → **Uninstall** (remove any partial install).
2. Fix the cause (e.g. Blaze, APIs, or SMTP URI).
3. Install again with the correct configuration.

After a failed install, check **Build** → **Functions**: if you see new functions named like `ext-...-processQueue` or similar, they may have been created but failed to deploy. Uninstalling the extension removes them so you can start clean.
