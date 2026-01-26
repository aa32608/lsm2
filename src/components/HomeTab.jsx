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
