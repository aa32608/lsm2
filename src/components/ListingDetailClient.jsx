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
    if (initialListing) return; // Skip fetch if we have initial data
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
  }, [id, db, initialListing]);

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

  if (loading) {
    return (
      <div className="container" style={{ padding: "4rem", textAlign: "center" }}>
        <div className="spinner"></div>
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

  return (
    <article className="listing-detail-page">
      {/* Back Button */}
      <div className="container" style={{ paddingTop: '1rem' }}>
         <button className="btn btn-ghost" onClick={() => router.push("/listings")}>
           ← {t("back") || "Back"}
         </button>
      </div>

      <div className="container listing-detail-container">
        {/* Left Column: Images */}
        <section className="listing-detail-images">
          <div className="main-image-frame" onClick={() => setShowMaximize(true)}>
             {images.length > 0 ? (
               <>
                 <img src={images[imgIndex]} alt={listing.name} className="detail-main-img" />
                 {images.length > 1 && (
                   <>
                     <button className="carousel-btn prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>‹</button>
                     <button className="carousel-btn next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>›</button>
                   </>
                 )}
                 <div className="maximize-icon">🔍</div>
               </>
             ) : (
               <div className="detail-placeholder">
                 {categoryIcons[listing.category] || "🏷️"}
               </div>
             )}
          </div>
          {images.length > 1 && (
            <div className="thumbnail-row">
              {images.map((img, idx) => (
                <img 
                  key={idx}
                  src={img}
                  alt="thumb"
                  className={`detail-thumb ${idx === imgIndex ? 'active' : ''}`}
                  onClick={() => setImgIndex(idx)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Right Column: Info */}
        <section className="listing-detail-info">
          <header className="detail-header">
             <div className="detail-badges" style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
               <span className="pill" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>✓ {t("verified")}</span>
               {listing.offerprice && <span className="pill pill-price">{listing.offerprice}</span>}
             </div>
             <h1 className="detail-title">{listing.name}</h1>
             <div className="detail-meta-row">
               <span className="pill pill-category">{t(listing.category) || listing.category}</span>
               <span className="pill pill-location">📍 {listing.location || t("unspecified")}</span>
             </div>
             {hasRating && (
               <div className="detail-rating-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <span className="stars">{'⭐'.repeat(Math.round(localFeedbackStats.avg))}</span>
                 <span className="rating-num" style={{ fontWeight: '600' }}>{localFeedbackStats.avg} ({localFeedbackStats.count})</span>
               </div>
             )}
          </header>

          <div className="detail-actions-bar">
             {listing.contact && (
               <>
                 <a href={`tel:${listing.contact}`} className="btn btn-primary action-btn">
                   📞 {t("callAction") || "Call"}
                 </a>
                 <a href={`https://wa.me/${listing.contact.replace(/[^0-9]/g, '')}`} className="btn btn-success action-btn" target="_blank" rel="noreferrer" style={{ backgroundColor: '#25D366', color: 'white', borderColor: '#25D366' }}>
                   💬 WhatsApp
                 </a>
               </>
             )}
             <a href={`mailto:${listing.userEmail || ""}`} className="btn btn-secondary action-btn">
               ✉️ {t("emailAction") || "Email"}
             </a>
             <button className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => handleShareListing(listing)}>
               🔗
             </button>
             <button className="btn btn-secondary" style={{ width: 'auto' }} onClick={() => toggleFav(listing.id)}>
               {favorites.includes(listing.id) ? "❤️" : "🤍"}
             </button>
          </div>

          <section className="detail-section">
            <h3>{t("description") || "Description"}</h3>
            <p className="detail-description">{listing.description}</p>
          </section>

          {/* AdSense Unit */}
          <div style={{ margin: '1rem 0' }}>
            <GoogleAd style={{ minHeight: '120px' }} />
          </div>

          {/* Feedback Section */}
          <div className="detail-section feedback-section">
             <h3>{t("feedback") || "Feedback"}</h3>
             
             {/* Feedback Form */}
             {user ? (
               <div className="feedback-form">
                 <div className="rating-select">
                   {[1,2,3,4,5].map(r => (
                     <span 
                       key={r} 
                       className={`star-select ${r <= rating ? 'selected' : ''}`}
                       onClick={() => setRating(r)}
                     >
                       ★
                     </span>
                   ))}
                 </div>
                 <textarea
                  className="textarea"
                  placeholder={t("writeFeedback") || "Write a review..."}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                 <button 
                   className="btn btn-primary"
                   disabled={feedbackSaving}
                   onClick={() => submitFeedback(listing.id, rating, comment, () => { setComment(""); setRating(5); })}
                 >
                   {feedbackSaving ? "..." : (t("submit") || "Submit")}
                 </button>
               </div>
             ) : (
               <p className="login-hint text-muted">
                 <Link href="/" style={{ textDecoration: 'underline' }}>{t("loginToReview") || "Login to leave a review"}</Link>
               </p>
             )}

             {/* Feedback List */}
             <div className="feedback-list" style={{ marginTop: '1.5rem' }}>
               {localFeedbackStats.comments.length > 0 ? (
                 localFeedbackStats.comments.map((fb, i) => (
                   <div key={i} className="feedback-item">
                     <div className="feedback-header">
                       <span className="feedback-author">{fb.userDisplayName || "User"}</span>
                       <span className="feedback-rating">{'⭐'.repeat(Number(fb.rating))}</span>
                     </div>
                     <p className="feedback-text">{fb.comment}</p>
                     <span className="feedback-date">{new Date(fb.createdAt).toLocaleDateString()}</span>
                   </div>
                 ))
               ) : (
                 <p className="no-feedback text-muted">{t("noFeedbackYet") || "No feedback yet."}</p>
               )}
             </div>
          </div>
          
          <div className="detail-footer">
            <button 
              className="btn btn-ghost"
              style={{ color: 'var(--danger)' }}
              onClick={() => {
                setReportingListingId(listing.id);
                setShowReportModal(true);
              }}
            >
              🚩 {t("reportListing") || "Report Listing"}
            </button>
          </div>
        </section>
      </div>

      {/* Image Maximize Modal */}
      {showMaximize && (
        <div className="maximize-modal" onClick={() => setShowMaximize(false)}>
          <button className="close-max">✕</button>
          <img src={images[imgIndex]} alt="Maximized" className="maximized-img" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </article>
  );
}
