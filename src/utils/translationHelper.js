// Safe translation utility that works with or without context
export const createSafeTranslation = (fallbackTranslations = {}) => {
  return (key, fallback) => {
    try {
      // Try to get translation from global window object first
      if (typeof window !== 'undefined' && window.__BIZCALL_TRANSLATIONS__) {
        const translation = window.__BIZCALL_TRANSLATIONS__[key];
        if (translation && typeof translation === 'string') return translation;
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
  homepage: "Home",
  explore: "Explore",
  contactUs: "Contact Us",
  myListings: "My Listings",
  account: "Account",
  menu: "Menu",
  navigation: "Navigation",
  appName: "BizCall.mk",
  submitListing: "Submit Listing",
  login: "Login",
  logout: "Logout",
  loading: "Loading...",
  reportSuccess: "Report submitted successfully",
  error: "Error",
  reportListing: "Report Listing",
  reportReason: "Report Reason",
  spam: "Spam",
  inappropriate: "Inappropriate",
  other: "Other",
  description: "Description",
  cancel: "Cancel",
  sendReport: "Send Report",
  maxImagesError: "Maximum 4 images allowed",
  // Add more as needed
};

// Create the safe translation function
export const safeT = createSafeTranslation(defaultTranslations);

// Global fallback for any component that might be rendered outside context
export const globalT = (key, fallback) => {
  // Always return a string, never undefined
  const result = safeT(key, fallback);
  return typeof result === 'string' ? result : (fallback || key);
};
