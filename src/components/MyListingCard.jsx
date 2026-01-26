"use client";
import React from "react";
import { useRouter } from "next/navigation";

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
}) => {
  const router = useRouter();
  const stats = getListingStats(l);
  const days = getDaysUntilExpiry(l.expiresAt);
  const isExpiringSoon = days !== null && days > 0 && days <= 7;
  const isExpired = days !== null && days <= 0;

  return (
    <article className="my-listing-card my-listing-card-horizontal" role="listitem">
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
                  aria-label={`Status: ${l.status === "verified" ? t("verified") : t("pending")}`}
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
                  <span className="my-listing-pill" aria-label={`Location: ${l.location}`}>
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
                <span className="my-listing-expiry-label">{t("expires") || "Expires"}:</span>
                <span className="my-listing-expiry-date">{new Date(l.expiresAt).toLocaleDateString()}</span>
                {days !== null && (
                  <span className={`my-listing-expiry-days ${isExpiringSoon ? "my-listing-expiry-warning-text" : ""} ${isExpired ? "my-listing-expiry-expired-text" : ""}`}>
                    {isExpired 
                      ? ` ⚠️ ${t("expired") || "Expired"}`
                      : isExpiringSoon 
                        ? ` ⏰ ${days} ${days === 1 ? t("day") || "day" : t("days") || "days"} ${t("remaining") || "remaining"}`
                        : ` (${days} ${days === 1 ? t("day") || "day" : t("days") || "days"})`
                    }
                  </span>
                )}
              </>
            ) : (
              <span className="my-listing-expiry-date">{t("noExpiry") || "No expiry"}</span>
            )}
          </div>
        </header>

        <div className="my-listing-body">
          <p className="my-listing-description">
            {getDescriptionPreview(l.description, 12)}
          </p>

          <div className="my-listing-stats">
            <span className="my-listing-stat" aria-label={`Rating: ${Number(stats.avgRating || 0).toFixed(1)} stars`}>
              <span aria-hidden="true">⭐</span>
              {Number(stats.avgRating || 0).toFixed(1)}
            </span>
            <span className="my-listing-stat" aria-label={`${stats.feedbackCount} feedback`}>
              <span aria-hidden="true">💬</span>
              {stats.feedbackCount}
            </span>
            <span className="my-listing-stat" aria-label={`Engagement: ${stats.engagement}`}>
              <span aria-hidden="true">🔥</span>
              {stats.engagement}
            </span>
            {l.offerprice && (
              <span className="my-listing-pill my-listing-pill-price" aria-label={`Price: ${l.offerprice}`}>
                <span aria-hidden="true">💶</span>
                {l.offerprice}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="my-listing-sidebar">
        <div className="my-listing-rating" aria-label={`Rating: ${Number(stats.avgRating || 0).toFixed(1)} stars, ${stats.feedbackCount} reviews`}>
          <span className="my-listing-rating-value">
            <span aria-hidden="true">⭐</span>
            {Number(stats.avgRating || 0).toFixed(1)}
          </span>
          <span className="my-listing-rating-count">{stats.feedbackCount} {t("reviews")}</span>
        </div>

        <footer className="my-listing-footer">
          <div className="my-listing-actions-primary">
            <span className="my-listing-id" aria-label={`Listing ID: ${l.id.slice(-6)}`}>
              #{l.id.slice(-6)}
            </span>
            <div className="my-listing-action-buttons">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  router.push(`/listings/${l.id}`);
                }}
                aria-label={`${t("view") || "View"} listing: ${l.name}`}
              >
                <span aria-hidden="true">👁️</span>
                <span className="btn-text">{t("view") || "View"}</span>
              </button>
              
              <button
                className="btn btn-sm"
                onClick={() => openEdit(l)}
                aria-label={`${t("edit") || "Edit"} listing: ${l.name}`}
              >
                <span aria-hidden="true">✏️</span>
                <span className="btn-text">{t("edit") || "Edit"}</span>
              </button>
              
              <button
                className="btn btn-sm btn-extend"
                onClick={() => startExtendFlow(l)}
                aria-label={`${t("extend") || "Extend"} listing: ${l.name}`}
              >
                <span aria-hidden="true">⏰</span>
                <span className="btn-text">{t("extend") || "Extend"}</span>
              </button>
            </div>
          </div>
          
          <div className="my-listing-actions-secondary" role="group" aria-label="Additional actions">
            {l.contact && (
              <button
                className="btn btn-ghost btn-sm btn-icon-only"
                onClick={() => window.open(`tel:${l.contact}`)}
                aria-label={`${t("call") || "Call"}: ${l.contact}`}
                title={t("call") || "Call"}
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
              aria-label={`${t("emailAction") || "Email"} listing owner`}
              title={t("emailAction") || "Email"}
            >
              <span aria-hidden="true">✉️</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={() => {
                navigator.clipboard?.writeText(l.contact || "");
                showMessage(t("copied") || "Copied!", "success");
              }}
              aria-label={`${t("copy") || "Copy"} contact information`}
              title={t("copy") || "Copy"}
            >
              <span aria-hidden="true">📋</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only"
              onClick={() => handleShareListing && handleShareListing(l)}
              aria-label={`${t("share") || "Share"} listing: ${l.name}`}
              title={t("share") || "Share"}
            >
              <span aria-hidden="true">🔗</span>
            </button>
            <button
              className="btn btn-ghost btn-sm btn-icon-only btn-danger"
              onClick={() => confirmDelete && confirmDelete(l.id)}
              aria-label={`${t("confirmDelete") || "Delete"} listing: ${l.name}`}
              title={t("confirmDelete") || "Delete"}
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
