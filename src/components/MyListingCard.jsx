"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { db } from "../firebase";
import { ref as dbRef, update } from "firebase/database";

const API_BASE =
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

const MyListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons,
  getDaysUntilExpiry,
  getListingStats,
  getDescriptionPreview,
  openEdit,
  startExtendFlow,
  showMessage,
  handleShareListing,
  confirmDelete,
  user,
  userProfile,
}) => {
  const router = useRouter();
  const stats = getListingStats(l);
  const days = getDaysUntilExpiry(l.expiresAt);
  const isExpiringSoon = days !== null && days > 0 && days <= 7;
  const isExpired = days !== null && days <= 0;
  const currentPlan = l.plan || "1";
  const isFreeTrialEligible = (l.status === "pending" || l.status === "unpaid") && currentPlan === "1" && user && userProfile && !userProfile.hasUsedFreeTrial;

  return (
    <article className={`my-listing-card my-listing-card-horizontal ${isExpired ? "my-listing-card--paused" : ""}`} role="listitem">
      {isExpired && (
        <div className="my-listing-paused-banner" role="alert" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "0.75rem 1rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
          <span style={{ color: "var(--text-muted)" }}>{t("listingPausedRenewToReactivate")}</span>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => startExtendFlow(l)} aria-label={t("renewNow")}>
            {t("renewNow")}
          </button>
        </div>
      )}
      <div className="my-listing-card-main">
        <header className="my-listing-header">
          <div className="my-listing-header-top">
            <div className="my-listing-icon-bubble" aria-hidden="true">
              {categoryIcons[l.category] || "🏷️"}
            </div>
            <div className="my-listing-header-content">
              <div className="my-listing-title-row">
                <h3 className="my-listing-title">{l.name}</h3>
                <span
                  className={`my-status-chip ${l.status === "verified" ? "my-status-chip-verified" : "my-status-chip-pending"}`}
                  aria-label={`${t("statusLabel")}: ${l.status === "verified" ? t("verified") : t("pending")}`}
                >
                  <span aria-hidden="true">{l.status === "verified" ? "✅" : "⏳"}</span>
                  {l.status === "verified" ? t("verified") : t("pending")}
                </span>
              </div>
              <div className="my-listing-meta-row">
                <span className="my-listing-pill" aria-label={`Category: ${t(l.category) || l.category}`}>
                  <span aria-hidden="true">{categoryIcons[l.category] || "🏷️"}</span>
                  {t(l.category) || l.category}
                </span>
                {l.location && (
                  <span className="my-listing-pill" aria-label={`${t("locationLabel")}: ${l.location}`}>
                    <span aria-hidden="true">📍</span>
                    {l.location}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className={`my-listing-expiry ${isExpiringSoon ? "my-listing-expiry-warning" : ""} ${isExpired ? "my-listing-expiry-expired" : ""}`}>
            {l.expiresAt ? (
              <>
                <span className="my-listing-expiry-label">{t("expires")}:</span>
                <span className="my-listing-expiry-date">{typeof window !== 'undefined' ? new Date(l.expiresAt).toLocaleDateString() : '—'}</span>
                {days !== null && (
                  <span className={`my-listing-expiry-days ${isExpiringSoon ? "my-listing-expiry-warning-text" : ""} ${isExpired ? "my-listing-expiry-expired-text" : ""}`}>
                    {isExpired 
                      ? ` ⚠️ ${t("expired")}`
                      : isExpiringSoon 
                        ? ` ⏰ ${days} ${days === 1 ? t("day") : t("days")} ${t("remaining")}`
                        : ` (${days} ${days === 1 ? t("day") : t("days")})`
                    }
                  </span>
                )}
              </>
            ) : (
              <span className="my-listing-expiry-date">{t("noExpiry")}</span>
            )}
          </div>
        </header>

        <div className="my-listing-body">
          <p className="my-listing-description">
            {getDescriptionPreview(l.description, 12)}
          </p>

          <div className="my-listing-stats">
            <span className="my-listing-stat" aria-label={`${t("ratingLabel")}: ${Number(stats.avgRating || 0).toFixed(1)} ${t("ratingStars")}`}>
              <span aria-hidden="true">⭐</span>
              {Number(stats.avgRating || 0).toFixed(1)}
            </span>
            <span className="my-listing-stat" aria-label={`${stats.feedbackCount} ${t("feedbackCountLabel")}`}>
              <span aria-hidden="true">💬</span>
              {stats.feedbackCount}
            </span>
            <span className="my-listing-stat" aria-label={`Engagement: ${stats.engagement}`}>
              <span aria-hidden="true">🔥</span>
              {stats.engagement}
            </span>
            {l.offerprice && (
              <span className="my-listing-pill my-listing-pill-price" aria-label={`${t("priceLabel")}: ${l.offerprice}`}>
                <span aria-hidden="true">💶</span>
                {l.offerprice}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="my-listing-sidebar">
        <div className="my-listing-rating" aria-label={`${t("ratingLabel")}: ${Number(stats.avgRating || 0).toFixed(1)} ${t("ratingStars")}, ${stats.feedbackCount} ${t("reviews")}`}>
          <span className="my-listing-rating-value">
            <span aria-hidden="true">⭐</span>
            {Number(stats.avgRating || 0).toFixed(1)}
          </span>
          <span className="my-listing-rating-count">{stats.feedbackCount} {t("reviews")}</span>
        </div>

        <footer className="my-listing-footer">
          <div className="my-listing-actions-primary">
            <span className="my-listing-id" aria-label={`${t("listingIdLabel")}: ${l.id.slice(-6)}`}>
              #{l.id.slice(-6)}
            </span>
            <div className="my-listing-action-buttons">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  // Save current page URL and scroll position before navigating
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('previousPageUrl', window.location.pathname + window.location.search);
                    sessionStorage.setItem('previousScrollPosition', String(window.scrollY || window.pageYOffset));
                  }
                  router.push(`/listings/${l.id}`);
                }}
                aria-label={`${t("view")} ${t("listing")}: ${l.name}`}
              >
                <span aria-hidden="true">👁️</span>
                <span className="btn-text">{t("view")}</span>
              </button>
              
              <button
                className="btn btn-sm"
                onClick={() => openEdit(l)}
                aria-label={`${t("edit")} ${t("listing")}: ${l.name}`}
              >
                <span aria-hidden="true">✏️</span>
                <span className="btn-text">{t("edit")}</span>
              </button>
              
              {(l.status === "pending" || l.status === "unpaid") ? (
                <div className="my-listing-payment-actions">
                  <select
                    className="btn btn-sm"
                    value={currentPlan}
                    onChange={(e) => {
                      const newPlan = e.target.value;
                      // Update listing plan in Firebase
                      update(dbRef(db, `listings/${l.id}`), { plan: newPlan })
                        .then(() => {
                          showMessage(t("planUpdated") || "Plan updated successfully", "success");
                        })
                        .catch(err => {
                          console.error(err);
                          showMessage(t("error") || "Error updating plan", "error");
                        });
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{ 
                      padding: '0.5rem', 
                      borderRadius: 'var(--radius-md)', 
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      color: 'var(--text-main)',
                      cursor: 'pointer'
                    }}
                    aria-label={t("selectPlan") || "Select payment plan"}
                  >
                    <option value="1">{t("plan1Month") || "1 Month"}</option>
                    <option value="3">{t("plan3Months") || "3 Months"}</option>
                    <option value="6">{t("plan6Months") || "6 Months"}</option>
                    <option value="12">{t("plan12Months") || "12 Months"}</option>
                  </select>
                  {isFreeTrialEligible && (
                    <span className="proceed-free-badge" aria-label={t("freeFor1Month")}>
                      🎁 {t("freeFor1Month")}
                    </span>
                  )}
                  <button
                    className={`btn btn-sm ${isFreeTrialEligible ? "btn-primary btn-free-trial" : "btn-primary"}`}
                    onClick={() => {
                      // For pending/unpaid listings, redirect to payment
                      const API_BASE = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
                        ? "http://localhost:5000"
                        : "https://lsm-wozo.onrender.com");
                      
                      fetch(`${API_BASE}/api/create-payment`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          listingId: l.id,
                          type: "create",
                          customerEmail: l.userEmail,
                          customerName: l.name,
                          plan: currentPlan,
                          userId: user?.uid || null
                        })
                      })
                      .then(res => res.json())
                      .then(data => {
                        if (data.checkoutUrl) {
                          window.location.href = data.checkoutUrl;
                        } else {
                          showMessage(t("paymentError"), "error");
                        }
                      })
                      .catch(err => {
                        console.error(err);
                        showMessage(t("paymentError"), "error");
                      });
                    }}
                    aria-label={`${t("proceedToPayment")}: ${l.name}`}
                  >
                    <span aria-hidden="true">💳</span>
                    <span className="btn-text">{t("proceedToPayment")}</span>
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-sm btn-extend"
                  onClick={() => startExtendFlow(l)}
                  aria-label={`${t("extend")} ${t("listing")}: ${l.name}`}
                >
                  <span aria-hidden="true">⏰</span>
                  <span className="btn-text">{t("extend")}</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="my-listing-actions-secondary" role="group" aria-label={t("additionalActions")}>
            {l.contact && (
              <button
                className="btn btn-ghost btn-sm btn-icon-only"
                onClick={() => window.open(`tel:${l.contact}`)}
                aria-label={`${t("call")}: ${l.contact}`}
                title={t("call")}
              >
                <span aria-hidden="true">📞</span>
              </button>
            )}
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={() =>
                window.open(
                  `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                    l.name || ""
                  )}`
                )
              }
              aria-label={t("emailListingOwner")}
              title={t("emailAction")}
            >
              <span aria-hidden="true">✉️</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={() => {
                navigator.clipboard?.writeText(l.contact || "");
                showMessage(t("copied"), "success");
              }}
              aria-label={t("copyContactInfo")}
              title={t("copy")}
            >
              <span aria-hidden="true">📋</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={() => handleShareListing && handleShareListing(l)}
              aria-label={`${t("shareListing")}: ${l.name}`}
              title={t("share")}
            >
              <span aria-hidden="true">🔗</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only btn-danger"
              onClick={() => confirmDelete && confirmDelete(l.id)}
              aria-label={`${t("deleteListing")}: ${l.name}`}
              title={t("deleteListing")}
            >
              <span aria-hidden="true">🗑️</span>
            </button>
          </div>
        </footer>
      </div>
    </article>
  );
});

export default MyListingCard;
