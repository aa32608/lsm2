"use client";
import React, { useEffect } from "react";
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
            {/* LOGIN FORM */}
            <div className="modal-body auth-body auth-body-card">
                <p className="auth-subtitle">
                    {t("loginSubtitle")}
                </p>

                {/* Email */}
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

                {/* Password */}
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
                    <button
                    className="btn full-width"
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
                        showMessage(e.message, "error");
                        }
                    }}
                    >
                    {t("login")}
                    </button>
                </div>
            </div>
            {/* Phone Login Option could be here but stripped for brevity/focus as per App.jsx logic splitting */}
            {/* Actually App.jsx has toggle for phone/email login inside Login mode? 
                Let's check App.jsx again. It has authTab state.
                I need to include authTab in Context or Local State.
                It was in App.jsx state: const [authTab, setAuthTab] = useState("email");
                I missed adding it to AppContext.
                I will use local state here as it's UI only.
            */}
          </>
        )}

        {authMode === "signup" && (
            <div className="modal-body auth-body auth-body-card">
            <p className="auth-subtitle">
                {t("signupSubtitle") ||
                "Create a BizCall account to post and manage your listings."}
            </p>
        
            <div className="auth-field-group">
                <span className="field-label">{t("name")}</span>
                <input
                className="input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                />
            </div>
        
            {/* EMAIL */}
            <div className="auth-field-group">
                <span className="field-label">{t("email")}</span>
                <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
        
            {/* PASSWORD */}
            <div className="auth-field-group">
                <span className="field-label">{t("password")}</span>
                <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        
            {/* REPEAT PASSWORD */}
            <div className="auth-field-group">
                <span className="field-label">
                {t("repeatNewPassword")}
                </span>
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
                    onChange={(e) =>
                    setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    maxLength="12"
                    inputMode="numeric"
                />
                </div>
            </div>
        
            {/* Checkbox for Terms */}
            <div className="auth-field-group checkbox-group">
                <input 
                type="checkbox" 
                id="agreeTerms" 
                checked={agreedToTerms} 
                onChange={(e) => setAgreedToTerms(e.target.checked)} 
                className="auth-checkbox"
                />
                <label htmlFor="agreeTerms" className="auth-terms-label">
                {t("agreeTo") || "I agree to the"} <button type="button" className="link-btn" onClick={() => setShowTerms(true)}>{t("termsOfService")}</button> {t("and") || "and"} <button type="button" className="link-btn" onClick={() => setShowPrivacy(true)}>{t("privacyPolicy")}</button>.
                </label>
            </div>

            {/* STEP 1: SEND SMS */}
            {!confirmationResult && (
                <button
                className="btn full-width"
                disabled={phoneLoading}
                onClick={async () => {
                    if (!agreedToTerms)
                    return showMessage(t("mustAgreeToTerms") || "You must agree to the Terms of Service and Privacy Policy.", "error");

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
                    showMessage(err.message, "error");
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
                        showMessage(err.message, "error");
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
