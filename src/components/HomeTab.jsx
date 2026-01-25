"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function HomeTab() {
  const router = useRouter();
  const {
    t,
    user,
    setShowPostForm,
    setShowAuthModal,
    setAuthMode,
    setForm,
    setSelectedTab,
    categoryIcons,
    mkSpotlightCities,
    activeListingCount,
    verifiedListingCount,
    verifiedListings,
    favorites,
    toggleFav,
    handleSelectListing,
    handleShareListing,
    showMessage,
    getDescriptionPreview,
    getListingStats,
    setCatFilter,
    setLocFilter
  } = useApp();

  return (
    <div className="app-main-content">
      {/* HERO SECTION - COMPACT */}
      <section className="home-hero-compact">
        <h1>{t("homeSimpleTitle")}</h1>
        <p>{t("homeSimpleSubtitle")}</p>
        <div className="hero-simple-ctas" style={{ justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              if (!user) {
                setAuthMode("login");
                setShowAuthModal(true);
              } else {
                setShowPostForm(true);
                setForm((f) => ({ ...f, step: 1 }));
              }
            }}
          >
            📝 {t("homeSimpleCtaPost")}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => router.push('/listings')}
          >
            🔍 {t("homeSimpleCtaBrowse")}
          </button>
        </div>
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.8 }}>
          💡 {t("homeSimpleTrustLine")}
        </p>
      </section>

      {/* HOW IT WORKS (Moved to Top) */}
      <div className="how-it-works-section" style={{ marginTop: '2rem' }}>
          <h3>✨ {t("homeHowItWorksTitle")}</h3>
          <div className="steps-row">
            {[1, 2, 3].map((step) => (
              <div key={step} className="step-card">
                <div className="step-number">{step}</div>
                <p className="step-desc">
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

      {/* CATEGORIES & CITIES GRID */}
      <div className="discovery-grid">
        {/* POPULAR CATEGORIES */}
        <div className="discovery-card">
          <div className="discovery-header">
            <h3>🎯 {t("homePopularCategoriesTitle")}</h3>
          </div>
          <div className="discovery-chips-grid">
            {Object.keys(categoryIcons).map((cat) => (
              <button
                key={cat}
                className="discovery-chip"
                onClick={() => {
                  setCatFilter(t(cat));
                  router.push('/listings');
                }}
              >
                <span className="chip-icon">{categoryIcons[cat]}</span>
                <span className="chip-label">{t(cat)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* POPULAR CITIES (Redesigned) */}
        <div className="discovery-card">
          <div className="discovery-header">
            <h3>📍 {t("homePopularCitiesTitle")}</h3>
          </div>
          <div className="cities-grid">
            {mkSpotlightCities.slice(0, 9).map((city) => (
              <button
                key={city}
                className="city-tile"
                onClick={() => {
                  setLocFilter(city);
                  setSelectedTab("allListings");
                }}
              >
                <span className="city-icon">🏙️</span>
                <span className="city-name">{city}</span>
              </button>
            ))}
          </div>
        </div>
      </div>


      {/* QUICK STATS */}
      <section className="stats-section" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', opacity: 0.8, marginBottom: '0.5rem' }}>📊 {t("homeDigest")}</h3>
        <div className="stats-grid" style={{ gap: '0.5rem' }}>
          <div className="stat-item" style={{ padding: '0.75rem' }}>
            <p className="stat-value blue" style={{ fontSize: '1.25rem' }}>{activeListingCount}</p>
            <p className="stat-label" style={{ fontSize: '0.8rem' }}>{t("listingsLabel")}</p>
          </div>
          <div className="stat-item" style={{ padding: '0.75rem' }}>
            <p className="stat-value green" style={{ fontSize: '1.25rem' }}>{verifiedListingCount}</p>
            <p className="stat-label" style={{ fontSize: '0.8rem' }}>{t("verified")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
