import ListingCard from "../components/ListingCard";
import { useRef, useEffect } from "react";

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

  // Auto-slide effect for Premium Spotlight
  useEffect(() => {
    if (!featuredListings || featuredListings.length === 0) return;
    
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { current } = scrollRef;
        // Check if we've reached the end
        if (current.scrollLeft + current.clientWidth >= current.scrollWidth - 10) {
           current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
           current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 5500); // 5.5 seconds

    return () => clearInterval(interval);
  }, [featuredListings]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
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

      {/* PREMIUM SPOTLIGHT SECTION */}
      {featuredListings && featuredListings.length > 0 && (
        <section className="premium-spotlight-section">
          <div className="spotlight-header">
            <div className="spotlight-title-group">
              <div className="spotlight-badge">✨ {t("featured") || "Featured"}</div>
              <h3>{t("premiumSelection") || "Premium Selection"}</h3>
            </div>
            <div className="spotlight-controls">
              <button onClick={() => scroll('left')} className="spotlight-nav-btn">←</button>
              <button onClick={() => scroll('right')} className="spotlight-nav-btn">→</button>
            </div>
          </div>
          
          <div className="spotlight-scroll-container" ref={scrollRef}>
            {featuredListings.map((l) => (
              <div key={l.id} className="spotlight-card-wrapper">
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
        </section>
      )}

      {/* PROMOTIONAL BANNER (FILLER CONTENT) */}
      <div className="promo-banner-section">
         <div className="promo-banner-content">
            <div className="promo-text">
               <h3>{t("cantFindListing") || "Can't find what you're looking for?"}</h3>
               <p>{t("postYourOwn") || "Post your own request or browse by category to find hidden gems."}</p>
            </div>
            <button className="btn btn-primary promo-btn" onClick={() => setCatFilter("")}>
               {t("browseCategories") || "Browse All Categories"}
            </button>
         </div>
      </div>

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
