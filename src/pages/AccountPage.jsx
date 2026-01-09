import React, { useState } from 'react';
import { 
  updateEmail, 
  updatePassword, 
  reauthenticateWithCredential, 
  EmailAuthProvider,
  sendEmailVerification 
} from 'firebase/auth';
import { ref as dbRef, update } from 'firebase/database';
import { auth, db } from '../firebase';
import { validateEmail } from '../utils/validators';

const AccountPage = ({ 
  t, 
  user, 
  accountPhone,
  listings,
  favorites,
  setSelectedTab,
  setShowPostForm,
  showMessage 
}) => {
  const [emailForm, setEmailForm] = useState({ newEmail: "", currentPassword: "" });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const myListingsCount = listings.filter(l => l.userId === user?.uid).length;
  const myVerifiedCount = listings.filter(l => l.userId === user?.uid && l.status === "verified").length;

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return showMessage(t("loginRequired"), "error");
    if (!validateEmail(emailForm.newEmail)) return showMessage(t("enterValidEmail"), "error");
    if (!emailForm.currentPassword) return showMessage(t("enterCurrentPassword"), "error");
    if (!currentUser.email) return showMessage(t("emailChangeNotAvailable"), "error");
    if (emailForm.newEmail === currentUser.email) return showMessage(t("enterValidEmail"), "error");
    if (!currentUser.emailVerified) return showMessage(t("verifyYourEmail"), "error");

    setSavingEmail(true);
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, emailForm.currentPassword);
      await reauthenticateWithCredential(currentUser, cred);
      
      try {
        await updateEmail(currentUser, emailForm.newEmail);
        try {
          await sendEmailVerification(currentUser);
        } catch (verifyErr) {
          console.warn("Verification email send failed:", verifyErr);
        }
        
        await update(dbRef(db, `users/${currentUser.uid}`), { email: emailForm.newEmail });
        await currentUser.reload();
        
        showMessage(t("emailUpdateSuccess") || "Email updated successfully!", "success");
        setEmailForm({ newEmail: "", currentPassword: "" });
      } catch (updateErr) {
        if (updateErr.code === "auth/operation-not-allowed") {
          showMessage(
            "⚠️ Email change is restricted by Firebase. Contact support or check Firebase Console.",
            "error"
          );
        } else {
          throw updateErr;
        }
      }
    } catch (err) {
      let errorMessage = err.message || t("emailUpdateError");
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        errorMessage = t("enterCurrentPassword") || "Incorrect password.";
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use.";
      }
      showMessage(errorMessage, "error");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return showMessage(t("loginRequired"), "error");

    const { currentPassword, newPassword, repeatNewPassword } = passwordForm;
    if (!currentPassword) return showMessage(t("enterCurrentPassword"), "error");
    if (!newPassword || newPassword.length < 6) return showMessage(t("passwordTooShort"), "error");
    if (newPassword !== repeatNewPassword) return showMessage(t("passwordsDontMatch"), "error");
    if (!currentUser.email) return showMessage(t("passwordChangeNotAvailable"), "error");

    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, newPassword);
      await currentUser.reload();
      showMessage(t("passwordUpdateSuccess"), "success");
      setPasswordForm({ currentPassword: "", newPassword: "", repeatNewPassword: "" });
    } catch (err) {
      showMessage(t("passwordUpdateError") + " " + err.message, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="dashboard">
      <main className="dashboard-content">
        <div className="panel">
          <div className="section account-shell">
            <div className="account-header-section">
              <div className="account-header-content">
                <h2 className="account-page-title">👤 {t("account")}</h2>
                <p className="account-page-subtitle">{t("accountSubtitle")}</p>
              </div>
              <div className="account-header-actions">
                <button className="btn btn-ghost small" onClick={() => setSelectedTab("allListings")}>
                  🧭 {t("explore")}
                </button>
                <button className="btn small" onClick={() => setShowPostForm(true)}>
                  ➕ {t("submitListing")}
                </button>
              </div>
            </div>

            <div className="account-quick-stats">
              {[
                {
                  icon: "📁",
                  label: t("myListings"),
                  value: myListingsCount,
                  hint: `${myVerifiedCount} ${t("verified")}`,
                  color: "blue",
                },
                {
                  icon: "⭐",
                  label: t("favorites"),
                  value: favorites.length,
                  hint: t("reputation"),
                  color: "yellow",
                },
                {
                  icon: "📅",
                  label: t("memberSince"),
                  value: user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "—",
                  hint: t("accountSince"),
                  color: "purple",
                },
              ].map((stat) => (
                <div key={stat.label} className={`account-stat-card-enhanced stat-${stat.color}`}>
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-content">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                    {stat.hint && <p className="stat-note">{stat.hint}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="account-panels">
              <div className="account-column">
                <div className="card account-card-enhanced">
                  <div className="account-card-header">
                    <h3 className="account-card-title">📋 {t("profileInfo")}</h3>
                    <p className="account-card-subtitle">{t("accountDetails")}</p>
                  </div>

                  <div className="account-info-list">
                    <div className="account-info-item">
                      <div className="account-info-item-icon">✉️</div>
                      <div className="account-info-item-content">
                        <p className="account-info-label">{t("emailLabel")}</p>
                        <p className="account-info-value">{user?.email || "—"}</p>
                        {user?.emailVerified ? (
                          <span className="account-info-badge verified">✅ {t("verified")}</span>
                        ) : (
                          <span className="account-info-badge not-verified">⏳ {t("pendingVerification")}</span>
                        )}
                      </div>
                    </div>

                    <div className="account-info-item">
                      <div className="account-info-item-icon">📞</div>
                      <div className="account-info-item-content">
                        <p className="account-info-label">{t("phoneNumber")}</p>
                        <p className="account-info-value">
                          {accountPhone || (
                            <span className="account-info-placeholder">{t("addPhoneNumber")}</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="account-info-item">
                      <div className="account-info-item-icon">📅</div>
                      <div className="account-info-item-content">
                        <p className="account-info-label">{t("accountSince")}</p>
                        <p className="account-info-value">
                          {user?.metadata?.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
                            : "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!user?.emailVerified && (
                    <div className="account-alert-enhanced">
                      <div className="account-alert-icon">⚠️</div>
                      <div className="account-alert-content">
                        <p className="account-alert-title">{t("verifyYourEmail")}</p>
                        <p className="account-alert-sub">{t("verifyEmailHint")}</p>
                        <div className="account-alert-actions">
                          <button
                            className="btn btn-ghost small"
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card account-card-enhanced account-quick-links">
                  <div className="account-card-header">
                    <h3 className="account-card-title">⚡ {t("quickActions")}</h3>
                  </div>
                  <div className="account-quick-links-list">
                    <button className="account-quick-link-item" onClick={() => setSelectedTab("myListings")}>
                      <span className="quick-link-icon">📁</span>
                      <div className="quick-link-content">
                        <p className="quick-link-title">{t("myListings")}</p>
                        <p className="quick-link-subtitle">
                          {myListingsCount} {t("listingsLabel")}
                        </p>
                      </div>
                      <span className="quick-link-arrow">→</span>
                    </button>
                    <button className="account-quick-link-item" onClick={() => setSelectedTab("allListings")}>
                      <span className="quick-link-icon">🔍</span>
                      <div className="quick-link-content">
                        <p className="quick-link-title">{t("explore")}</p>
                        <p className="quick-link-subtitle">{t("browseListingsHint")}</p>
                      </div>
                      <span className="quick-link-arrow">→</span>
                    </button>
                    <button className="account-quick-link-item" onClick={() => setShowPostForm(true)}>
                      <span className="quick-link-icon">➕</span>
                      <div className="quick-link-content">
                        <p className="quick-link-title">{t("submitListing")}</p>
                        <p className="quick-link-subtitle">{t("createListingHint")}</p>
                      </div>
                      <span className="quick-link-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="account-column">
                <div className="card account-card-enhanced account-security-section">
                  <div className="account-card-header">
                    <h3 className="account-card-title">🔒 {t("securitySettings")}</h3>
                    <p className="account-card-subtitle">{t("securitySettingsText")}</p>
                  </div>

                  <div className="account-form-section">
                    <div className="account-form-section-header">
                      <h4 className="account-form-section-title">✉️ {t("changeEmail")}</h4>
                      <p className="account-form-section-desc">{t("updateEmailDesc")}</p>
                    </div>
                    <form className="account-form-enhanced" onSubmit={handleChangeEmail}>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("newEmail")}</label>
                        <input
                          type="email"
                          className="input account-form-input"
                          value={emailForm.newEmail}
                          onChange={(e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value }))}
                          placeholder={t("newEmailPlaceholder")}
                        />
                      </div>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("currentPassword")}</label>
                        <input
                          type="password"
                          className="input account-form-input"
                          value={emailForm.currentPassword}
                          onChange={(e) => setEmailForm((f) => ({ ...f, currentPassword: e.target.value }))}
                          placeholder={t("currentPasswordPlaceholder")}
                        />
                      </div>
                      <div className="account-form-actions">
                        <button type="submit" className="btn small" disabled={savingEmail}>
                          {savingEmail ? t("saving") : t("saveEmail")}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="account-form-divider"></div>

                  <div className="account-form-section">
                    <div className="account-form-section-header">
                      <h4 className="account-form-section-title">🔑 {t("changePassword")}</h4>
                      <p className="account-form-section-desc">{t("securitySettings") || "Update your password"}</p>
                    </div>
                    <form className="account-form-enhanced" onSubmit={handleChangePassword}>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("currentPassword")}</label>
                        <input
                          type="password"
                          className="input account-form-input"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))}
                          placeholder={t("currentPasswordPlaceholder")}
                        />
                      </div>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("newPassword")}</label>
                        <input
                          type="password"
                          className="input account-form-input"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))}
                          placeholder={t("newPasswordPlaceholder")}
                        />
                      </div>
                      <div className="account-form-field">
                        <label className="account-form-label">{t("repeatNewPassword")}</label>
                        <input
                          type="password"
                          className="input account-form-input"
                          value={passwordForm.repeatNewPassword}
                          onChange={(e) => setPasswordForm((f) => ({ ...f, repeatNewPassword: e.target.value }))}
                          placeholder={t("repeatNewPasswordPlaceholder")}
                        />
                      </div>
                      <div className="account-form-actions">
                        <button type="submit" className="btn small" disabled={savingPassword}>
                          {savingPassword ? t("saving") : t("savePassword")}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
