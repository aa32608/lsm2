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
           </div>

           {/* Active Filters Chips */}
           {(catFilter || locFilter || q) && (
             <div className="active-filters-bar" style={{ marginBottom: '16px' }}>
               <span className="active-filters-label">{t("filters")}:</span>
               <div className="active-filters-chips">
                 {catFilter && (
                   <span className="active-filter-chip">
                     {t("category")}: {t(catFilter) || catFilter}
                     <button className="filter-chip-remove" onClick={() => setCatFilter("")}>✕</button>
                   </span>
                 )}
                 {locFilter && (
                   <span className="active-filter-chip">
                     {t("location")}: {locFilter}
                     <button className="filter-chip-remove" onClick={() => setLocFilter("")}>✕</button>
                   </span>
                 )}
                 {q && (
                   <span className="active-filter-chip">
                     {t("search")}: {q}
                     <button className="filter-chip-remove" onClick={() => setQ("")}>✕</button>
                   </span>
                 )}
                 <button className="btn btn-ghost small" onClick={() => { setCatFilter(""); setLocFilter(""); setQ(""); }}>
                   {t("clearAll") || "Clear All"}
                 </button>
               </div>
             </div>
           )}

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
