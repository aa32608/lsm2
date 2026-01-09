import { useState, useEffect } from 'react';

export default function FilterSheet({
  isOpen,
  onClose,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  categories,
  mkCities,
  t,
  verifiedListings,
  q
}) {
  const [localCatFilter, setLocalCatFilter] = useState(catFilter);
  const [localLocFilter, setLocalLocFilter] = useState(locFilter);
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [activeTab, setActiveTab] = useState('category');

  useEffect(() => {
    setLocalCatFilter(catFilter);
    setLocalLocFilter(locFilter);
    setLocalSortBy(sortBy);
  }, [catFilter, locFilter, sortBy, isOpen]);

  const handleApply = () => {
    setCatFilter(localCatFilter);
    setLocFilter(localLocFilter);
    setSortBy(localSortBy);
    onClose();
  };

  const handleReset = () => {
    setLocalCatFilter('');
    setLocalLocFilter('');
    setLocalSortBy('topRated');
  };

  const hasActiveFilters = localCatFilter || localLocFilter || localSortBy !== 'topRated';

  const getFilterStats = () => {
    let filtered = verifiedListings || [];
    
    if (q) {
      const searchLower = q.toLowerCase();
      filtered = filtered.filter(l => 
        (l.name?.toLowerCase().includes(searchLower)) ||
        (l.description?.toLowerCase().includes(searchLower)) ||
        (l.tags?.toLowerCase().includes(searchLower))
      );
    }
    
    if (localCatFilter) {
      filtered = filtered.filter(l => (t(l.category) || l.category) === localCatFilter);
    }
    
    if (localLocFilter) {
      filtered = filtered.filter(l => l.location === localLocFilter);
    }
    
    return {
      total: filtered.length,
      categories: [...new Set(filtered.map(l => t(l.category) || l.category))].length,
      cities: [...new Set(filtered.map(l => l.location))].length
    };
  };

  const stats = getFilterStats();

  return (
    <div className={`filter-sheet ${isOpen ? 'open' : ''}`}>
      <div className="filter-sheet-overlay" onClick={onClose} />
      
      <div className="filter-sheet-content">
        <div className="filter-sheet-header">
          <h3>{t('filters') || 'Filters'}</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="filter-sheet-tabs">
          <button
            className={`tab-button ${activeTab === 'category' ? 'active' : ''}`}
            onClick={() => setActiveTab('category')}
          >
            {t('category') || 'Category'}
            {localCatFilter && <span className="filter-badge">1</span>}
          </button>
          <button
            className={`tab-button ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            {t('location') || 'Location'}
            {localLocFilter && <span className="filter-badge">1</span>}
          </button>
          <button
            className={`tab-button ${activeTab === 'sort' ? 'active' : ''}`}
            onClick={() => setActiveTab('sort')}
          >
            {t('sort') || 'Sort'}
            {localSortBy !== 'topRated' && <span className="filter-badge">1</span>}
          </button>
        </div>

        <div className="filter-sheet-body">
          {activeTab === 'category' && (
            <div className="filter-section">
              <div className="filter-section-header">
                <h4>{t('selectCategory') || 'Select Category'}</h4>
                {localCatFilter && (
                  <button
                    className="clear-filter-button"
                    onClick={() => setLocalCatFilter('')}
                  >
                    {t('clear') || 'Clear'}
                  </button>
                )}
              </div>
              <div className="category-grid">
                <button
                  className={`category-option ${!localCatFilter ? 'active' : ''}`}
                  onClick={() => setLocalCatFilter('')}
                >
                  <span className="category-icon">🔄</span>
                  <span className="category-name">{t('allCategories') || 'All Categories'}</span>
                  <span className="category-count">{verifiedListings?.length || 0}</span>
                </button>
                {categories.map(cat => {
                  const count = verifiedListings?.filter(l => (t(l.category) || l.category) === cat).length || 0;
                  return (
                    <button
                      key={cat}
                      className={`category-option ${localCatFilter === cat ? 'active' : ''}`}
                      onClick={() => setLocalCatFilter(cat)}
                    >
                      <span className="category-icon">{cat.slice(0, 2).toUpperCase()}</span>
                      <span className="category-name">{t(cat) || cat}</span>
                      <span className="category-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="filter-section">
              <div className="filter-section-header">
                <h4>{t('selectLocation') || 'Select Location'}</h4>
                {localLocFilter && (
                  <button
                    className="clear-filter-button"
                    onClick={() => setLocalLocFilter('')}
                  >
                    {t('clear') || 'Clear'}
                  </button>
                )}
              </div>
              <div className="location-list">
                <button
                  className={`location-option ${!localLocFilter ? 'active' : ''}`}
                  onClick={() => setLocalLocFilter('')}
                >
                  <span className="location-name">{t('allLocations') || 'All Locations'}</span>
                  <span className="location-count">{verifiedListings?.length || 0}</span>
                </button>
                {mkCities.map(city => {
                  const count = verifiedListings?.filter(l => l.location === city).length || 0;
                  return (
                    <button
                      key={city}
                      className={`location-option ${localLocFilter === city ? 'active' : ''}`}
                      onClick={() => setLocalLocFilter(city)}
                    >
                      <span className="location-name">{city}</span>
                      <span className="location-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'sort' && (
            <div className="filter-section">
              <div className="filter-section-header">
                <h4>{t('sortBy') || 'Sort By'}</h4>
              </div>
              <div className="sort-options">
                <label className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value="topRated"
                    checked={localSortBy === 'topRated'}
                    onChange={e => setLocalSortBy(e.target.value)}
                  />
                  <span className="sort-label">
                    <span className="sort-name">{t('sortTopRated') || 'Highest Rated'}</span>
                    <span className="sort-desc">{t('sortTopRatedDesc') || 'Best reviews first'}</span>
                  </span>
                </label>
                <label className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value="newest"
                    checked={localSortBy === 'newest'}
                    onChange={e => setLocalSortBy(e.target.value)}
                  />
                  <span className="sort-label">
                    <span className="sort-name">{t('sortNewest') || 'Newest'}</span>
                    <span className="sort-desc">{t('sortNewestDesc') || 'Recently added'}</span>
                  </span>
                </label>
                <label className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value="expiring"
                    checked={localSortBy === 'expiring'}
                    onChange={e => setLocalSortBy(e.target.value)}
                  />
                  <span className="sort-label">
                    <span className="sort-name">{t('sortExpiring') || 'Expiring Soon'}</span>
                    <span className="sort-desc">{t('sortExpiringDesc') || 'Ending listings first'}</span>
                  </span>
                </label>
                <label className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value="az"
                    checked={localSortBy === 'az'}
                    onChange={e => setLocalSortBy(e.target.value)}
                  />
                  <span className="sort-label">
                    <span className="sort-name">{t('sortAZ') || 'A-Z'}</span>
                    <span className="sort-desc">{t('sortAZDesc') || 'Alphabetical order'}</span>
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="filter-sheet-footer">
          <div className="filter-stats">
            <span className="stats-label">{t('results') || 'Results'}:</span>
            <span className="stats-value">{stats.total}</span>
            {hasActiveFilters && (
              <>
                <span className="stats-separator">•</span>
                <span className="stats-categories">{stats.categories} {t('categories') || 'categories'}</span>
                <span className="stats-separator">•</span>
                <span className="stats-cities">{stats.cities} {t('cities') || 'cities'}</span>
              </>
            )}
          </div>
          
          <div className="filter-actions">
            {hasActiveFilters && (
              <button
                className="button button-secondary"
                onClick={handleReset}
              >
                {t('reset') || 'Reset'}
              </button>
            )}
            <button
              className="button button-primary"
              onClick={handleApply}
            >
              {t('apply') || 'Apply'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}