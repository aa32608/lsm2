"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { ref as dbRef, get, onValue } from "firebase/database";

export default function ListingDetailView({ listingId, initialListing, onClose }) {
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
    submitFeedback,
    feedbackSaving,
    setReportingListingId,
    setShowReportModal
  } = useApp();

  const [listing, setListing] = useState(initialListing || null);
  const [loading, setLoading] = useState(!initialListing);
  const [imgIndex, setImgIndex] = useState(0);
  const [showMaximize, setShowMaximize] = useState(false);

  // Feedback local state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [localFeedbackStats, setLocalFeedbackStats] = useState({ avg: null, count: 0, comments: [] });

  useEffect(() => {
    if (initialListing) {
      setListing(initialListing);
      setLoading(false);
      return;
    }

    if (!listingId || !db) return;

    const fetchListing = async () => {
      try {
        setLoading(true);
        const snapshot = await get(dbRef(db, `listings/${listingId}`));
        if (snapshot.exists()) {
          setListing({ id: listingId, ...snapshot.val() });
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
  }, [listingId, db, initialListing]);

  // Load Feedback for this listing
  useEffect(() => {
    const targetId = listing?.id || listingId;
    if (!targetId || !db) return;
    const feedbackRef = dbRef(db, `feedback/${targetId}`);
    
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const values = Object.values(data);
        const sum = values.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
        const count = values.length;
        const avg = count > 0 ? parseFloat((sum / count).toFixed(1)) : null;
        
        // Sort comments by date desc
        const comments = values
          .filter(v => v.comment)
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

        setLocalFeedbackStats({ avg, count, comments });
      } else {
        setLocalFeedbackStats({ avg: null, count: 0, comments: [] });
      }
    });

    return () => unsubscribe();
  }, [listing, listingId, db]);

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

  const cleanPhone = (p) => {
    if (!p) return "";
    return p.replace(/\D/g, "");
  };

  if (loading) {
    return (
      <div className="listing-detail-page container" style={{ paddingTop: '80px' }}>
        <div className="skeleton-loader" style={{ height: '400px', borderRadius: '16px', marginBottom: '24px' }}></div>
        <div className="skeleton-loader" style={{ height: '40px', width: '60%', marginBottom: '16px' }}></div>
        <div className="skeleton-loader" style={{ height: '20px', width: '40%', marginBottom: '32px' }}></div>
        <div className="skeleton-loader" style={{ height: '200px' }}></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="listing-detail-page container error-state" style={{ paddingTop: '80px' }}>
        <h2>{t("listingNotFound") || "Listing Not Found"}</h2>
        <button onClick={onClose} className="btn btn-primary">
          {t("explore") || "Back to Explore"}
        </button>
      </div>
    );
  }

  const isFav = favorites.includes(listing.id);

  return (
    <div className="listing-detail-view" style={{ 
      position: 'fixed', 
      top: 0, left: 0, right: 0, bottom: 0, 
      background: '#fff', 
      zIndex: 5000, 
      overflowY: 'auto',
      paddingTop: '60px' // Space for header if needed, or we can overlay header
    }}>
      {/* Header for Back Button */}
      <div className="listing-detail-header-overlay" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '60px',
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
        zIndex: 5001, display: 'flex', alignItems: 'center', padding: '0 16px',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <button 
            onClick={onClose} 
            className="back-link"
            style={{ 
              background: 'none', border: 'none', padding: '8px', 
              cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px',
              fontWeight: 600, color: '#334155'
            }}
          >
            ← {t("back") || "Back"}
          </button>
        </div>
      </div>

      {showMaximize && images.length > 0 && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999, 
            display: 'flex', alignItems: 'center', justifyContent: 'center' 
          }}
          onClick={() => setShowMaximize(false)}
        >
          <img 
            src={images[imgIndex]} 
            alt="Maximized" 
            style={{ maxWidth: '95vw', maxHeight: '95vh', objectFit: 'contain' }} 
          />
          <button 
            style={{ 
              position: 'absolute', top: '20px', right: '20px', 
              background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', color: 'white',
              width: '40px', height: '40px', fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            onClick={() => setShowMaximize(false)}
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button 
                style={{ 
                  position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', 
                  width: '50px', height: '50px', fontSize: '2rem', cursor: 'pointer' 
                }}
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              >
                ‹
              </button>
              <button 
                style={{ 
                  position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', 
                  width: '50px', height: '50px', fontSize: '2rem', cursor: 'pointer' 
                }}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      <div className="container listing-detail-content" style={{ marginTop: '20px' }}>
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
                    onClick={() => setShowMaximize(true)}
                    style={{ cursor: 'zoom-in' }}
                  />
                  {images.length > 1 && (
                    <>
                      <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>‹</button>
                      <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>›</button>
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
                  <p className="highlight-label" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>{t("location") || "Location"}</p>
                  <p className="highlight-value" style={{ fontWeight: 600 }}>{listing.locationCity || t("unspecified")}</p>
                  {listing.locationExtra && <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{listing.locationExtra}</p>}
                </div>
              </div>
              
              {/* Extra Details (Website, Socials) */}
              {(listing.socialLink || listing.website) && (
                 <div className="extra-links" style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
                    <p className="highlight-label" style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>{t("onlinePresence") || "Online"}</p>
                    {listing.socialLink && (
                      <div style={{ marginBottom: '4px' }}>
                        <a href={listing.socialLink.startsWith('http') ? listing.socialLink : `https://${listing.socialLink}`} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontWeight: 500 }}>
                          🔗 {listing.socialLink}
                        </a>
                      </div>
                    )}
                 </div>
              )}

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
                    {localFeedbackStats.avg ?? "–"}
                  </div>
                  <div>
                    <p className="summary-label" style={{ fontWeight: 600 }}>{localFeedbackStats.count || 0} {t("reviews") || "reviews"}</p>
                    <p className="small-muted" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{t("averageRating") || "Average rating"}</p>
                  </div>
                </div>
              </div>

              {localFeedbackStats.count > 0 ? (
                <div className="feedback-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {localFeedbackStats.comments && localFeedbackStats.comments.map((review, i) => (
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
                <h2 className="sidebar-title">{listing.name}</h2>
                <div className="detail-location">
                  📍 {listing.location || listing.locationCity || t("unspecified")}
                </div>
              </div>
              
              <div className="sidebar-actions" style={{ marginTop: '24px' }}>
                 {/* Contact Actions */}
                 <div className="contact-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {listing.contact && (
                      <a href={`tel:${listing.contact}`} className="btn btn-primary full-width">
                        📞 {t("call") || "Call"} {listing.contact}
                      </a>
                    )}
                    
                    {listing.contact && (
                      <a 
                        href={`https://wa.me/${cleanPhone(listing.contact)}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn full-width"
                        style={{ background: '#25D366', borderColor: '#25D366', color: 'white' }}
                      >
                        💬 {t("whatsapp") || "WhatsApp"}
                      </a>
                    )}
                    
                    {listing.userEmail && (
            <a href={`mailto:${listing.userEmail}`} className="btn btn-outline full-width">
              ✉️ {t("emailAction") || "Email"}
            </a>
          )}
                 </div>

                 <div className="sidebar-secondary-actions" style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                   <button 
                     className={`btn btn-ghost full-width ${isFav ? 'active' : ''}`}
                     onClick={() => toggleFav(listing.id)}
                   >
                     {isFav ? "❤️ Saved" : "🤍 Save"}
                   </button>
                   <button 
                     className="btn btn-ghost full-width"
                     onClick={() => handleShareListing(listing)}
                   >
                     🔗 Share
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
