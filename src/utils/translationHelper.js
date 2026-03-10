// Safe translation utility that works with or without context
export const createSafeTranslation = (fallbackTranslations = {}) => {
  return (key, fallback) => {
    try {
      // Try to get translation from global window object first
      if (typeof window !== 'undefined' && window.__BIZCALL_TRANSLATIONS__) {
        const translation = window.__BIZCALL_TRANSLATIONS__[key];
        if (translation) return translation;
      }
      
      // Try to get from context (if available)
      // This will be used by components that have access to useApp
      return fallback || fallbackTranslations[key] || key;
    } catch (error) {
      // Ultimate fallback
      return fallback || key;
    }
  };
};

// Default English translations as fallback
export const defaultTranslations = {
  verified: "Verified",
  pending: "Pending", 
  unverified: "Unverified",
  renewNow: "Renew Now",
  close: "Close",
  listingExpiresInDays: "Your listing expires in {{days}} days",
  // Add more as needed
};

// Create the safe translation function
export const safeT = createSafeTranslation(defaultTranslations);
