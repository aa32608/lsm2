"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  signInWithEmailAndPassword, 
  signInWithPhoneNumber, 
  RecaptchaVerifier, 
  PhoneAuthProvider,
  linkWithCredential,
  updateProfile,
  sendEmailVerification,
  EmailAuthProvider,
  getAdditionalUserInfo,
  sendPasswordResetEmail
} from "firebase/auth";
import { ref as dbRef, set } from "firebase/database";

const AuthModal = () => {
  const {
    t,
    auth,
    db,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    phoneNumber,
    setPhoneNumber,
    countryCode,
    setCountryCode,
    verificationCode,
    setVerificationCode,
    confirmationResult,
    setConfirmationResult,
    phoneLoading,
    setPhoneLoading,
    agreedToTerms,
    setAgreedToTerms,
    passwordForm,
    setPasswordForm,
    showMessage,
    countryCodes,
    setShowTerms,
    setShowPrivacy,
  } = useApp();

  // Local Helpers
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
  const validatePassword = (p) => {
    if (!p || p.length < 8) return false;
    const numCount = (p.match(/\d/g) || []).length;
    return numCount >= 2;
  };
  
  const normalizePhoneForStorage = (raw) => {
    if (!raw) return raw;
    const trimmed = raw.trim();
    if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
    const cleaned = trimmed.replace(/\D/g, "");
    if (cleaned === "") return trimmed;
    if (cleaned.length > 8 && cleaned.startsWith("00")) return "+" + cleaned.replace(/^0{2}/, "");
    const known = countryCodes.map((c) => c.code.replace("+", ""));
    for (const pre of known) if (cleaned.startsWith(pre)) return "+" + cleaned;
    return "+389" + cleaned;
  };

  const getSignupRecaptcha = () => {
    if (window.signupRecaptchaVerifier) {
      try {
        window.signupRecaptchaVerifier.clear();
      } catch (e) {}
      window.signupRecaptchaVerifier = null;
    }
    const signupContainer = document.getElementById("recaptcha-signup");
    if (signupContainer) signupContainer.innerHTML = "";
    window.signupRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-signup",
      { size: "invisible" }
    );
    return window.signupRecaptchaVerifier;
  };

  const createRecaptcha = (containerId) => {
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (e) {}
      window.recaptchaVerifier = null;
    }
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      containerId,
      { size: "invisible" }
    );
    return window.recaptchaVerifier;
  };

  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [otp, setOtp] = useState("");

  // Phone Login Logic
  const handleSendOtp = async () => {
    if (!phoneNumber) return showMessage(t("enterPhone"), "error");
    try {
      setPhoneLoading(true);
      const appVerifier = createRecaptcha("recaptcha-container");
      const raw = phoneNumber.replace(/\D/g, "");
      if (!raw || raw.length < 5) {
        return showMessage(t("enterValidPhone"), "error");
      }
      const fullPhone = countryCode + raw;
      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setVerificationId(confirmation);
      showMessage(t("otpSent"), "success");
    } catch (err) {
      console.error(err);
      showMessage(`${t("otpError")}: ${err.message}`, "error");
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); } catch (e) {}
        window.recaptchaVerifier = null;
      }
      const container = document.getElementById("recaptcha-container");
      if (container) container.innerHTML = "";
    } finally {
      setPhoneLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return showMessage(t("enterOtp"), "error");
    try {
      setPhoneLoading(true);
      await verificationId.confirm(otp);
      showMessage(t("signedIn"), "success");
      setShowAuthModal(false);
      setOtp("");
      setVerificationId(null);
      setPhoneNumber("");
    } catch (err) {
      console.error(err);
      showMessage(t("otpVerifyError"), "error");
    } finally {
      setPhoneLoading(false);
    }
  };

  // Prevent background scroll
  useEffect(() => {
    if (showAuthModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAuthModal]);

  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div
          className="auth-overlay-new"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowAuthModal(false)}
        >
          <motion.div
            className="auth-container-new"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="auth-header-new">
              <div className="auth-tabs-new">
                <button
                  className={`auth-tab-new ${authMode === "login" ? "active" : ""}`}
                  onClick={() => setAuthMode("login")}
                >
                  <span className="auth-tab-icon">🔐</span>
                  <span>{t("login")}</span>
                </button>
                <button
                  className={`auth-tab-new ${authMode === "signup" ? "active" : ""}`}
                  onClick={() => setAuthMode("signup")}
                >
                  <span className="auth-tab-icon">✨</span>
                  <span>{t("signup")}</span>
                </button>
              </div>
              <button
                className="auth-close-btn"
                onClick={() => setShowAuthModal(false)}
                aria-label={t("close")}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="auth-body-new">
              {authMode === "login" && (
                <div className="auth-content-new">
                  {/* Method Toggle */}
                  <div className="auth-method-switch">
                    <button 
                      className={`auth-method-btn ${!isPhoneLogin ? "active" : ""}`}
                      onClick={() => setIsPhoneLogin(false)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{t("email")}</span>
                    </button>
                    <button 
                      className={`auth-method-btn ${isPhoneLogin ? "active" : ""}`}
                      onClick={() => setIsPhoneLogin(true)}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{t("phone")}</span>
                    </button>
                  </div>

                  <p className="auth-description">{isPhoneLogin ? t("loginPhoneSubtitle") : t("loginSubtitle")}</p>

                  {!isPhoneLogin ? (
                    <>
                      {/* Email Login */}
                      <div className="auth-input-group">
                        <label className="auth-label">{t("email")}</label>
                        <div className="auth-input-wrapper">
                          <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <input
                            className="auth-input"
                            style={{padding: '16px 16px 16px 52px'}}
                            type="email"
                            placeholder={t("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="auth-input-group">
                        <label className="auth-label">{t("password")}</label>
                        <div className="auth-input-wrapper">
                          <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <input
                            className="auth-input"
                            style={{padding: '16px 16px 16px 52px'}}
                            type="password"
                            placeholder={t("password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                      </div>

                      <button
                        className="auth-submit-btn"
                        onClick={async () => {
                          if (!validateEmail(email))
                            return showMessage(t("enterValidEmail"), "error");
                          try {
                            await signInWithEmailAndPassword(auth, email, password);
                            showMessage(t("signedIn"), "success");
                            setShowAuthModal(false);
                            setEmail("");
                            setPassword("");
                          } catch (e) {
                            let errorMsg = e.message;
                            if (e.code === 'auth/user-not-found') {
                              errorMsg = t("userNotFound");
                            } else if (e.code === 'auth/wrong-password') {
                              errorMsg = t("wrongPassword");
                            } else if (e.code === 'auth/invalid-email') {
                              errorMsg = t("enterValidEmail");
                            } else if (e.code === 'auth/too-many-requests') {
                              errorMsg = t("tooManyAttempts");
                            } else if (e.code === 'auth/network-request-failed') {
                              errorMsg = t("networkError");
                            }
                            showMessage(errorMsg, "error");
                          }
                        }}
                      >
                        <span>{t("login")}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>

                      {/* Forgot Password Link */}
                      <button
                        type="button"
                        className="auth-forgot-password-link"
                        onClick={async () => {
                          if (!validateEmail(email)) {
                            return showMessage(t("enterEmailForReset"), "error");
                          }
                          try {
                            await sendPasswordResetEmail(auth, email);
                            showMessage(t("passwordResetEmailSent"), "success");
                          } catch (e) {
                            if (e.code === 'auth/user-not-found') {
                              showMessage(t("userNotFound"), "error");
                            } else {
                              showMessage(t("passwordResetError"), "error");
                            }
                          }
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--primary)',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          marginTop: '12px',
                          textDecoration: 'underline',
                          width: '100%',
                          textAlign: 'center'
                        }}
                      >
                        {t("forgotPassword")}
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Phone Login */}
                      {!verificationId ? (
                        <>
                          <div className="auth-input-group">
                            <label className="auth-label">{t("phoneNumber")}</label>
                            <div className="auth-phone-group">
                              <select
                                className="auth-country-select"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                              >
                                {countryCodes.map((c) => (
                                  <option key={c.code} value={c.code}>
                                    {c.name} {c.code}
                                  </option>
                                ))}
                              </select>
                              <div className="auth-input-wrapper">
                                <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                  <line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2"/>
                                </svg>
                                <input
                                  className="auth-input"
                                  style={{padding: '16px 16px 16px 52px'}}
                                  type="tel"
                                  placeholder={t("phonePlaceholder")}
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                                  maxLength="12"
                                  inputMode="numeric"
                                />
                              </div>
                            </div>
                            <div id="recaptcha-container"></div>
                          </div>
                          
                          <button 
                            className="auth-submit-btn" 
                            onClick={handleSendOtp}
                            disabled={phoneLoading}
                          >
                            <span>{phoneLoading ? t("sending") : t("sendCode")}</span>
                            {!phoneLoading && (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="auth-input-group">
                            <label className="auth-label">{t("verificationCode")}</label>
                            <div className="auth-input-wrapper">
                              <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <rect x="3" y="8" width="18" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                                <path d="M7 8V5a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2"/>
                              </svg>
                              <input
                                className="auth-input"
                                style={{padding: '16px 16px 16px 52px'}}
                                type="text"
                                placeholder={t("verificationCodePlaceholder")}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                              />
                            </div>
                          </div>
                          <button 
                            className="auth-submit-btn" 
                            onClick={handleVerifyOtp}
                            disabled={phoneLoading}
                          >
                            <span>{phoneLoading ? t("verifying") : t("verifyAndLogin")}</span>
                            {!phoneLoading && (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                          <button 
                            className="auth-back-btn"
                            onClick={() => setVerificationId(null)}
                          >
                            {t("back")}
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}

              {authMode === "signup" && (
                <div className="auth-content-new">
                  <p className="auth-description">{t("signupSubtitle")}</p>
        
                  <div className="auth-input-group">
                    <label className="auth-label">{t("signupNameLabel")}</label>
                    <div className="auth-input-wrapper">
                      <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <input
                        className="auth-input"
                        style={{padding: '16px 16px 16px 52px'}}
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                  </div>
        
                  <div className="auth-input-group">
                    <label className="auth-label">{t("email")}</label>
                    <div className="auth-input-wrapper">
                      <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <input
                        className="auth-input"
                        style={{padding: '16px 16px 16px 52px'}}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
        
                  <div className="auth-input-group">
                    <label className="auth-label">{t("password")}</label>
                    <div className="auth-input-wrapper">
                      <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <input
                        className="auth-input"
                        style={{padding: '16px 16px 16px 52px'}}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        minLength={8}
                        autoComplete="new-password"
                      />
                    </div>
                    <p className="auth-password-requirement" aria-live="polite">{t("passwordRequirement")}</p>
                  </div>
        
                  <div className="auth-input-group">
                    <label className="auth-label">{t("repeatNewPassword")}</label>
                    <div className="auth-input-wrapper">
                      <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <input
                        className="auth-input"
                        style={{padding: '16px 16px 16px 52px'}}
                        type="password"
                        value={passwordForm?.repeatNewPassword || ""}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, repeatNewPassword: e.target.value })
                        }
                      />
                    </div>
                  </div>
        
                  <div className="auth-input-group">
                    <label className="auth-label">{t("phoneNumber")}</label>
                    <div className="auth-phone-group">
                      <select
                        className="auth-country-select"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                      <div className="auth-input-wrapper">
                        <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                          <line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <input
                          className="auth-input"
                          style={{padding: '16px 16px 16px 52px'}}
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, ""))
                          }
                          maxLength="12"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                  </div>
        
                  <div className="auth-checkbox-group-new">
                    <input 
                      type="checkbox" 
                      id="agreeTermsNew" 
                      checked={agreedToTerms} 
                      onChange={(e) => setAgreedToTerms(e.target.checked)} 
                      className="auth-checkbox-new"
                    />
                    <label htmlFor="agreeTermsNew" className="auth-checkbox-label">
                      {t("agreeTo")} <button type="button" className="auth-link-new" onClick={() => setShowTerms(true)}>{t("termsOfService")}</button> {t("and")} <button type="button" className="auth-link-new" onClick={() => setShowPrivacy(true)}>{t("privacyPolicy")}</button>.
                    </label>
                  </div>

                  {!confirmationResult && (
                    <button
                      className="auth-submit-btn"
                      disabled={phoneLoading}
                      onClick={async () => {
                        if (!agreedToTerms)
                          return showMessage(t("mustAgreeToTerms"), "error");

                        if (!validateEmail(email))
                          return showMessage(t("enterValidEmail"), "error");
                        
                        if (!displayName.trim())
                          return showMessage(t("enterName"), "error");
            
                        if (!validatePassword(password))
                          return showMessage(t("passwordTooShort"), "error");
            
                        if (passwordForm?.repeatNewPassword !== password)
                          return showMessage(t("passwordsDontMatch"), "error");
            
                        const raw = phoneNumber.replace(/\D/g, "");
                        if (!raw || raw.length < 5)
                          return showMessage(t("enterValidPhone"), "error");
            
                        const fullPhone = countryCode + raw;
                        if (!validatePhone(fullPhone))
                          return showMessage(t("enterValidPhone"), "error");
            
                        setPhoneLoading(true);
                        try {
                          const verifier = getSignupRecaptcha();
                          const confirmation = await signInWithPhoneNumber(
                            auth,
                            fullPhone,
                            verifier
                          );
                          setConfirmationResult(confirmation);
                          showMessage(t("codeSent"), "success");
                        } catch (err) {
                          console.error(err);
                          if (window.signupRecaptchaVerifier) {
                            try { window.signupRecaptchaVerifier.clear(); } catch (e) {}
                            window.signupRecaptchaVerifier = null;
                          }
                          const signupContainer = document.getElementById("recaptcha-signup");
                          if (signupContainer) signupContainer.innerHTML = "";
                          showMessage(err?.message || err, "error");
                        } finally {
                          setPhoneLoading(false);
                        }
                      }}
                    >
                      <span>{t("createAccount")}</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                        <path d="M20 8v6M23 11h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  )}
        
                  {confirmationResult && (
                    <>
                      <div className="auth-input-group">
                        <label className="auth-label">{t("enterCode")}</label>
                        <div className="auth-input-wrapper">
                          <svg className="auth-input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="8" width="18" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M7 8V5a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <input
                            className="auth-input"
                            style={{padding: '16px 16px 16px 52px'}}
                            type="text"
                            placeholder={t("verificationCodePlaceholder")}
                            value={verificationCode}
                            onChange={(e) =>
                              setVerificationCode(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength="6"
                            inputMode="numeric"
                          />
                        </div>
                      </div>
        
                      <button
                        className="auth-submit-btn"
                        disabled={phoneLoading}
                        onClick={async () => {
                          if (!/^\d{6}$/.test(verificationCode))
                            return showMessage(t("invalidCode"), "error");
        
                          setPhoneLoading(true);
                          try {
                            const result = await confirmationResult.confirm(
                              verificationCode
                            );
                            const user = result.user;
                            const { isNewUser } = getAdditionalUserInfo(result) || {};

                            try {
                              const emailCred = EmailAuthProvider.credential(
                                email,
                                password
                              );
                              await linkWithCredential(user, emailCred);

                              if (displayName.trim()) {
                                await updateProfile(user, { displayName: displayName.trim() });
                              }

                              await set(dbRef(db, `users/${user.uid}`), {
                                name: displayName.trim() || null,
                                email: user.email,
                                phone: normalizePhoneForStorage(countryCode + phoneNumber),
                                createdAt: Date.now(),
                                subscribedToMarketing: true,
                              });

                              await sendEmailVerification(user);

                              showMessage(t("signupSuccess"), "success");

                              setAuthMode("verify");
                              setConfirmationResult(null);
                              setVerificationCode("");
                            } catch (innerErr) {
                              console.error("Signup incomplete, rolling back user creation:", innerErr);
                              
                              if (isNewUser) {
                                await user.delete().catch(cleanupErr => console.error("Failed to cleanup user:", cleanupErr));
                              }
                              
                              setConfirmationResult(null);
                              setVerificationCode("");
                              if (window.signupRecaptchaVerifier) {
                                try {
                                  window.signupRecaptchaVerifier.clear();
                                } catch (e) {}
                                window.signupRecaptchaVerifier = null;
                              }
                              
                              throw innerErr;
                            }
                          } catch (err) {
                            console.error(err);
                            showMessage(err, "error");
                          } finally {
                            setPhoneLoading(false);
                          }
                        }}
                      >
                        <span>{t("verifyPhone")}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </>
                  )}
        
                  <div id="recaptcha-signup" className="recaptcha" />
                </div>
              )}

              {authMode === "verify" && (
                <div className="auth-verify-content">
                  <div className="auth-verify-icon">✉️</div>
                  <h3 className="auth-verify-title">{t("verifyYourEmail")}</h3>
                  <p className="auth-verify-text">{t("verifyEmailHint")}</p>
                  <button onClick={() => setShowAuthModal(false)} className="auth-submit-btn">
                    {t("close")}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
