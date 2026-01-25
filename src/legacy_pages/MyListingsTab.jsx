import MyListingCard from "../components/MyListingCard";

export default function MyListingsTab({
  t,
  myListings,
  categoryIcons,
  setSelectedListing,
  setEditingListing,
  setShowExtendModal,
  setShowDeleteConfirm,
  // Added for MyListingCard
  getDaysUntilExpiry,
  getListingStats,
  getDescriptionPreview,
  showMessage,
  handleShareListing,
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
        <div className="listing-grid my-listings-grid responsive-grid">
          {myListings.map((l) => (
            <MyListingCard
              key={l.id}
              listing={l}
              t={t}
              categoryIcons={categoryIcons}
              getDaysUntilExpiry={getDaysUntilExpiry}
              getListingStats={getListingStats}
              getDescriptionPreview={getDescriptionPreview}
              setSelectedListing={setSelectedListing}
              openEdit={setEditingListing}
              startExtendFlow={setShowExtendModal}
              showMessage={showMessage}
              handleShareListing={handleShareListing}
              confirmDelete={setShowDeleteConfirm}
            />
          ))}
        </div>
      )}
    </div>
  );
}
