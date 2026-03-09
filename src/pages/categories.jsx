import React from 'react';
import SEOHead from '../components/SEOHead';
import { categoryGroups, categoryIcons } from '../constants';

const CategoriesPage = () => {
  // Get all categories from all groups
  const allCategories = categoryGroups.flatMap(group => group.categories);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Business Categories - BizCall.mk",
    "description": "Browse all business categories available on BizCall.mk. Find businesses by category across North Macedonia.",
    "url": "https://www.bizcall.mk/categories",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": allCategories.length,
      "itemListElement": allCategories.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": category,
        "description": `Find ${category} businesses in North Macedonia`,
        "url": `https://www.bizcall.mk/listings?category=${category}`
      }))
    }
  };

  return (
    <>
      <SEOHead
        title="Business Categories - BizCall.mk"
        description="Browse all business categories on BizCall.mk. Find restaurants, services, shops, and professionals by category across North Macedonia."
        keywords="business categories North Macedonia, find by category, Skopje restaurants, Bitola services, Ohrid businesses, Macedonia business directory"
        canonical="https://www.bizcall.mk/categories"
        structuredData={structuredData}
      />
      
      <div className="container categories-page">
        <section className="categories-hero">
          <h1>Browse Business Categories</h1>
          <p className="categories-subtitle">
            Find exactly what you're looking for by browsing our comprehensive business categories
          </p>
        </section>

        <section className="categories-grid">
          {categoryGroups.map((group) => (
            <div key={group.id} className="category-group">
              <h2 className="category-group-title">{group.labelKey}</h2>
              <div className="category-items">
                {group.categories.map(category => (
                  <a 
                    key={category}
                    href={`/listings?category=${category}`}
                    className="category-item"
                  >
                    <span className="category-icon">{categoryIcons[category] || '🏷️'}</span>
                    <span className="category-name">{category}</span>
                    <span className="category-arrow">→</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="categories-info">
          <h2>How to Use Business Categories</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>🔍 Browse Categories</h3>
              <p>Explore different business categories to find the services you need. Each category contains businesses specific to that industry.</p>
            </div>
            <div className="info-item">
              <h3>📍 Filter by Location</h3>
              <p>Combine category browsing with location filters to find businesses near you in cities like Skopje, Bitola, Ohrid, and more.</p>
            </div>
            <div className="info-item">
              <h3>⭐ Featured Listings</h3>
              <p>Look for featured businesses within each category for premium services and highly-rated providers.</p>
            </div>
            <div className="info-item">
              <h3>📞 Contact Directly</h3>
              <p>Once you find a business, contact them directly through phone, email, or their website to inquire about services.</p>
            </div>
          </div>
        </section>

        <section className="popular-categories">
          <h2>Most Popular Categories</h2>
          <div className="popular-grid">
            <div className="popular-item">
              <span className="popular-icon">🍽️</span>
              <div>
                <h3>Restaurants & Cafes</h3>
                <p>Find the best dining experiences across North Macedonia</p>
              </div>
            </div>
            <div className="popular-item">
              <span className="popular-icon">🔧</span>
              <div>
                <h3>Home Services</h3>
                <p>Reliable plumbers, electricians, and repair services</p>
              </div>
            </div>
            <div className="popular-item">
              <span className="popular-icon">💇</span>
              <div>
                <h3>Beauty & Wellness</h3>
                <p>Salons, spas, and wellness centers</p>
              </div>
            </div>
            <div className="popular-item">
              <span className="popular-icon">🚗</span>
              <div>
                <h3>Automotive</h3>
                <p>Car repair, maintenance, and automotive services</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .categories-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .categories-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .categories-hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .categories-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .categories-grid {
          margin-bottom: 4rem;
        }

        .category-group {
          margin-bottom: 3rem;
        }

        .category-group-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1.5rem;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
        }

        .category-items {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .category-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }

        .category-item:hover {
          border-color: #3b82f6;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .category-icon {
          font-size: 2rem;
        }

        .category-name {
          flex: 1;
          font-weight: 500;
          color: #334155;
        }

        .category-arrow {
          color: #64748b;
          font-weight: 600;
        }

        .categories-info,
        .popular-categories {
          margin-bottom: 4rem;
        }

        .categories-info h2,
        .popular-categories h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 2rem;
          text-align: center;
        }

        .info-grid,
        .popular-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .info-item,
        .popular-item {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .info-item h3,
        .popular-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .info-item p,
        .popular-item p {
          color: #64748b;
          line-height: 1.6;
        }

        .popular-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .popular-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .popular-item div {
          flex: 1;
        }

        @media (max-width: 768px) {
          .categories-hero h1 {
            font-size: 2rem;
          }

          .categories-subtitle {
            font-size: 1rem;
          }

          .category-items {
            grid-template-columns: 1fr;
          }

          .popular-item {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};

export default CategoriesPage;
