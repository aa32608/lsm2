"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "../../../context/AppContext";
import { ref as dbRef, get } from "firebase/database";
import Link from "next/link";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { 
    t, 
    db, 
    user, 
    toggleFav, 
    favorites, 
    showMessage,
    handleShareListing,
    formatOfferPrice,
    categoryIcons
  } = useApp();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!id || !db) return;

    const fetchListing = async () => {
      try {
        setLoading(true);
        const snapshot = await get(dbRef(db, `listings/${id}`));
        if (snapshot.exists()) {
          setListing({ id, ...snapshot.val() });
        } else {
          setListing(null);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        showMessage(t("error") || "Error loading listing", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, db]);

  // Determine images to display
  const images = useMemo(() => {
    if (!listing) return [];
    return listing.images && listing.images.length > 0 
      ? listing.images 
      : (listing.imagePreview ? [listing.imagePreview] : []);
  }, [listing]);

  const handlePrev = () => {
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="listing-detail-page container">
        <div className="skeleton-loader" style={{ height: '400px', borderRadius: '16px', marginBottom: '24px' }}></div>
        <div className="skeleton-loader" style={{ height: '40px', width: '60%', marginBottom: '16px' }}></div>
        <div className="skeleton-loader" style={{ height: '20px', width: '40%', marginBottom: '32px' }}></div>
        <div className="skeleton-loader" style={{ height: '200px' }}></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="listing-detail-page container error-state">
        <h2>{t("listingNotFound") || "Listing Not Found"}</h2>
        <Link href="/listings" className="btn btn-primary">
          {t("explore") || "Back to Explore"}
        </Link>
      </div>
    );
  }

  const isFav = favorites.includes(listing.id);

  return (
    <div className="listing-detail-page">
      <div className="listing-detail-header">
        <div className="container">
          <Link href="/listings" className="back-link">
            ← {t("back") || "Back"}
          </Link>
        </div>
      </div>

      <div className="container listing-detail-content">
        <div className="detail-grid">
          {/* Left Column: Images & Key Info */}
          <div className="detail-main">
            <div className="detail-image-gallery">
              {images.length > 0 ? (
                <div className="gallery-main-frame">
                  <img 
                    src={images[imgIndex]} 
                    alt={listing.name} 
                    className="gallery-main-img"
                  />
                  {images.length > 1 && (
                    <>
                      <button className="gallery-nav prev" onClick={handlePrev}>‹</button>
                      <button className="gallery-nav next" onClick={handleNext}>›</button>
                      <div className="gallery-counter">
                        {imgIndex + 1} / {images.length}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="gallery-placeholder">
                  <span style={{ fontSize: '4rem' }}>{categoryIcons[listing.category] || "🏷️"}</span>
                </div>
              )}
              
              {images.length > 1 && (
                <div className="gallery-thumbs">
                  {images.map((img, idx) => (
                    <button 
                      key={idx}
                      className={`gallery-thumb ${idx === imgIndex ? 'active' : ''}`}
                      onClick={() => setImgIndex(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="detail-header-mobile mobile-only">
              <div className="detail-badges">
                <span className="pill pill-category">{t(listing.category) || listing.category}</span>
                {listing.verified && <span className="pill pill-verified">✓ {t("verified") || "Verified"}</span>}
              </div>
              <h1 className="detail-title">{listing.name}</h1>
              <div className="detail-location">
                📍 {listing.location || listing.locationCity || t("unspecified")}
              </div>
            </div>

            <div className="detail-section description-section">
              <h3 className="section-title">{t("description") || "About"}</h3>
              <div className="description-text">
                {listing.description}
              </div>
            </div>

            {listing.tags && (
              <div className="detail-section tags-section">
                <h3 className="section-title">{t("tags") || "Tags"}</h3>
                <div className="tags-cloud">
                  {listing.tags.split(',').map(tag => (
                    <span key={tag} className="tag-chip">#{tag.trim()}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="detail-sidebar">
            <div className="detail-card sticky-card">
              <div className="desktop-only">
                 <div className="detail-badges">
                  <span className="pill pill-category">{t(listing.category) || listing.category}</span>
                  {listing.verified && <span className="pill pill-verified">✓ {t("verified") || "Verified"}</span>}
                </div>
                <h1 className="detail-title">{listing.name}</h1>
                <div className="detail-location">
                  📍 {listing.location || listing.locationCity || t("unspecified")}
                </div>
              </div>

              <div className="detail-price-box">
                {listing.offerprice ? (
                  <div className="price-display">
                    <span className="price-label">{t("price") || "Price"}</span>
                    <span className="price-value">{listing.offerprice}</span>
                  </div>
                ) : (
                   <div className="price-display">
                    <span className="price-value free">{t("contactForPrice") || "Contact for Price"}</span>
                  </div>
                )}
              </div>

              <div className="detail-actions">
                {listing.contact && (
                  <a href={`tel:${listing.contact}`} className="btn btn-primary btn-full">
                    📞 {t("call") || "Call"} {listing.contact}
                  </a>
                )}
                
                {listing.socialLink && (
                  <a href={listing.socialLink.startsWith('http') ? listing.socialLink : `https://${listing.socialLink}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-full">
                    🌐 {t("visitWebsite") || "Visit Website"}
                  </a>
                )}

                <div className="action-row">
                  <button 
                    className={`btn btn-ghost flex-1 ${isFav ? 'active-fav' : ''}`}
                    onClick={() => toggleFav(listing.id)}
                  >
                    {isFav ? "❤️ Saved" : "🤍 Save"}
                  </button>
                  <button 
                    className="btn btn-ghost flex-1"
                    onClick={() => handleShareListing(listing)}
                  >
                    📤 Share
                  </button>
                </div>
              </div>

              <div className="safety-tip">
                🛡️ <strong>Safety Tip:</strong> Never transfer money before meeting or seeing the service.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
