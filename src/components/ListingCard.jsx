"use client";
import React, { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';
import { VerificationBadge } from "./VerificationBadge";

import Link from 'next/link';

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
  const stats = getListingStats ? getListingStats(l) : { avgRating: 0, feedbackCount: 0, engagement: 0, views: 0, contacts: 0 };
  const [imgIndex, setImgIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    // Save current page URL and scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('previousPageUrl', window.location.pathname + window.location.search);
      sessionStorage.setItem('previousScrollPosition', String(window.scrollY || window.pageYOffset));
    }
  };

  // Featured = 12-month plan and within featured period (first 3 months)
  const isFeatured = String(l.plan) === "12" && (!l.featuredUntil || l.featuredUntil > Date.now());

  return (
    <Link
      href={listingUrl}
      className={`listing-card ${className} ${isFeatured ? "listing-card--featured" : ""}`}
      aria-label={`${t("viewListing")}: ${l.name}`}
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
            <div className="listing-badges">
              {l.verified && (
                <VerificationBadge 
                  status={l.verified} 
                  compact 
                  iconOnly={true}
                />
              )}
              {l.featured && (
                <span className="featured-badge">⭐</span>
              )}
            </div>
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
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
             {isFeatured && <span className="pill pill-featured" title={t("featuredBenefitsTooltip")}>{t("featured")}</span>}
             {l.offerprice && <span className="pill pill-price" style={{ background: 'var(--accent)', color: 'white' }}>{l.offerprice}</span>}
           </div>
           <VerificationBadge status={l.status} compact={true} iconOnly={isMobile} />
        </div>
      </div>

      <div className="listing-card-content">
        <div style={{ marginBottom: '8px' }}>
          <h3 className="listing-card-title">{l.name}</h3>
          <div className="listing-card-meta">
             <span className="pill pill-category">{t(l.category) || l.category}</span>
             <span className="pill pill-location">📍 {t(l.location) || l.location || t("unspecified")}</span>
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
            {(stats.views != null && stats.views > 0) && (
              <span className="listing-stat" style={{ color: 'var(--text-muted)' }} title={t("viewsCount")?.replace("{{count}}", stats.views) || `${stats.views} views`}>
                👁 {stats.views}
              </span>
            )}
            {(stats.contacts != null && stats.contacts > 0) && (
              <span className="listing-stat" style={{ color: 'var(--text-muted)' }} title={t("callsMessagesEmails")?.replace("{{count}}", stats.contacts) || `${stats.contacts} contacts`}>
                📞 {stats.contacts}
              </span>
            )}
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
              aria-label={isFavorite ? t("removeFavorite") : t("addFavorite")}
              title={isFavorite ? t("removeFavorite") : t("addFavorite")}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
            <button
              className="listing-action-btn"
              onClick={handleShareClick}
              aria-label={t("shareListing")}
              title={t("share")}
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
