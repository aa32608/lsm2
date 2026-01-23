import ListingCard from "../components/ListingCard";
import { useRef, useEffect, useState } from "react";

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
  const [currentFeaturedSlide, setCurrentFeaturedSlide] = useState(0);

  // Auto-slide effect for Sidebar Featured
  useEffect(() => {
    if (!featuredListings || featuredListings.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentFeaturedSlide(prev => (prev === featuredListings.length - 1 ? 0 : prev + 1));
    }, 5500); 

    return () => clearInterval(interval);
  }, [featuredListings]);

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

      <div className="explore-layout-container">
        {/* MAIN LISTINGS CONTENT (LEFT) */}
        <div className="explore-main-content">
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
           
           {/* PROMOTIONAL BANNER (Bottom of Main Content) */}
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
        </div>

        {/* SIDEBAR (RIGHT) */}
        <aside className="explore-sidebar">
           {/* SIDEBAR FEATURED CAROUSEL */}
           {featuredListings && featuredListings.length > 0 && (
             <div className="sidebar-featured-widget">
               <div className="sidebar-widget-header">
                 <h3>✨ {t("featured") || "Featured"}</h3>
               </div>
               <div className="sidebar-carousel">
                  <div className="sidebar-carousel-slide">
                    <ListingCard
                      listing={featuredListings[currentFeaturedSlide]}
                      t={t}
                      categoryIcons={categoryIcons}
                      getDescriptionPreview={getDescriptionPreview}
                      getListingStats={getListingStats}
                      onSelect={() => {
                        setSelectedListing(featuredListings[currentFeaturedSlide]);
                      }}
                      onShare={() => handleShareListing(featuredListings[currentFeaturedSlide])}
                      showMessage={showMessage}
                      toggleFav={toggleFav}
                      isFavorite={favorites.includes(featuredListings[currentFeaturedSlide].id)}
                    />
                  </div>
                  <div className="sidebar-carousel-dots">
                    {featuredListings.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`dot ${idx === currentFeaturedSlide ? 'active' : ''}`}
                        onClick={() => setCurrentFeaturedSlide(idx)}
                      />
                    ))}
                  </div>
               </div>
             </div>
           )}

           {/* ADSENSE PLACEHOLDER */}
           <div className="sidebar-ad-placeholder">
              <div className="ad-label">Advertisement</div>
              <div className="ad-content">
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-8385998516338936"
                    data-ad-slot="1802538697"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
