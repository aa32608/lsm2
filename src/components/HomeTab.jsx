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

  return (
    <div className="app-main-content">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">{t("homeSimpleTitle")}</h1>
          <p className="hero-subtitle">{t("homeSimpleSubtitle")}</p>
          
          <div className="flex gap-4 justify-center" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
            <Link
              href="/listings"
              className="btn btn-secondary"
            >
              🔍 {t("homeSimpleCtaBrowse")}
            </Link>
          </div>
          
          <p className="text-sm text-muted mt-4">
            💡 {t("homeSimpleTrustLine")}
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <div className="text-center mb-6">
          <h3 className="text-h2">✨ {t("homeHowItWorksTitle")}</h3>
        </div>
        
        <div className="steps-grid">
          {[1, 2, 3].map((step) => (
            <div key={step} className="step-card">
              <div className="step-number">{step}</div>
              <p className="text-body">
                {step === 1
                  ? t("homeHowItWorksStep1")
                  : step === 2
                  ? t("homeHowItWorksStep2")
                  : t("homeHowItWorksStep3")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container" style={{ marginBottom: '3rem' }}>
        <div className="card">
          <div className="text-center mb-6">
            <h3 className="text-h2">🎯 {t("homePopularCategoriesTitle")}</h3>
          </div>
          
          <div className="categories-grid">
            {Object.keys(categoryIcons).map((cat) => (
              <button
                key={cat}
                className="category-chip"
                onClick={() => {
                  setCatFilter(t(cat));
                  router.push('/listings');
                }}
              >
                <span>{categoryIcons[cat]}</span>
                <span>{t(cat)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
