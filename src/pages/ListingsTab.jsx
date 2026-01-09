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
  setFiltersOpen
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
      <div className={`listing-grid ${viewMode}`}>
        {pagedFiltered.map((l) => (
          <article
            key={l.id}
            className="listing-card elevated"
            onClick={() => setSelectedListing(l)}
          >
            <header className="listing-header">
              <div className="listing-icon-bubble">
                {categoryIcons[l.category] || "🏷️"}
              </div>
              <h3 className="listing-title">{l.name}</h3>
            </header>

            <div className="listing-meta-row">
              {l.location && <span>📍 {l.location}</span>}
              {feedbackAverages[l.id]?.avg && (
                <span>⭐ {feedbackAverages[l.id].avg}</span>
              )}
            </div>
          </article>
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
