"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

const API_BASE = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://lsm-wozo.onrender.com";

export default function HomeTab() {
  const {
    t,
    user,
    setShowPostForm,
    setShowAuthModal,
    setAuthMode,
    setForm,
    categoryIcons,
    categoryGroups,
    setCatFilter,
    activeListingCount,
    verifiedListingCount,
    publicListings,
  } = useApp();

  const [aggregateStats, setAggregateStats] = useState({
    totalViews: 0,
    totalContacts: 0,
    totalByPhone: 0,
    totalByEmail: 0,
    totalByWhatsapp: 0,
    top5Featured: [],
  });

  const router = useRouter();

  useEffect(() => {
    const fetchStats = () => {
      fetch(`${API_BASE}/api/listing-stats-aggregate`)
        .then((res) => res.json())
        .then((data) => setAggregateStats((prev) => ({ ...prev, ...data, top5Featured: data.top5Featured || prev.top5Featured || [] })))
        .catch(() => {});
    };
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const handlePostClick = () => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
    } else {
      setShowPostForm(true);
      setForm((f) => ({ ...f, step: 1 }));
    }
  };

  const handleCategoryClick = (cat) => {
    setCatFilter(cat);
    router.push('/listings');
  };

  // Compact: 3 categories per group for homepage (short, scannable)
  const categoriesPerGroup = 3;

  return (
    <div className="app-main-content home-page">
      {/* HERO SECTION */}
      <section 
        className="hero-section hero-section--home" 
        aria-labelledby="hero-title"
      >
        <div className="container hero-container">
          <h1 id="hero-title" className="hero-title hero-title--home">
            {t("homeSimpleTitle")}
          </h1>
          <p className="hero-subtitle hero-subtitle--home">
            {t("homeSimpleSubtitle")}
          </p>
          
          <div className="hero-actions hero-actions--home" role="group" aria-label={t("mainActions")}>
            <button
              className="btn btn-primary hero-btn-primary"
              onClick={handlePostClick}
              aria-label={t("getMoreCallsForBusiness")}
            >
              <span className="btn-icon" aria-hidden="true">📝</span>
              <span className="btn-text">{t("getMoreCallsForBusiness")}</span>
            </button>
            <Link
              href="/listings"
              className="btn btn-secondary hero-btn-secondary"
              aria-label={t("getVisibleToLocalCustomers")}
            >
              <span className="btn-icon" aria-hidden="true">🔍</span>
              <span className="btn-text">{t("getVisibleToLocalCustomers")}</span>
            </Link>
          </div>
          
          <p className="hero-trust-line" role="note">
            <span className="trust-icon" aria-hidden="true">💡</span>
            {t("homeSimpleTrustLine")}
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF: Local Businesses Joining BizCall */}
      <section className="social-proof-section" aria-labelledby="social-proof-title">
        <div className="container social-proof-container">
          <h2 id="social-proof-title" className="section-title social-proof-title">
            {t("localBusinessesJoiningBizCall")}
          </h2>
          <div className="social-proof-stats">
            <div className="social-proof-stat">
              <span className="social-proof-value">{aggregateStats.totalViews?.toLocaleString?.() ?? aggregateStats.totalViews ?? 0}</span>
              <span className="social-proof-label">{t("overViews").replace("{{count}}", aggregateStats.totalViews != null ? String(aggregateStats.totalViews) : "0")}</span>
            </div>
            <div className="social-proof-stat">
              <span className="social-proof-value">{aggregateStats.totalContacts?.toLocaleString?.() ?? aggregateStats.totalContacts ?? 0}</span>
              <span className="social-proof-label">{t("overContactAttempts").replace("{{count}}", aggregateStats.totalContacts != null ? String(aggregateStats.totalContacts) : "0")}</span>
            </div>
            {(aggregateStats.totalByPhone > 0 || aggregateStats.totalByEmail > 0 || aggregateStats.totalByWhatsapp > 0) && (
              <div className="social-proof-breakdown">
                {aggregateStats.totalByPhone > 0 && <span>📞 {aggregateStats.totalByPhone} {t("contactByPhone")}</span>}
                {aggregateStats.totalByEmail > 0 && <span>✉️ {aggregateStats.totalByEmail} {t("contactByEmail")}</span>}
                {aggregateStats.totalByWhatsapp > 0 && <span>💬 {aggregateStats.totalByWhatsapp} {t("contactByWhatsapp")}</span>}
              </div>
            )}
          </div>

          {/* Top 5 featured listings + analytics chart (real-time) */}
          {(aggregateStats.top5Featured?.length ?? 0) > 0 && (
            <div className="top-featured-section" aria-labelledby="top-featured-title">
              <h2 id="top-featured-title" className="section-title top-featured-title">
                {t("homeTopFeaturedTitle")}
              </h2>
              <p className="top-featured-subtitle">{t("homeTopFeaturedSubtitle")}</p>
              <div className="top-featured-layout">
                <ul className="top-featured-list" role="list">
                  {aggregateStats.top5Featured.map((item, idx) => (
                    <li key={item.id} className="top-featured-item">
                      <div className="top-featured-item-main">
                        <span className="top-featured-item-name">{item.name || t("listing")}</span>
                        <span className="top-featured-item-meta">
                          {t(item.category) || item.category} {item.city ? `• ${item.city}` : item.location ? `• ${item.location}` : ""}
                        </span>
                        <span className="top-featured-item-stats">
                          👁 {item.views ?? 0} · 📞 {item.contacts ?? 0}
                        </span>
                      </div>
                      <Link
                        href={`/listings/${item.id}`}
                        className="btn btn-primary btn-sm top-featured-view-btn"
                        aria-label={`${t("view")} ${item.name}`}
                      >
                        {t("view")}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="top-featured-chart" role="img" aria-label={t("homeTopFeaturedSubtitle")}>
                  {(() => {
                    const maxVal = Math.max(1, ...aggregateStats.top5Featured.map((x) => (x.views || 0) + (x.contacts || 0)));
                    return aggregateStats.top5Featured.map((item, idx) => {
                      const total = (item.views || 0) + (item.contacts || 0);
                      const pct = maxVal > 0 ? (total / maxVal) * 100 : 0;
                      return (
                        <div key={item.id} className="top-featured-chart-bar-wrap">
                          <span className="top-featured-chart-label" title={item.name}>
                            {item.name?.slice(0, 20) || `#${idx + 1}`}{item.name?.length > 20 ? "…" : ""}
                          </span>
                          <div className="top-featured-chart-bar-bg">
                            <div
                              className="top-featured-chart-bar"
                              style={{ width: `${pct}%` }}
                              title={`${item.views ?? 0} views, ${item.contacts ?? 0} contacts`}
                            />
                          </div>
                          <span className="top-featured-chart-value">{total}</span>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section 
        className="how-it-works-section" 
        aria-labelledby="how-it-works-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="how-it-works-title" className="section-title">
              <span className="section-icon" aria-hidden="true">✨</span>
              {t("homeHowItWorksTitle")}
            </h2>
          </div>
          
          <div className="steps-grid" role="list">
            {[1, 2, 3].map((step) => (
              <article 
                key={step} 
                className="step-card"
                role="listitem"
              >
                <div className="step-number" aria-label={`${t("step")} ${step}`}>
                  {step}
                </div>
                <p className="step-description">
                  {step === 1
                    ? t("homeHowItWorksStep1")
                    : step === 2
                    ? t("homeHowItWorksStep2")
                    : t("homeHowItWorksStep3")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section 
        className="stats-section" 
        aria-labelledby="stats-title"
      >
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">📋</div>
              <div className="stat-content">
                <div className="stat-value">{activeListingCount || 0}</div>
                <div className="stat-label">{t("activeListings")}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">✓</div>
              <div className="stat-content">
                <div className="stat-value">{verifiedListingCount || 0}</div>
                <div className="stat-label">{t("verifiedListings")}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">👥</div>
              <div className="stat-content">
                <div className="stat-value">{publicListings?.length || 0}</div>
                <div className="stat-label">{t("publicListings")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS + FEATURES */}
      <section 
        className="features-section" 
        aria-labelledby="features-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="features-title" className="section-title">
              <span className="section-icon" aria-hidden="true">🌟</span>
              {t("whyChooseUs")}
            </h2>
          </div>
          
          <div className="trust-signals-grid">
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">💰</span>
              <span className="trust-signal-text">{t("trustNoCommissions")}</span>
            </div>
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">📞</span>
              <span className="trust-signal-text">{t("trustDirectContact")}</span>
            </div>
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">↩️</span>
              <span className="trust-signal-text">{t("trustCancelAnytime")}</span>
            </div>
            <div className="trust-signal-card">
              <span className="trust-signal-icon" aria-hidden="true">🇲🇰</span>
              <span className="trust-signal-text">{t("trustLocalPlatform")}</span>
            </div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔒</div>
              <h3 className="feature-title">{t("verifiedListings")}</h3>
              <p className="feature-description">
                {t("verifiedListingsDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">💰</div>
              <h3 className="feature-title">{t("noCommissions")}</h3>
              <p className="feature-description">
                {t("noCommissionsDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📱</div>
              <h3 className="feature-title">{t("easyContact")}</h3>
              <p className="feature-description">
                {t("easyContactDesc")}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">⭐</div>
              <h3 className="feature-title">{t("ratingsReviews")}</h3>
              <p className="feature-description">
                {t("ratingsReviewsDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES – compact by group */}
      <section 
        className="categories-section categories-section--compact" 
        aria-labelledby="categories-title"
      >
        <div className="container">
          <div className="categories-card card">
            <div className="section-header section-header--compact categories-header-row">
              <h2 id="categories-title" className="section-title section-title--compact">
                <span className="section-icon" aria-hidden="true">🎯</span>
                {t("homePopularCategoriesTitle")}
              </h2>
              <Link
                href="/listings"
                className="categories-browse-all"
                aria-label={t("browseAllCategories") || t("browse")}
              >
                {t("browseAllCategories") || t("browse")} →
              </Link>
            </div>
            
            <div 
              className="categories-by-group" 
              role="list"
              aria-label={t("popularCategories") || t("homePopularCategoriesTitle")}
            >
              {(categoryGroups || []).map((group) => (
                <div key={group.id} className="categories-group-block" role="listitem">
                  <span className="categories-group-label">{t(group.labelKey)}</span>
                  <div className="categories-group-chips">
                    {(group.categories || []).slice(0, categoriesPerGroup).map((cat) => (
                      <button
                        key={cat}
                        className="category-chip category-chip--compact"
                        onClick={() => handleCategoryClick(cat)}
                        aria-label={`${t("browse")} ${t(cat)} ${t("category")}`}
                        type="button"
                      >
                        <span className="category-icon" aria-hidden="true">
                          {categoryIcons?.[cat] ?? "🏷️"}
                        </span>
                        <span className="category-name">{t(cat) || cat}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
