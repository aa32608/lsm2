"use client";
import React, { useState } from "react";

// import Link from "next/link";

const ListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons,
  getDescriptionPreview,
  getListingStats,
  onShare,
  onSelect,
  className = "",
}) => {
  const stats = getListingStats(l);
  const [imgIndex, setImgIndex] = useState(0);

  // Determine images to display
  const images = l.images && l.images.length > 0 
    ? l.images 
    : (l.imagePreview ? [l.imagePreview] : []);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        if (onSelect) {
          onSelect(l);
          if (typeof window !== 'undefined') {
             window.history.pushState({ listingId: l.id }, '', `/listings/${l.id}`);
          }
        }
      }}
      className={`listing-card explore-card-modern ${className}`}
    >
      <div className="listing-card-image-container">
        {images.length > 0 ? (
          <>
            <img 
              src={images[imgIndex]} 
              alt={`${l.name}`} 
              className="listing-card-image"
              loading="lazy"
            />
            {images.length > 1 && (
              <>
                <button className="carousel-btn prev" onClick={handlePrev}>‹</button>
                <button className="carousel-btn next" onClick={handleNext}>›</button>
                <div className="carousel-dots">
                  {images.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`carousel-dot ${idx === imgIndex ? 'active' : ''}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="listing-card-placeholder">
            {categoryIcons[l.category] || "🏷️"}
          </div>
        )}
        
        <div className="listing-card-badges">
           <div style={{ display: 'flex', gap: '6px' }}>
             {l.offerprice && <span className="pill pill-price">{l.offerprice}</span>}
           </div>
           <span className="badge verified">✓ {t("verified")}</span>
        </div>
      </div>

      <div className="listing-info-column">
        <div className="listing-card-content">
          <div style={{ marginBottom: '8px' }}>
            <h3 className="listing-title">{l.name}</h3>
            <div className="listing-meta pill-row-tight">
               <span className="pill pill-category">{t(l.category) || l.category}</span>
               <span className="pill pill-location">📍 {l.location || t("unspecified")}</span>
            </div>
          </div>

          <p className="listing-description listing-description-preview">
            {getDescriptionPreview(l.description, 30)}
          </p>

          <div className="listing-stats spaced">
            <span className="stat-chip rating">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
            <span className="stat-chip">💬 {stats.feedbackCount}</span>
            <span className="stat-chip subtle">🔥 {stats.engagement}</span>
          </div>
        </div>

        <div className="listing-footer-row" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
          <div className="listing-footer-left">
            {l.contact && (
              <span className="pill pill-contact ghost-pill">
                📞 {l.contact}
              </span>
            )}
          </div>

          <div className="listing-actions compact">
            {l.contact && (
              <button
                className="icon-btn"
                type="button"
                onClick={() => window.open(`tel:${l.contact}`)}
                aria-label={t("callAction")}
              >
                📞
              </button>
            )}
            <button
              className="icon-btn"
              type="button"
              onClick={() => window.open(
                `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                  l.name || ""
                )}`
              )}
              aria-label={t("emailAction")}
            >
              ✉️
            </button>
            <button
              className="icon-btn"
              type="button"
              onClick={() => onShare && typeof onShare === 'function' && onShare(l)}
              aria-label={t("share")}
            >
              🔗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ListingCard;
