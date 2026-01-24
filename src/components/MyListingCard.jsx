import React from "react";

const MyListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons,
  getDaysUntilExpiry,
  getListingStats,
  getDescriptionPreview,
  setSelectedListing,
  openEdit,
  startExtendFlow,
  showMessage,
  handleShareListing,
  confirmDelete,
}) => {
  const stats = getListingStats(l);
  const days = getDaysUntilExpiry(l.expiresAt);
  const isExpiringSoon = days !== null && days > 0 && days <= 7;
  const isExpired = days !== null && days <= 0;

  return (
    <article className="listing-card my-listing-card elevated" style={{display: 'inline-table'}}>
      <header className="listing-header my-listing-header rich-header">
        <div className="listing-icon-bubble">{categoryIcons[l.category] || "🏷️"}</div>
        <div className="listing-header-main">
          <div className="listing-title-row spaced">
            <h3 className="listing-title">{l.name}</h3>
            <span
              className={`status-chip ${l.status === "verified" ? "status-chip-verified" : "status-chip-pending"}`}
            >
              {l.status === "verified" ? `✅ ${t("verified")}` : `⏳ ${t("pending")}`}
            </span>
          </div>
          <div className="listing-meta-row pill-row-tight">
            <span className="pill pill-category">
              {categoryIcons[l.category] || "🏷️"} {t(l.category) || l.category}
            </span>
            {l.location && (
              <span className="pill pill-location">
                📍 {l.location}
              </span>
            )}
            {l.createdAt && (
              <span className="pill pill-soft pill-date">
                📅 {new Date(l.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
          <div className={`listing-expiry-info ${isExpiringSoon ? "expiring-soon" : ""} ${isExpired ? "expired" : ""}`}>
            {l.expiresAt ? (
              <>
                <span className="expiry-label">{t("expires")}:</span>
                <span className="expiry-date">{new Date(l.expiresAt).toLocaleDateString()}</span>
                {days !== null && (
                  <span className={`expiry-days ${isExpiringSoon ? "warning" : ""} ${isExpired ? "expired-text" : ""}`}>
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
              <span className="expiry-date">{t("noExpiry")}</span>
            )}
          </div>
        </div>
        <div className="listing-score-pill">
          <span className="score-main">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
          <span className="score-sub">{stats.feedbackCount} {t("reviews")}</span>
        </div>
      </header>

      <div className="listing-card-body-enhanced">
        <p className="listing-description clamp-3 enhanced-copy">
          {getDescriptionPreview(l.description, 15)}
        </p>

        <div className="listing-stats ribboned">
          <span className="stat-chip rating">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
          <span className="stat-chip">💬 {stats.feedbackCount}</span>
          <span className="stat-chip subtle">🔥 {stats.engagement}</span>
          {l.offerprice && (
            <span className="pill pill-price subtle-pill">💶 {l.offerprice}</span>
          )}
        </div>

        {(l.tags || l.contact) && (
          <div className="my-listing-highlights rich-highlights">
            {l.tags && (
              <span className="pill pill-tags">🏷️ {l.tags.split(",")[0]?.trim() || l.tags}</span>
            )}
            {l.contact && (
              <span className="pill pill-contact">📞 {l.contact}</span>
            )}
          </div>
        )}
      </div>

      <div className="my-listing-footer framed-footer">
        <div className="listing-actions-primary">
          <span className="listing-id-tiny" style={{ fontSize: '0.7rem', color: '#94a3b8', marginRight: 'auto', alignSelf: 'center' }}>
             #{l.id.slice(-6)}
          </span>
          <button
            className="btn btn-primary small"
            onClick={() => {
              setSelectedListing(l);
              const url = new URL(window.location.href);
              url.searchParams.set("listing", l.id);
              window.history.replaceState({}, "", url.toString());
            }}
          >
            👁️ {t("view")}
          </button>
          
          <button
            className="btn small"
            onClick={() => openEdit(l)}
          >
            ✏️ {t("edit")}
          </button>
          <button
            className="btn small btn-extend"
            onClick={() => startExtendFlow(l)}
          >
            ⏰ {t("extend")}
          </button>
        </div>
        <div className="listing-actions-secondary">
          {l.contact && (
            <button
              className="btn btn-ghost small icon-only"
              onClick={() => window.open(`tel:${l.contact}`)}
              title={t("call")}
              aria-label={t("call")}
            >
              📞
            </button>
          )}
          <button
            className="btn btn-ghost small icon-only"
            onClick={() =>
              window.open(
                `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                  l.name || ""
                )}`
              )
            }
            title={t("emailAction")}
            aria-label={t("emailAction")}
          >
            ✉️
          </button>
          <button
            className="btn btn-ghost small icon-only"
            onClick={() => {
              navigator.clipboard?.writeText(l.contact || "");
              showMessage(t("copied"), "success");
            }}
            title={t("copy")}
            aria-label={t("copy")}
          >
            📋
          </button>
          <button
            className="btn btn-ghost small icon-only"
            onClick={() => handleShareListing && handleShareListing(l)}
            title={t("share")}
            aria-label={t("share")}
          >
            🔗
          </button>
          <button
            className="btn btn-ghost small icon-only"
            onClick={() => confirmDelete && confirmDelete(l.id)}
            title={t("confirmDelete")}
            aria-label={t("confirmDelete")}
          >
            🗑️
          </button>
        </div>
      </div>
    </article>
  );
});

export default MyListingCard;
