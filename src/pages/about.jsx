import React from 'react';
import SEOHead from '../components/SEOHead';

const AboutPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About BizCall.mk",
    "description": "Learn about BizCall.mk, North Macedonia's premier business directory connecting local businesses with customers since 2024.",
    "url": "https://www.bizcall.mk/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "BizCall.mk",
      "foundingDate": "2024",
      "areaServed": {
        "@type": "Country",
        "name": "North Macedonia"
      },
      "slogan": "Connecting North Macedonia's Businesses with Customers",
      "description": "BizCall.mk is the leading business directory in North Macedonia, helping local businesses connect with customers and grow their online presence.",
      "sameAs": [
        "https://www.facebook.com/bizcall.mk",
        "https://www.instagram.com/bizcall.mk"
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="About BizCall.mk - North Macedonia Business Directory"
        description="Learn about BizCall.mk, North Macedonia's premier business directory. Our mission is to connect local businesses with customers and help grow the Macedonian economy."
        keywords="about BizCall.mk, North Macedonia business directory, company mission, business directory Macedonia, local business platform"
        canonical="https://www.bizcall.mk/about"
        structuredData={structuredData}
      />
      
      <div className="container about-page">
        <section className="about-hero">
          <h1>About BizCall.mk</h1>
          <p className="about-subtitle">
            North Macedonia's Premier Business Directory - Connecting Local Businesses with Customers Since 2024
          </p>
        </section>

        <section className="about-mission">
          <h2>Our Mission</h2>
          <p>
            At BizCall.mk, we're dedicated to strengthening North Macedonia's local business community by providing a comprehensive, user-friendly platform that connects businesses with their ideal customers. We believe in the power of local commerce and are committed to helping businesses of all sizes thrive in the digital age.
          </p>
        </section>

        <section className="about-what-we-do">
          <h2>What We Do</h2>
          <div className="what-we-do-grid">
            <div className="what-we-do-item">
              <h3>📋 Business Listings</h3>
              <p>Comprehensive business directory with detailed listings, photos, and contact information for businesses across all Macedonian cities.</p>
            </div>
            <div className="what-we-do-item">
              <h3>🔍 Easy Discovery</h3>
              <p>Advanced search and filtering options help customers find exactly what they're looking for, from restaurants to professional services.</p>
            </div>
            <div className="what-we-do-item">
              <h3>📈 Business Growth</h3>
              <p>Featured listings and premium placement options help businesses increase their visibility and reach more potential customers.</p>
            </div>
            <div className="what-we-do-item">
              <h3>🤝 Community Building</h3>
              <p>We're building a trusted community where businesses and customers can connect, review, and grow together.</p>
            </div>
          </div>
        </section>

        <section className="about-stats">
          <h2>By the Numbers</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Business Listings</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Cities Covered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">Business Categories</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Monthly Visitors</div>
            </div>
          </div>
        </section>

        <section className="about-values">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🏪 Support Local</h3>
              <p>We believe in the power of local businesses to strengthen communities and drive economic growth.</p>
            </div>
            <div className="value-item">
              <h3>🔒 Trust & Safety</h3>
              <p>We verify businesses and maintain high standards to ensure a safe, trustworthy platform for everyone.</p>
            </div>
            <div className="value-item">
              <h3>💡 Innovation</h3>
              <p>We continuously improve our platform with new features and technologies to better serve our users.</p>
            </div>
            <div className="value-item">
              <h3>🌍 Accessibility</h3>
              <p>We're committed to making business discovery accessible to everyone, everywhere in North Macedonia.</p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <h2>Our Team</h2>
          <p>
            BizCall.mk was founded by a team of passionate entrepreneurs and technologists who understand the challenges and opportunities facing North Macedonia's business community. Our combined experience in digital marketing, web development, and local business gives us unique insights into what businesses need to succeed online.
          </p>
        </section>

        <section className="about-contact">
          <h2>Get in Touch</h2>
          <p>
            Have questions, feedback, or suggestions? We'd love to hear from you! Whether you're a business owner looking to list your services or a customer with ideas on how we can improve, your input helps us build a better platform for everyone.
          </p>
          <div className="contact-options">
            <a href="mailto:info@bizcall.mk" className="contact-option">
              <span className="contact-icon">📧</span>
              <span>info@bizcall.mk</span>
            </a>
            <a href="tel:+38970123456" className="contact-option">
              <span className="contact-icon">📞</span>
              <span>+389 70 123 456</span>
            </a>
          </div>
        </section>
      </div>

      <style jsx>{`
        .about-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .about-hero {
          text-align: center;
          margin-bottom: 4rem;
        }

        .about-hero h1 {
          font-size: 3rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .about-subtitle {
          font-size: 1.25rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        .about-mission,
        .about-what-we-do,
        .about-stats,
        .about-values,
        .about-team,
        .about-contact {
          margin-bottom: 4rem;
        }

        .about-mission h2,
        .about-what-we-do h2,
        .about-stats h2,
        .about-values h2,
        .about-team h2,
        .about-contact h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .about-mission p,
        .about-team p,
        .about-contact p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #64748b;
        }

        .what-we-do-grid,
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .what-we-do-item,
        .value-item {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .what-we-do-item h3,
        .value-item h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 1rem;
        }

        .what-we-do-item p,
        .value-item p {
          color: #64748b;
          line-height: 1.6;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .stat-item {
          text-align: center;
          background: white;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
        }

        .contact-options {
          display: flex;
          gap: 2rem;
          margin-top: 2rem;
        }

        .contact-option {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2rem;
          background: #3b82f6;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .contact-option:hover {
          background: #2563eb;
        }

        .contact-icon {
          font-size: 1.25rem;
        }

        @media (max-width: 768px) {
          .about-hero h1 {
            font-size: 2rem;
          }

          .about-subtitle {
            font-size: 1rem;
          }

          .contact-options {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
};

export default AboutPage;
