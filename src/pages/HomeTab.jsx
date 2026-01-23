import React, { useRef } from 'react';

export default function HomeTab({
  t,
  setShowPostForm,
  setForm,
  setSelectedTab,
  featuredCategories,
  categoryIcons,
  mkSpotlightCities,
  activeListingCount,
  verifiedListingCount,
  verifiedListings = [],
  favorites = [],
  toggleFav,
  handleSelectListing,
  handleShareListing,
  showMessage,
  getDescriptionPreview,
  getListingStats,
  ListingCard,
  setCatFilter,
  setLocFilter
}) {
  const featuredListings = verifiedListings.filter(l => l.isFeatured);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 360; // Approx card width + gap
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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
        <p style={{ marginTop: "1rem", fontSize: "0.8rem", opacity: 0.8 }}>
          💡 {t("homeSimpleTrustLine")}
        </p>
      </section>

      {/* FEATURED LISTINGS - HORIZONTAL SCROLL (COMPACT) */}
      {featuredListings.length > 0 && (
        <section className="compact-section" style={{ marginBottom: '1.5rem', background: 'linear-gradient(to right, #f8fafc, #ffffff)', padding: '12px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
          <div className="section-header-compact" style={{ padding: '0 4px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span style={{ fontSize: '1.2rem' }}>🔥</span>
               <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{t("featured") || "Featured"}</h3>
             </div>
             <div className="scroll-controls">
               <button className="scroll-arrow-btn" onClick={() => scroll('left')} aria-label="Scroll left">‹</button>
               <button className="scroll-arrow-btn" onClick={() => scroll('right')} aria-label="Scroll right">›</button>
             </div>
          </div>
          <div className="horizontal-scroll-row" ref={scrollRef} style={{ paddingBottom: '12px' }}>
            {featuredListings.map(l => (
              <div key={l.id} style={{ flex: '0 0 320px', width: '320px', maxWidth: '85vw' }}>
                <ListingCard
                  listing={l}
                  t={t}
                  categoryIcons={categoryIcons}
                  getDescriptionPreview={getDescriptionPreview}
                  getListingStats={getListingStats}
                  onSelect={handleSelectListing}
                  onShare={handleShareListing}
                  showMessage={showMessage}
                  toggleFav={toggleFav}
                  isFavorite={favorites.includes(l.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* COMPACT GRID */}
      <div className="compact-grid">
        {/* CARD 1: POPULAR CATEGORIES (Horizontal Scroll) */}
        <div className="compact-card full-width">
          <h3>🎯 {t("homePopularCategoriesTitle")}</h3>
          <div className="horizontal-scroll-row">
            {featuredCategories.map((cat) => (
              <button
                key={cat}
                className="compact-chip"
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

        {/* CARD 2: POPULAR CITIES (Horizontal Scroll) */}
        <div className="compact-card">
          <h3>📍 {t("homePopularCitiesTitle")}</h3>
          <div className="horizontal-scroll-row">
            {mkSpotlightCities.slice(0, 8).map((city) => (
              <button
                key={city}
                className="compact-chip"
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

        {/* CARD 3: HOW IT WORKS (Compact Steps) */}
        <div className="compact-card">
          <h3>✨ {t("homeHowItWorksTitle")}</h3>
          <div className="compact-steps">
            {[1, 2, 3].map((step) => (
              <div key={step} className="compact-step">
                <div className="step-circle">{step}</div>
                <p className="step-text">
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
