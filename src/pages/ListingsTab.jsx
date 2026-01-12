import ListingCard from "../components/ListingCard";

export default function ListingsTab({
  t,
  viewMode,
  setViewMode,
  q,
  setQ,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  pagedFiltered,
  page,
  totalPages,
  setPage,
  pageSize,
  setPageSize,
  categoryIcons,
  feedbackAverages,
  setSelectedListing,
  filtersOpen,
  setFiltersOpen,
  // Added for ListingCard
  getDescriptionPreview,
  getListingStats,
  handleShareListing,
  showMessage,
  toggleFav,
  favorites
}) {
  return (
    <div className="section all-listings-section">
      <div className="section-header-row stacked-mobile">
        <div>
          <h2 className="section-title-inner">🧭 {t("explore")}</h2>
          <p className="section-subtitle-small">
            {t("exploreSubtitle")}
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filters-bar">
        <input
          type="search"
          className="input"
          placeholder={t("searchPlaceholder")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="select"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          <option value="">{t("allCategories")}</option>
        </select>

        <select
          className="select"
          value={locFilter}
          onChange={(e) => setLocFilter(e.target.value)}
        >
          <option value="">{t("allCities")}</option>
        </select>

        <select
          className="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">{t("sortNewest")}</option>
          <option value="topRated">{t("sortTopRated")}</option>
          <option value="expiring">{t("sortExpiring")}</option>
          <option value="az">{t("sortAZ")}</option>
        </select>
      </div>

      {/* LISTINGS GRID */}
      <div className={`listing-grid-${viewMode}`}>
        {pagedFiltered.map((l) => (
          <ListingCard
            key={l.id}
            listing={l}
            t={t}
            categoryIcons={categoryIcons}
            getDescriptionPreview={getDescriptionPreview}
            getListingStats={getListingStats}
            onSelect={() => {
              setSelectedListing(l);
              const url = new URL(window.location.href);
              url.searchParams.set("listing", l.id);
              window.history.replaceState({}, "", url.toString());
            }}
            onShare={() => handleShareListing(l)}
            showMessage={showMessage}
            toggleFav={toggleFav}
            isFavorite={favorites.includes(l.id)}
          />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          className="btn btn-ghost"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          ←
        </button>
        <span>{page} / {totalPages}</span>
        <button
          className="btn btn-ghost"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}
