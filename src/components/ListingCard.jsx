import React from "react";

const ListingCard = React.memo(({
  listing: l,
  t,
  categoryIcons,
  getDescriptionPreview,
  getListingStats,
  onSelect,
  onShare,
}) => {
  const stats = getListingStats(l);

  return (
    <article
      className="listing-card explore-card-modern"
      onClick={() => onSelect(l)}
    >
      <header className="listing-header listing-header-dense">
        <div className="listing-title-wrap">
          <div className="listing-title-row">
            <span className="listing-icon-bubble">
              {categoryIcons[l.category] || "🏷️"}
            </span>
            <div>
              <h3 className="listing-title">{l.name}</h3>
              <div className="listing-meta pill-row-tight">
                <span className="pill pill-category">{t(l.category) || l.category}</span>
                <span className="pill pill-location">📍 {l.location || t("unspecified")}</span>
                {l.expiresAt && (
                  <span className="pill pill-ghost subtle-pill">
                    ⏱️ {new Date(l.expiresAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="listing-badges dense-badges">
          {l.offerprice && <span className="pill pill-price">{l.offerprice}</span>}
          <span className="badge verified">✓ {t("verified")}</span>
        </div>
      </header>

      <div className="listing-card-body">
        <p className="listing-description listing-description-clamp listing-description-preview">
          {getDescriptionPreview(l.description, 30)}
        </p>

        <div className="listing-stats spaced">
          <span className="stat-chip rating">⭐ {Number(stats.avgRating || 0).toFixed(1)}</span>
          <span className="stat-chip">💬 {stats.feedbackCount}</span>
          <span className="stat-chip subtle">🔥 {stats.engagement}</span>
          {l.tags && (
            <span className="pill pill-tags">
              {l.tags.split(",")[0]?.trim()}
              {l.tags.split(",").length > 1 ? " +" : ""}
            </span>
          )}
        </div>
      </div>

      <div
        className="listing-footer-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="listing-footer-left">
          {l.contact && (
            <span className="pill pill-contact ghost-pill">
              📞 {l.contact}
            </span>
          )}
          {l.socialLink && (
            <span className="pill pill-ghost subtle-pill">
              🔗 {t("websiteLabel")}
            </span>
          )}
        </div>

        <div className="listing-actions compact">
          {l.contact && (
            <button
              className="icon-btn"
              type="button"
              onClick={() => window.open(`tel:${l.contact}`)}
              aria-label={t("callAction")}
            >
              📞
            </button>
          )}
          <button
            className="icon-btn"
            type="button"
            onClick={() => window.open(
              `mailto:${l.userEmail || ""}?subject=Regarding%20${encodeURIComponent(
                l.name || ""
              )}`
            )}
            aria-label={t("emailAction")}
          >
            ✉️
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={() => onShare(l)}
            aria-label={t("share")}
          >
            🔗
          </button>
        </div>
      </div>
    </article>
  );
});

export default ListingCard;
