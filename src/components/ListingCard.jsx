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
  onShare,
  showMessage,
  toggleFav,
  isFavorite,
}) => {
  const stats = getListingStats ? getListingStats(l) : { avgRating: 0, feedbackCount: 0, engagement: 0 };
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

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (toggleFav) {
      toggleFav(l.id);
    }
  };

  const handleShareClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare();
    }
  };

  const isHorizontal = className.includes('horizontal');

  // Get description preview
  const descriptionPreview = getDescriptionPreview 
    ? getDescriptionPreview(l.description || "")
    : (l.description && l.description.length > 100 
        ? l.description.substring(0, 100) + "..." 
        : l.description || "");

  // Ensure ID is valid
  if (!l) {
    return null;
  }

  // Get ID from listing object (could be l.id or the key from Firebase)
  const listingId = l.id || l.key || null;
  
  if (!listingId) {
    console.warn("ListingCard: Missing listing ID", l);
    return null;
  }

  // Ensure ID is a string and encode it for URL
  const listingUrl = `/listings/${encodeURIComponent(String(listingId))}`;

  const handleCardClick = () => {
    // Save current scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('listingsScrollPosition', String(window.scrollY || window.pageYOffset));
    }
  };

  return (
    <Link
      href={listingUrl}
      className={`listing-card ${className}`}
      aria-label={`View ${l.name} listing`}
      onClick={handleCardClick}
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
          <div className="listing-card-placeholder" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2rem', color: '#cbd5e1' }}>
            {categoryIcons[l.category] || "🏷️"}
          </div>
        )}
        
        <div className="listing-card-badges">
          <div style={{ display: 'flex', gap: '6px' }}>
             {l.offerprice && <span className="pill pill-price" style={{ background: 'var(--accent)', color: 'white' }}>{l.offerprice}</span>}
           </div>
           {l.status === "verified" && (
             <span className="pill pill-verified" style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: 'var(--success)', fontWeight: 'bold' }}>✓ {t("verified")}</span>
           )}
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

        {/* Show description in list view only */}
        {isHorizontal && (
          <p className="listing-card-description">
            {descriptionPreview}
          </p>
        )}

        {/* Show price in list view only */}
        {/* {isHorizontal && l.offerprice && (
          <div className="listing-card-price" style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="pill pill-price" style={{ background: 'var(--accent)', color: 'white', fontWeight: '600' }}>
              {l.offerprice}
            </span>
          </div>
        )} */}
        
        {/* Price is shown in badges for grid view, so no need to duplicate here */}

        <div className="listing-card-footer">
          <div className="listing-stats">
            {stats.avgRating > 0 && (
              <span className="listing-stat highlight" style={{ color: 'var(--accent)' }}>
                ⭐ {Number(stats.avgRating || 0).toFixed(1)}
              </span>
            )}
            <span className="listing-stat" style={{ color: 'var(--text-muted)' }}>
              💬 {stats.feedbackCount || 0}
            </span>
          </div>
          <div className="listing-card-actions">
            <button
              className="listing-action-btn"
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              title={isFavorite ? t("removeFavorite") || "Remove favorite" : t("addFavorite") || "Add favorite"}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
            <button
              className="listing-action-btn"
              onClick={handleShareClick}
              aria-label={t("share") || "Share listing"}
              title={t("share") || "Share"}
            >
              🔗
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ListingCard;
