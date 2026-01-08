import React from 'react';
import { categoryIcons, featuredCategories, mkSpotlightCities } from '../utils/constants';

const HomePage = ({ 
  t, 
  setSelectedTab, 
  setShowPostForm,
  setForm,
  setCatFilter,
  setLocFilter,
  listings,
  user
}) => {
  const activeListingCount = listings.length;
  const verifiedListingCount = listings.filter((l) => l.status === "verified").length;

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
          <button className="btn btn-outline" onClick={() => setSelectedTab("allListings")}>
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
                  setCatFilter(t(cat));
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
                  setLocFilter(city);
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
        <h3>📊 {t("homeDigest") || "Live snapshot"}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <p className="stat-value blue">{activeListingCount}</p>
            <p className="stat-label">{t("listingsLabel") || "Active"}</p>
          </div>
          <div className="stat-item">
            <p className="stat-value green">{verifiedListingCount}</p>
            <p className="stat-label">{t("verified") || "Verified"}</p>
          </div>
          <div className="stat-item">
            <p className="stat-value purple">{mkSpotlightCities.length}</p>
            <p className="stat-label">{t("cities") || "Cities"}</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      {user && (
        <section className="home-feature-grid">
          <div className="card feature-card feature-card--primary">
            <div className="feature-card__head">
              <p className="eyebrow subtle">{t("getStartedFast")}</p>
              <h2 className="section-title">✨ {t("heroTitle")}</h2>
              <p className="section-subtitle-small">{t("spotlightHintHero")}</p>
            </div>
            <div className="feature-points">
              <div className="feature-point">
                <div className="feature-icon">🚀</div>
                <div>
                  <h4>{t("submitListing")}</h4>
                  <p>{t("submitListingDesc")}</p>
                </div>
              </div>
              <div className="feature-point">
                <div className="feature-icon">🧭</div>
                <div>
                  <h4>{t("explore")}</h4>
                  <p>{t("exploreHint")}</p>
                </div>
              </div>
              <div className="feature-point">
                <div className="feature-icon">🛡️</div>
                <div>
                  <h4>{t("verified")}</h4>
                  <p>{t("verifiedHint")}</p>
                </div>
              </div>
            </div>
            <div className="feature-actions">
              <button className="btn" onClick={() => setSelectedTab("allListings")}>
                🔍 {t("browseMarketplace")}
              </button>
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setShowPostForm(true);
                  setForm((f) => ({ ...f, step: 1 }));
                }}
              >
                ➕ {t("postService")}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
