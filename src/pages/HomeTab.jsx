export default function HomeTab({
  t,
  setShowPostForm,
  setForm,
  setSelectedTab,
  featuredCategories,
  categoryIcons,
  mkSpotlightCities,
  activeListingCount,
  verifiedListingCount
}) {
  return (
    <div className="app-main-content">
      {/* HERO SECTION */}
      <section className="home-hero-simple">
        <h1 className="hero-simple-title">{t("homeSimpleTitle")}</h1>
        <p className="hero-simple-subtitle">{t("homeSimpleSubtitle")}</p>
        <div className="hero-simple-ctas">
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowPostForm(true);
              setForm((f) => ({ ...f, step: 1 }));
            }}
          >
            📝 {t("homeSimpleCtaPost")}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => setSelectedTab("allListings")}
          >
            🔍 {t("homeSimpleCtaBrowse")}
          </button>
        </div>
        <p style={{ marginTop: "12px", fontSize: "0.85rem", opacity: 0.9 }}>
          💡 {t("homeSimpleTrustLine")}
        </p>
      </section>

      {/* THREE CARDS */}
      <div className="home-main-grid">
        {/* CARD 1: POPULAR CATEGORIES */}
        <div className="simple-card">
          <h3>🎯 {t("homePopularCategoriesTitle")}</h3>
          <div className="simple-chip-row">
            {featuredCategories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                className="simple-chip"
                onClick={() => {
                  setSelectedTab("allListings");
                }}
              >
                {categoryIcons[cat]} {t(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 2: POPULAR CITIES */}
        <div className="simple-card">
          <h3>📍 {t("homePopularCitiesTitle")}</h3>
          <div className="simple-chip-row">
            {mkSpotlightCities.slice(0, 6).map((city) => (
              <button
                key={city}
                className="simple-chip"
                onClick={() => {
                  setSelectedTab("allListings");
                }}
              >
                📍 {city}
              </button>
            ))}
          </div>
        </div>

        {/* CARD 3: HOW IT WORKS */}
        <div className="simple-card">
          <h3>✨ {t("homeHowItWorksTitle")}</h3>
          <div className="how-it-works-steps">
            {[1, 2, 3].map((step) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div className="step-number">{step}</div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    margin: "8px 0",
                    color: "#475569",
                    lineHeight: "1.4",
                  }}
                >
                  {step === 1
                    ? t("homeHowItWorksStep1")
                    : step === 2
                    ? t("homeHowItWorksStep2")
                    : t("homeHowItWorksStep3")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <section className="stats-section">
        <h3>📊 {t("homeDigest")}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-value blue">{activeListingCount}</p>
            <p className="stat-label">{t("listingsLabel")}</p>
          </div>
          <div className="stat-item">
            <p className="stat-value green">{verifiedListingCount}</p>
            <p className="stat-label">{t("verified")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
