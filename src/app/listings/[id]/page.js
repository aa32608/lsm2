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
    categoryIcons,
    feedbackAverages,
    submitFeedback,
    feedbackSaving,
    setReportingListingId,
    setShowReportModal
  } = useApp();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);

  // Feedback local state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

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

  const handleFeedbackSubmit = async () => {
    const success = await submitFeedback(listing.id, rating, comment);
    if (success) {
      setComment("");
      setRating(5);
    }
  };

  const feedbackStats = feedbackAverages[id] || {};
  const hasFeedback = feedbackStats.count > 0;

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
              <div className="section-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                 <h3 className="section-title" style={{ margin: 0 }}>{t("description") || "About"}</h3>
                 <span className="pill muted">{t("category")}: {t(listing.category) || listing.category}</span>
              </div>
              <div className="description-text">
                {listing.description}
              </div>

              <div className="soft-grid" style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <p className="highlight-label" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>{t("pricing") || "Pricing"}</p>
                  <p className="highlight-value" style={{ fontWeight: 600 }}>{listing.offerprice || t("unspecified")}</p>
                </div>
                <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px' }}>
                  <p className="highlight-label" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>{t("contactEmail") || "Email"}</p>
                  <p className="highlight-value" style={{ fontWeight: 600 }}>{listing.userEmail || t("unspecified")}</p>
                </div>
              </div>

               <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                 <button 
                   className="btn btn-ghost small"
                   style={{ color: '#64748b', fontSize: '0.85rem' }}
                   onClick={() => {
                     setReportingListingId(listing.id);
                     setShowReportModal(true);
                   }}
                 >
                   🚩 {t("report") || "Report Listing"}
                 </button>
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

            {/* Feedback Section */}
            <div className="detail-section feedback-section">
              <div className="feedback-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <p className="eyebrow" style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t("reputation") || "Reputation"}</p>
                  <h4 style={{ fontSize: '1.25rem', margin: '4px 0' }}>{t("communityFeedback") || "Community Feedback"}</h4>
                  <p className="small-muted" style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{t("cloudFeedbackNote") || "Ratings and comments are stored securely."}</p>
                </div>
                <div className="feedback-summary" style={{ textAlign: 'right' }}>
                  <div className="score-circle" style={{ 
                    width: '48px', height: '48px', borderRadius: '50%', background: '#0f172a', color: 'white', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 700, marginLeft: 'auto', marginBottom: '4px'
                  }}>
                    {feedbackStats.avg ?? "–"}
                  </div>
                  <div>
                    <p className="summary-label" style={{ fontWeight: 600 }}>{feedbackStats.count || 0} {t("reviews") || "reviews"}</p>
                    <p className="small-muted" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t("averageRating") || "Average rating"}</p>
                  </div>
                </div>
              </div>

              {hasFeedback ? (
                <div className="feedback-grid" style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                  {feedbackStats.comments && feedbackStats.comments.map((review, i) => (
                    <div key={i} className="review-card" style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px' }}>
                      <div className="review-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span className="review-author" style={{ fontWeight: 600 }}>{review.userName || "User"}</span>
                        <span className="review-rating">⭐ {review.rating}</span>
                      </div>
                      <p className="review-text" style={{ color: '#334155', lineHeight: 1.5 }}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                 <div className="empty-feedback" style={{ textAlign: 'center', padding: '32px', background: '#f8fafc', borderRadius: '12px', marginBottom: '24px', color: '#64748b' }}>
                   {t("noFeedback") || "No feedback yet"}
                 </div>
              )}

              {/* Add Review Form */}
              <div className="add-review-box" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '24px' }}>
                <h5 style={{ fontSize: '1rem', marginBottom: '16px' }}>{t("addReview") || "Add your review"}</h5>
                <div className="rating-select" style={{ marginBottom: '12px' }}>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button 
                      key={r} 
                      onClick={() => setRating(r)}
                      style={{ 
                        background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer',
                        opacity: r <= rating ? 1 : 0.3, transition: 'opacity 0.2s'
                      }}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea
                  className="textarea"
                  placeholder={t("writeReviewPlaceholder") || "Share your experience..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ width: '100%', minHeight: '80px', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px' }}
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleFeedbackSubmit}
                  disabled={feedbackSaving || !comment.trim()}
                >
                  {feedbackSaving ? (t("saving") || "Saving...") : (t("submitReview") || "Submit Review")}
                </button>
              </div>
            </div>
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

              <div className="sidebar-card muted-card" style={{ marginTop: '16px', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                <p className="sidebar-title" style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{t("cloudFeedbackNote") || "Trusted Reviews"}</p>
                <p className="small-muted" style={{ fontSize: '0.8rem', color: '#64748b' }}>{t("feedbackSidebarBlurb") || "Ratings help everyone find the best services."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
