export default function MyListingsTab({
  t,
  myListings,
  categoryIcons,
  setSelectedListing,
  setEditingListing,
  setShowExtendModal,
  setShowDeleteConfirm,
}) {
  return (
    <div className="section my-listings-section">
      <div className="section-header-row">
        <div>
          <h2 className="section-title-inner">📦 {t("myListings")}</h2>
          <p className="section-subtitle-small">
            {t("myListingsSubtitle")}
          </p>
        </div>
      </div>

      {myListings.length === 0 ? (
        <div className="empty-state">
          <p>📭 {t("noMyListings")}</p>
        </div>
      ) : (
        <div className="listing-grid compact">
          {myListings.map((l) => (
            <article key={l.id} className="listing-card elevated">
              <header className="listing-header">
                <div className="listing-icon-bubble">
                  {categoryIcons[l.category] || "🏷️"}
                </div>
                <h3 className="listing-title">{l.name}</h3>
              </header>

              <div className="listing-meta-row">
                {l.location && <span>📍 {l.location}</span>}
                {l.expiresAt && (
                  <span>⏳ {t("expires")} {l.expiresAt}</span>
                )}
              </div>

              <div className="listing-actions-row">
                <button
                  className="btn btn-ghost"
                  onClick={() => setSelectedListing(l)}
                >
                  👁 {t("view")}
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={() => setEditingListing(l)}
                >
                  ✏️ {t("edit")}
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={() => setShowExtendModal(l)}
                >
                  ⏱ {t("extend")}
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => setShowDeleteConfirm(l)}
                >
                  🗑 {t("delete")}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
