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

      {/* FEATURED LISTINGS - HORIZONTAL SCROLL (ENHANCED) */}
      {featuredListings.length > 0 && (
        <section className="featured-section-home">
          <div className="section-header-row">
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <span className="section-icon-large">🔥</span>
               <div>
                 <h3 className="section-title-large">{t("featured") || "Featured"}</h3>
                 <p className="section-subtitle">{t("featuredSubtitle") || "Top rated services chosen for you"}</p>
               </div>
             </div>
             <div className="scroll-controls">
               <button className="scroll-arrow-btn" onClick={() => scroll('left')} aria-label="Scroll left">‹</button>
               <button className="scroll-arrow-btn" onClick={() => scroll('right')} aria-label="Scroll right">›</button>
             </div>
          </div>
          <div className="horizontal-scroll-row expanded-scroll" ref={scrollRef}>
            {featuredListings.map(l => (
              <div key={l.id} className="featured-card-wrapper-home">
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

      {/* CATEGORIES & CITIES GRID */}
      <div className="discovery-grid">
        {/* POPULAR CATEGORIES */}
        <div className="discovery-card">
          <div className="discovery-header">
            <h3>🎯 {t("homePopularCategoriesTitle")}</h3>
          </div>
          <div className="discovery-chips-grid">
            {featuredCategories.map((cat) => (
              <button
                key={cat}
                className="discovery-chip"
                onClick={() => {
                  setCatFilter(t(cat));
                  setSelectedTab("allListings");
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

      {/* HOW IT WORKS (Full Width) */}
      <div className="how-it-works-section">
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
