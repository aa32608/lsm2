"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import { 
  updateProfile, 
  updateEmail, 
  updatePassword, 
  deleteUser, 
  sendEmailVerification, 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  updatePhoneNumber,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  signOut
} from "firebase/auth";
import { ref as dbRef, update, remove } from "firebase/database";
import { auth, createRecaptcha } from "../firebase";

const AccountTab = () => {
  const { 
    user, 
    userProfile, 
    t, 
    lang, 
    showMessage, 
    myListingsRaw, 
    setShowPostForm, 
    setShowTerms, 
    setShowPrivacy,
    setShowAuthModal,
    setAuthMode,
    countryCodes,
    db
  } = useApp();

  if (!user) {
    return (
      <div className="section" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👤</div>
        <h2>{t("loginToSeeMore") || "Please Login"}</h2>
        <p style={{ color: "#64748b", marginBottom: "2rem" }}>
          {t("accountLoginDescription") || "Login to manage your profile and account settings."}
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setAuthMode("login");
            setShowAuthModal(true);
          }}
        >
          {t("login") || "Login"}
        </button>
      </div>
    );
  }

  // Local state for forms
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [loading, setLoading] = useState(false);
  
  // Phone state
  const [accountPhone, setAccountPhone] = useState("");
  const [phoneEditing, setPhoneEditing] = useState(false);
  const [phoneConfirmationResult, setPhoneConfirmationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("+389");
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", repeatNewPassword: "" });
  const [savingPassword, setSavingPassword] = useState(false);
  const [emailForm, setEmailForm] = useState({ newEmail: "", currentPassword: "" });
  const [savingEmail, setSavingEmail] = useState(false);

  const router = useRouter();

  // Initialize state from user
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setAccountPhone(user.phoneNumber || userProfile?.phone || "");
    }
  }, [user, userProfile]);

  // Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await updateProfile(user, { displayName });
      // Update in DB as well if needed, but primarily Auth
      if (userProfile?.uid) {
         await update(dbRef(db, `users/${user.uid}`), { displayName });
      }
      showMessage(t("profileUpdated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("updateError"), "error");
    } finally {
      setLoading(false);
    }
  };

  // Phone Handling
  const handleChangePhone = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return showMessage(t("enterPhone"), "error");
    
    setSavingPhone(true);
    try {
      const fullPhone = `${phoneCountryCode}${phoneNumber.replace(/^0+/, "")}`;
      const appVerifier = createRecaptcha("recaptcha-container-account");
      
      // If user has a phone number, we update it. If not, we link it.
      // Actually, standard flow is linking if null, updating if exists.
      // But linkWithPhoneNumber is simpler for "add/update" flow usually.
      
      const confirmation = await linkWithPhoneNumber(user, fullPhone, appVerifier);
      setPhoneConfirmationResult(confirmation);
      showMessage(t("codeSent"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("errorSendingCode") + ": " + err.message, "error");
    } finally {
      setSavingPhone(false);
    }
  };

  const handleVerifyPhoneCode = async (e) => {
    e.preventDefault();
    if (!phoneVerificationCode || !phoneConfirmationResult) return;
    
    setSavingPhone(true);
    try {
      await phoneConfirmationResult.confirm(phoneVerificationCode);
      // Update DB
      if (user) {
         await update(dbRef(db, `users/${user.uid}`), { 
           phone: `${phoneCountryCode}${phoneNumber.replace(/^0+/, "")}`,
           phoneVerified: true 
         });
      }
      showMessage(t("phoneVerified"), "success");
      setPhoneEditing(false);
      setPhoneConfirmationResult(null);
      setAccountPhone(`${phoneCountryCode}${phoneNumber.replace(/^0+/, "")}`);
    } catch (err) {
      console.error(err);
      showMessage(t("invalidCode"), "error");
    } finally {
      setSavingPhone(false);
    }
  };

  // Password Change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.repeatNewPassword) {
      return showMessage(t("passwordsDoNotMatch"), "error");
    }
    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, passwordForm.newPassword);
      showMessage(t("passwordUpdated"), "success");
      setPasswordForm({ currentPassword: "", newPassword: "", repeatNewPassword: "" });
    } catch (err) {
      console.error(err);
      showMessage(t("passwordUpdateError") + ": " + err.message, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  // Email Change
  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setSavingEmail(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, emailForm.currentPassword);
      await reauthenticateWithCredential(user, cred);
      await updateEmail(user, emailForm.newEmail);
      await sendEmailVerification(user);
      showMessage(t("emailUpdatedVerificationSent"), "success");
      setEmailForm({ newEmail: "", currentPassword: "" });
    } catch (err) {
      console.error(err);
      showMessage(t("emailUpdateError") + ": " + err.message, "error");
    } finally {
      setSavingEmail(false);
    }
  };

  // Subscription
  const handleSubscriptionChange = async (e) => {
    const subscribed = e.target.checked;
    if (!user) return;
    try {
      await update(dbRef(db, `users/${user.uid}`), { subscribedToMarketing: subscribed });
      showMessage(subscribed ? t("subscribed") : t("unsubscribed"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("updateError"), "error");
    }
  };

  // Delete Account
  const handleDeleteAccount = async () => {
    if (!window.confirm(t("confirmDeleteAccount") || "Are you sure you want to delete your account? This cannot be undone.")) return;
    
    const password = prompt(t("enterPasswordToConfirm") || "Please enter your password to confirm:");
    if (!password) return;

    try {
      const cred = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, cred);
      
      // Delete user data from DB
      await remove(dbRef(db, `users/${user.uid}`));
      // Delete user listings
      // Ideally this should be done by a cloud function, but here we might do it client side or leave it.
      // For now, just delete auth user.
      
      await deleteUser(user);
      showMessage(t("accountDeleted"), "success");
      router.push("/");
    } catch (err) {
      console.error(err);
      showMessage(t("deleteAccountError") + ": " + err.message, "error");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    router.push("/");
  };

  if (!user) {
    return (
      <div className="empty-state-container">
        <div className="empty-state-icon">👤</div>
        <h3>{t("loginRequired")}</h3>
        <p>{t("loginToViewAccount")}</p>
        <button className="btn" onClick={() => {
            setShowAuthModal(true);
            setAuthMode("login");
        }}>{t("login")}</button>
      </div>
    );
  }

  const stats = [
    {
      label: t("listingsLabel"),
      value: myListingsRaw.length,
      icon: "📂",
      color: "blue"
    },
    {
      label: t("views"),
      value: myListingsRaw.reduce((acc, curr) => acc + (curr.views || 0), 0),
      icon: "👀",
      color: "green"
    },
    {
      label: t("accountSince"),
      value: user?.metadata?.creationTime
        ? new Date(user.metadata.creationTime).getFullYear()
        : "—",
      hint: t("accountSince"),
      color: "purple"
    },
  ];

  return (
    <div className="account-layout">
      {/* Sidebar / Stats */}
      <div className="account-sidebar">
        <div className="account-user-profile">
          <div className="account-avatar">
            {user.photoURL ? (
              <img src={user.photoURL} alt="avatar" />
            ) : (
              <div className="avatar-placeholder">{user.email?.[0]?.toUpperCase() || "U"}</div>
            )}
          </div>
          <h2 className="account-name">{user.displayName || user.email?.split("@")[0]}</h2>
          <p className="account-email-sub">{user.email}</p>
          <button className="account-btn outline small full-width mt-md" onClick={handleLogout}>
            🚪 {t("logout")}
          </button>
        </div>

        <div className="home-hero__stats" style={{ marginBottom: '2rem' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="stat-block">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{stat.icon}</span>
                <p className="stat-label" style={{ margin: 0 }}>{stat.label}</p>
              </div>
              <p className="stat-value">{stat.value}</p>
              {stat.hint && <p className="stat-note">{stat.hint}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="account-main">
        {/* Profile Information Card */}
        <div className="account-card">
          <div className="account-card-header">
            <h3>📋 {t("profileInfo")}</h3>
            <p>{t("accountDetails")}</p>
          </div>
          
          <div className="account-card-body">
            <div className="account-info-list">
              <div className="account-info-item">
                <div className="info-icon">✉️</div>
                <div className="info-content">
                  <p className="info-label">{t("emailLabel")}</p>
                  <p className="info-value">{user?.email || t("unspecified")}</p>
                  {user?.emailVerified ? (
                    <span className="account-badge success">✅ {t("verified")}</span>
                  ) : (
                    <span className="account-badge warning">⏳ {t("pendingVerification")}</span>
                  )}
                </div>
              </div>
              
              <div className="account-info-item">
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <p className="info-label">{t("phoneNumber")}</p>
                  {!phoneEditing ? (
                    <div className="flex-row-between">
                      <p className="info-value">
                        {accountPhone || (
                          <span className="text-muted">{t("addPhoneNumber")}</span>
                        )}
                      </p>
                      <button className="account-btn ghost small" onClick={() => setPhoneEditing(true)}>{t("edit")}</button>
                    </div>
                  ) : !phoneConfirmationResult ? (
                    <form className="account-form-group" onSubmit={handleChangePhone}>
                      <div className="flex-row gap-sm">
                        <select
                          value={phoneCountryCode}
                          onChange={(e) => setPhoneCountryCode(e.target.value)}
                          className="account-input"
                          style={{ width: '80px' }}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.code}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          className="account-input"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder={t("phoneNumber")}
                        />
                      </div>

                      <div className="account-form-actions">
                        <button type="button" className="account-btn ghost small" onClick={() => {
                          setPhoneEditing(false);
                          setPhoneConfirmationResult(null);
                        }}>{t("cancel")}</button>
                        <button type="submit" className="account-btn primary small" disabled={savingPhone}>
                          {savingPhone ? t("sendingCode") : t("savePhone")}
                        </button>
                      </div>
                      <div id="recaptcha-container-account"></div>
                    </form>
                  ) : (
                    <form className="account-form-group" onSubmit={handleVerifyPhoneCode}>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("enterCode")}</label>
                        <input
                          type="text"
                          className="account-form-input"
                          value={phoneVerificationCode}
                          onChange={(e) => setPhoneVerificationCode(e.target.value.replace(/\D/g, ""))}
                          placeholder={t("enterCode")}
                          maxLength="6"
                        />
                      </div>
                      <div className="account-form-actions">
                        <button type="button" className="account-btn ghost small" onClick={() => {
                          setPhoneConfirmationResult(null);
                          setPhoneVerificationCode("");
                        }}>{t("back")}</button>
                        <button type="submit" className="account-btn primary small" disabled={savingPhone}>
                          {savingPhone ? t("verifying") : t("verifyCode")}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              
              <div className="account-info-item">
                <div className="info-icon">📅</div>
                <div className="info-content">
                  <p className="info-label">{t("accountSince")}</p>
                  <p className="info-value">
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).toLocaleDateString(lang === 'sq' ? 'sq-AL' : lang === 'mk' ? 'mk-MK' : 'en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })
                      : "—"}
                  </p>
                </div>
              </div>
            </div>

            {!user?.emailVerified && (
              <div className="account-alert">
                <div className="account-alert-icon">⚠️</div>
                <div className="account-alert-content">
                  <p className="account-alert-title">{t("verifyYourEmail")}</p>
                  <p className="account-alert-sub">{t("verifyEmailHint")}</p>
                  <div className="account-alert-actions">
                    <button
                      className="account-btn ghost small"
                      onClick={async () => {
                        try {
                          if (user) {
                            await sendEmailVerification(user);
                            showMessage(t("verificationSent"), "success");
                          }
                        } catch (err) {
                          showMessage(t("verificationError") + " " + err.message, "error");
                        }
                      }}
                    >
                      {t("resendVerificationEmail")}
                    </button>
                    <button
                      className="account-btn primary small"
                      onClick={() => {
                        setAuthMode("verify");
                        setShowAuthModal(true);
                      }}
                    >
                      {t("iVerified")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Links Card */}
          <div className="card account-card account-quick-links">
            <div className="account-card-header">
              <h3 className="account-card-title">⚡ {t("quickActions")}</h3>
            </div>
            <div className="hero-action-grid" style={{ padding: '1rem' }}>
              <button 
                className="action-tile"
                style={{ width: '100%', border: 'none', background: 'linear-gradient(135deg, #f8fafc, #ffffff)', padding: '1rem' }}
                onClick={() => router.push("/mylistings")}
              >
                <span className="action-icon">📁</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="action-title">{t("myListings")}</p>
                  <p className="action-desc">{myListingsRaw.length} {t("listingsLabel")}</p>
                </div>
                <span className="quick-link-arrow">→</span>
              </button>
              <button 
                className="action-tile"
                style={{ width: '100%', border: 'none', background: 'linear-gradient(135deg, #f8fafc, #ffffff)', padding: '1rem' }}
                onClick={() => router.push("/listings")}
              >
                <span className="action-icon">🔍</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="action-title">{t("explore")}</p>
                  <p className="action-desc">{t("browseListingsHint")}</p>
                </div>
                <span className="quick-link-arrow">→</span>
              </button>
              <button 
                className="action-tile"
                style={{ width: '100%', border: 'none', background: 'linear-gradient(135deg, #f8fafc, #ffffff)', padding: '1rem' }}
                onClick={() => setShowPostForm(true)}
              >
                <span className="action-icon">➕</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="action-title">{t("submitListing")}</p>
                  <p className="action-desc">{t("createListingHint")}</p>
                </div>
                <span className="quick-link-arrow">→</span>
              </button>
              <button 
                className="action-tile"
                style={{ width: '100%', border: 'none', background: 'linear-gradient(135deg, #f8fafc, #ffffff)', padding: '1rem' }}
                onClick={() => setShowTerms(true)}
              >
                <span className="action-icon">📜</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="action-title">{t("termsOfService")}</p>
                  <p className="action-desc">{t("readTerms") || "Read our terms"}</p>
                </div>
                <span className="quick-link-arrow">→</span>
              </button>
              <button 
                className="action-tile"
                style={{ width: '100%', border: 'none', background: 'linear-gradient(135deg, #f8fafc, #ffffff)', padding: '1rem' }}
                onClick={() => setShowPrivacy(true)}
              >
                <span className="action-icon">🔒</span>
                <div style={{ textAlign: 'left' }}>
                  <p className="action-title">{t("privacyPolicy")}</p>
                  <p className="action-desc">{t("readPrivacy") || "Read our privacy policy"}</p>
                </div>
                <span className="quick-link-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="account-column">
          {/* Edit Profile Card */}
          <div className="card account-card account-profile-section">
            <div className="account-card-header">
              <h3 className="account-card-title">👤 {t("editProfile")}</h3>
              <p className="account-card-subtitle">{t("updateProfileDesc") || "Update your public profile information"}</p>
            </div>
            <form className="account-form-group" onSubmit={handleUpdateProfile}>
              <div className="account-form-field">
                <label className="account-form-label">{t("displayName")}</label>
                <input
                  type="text"
                  className="account-form-input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t("displayNamePlaceholder") || "Enter your display name"}
                />
              </div>
              <div className="account-form-actions">
                <button type="submit" className="account-btn primary small" disabled={loading}>
                  {loading ? t("saving") : t("updateProfile")}
                </button>
              </div>
            </form>
          </div>

          {/* Security Settings Card */}
          <div className="card account-card account-security-section">
            <div className="account-card-header">
              <h3 className="account-card-title">🔒 {t("securitySettings")}</h3>
              <p className="account-card-subtitle">{t("securitySettingsText")}</p>
            </div>

            {/* Change Email Form */}
            <div className="account-form-section">
              <div className="account-form-section-header">
                <h4 className="account-form-section-title">✉️ {t("changeEmail")}</h4>
                <p className="account-form-section-desc">{t("updateEmailDesc")}</p>
              </div>
              <form className="account-form-group" onSubmit={handleChangeEmail}>
                <div className="account-form-field">
                  <label className="account-form-label">{t("newEmail")}</label>
                  <input
                    type="email"
                    className="account-form-input"
                    value={emailForm.newEmail}
                    onChange={(e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value }))}
                    placeholder={t("newEmailPlaceholder")}
                  />
                </div>
                <div className="account-form-field">
                  <label className="account-form-label">{t("currentPassword")}</label>
                  <input
                    type="password"
                    className="account-form-input"
                    value={emailForm.currentPassword}
                    onChange={(e) => setEmailForm((f) => ({ ...f, currentPassword: e.target.value }))}
                    placeholder={t("currentPasswordPlaceholder")}
                  />
                </div>
                <div className="account-form-actions">
                  <button type="submit" className="account-btn primary small" disabled={savingEmail}>
                    {savingEmail ? t("saving") : t("saveEmail")}
                  </button>
                </div>
              </form>
            </div>

            {/* Divider */}
            <div className="account-form-divider"></div>

            {/* Change Password Form */}
            <div className="account-form-section">
              <div className="account-form-section-header">
                <h4 className="account-form-section-title">🔑 {t("changePassword")}</h4>
                <p className="account-form-section-desc">{t("securitySettings")}</p>
              </div>
              <form className="account-form-group" onSubmit={handleChangePassword}>
                <div className="account-form-field">
                  <label className="account-form-label">{t("currentPassword")}</label>
                  <input
                    type="password"
                    className="account-form-input"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))
                    }
                    placeholder={t("currentPasswordPlaceholder")}
                  />
                </div>
                <div className="account-form-field">
                  <label className="account-form-label">{t("newPassword")}</label>
                  <input
                    type="password"
                    className="account-form-input"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))
                    }
                    placeholder={t("newPasswordPlaceholder")}
                  />
                </div>
                <div className="account-form-field">
                  <label className="account-form-label">{t("repeatNewPassword")}</label>
                  <input
                    type="password"
                    className="account-form-input"
                    value={passwordForm.repeatNewPassword}
                    onChange={(e) =>
                      setPasswordForm((f) => ({ ...f, repeatNewPassword: e.target.value }))
                    }
                    placeholder={t("repeatNewPasswordPlaceholder")}
                  />
                </div>
                <div className="account-form-actions">
                  <button type="submit" className="account-btn primary small" disabled={savingPassword}>
                    {savingPassword ? t("saving") : t("savePassword")}
                  </button>
                </div>
              </form>
            </div>

            {/* Divider */}
            <div className="account-form-divider"></div>

            {/* Email Subscription */}
            <div className="account-form-section">
              <div className="account-form-section-header">
                <h4 className="account-form-section-title">📧 {t("emailSubscription")}</h4>
                <p className="account-form-section-desc">{t("subscribeToWeeklyEmails")}</p>
              </div>
              <div className="account-form-field subscription-field">
                <label className="subscription-toggle">
                  <div className="subscription-toggle-text">
                    <span className="subscription-toggle-title">📧 {t("emailSubscription")}</span>
                    <span className="subscription-toggle-desc">{t("subscribeToWeeklyEmails")}</span>
                  </div>
                  <div className="toggle-switch">
                    <input
                      type="checkbox"
                      className="subscription-checkbox"
                      checked={userProfile?.subscribedToMarketing ?? true}
                      onChange={handleSubscriptionChange}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card account-card account-danger-zone">
            <div className="account-card-header">
              <h3 className="account-card-title text-danger">⚠️ {t("dangerZone")}</h3>
              <p className="account-card-subtitle">{t("dangerZoneDesc") || "Irreversible account actions"}</p>
            </div>
            <div className="account-form-section">
              <p className="account-form-section-desc mb-md">
                {t("deleteAccountWarning") || "Once you delete your account, there is no going back. Please be certain."}
              </p>
              <button 
                className="account-btn danger full-width"
                onClick={handleDeleteAccount}
              >
                {t("deleteAccount")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
