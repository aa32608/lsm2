import ListingCard from "../components/ListingCard";
import { useRef } from "react";

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
  favorites,
  featuredListings = []
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

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

      {/* COMPACT FEATURED SECTION */}
      {featuredListings && featuredListings.length > 0 && (
        <div className="explore-featured-compact">
          <div className="explore-featured-header">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="text-yellow-500">✨</span> {t("featured") || "Featured"}
            </h3>
            <div className="scroll-controls">
              <button onClick={() => scroll('left')} className="scroll-btn">←</button>
              <button onClick={() => scroll('right')} className="scroll-btn">→</button>
            </div>
          </div>
          <div className="explore-featured-scroll" ref={scrollRef}>
            {featuredListings.map((l) => (
              <div key={l.id} className="explore-featured-card-wrapper">
                <ListingCard
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
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FILTER BAR */}
      <div className="filters-bar">
        <button 
          className="icon-btn" 
          onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
          title={viewMode === "list" ? t("switchToGrid") || "Grid View" : t("switchToList") || "List View"}
          style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}
        >
          {viewMode === "list" ? "📱" : "📝"}
        </button>

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
        <span>{t("page")} {page} {t("of")} {totalPages}</span>
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
