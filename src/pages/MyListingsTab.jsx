export default function AccountTab({
  t,
  user,
  logout,
  setLanguage,
  language,
  verifiedListingCount,
  activeListingCount,
}) {
  return (
    <div className="section account-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title-inner">👤 {t("account")}</h2>
          <p className="section-subtitle-small">
            {t("accountSubtitle")}
          </p>
        </div>
      </div>

      {/* USER CARD */}
      <div className="account-card">
        <p>
          <strong>{t("email")}:</strong> {user?.email}
        </p>

        <div className="account-stats">
          <div>
            <span className="stat-value blue">{activeListingCount}</span>
            <span className="stat-label">{t("listingsLabel")}</span>
          </div>
          <div>
            <span className="stat-value green">{verifiedListingCount}</span>
            <span className="stat-label">{t("verified")}</span>
          </div>
        </div>
      </div>

      {/* LANGUAGE */}
      <div className="account-card">
        <h3>🌐 {t("language")}</h3>
        <select
          className="select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="mk">Македонски</option>
          <option value="sq">Shqip</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* LOGOUT */}
      <div className="account-card">
        <button className="btn btn-danger" onClick={logout}>
          🚪 {t("logout")}
        </button>
      </div>
    </div>
  );
}
