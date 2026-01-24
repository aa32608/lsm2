import ListingCard from "../components/ListingCard";
import { useRef, useEffect, useState } from "react";
import Filtersheet from "../components/Filtersheet";

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
  categories,
  allLocations,
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

            <button 
              className="icon-btn" 
              onClick={() => setFiltersOpen(true)}
              title={t("filters") || "Filters"}
              style={{ height: '44px', width: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}
            >
              🔍
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
               {categories && categories.map(c => (
                 <option key={c} value={t(c)}>{t(c)}</option>
               ))}
             </select>

             <select
               className="select"
               value={locFilter}
               onChange={(e) => setLocFilter(e.target.value)}
             >
               <option value="">{t("allCities")}</option>
               {allLocations && allLocations.map(city => (
                 <option key={city} value={city}>{city}</option>
               ))}
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

        {/* SIDEBAR (RIGHT) */}
        <aside className="explore-sidebar">
           {/* PROMOTIONAL BANNER (Moved to Sidebar) */}
           <div className="promo-banner-section sidebar-promo">
              <div className="promo-banner-content">
                 <div className="promo-text">
                    <h3>{t("promoteYourListing") || "Promote Your Listing"}</h3>
                    <p>{t("promoteYourListingDesc") || "Post your own request, browse hidden gems, or boost your visibility."}</p>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                   <button className="btn btn-primary promo-btn full-width" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                      ➕ {t("postService") || "Post Service"}
                   </button>
                   <button className="btn btn-outline promo-btn full-width" onClick={() => setCatFilter("")}>
                      🔍 {t("browseCategories") || "Browse All"}
                   </button>
                 </div>
              </div>
           </div>

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
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8385998516338936" crossorigin="anonymous"></script>
                 <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-8385998516338936"
                    data-ad-slot="1802538697"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>       
              </div>
           </div>
        </aside>
      </div>

      <Filtersheet
        t={t}
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        q={q}
        setQ={setQ}
        catFilter={catFilter}
        setCatFilter={setCatFilter}
        locFilter={locFilter}
        setLocFilter={setLocFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        categories={categories}
        categoryIcons={categoryIcons}
        allLocations={allLocations}
      />
    </div>
  );
}
