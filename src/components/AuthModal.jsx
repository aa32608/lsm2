"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  getAdditionalUserInfo
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
    // Helpers
    // normalizePhoneForStorage // Wait, I need to check if this is in context. It's not. I'll define it here.
  } = useApp();

  // Local Helpers
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
  
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
      } catch (e) {
        // ignore
      }
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
    if (!window.recaptchaVerifier) {
      const container = document.getElementById(containerId);
      if (container) container.innerHTML = "";

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        containerId,
        { size: "invisible" }
      );
    }
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
      // Combine country code with phone number
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
      if (window.recaptchaVerifier) window.recaptchaVerifier.clear();
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
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowAuthModal(false)}
    >
      <motion.div
        className="modal auth-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className="modal-header">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${authMode === "login" ? "active" : ""}`}
              onClick={() => setAuthMode("login")}
            >
              {t("login")}
            </button>
            <button
              className={`auth-tab ${authMode === "signup" ? "active" : ""}`}
              onClick={() => setAuthMode("signup")}
            >
              {t("signup")}
            </button>
          </div>
          <button
            className="icon-btn close-btn"
            onClick={() => setShowAuthModal(false)}
            aria-label={t("close")}
          >
            ✕
          </button>
        </div>

        {authMode === "login" && (
          <>
            <div className="modal-body">
              <div className="auth-method-toggle" style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
                 <button 
                   className={`btn btn-sm ${!isPhoneLogin ? 'btn-primary' : 'btn-outline'}`}
                   onClick={() => setIsPhoneLogin(false)}
                 >
                   📧 {t("email")}
                 </button>
                 <button 
                   className={`btn btn-sm ${isPhoneLogin ? 'btn-primary' : 'btn-outline'}`}
                   onClick={() => setIsPhoneLogin(true)}
                 >
                   📱 {t("phone")}
                 </button>
              </div>

              <p className="auth-subtitle">
                  {isPhoneLogin ? t("loginPhoneSubtitle") : t("loginSubtitle")}
              </p>

              {!isPhoneLogin ? (
                <>
                  {/* Email Login */}
                  <div className="field-group">
                      <label className="field-label">{t("email")}</label>
                      <input
                      className="input"
                      type="email"
                      placeholder={t("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>

                  <div className="field-group">
                      <label className="field-label">{t("password")}</label>
                      <input
                      className="input"
                      type="password"
                      placeholder={t("password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                  </div>

                  <div className="auth-actions">
                      <button
                      className="btn btn-primary full-width"
                      style={{ width: '100%' }}
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
                          // Better error messages for login failures
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
                      {t("login")}
                      </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Phone Login */}
                  {!verificationId ? (
                    <div className="field-group">
                      <label className="field-label">{t("phoneNumber")}</label>
                      <div className="phone-input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                        <select
                          className="select phone-country"
                          style={{ width: '120px', flexShrink: 0 }}
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name} {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          className="input phone-number"
                          type="tel"
                          placeholder={t("phonePlaceholder")}
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                          maxLength="12"
                          inputMode="numeric"
                          style={{ flex: 1 }}
                        />
                      </div>
                      <div id="recaptcha-container" style={{ marginTop: '10px' }}></div>
                      
                      <button 
                        className="btn btn-primary full-width" 
                        onClick={handleSendOtp}
                        disabled={phoneLoading}
                        style={{ marginTop: '16px', width: '100%' }}
                      >
                        {phoneLoading ? t("sending") : t("sendCode")}
                      </button>
                    </div>
                  ) : (
                    <div className="field-group">
                      <label className="field-label">{t("verificationCode")}</label>
                      <input
                        className="input"
                        type="text"
                        placeholder={t("verificationCodePlaceholder")}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary full-width" 
                        onClick={handleVerifyOtp}
                        disabled={phoneLoading}
                        style={{ marginTop: '16px', width: '100%' }}
                      >
                        {phoneLoading ? t("verifying") : t("verifyAndLogin")}
                      </button>
                      <button 
                        className="btn btn-ghost full-width"
                        onClick={() => setVerificationId(null)}
                        style={{ marginTop: '8px', width: '100%' }}
                      >
                        {t("back")}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {authMode === "signup" && (
            <div className="modal-body">
            <p className="auth-subtitle">
                {t("signupSubtitle")}
            </p>
        
            <div className="field-group">
                <label className="field-label">{t("signupNameLabel")}</label>
                <input
                className="input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
        
            {/* EMAIL */}
            <div className="field-group">
                <label className="field-label">{t("email")}</label>
                <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        
            {/* PASSWORD */}
            <div className="field-group">
                <label className="field-label">{t("password")}</label>
                <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        
            {/* REPEAT PASSWORD */}
            <div className="field-group">
                <label className="field-label">
                {t("repeatNewPassword")}
                </label>
                <input
                className="input"
                type="password"
                value={passwordForm?.repeatNewPassword || ""}
                onChange={(e) =>
                    setPasswordForm({ ...passwordForm, repeatNewPassword: e.target.value })
                }
                />
            </div>
        
            {/* PHONE (MANDATORY) */}
            <div className="field-group">
                <label className="field-label">{t("phoneNumber")}</label>
                <div className="phone-input-group" style={{ display: 'flex', gap: '0.5rem' }}>
                <select
                    className="select phone-country"
                    style={{ width: '100px' }}
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
                    style={{ flex: 1 }}
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
        
            {/* Checkbox for Terms */}
            <div className="field-group checkbox-group" style={{ display: 'flex', alignItems: 'flex-start' }}>
                <input 
                type="checkbox" 
                id="agreeTerms" 
                checked={agreedToTerms} 
                onChange={(e) => setAgreedToTerms(e.target.checked)} 
                className="auth-checkbox"
                style={{ marginTop: '4px' }}
                />
                <label htmlFor="agreeTerms" className="auth-terms-label text-sm text-muted">
                {t("agreeTo")} <button type="button" className="link-btn" onClick={() => setShowTerms(true)} style={{ color: 'var(--primary)', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>{t("termsOfService")}</button> {t("and")} <button type="button" className="link-btn" onClick={() => setShowPrivacy(true)} style={{ color: 'var(--primary)', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>{t("privacyPolicy")}</button>.
                </label>
            </div>


            {/* STEP 1: SEND SMS */}
            {!confirmationResult && (
                <button
                className="btn full-width"
                disabled={phoneLoading}
                onClick={async () => {
                    if (!agreedToTerms)
                    return showMessage(t("mustAgreeToTerms"), "error");

                    if (!validateEmail(email))
                    return showMessage(t("enterValidEmail"), "error");
                    
                    if (!displayName.trim())
                    return showMessage(t("enterName"), "error");
        
                    if (password.length < 6)
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
                    window.signupRecaptchaVerifier?.clear?.();
                    window.signupRecaptchaVerifier = null;
                    showMessage(err, "error");
                    } finally {
                    setPhoneLoading(false);
                    }
                }}
                >
                {t("createAccount")}
                </button>
            )}
        
            {/* STEP 2: VERIFY CODE + LINK EMAIL */}
            {confirmationResult && (
                <>
                <div className="auth-field-group mt-md">
                    <span className="field-label">{t("enterCode")}</span>
                    <input
                    className="input"
                    value={verificationCode}
                    onChange={(e) =>
                        setVerificationCode(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength="6"
                    />
                </div>
        
                <button
                    className="btn full-width"
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
                            } catch (e) {
                            }
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
                    {t("verifyPhone")}
                </button>
                </>
            )}
        
            <div id="recaptcha-signup" className="recaptcha" />
            </div>
        )}

        {/* VERIFY MODE (After signup) */}
        {authMode === "verify" && (
             <div className="modal-body auth-body auth-body-card">
                 <h3>{t("verifyYourEmail")}</h3>
                 <p>{t("verifyEmailHint")}</p>
                 <button onClick={() => setShowAuthModal(false)} className="btn btn-primary">{t("close")}</button>
             </div>
        )}

      </motion.div>
    </motion.div>
  );
};

export default AuthModal;
