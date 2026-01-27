"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';

export default function HomeTab() {
  const {
    t,
    user,
    setShowPostForm,
    setShowAuthModal,
    setAuthMode,
    setForm,
    categoryIcons,
    setCatFilter,
    activeListingCount,
    verifiedListingCount,
    publicListings,
  } = useApp();
  
  const router = useRouter();

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
    setCatFilter(t(cat));
    router.push('/listings');
  };

  return (
    <div className="app-main-content">
      {/* HERO SECTION */}
      <section 
        className="hero-section" 
        aria-labelledby="hero-title"
      >
        <div className="container">
          <h1 id="hero-title" className="hero-title">
            {t("homeSimpleTitle")}
          </h1>
          <p className="hero-subtitle">
            {t("homeSimpleSubtitle")}
          </p>
          
          <div className="hero-actions" role="group" aria-label="Main actions">
            <button
              className="btn btn-primary hero-btn-primary"
              onClick={handlePostClick}
              aria-label={t("homeSimpleCtaPost")}
            >
              <span className="btn-icon" aria-hidden="true">📝</span>
              <span>{t("homeSimpleCtaPost")}</span>
            </button>
            <Link
              href="/listings"
              className="btn btn-secondary hero-btn-secondary"
              aria-label={t("homeSimpleCtaBrowse")}
            >
              <span className="btn-icon" aria-hidden="true">🔍</span>
              <span>{t("homeSimpleCtaBrowse")}</span>
            </Link>
          </div>
          
          <p className="hero-trust-line" role="note">
            <span className="trust-icon" aria-hidden="true">💡</span>
            {t("homeSimpleTrustLine")}
          </p>
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
                <div className="step-number" aria-label={`Step ${step}`}>
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
                <div className="stat-label">{t("activeListings") || "Active Listings"}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">✓</div>
              <div className="stat-content">
                <div className="stat-value">{verifiedListingCount || 0}</div>
                <div className="stat-label">{t("verifiedListings") || "Verified Listings"}</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon" aria-hidden="true">👥</div>
              <div className="stat-content">
                <div className="stat-value">{publicListings?.length || 0}</div>
                <div className="stat-label">{t("publicListings") || "Public Listings"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Moved before Categories */}
      <section 
        className="features-section" 
        aria-labelledby="features-title"
      >
        <div className="container">
          <div className="section-header">
            <h2 id="features-title" className="section-title">
              <span className="section-icon" aria-hidden="true">🌟</span>
              {t("whyChooseUs") || "Why Choose BizCall MK?"}
            </h2>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">🔒</div>
              <h3 className="feature-title">{t("verifiedListings") || "Verified Listings"}</h3>
              <p className="feature-description">
                {t("verifiedListingsDesc") || "All listings are verified for authenticity and trustworthiness."}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">💰</div>
              <h3 className="feature-title">{t("noCommissions") || "No Commissions"}</h3>
              <p className="feature-description">
                {t("noCommissionsDesc") || "Connect directly with service providers. No middleman, no fees."}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">📱</div>
              <h3 className="feature-title">{t("easyContact") || "Easy Contact"}</h3>
              <p className="feature-description">
                {t("easyContactDesc") || "Contact listings directly via phone, WhatsApp, or email."}
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon" aria-hidden="true">⭐</div>
              <h3 className="feature-title">{t("ratingsReviews") || "Ratings & Reviews"}</h3>
              <p className="feature-description">
                {t("ratingsReviewsDesc") || "Read reviews from real users to make informed decisions."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section 
        className="categories-section" 
        aria-labelledby="categories-title"
      >
        <div className="container">
          <div className="categories-card card">
            <div className="section-header">
              <h2 id="categories-title" className="section-title">
                <span className="section-icon" aria-hidden="true">🎯</span>
                {t("homePopularCategoriesTitle")}
              </h2>
            </div>
            
            <div 
              className="categories-grid" 
              role="list"
              aria-label="Popular categories"
            >
              {Object.keys(categoryIcons).map((cat) => (
                <button
                  key={cat}
                  className="category-chip"
                  onClick={() => handleCategoryClick(cat)}
                  aria-label={`Browse ${t(cat)} category`}
                  type="button"
                >
                  <span className="category-icon" aria-hidden="true">
                    {categoryIcons[cat]}
                  </span>
                  <span className="category-name">{t(cat)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
