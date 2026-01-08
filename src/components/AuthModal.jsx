import React, { useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { 
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  sendEmailVerification,
  linkWithCredential,
  EmailAuthProvider,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { ref as dbRef, set } from 'firebase/database';
import TabBar from './TabBar';
import { validateEmail, validatePhone } from '../utils/validators';
import { normalizePhoneForStorage } from '../utils/helpers';
import { countryCodes } from '../utils/constants';

const AuthModal = ({ 
  showAuthModal, 
  setShowAuthModal, 
  authMode, 
  setAuthMode,
  t, 
  showMessage 
}) => {
  const [authTab, setAuthTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [countryCode, setCountryCode] = useState("+389");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);

  const authModeTabs = [
    { id: "login", label: t("login") || "Login" },
    { id: "signup", label: t("signup") || "Register" },
  ];

  const authMethodTabs = [
    { id: "email", label: t("emailTab") || "Email", icon: "✉️" },
    { id: "phone", label: t("signInWithPhone") || "Phone", icon: "📱" },
  ];

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
    setConfirmationResult(null);
    if (mode === "login") setAuthTab("email");
  };

  const handleAuthTabChange = (tab) => {
    setAuthTab(tab);
    setConfirmationResult(null);
  };

  const getSignupRecaptcha = () => {
    if (window.signupRecaptchaVerifier) return window.signupRecaptchaVerifier;
    window.signupRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-signup",
      { size: "invisible" }
    );
    return window.signupRecaptchaVerifier;
  };

  const handleEmailLogin = async () => {
    if (!validateEmail(email)) return showMessage(t("enterValidEmail"), "error");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage(t("signedIn"), "success");
      setShowAuthModal(false);
      setEmail("");
      setPassword("");
    } catch (e) {
      showMessage(e.message, "error");
    }
  };

  const handlePhoneLogin = async () => {
    const rest = (phoneNumber || "").replace(/\D/g, "");
    if (!rest || rest.length < 5 || rest.length > 12)
      return showMessage(t("enterValidPhone"), "error");

    const fullPhone = countryCode + rest;
    if (!validatePhone(fullPhone))
      return showMessage(t("enterValidPhone"), "error");

    setPhoneLoading(true);
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" }
        );
      }
      const result = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      showMessage(t("codeSent"), "success");
    } catch (err) {
      showMessage(err.message, "error");
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult || !verificationCode.trim())
      return showMessage(t("enterCode"), "error");
    if (!/^\d{6}$/.test(verificationCode.trim()))
      return showMessage(t("invalidCode"), "error");

    setPhoneLoading(true);
    try {
      await confirmationResult.confirm(verificationCode);
      showMessage(t("signedIn"), "success");
      setShowAuthModal(false);
      setPhoneNumber("");
      setVerificationCode("");
      setConfirmationResult(null);
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) return showMessage(t("enterValidEmail"), "error");
    if (password.length < 6) return showMessage(t("passwordTooShort"), "error");
    if (passwordRepeat !== password) return showMessage(t("passwordsDontMatch"), "error");

    const raw = phoneNumber.replace(/\D/g, "");
    if (!raw || raw.length < 5) return showMessage(t("enterValidPhone"), "error");

    const fullPhone = countryCode + raw;
    if (!validatePhone(fullPhone)) return showMessage(t("enterValidPhone"), "error");

    setPhoneLoading(true);
    try {
      const verifier = getSignupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, verifier);
      setConfirmationResult(confirmation);
      showMessage(t("codeSent"), "success");
    } catch (err) {
      window.signupRecaptchaVerifier?.clear?.();
      window.signupRecaptchaVerifier = null;
      showMessage(err.message, "error");
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleSignupVerify = async () => {
    if (!/^\d{6}$/.test(verificationCode)) return showMessage(t("invalidCode"), "error");

    setPhoneLoading(true);
    try {
      const result = await confirmationResult.confirm(verificationCode);
      const user = result.user;

      const emailCred = EmailAuthProvider.credential(email, password);
      await linkWithCredential(user, emailCred);
      await sendEmailVerification(user);

      await set(dbRef(db, `users/${user.uid}`), {
        email: user.email,
        phone: normalizePhoneForStorage(countryCode + phoneNumber, countryCodes),
        createdAt: Date.now(),
      });

      showMessage(t("signupSuccess"), "success");
      setAuthMode("verify");
      setConfirmationResult(null);
      setVerificationCode("");
    } catch (err) {
      showMessage(err.message, "error");
    } finally {
      setPhoneLoading(false);
    }
  };

  if (!showAuthModal) return null;

  return (
    <Motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAuthModal(false)}
    >
      <Motion.div
        className="modal auth-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="modal-header">
          <h3 className="modal-title">
            {authMode === "signup"
              ? t("createAccount") || "Create your BizCall account"
              : authTab === "email"
              ? t("emailLoginSignup")
              : t("verifyPhone")}
          </h3>
          <button className="icon-btn" onClick={() => setShowAuthModal(false)}>
            ✕
          </button>
        </div>

        <TabBar
          items={authModeTabs}
          value={authMode}
          onChange={handleAuthModeChange}
          className="auth-mode-tabs"
          size="compact"
          fullWidth
        />

        {authMode === "login" && (
          <>
            <TabBar
              items={authMethodTabs}
              value={authTab}
              onChange={handleAuthTabChange}
              className="auth-tabs"
              size="compact"
              fullWidth
            />

            {authTab === "email" ? (
              <div className="modal-body auth-body auth-body-card">
                <p className="auth-subtitle">{t("loginSubtitle")}</p>
                
                <div className="auth-field-group">
                  <span className="field-label">{t("email")}</span>
                  <input
                    className="input"
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="auth-field-group">
                  <span className="field-label">{t("password")}</span>
                  <input
                    className="input"
                    type="password"
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="auth-actions">
                  <button className="btn full-width" onClick={handleEmailLogin}>
                    {t("login")}
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-body auth-body auth-body-card">
                <p className="auth-subtitle">{t("phoneLoginSubtitle")}</p>

                <div className="auth-field-group">
                  <span className="field-label">{t("phoneNumber")}</span>
                  <div className="phone-input-group">
                    <select
                      className="select phone-country"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.name} ({c.code})
                        </option>
                      ))}
                    </select>
                    <input
                      className="input phone-number"
                      type="tel"
                      placeholder={t("phoneNumber")}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                      maxLength="12"
                      inputMode="numeric"
                    />
                  </div>
                </div>

                {!confirmationResult ? (
                  <div className="auth-actions">
                    <button
                      className="btn full-width"
                      onClick={handlePhoneLogin}
                      disabled={phoneLoading}
                    >
                      {phoneLoading ? "Sending..." : t("sendLink")}
                    </button>
                  </div>
                ) : (
                  <div className="auth-actions">
                    <div className="auth-field-group">
                      <span className="field-label">{t("enterCode")}</span>
                      <input
                        className="input"
                        type="text"
                        placeholder={t("enterCode")}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                        maxLength="6"
                        inputMode="numeric"
                      />
                    </div>

                    <button
                      className="btn full-width"
                      onClick={handleVerifyCode}
                      disabled={phoneLoading}
                    >
                      {phoneLoading ? "Verifying..." : t("verifyPhone")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {authMode === "signup" && (
          <div className="modal-body auth-body auth-body-card">
            <p className="auth-subtitle">{t("signupSubtitle")}</p>

            <div className="auth-field-group">
              <span className="field-label">{t("email")}</span>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="auth-field-group">
              <span className="field-label">{t("password")}</span>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="auth-field-group">
              <span className="field-label">{t("repeatNewPassword") || "Repeat password"}</span>
              <input
                className="input"
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
            </div>

            <div className="auth-field-group">
              <span className="field-label">{t("phoneNumber")}</span>
              <div className="phone-input-group">
                <select
                  className="select phone-country"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name} ({c.code})
                    </option>
                  ))}
                </select>
                <input
                  className="input phone-number"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  maxLength="12"
                  inputMode="numeric"
                />
              </div>
            </div>

            {!confirmationResult && (
              <button
                className="btn full-width"
                disabled={phoneLoading}
                onClick={handleSignup}
              >
                {t("createAccount") || "Create account"}
              </button>
            )}

            {confirmationResult && (
              <>
                <div className="auth-field-group" style={{ marginTop: 12 }}>
                  <span className="field-label">{t("enterCode")}</span>
                  <input
                    className="input"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                    maxLength="6"
                  />
                </div>

                <button
                  className="btn full-width"
                  disabled={phoneLoading}
                  onClick={handleSignupVerify}
                >
                  {t("verifyPhone") || "Verify & finish signup"}
                </button>
              </>
            )}

            <div id="recaptcha-signup" className="recaptcha" />
          </div>
        )}

        {authMode === "verify" && (
          <div className="modal-body auth-body auth-body-card">
            <p className="auth-subtitle">{t("verifyEmailHint")}</p>

            <div className="auth-verify-box">
              <div className="auth-verify-row">
                <span className="auth-verify-label">{t("email")}</span>
                <span className="auth-verify-value">{auth.currentUser?.email || email}</span>
              </div>
              <p className="auth-verify-footnote">{t("verifyFootnote")}</p>
            </div>

            <div className="auth-actions">
              <button
                className="btn btn-ghost full-width"
                disabled={resendBusy}
                onClick={async () => {
                  if (!auth.currentUser) return showMessage(t("paypalError") || "Error", "error");
                  setResendBusy(true);
                  try {
                    await sendEmailVerification(auth.currentUser);
                    showMessage(t("emailLinkSent") || "Verification email sent.", "success");
                  } catch (err) {
                    showMessage(String(err?.message || err), "error");
                  } finally {
                    setResendBusy(false);
                  }
                }}
              >
                {t("resendEmail")}
              </button>

              <button
                className="btn full-width"
                disabled={verifyBusy}
                onClick={async () => {
                  if (!auth.currentUser) return showMessage(t("paypalError") || "Error", "error");
                  setVerifyBusy(true);
                  try {
                    await auth.currentUser.reload();
                    if (auth.currentUser.emailVerified) {
                      showMessage(t("emailVerified"), "success");
                      setShowAuthModal(false);
                      setAuthMode("login");
                    } else {
                      showMessage(t("notVerifiedYet"), "error");
                    }
                  } catch (err) {
                    showMessage(String(err?.message || err), "error");
                  } finally {
                    setVerifyBusy(false);
                  }
                }}
              >
                {verifyBusy ? t("verifying") : t("iVerified")}
              </button>

              <button
                className="btn btn-ghost full-width"
                onClick={() => {
                  showMessage(t("verifyLater"), "success");
                  setShowAuthModal(false);
                  setAuthMode("login");
                }}
              >
                {t("verifyLater")}
              </button>
            </div>
          </div>
        )}
      </Motion.div>
      <div id="recaptcha-container" style={{ display: "none" }} />
    </Motion.div>
  );
}
