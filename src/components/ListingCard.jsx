"use client";
import React, { useState } from "react";
import Link from "next/link";

const ListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons,
  getDescriptionPreview,
  getListingStats,
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
    <Link
      href={`/listings/${l.id}`}
      className={`card ${className}`}
      style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
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
                <button 
                  className="carousel-btn prev" 
                  onClick={handlePrev}
                >‹</button>
                <button 
                  className="carousel-btn next" 
                  onClick={handleNext}
                >›</button>
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
           <span className="pill" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', fontWeight: 'bold' }}>✓ {t("verified")}</span>
        </div>
      </div>

      <div className="listing-card-content">
        <div style={{ marginBottom: '8px' }}>
          <h3 className="listing-card-title">{l.name}</h3>
          <div className="listing-card-meta">
             <span className="pill pill-category">{t(l.category) || l.category}</span>
             <span className="pill pill-location">📍 {l.location || t("unspecified")}</span>
          </div>
        </div>

        <p className="listing-card-description">
          {getDescriptionPreview(l.description, 30)}
        </p>

        <div className="listing-card-footer">
          <span className="listing-stat highlight">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
          <span className="listing-stat" style={{ color: 'var(--text-muted)' }}>💬 {stats.feedbackCount}</span>
          <span className="listing-stat" style={{ color: 'var(--text-muted)' }}>🔥 {stats.engagement}</span>
        </div>
      </div>
    </Link>
  );
});

export default ListingCard;
