"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../context/AppContext";
import { ref as dbRef, get, onValue } from "firebase/database";
import Link from "next/link";
import GoogleAd from "./GoogleAd";

export default function ListingDetailClient({ id, initialListing }) {
  const router = useRouter();
  const { 
    t, 
    db, 
    user, 
    toggleFav, 
    favorites, 
    showMessage,
    handleShareListing,
    categoryIcons,
    submitFeedback,
    feedbackSaving,
    setReportingListingId,
    setShowReportModal,
    listings: allListings
  } = useApp();

  const [listing, setListing] = useState(initialListing || null);
  const [loading, setLoading] = useState(!initialListing);
  const [imgIndex, setImgIndex] = useState(0);
  const [showMaximize, setShowMaximize] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Feedback local state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [localFeedbackStats, setLocalFeedbackStats] = useState({ avg: null, count: 0, comments: [] });

  // First try to find listing in context
  useEffect(() => {
    // Validate ID first
    if (!id || id === 'undefined' || id === 'null') {
      console.error('ListingDetailClient: Invalid or missing ID', id);
      setListing(null);
      setLoading(false);
      return;
    }

    // Decode ID if it's URL encoded
    let decodedId;
    try {
      decodedId = id ? decodeURIComponent(String(id)) : null;
    } catch (e) {
      decodedId = String(id);
    }
    
    if (initialListing) {
      setListing(initialListing);
      setLoading(false);
      return;
    }

    const listingId = decodedId || String(id);

    // Try to find in context listings first
    if (allListings && allListings.length > 0 && listingId) {
      const foundListing = allListings.find(l => {
        const listingIdStr = String(l.id || '');
        return listingIdStr === listingId || listingIdStr === String(id);
      });
      if (foundListing) {
        setListing(foundListing);
        setLoading(false);
        return;
      }
    }

    // If not found in context, fetch from Firebase
    if (!db) {
      // Wait a bit for db to initialize
      const timer = setTimeout(() => {
        if (!db) {
          console.warn('ListingDetailClient: Firebase db not initialized');
          setLoading(false);
          setListing(null);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        console.log('Fetching listing from Firebase:', listingId);
        const snapshot = await get(dbRef(db, `listings/${listingId}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setListing({ id: listingId, ...data });
        } else {
          console.warn(`Listing ${listingId} not found in Firebase`);
          setListing(null);
        }
      } catch (error) {
        console.error("Error fetching listing:", error);
        showMessage(t("error") || "Error loading listing", "error");
        setListing(null);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, db, initialListing, allListings, showMessage, t]);

  // Load Feedback for this listing
  useEffect(() => {
    if (!id || !db) return;
    const feedbackRef = dbRef(db, `feedback/${id}`);
    
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

  // Keyboard navigation for expanded modal
  useEffect(() => {
    if (!showMaximize || images.length === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowMaximize(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showMaximize, images.length]);

  if (loading) {
    return (
      <div className="detail-loading-container">
        <div className="spinner" aria-label="Loading listing"></div>
        <p className="detail-loading-text">{t("loading") || "Loading listing..."}</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container" style={{ padding: "4rem", textAlign: "center" }}>
        <h2 className="text-h2">{t("listingNotFound") || "Listing not found"}</h2>
        <button className="btn btn-secondary" onClick={() => router.push("/listings")}>
          {t("back")}
        </button>
      </div>
    );
  }

  // Stats
  const hasRating = localFeedbackStats.avg !== null;

  // Helper to format dates
  const formatDate = (timestamp) => {
    if (!timestamp) return null;
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate days until expiry
  const getDaysUntilExpiry = (expiresAt) => {
    if (!expiresAt) return null;
    const now = Date.now();
    const diff = expiresAt - now;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <article className="listing-detail-page">
      {/* Back Button */}
      <div className="detail-page-header">
        <button 
          className="detail-back-btn" 
          onClick={() => {
            router.push("/listings");
            // Restore scroll position after navigation
            const scrollPosition = sessionStorage.getItem('listingsScrollPosition');
            if (scrollPosition) {
              // Wait for navigation to complete
              setTimeout(() => {
                window.scrollTo({ top: parseInt(scrollPosition, 10), behavior: 'instant' });
                // Try again after a short delay in case page is still loading
                setTimeout(() => {
                  window.scrollTo({ top: parseInt(scrollPosition, 10), behavior: 'instant' });
                  sessionStorage.removeItem('listingsScrollPosition');
                }, 200);
              }, 50);
            }
          }}
          aria-label={t("back") || "Back to listings"}
        >
          <span aria-hidden="true">←</span> {t("back") || "Back"}
         </button>
      </div>

      <div className="detail-page-container">
        {/* Top Section: Photo (Left) + Key Info (Right) */}
        <div className="detail-top-section">
          {/* Left: Photo */}
          <div className="detail-photo-section">
            <section className="detail-images-section" aria-label="Listing images">
            <div 
              className="detail-main-image-wrapper"
              onClick={() => setShowMaximize(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowMaximize(true);
                }
              }}
              aria-label="Click to view full size image"
            >
               {images.length > 0 ? (
                 <>
                   <img 
                     src={images[imgIndex]} 
                     alt={`${listing.name} - Image ${imgIndex + 1} of ${images.length}`}
                     className="detail-main-img" 
                   />
                   {images.length > 1 && (
                     <>
                       <button 
                         className="detail-carousel-btn detail-carousel-prev" 
                         onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                         aria-label="Previous image"
                       >
                         ‹
                       </button>
                       <button 
                         className="detail-carousel-btn detail-carousel-next" 
                         onClick={(e) => { e.stopPropagation(); handleNext(); }}
                         aria-label="Next image"
                       >
                         ›
                       </button>
                     </>
                   )}
                   <div className="detail-maximize-hint" aria-hidden="true">
                     <span>🔍</span> Click to enlarge
                   </div>
                 </>
               ) : (
                 <div className="detail-placeholder">
                   <span className="detail-placeholder-icon" aria-hidden="true">
                   {categoryIcons[listing.category] || "🏷️"}
                   </span>
                   <span className="detail-placeholder-text">No image available</span>
                 </div>
               )}
            </div>
            {images.length > 1 && (
              <div className="detail-thumbnails" role="tablist" aria-label="Image thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={idx === imgIndex}
                    aria-label={`View image ${idx + 1}`}
                    className={`detail-thumb ${idx === imgIndex ? 'active' : ''}`}
                    onClick={() => setImgIndex(idx)}
                  >
                    <img 
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                  />
                  </button>
                ))}
              </div>
            )}
          </section>
          </div>

          {/* Right: Key Info */}
          <div className="detail-key-info-section">
            <header className="detail-header">
               <div className="detail-badges" role="list" aria-label="Listing badges">
                 {listing.status === "verified" && (
                   <span className="pill pill-verified" role="listitem">
                     <span aria-hidden="true">✓</span> {t("verified")}
                   </span>
                 )}
                 {listing.offerprice && (
                   <span className="pill pill-price" role="listitem">
                     {listing.offerprice}
                   </span>
                 )}
               </div>
               <h1 className="detail-title">{listing.name}</h1>
               <div className="detail-meta-row">
                 <span className="pill pill-category">
                   {categoryIcons[listing.category] && <span aria-hidden="true">{categoryIcons[listing.category]}</span>}
                   {t(listing.category) || listing.category}
                 </span>
                 <span className="pill pill-location">
                   <span aria-hidden="true">📍</span> {listing.location || t("unspecified")}
                 </span>
               </div>
               {hasRating && (
                 <div className="detail-rating-row" aria-label={`Rating: ${localFeedbackStats.avg} out of 5 stars based on ${localFeedbackStats.count} reviews`}>
                   <span className="detail-stars" aria-hidden="true">
                     {'⭐'.repeat(Math.round(localFeedbackStats.avg))}
                   </span>
                   <span className="detail-rating-num">
                     <strong>{localFeedbackStats.avg}</strong> ({localFeedbackStats.count} {t("reviews") || "reviews"})
                   </span>
                 </div>
               )}
            </header>

            <div className="detail-actions-bar" role="group" aria-label="Contact and action buttons">
               {listing.contact && (
                 <>
                   <a 
                     href={`tel:${listing.contact}`} 
                     className="detail-action-btn detail-action-call"
                     aria-label={`Call ${listing.contact}`}
                   >
                     <span aria-hidden="true">📞</span> {t("callAction") || "Call"}
                   </a>
                   <a 
                     href={`https://wa.me/${listing.contact.replace(/[^0-9]/g, '')}`} 
                     className="detail-action-btn detail-action-whatsapp"
                     target="_blank" 
                     rel="noreferrer noopener"
                     aria-label="Open WhatsApp chat"
                   >
                     <span aria-hidden="true">💬</span> WhatsApp
                   </a>
                 </>
               )}
               {listing.userEmail && (
                 <a 
                   href={`mailto:${listing.userEmail}`} 
                   className="detail-action-btn detail-action-email"
                   aria-label={`Send email to ${listing.userEmail}`}
                 >
                   <span aria-hidden="true">✉️</span> {t("emailAction") || "Email"}
                 </a>
               )}
               <button 
                 className="detail-action-btn detail-action-share"
                 onClick={() => handleShareListing(listing)}
                 aria-label={t("share") || "Share listing"}
               >
                 <span aria-hidden="true">🔗</span>
               </button>
               <button 
                 className="detail-action-btn detail-action-favorite"
                 onClick={() => toggleFav(listing.id)}
                 aria-label={favorites.includes(listing.id) ? t("removeFavorite") || "Remove from favorites" : t("addFavorite") || "Add to favorites"}
                 aria-pressed={favorites.includes(listing.id)}
               >
                 <span aria-hidden="true">{favorites.includes(listing.id) ? "❤️" : "🤍"}</span>
               </button>
            </div>
          </div>
        </div>

        {/* Bottom Section: Additional Info Sidebar + Main Content */}
        <div className="detail-bottom-section">
          {/* Left Sidebar: Additional Info */}
          <aside className="detail-sidebar" aria-label="Additional listing information">
            <div className="detail-sidebar-content">
              <h2 className="detail-sidebar-title">{t("additionalInfo") || "Additional Information"}</h2>
              
              <div className="detail-sidebar-section">
              {listing.tags && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">🏷️</span> {t("tags") || "Tags"}
                  </div>
                  <div className="detail-sidebar-value">
                    {listing.tags.split(',').map((tag, idx) => (
                      <span key={idx} className="detail-tag">{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {listing.socialLink && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">🔗</span> {t("socialLink") || "Social Media"}
                  </div>
                  <div className="detail-sidebar-value">
                    <a 
                      href={listing.socialLink.startsWith('http') ? listing.socialLink : `https://${listing.socialLink}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="detail-social-link"
                    >
                      {listing.socialLink}
                    </a>
                  </div>
                </div>
              )}

              {listing.locationCity && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">🏙️</span> {t("city") || "City"}
                  </div>
                  <div className="detail-sidebar-value">{listing.locationCity}</div>
                </div>
              )}

              {listing.locationExtra && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">📍</span> {t("locationDetails") || "Location Details"}
                  </div>
                  <div className="detail-sidebar-value">{listing.locationExtra}</div>
                </div>
              )}

              {listing.createdAt && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">📅</span> {t("postedOn") || "Posted On"}
                  </div>
                  <div className="detail-sidebar-value">
                    {formatDate(listing.createdAt)}
                  </div>
                </div>
              )}

              {listing.expiresAt && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">⏰</span> {t("expiresOn") || "Expires On"}
                  </div>
                  <div className="detail-sidebar-value">
                    {formatDate(listing.expiresAt)}
                    {listing.expiresAt > Date.now() && (
                      <span className="detail-expiry-days">
                        {' '}({getDaysUntilExpiry(listing.expiresAt)} {t("daysLeft") || "days left"})
                      </span>
                    )}
                    {listing.expiresAt <= Date.now() && (
                      <span className="detail-expiry-days" style={{ color: 'var(--danger)' }}>
                        {' '}({t("expired") || "Expired"})
                      </span>
                    )}
                  </div>
                </div>
              )}

              {(listing.views || listing.views === 0) && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">👁️</span> {t("views") || "Views"}
                  </div>
                  <div className="detail-sidebar-value">{listing.views || 0}</div>
                </div>
              )}

              {(listing.likes || listing.likes === 0) && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">❤️</span> {t("likes") || "Likes"}
                  </div>
                  <div className="detail-sidebar-value">{listing.likes || 0}</div>
                </div>
              )}

              {listing.userEmail && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">✉️</span> {t("contactEmail") || "Contact Email"}
                  </div>
                  <div className="detail-sidebar-value">
                    <a href={`mailto:${listing.userEmail}`} className="detail-email-link">
                      {listing.userEmail}
                    </a>
                  </div>
                </div>
              )}

              {listing.plan && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">💎</span> {t("plan") || "Plan"}
                  </div>
                  <div className="detail-sidebar-value">{listing.plan}</div>
                </div>
              )}

              {listing.pricePaid && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">💰</span> {t("pricePaid") || "Price Paid"}
                  </div>
                  <div className="detail-sidebar-value">{listing.pricePaid}</div>
                </div>
              )}

              {listing.status && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">📊</span> {t("status") || "Status"}
                  </div>
                  <div className="detail-sidebar-value">
                    <span className={`detail-status-badge ${listing.status === "verified" ? "detail-status-verified" : "detail-status-pending"}`}>
                      {listing.status === "verified" ? "✅ Verified" : "⏳ Pending"}
                    </span>
                  </div>
                </div>
              )}

              {listing.category && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">{categoryIcons[listing.category] || "📂"}</span> {t("category") || "Category"}
                  </div>
                  <div className="detail-sidebar-value">{t(listing.category) || listing.category}</div>
                </div>
              )}

              {listing.location && (
                <div className="detail-sidebar-item">
                  <div className="detail-sidebar-label">
                    <span aria-hidden="true">🌍</span> {t("location") || "Location"}
                  </div>
                  <div className="detail-sidebar-value">{listing.location}</div>
                </div>
              )}
            </div>

            {/* Ad in Sidebar */}
            <div className="detail-sidebar-ad">
              <GoogleAd style={{ minHeight: '250px' }} />
            </div>
          </div>
        </aside>

          {/* Main Content: Description and Feedback */}
          <div className="detail-main-content">

          <section className="detail-section detail-description-section">
            <h2 className="detail-section-title">{t("description") || "Description"}</h2>
            <div className="detail-description">
              {listing.description ? (
                <p style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>{listing.description}</p>
              ) : (
                <p className="text-muted">{t("noDescription") || "No description provided."}</p>
              )}
            </div>
          </section>

          {/* AdSense Unit */}
          <div className="detail-ad-section">
            <GoogleAd style={{ minHeight: '120px' }} />
          </div>

          {/* Feedback Section */}
          <section className="detail-section detail-feedback-section">
             <h2 className="detail-section-title">{t("feedback") || "Feedback"}</h2>
             
             {/* Feedback Form */}
             {user ? (
               <div className="detail-feedback-form">
                 <label className="feedback-rating-label">
                   {t("yourRating") || "Your Rating"}
                 </label>
                 <div className="detail-rating-select" role="radiogroup" aria-label="Select rating">
                   {[1,2,3,4,5].map(r => (
                     <button
                       key={r} 
                       type="button"
                       role="radio"
                       aria-checked={r === rating}
                       aria-label={`${r} star${r > 1 ? 's' : ''}`}
                       className={`detail-star-select ${r <= rating ? 'selected' : ''}`}
                       onClick={() => setRating(r)}
                     >
                       ★
                     </button>
                   ))}
                 </div>
                 <label className="feedback-comment-label" htmlFor="feedback-comment">
                   {t("yourReview") || "Your Review"}
                 </label>
                 <textarea
                  id="feedback-comment"
                  className="detail-textarea"
                  placeholder={t("writeFeedback") || "Write a review..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  aria-label="Review comment"
                />
                 <button 
                   className="detail-feedback-submit-btn"
                   disabled={feedbackSaving || !comment.trim()}
                   onClick={async () => {
                     const success = await submitFeedback(listing.id, rating, comment);
                     if (success) {
                       setComment("");
                       setRating(5);
                     }
                   }}
                 >
                   {feedbackSaving ? t("submitting") || "Submitting..." : (t("submit") || "Submit Review")}
                 </button>
               </div>
             ) : (
               <div className="detail-login-prompt">
                 <p className="detail-login-text">
                   <Link href="/" className="detail-login-link">
                     {t("loginToReview") || "Login to leave a review"}
                   </Link>
                 </p>
               </div>
             )}

             {/* Feedback List */}
             <div className="detail-feedback-list">
               {localFeedbackStats.comments.length > 0 ? (
                 <>
                   <h3 className="feedback-list-title">
                     {t("reviews") || "Reviews"} ({localFeedbackStats.comments.length})
                   </h3>
                   <div className="feedback-items" role="list">
                     {localFeedbackStats.comments.map((fb, i) => (
                       <article key={i} className="detail-feedback-item" role="listitem">
                         <div className="detail-feedback-header">
                           <span className="detail-feedback-author">{fb.userName || fb.userDisplayName || "Anonymous"}</span>
                           <span className="detail-feedback-rating" aria-label={`${fb.rating} out of 5 stars`}>
                             {'⭐'.repeat(Number(fb.rating))}
                           </span>
                     </div>
                         {fb.comment && (
                           <p className="detail-feedback-text">{fb.comment}</p>
                         )}
                         <time className="detail-feedback-date" dateTime={new Date(fb.createdAt).toISOString()}>
                           {new Date(fb.createdAt).toLocaleDateString(undefined, { 
                             year: 'numeric', 
                             month: 'long', 
                             day: 'numeric' 
                           })}
                         </time>
                       </article>
                     ))}
                   </div>
                 </>
               ) : (
                 <p className="detail-no-feedback">{t("noFeedbackYet") || "No feedback yet. Be the first to review!"}</p>
               )}
             </div>
          </section>

          <div className="detail-footer">
            <button
              className="detail-report-btn"
              onClick={() => {
                setReportingListingId(listing.id);
                setShowReportModal(true);
              }}
              aria-label={t("reportListing") || "Report this listing"}
            >
              <span aria-hidden="true">🚩</span> {t("reportListing") || "Report Listing"}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Image Maximize Modal */}
      {showMaximize && (
        <div 
          className="detail-maximize-modal" 
          onClick={() => setShowMaximize(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full size image viewer"
        >
          <button 
            className="detail-close-max"
            onClick={() => setShowMaximize(false)}
            aria-label="Close image viewer"
          >
            ✕
          </button>
          
          {images.length > 1 && (
            <>
              <button
                className="detail-modal-nav detail-modal-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="detail-modal-nav detail-modal-next"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
              >
                ›
              </button>
              <div className="detail-modal-counter" aria-live="polite">
                {imgIndex + 1} / {images.length}
              </div>
            </>
          )}
          
          <img 
            src={images[imgIndex]} 
            alt={`${listing.name} - Full size (${imgIndex + 1} of ${images.length})`}
            className="detail-maximized-img" 
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
            onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
            onTouchEnd={() => {
              if (!touchStart || !touchEnd) return;
              const distance = touchStart - touchEnd;
              const isLeftSwipe = distance > 50;
              const isRightSwipe = distance < -50;
              if (isLeftSwipe && images.length > 1) {
                handleNext();
              }
              if (isRightSwipe && images.length > 1) {
                handlePrev();
              }
              setTouchStart(null);
              setTouchEnd(null);
            }}
          />
        </div>
      )}
    </article>
  );
}
