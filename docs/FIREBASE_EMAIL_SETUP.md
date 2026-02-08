# Firebase Auth Email: Deliverability & Custom Domain

## Reducing spam and improving deliverability

1. **Customize the sender name (Firebase Console)**  
   - Go to [Firebase Console](https://console.firebase.google.com) → your project → **Authentication** → **Templates**.  
   - Edit **Email address verification**, **Password reset**, and any other templates.  
   - Set a clear **From name** (e.g. `BizCall` or `BizCall North Macedonia`) so users recognize the sender.  
   - Use a short, clear subject and body. Avoid spammy wording and excessive links.

2. **Improve domain reputation**  
   - Firebase sends from `noreply@<project-id>.firebaseapp.com`. You cannot change this domain for built-in Auth emails.  
   - To improve trust:  
     - Use a custom **action URL** in the template (e.g. your site’s verification/reset page) so links point to your domain.  
     - Ensure your app’s domain is added in **Authentication → Settings → Authorized domains**.

3. **Optional: Send from your own domain (custom “from” address)**  
   Firebase does **not** let you set a custom “from” address for the built-in verification and password-reset emails. To send from your own domain (e.g. `noreply@bizcall.mk`):

   - Use **Firebase Extensions** or your own backend:  
     - Install an extension like **Trigger Email from Firebase** (e.g. with Resend, SendGrid, or Mailgun).  
     - In your app, after calling `sendEmailVerification()` or `sendPasswordResetEmail()`, you can *also* send a custom email via the extension from your domain, or replace the built-in flow with a custom one that only uses your SMTP/API.  
   - Or implement a **custom backend**:  
     - On your server, call Firebase Admin to create the verification/reset link, then send the email yourself via your SMTP or email API (Resend, SendGrid, etc.) from `noreply@yourdomain.com`.  
   - In all cases, configure **SPF**, **DKIM**, and optionally **DMARC** for your domain so providers don’t treat your emails as spam.

## Summary

| Goal | What to do |
|------|------------|
| Fewer emails in spam | Set a clear From name and good copy in Firebase Templates; use action URLs to your domain. |
| Emails “from” your domain | Use an extension (e.g. Trigger Email) or your own backend to send verification/reset emails from your domain; set up SPF/DKIM. |
| Change “from” address for built-in Firebase emails | Not supported; you must send those emails yourself (extension or backend) to use your domain. |
