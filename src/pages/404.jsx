import React from 'react';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';

const NotFoundPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Page Not Found - BizCall.mk",
    "description": "The page you're looking for doesn't exist. Browse our business directory or search for businesses in North Macedonia.",
    "url": "https://www.bizcall.mk/404"
  };

  return (
    <>
      <SEOHead
        title="Page Not Found - BizCall.mk"
        description="The page you're looking for doesn't exist. Browse our business directory or search for businesses in North Macedonia."
        keywords="404, page not found, BizCall.mk, North Macedonia business directory"
        canonical="https://www.bizcall.mk/404"
        noIndex={true}
        structuredData={structuredData}
      />
      
      <div className="container not-found-page">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2 className="error-title">Page Not Found</h2>
          <p className="error-description">
            The page you're looking for doesn't exist or has been moved. 
            But don't worry, you can still find amazing businesses across North Macedonia!
          </p>
          
          <div className="error-actions">
            <Link href="/" className="btn btn-primary">
              🏠 Go Home
            </Link>
            <Link href="/listings" className="btn btn-secondary">
              📋 Browse Listings
            </Link>
            <Link href="/categories" className="btn btn-ghost">
              🗂️ Browse Categories
            </Link>
          </div>
          
          <div className="helpful-links">
            <h3>Looking for something specific?</h3>
            <div className="links-grid">
              <Link href="/listings?category=Restaurants" className="help-link">
                🍽️ Restaurants
              </Link>
              <Link href="/listings?category=Home Services" className="help-link">
                🔧 Home Services
              </Link>
              <Link href="/listings?category=Beauty & Wellness" className="help-link">
                💇 Beauty & Wellness
              </Link>
              <Link href="/listings?category=Automotive" className="help-link">
                🚗 Automotive
              </Link>
              <Link href="/listings?category=Healthcare" className="help-link">
                🏥 Healthcare
              </Link>
              <Link href="/listings?category=Education" className="help-link">
                📚 Education
              </Link>
            </div>
          </div>
          
          <div className="search-suggestion">
            <h3>Try our search</h3>
            <p>
              Use our search bar to find specific businesses, services, or locations 
              across North Macedonia including Skopje, Bitola, Ohrid, and more.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .not-found-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem;
          text-align: center;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-code {
          font-size: 8rem;
          font-weight: 700;
          color: #3b82f6;
          margin: 0;
          line-height: 1;
        }

        .error-title {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin: 1rem 0;
        }

        .error-description {
          font-size: 1.125rem;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .error-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 3rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-primary {
          background: #3b82f6;
          color: white;
        }

        .btn-primary:hover {
          background: #2563eb;
        }

        .btn-secondary {
          background: #64748b;
          color: white;
        }

        .btn-secondary:hover {
          background: #475569;
        }

        .btn-ghost {
          background: transparent;
          color: #3b82f6;
          border: 1px solid #3b82f6;
        }

        .btn-ghost:hover {
          background: #3b82f6;
          color: white;
        }

        .helpful-links,
        .search-suggestion {
          margin-bottom: 2rem;
        }

        .helpful-links h3,
        .search-suggestion h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }

        .help-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          text-decoration: none;
          color: #334155;
          font-weight: 500;
          transition: all 0.2s;
        }

        .help-link:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          transform: translateY(-2px);
        }

        .search-suggestion p {
          color: #64748b;
          line-height: 1.6;
          max-width: 500px;
          margin: 1rem auto 0;
        }

        @media (max-width: 768px) {
          .error-code {
            font-size: 6rem;
          }

          .error-title {
            font-size: 1.5rem;
          }

          .error-actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 100%;
            max-width: 250px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default NotFoundPage;
