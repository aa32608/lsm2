import React, { useEffect } from 'react';
import Head from 'next/head';

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

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="BizCall.mk" />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow'} />
      <meta name="language" content="en" />
      
      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="MK" />
      <meta name="geo.placename" content="North Macedonia" />
      <meta name="geo.position" content="41.6086;21.7453" />
      <meta name="ICBM" content="41.6086,21.7453" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonical} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={locale} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalCanonical} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="theme-color" content="#2563eb" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
    </Head>
  );
};

export default SEOHead;
