import React, { useEffect } from 'react';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  canonical, 
  image, 
  type = 'website',
  locale = 'en_US',
  siteName = 'BizCall.mk',
  noIndex = false,
  structuredData
}) => {
  const defaultTitle = 'BizCall.mk - North Macedonia Business Directory';
  const defaultDescription = 'Connect with trusted local businesses and services across North Macedonia. Find everything from restaurants to professional services.';
  const defaultKeywords = 'North Macedonia business directory, Skopje businesses, Bitola services, Ohrid companies, Macedonia local services';
  const defaultImage = 'https://www.bizcall.mk/logo.png';
  const defaultCanonical = 'https://www.bizcall.mk/';

  const finalTitle = title || defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;
  const finalCanonical = canonical || defaultCanonical;
  const finalImage = image || defaultImage;

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update or create meta tags
    const updateMetaTag = (name, content, property = null) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('author', 'BizCall.mk');
    updateMetaTag('robots', noIndex ? 'noindex,nofollow' : 'index,follow');
    updateMetaTag('language', 'en');
    
    // Geographic meta tags
    updateMetaTag('geo.region', 'MK');
    updateMetaTag('geo.placename', 'North Macedonia');
    updateMetaTag('geo.position', '41.6086;21.7453');
    updateMetaTag('ICBM', '41.6086,21.7453');
    
    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', finalCanonical);
    
    // Open Graph / Facebook
    updateMetaTag('og:type', type, 'og:type');
    updateMetaTag('og:url', finalCanonical, 'og:url');
    updateMetaTag('og:title', finalTitle, 'og:title');
    updateMetaTag('og:description', finalDescription, 'og:description');
    updateMetaTag('og:image', finalImage, 'og:image');
    updateMetaTag('og:site_name', siteName, 'og:site_name');
    updateMetaTag('og:locale', locale, 'og:locale');
    
    // Twitter
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', finalCanonical);
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', finalImage);
    
    // Additional meta tags
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('msapplication-TileColor', '#2563eb');
    updateMetaTag('theme-color', '#2563eb');

    // Structured Data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (structuredData) {
      if (structuredDataScript) {
        structuredDataScript.textContent = JSON.stringify(structuredData);
      } else {
        structuredDataScript = document.createElement('script');
        structuredDataScript.type = 'application/ld+json';
        structuredDataScript.textContent = JSON.stringify(structuredData);
        document.head.appendChild(structuredDataScript);
      }
    }

    // Cleanup function
    return () => {
      // Remove structured data if it was added by this component
      if (structuredData && structuredDataScript && structuredDataScript.parentNode) {
        structuredDataScript.parentNode.removeChild(structuredDataScript);
      }
    };
  }, [finalTitle, finalDescription, finalKeywords, finalCanonical, finalImage, type, locale, siteName, noIndex, structuredData]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
