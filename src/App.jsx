// src/App.jsx

import { Helmet } from "react-helmet-async";
import logo from "./assets/logo.png";
import React, { useCallback, useEffect, useMemo, useState, useDeferredValue, useRef, lazy, Suspense } from "react";
import { useQueryClient } from '@tanstack/react-query';
import { auth, db, createRecaptcha } from "./firebase";
import { ref as dbRef, set, update, onValue, remove, push, get, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import {
  signInWithEmailAndPassword,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut,
  signInWithPhoneNumber,
  sendEmailVerification,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
  linkWithPhoneNumber,
  updatePhoneNumber,
  PhoneAuthProvider,
  updateProfile,
  deleteUser,
  getAdditionalUserInfo,
} from "firebase/auth";

import { AnimatePresence, motion } from "framer-motion";

// Lazy loaded components - Client side only to avoid SSR Suspense issues
const isClient = typeof window !== "undefined";
const NorthMacedoniaMap = isClient ? lazy(() => import("./NorthMacedoniaMap")) : () => null;
const Sidebar = isClient ? lazy(() => import("./Sidebar")) : () => null;
const Filtersheet = isClient ? lazy(() => import("./components/Filtersheet")) : () => null;
const EditListingModal = isClient ? lazy(() => import("./components/EditListingModal")) : () => null;

import ListingCard from "./components/ListingCard";
import DualRangeSlider from "./components/DualRangeSlider";
import ListingsTab from "./legacy_pages/ListingsTab";
import MyListingCard from "./components/MyListingCard";
import HomeTab from "./legacy_pages/HomeTab";
import { TRANSLATIONS } from "./translations";
import { MK_CITIES } from "./mkCities";
import { categories, categoryIcons, categoryGroups, countryCodes, currencyOptions, mkSpotlightCities, PLANS, FEATURED_DURATION_DAYS, sortFeaturedFirst, isFeatured } from "./constants";
import Link from "next/link";
import { TermsModal, PrivacyModal } from "./components/LegalModals";
import CookieConsent from "./components/CookieConsent";

const API_BASE =
  import.meta.env.VITE_API_BASE ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

/* Data from constants (categories, categoryGroups, categoryIcons, etc.) */


/* Helper: strip obvious garbage like tags */
const stripDangerous = (v = "") => v.replace(/[<>]/g, "");

/* Helper: format offer price range */
const formatOfferPrice = (min, max, currency) => {
  const cleanMin = String(min || "").trim();
  const cleanMax = String(max || "").trim();
  const cur = currency || "EUR";

  if (!cleanMin && !cleanMax) return "";
  if (cleanMin && cleanMax) return `${cleanMin} - ${cleanMax} ${cur}`;
  if (cleanMin) return `from ${cleanMin} ${cur}`;
  if (cleanMax) return `up to ${cleanMax} ${cur}`;
  return "";
};

/* Helper: build final location string from city + extra */
const buildLocationString = (city, extra) => {
  const c = (city || "").trim();
  const e = (extra || "").trim();
  if (!c && !e) return "";
  if (c && e) return `${c} - ${e}`;
  return c || e;
};

// small helpers kept minimal

const getDescriptionPreview = (text = "", limit = 160) => {
  const clean = stripDangerous(text || "").trim();
  if (!clean) return "";
  return clean.length > limit ? `${clean.slice(0, limit).trim()}…` : clean;
};

const HeadManager = ({ title, description, keywords, canonical, image, jsonLd }) => {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      
      {canonical && <link rel="canonical" href={canonical} />}
      
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

/* Helper: normalize phone numbers before storing */
const normalizePhoneForStorage = (raw) => {
  if (!raw) return raw;
  const trimmed = raw.trim();
  if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
  const cleaned = trimmed.replace(/\D/g, "");
  if (cleaned === "") return trimmed;
  if (cleaned.length > 8 && cleaned.startsWith("00")) return "+" + cleaned.replace(/^0{2}/, "");
  const known = countryCodes.map((c) => c.code.replace("+", ""));
  for (const pre of known) if (cleaned.startsWith(pre)) return "+" + cleaned;
  return "+389" + cleaned;
};

const sendEmail = async (to, subject, text) => {
  try {
    const response = await fetch(`${API_BASE}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    return response;
  } catch (err) {
    console.error("sendEmail error:", err);
    throw err;
  }
};

const TabBar = ({ items = [], value, onChange, className = "", size = "default", fullWidth = false }) => (
  <div
    className={[
      "tabs",
      size === "compact" ? "tabs-compact" : "",
      fullWidth ? "tabs-full" : "",
      className,
    ].filter(Boolean).join(" ")}
  >
    {items.map((item) => (
      <button
        key={item.id}
        type="button"
        className={`tab ${value === item.id ? "active" : ""}`}
        onClick={() => onChange?.(item.id)}
      >
        {item.icon && <span className="tab-icon">{item.icon}</span>}
        <span className="tab-label">{item.label}</span>
        {item.badge !== undefined && (
          <span className="tab-badge">{item.badge}</span>
        )}
      </button>
    ))}
  </div>
);

/* Components */
const Header = React.memo(({ 
  t, logo, primaryNav, selectedTab, setSelectedTab, lang, setLang, user, 
  onLogout, onLogin, onMenuOpen 
}) => (
  <header className="header">
    <div className="header-inner">
      <button
        className="icon-btn mobile-menu-btn"
        onClick={onMenuOpen}
        aria-label={t("menu")}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <button onClick={() => setSelectedTab("main")} className="brand">
        <div className="brand-mark">
          <div className="brand-logo-wrap">
            <img
              src={logo}
              alt={t("bizcallLogo")}
              className="brand-logo"
              loading="lazy"
            />
          </div>
        </div>
        <div className="brand-text">
          <h1 className="brand-title">{t("bizCall")}</h1>
          <p className="brand-tagline">{t("communityTagline")}</p>
        </div>
      </button>

      <nav className="header-nav desktop-nav" aria-label={t("primaryNav")}>
        {primaryNav.map((item) => (
          <button
            key={item.id}
            style={{color: "#000"}}
            className={`nav-chip ${selectedTab === item.id ? "active" : ""}`}
            onClick={() => setSelectedTab(item.id)}
          >
            <span className="nav-chip-label">{item.icon} {item.label}</span>
            {item.badge !== undefined && <span className="nav-chip-badge">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="sq">🇦🇱 SQ</option>
          <option value="mk">🇲🇰 MK</option>
          <option value="en">🇬🇧 EN</option>
        </select>

        {user ? (
          <>
            <button className="btn btn-ghost desktop-only" onClick={onLogout}>
              {t("logout")}
            </button>
          </>
        ) : (
          <button
            className="btn desktop-only"
            onClick={onLogin}
          >
            {t("login")}
          </button>
        )}
      </div>
    </div>
  </header>
));

export default function App({ initialListings = [], initialPublicListings = [] }) {
  // React Query client for smart caching
  const queryClient = useQueryClient();
  
  // Pre-populate React Query cache with initial data for instant rendering
  useEffect(() => {
    if (initialPublicListings && initialPublicListings.length > 0) {
      queryClient.setQueryData(['listings', 'public'], initialPublicListings);
    }
    if (initialListings && initialListings.length > 0) {
      queryClient.setQueryData(['listings', 'all'], initialListings);
    }
  }, [initialListings, initialPublicListings, queryClient]);
  /* i18n */
  const [lang, setLang] = useState("sq"); // Consistent default for SSR/hydration
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  // Load language preference after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang");
      if (stored && (stored === "sq" || stored === "en" || stored === "mk")) {
        setLang(stored);
      }
    }
  }, []);

  const t = useCallback(
    (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.sq?.[k] ?? k,
    [lang]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    if (user) {
      update(dbRef(db, `users/${user.uid}`), { language: lang }).catch(err => {
        console.warn("Failed to sync language to profile:", err);
      });
    }
  }, [lang, user]);

  /* Core state */
  const [form, setForm] = useState({
    step: 1,
    name: "",
    category: "",
    locationCity: "",
    locationExtra: "",
    locationData: null, // { city, area, lat, lng, mapsUrl } if you want later
    description: "",
    contact: "",
    offerMin: "",
    offerMax: "",
    offerCurrency: "EUR",
    offerprice: "",   // preformatted price string, saved in DB
    tags: "",
    socialLink: "",
    imagePreview: null, // local-only preview
    images: [],         // array of base64 strings (max 4)
    plan: "1",          // "1", "3", "6", "12"
  });

  // In-memory cache: Keep data in state for instant tab switching
  // Data persists across navigation - never cleared unless explicitly needed
  const [listings, setListings] = useState(initialListings && initialListings.length > 0 ? initialListings : []);
  const [publicListings, setPublicListings] = useState(initialPublicListings && initialPublicListings.length > 0 ? initialPublicListings : []);
  const [userListings, setUserListings] = useState([]);
  
  // Separate loading states: initial load vs background refresh
  // Smart loading states: Only show loading if we truly have no data
  const [listingsLoading, setListingsLoading] = useState(() => {
    // Only show loading spinner if we have NO data at all (initial load only)
    return !(initialListings && initialListings.length > 0) && 
           !(initialPublicListings && initialPublicListings.length > 0);
  });
  const [isRefreshing, setIsRefreshing] = useState(false); // Background refresh indicator
  
  // Track if we've switched to listings tab without data loaded
  const [hasSwitchedToListingsTab, setHasSwitchedToListingsTab] = useState(false);
  
  // When switching to allListings tab, check if we need to show skeleton
  useEffect(() => {
    if (selectedTab === "allListings") {
      // If we switch to listings tab and have no data, mark that we switched
      if (publicListings.length === 0 && listings.length === 0) {
        setHasSwitchedToListingsTab(true);
        // If we have no data and loading is false, we should show loading
        if (!listingsLoading) {
          setListingsLoading(true);
        }
      }
    }
  }, [selectedTab, publicListings.length, listings.length, listingsLoading]);

  // Computed: Data is "loaded" if we have any listings OR if loading is false
  // This ensures tabs show immediately when data exists
  // BUT: If we switched to listings tab and cache isn't loaded, show skeleton
  const listingsLoaded = useMemo(() => {
    // If we switched to listings tab and have no data, show skeleton
    if (hasSwitchedToListingsTab && selectedTab === "allListings") {
      if (publicListings.length === 0 && listings.length === 0) {
        return false; // Show skeleton
      }
      // Once data loads, reset the flag
      if (publicListings.length > 0 || listings.length > 0) {
        setHasSwitchedToListingsTab(false);
      }
    }
    return publicListings.length > 0 || listings.length > 0 || !listingsLoading;
  }, [publicListings.length, listings.length, listingsLoading, hasSwitchedToListingsTab, selectedTab]);

  // Removed localStorage caching - it was slowing down the app with large datasets
  const deferredListings = useDeferredValue(listings);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });
  
  /* Helpers */
  const showMessage = useCallback((text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "info" }), 5000);
  }, []);

  // Removed areListingsEqual - using simpler quick checks inline for better performance

  const [selectedListing, setSelectedListing] = useState(null);
  const [initialListingId, setInitialListingId] = useState(null);

  /* Dashboard/UI */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTab, setSelectedTabState] = useState("main"); // myListings | account | allListings
  const [viewMode, setViewMode] = useState("list"); // "grid" | "list"
  const [showPostForm, setShowPostForm] = useState(false);

  // Wrapper to scroll to top when tab changes
  const setSelectedTab = useCallback((tab) => {
    setSelectedTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Preload Dodo Payments when user opens My Listings so "Proceed to payment" is fast
  useEffect(() => {
    if (selectedTab === "myListings" && typeof fetch !== "undefined") {
      fetch(`${API_BASE}/api/payments-warmup`, { method: "GET", headers: { "Content-Type": "application/json" } }).catch(() => {});
    }
  }, [selectedTab]);

  /* Editing */
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState(null);

  /* Extend flow */
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null);
  const [selectedExtendPlan, setSelectedExtendPlan] = useState("1");

  const [showEditMapPicker, setShowEditMapPicker] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("spam");
  const [reportDescription, setReportDescription] = useState("");
  const [reportingListingId, setReportingListingId] = useState(null);

  /* Auth modal */
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "signup"
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [resendBusy, setResendBusy] = useState(false);
  const [authTab, setAuthTab] = useState("email");   // "email" | "phone" (login method)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [countryCode, setCountryCode] = useState("+389");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [postSignupVerifyOpen, setPostSignupVerifyOpen] = useState(false);
  
  const [emailForm, setEmailForm] = useState({
    newEmail: "",
    currentPassword: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  // Phone number editing state
  const [phoneEditing, setPhoneEditing] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState("+389");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [savingPhone, setSavingPhone] = useState(false);
  const [phoneConfirmationResult, setPhoneConfirmationResult] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const handleSubscriptionChange = async (e) => {
    const isChecked = e.target.checked;
    try {
      await update(dbRef(db, `users/${user.uid}`), {
        subscribedToMarketing: isChecked,
      });
      setUserProfile((prev) => ({ ...prev, subscribedToMarketing: isChecked }));
      showMessage(t("subscriptionUpdated"), "success");
    } catch (err) {
      showMessage(t("errorUpdatingSubscription") + " " + err.message, "error");
    }
  };

  const [accountPhone, setAccountPhone] = useState("");

  useEffect(() => {
    setAccountPhone(
      normalizePhoneForStorage(user?.phoneNumber || userProfile?.phone || "")
    );
  }, [user, userProfile]);

  const handleChangePhone = async (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      showMessage(t("passwordRequired"), "error");
      return;
    }

    const fullPhoneNumber = `${phoneCountryCode}${phoneNumber.replace(/\D/g, "")}`;
    const normalizedPhone = normalizePhoneForStorage(fullPhoneNumber);
    
    if (!validatePhone(normalizedPhone)) {
      showMessage(t("enterValidPhone"), "error");
      return;
    }

    setSavingPhone(true);
    try {
      // 1. Re-authenticate
      const credential = EmailAuthProvider.credential(user.email, passwordForm.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // 2. Send SMS code for verification (to link/update in Auth)
      if (!window.recaptchaVerifierAccount) {
        const accContainer = document.getElementById("recaptcha-container-account");
        if (accContainer) accContainer.innerHTML = "";
        
        window.recaptchaVerifierAccount = new RecaptchaVerifier(auth, "recaptcha-container-account", {
          size: "invisible"
        });
      }
      
      // Use signInWithPhoneNumber to get a confirmationResult for the new number
      const confirmation = await signInWithPhoneNumber(auth, normalizedPhone, window.recaptchaVerifierAccount);
      setPhoneConfirmationResult(confirmation);
      showMessage(t("codeSent"), "success");
    } catch (err) {
      console.error(err);
      let msg = err.message;
      if (err.code === "auth/invalid-phone-number") msg = t("enterValidPhone");
      if (err.code === "auth/credential-already-in-use") msg = t("phoneAlreadyInUse");
      showMessage(msg, "error");
      if (window.recaptchaVerifierAccount) {
        try {
          window.recaptchaVerifierAccount.clear();
        } catch (e) {
          // ignore
        }
        window.recaptchaVerifierAccount = null;
      }
    } finally {
      setSavingPhone(false);
    }
  };

  const handleVerifyPhoneCode = async (e) => {
     e.preventDefault();
     if (!phoneVerificationCode || phoneVerificationCode.length < 6) {
       showMessage(t("enterCode"), "error");
       return;
     }
 
     setSavingPhone(true);
     try {
       // 1. Get the credential from the code
       const credential = PhoneAuthProvider.credential(
         phoneConfirmationResult.verificationId,
         phoneVerificationCode
       );

       // 2. Link or Update the phone number in Firebase Auth
       if (user.phoneNumber) {
         await updatePhoneNumber(user, credential);
       } else {
         await linkWithCredential(user, credential);
       }
       
       const fullPhoneNumber = `${phoneCountryCode}${phoneNumber.replace(/\D/g, "")}`;
       const normalizedPhone = normalizePhoneForStorage(fullPhoneNumber);
 
       // 3. Update the database
       await update(dbRef(db, `users/${user.uid}`), { 
         phone: normalizedPhone 
       });

      // Sync with listings
      const userListings = listings.filter(l => l.userId === user.uid);
      const listingUpdates = {};
      userListings.forEach(l => {
        listingUpdates[`listings/${l.id}/contact`] = normalizedPhone;
      });
      if (Object.keys(listingUpdates).length > 0) {
        await update(dbRef(db), listingUpdates);
      }

      setAccountPhone(normalizedPhone);
      setPhoneEditing(false);
      setPhoneConfirmationResult(null);
      setPhoneVerificationCode("");
      showMessage(t("phoneUpdated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("errorUpdatingPhone") + " " + err.message, "error");
    } finally {
      setSavingPhone(false);
      setPasswordForm((f) => ({ ...f, currentPassword: "" }));
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm(t("deleteAccountConfirm"))) return;
    
    try {
      setLoading(true);
      const uid = user.uid;
      
      // 1. Delete user's listings
      const listingsRef = dbRef(db, "listings");
      const userListingsQuery = query(listingsRef, orderByChild("userId"), equalTo(uid));
      const snapshot = await get(userListingsQuery);
      
      if (snapshot.exists()) {
        const updates = {};
        snapshot.forEach((childSnapshot) => {
          updates[childSnapshot.key] = null;
        });
        await update(listingsRef, updates);
      }
      
      // 2. Delete user profile from DB
      await remove(dbRef(db, `users/${uid}`));
      
      // 3. Delete Auth user
      await deleteUser(user);
      
      showMessage(t("accountDeleted"), "success");
      setUser(null);
      setUserProfile(null);
      setSelectedTab("main");
    } catch (err) {
      console.error("Delete account error:", err);
      if (err.code === 'auth/requires-recent-login') {
        showMessage(t("reauthRequired"), "error");
      } else {
        showMessage(translateFirebaseError(err, t), "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    
    try {
      setLoading(true);
      await updateProfile(user, { displayName: displayName.trim() });
      await update(dbRef(db, `users/${user.uid}`), { name: displayName.trim() });
      
      setUserProfile(prev => ({ ...prev, name: displayName.trim() }));
      showMessage(t("profileUpdated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReportSubmit = async () => {
    if (!reportingListingId) return;
    
    try {
      const reportRef = push(dbRef(db, "reports"));
      await set(reportRef, {
        listingId: reportingListingId,
        reason: reportReason,
        description: reportDescription,
        reporterId: user ? user.uid : "anonymous",
        createdAt: Date.now()
      });
      
      showMessage(t("reportSuccess"), "success");
      setShowReportModal(false);
      setReportReason("spam");
      setReportDescription("");
      setReportingListingId(null);
    } catch (err) {
      console.error(err);
      showMessage(t("error") + ": " + err.message, "error");
    }
  };


  /* Filters / search */
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const [catFilter, setCatFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [sortBy, setSortBy] = useState("topRated");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(24); // Increased for better performance with large datasets
  const [showMapPicker, setShowMapPicker] = useState(false);
  
  /* My Listings filters */
  const [myListingsStatusFilter, setMyListingsStatusFilter] = useState("all"); // "all" | "verified" | "pending"
  const [myListingsExpiryFilter, setMyListingsExpiryFilter] = useState("all"); // "all" | "expiring" | "expired" | "active"
  const [myListingsSort, setMyListingsSort] = useState("newest"); // "newest" | "oldest" | "expiring" | "az"
  const [myListingsSearch, setMyListingsSearch] = useState("");
  const deferredMyListingsSearch = useDeferredValue(myListingsSearch);

  /* Favorites */
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorites)), [favorites]);

  const listingLocationLabel = useMemo(() => {
    if (!selectedListing) return "";
    return (
      buildLocationString(
        selectedListing.locationData?.city || selectedListing.location,
        selectedListing.locationData?.area || selectedListing.locationExtra
      ) || t("unspecified")
    );
  }, [selectedListing, t]);

  const listingPriceLabel = useMemo(() => {
    if (!selectedListing) return "";
    return selectedListing.offerprice || t("unspecified");
  }, [selectedListing, t]);

  const listingContactAvailable = !!selectedListing?.contact;

  /* Feedback per listing (rating + comments) */
  const [feedbackStore, setFeedbackStore] = useState({});
  const [feedbackDraft, setFeedbackDraft] = useState({ rating: 4, comment: "" });
  const [feedbackSaving, setFeedbackSaving] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false); // Start closed, user can toggle
  const [modalImageIndex, setModalImageIndex] = useState(0); // For modal carousel

  /* Featured carousel removal */

  /* Close sidebar with ESC */
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowAuthModal(false);
        setShowMapPicker(false);
        if (editingListing) { setEditingListing(null); setEditForm(null); }
        if (selectedListing) setSelectedListing(null);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [editingListing, selectedListing]);

  /* Lock body scroll when modals are open */
  useEffect(() => {
    const hasOpenModal = showAuthModal || showPostForm || selectedListing || editingListing || showMapPicker || showEditMapPicker || filtersOpen;
    if (hasOpenModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showAuthModal, showPostForm, selectedListing, editingListing, showMapPicker, showEditMapPicker, filtersOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("listing");
    if (listingId) {
      setInitialListingId(listingId);
    }
  }, []);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab) setSelectedTabState(tab);
    const qParam = params.get("q") || "";
    const catParam = params.get("category") || "";
    const locParam = params.get("city") || "";
    const sortParam = params.get("sort") || "";
    const viewParam = params.get("view") || "";
    const pageParam = parseInt(params.get("page") || "1", 10);
    const pageSizeParam = parseInt(params.get("pageSize") || "12", 10);
    setQ(qParam);
    setCatFilter(catParam);
    setLocFilter(locParam);
    if (sortParam) setSortBy(sortParam);
    if (viewParam) setViewMode(viewParam);
    if (!isNaN(pageParam) && pageParam > 0) setPage(pageParam);
    if (!isNaN(pageSizeParam) && pageSizeParam > 0) setPageSize(pageSizeParam);
  }, []);
  // Sync URL params (only after mount to avoid hydration issues)
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR guard
    
    const params = new URLSearchParams(window.location.search);
    params.set("tab", selectedTab);
    if (selectedTab === "allListings") {
      if (q) params.set("q", q); else params.delete("q");
      if (catFilter) params.set("category", catFilter); else params.delete("category");
      if (locFilter) params.set("city", locFilter); else params.delete("city");
      if (sortBy) params.set("sort", sortBy); else params.delete("sort");
      if (viewMode) params.set("view", viewMode); else params.delete("view");
      params.set("page", String(page));
      params.set("pageSize", String(pageSize));
    } else {
      params.delete("q");
      params.delete("category");
      params.delete("city");
      params.delete("sort");
      params.delete("view");
      params.delete("page");
      params.delete("pageSize");
    }
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", next);
  }, [selectedTab, q, catFilter, locFilter, sortBy, viewMode, page, pageSize]);
  
  // Reset page to 1 when filters change (but not on initial mount to avoid hydration issues)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Track previous filter values to detect actual changes
  const prevFiltersRef = useRef({ q, catFilter, locFilter, sortBy });
  useEffect(() => {
    if (!isMounted) {
      // On mount, just store initial values
      prevFiltersRef.current = { q, catFilter, locFilter, sortBy };
      return;
    }
    
    // Check if any filter actually changed
    const filtersChanged = 
      prevFiltersRef.current.q !== q ||
      prevFiltersRef.current.catFilter !== catFilter ||
      prevFiltersRef.current.locFilter !== locFilter ||
      prevFiltersRef.current.sortBy !== sortBy;
    
    if (filtersChanged && page > 1) {
      setPage(1);
    }
    
    // Update ref for next comparison
    prevFiltersRef.current = { q, catFilter, locFilter, sortBy };
  }, [q, catFilter, locFilter, sortBy, isMounted, page, setPage]);



  useEffect(() => {
    if (!initialListingId || !listings.length) return;
  
    const target = listings.find((l) => l.id === initialListingId);
  
    if (target && target.status === "verified") {
      setSelectedListing(target);
      // prevent reopening on every listings change
      setInitialListingId(null);
    }
  }, [initialListingId, listings]);
  
  const [expiryChecked, setExpiryChecked] = useState(false);
  useEffect(() => {
    if (!user || listingsLoading || !deferredListings.length || expiryChecked) return;

    const checkExpiringListings = async () => {
      const userListings = deferredListings.filter(l => l.userId === user.uid && l.status === "verified");
      const now = Date.now();
      const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
      const targetEmail = user.email || userProfile?.email;

      if (!targetEmail) return;

      for (const listing of userListings) {
        if (listing.expiresAt && !listing.expiryNotified) {
          const timeLeft = listing.expiresAt - now;
          if (timeLeft > 0 && timeLeft <= sevenDaysInMs) {
            // Expiring soon (within 7 days)
            const daysLeft = Math.ceil(timeLeft / (24 * 60 * 60 * 1000));
            const subject = `Listing expiring soon: ${listing.name}`;
            const text = `Hi, your listing "${listing.name}" will expire in ${daysLeft} days. \n\nRenew it here to keep it active: ${window.location.origin}?tab=myListings`;
            
            try {
              await sendEmail(targetEmail, subject, text);
              await update(dbRef(db, `listings/${listing.id}`), { expiryNotified: true });
            } catch (err) {
              console.error("Failed to send expiry notification:", err);
            }
          }
        }
      }
      setExpiryChecked(true);
    };

    checkExpiringListings();
  }, [user, deferredListings, expiryChecked, userProfile, listingsLoading]);

  /* Auth state & DB subscription */
  useEffect(() => auth.onAuthStateChanged((u) => setUser(u)), []);

  /* Payment Success Handler */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const listingId = params.get("listingId");
    const type = params.get("type"); // 'create' or 'extend'

    if (paymentStatus === "success" && listingId) {
      // Clear params
      window.history.replaceState({}, "", window.location.pathname);

      const updateListingAfterPayment = async () => {
        try {
            setLoading(true);
            const updates = {};

            // Calculate duration based on plan
            const plan = params.get("plan");
            let durationDays = 30;
            switch(String(plan)) {
                case "1": durationDays = 30; break;
                case "3": durationDays = 90; break;
                case "6": durationDays = 180; break;
                case "12": durationDays = 365; break;
                default: durationDays = 30;
            }
            const durationMs = durationDays * 24 * 60 * 60 * 1000;

            const now = Date.now();
            if (type === 'create') {
                updates[`listings/${listingId}/status`] = "verified";
                // Store the EUR amount paid for the listing based on plan
                updates[`listings/${listingId}/pricePaid`] =
                  parseInt(plan) === 1 ? 3 :
                  parseInt(plan) === 3 ? 6 :
                  parseInt(plan) === 6 ? 10 : 14;
                updates[`listings/${listingId}/plan`] = plan;
                updates[`listings/${listingId}/expiresAt`] = now + durationMs;
                updates[`listings/${listingId}/createdAt`] = now;
                if (String(plan) === "12") {
                    const featuredMs = FEATURED_DURATION_DAYS * 24 * 60 * 60 * 1000;
                    updates[`listings/${listingId}/featuredUntil`] = now + featuredMs;
                }
            } else if (type === 'extend') {
                const snapshot = await get(dbRef(db, `listings/${listingId}`));
                const listing = snapshot.val();
                if (listing) {
                    const currentExpiry = listing.expiresAt || now;
                    const newExpiry = Math.max(currentExpiry, now) + durationMs;
                    updates[`listings/${listingId}/expiresAt`] = newExpiry;
                    updates[`listings/${listingId}/status`] = "verified";
                    updates[`listings/${listingId}/plan`] = plan;
                    if (String(plan) === "12") {
                        const featuredMs = FEATURED_DURATION_DAYS * 24 * 60 * 60 * 1000;
                        updates[`listings/${listingId}/featuredUntil`] = now + featuredMs;
                    }
                }
            }
            
            if (Object.keys(updates).length > 0) {
                await update(dbRef(db), updates);
                showMessage(type === 'extend' ? t("listingExtendedSuccessfully") : t("paymentSuccessfulListingActivated"), "success");
            }
        } catch (err) {
            console.error("Payment success handling error:", err);
            showMessage(t("paymentSucceededButListingUpdateFailed"), "error");
        } finally {
            setLoading(false);
        }
      };
      
      updateListingAfterPayment();
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setUserProfile(null);
      return undefined;
    }

    const profileRef = dbRef(db, `users/${user.uid}`);
    const unsubscribe = onValue(profileRef, (snapshot) => {
      setUserProfile(snapshot.val() || null);
    });

    return () => unsubscribe();
  }, [user]);

  const friendlyName = useMemo(() => {
    if (userProfile?.name && userProfile.name.trim()) return userProfile.name.trim();
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    return "";
  }, [userProfile, user]);

  // Optimized merged listings - instant updates, data stays in memory
  useEffect(() => {
    if (userListings.length === 0) {
      // Fast path: no user listings, just use public listings
      setListings((prev) => {
        // Quick check: if lengths match and first/last IDs match, likely same
        if (prev.length === publicListings.length && prev.length > 0) {
          if (prev[0]?.id === publicListings[0]?.id && 
              prev[prev.length - 1]?.id === publicListings[publicListings.length - 1]?.id) {
            return prev; // Likely unchanged - keep existing reference
          }
        }
        // Only sort if we need to update
        return [...publicListings].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      });
    } else {
      // Merge user and public listings efficiently
      const merged = new Map();
      publicListings.forEach((l) => merged.set(l.id, l));
      userListings.forEach((l) => merged.set(l.id, l)); // User listings override
      
      const combined = Array.from(merged.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      setListings((prev) => {
        // Quick check before full comparison
        if (prev.length === combined.length && prev.length > 0) {
          if (prev[0]?.id === combined[0]?.id && 
              prev[prev.length - 1]?.id === combined[combined.length - 1]?.id) {
            return prev; // Keep existing reference
          }
        }
        return combined;
      });
    }
  }, [publicListings, userListings]);

  // Removed localStorage caching - it was causing performance issues with large datasets

  // 1. Public listings (verified) - Smart in-memory caching
  // Strategy: Data stays in state forever, show instantly on tab switch
  // Background refresh happens silently without blocking UI
  useEffect(() => {
    const verifiedQuery = query(
      dbRef(db, "listings"),
      orderByChild("status"),
      equalTo("verified"),
      limitToLast(250)
    );

    let isFirstLoad = true;
    // Check if we already have data in memory (from previous visit)
    const hasExistingData = publicListings.length > 0;

    // Only show loading spinner if we have NO data at all
    if (!hasExistingData) {
      setListingsLoading(true);
    } else {
      // We have cached data - refresh in background silently
      setIsRefreshing(true);
    }

    const startTime = Date.now();

    // 1a. Initial Get - fetch fresh data, but UI shows cached data immediately
    get(verifiedQuery).then((snapshot) => {
      const duration = Date.now() - startTime;
      if (duration > 2000) {
        console.warn(`[Performance] Fetch took ${duration}ms.`);
      }
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      const now = Date.now();
      const activeArr = arr.filter(l => !l.expiresAt || l.expiresAt > now);
      const sorted = sortFeaturedFirst(activeArr);
      setPublicListings(sorted);
      queryClient.setQueryData(['listings', 'public'], sorted);
      setListingsLoading(false);
      setIsRefreshing(false);
    }).catch(err => {
      console.error("Fetch error:", err);
      setListingsLoading(false);
      setIsRefreshing(false);
      // Don't clear existing data on error - keep showing cached data
    });

    // 1b. Real-time listener - silent background updates (no loading states)
    const unsubscribe = onValue(verifiedQuery, (snapshot) => {
      if (isFirstLoad) {
        isFirstLoad = false;
        return; // Skip first trigger, get() already handled it
      }
      
      const val = snapshot.val() || {};
      const arr = Object.entries(val).map(([id, data]) => ({ id, ...data }));
      const now = Date.now();
      const activeArr = arr.filter(l => !l.expiresAt || l.expiresAt > now);
      setPublicListings(sortFeaturedFirst(activeArr));
      queryClient.setQueryData(['listings', 'public'], sortFeaturedFirst(activeArr));
      setIsRefreshing(false);
    }, (err) => {
      console.error("Public listener error:", err);
      setIsRefreshing(false);
    });

    return () => unsubscribe();
  }, [queryClient]); // Include queryClient for React Query cache updates

  // 2. User listings - Run when user changes
  useEffect(() => {
    if (!user) {
      setUserListings([]);
      return undefined;
    }

    const userQuery = query(
      dbRef(db, "listings"),
      orderByChild("userId"),
      equalTo(user.uid)
    );

    const unsubscribe = onValue(userQuery, (snapshot) => {
      const val = snapshot.val() || {};
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      setUserListings(arr);
      // Also update React Query cache
      queryClient.setQueryData(['listings', 'user', user.uid], arr);
    });

    return () => unsubscribe();
  }, [user, queryClient]);

  useEffect(() => {
    if (!selectedListing) {
      setFeedbackStore({});
      return;
    }

    const feedbackRef = dbRef(db, `feedback/${selectedListing.id}`);
    const unsubscribe = onValue(feedbackRef, (snapshot) => {
      const val = snapshot.val() || {};
      const entries = Object.values(val)
        .map((entry) => ({
          rating: Number(entry.rating) || 0,
          comment: entry.comment || "",
          createdAt: entry.createdAt || 0,
          userId: entry.userId || null,
          author: entry.author || null,
        }))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .slice(0, 50);

      setFeedbackStore({ [selectedListing.id]: { entries } });
    });

    return () => unsubscribe();
  }, [selectedListing]);

  const myListingsRaw = useMemo(() => {
    if (!user) return [];
    return deferredListings.filter(l => l.userId === user.uid);
  }, [deferredListings, user]);

  /* Email-link sign-in (preserved) */
  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (!emailForSignIn) emailForSignIn = window.prompt(t("enterEmail"));
      if (emailForSignIn) {
        signInWithEmailLink(auth, emailForSignIn, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
            showMessage(t("signedIn"), "success");
            setShowAuthModal(false);
          })
          .catch((err) => showMessage(t("error") + " " + err.message, "error"));
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) {
      showMessage(t("loginRequired"), "error");
      return;
    }

    if (!emailForm.newEmail || !validateEmail(emailForm.newEmail)) {
      showMessage(t("enterValidEmail"), "error");
      return;
    }
    
    if (!emailForm.currentPassword) {
      showMessage(t("enterCurrentPassword"), "error");
      return;
    }
    
    if (!currentUser.email) {
      showMessage(t("emailChangeNotAvailable"), "error");
      return;
    }

    // Check if email is different
    if (emailForm.newEmail === currentUser.email) {
      showMessage(t("differentEmailRequired"), "error");
      return;
    }

    // Check if current email is verified (some Firebase projects require this)
    if (!currentUser.emailVerified) {
      showMessage(t("verifyCurrentEmailBeforeChange"), "error");
      return;
    }

    setSavingEmail(true);
    try {
      // Reauthenticate user
      const cred = EmailAuthProvider.credential(
        currentUser.email,
        emailForm.currentPassword
      );
      await reauthenticateWithCredential(currentUser, cred);
      
      // Try to update email in Firebase Auth
      try {
        await updateEmail(currentUser, emailForm.newEmail);
        
        // Send verification email for the new email
        try {
          await sendEmailVerification(currentUser);
        } catch (verifyErr) {
          console.warn("Verification email send failed:", verifyErr);
          // Not critical if verification email fails, email is still changed
        }
        
        // Update user profile in database
        await update(dbRef(db, `users/${currentUser.uid}`), { 
          email: emailForm.newEmail 
        });

        // Sync with listings
        const userListings = listings.filter(l => l.userId === currentUser.uid);
        const listingUpdates = {};
        userListings.forEach(l => {
          listingUpdates[`listings/${l.id}/userEmail`] = emailForm.newEmail;
        });
        if (Object.keys(listingUpdates).length > 0) {
          await update(dbRef(db), listingUpdates);
        }
        
        // Reload user to get updated email
        await currentUser.reload();
        
        // Update user state
        const updatedUser = auth.currentUser;
        setUser(updatedUser);
        
        showMessage(t("emailUpdateSuccess"), "success");
        setEmailForm({ newEmail: "", currentPassword: "" });
      } catch (updateErr) {
        // If updateEmail fails with operation-not-allowed, it's a Firebase Auth restriction
        // The error message "Please verify the new email before changing email" is misleading
        // This typically means email changes are restricted at the project level
        if (updateErr.code === "auth/operation-not-allowed") {
          // Still update the database with the new email as a reference
          // The user will need to use the new email for future logins, but Firebase Auth won't reflect it
          try {
            await update(dbRef(db, `users/${currentUser.uid}`), { 
              email: emailForm.newEmail,
              previousEmail: currentUser.email,
              emailChangeRequestedAt: Date.now()
            });
            
            showMessage(t("emailChangeRestricted"), "error");
          } catch (dbErr) {
            console.error("Database update failed:", dbErr);
            showMessage(t("emailChangeFailed"), "error");
          }
          setEmailForm({ newEmail: "", currentPassword: "" });
          return;
        }
        throw updateErr;
      }
    } catch (err) {
      console.error("Email update error:", err);
      let errorMessage = err.message || t("emailUpdateError");
      
      // Provide more helpful error messages
      if (err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        errorMessage = t("passwordIncorrect");
      } else if (err.code === "auth/email-already-in-use") {
        errorMessage = t("emailInUse");
      } else if (err.code === "auth/requires-recent-login") {
        errorMessage = t("recentLoginRequired");
      } else if (err.code === "auth/operation-not-allowed") {
        errorMessage = t("emailEnumProtection");
      }
      
      showMessage(errorMessage, "error");
    } finally {
      setSavingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (!currentUser) return showMessage(t("loginRequired"), "error");

    const { currentPassword, newPassword, repeatNewPassword } = passwordForm;

    if (!currentPassword) {
      showMessage(t("enterCurrentPassword"), "error");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      showMessage(t("passwordTooShort"), "error");
      return;
    }
    if (newPassword !== repeatNewPassword) {
      showMessage(t("passwordsDontMatch"), "error");
      return;
    }
    if (!currentUser.email) {
      showMessage(t("passwordChangeNotAvailable"), "error");
      return;
    }

    setSavingPassword(true);
    try {
      const cred = EmailAuthProvider.credential(currentUser.email, currentPassword);
      await reauthenticateWithCredential(currentUser, cred);
      await updatePassword(currentUser, newPassword);
      await currentUser.reload();
      setUser(auth.currentUser);
      showMessage(t("passwordUpdateSuccess"), "success");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        repeatNewPassword: "",
      });
    } catch (err) {
      showMessage(t("passwordUpdateError") + " " + err.message, "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const getSignupRecaptcha = () => {
    if (window.signupRecaptchaVerifier) {
      // If it exists but we need a fresh one (e.g. after error), clear it first
      try {
        window.signupRecaptchaVerifier.clear();
      } catch (e) {
        // ignore if not rendered
      }
      window.signupRecaptchaVerifier = null;
    }

    const signupContainer = document.getElementById("recaptcha-signup");
    if (signupContainer) signupContainer.innerHTML = "";

    window.signupRecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-signup",
      { size: "invisible" }
    );

    return window.signupRecaptchaVerifier;
  };

  
  /* Helpers */
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;


  useEffect(() => {
    if (!accountPhone) return;
    setForm((f) => ({ ...f, contact: accountPhone }));
  }, [accountPhone]);

  const handleImageUpload = (e, isEditOverride = null) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Determine which state to update and current image count
    const isEdit = isEditOverride !== null ? isEditOverride : !!editingListing;
    const currentImages = isEdit ? (editForm?.images || []) : (form.images || []);
    
    // Check limit
    if (currentImages.length + files.length > 4) {
      showMessage(t("maxImagesError"), "error");
      return;
    }

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          
          // Compress with 0.7 quality
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          
          if (isEdit) {
            setEditForm(prev => {
              const newImages = [...(prev.images || []), dataUrl];
              return { 
                ...prev, 
                images: newImages,
                imagePreview: newImages[0] // Set first image as preview
              };
            });
          } else {
            setForm(prev => {
              const newImages = [...(prev.images || []), dataUrl];
              return { 
                ...prev, 
                images: newImages,
                imagePreview: newImages[0] // Set first image as preview
              };
            });
          }
        };
        img.src = ev.target?.result;
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input
    e.target.value = "";
  };

  const handleRemoveImage = (index, isEdit = false) => {
    if (isEdit) {
      setEditForm(prev => {
        const newImages = [...(prev.images || [])];
        newImages.splice(index, 1);
        return {
          ...prev,
          images: newImages,
          imagePreview: newImages.length > 0 ? newImages[0] : null
        };
      });
    } else {
      setForm(prev => {
        const newImages = [...(prev.images || [])];
        newImages.splice(index, 1);
        return {
          ...prev,
          images: newImages,
          imagePreview: newImages.length > 0 ? newImages[0] : null
        };
      });
    }
  };

  async function createListingInFirebase(obj) {
    const listingId = obj.id || "lst_" + Date.now();
    const listingData = {
      ...obj,
      id: listingId,
      userId: user?.uid || null,
      userEmail: user?.email || null,
      createdAt: Date.now(),
      expiresAt: Date.now() + parseInt(obj.plan) * 30 * 24 * 60 * 60 * 1000,
    };
    await set(dbRef(db, `listings/${listingId}`), listingData);
    return listingId;
  }

  async function fetchListing(listingId) {
    return new Promise((resolve) => {
      const ref = dbRef(db, `listings/${listingId}`);
      onValue(ref, (snapshot) => resolve(snapshot.val()), { onlyOnce: true });
    });
  }
  async function deleteListing(listingId) {
    try {
      await remove(dbRef(db, `listings/${listingId}`));
      await remove(dbRef(db, `feedback/${listingId}`));
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  }

  /* Create listing (Free) */
  async function handleSubmit(e) {
    e.preventDefault();

    const finalLocation = buildLocationString(form.locationCity, form.locationExtra);

    // basic validation across all steps
    const phoneForListing = accountPhone || form.contact;
    const requiredOk = form.name && form.category && finalLocation && form.description && phoneForListing;
    if (!requiredOk) return showMessage(t("fillAllFields"), "error");

    if (!phoneForListing) {
      return showMessage(t("addPhoneInAccountSettings"), "error");
    }

    const normalizedContact = normalizePhoneForStorage(phoneForListing);
    if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");

    // Spam Prevention: Check active listings count
    // const activeCount = userListings.filter(l => 
    //   (l.status === 'verified' || l.status === 'active' || l.status === 'pending_approval') && 
    //   (l.expiresAt > Date.now())
    // ).length;

    // if (activeCount >= 2) {
    //    return showMessage(t("listingLimitReached") || "Free limit reached (2 listings). Please delete an old listing to post a new one.", "error");
    // }

    // refresh offerprice string from range fields
    const offerpriceStr = formatOfferPrice(form.offerMin, form.offerMax, form.offerCurrency);

    setLoading(true);
    setMessage({ text: "", type: "info" });
    
    try {
      // 1. Create listing with status 'unpaid'
      const planId = form.plan || "1";
      const selectedPlan = PLANS.find(p => p.id === planId) || PLANS[0];
      const listingId = await createListingInFirebase({
        ...form,
        category: form.category,
        contact: normalizedContact,
        location: finalLocation,
        locationCity: form.locationCity,
        locationExtra: form.locationExtra,
        plan: planId,
        offerprice: offerpriceStr || "", 
        status: "unpaid", // Wait for payment
        pricePaid: 0,
        price: selectedPlan.priceVal,
      });

      // 2. Initiate Payment
            try {
                const res = await fetch(`${API_BASE}/api/create-payment`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        listingId,
                        type: "create",
                        userId: user?.uid,
                        customerEmail: user?.email,
                        customerName: userProfile?.name || user?.displayName,
                        plan: planId
                    })
                });
                const data = await res.json();
                
                if (data.success && data.isFreeTrial) {
                    showMessage(t("listingCreatedSuccess"), "success");
                    // Refresh listings or redirect
                    setShowPostForm(false);
                    // fetchListings(); // Removed: undefined and redundant with real-time listeners
                    window.location.reload(); // Simplest way to refresh state
                    return;
                }

                if (data.checkoutUrl) {
              window.location.href = data.checkoutUrl;
              return; // Redirecting...
          } else {
              throw new Error("Payment initialization failed");
          }
      } catch (paymentErr) {
          console.error("Payment error:", paymentErr);
          showMessage(t("listingSavedButPaymentFailed"), "error");
      }
      
      setShowPostForm(false);
      
      setForm({
        step: 1,
        name: "",
        category: "",
        locationCity: "",
        locationExtra: "",
        locationData: null,
        description: "",
        contact: "",
        offerMin: "",
        offerMax: "",
        offerCurrency: "EUR",
        offerprice: "",
        tags: "",
        socialLink: "",
        imagePreview: null,
        images: [],
      });
      
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }




  /* Editing helpers (restored) */
  const openEdit = useCallback((listing) => {
    const rawLocation = (listing.location || "").trim();
    const guessedCity =
      listing.locationCity || MK_CITIES.find((city) => rawLocation.startsWith(city)) || "";
    const guessedExtra =
      listing.locationExtra ||
      (guessedCity ? rawLocation.replace(guessedCity, "").replace(/^\s*-\s*/, "").trim() : "");

    const lockedContact = normalizePhoneForStorage(
      listing.contact || accountPhone || userProfile?.phone || ""
    );

    // Parse offerprice to init range fields
    let offerMin = "";
    let offerMax = "";
    let offerCurrency = "EUR";
    const op = listing.offerprice || "";
    if (op) {
      // "100 - 200 EUR"
      const rangeMatch = op.match(/^([\d.,]+)\s*-\s*([\d.,]+)\s*(\w+)$/);
      if (rangeMatch) {
        offerMin = rangeMatch[1];
        offerMax = rangeMatch[2];
        offerCurrency = rangeMatch[3];
      } else {
        // "from 100 EUR"
        const fromMatch = op.match(/^from\s+([\d.,]+)\s+(\w+)$/);
        if (fromMatch) {
          offerMin = fromMatch[1];
          offerCurrency = fromMatch[2];
        } else {
          // "up to 200 EUR"
          const toMatch = op.match(/^up to\s+([\d.,]+)\s+(\w+)$/);
          if (toMatch) {
            offerMax = toMatch[1];
            offerCurrency = toMatch[2];
          }
        }
      }
    }

    setEditingListing(listing);
    setEditForm({
      name: listing.name || "",
      category: listing.category || "",
      locationCity: guessedCity,
      locationExtra: guessedExtra,
      locationData: listing.locationData || null,
      description: listing.description || "",
      contact: lockedContact,
      plan: listing.plan || "1",
      price: listing.price || 0,         // plan price
      offerprice: listing.offerprice || "",
      offerMin,
      offerMax,
      offerCurrency,
      tags: listing.tags || "",
      socialLink: listing.socialLink || "",
      imagePreview: listing.imagePreview || null,
      images: listing.images || (listing.imagePreview ? [listing.imagePreview] : []),
    });
  }, [accountPhone, userProfile]);
  const saveEdit = async () => {
    if (!editingListing || !editForm) return;

    const finalLocation = buildLocationString(editForm.locationCity, editForm.locationExtra);
    const phoneForListing = editForm.contact || accountPhone || editingListing.contact;

    if (!phoneForListing) return showMessage(t("addPhoneInAccountSettings"), "error");

    if (!editForm.name || !editForm.category || !editForm.locationCity || !editForm.description)
      return showMessage(t("fillAllFields"), "error");

    const normalizedContact = normalizePhoneForStorage(phoneForListing);
    if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");

    // Recalc offerprice string
    const finalOfferPrice = formatOfferPrice(editForm.offerMin, editForm.offerMax, editForm.offerCurrency);

    const updates = {
      name: stripDangerous(editForm.name),
      category: editForm.category,
      location: finalLocation,
      locationCity: editForm.locationCity,
      locationExtra: editForm.locationExtra,
      locationData: editForm.locationData || null,
      description: stripDangerous(editForm.description),
      contact: normalizedContact,
      offerprice: finalOfferPrice,
      tags: stripDangerous(editForm.tags || ""),
      socialLink: stripDangerous(editForm.socialLink || ""),
      imagePreview: editForm.imagePreview || null,
      images: editForm.images || [],
    };
    await update(dbRef(db, `listings/${editingListing.id}`), updates);
    showMessage(t("saveSuccess"), "success");
    setEditingListing(null); setEditForm(null);
  };

  const confirmDelete = useCallback(async (id) => {
    if (!window.confirm(t("confirmDelete"))) return;
    await deleteListing(id);
    showMessage(t("listingDeleted"), "success");
  }, [showMessage]);

  /* Derived data - Optimized for performance */
  // Filter expired listings efficiently
  const verifiedListings = useMemo(() => {
    const now = Date.now();
    return deferredListings.filter((l) => {
      // Quick status check first (most common case)
      if (l.status !== "verified") return false;
      // Then check expiration
      return !l.expiresAt || l.expiresAt > now;
    });
  }, [deferredListings]);
  const allLocations = useMemo(
    () => Array.from(new Set(verifiedListings.map((l) => (l.location || "").trim()).filter(Boolean))),
    [verifiedListings]
  );
  // Optimized feedback averages - compute incrementally as listings load
  // This ensures ranking is ready as soon as listings are available, not after all processing
  const feedbackAverages = useMemo(() => {
    const map = {};
    // Process listings as they come in - don't wait for all filters
    // This allows ranking to be computed on par with loading time
    verifiedListings.forEach((l) => {
      map[l.id] = {
        count: l.feedbackCount || 0,
        avg: l.avgRating ?? null, // Use ?? for null coalescing
      };
    });
    return map;
  }, [verifiedListings]);
  
  // Pre-compute ranking scores for topRated sort to avoid delay during filtering
  const rankingScores = useMemo(() => {
    if (sortBy !== "topRated") return null;
    const scores = new Map();
    verifiedListings.forEach((l) => {
      const stats = feedbackAverages[l.id] || { avg: -1, count: 0 };
      scores.set(l.id, stats);
    });
    return scores;
  }, [verifiedListings, feedbackAverages, sortBy]);

  // Optimized filtering - apply filters in order of selectivity for better performance
  const filtered = useMemo(() => {
    let arr = verifiedListings;
    const qTrimmed = deferredQ.trim();
    
    // Apply most selective filters first to reduce array size quickly
    if (locFilter) {
      arr = arr.filter((l) => l.location === locFilter);
    }
    if (catFilter) {
      arr = arr.filter((l) => l.category === catFilter || t(l.category) === catFilter);
    }
    // Search is less selective, apply after location/category filters
    if (qTrimmed) {
      const term = qTrimmed.toLowerCase();
      arr = arr.filter((l) => {
        const name = (l.name || "").toLowerCase();
        const desc = (l.description || "").toLowerCase();
        return name.includes(term) || desc.includes(term);
      });
    }
    
    // Featured always first, then apply sort option (filters already applied above)
    const featuredCmp = (a, b) => (isFeatured(b) ? 1 : 0) - (isFeatured(a) ? 1 : 0);
    if (sortBy === "newest") {
      arr.sort((a, b) => { const c = featuredCmp(a, b); return c !== 0 ? c : (b.createdAt || 0) - (a.createdAt || 0); });
    } else if (sortBy === "expiring") {
      arr.sort((a, b) => { const c = featuredCmp(a, b); return c !== 0 ? c : (a.expiresAt || 0) - (b.expiresAt || 0); });
    } else if (sortBy === "az") {
      arr.sort((a, b) => {
        const c = featuredCmp(a, b);
        if (c !== 0) return c;
        return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
      });
    } else if (sortBy === "topRated") {
      arr.sort((a, b) => {
        const c = featuredCmp(a, b);
        if (c !== 0) return c;
        const aStats = rankingScores?.get(a.id) || feedbackAverages[a.id] || { avg: -1, count: 0 };
        const bStats = rankingScores?.get(b.id) || feedbackAverages[b.id] || { avg: -1, count: 0 };
        if (bStats.avg !== aStats.avg) return bStats.avg - aStats.avg;
        if (bStats.count !== aStats.count) return bStats.count - aStats.count;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
    } else {
      arr.sort((a, b) => { const c = featuredCmp(a, b); return c !== 0 ? c : (b.createdAt || 0) - (a.createdAt || 0); });
    }
    return arr;
  }, [verifiedListings, deferredQ, catFilter, locFilter, sortBy, feedbackAverages, rankingScores, t]);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );
  const pagedFiltered = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  // Helper function to calculate days until expiration
  const getDaysUntilExpiry = useCallback((expiresAt) => {
    if (!expiresAt) return null;
    const now = Date.now();
    const diff = expiresAt - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  }, []);

  const myListings = useMemo(() => {
    let filtered = [...myListingsRaw];
    
    // Status filter
    if (myListingsStatusFilter === "verified") {
      filtered = filtered.filter((l) => l.status === "verified");
    } else if (myListingsStatusFilter === "pending") {
      filtered = filtered.filter((l) => l.status !== "verified");
    }
    
    // Expiry filter
    if (myListingsExpiryFilter === "expiring") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days > 0 && days <= 7;
      });
    } else if (myListingsExpiryFilter === "expired") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days !== null && days <= 0;
      });
    } else if (myListingsExpiryFilter === "active") {
      filtered = filtered.filter((l) => {
        const days = getDaysUntilExpiry(l.expiresAt);
        return days === null || days > 0;
      });
    }
    
    // Search filter
    if (deferredMyListingsSearch.trim()) {
      const term = deferredMyListingsSearch.trim().toLowerCase();
      filtered = filtered.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(term) ||
          (l.description || "").toLowerCase().includes(term) ||
          (l.location || "").toLowerCase().includes(term) ||
          (l.category || "").toLowerCase().includes(term)
      );
    }
    
    // Sort
    if (myListingsSort === "newest") {
      filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (myListingsSort === "oldest") {
      filtered.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (myListingsSort === "expiring") {
      filtered.sort((a, b) => {
        const aDays = getDaysUntilExpiry(a.expiresAt);
        const bDays = getDaysUntilExpiry(b.expiresAt);
        if (aDays === null && bDays === null) return 0;
        if (aDays === null) return 1;
        if (bDays === null) return -1;
        return aDays - bDays;
      });
    } else if (myListingsSort === "az") {
      filtered.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    
    return filtered;
  }, [myListingsRaw, myListingsStatusFilter, myListingsExpiryFilter, myListingsSort, deferredMyListingsSearch]);
  
  const myVerifiedCount = useMemo(
    () => myListingsRaw.filter((l) => l.status === "verified").length,
    [myListingsRaw]
  );
  const myPendingCount = useMemo(
    () => myListingsRaw.filter((l) => l.status !== "verified").length,
    [myListingsRaw]
  );

  const getListingStats = useCallback(
    (listing) => {
      const stats = feedbackAverages[listing.id] || {};
      const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
      const avgRating = listing.avgRating ?? stats.avg ?? 0;
      const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);

      return { feedbackCount, avgRating, engagement };
    },
    [favorites, feedbackAverages]
  );

  const toggleFav = useCallback((id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])), []);

  const feedbackStats = useMemo(() => {
    if (!selectedListing) return { entries: [], avg: null, count: 0 };
    const stats = feedbackAverages[selectedListing.id];
    return {
      entries: feedbackStore[selectedListing.id]?.entries || [],
      avg: stats?.avg ?? null,
      count: stats?.count ?? 0
    };
  }, [feedbackAverages, selectedListing, feedbackStore]);

  useEffect(() => {
    if (!selectedListing) return;
    const entries = feedbackStore[selectedListing.id]?.entries || [];
    const lastRating = entries[0]?.rating || 4;
    setFeedbackDraft({ rating: lastRating, comment: "" });
  }, [feedbackStore, selectedListing]);

  const handleFeedbackSubmit = useCallback(async (listingId) => {
    if (!listingId) return;
    const rating = Math.min(Math.max(Number(feedbackDraft.rating) || 0, 1), 5);
    const comment = (feedbackDraft.comment || "").trim();

    if (!comment) {
      showMessage(t("commentEmptyError"), "error");
      return;
    }

    let authorName = user?.displayName;
    if (!authorName && user?.uid) {
      try {
        const snapshot = await get(dbRef(db, `users/${user.uid}/name`));
        if (snapshot.exists()) {
          authorName = snapshot.val();
        }
      } catch (e) {
        console.error("Error fetching user name for feedback:", e);
      }
    }

    const entry = {
      rating,
      comment,
      createdAt: Date.now(),
      userId: user?.uid || null,
      author: authorName || (user?.email ? user.email.split('@')[0] : "User"),
    };

    setFeedbackSaving(true);
    try {
      // 1. Add feedback entry
      await push(dbRef(db, `feedback/${listingId}`), entry);

      // 2. Update listing stats (denormalization)
      const listing = listings.find(l => l.id === listingId);
      if (listing) {
        const currentCount = listing.feedbackCount || 0;
        const currentAvg = listing.avgRating || 0;
        const newCount = currentCount + 1;
        const newAvg = Number(((currentAvg * currentCount + rating) / newCount).toFixed(1));

        await update(dbRef(db, `listings/${listingId}`), {
          feedbackCount: newCount,
          avgRating: newAvg
        });

        // 3. Notify listing owner via backend API
        const ownerEmail = listing.userEmail;
        if (ownerEmail) {
          try {
            console.log("[Feedback] Sending notification email to:", ownerEmail);
            const response = await fetch(`${API_BASE}/api/send-feedback-notification`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                listingId,
                listingName: listing.name,
                ownerEmail,
                ownerUserId: listing.userId,
                reviewerName: authorName || (user?.email ? user.email.split('@')[0] : "User"),
                rating,
                comment
              })
            });
            if (response.ok) {
              const result = await response.json();
              console.log("[Feedback] ✅ Notification email sent successfully:", result);
            } else {
              const errorText = await response.text();
              console.error("[Feedback] ❌ Failed to send notification email:", response.status, errorText);
            }
          } catch (err) {
            console.error("[Feedback] ❌ Error sending notification email:", err);
          }
        } else {
          console.warn("[Feedback] ⚠️ No owner email found for listing:", listingId);
        }
      }

      setFeedbackDraft((d) => ({ ...d, comment: "" }));
      showMessage(t("feedbackSaved"), "success");
    } catch (error) {
      console.error(error);
      showMessage(t("feedbackSaveError"), "error");
    } finally {
      setFeedbackSaving(false);
    }
  }, [feedbackDraft, user, t, listings, showMessage]);

  const handleSelectListing = useCallback((l) => {
    setSelectedListing(l);
    setModalImageIndex(0);
    const url = new URL(window.location.href);
    url.searchParams.set("listing", l.id);
    window.history.replaceState({}, "", url.toString());
  }, []);

  const handleOpenEdit = useCallback((l) => {
    openEdit(l);
  }, [openEdit]);

  const handleConfirmDelete = useCallback((id) => {
    confirmDelete(id);
  }, [confirmDelete]);

  const handleShareListing = useCallback((listing) => {
    const url = `${window.location.origin}?listing=${encodeURIComponent(listing.id)}`;
    const text = `${listing.name || ""} • ${listing.location || ""} – ${
      t("shareText")
    }`;

    if (navigator.share) {
      navigator
        .share({
          title: listing.name || t("appName"),
          text,
          url,
        })
        .catch(() => {
          // user canceled or share failed silently; no need to spam them
        });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      showMessage(t("shareCopied"), "success");
    } else {
      showMessage(t("shareNotSupported"), "error");
    }
  }, [t, showMessage]);

  /* Extend flow */
  const handleStartExtendFlow = useCallback((listing) => {
    setExtendTarget(listing);
    setSelectedExtendPlan("1");
    setExtendModalOpen(true);
  }, []);

  const handleProceedExtend = async () => {
    if (!extendTarget) return;
    const listing = extendTarget;
    const planId = selectedExtendPlan;

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/create-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              listingId: listing.id,
              type: "extend",
              customerEmail: user?.email,
              customerName: userProfile?.name || user?.displayName,
              plan: planId
          })
      });
      const data = await res.json();
      if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      showMessage(t("paymentError"), "error");
      setLoading(false);
    }
  };
  
  const onLogout = useCallback(async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    if (selectedTab === "myListings" || selectedTab === "account") {
      setSelectedTab("main");
    }
  }, [t, selectedTab, showMessage]);

  const onLogin = useCallback(() => {
    setShowAuthModal(true);
    setMessage({ text: "", type: "info" });
  }, []);

  const onMenuOpen = useCallback(() => setSidebarOpen(true), []);

  const onSidebarSelect = useCallback((tab) => {
    setSelectedTab(tab);
    setSidebarOpen(false);
  }, [setSelectedTab]);

  const handleSidebarLogout = useCallback(async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    setSidebarOpen(false);
    if (selectedTab === "myListings" || selectedTab === "account") {
      setSelectedTab("main");
    }
  }, [t, selectedTab, showMessage]);

  const handleSidebarLogin = useCallback(() => {
    setShowAuthModal(true);
    setMessage({ text: "", type: "info" });
    setSidebarOpen(false);
  }, []);

  const onSidebarClose = useCallback(() => setSidebarOpen(false), []);

  const previewLocation = buildLocationString(form.locationCity, form.locationExtra);
  const editLocationPreview = editForm
    ? buildLocationString(editForm.locationCity, editForm.locationExtra)
    : "";

  const activeListingCount = useMemo(() => deferredListings.length, [deferredListings]);
  const verifiedListingCount = useMemo(
    () => deferredListings.filter((l) => l.status === "verified").length,
    [deferredListings]
  );
  const phoneVerifiedCount = useMemo(() => deferredListings.filter((l) => l.phoneVerified).length, [deferredListings]);
  // current slides can be derived on render when needed

  // action cards are rendered inline in the UI

  // growth steps rendered inline

  // ideas rendered inline

  // highlights rendered inline

  const primaryNav = useMemo(
    () => [
      { id: "main", label: t("homepage"), icon: "🏠" },
      { id: "allListings", label: t("explore"), icon: "🧭", badge: verifiedListings.length },
      ...(user
        ? [
            { id: "myListings", label: t("myListings"), icon: "📂", badge: myListingsRaw.length },
            { id: "account", label: t("account"), icon: "👤" },
          ]
        : []),
    ],
    [t, verifiedListings.length, myListingsRaw.length, user]
  );

  const currentSectionLabel = useMemo(() => {
    if (selectedTab === "myListings") return t("myListings");
    if (selectedTab === "account") return t("account");
    if (selectedTab === "allListings") return t("explore");
    return t("dashboard");
  }, [selectedTab, t]);

  // sort labels are inlined where needed

  const authModeTabs = useMemo(
    () => [
      { id: "login", label: t("login") },
      { id: "signup", label: t("signup") },
    ],
    [t]
  );

  const authMethodTabs = useMemo(
    () => [
      { id: "email", label: t("emailTab"), icon: "✉️" },
      { id: "phone", label: t("signInWithPhone"), icon: "📱" },
    ],
    [t]
  );

  const handleAuthModeChange = (mode) => {
    setAuthMode(mode);
    setConfirmationResult(null);
    if (mode === "login") setAuthTab("email");
  };

  const handleAuthTabChange = (tab) => {
    setAuthTab(tab);
    setConfirmationResult(null);
  };

  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "https://bizcall.mk";
  const seoTitle = t("seoTitle");
  const seoDescription = t("seoDescription");
  const seoKeywords = t("seoKeywords");
  const ogImage = "/og-image.png";
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BizCall",
    "url": canonicalUrl
  };

  return (
    <>


      <HeadManager
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={canonicalUrl}
        image={ogImage}
        jsonLd={jsonLdData}
      />
      {message.text && <div className={`notification ${message.type}`}>{message.text}</div>}

      <div className="app">
        <Header 
          t={t}
          logo={logo}
          primaryNav={primaryNav}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          lang={lang}
          setLang={setLang}
          user={user}
          onLogout={onLogout}
          onLogin={onLogin}
          onMenuOpen={onMenuOpen}
        />

        {selectedTab === "main" && (
          <HomeTab
            t={t}
            setShowPostForm={setShowPostForm}
            setForm={setForm}
            setSelectedTab={setSelectedTab}
            categoryIcons={categoryIcons}
            mkSpotlightCities={mkSpotlightCities}
            activeListingCount={activeListingCount}
            verifiedListingCount={verifiedListingCount}
            verifiedListings={verifiedListings}
            favorites={favorites}
            toggleFav={toggleFav}
            handleSelectListing={handleSelectListing}
            handleShareListing={handleShareListing}
            showMessage={showMessage}
            getDescriptionPreview={getDescriptionPreview}
            getListingStats={getListingStats}
            ListingCard={ListingCard}
            setCatFilter={setCatFilter}
            setLocFilter={setLocFilter}
          />
        )}

        {/* SIDEBAR (overlay closes on click; ESC handled globally) */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                className="sidebar-overlay"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.aside
                className="sidebar mobile-drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                style={{ touchAction: "none", WebkitOverflowScrolling: "touch" }}
              >
                <Suspense fallback={<div className="sidebar-loading">...</div>}>
                  <Sidebar
                    t={t}
                    selected={selectedTab}
                    onSelect={onSidebarSelect}
                    onLogout={handleSidebarLogout}
                    onLogin={handleSidebarLogin}
                    onClose={onSidebarClose}
                    user={user}
                  />
                </Suspense>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main content container */}
        <div className="container">
          {/* Routes */}
          {selectedTab !== "main" ? (
            <div className="dashboard">
              {/* Dashboard content */}
              <main className="dashboard-content">
                <div className="panel">
                  <div className="dashboard-topbar">
                    <div className="dashboard-meta">
                      <p className="eyebrow subtle">{t("dashboard")}</p>
                      {friendlyName && (
                        <p className="dashboard-greeting">
                          <span className="wave">👋</span> {t("hello") || "Hello"}, <span className="highlight-name">{friendlyName}</span>
                        </p>
                      )}
                      <h2 className="dashboard-heading">{t("manageListings")}</h2>
                    </div>
                    <div className="topbar-tabs">
                      <span className="pill current-view">{currentSectionLabel}</span>
                      {selectedTab !== "allListings" && (
                        <button
                          className="btn btn-ghost small"
                          type="button"
                          onClick={() => setSelectedTab("allListings")}
                        >
                          🌍 {t("explore")}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="tab-panel unified-panel">
                    {selectedTab === "myListings" && (
                      <div className="section my-listings-section">
                        <div className="section-header-row stacked-mobile">
                          <div>
                            <h2 className="section-title-inner">📁 {t("myListings")}</h2>
                            <p className="section-subtitle-small">
                              {t("myListingsHint")}
                            </p>
                          </div>
                          <div className="pill-row">
                            <span className="badge count">
                              {myListings.length} {(myListings.length === 1 ? t("listing") : t("listingsLabel"))}
                            </span>
                            {myVerifiedCount > 0 && (
                              <span className="badge success">
                                ✅ {myVerifiedCount} {t("verified")}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="my-listings-toolbar">
                          <div className="my-listings-stats">
                            <div className="stat-chip positive">
                              <span className="stat-label">✅ {t("verified")}</span>
                              <span className="stat-value">{myVerifiedCount}</span>
                            </div>
                            {myPendingCount > 0 && (
                              <div className="stat-chip subtle">
                                <span className="stat-label">⏳ {t("pending")}</span>
                                <span className="stat-value">{myPendingCount}</span>
                              </div>
                            )}
                            {(() => {
                              const expiringSoon = myListingsRaw.filter(l => {
                                const days = getDaysUntilExpiry(l.expiresAt);
                                return days !== null && days > 0 && days <= 7;
                              }).length;
                              return expiringSoon > 0 ? (
                                <div className="stat-chip warning">
                                  <span className="stat-label">⚠️ {t("expiringSoon")}</span>
                                  <span className="stat-value">{expiringSoon}</span>
                                </div>
                              ) : null;
                            })()}
                            {(() => {
                              const totalReviews = myListingsRaw.reduce((sum, l) => {
                                const stats = getListingStats(l);
                                return sum + (stats.feedbackCount || 0);
                              }, 0);
                              return totalReviews > 0 ? (
                                <div className="stat-chip info">
                                  <span className="stat-label">💬 {t("reviewsLabel")}</span>
                                  <span className="stat-value">{totalReviews}</span>
                                </div>
                              ) : null;
                            })()}
                          </div>
                          <div className="my-listings-actions">
                            <button
                              type="button"
                              className="btn btn-ghost filter-toggle-btn filter-toggle-btn-primary"
                              onClick={() => setFiltersOpen((v) => !v)}
                              aria-expanded={filtersOpen}
                              aria-label={t("filters")}
                            >
                              <span aria-hidden="true">{filtersOpen ? "✕ " : "🔍 "}</span>
                              {t("filters")}
                            </button>
                            <button
                              className="btn btn-ghost small"
                              onClick={() => setSelectedTab("allListings")}
                              type="button"
                            >
                              🔍 {t("explore")}
                            </button>
                            <button
                              className="btn small"
                              onClick={() => {
                                setSelectedTab("myListings");
                                setShowPostForm(true);
                              }}
                              type="button"
                            >
                              ➕ {t("submitListing")}
                            </button>
                          </div>
                        </div>

                        {/* My Listings Filters & Sort */}
                        <Filtersheet
                          t={t}
                          filtersOpen={filtersOpen}
                          setFiltersOpen={setFiltersOpen}
                          q={myListingsSearch}
                          setQ={setMyListingsSearch}
                          sortBy={myListingsSort}
                          setSortBy={setMyListingsSort}
                          statusFilter={myListingsStatusFilter}
                          setStatusFilter={setMyListingsStatusFilter}
                          expiryFilter={myListingsExpiryFilter}
                          setExpiryFilter={setMyListingsExpiryFilter}
                        />

                        {/* Active Filters Bar */}
                        {(myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all") && (
                          <div className="active-filters-bar">
                            <span className="active-filters-label">{t("activeFilters")}:</span>
                            <div className="active-filters-chips">
                              {myListingsSearch && (
                                <span className="active-filter-chip">
                                  {t("search")}: "{myListingsSearch}"
                                  <button
                                    type="button"
                                    className="filter-chip-remove"
                                    onClick={() => setMyListingsSearch("")}
                                  >
                                    ✕
                                  </button>
                                </span>
                              )}
                              {myListingsStatusFilter !== "all" && (
                                <span className="active-filter-chip">
                                  {t("status")}: {t(myListingsStatusFilter) || myListingsStatusFilter}
                                  <button
                                    type="button"
                                    className="filter-chip-remove"
                                    onClick={() => setMyListingsStatusFilter("all")}
                                  >
                                    ✕
                                  </button>
                                </span>
                              )}
                              {myListingsExpiryFilter !== "all" && (
                                <span className="active-filter-chip">
                                  {t("expiry")}: {t(myListingsExpiryFilter) || myListingsExpiryFilter}
                                  <button
                                    type="button"
                                    className="filter-chip-remove"
                                    onClick={() => setMyListingsExpiryFilter("all")}
                                  >
                                    ✕
                                  </button>
                                </span>
                              )}
                              <button
                                type="button"
                                className="btn-clear-all-filters"
                                onClick={() => {
                                  setMyListingsSearch("");
                                  setMyListingsStatusFilter("all");
                                  setMyListingsExpiryFilter("all");
                                  setMyListingsSort("newest");
                                }}
                              >
                                {t("clearAll")}
                              </button>
                            </div>
                          </div>
                        )}

                        {myListings.length === 0 ? (
                          <div className="empty my-listings-empty">
                            <div className="empty-icon">📭</div>
                            <p className="empty-text">
                              {myListingsRaw.length === 0 
                                ? t("noListingsYet")
                                : (myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all")
                                  ? t("noListingsMatchFilters")
                                  : t("noListingsYet")
                              }
                            </p>
                            {myListingsRaw.length > 0 && (myListingsSearch || myListingsStatusFilter !== "all" || myListingsExpiryFilter !== "all") && (
                              <button
                                className="btn small"
                                onClick={() => {
                                  setMyListingsSearch("");
                                  setMyListingsStatusFilter("all");
                                  setMyListingsExpiryFilter("all");
                                }}
                                type="button"
                              >
                                {t("clearFilters")}
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="listing-grid my-listings-grid responsive-grid">
                            {myListings.map((l) => (
                              <MyListingCard
                                key={l.id}
                                listing={l}
                                t={t}
                                user={user}
                                userProfile={userProfile}
                                categoryIcons={categoryIcons}
                                getDaysUntilExpiry={getDaysUntilExpiry}
                                getListingStats={getListingStats}
                                getDescriptionPreview={getDescriptionPreview}
                                setSelectedListing={handleSelectListing}
                                openEdit={handleOpenEdit}
                                startExtendFlow={handleStartExtendFlow}
                                showMessage={showMessage}
                                handleShareListing={handleShareListing}
                                confirmDelete={handleConfirmDelete}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}


                    {selectedTab === "account" && (
                      <div className="section account-shell">
                        {/* Account Header */}
                        <div className="account-header-section">
                          <div className="account-header-content">
                            <h2 className="account-page-title">👤 {t("account")}</h2>
                            <p className="account-page-subtitle">
                              {t("accountSubtitle")}
                            </p>
                          </div>
                          <div className="account-header-actions">
                            <button className="btn btn-ghost small" onClick={() => setSelectedTab("allListings")}>
                              🧭 {t("explore")}
                            </button>
                            <button className="btn small" onClick={() => setShowPostForm(true)}>
                              ➕ {t("submitListing")}
                            </button>
                          </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="account-quick-stats">
                          {[
                              { 
                                icon: "📁", 
                                label: t("myListings"), 
                                value: myListingsRaw.length, 
                                hint: `${myVerifiedCount} ${t("verified")}`,
                                color: "blue"
                              },
                              { 
                                icon: "⭐", 
                                label: t("favorites"), 
                                value: favorites.length, 
                                hint: t("reputation"),
                                color: "yellow"
                              },
                              { 
                                icon: "📅", 
                                label: t("memberSince"), 
                                value: user?.metadata?.creationTime
                                  ? (typeof window !== 'undefined' ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '2025')
                                  : "—",
                                hint: t("accountSince"),
                                color: "purple"
                              },
                            ].map((stat) => (
                              <div key={stat.label} className={`account-stat-card-enhanced stat-${stat.color}`}>
                                <div className="stat-icon">{stat.icon}</div>
                                <div className="stat-content">
                                  <p className="stat-label">{stat.label}</p>
                                  <p className="stat-value">{stat.value}</p>
                                  {stat.hint && <p className="stat-note">{stat.hint}</p>}
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="account-panels">
                          <div className="account-column">
                            {/* Profile Information Card */}
                            <div className="card account-card-enhanced">
                              <div className="account-card-header">
                                <h3 className="account-card-title">📋 {t("profileInfo")}</h3>
                                <p className="account-card-subtitle">{t("accountDetails")}</p>
                              </div>
                              
                              <div className="account-info-list">
                                <div className="account-info-item">
                                  <div className="account-info-item-icon">✉️</div>
                                  <div className="account-info-item-content">
                                    <p className="account-info-label">{t("emailLabel")}</p>
                                    <p className="account-info-value">{user?.email || t("unspecified")}</p>
                                    {user?.emailVerified ? (
                                      <span className="account-info-badge verified">✅ {t("verified")}</span>
                                    ) : (
                                      <span className="account-info-badge not-verified">⏳ {t("pendingVerification")}</span>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="account-info-item">
                                  <div className="account-info-item-icon">📞</div>
                                  <div className="account-info-item-content">
                                    <p className="account-info-label">{t("phoneNumber")}</p>
                                    {!phoneEditing ? (
                                      <>
                                        <p className="account-info-value">
                                          {accountPhone || (
                                            <span className="account-info-placeholder">{t("addPhoneNumber")}</span>
                                          )}
                                        </p>
                                        <button className="btn btn-ghost btn-sm ml-auto" onClick={() => setPhoneEditing(true)}>{t("edit")}</button>
                                      </>
                                    ) : !phoneConfirmationResult ? (
                                      <form className="account-form-enhanced" onSubmit={handleChangePhone}>
                                        <div className="phone-input-group">
                                          <select
                                            value={phoneCountryCode}
                                            onChange={(e) => setPhoneCountryCode(e.target.value)}
                                            className="phone-country"
                                          >
                                            {countryCodes.map((c) => (
                                              <option key={c.code} value={c.code}>
                                                {c.code}
                                              </option>
                                            ))}
                                          </select>
                                          <input
                                            type="tel"
                                            className="phone-number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder={t("phoneNumber")}
                                          />
                                        </div>
                                        <div className="account-form-field">
                                          <label className="account-form-label">{t("currentPassword")}</label>
                                          <input
                                            type="password"
                                            className="input account-form-input"
                                            value={passwordForm.currentPassword}
                                            onChange={(e) =>
                                              setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))
                                            }
                                            placeholder={t("currentPasswordPlaceholder")}
                                          />
                                        </div>
                                        <div className="account-form-actions">
                                          <button type="button" className="btn btn-ghost small" onClick={() => {
                                            setPhoneEditing(false);
                                            setPhoneConfirmationResult(null);
                                          }}>{t("cancel")}</button>
                                          <button type="submit" className="btn small" disabled={savingPhone}>
                                            {savingPhone ? t("sendingCode") : t("savePhone")}
                                          </button>
                                        </div>
                                        <div id="recaptcha-container-account"></div>
                                      </form>
                                    ) : (
                                      <form className="account-form-enhanced" onSubmit={handleVerifyPhoneCode}>
                                        <div className="account-form-field">
                                          <label className="account-form-label">{t("enterCode")}</label>
                                          <input
                                            type="text"
                                            className="input account-form-input"
                                            value={phoneVerificationCode}
                                            onChange={(e) => setPhoneVerificationCode(e.target.value.replace(/\D/g, ""))}
                                            placeholder={t("enterCode")}
                                            maxLength="6"
                                          />
                                        </div>
                                        <div className="account-form-actions">
                                          <button type="button" className="btn btn-ghost small" onClick={() => {
                                            setPhoneConfirmationResult(null);
                                            setPhoneVerificationCode("");
                                          }}>{t("back")}</button>
                                          <button type="submit" className="btn small" disabled={savingPhone}>
                                            {savingPhone ? t("verifying") : t("verifyCode")}
                                          </button>
                                        </div>
                                      </form>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="account-info-item">
                                  <div className="account-info-item-icon">📅</div>
                                  <div className="account-info-item-content">
                                    <p className="account-info-label">{t("accountSince")}</p>
                                    <p className="account-info-value">
                                      {user?.metadata?.creationTime
                                        ? (() => {
                                            if (typeof window === 'undefined') return '2025';
                                            const locale = lang === 'sq' ? 'sq-AL' : lang === 'mk' ? 'mk-MK' : 'en-US';
                                            return new Date(user.metadata.creationTime).toLocaleDateString(locale, { 
                                              year: 'numeric', 
                                              month: 'long', 
                                              day: 'numeric' 
                                            });
                                          })()
                                        : "—"}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {!user?.emailVerified && (
                                <div className="account-alert-enhanced">
                                  <div className="account-alert-icon">⚠️</div>
                                  <div className="account-alert-content">
                                    <p className="account-alert-title">{t("verifyYourEmail")}</p>
                                    <p className="account-alert-sub">{t("verifyEmailHint")}</p>
                                    <div className="account-alert-actions">
                                      <button
                                        className="btn btn-ghost small"
                                        onClick={async () => {
                                          try {
                                            if (user) {
                                              await sendEmailVerification(user);
                                              showMessage(t("verificationSent"), "success");
                                            }
                                          } catch (err) {
                                            showMessage(t("verificationError") + " " + err.message, "error");
                                          }
                                        }}
                                      >
                                        {t("resendVerificationEmail")}
                                      </button>
                                      <button
                                        className="btn small"
                                        onClick={() => {
                                          setAuthMode("verify");
                                          setShowAuthModal(true);
                                        }}
                                      >
                                        {t("iVerified")}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Quick Links Card */}
                            <div className="card account-card-enhanced account-quick-links">
                              <div className="account-card-header">
                                <h3 className="account-card-title">⚡ {t("quickActions")}</h3>
                              </div>
                              <div className="account-quick-links-list">
                                <button 
                                  className="account-quick-link-item"
                                  onClick={() => setSelectedTab("myListings")}
                                >
                                  <span className="quick-link-icon">📁</span>
                                  <div className="quick-link-content">
                                    <p className="quick-link-title">{t("myListings")}</p>
                                    <p className="quick-link-subtitle">{myListingsRaw.length} {t("listingsLabel")}</p>
                                  </div>
                                  <span className="quick-link-arrow">→</span>
                                </button>
                                <button 
                                  className="account-quick-link-item"
                                  onClick={() => setSelectedTab("allListings")}
                                >
                                  <span className="quick-link-icon">🔍</span>
                                  <div className="quick-link-content">
                                    <p className="quick-link-title">{t("explore")}</p>
                                    <p className="quick-link-subtitle">{t("browseListingsHint")}</p>
                                  </div>
                                  <span className="quick-link-arrow">→</span>
                                </button>
                                <button 
                                  className="account-quick-link-item"
                                  onClick={() => setShowPostForm(true)}
                                >
                                  <span className="quick-link-icon">➕</span>
                                  <div className="quick-link-content">
                                    <p className="quick-link-title">{t("submitListing")}</p>
                                    <p className="quick-link-subtitle">{t("createListingHint")}</p>
                                  </div>
                                  <span className="quick-link-arrow">→</span>
                                </button>
                                <Link 
                                  href="/terms"
                                  className="account-quick-link-item"
                                >
                                  <span className="quick-link-icon">📜</span>
                                  <div className="quick-link-content">
                                    <p className="quick-link-title">{t("termsOfService")}</p>
                                    <p className="quick-link-subtitle">{t("readTerms") || "Read our terms"}</p>
                                  </div>
                                  <span className="quick-link-arrow">→</span>
                                </Link>
                                <Link 
                                  href="/privacy"
                                  className="account-quick-link-item"
                                >
                                  <span className="quick-link-icon">🔒</span>
                                  <div className="quick-link-content">
                                    <p className="quick-link-title">{t("privacyPolicy")}</p>
                                    <p className="quick-link-subtitle">{t("readPrivacy") || "Read our privacy policy"}</p>
                                  </div>
                                  <span className="quick-link-arrow">→</span>
                                </Link>
                              </div>
                            </div>
                          </div>

                          <div className="account-column">
                            {/* Edit Profile Card */}
                            <div className="card account-card-enhanced account-profile-section">
                              <div className="account-card-header">
                                <h3 className="account-card-title">👤 {t("editProfile")}</h3>
                                <p className="account-card-subtitle">{t("updateProfileDesc") || "Update your public profile information"}</p>
                              </div>
                              <form className="account-form-enhanced" onSubmit={handleUpdateProfile}>
                                <div className="account-form-field">
                                  <label className="account-form-label">{t("displayName")}</label>
                                  <input
                                    type="text"
                                    className="input account-form-input"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    placeholder={t("displayNamePlaceholder") || "Enter your display name"}
                                  />
                                </div>
                                <div className="account-form-actions">
                                  <button type="submit" className="btn small" disabled={loading}>
                                    {loading ? t("saving") : t("updateProfile")}
                                  </button>
                                </div>
                              </form>
                            </div>

                            {/* Security Settings Card */}
                            <div className="card account-card-enhanced account-security-section">
                              <div className="account-card-header">
                                <h3 className="account-card-title">🔒 {t("securitySettings")}</h3>
                                <p className="account-card-subtitle">{t("securitySettingsText")}</p>
                              </div>

                              {/* Change Email Form */}
                              <div className="account-form-section">
                                <div className="account-form-section-header">
                                  <h4 className="account-form-section-title">✉️ {t("changeEmail")}</h4>
                                  <p className="account-form-section-desc">{t("updateEmailDesc")}</p>
                                </div>
                                <form className="account-form-enhanced" onSubmit={handleChangeEmail}>
                                  <div className="account-form-field">
                                    <label className="account-form-label">{t("newEmail")}</label>
                                    <input
                                      type="email"
                                      className="input account-form-input"
                                      value={emailForm.newEmail}
                                      onChange={(e) => setEmailForm((f) => ({ ...f, newEmail: e.target.value }))}
                                      placeholder={t("newEmailPlaceholder")}
                                    />
                                  </div>
                                  <div className="account-form-field">
                                    <label className="account-form-label">{t("currentPassword")}</label>
                                    <input
                                      type="password"
                                      className="input account-form-input"
                                      value={emailForm.currentPassword}
                                      onChange={(e) => setEmailForm((f) => ({ ...f, currentPassword: e.target.value }))}
                                      placeholder={t("currentPasswordPlaceholder")}
                                    />
                                  </div>
                                  <div className="account-form-actions">
                                    <button type="submit" className="btn small" disabled={savingEmail}>
                                      {savingEmail ? t("saving") : t("saveEmail")}
                                    </button>
                                  </div>
                                </form>
                              </div>

                              {/* Divider */}
                              <div className="account-form-divider"></div>

                              {/* Change Password Form */}
                              <div className="account-form-section">
                                <div className="account-form-section-header">
                                  <h4 className="account-form-section-title">🔑 {t("changePassword")}</h4>
                                  <p className="account-form-section-desc">{t("securitySettings")}</p>
                                </div>
                                <form className="account-form-enhanced" onSubmit={handleChangePassword}>
                                  <div className="account-form-field">
                                    <label className="account-form-label">{t("currentPassword")}</label>
                                    <input
                                      type="password"
                                      className="input account-form-input"
                                      value={passwordForm.currentPassword}
                                      onChange={(e) =>
                                        setPasswordForm((f) => ({ ...f, currentPassword: e.target.value }))
                                      }
                                      placeholder={t("currentPasswordPlaceholder")}
                                    />
                                  </div>
                                  <div className="account-form-field">
                                    <label className="account-form-label">{t("newPassword")}</label>
                                    <input
                                      type="password"
                                      className="input account-form-input"
                                      value={passwordForm.newPassword}
                                      onChange={(e) =>
                                        setPasswordForm((f) => ({ ...f, newPassword: e.target.value }))
                                      }
                                      placeholder={t("newPasswordPlaceholder")}
                                    />
                                  </div>
                                  <div className="account-form-field">
                                    <label className="account-form-label">{t("repeatNewPassword")}</label>
                                    <input
                                      type="password"
                                      className="input account-form-input"
                                      value={passwordForm.repeatNewPassword}
                                      onChange={(e) =>
                                        setPasswordForm((f) => ({ ...f, repeatNewPassword: e.target.value }))
                                      }
                                      placeholder={t("repeatNewPasswordPlaceholder")}
                                    />
                                  </div>
                                  <div className="account-form-actions">
                                    <button type="submit" className="btn small" disabled={savingPassword}>
                                      {savingPassword ? t("saving") : t("savePassword")}
                                    </button>
                                  </div>
                                </form>
                              </div>

                              {/* Divider */}
                              <div className="account-form-divider"></div>

                              {/* Email Subscription */}
                              <div className="account-form-section">
                                <div className="account-form-section-header">
                                  <h4 className="account-form-section-title">📧 {t("emailSubscription")}</h4>
                                  <p className="account-form-section-desc">{t("subscribeToWeeklyEmails")}</p>
                                </div>
                                <div className="account-form-field subscription-field">
                                  <label className="subscription-toggle">
                                    <div className="subscription-toggle-text">
                                      <span className="subscription-toggle-title">📧 {t("emailSubscription")}</span>
                                      <span className="subscription-toggle-desc">{t("subscribeToWeeklyEmails")}</span>
                                    </div>
                                    <div className="toggle-switch">
                                      <input
                                        type="checkbox"
                                        className="subscription-checkbox"
                                        checked={userProfile?.subscribedToMarketing ?? true}
                                        onChange={handleSubscriptionChange}
                                      />
                                      <span className="toggle-slider"></span>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="card account-card-enhanced account-danger-zone" style={{ marginTop: '20px', borderColor: '#fee2e2' }}>
                              <div className="account-card-header">
                                <h3 className="account-card-title" style={{ color: '#ef4444' }}>⚠️ {t("dangerZone")}</h3>
                                <p className="account-card-subtitle">{t("dangerZoneDesc") || "Irreversible account actions"}</p>
                              </div>
                              <div className="account-form-section">
                                <p className="account-form-section-desc" style={{ marginBottom: '16px' }}>
                                  {t("deleteAccountWarning") || "Once you delete your account, there is no going back. Please be certain."}
                                </p>
                                <button 
                                  className="btn btn-danger full-width"
                                  onClick={handleDeleteAccount}
                                  style={{ backgroundColor: '#ef4444', color: 'white' }}
                                >
                                  {t("deleteAccount")}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedTab === "allListings" && (
                      <ListingsTab
                        t={t}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        q={q}
                        setQ={setQ}
                        catFilter={catFilter}
                        setCatFilter={setCatFilter}
                        locFilter={locFilter}
                        setLocFilter={setLocFilter}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        pagedFiltered={pagedFiltered}
                        page={page}
                        totalPages={totalPages}
                        setPage={setPage}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        categoryIcons={categoryIcons}
                        feedbackAverages={feedbackAverages}
                        setSelectedListing={handleSelectListing}
                        filtersOpen={filtersOpen}
                        setFiltersOpen={setFiltersOpen}
                        getDescriptionPreview={getDescriptionPreview}
                        getListingStats={getListingStats}
                        handleShareListing={handleShareListing}
                        showMessage={showMessage}
                        toggleFav={toggleFav}
                        favorites={favorites}
                        categories={categories}
                        allLocations={mkSpotlightCities}
                        listingsLoaded={listingsLoaded}
                        isRefreshing={isRefreshing}
                      />
                    )}

                    {selectedTab === "allListings" && (
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
                        categoryGroups={categoryGroups}
                        categoryIcons={categoryIcons}
                        allLocations={MK_CITIES}
                      />
                    )}
                  </div>
                </div>
              </main>
            </div>
          ) : (
            /* Home (Submit + Quick Browse) */
            <div className="main-grid">
              {/* ====== SUBMIT SECTION ====== */}
              {user && user.emailVerified && !showPostForm && (
                <button
                  type="button"
                  className="floating-post-btn"
                  onClick={() => {
                    setShowPostForm(true);
                    setForm((f) => ({ ...f, step: 1 }));
                  }}
                >
                  ➕ {t("submitListing")}
                </button>
               )}

              {user && !user.emailVerified && (
                <div className="verify-banner">
                  <div>
                    <strong>{t("verifyYourEmail")}</strong>
                    <div className="verify-banner-sub">{t("verifyEmailHint")}</div>
                  </div>
                  <button
                    className="btn btn-ghost small"
                    onClick={() => {
                      setShowAuthModal(true);
                      setAuthMode("verify");
                    }}
                  >
                    {t("verifyYourEmail")}
                  </button>
                </div>
              )}

              {/* ====== MOMENTUM SECTION ====== */}
              <section className="home-feature-grid">
                <div className="card feature-card feature-card--primary">
                  <div className="feature-card__head">
                    <p className="eyebrow subtle">{t("getStartedFast")}</p>
                    <h2 className="section-title">✨ {t("heroTitle")}</h2>
                    <p className="section-subtitle-small">
                      {t("spotlightHintHero")}
                    </p>
                  </div>
                  <div className="feature-points">
                    <div className="feature-point">
                      <div className="feature-icon">🚀</div>
                      <div>
                        <h4>{t("submitListing")}</h4>
                        <p>{t("submitListingDesc")}</p>
                      </div>
                    </div>
                    <div className="feature-point">
                      <div className="feature-icon">🧭</div>
                      <div>
                        <h4>{t("explore")}</h4>
                        <p>{t("exploreHint")}</p>
                      </div>
                    </div>
                    <div className="feature-point">
                      <div className="feature-icon">🛡️</div>
                      <div>
                        <h4>{t("verified")}</h4>
                        <p>{t("verifiedHint")}</p>
                      </div>
                    </div>
                  </div>
                  <div className="feature-actions">
                    <button className="btn" onClick={() => setSelectedTab("allListings")}>
                      🔍 {t("browseMarketplace")}
                    </button>
                    <button
                      className="btn btn-ghost"
                      onClick={() => {
                        setShowPostForm(true);
                        setForm((f) => ({ ...f, step: 1 }));
                      }}
                    >
                      ➕ {t("postService")}
                    </button>
                  </div>
                </div>

                <div className="card feature-card">
                  <div className="feature-card__head">
                    <p className="eyebrow subtle">{t("verified")}</p>
                    <h3 className="section-title-small">🔒 {t("trustSafetyLane")}</h3>
                    <p className="section-subtitle-small">
                      {t("trustSafetyLaneDesc")}
                    </p>
                  </div>
                  <ul className="feature-list">
                    <li>✔️ {t("phoneVerified")}: {phoneVerifiedCount}</li>
                    <li>✔️ {t("listingsLabel")}: {activeListingCount}</li>
                  </ul>
                  <div className="feature-badges">
                    <span className="pill pill-soft">📬 {t("homeDigest")}</span>
                    <span className="pill pill-soft">📍 {mkSpotlightCities[0]}</span>
                  </div>
                </div>

                <div className="card feature-card">
                  <div className="feature-card__head">
                    <h3 className="section-title-small">🧭 {t("localMissions")}</h3>
                    <p className="section-subtitle-small">
                      {t("localMissionsDesc")}
                    </p>
                  </div>
                  <div className="mission-list">
                    <div className="mission-item">
                      <span className="mission-icon">🌟</span>
                      <div>
                        <h4>{t("updateListing")}</h4>
                        <p>{t("updateListingHint")}</p>
                      </div>
                    </div>
                    <div className="mission-item">
                      <span className="mission-icon">🤝</span>
                      <div>
                        <h4>{t("share")}</h4>
                        <p>{t("shareLinkHint")}</p>
                      </div>
                    </div>
                    <div className="mission-item">
                      <span className="mission-icon">🎯</span>
                      <div>
                        <h4>{t("categorySpotlight")}</h4>
                        <p>{t("pickCityChip")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showPostForm && user && user.emailVerified && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPostForm(false)}
            >
              <motion.aside
                className="modal post-form-drawer"
                onClick={(e) => e.stopPropagation()}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">📝 {t("submitListing")}</h3>
                  <button
                    className="icon-btn"
                    onClick={() => setShowPostForm(false)}
                    aria-label={t("close")}
                  >
                    ✕
                  </button>
                </div>
        
                <div className="modal-body modal-body-scrollable">
                {user && user.emailVerified ? (
                  <section className="card form-section">
                    <h2 className="section-title">📝 {t("submitListing")}</h2>
                
                    {/* Step indicators */}
                    <div className="step-indicators-grid">
                      {[1, 2, 3].map((s) => (
                        <div
                          key={s}
                          className={`step-indicator ${form.step === s ? "selected" : ""}`}
                        >
                          <div className="plan-content">
                            <div className="plan-duration">
                              {s === 1
                                ? t("stepBasic")
                                : s === 2
                                ? t("stepDetails")
                                : t("stepPlanPreview")}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                
                    {/* Step 1 */}
                    {form.step === 1 && (
                      <form
                        className="form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!form.name || !form.category || !form.locationCity)
                            return showMessage(t("fillAllFields"), "error");
                          setForm({ ...form, step: 2 });
                        }}
                      >
                        <div className="field-group">
                          <label className="field-label">{t("name")}</label>
                          <input
                            className="input"
                            placeholder={t("namePlaceholder") || t("name")}
                            value={form.name}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: stripDangerous(e.target.value).slice(0, 100),
                              })
                            }
                            maxLength="100"
                            required
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">{t("category")}</label>
                          <select
                            className="select category-dropdown"
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            required
                          >
                            <option value="">{t("selectCategory")}</option>
                            {categoryGroups.map((group) => (
                              <optgroup key={group.id} label={t(group.labelKey)}>
                                {group.categories.map((cat) => (
                                  <option key={cat} value={cat}>
                                    {t(cat) || cat}
                                  </option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>

                        {/* Location picker with map modal */}
                        <div className="location-picker field-group">
                          <label className="field-label">{t("location")}</label>
                          {/* City selector from MK_CITIES */}
                          <select
                            className="select city-dropdown"
                            value={form.locationCity}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                locationCity: e.target.value || "",
                              })
                            }
                            required
                          >
                            <option value="">{t("selectCity")}</option>
                            {MK_CITIES.map((city) => (
                              <option key={city} value={city}>
                                {t(city) || city}
                              </option>
                            ))}
                          </select>

                          {/* Optional extra details: town / village / neighborhood etc. */}
                          <input
                            className="input mt-sm"
                            placeholder={
                              t("locationExtra")
                            }
                            maxLength="100"
                            value={form.locationExtra}
                            onChange={(e) => {
                              const extra = stripDangerous(e.target.value).slice(0, 100);
                              setForm({
                                ...form,
                                locationExtra: extra,
                              });
                            }}
                          />

                          <button
                            type="button"
                            className="btn btn-ghost small mt-sm"
                            onClick={() => setShowMapPicker(true)}
                          >
                            {t("chooseOnMap")}
                          </button>
                        </div>

                        <div className="submit-form-actions">
                          <button type="submit" className="btn">
                            {t("continue")}
                          </button>
                        </div>
                      </form>
                    )}
                
                    {/* Step 2 */}
                    {form.step === 2 && (
                      <form
                        className="form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const phoneForListing = accountPhone || form.contact;
                          if (!form.description || !phoneForListing)
                            return showMessage(t("addPhoneInAccount"), "error");
                          if (!validatePhone(phoneForListing))
                            return showMessage(t("enterValidPhone"), "error");
                          setForm({ ...form, contact: phoneForListing, step: 3 });
                        }}
                      >
                        <div className="field-group">
                          <label className="field-label">{t("description")}</label>
                          <textarea
                            className="textarea"
                            placeholder={t("descriptionPlaceholder") || t("description")}
                            value={form.description}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                description: stripDangerous(e.target.value).slice(0, 1000),
                              })
                            }
                            maxLength="1000"
                            required
                          />
                        </div>

                        <div className="contact-summary field-group">
                          <div className="contact-summary-main">
                            <span className="field-label">{t("contact")}</span>
                            <p className="contact-number">
                              {accountPhone || t("addPhoneInAccount")}
                            </p>
                            <p className="contact-hint">
                              {t("contactAutofill")}
                            </p>
                          </div>
                          <div className="contact-summary-actions">
                            <button
                              type="button"
                              className="btn btn-ghost small"
                              onClick={() => {
                                if (accountPhone) {
                                  setForm((f) => ({ ...f, contact: accountPhone }));
                                  showMessage(t("phoneSynced"), "success");
                                } else {
                                  setSelectedTab("account");
                                  showMessage(t("addPhoneInAccount"), "error");
                                }
                              }}
                            >
                              {accountPhone ? t("useAccountPhone") : t("goToAccount")}
                            </button>
                          </div>
                        </div>

                        {/* Offer price range + currency */}
                        <div className="modern-price-section field-group">
                          <label className="field-label">{t("priceRange") || "Price Range"}</label>
                          <DualRangeSlider
                            min={0}
                            max={20000}
                            value={{ min: Number(form.offerMin) || 0, max: Number(form.offerMax) || 0 }}
                            onChange={({ min, max }) => {
                              const updated = { ...form, offerMin: min, offerMax: max };
                              updated.offerprice = formatOfferPrice(
                                min,
                                max,
                                updated.offerCurrency
                              );
                              setForm(updated);
                            }}
                            currency={form.offerCurrency || "EUR"}
                          />
                          <div className="price-inputs-row">
                             <select
                              className="select currency-select"
                              value={form.offerCurrency}
                              onChange={(e) => {
                                const updated = { ...form, offerCurrency: e.target.value };
                                updated.offerprice = formatOfferPrice(
                                  updated.offerMin,
                                  updated.offerMax,
                                  updated.offerCurrency
                                );
                                setForm(updated);
                              }}
                            >
                              {currencyOptions.map((cur) => (
                                <option key={cur} value={cur}>
                                  {cur}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="field-group">
                          <label className="field-label">{t("tags") || "Tags"}</label>
                          <input
                            className="input"
                            placeholder={t("tagsPlaceholder")}
                            value={form.tags}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                tags: stripDangerous(e.target.value).slice(0, 64),
                              })
                            }
                            maxLength="64"
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">{t("socialLink") || "Social Link"}</label>
                          <input
                            className="input"
                            placeholder={t("socialPlaceholder")}
                            value={form.socialLink}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                socialLink: stripDangerous(e.target.value).slice(0, 200),
                              })
                            }
                            maxLength="200"
                          />
                        </div>

                        <div className="field-group">
                          <label className="field-label">{t("images")}</label>
                          <div
                            onClick={() => document.getElementById("post-images").click()}
                            className="upload-placeholder"
                          >
                            {t("clickToUpload") || "Click to upload images"}
                          </div>
                          <input
                            id="post-images"
                            type="file"
                            accept="image/*"
                            multiple
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                          />

                          {form.images && form.images.length > 0 && (
                            <div className="image-preview-grid">
                              {form.images.map((img, idx) => (
                                <div key={idx} className="preview-item">
                                  <img
                                    src={img}
                                    alt={`${t("uploadAlt")} ${idx + 1}`}
                                  />
                                  <button
                                    type="button"
                                    className="preview-remove-btn"
                                    onClick={() => handleRemoveImage(idx)}
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="submit-form-actions">
                          <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => setForm({ ...form, step: 1 })}
                          >
                            {t("back")}
                          </button>
                          <button type="submit" className="btn">
                            {t("continue")}
                          </button>
                        </div>
                      </form>
                    )}
                
                    {/* Step 3 */}
                    {form.step === 3 && (
                      <form className="form" onSubmit={handleSubmit}>
                        {/* Live Preview */}
                        <div className="preview-card">
                          <div className="listing-header">
                            <h3 className="listing-title">
                              {form.name || t("previewTitlePlaceholder")}
                            </h3>
                            <span className="badge verified">✓ {t("verified")}</span>
                          </div>
                
                          <div className="listing-meta">
                            {t(form.category) || form.category || t("unspecified")} •{" "}
                            {previewLocation || t("unspecified")}
                          </div>
                
                          {form.imagePreview && (
                            <img
                              src={form.imagePreview}
                              alt={t("previewAlt")}
                              className="preview-image"
                            />
                          )}
                
                          <p className="listing-description">
                            {form.description || t("previewDescriptionPlaceholder")}
                          </p>
                
                          <div className="listing-meta listing-meta-preview">
                            {form.offerprice && (
                              <>
                                💶 <strong>{form.offerprice}</strong>&nbsp;&nbsp;
                              </>
                            )}
                            {form.tags && <>🏷️ {form.tags}</>}
                          </div>
                        </div>
                
                        {/* Plan Selection */}
                        <div className="plan-selection-section">
                          <h4 className="plan-selection-title">{t("selectPlan") || "Select Plan"}</h4>
                          
                          {user && userProfile && !userProfile.hasUsedFreeTrial && (
                            <div className="free-trial-banner">
                               <div className="free-trial-icon">🎁</div>
                               <div className="free-trial-content">
                                 <strong>{t("freeTrialAvailable") || "Free Trial Available!"}</strong>
                                 <span>{t("freeTrialDesc") || "Select the 1 Month plan to get your first month completely free."}</span>
                               </div>
                            </div>
                          )}

                          <div className="plan-selection-grid">
                            {PLANS.map(plan => {
                              const isFreeTrialEligible = user && userProfile && !userProfile.hasUsedFreeTrial && plan.id === "1";
                              return (
                              <div 
                                key={plan.id}
                                className={`plan-option ${form.plan === plan.id ? 'selected' : ''}`}
                                onClick={() => setForm({ ...form, plan: plan.id })}
                              >
                                <div className="plan-option-content">
                                  <div className="plan-name-row">
                                    {t(`month${plan.id}`)}
                                    {isFreeTrialEligible && (
                                      <span className="plan-badge-free">
                                        {t("free") || "FREE"}
                                      </span>
                                    )}
                                  </div>
                                  <span className="plan-duration">{t(`days${plan.duration.split(' ')[0]}`)}</span>
                                </div>
                                <div className="plan-price-column">
                                   {isFreeTrialEligible ? (
                                      <>
                                        <span className="plan-price-original">{plan.price}</span>
                                        <span className="plan-price-final">0 EUR</span>
                                      </>
                                   ) : (
                                      <span className="plan-price-final">{plan.price}</span>
                                   )}
                                </div>
                              </div>
                            )})}
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn submit"
                          disabled={loading}
                        >
                          {loading
                            ? `⏳ ${t("loading")}`
                            : t("createListing") || "Create Listing"}
                        </button>
                      </form>
                    )}
                
                    <section
                      className="card trust-section"
                      style={{ marginTop: "5%", height: "fit-content" }}
                    >
                      <h2 className="section-title">
                        {t("whyTrustUs")}
                      </h2>
                      <ul className="trust-list">
                        <li>
                          ✅{" "}
                          {t("trustPoint1")}
                        </li>
                        <li>
                          ✅{" "}
                          {t("trustPoint2")}
                        </li>
                        <li>
                          ✅{" "}
                          {t("trustPoint3")}
                        </li>
                        <li>
                          ✅{" "}
                          {t("trustPoint4")}
                        </li>
                      </ul>
                    </section>
                  </section>
                ) : (
                  <section className="card trust-section" style={{ height: "fit-content" }}>
                    <h2 className="section-title">
                      {t("whyTrustUs")}
                    </h2>
                    <ul className="trust-list">
                      <li>
                        ✅{" "}
                        {t("trustPoint1")}
                      </li>
                      <li>
                        ✅{" "}
                        {t("trustPoint2")}
                      </li>
                      <li>
                        ✅{" "}
                        {t("trustPoint3")}
                      </li>
                      <li>
                        ✅{" "}
                        {t("trustPoint4")}
                      </li>
                    </ul>
                  </section>
                )}
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
    
        {/* MAP PICKER MODAL */}
        <AnimatePresence>
          {showMapPicker && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMapPicker(false)}
            >
              <motion.div
                className="modal map-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">
                    {t("chooseOnMap")}
                  </h3>
                  <button
                    className="icon-btn"
                    onClick={() => setShowMapPicker(false)}
                    aria-label={t("close")}
                  >
                    ✕
                  </button>
                </div>

                <div className="modal-body" style={{ maxHeight: "70vh", overflow: "hidden" }}>
                  <Suspense fallback={<div className="map-loading">Loading Map...</div>}>
                    <NorthMacedoniaMap
                      selectedCity={form.locationCity}
                      onSelectCity={(cityName) => {
                        setForm((f) => ({ ...f, locationCity: cityName }));
                        showMessage(
                          `${t("locationSetTo")} ${cityName}`,
                          "success"
                        );
                        setShowMapPicker(false);
                      }}
                    />
                  </Suspense>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEditMapPicker && editForm && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{zIndex: 55 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditMapPicker(false)}
            >
              <motion.div
                className="modal map-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">
                    {t("chooseOnMap")}
                  </h3>
                  <button
                    className="icon-btn"
                    onClick={() => setShowEditMapPicker(false)}
                    aria-label={t("close")}
                  >
                    ✕
                  </button>
                </div>

                <div className="modal-body" style={{ maxHeight: "70vh", overflow: "hidden" }}>
                  <Suspense fallback={<div className="map-loading">Loading Map...</div>}>
                    <NorthMacedoniaMap
                      selectedCity={editForm.locationCity}
                      onSelectCity={(cityName) => {
                        setEditForm((f) => ({ ...f, locationCity: cityName }));
                        showMessage(
                          `${t("locationSetTo")} ${cityName}`,
                          "success"
                        );
                        setShowEditMapPicker(false);
                      }}
                    />
                  </Suspense>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== EDIT MODAL (restored, resized) ===== */}
        <AnimatePresence>
          <Suspense fallback={null}>
            <EditListingModal
              t={t}
              editingListing={editingListing}
              setEditingListing={setEditingListing}
              editForm={editForm}
              setEditForm={setEditForm}
              saveEdit={saveEdit}
              categories={categories}
              MK_CITIES={MK_CITIES}
              stripDangerous={stripDangerous}
              editLocationPreview={editLocationPreview}
              setShowEditMapPicker={setShowEditMapPicker}
              setSelectedTab={setSelectedTab}
              handleShareListing={handleShareListing}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              formatOfferPrice={formatOfferPrice}
              currencyOptions={currencyOptions}
            />
          </Suspense>
        </AnimatePresence>




        {/* ===== AUTH MODAL (login + signup, email + phone) ===== */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
            >
              <motion.div
                className="modal auth-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
              >
                {/* Header */}
                <div className="modal-header auth-modal-header">
                  <h3 className="modal-title auth-title">
                    {authMode === "signup"
                      ? t("createAccount")
                      : authTab === "email"
                      ? t("emailLoginSignup")
                      : t("verifyPhone")}
                  </h3>
                  <button
                    className="icon-btn"
                    onClick={() => setShowAuthModal(false)}
                    aria-label={t("close")}
                  >
                    ✕
                  </button>
                </div>
        
                {/* Mode tabs: Login / Register */}
                <TabBar
                  items={authModeTabs}
                  value={authMode}
                  onChange={handleAuthModeChange}
                  className="auth-mode-tabs"
                  size="compact"
                  fullWidth
                />

                {/* =================== LOGIN MODE =================== */}
                {authMode === "login" && (
                  <>
                    {/* Login method tabs: Email / Phone */}
                    <TabBar
                      items={authMethodTabs}
                      value={authTab}
                      onChange={handleAuthTabChange}
                      className="auth-tabs"
                      size="compact"
                      fullWidth
                    />

                    {/* EMAIL LOGIN */}
                    {authTab === "email" ? (
                      <div className="modal-body auth-body auth-body-card">
                        <p className="auth-subtitle">
                          {t("loginSubtitle")}
                        </p>
        
                        {/* Email */}
                        <div className="auth-field-group">
                          <span className="field-label">{t("email")}</span>
                          <input
                            className="input"
                            type="email"
                            placeholder={t("email")}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
        
                        {/* Password */}
                        <div className="auth-field-group">
                          <span className="field-label">{t("password")}</span>
                          <input
                            className="input"
                            type="password"
                            placeholder={t("password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
        
                        <div className="auth-actions">
                          <button
                            className="btn full-width"
                            onClick={async () => {
                              if (!validateEmail(email))
                                return showMessage(t("enterValidEmail"), "error");
                              try {
                                await signInWithEmailAndPassword(auth, email, password);
                                showMessage(t("signedIn"), "success");
                                setShowAuthModal(false);
                                setEmail("");
                                setPassword("");
                              } catch (e) {
                                showMessage(e.message, "error");
                              }
                            }}
                          >
                            {t("login")}
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* PHONE LOGIN */
                      <div className="modal-body auth-body auth-body-card">
                        <p className="auth-subtitle">
                          {t("phoneLoginSubtitle")}
                        </p>
        
                        <div className="auth-field-group">
                          <span className="field-label">{t("phoneNumber")}</span>
                          <div className="phone-input-group">
                            <select
                              className="select phone-country"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                            >
                              {countryCodes.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.name} ({c.code})
                                </option>
                              ))}
                            </select>
                            <input
                              className="input phone-number"
                              type="tel"
                              placeholder={t("phoneNumber")}
                              value={phoneNumber}
                              onChange={(e) =>
                                setPhoneNumber(e.target.value.replace(/\D/g, ""))
                              }
                              maxLength="12"
                              inputMode="numeric"
                            />
                          </div>
                        </div>
        
                        {!confirmationResult ? (
                          <div className="auth-actions">
                            <button
                              className="btn full-width"
                              onClick={async () => {
                                const rest = (phoneNumber || "").replace(/\D/g, "");
                                if (!rest || rest.length < 5 || rest.length > 12)
                                  return showMessage(t("enterValidPhone"), "error");
        
                                const fullPhone = countryCode + rest;
                                if (!validatePhone(fullPhone))
                                  return showMessage(t("enterValidPhone"), "error");
        
                                setPhoneLoading(true);
                                try {
                                  if (!window.recaptchaVerifier)
                                    createRecaptcha("recaptcha-container");
                                  const result = await signInWithPhoneNumber(
                                    auth,
                                    fullPhone,
                                    window.recaptchaVerifier
                                  );
                                  setConfirmationResult(result);
                                  showMessage(t("codeSent"), "success");
                                } catch (err) {
                                  console.error(err);
                                  showMessage(translateFirebaseError(err, t), "error");
                                  if (window.recaptchaVerifier) {
                                    try {
                                      window.recaptchaVerifier.clear();
                                    } catch (e) {
                                      // ignore
                                    }
                                    window.recaptchaVerifier = null;
                                  }
                                } finally {
                                  setPhoneLoading(false);
                                }
                              }}
                              disabled={phoneLoading}
                            >
                              {phoneLoading ? t("sendingCode") : t("sendLink")}
                            </button>
                          </div>
                        ) : (
                          <div className="auth-actions">
                            <div className="auth-field-group">
                              <span className="field-label">{t("enterCode")}</span>
                              <input
                                className="input"
                                type="text"
                                placeholder={t("enterCode")}
                                value={verificationCode}
                                onChange={(e) =>
                                  setVerificationCode(
                                    e.target.value.replace(/\D/g, "")
                                  )
                                }
                                maxLength="6"
                                inputMode="numeric"
                              />
                            </div>
        
                            <button
                              className="btn full-width"
                              onClick={async () => {
                                if (!confirmationResult || !verificationCode.trim())
                                  return showMessage(t("enterCode"), "error");
                                if (!/^\d{6}$/.test(verificationCode.trim()))
                                  return showMessage(t("invalidCode"), "error");
        
                                setPhoneLoading(true);
                                try {
                                  await confirmationResult.confirm(verificationCode);
                                  showMessage(t("signedIn"), "success");
                                  setShowAuthModal(false);
                                  setPhoneNumber("");
                                  setVerificationCode("");
                                  setConfirmationResult(null);
                                } catch (err) {
                                  showMessage(translateFirebaseError(err, t), "error");
                                } finally {
                                  setPhoneLoading(false);
                                }
                              }}
                              disabled={phoneLoading}
                            >
                              {phoneLoading ? t("verifying") : t("verifyPhone")}
                            </button>
                          </div>
                        )}
        
                        <div id="recaptcha-container" className="recaptcha"></div>
                      </div>
                    )}
                  </>
                )}
        
                {authMode === "signup" && (
                  <div className="modal-body auth-body auth-body-card">
                    <p className="auth-subtitle">
                      {t("signupSubtitle") ||
                        "Create a BizCall account to post and manage your listings."}
                    </p>
                
                    <div className="auth-field-group">
                      <span className="field-label">{t("name")}</span>
                      <input
                        className="input"
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                
                    {/* EMAIL */}
                    <div className="auth-field-group">
                      <span className="field-label">{t("email")}</span>
                      <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                
                    {/* PASSWORD */}
                    <div className="auth-field-group">
                      <span className="field-label">{t("password")}</span>
                      <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                
                    {/* REPEAT PASSWORD */}
                    <div className="auth-field-group">
                      <span className="field-label">
                        {t("repeatNewPassword")}
                      </span>
                      <input
                        className="input"
                        type="password"
                        value={passwordForm.repeatNewPassword}
                        onChange={(e) =>
                          setPasswordForm({ repeatNewPassword: e.target.value })
                        }
                      />
                    </div>
                
                    {/* PHONE (MANDATORY) */}
                    <div className="auth-field-group">
                      <span className="field-label">{t("phoneNumber")}</span>
                      <div className="phone-input-group">
                        <select
                          className="select phone-country"
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                        >
                          {countryCodes.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.name} ({c.code})
                            </option>
                          ))}
                        </select>
                        <input
                          className="input phone-number"
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, ""))
                          }
                          maxLength="12"
                          inputMode="numeric"
                        />
                      </div>
                    </div>
                
                    {/* Checkbox for Terms */}
                    <div className="auth-field-group checkbox-group">
                      <input 
                        type="checkbox" 
                        id="agreeTerms" 
                        checked={agreedToTerms} 
                        onChange={(e) => setAgreedToTerms(e.target.checked)} 
                        className="auth-checkbox"
                      />
                      <label htmlFor="agreeTerms" className="auth-terms-label">
                        {t("agreeTo") || "I agree to the"} <Link href="/terms" target="_blank" rel="noopener noreferrer" className="link-btn">{t("termsOfService")}</Link> {t("and") || "and"} <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="link-btn">{t("privacyPolicy")}</Link>.
                      </label>
                    </div>

                    {/* STEP 1: SEND SMS */}
                    {!confirmationResult && (
                      <button
                        className="btn full-width"
                        disabled={phoneLoading}
                        onClick={async () => {
                          if (!agreedToTerms)
                            return showMessage(t("mustAgreeToTerms"), "error");

                          if (!validateEmail(email))
                            return showMessage(t("enterValidEmail"), "error");
                          
                          if (!displayName.trim())
                            return showMessage(t("enterName"), "error");
                
                          if (password.length < 6)
                            return showMessage(t("passwordTooShort"), "error");
                
                          if (passwordForm.repeatNewPassword !== password)
                            return showMessage(t("passwordsDontMatch"), "error");
                
                          const raw = phoneNumber.replace(/\D/g, "");
                          if (!raw || raw.length < 5)
                            return showMessage(t("enterValidPhone"), "error");
                
                          const fullPhone = countryCode + raw;
                          if (!validatePhone(fullPhone))
                            return showMessage(t("enterValidPhone"), "error");
                
                          setPhoneLoading(true);
                          try {
                            const verifier = getSignupRecaptcha();
                            const confirmation = await signInWithPhoneNumber(
                              auth,
                              fullPhone,
                              verifier
                            );
                            setConfirmationResult(confirmation);
                            showMessage(t("codeSent"), "success");
                          } catch (err) {
                            console.error(err);
                            window.signupRecaptchaVerifier?.clear?.();
                            window.signupRecaptchaVerifier = null;
                            showMessage(translateFirebaseError(err, t), "error");
                          } finally {
                            setPhoneLoading(false);
                          }
                        }}
                      >
                        {t("createAccount")}
                      </button>
                    )}
                
                    {/* STEP 2: VERIFY CODE + LINK EMAIL */}
                    {confirmationResult && (
                      <>
                        <div className="auth-field-group mt-md">
                          <span className="field-label">{t("enterCode")}</span>
                          <input
                            className="input"
                            value={verificationCode}
                            onChange={(e) =>
                              setVerificationCode(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength="6"
                          />
                        </div>
                
                        <button
                          className="btn full-width"
                          disabled={phoneLoading}
                          onClick={async () => {
                            if (!/^\d{6}$/.test(verificationCode))
                              return showMessage(t("invalidCode"), "error");
                
                            setPhoneLoading(true);
                            try {
                              const result = await confirmationResult.confirm(
                                verificationCode
                              );
                              const user = result.user;
                              const { isNewUser } = getAdditionalUserInfo(result) || {};

                              try {
                                const emailCred = EmailAuthProvider.credential(
                                  email,
                                  password
                                );
                                await linkWithCredential(user, emailCred);

                                if (displayName.trim()) {
                                  await updateProfile(user, { displayName: displayName.trim() });
                                }

                                await set(dbRef(db, `users/${user.uid}`), {
                                  name: displayName.trim() || null,
                                  email: user.email,
                                  phone: normalizePhoneForStorage(countryCode + phoneNumber),
                                  createdAt: Date.now(),
                                  subscribedToMarketing: true,
                                });

                                await sendEmailVerification(user);

                                showMessage(t("signupSuccess"), "success");

                                setAuthMode("verify");
                                setConfirmationResult(null);
                                setVerificationCode("");
                              } catch (innerErr) {
                                console.error("Signup incomplete, rolling back user creation:", innerErr);
                                
                                // Only delete if this was a freshly created user to avoid deleting existing accounts
                                if (isNewUser) {
                                  await user.delete().catch(cleanupErr => console.error("Failed to cleanup user:", cleanupErr));
                                }
                                
                                // Reset UI state to allow retry
                                setConfirmationResult(null);
                                setVerificationCode("");
                                if (window.signupRecaptchaVerifier) {
                                    try {
                                      window.signupRecaptchaVerifier.clear();
                                    } catch (e) {
                                      // ignore
                                    }
                                    window.signupRecaptchaVerifier = null;
                                }
                                
                                throw innerErr;
                              }
                            } catch (err) {
                              console.error(err);
                              showMessage(translateFirebaseError(err, t), "error");
                            } finally {
                              setPhoneLoading(false);
                            }
                          }}
                        >
                          {t("verifyPhone")}
                        </button>
                      </>
                    )}
                
                    <div id="recaptcha-signup" className="recaptcha" />
                  </div>
                )}

                {/* =================== VERIFY MODE =================== */}
                {authMode === "verify" && (
                  <div className="modal-body auth-body auth-body-card">
                    <p className="auth-subtitle">
                      {t("verifyEmailHint")}
                    </p>
                
                    <div className="auth-verify-box">
                      <div className="auth-verify-row">
                        <span className="auth-verify-label">{t("email")}</span>
                        <span className="auth-verify-value">{auth.currentUser?.email || email}</span>
                      </div>
                      <p className="auth-verify-footnote">{t("verifyFootnote")}</p>
                    </div>
                
                    <div className="auth-actions">
                      <button
                        className="btn btn-ghost full-width"
                        disabled={resendBusy}
                        onClick={async () => {
                          if (!auth.currentUser) return showMessage(t("youMustBeLoggedIn"), "error");
                          setResendBusy(true);
                          try {
                            await sendEmailVerification(auth.currentUser);
                            showMessage(t("emailLinkSent"), "success");
                          } catch (err) {
                            showMessage(err, "error");
                          } finally {
                            setResendBusy(false);
                          }
                        }}
                      >
                        {t("resendEmail")}
                      </button>
                
                      <button
                        className="btn full-width"
                        disabled={verifyBusy}
                        onClick={async () => {
                          if (!auth.currentUser) return showMessage(t("youMustBeLoggedIn"), "error");
                          setVerifyBusy(true);
                          try {
                            await auth.currentUser.reload();
                            if (auth.currentUser.emailVerified) {
                              showMessage(t("emailVerified"), "success");
                              setShowAuthModal(false);
                              setAuthMode("login");
                            } else {
                              showMessage(t("notVerifiedYet"), "error");
                            }
                          } catch (err) {
                            showMessage(err, "error");
                          } finally {
                            setVerifyBusy(false);
                          }
                        }}
                      >
                        {verifyBusy ? t("verifying") : t("iVerified")}
                      </button>
                
                      <button
                        className="btn btn-ghost full-width"
                        onClick={() => {
                          // skippable, but posting remains blocked by your existing checks
                          showMessage(t("verifyLater"), "success");
                          setShowAuthModal(false);
                          setAuthMode("login");
                        }}
                      >
                        {t("verifyLater")}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {postSignupVerifyOpen && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPostSignupVerifyOpen(false)}
            >
              <motion.div
                className="modal verify-email-modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">{t("verifyYourEmail")}</h3>
                  <button className="icon-btn" onClick={() => setPostSignupVerifyOpen(false)}>
                    ✕
                  </button>
                </div>
        
                <div className="modal-body">
                  <p className="auth-subtitle">
                    {t("verifyEmailHint")}
                  </p>
        
                  <div className="verify-actions">
                    <button
                      className="btn full-width"
                      onClick={async () => {
                        try {
                          const u = auth.currentUser;
                          if (!u) return showMessage(t("notSignedIn"), "error");
                          await sendEmailVerification(u);
                          showMessage(t("emailLinkSent"), "success");
                        } catch (err) {
                          showMessage(translateFirebaseError(err, t), "error");
                        }
                      }}
                    >
                      {t("resendEmail")}
                    </button>
        
                    <button
                      className="btn btn-ghost full-width"
                      onClick={async () => {
                        try {
                          // Force-refresh the user object to reflect verification
                          await auth.currentUser?.reload();
                          if (auth.currentUser?.emailVerified) {
                            showMessage(t("emailVerified"), "success");
                            setPostSignupVerifyOpen(false);
                          } else {
                            showMessage(
                              t("notVerifiedYet"),
                              "error"
                            );
                          }
                        } catch (err) {
                          showMessage(translateFirebaseError(err, t), "error");
                        }
                      }}
                    >
                      {t("iVerified")}
                    </button>
        
                    <button
                      className="btn btn-ghost full-width"
                      onClick={() => setPostSignupVerifyOpen(false)}
                    >
                      {t("verifyLater")}
                    </button>
                  </div>
        
                  <div className="verify-footnote">
                    {t("verifyFootnote")}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* LISTING DETAILS MODAL */}
        <AnimatePresence>
          {selectedListing && (
            <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => {
                setSelectedListing(null);
                const url = new URL(window.location.href);
                url.searchParams.delete("listing");
                window.history.replaceState({}, "", url.toString());
              }}
            >
              <motion.div className="modal listing-details-modal" onClick={(e) => e.stopPropagation()} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="modal-header category-banner" style={{ background: "linear-gradient(135deg, #2563eb, #3b82f6)", color: "#fff" }}>
                  <div className="flex items-center gap-2">
                    <span className="category-icon" style={{ fontSize: "1.5rem" }}>
                      {categoryIcons[selectedListing.category] || "🏷️"}
                    </span>
                    <h3 className="modal-title">{selectedListing.name}</h3>
                  </div>
                  <button className="icon-btn text-white"
                    onClick={() => {
                      setSelectedListing(null);
                      const url = new URL(window.location.href);
                      url.searchParams.delete("listing");
                      window.history.replaceState({}, "", url.toString());
                    }}
                  >
                    ✕
                  </button>
                </div>

                <div className="modal-body listing-details-body">
                  <div className="listing-layout">
                    <div className="listing-main">
                      <div className="listing-hero">
                        <div className="hero-left">
                          <div className="hero-icon-bubble">{categoryIcons[selectedListing.category] || "🏷️"}</div>
                          <div>
                            <p className="eyebrow">{t("listing")}</p>
                            <h3 className="hero-title">{selectedListing.name}</h3>
                            <div className="chip-row">
                              <span className="pill">{t(selectedListing.category) || selectedListing.category}</span>
                              <span className="pill pill-soft">{selectedListing.location || t("unspecified")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="status-stack">
                          <span className={`status-pill ${selectedListing.status === "verified" ? "is-verified" : "is-pending"}`}>
                            {selectedListing.status === "verified" ? "✅ " + t("verified") : "⏳ " + t("pending")}
                          </span>
                          {selectedListing.expiresAt && (
                            <span className="small-muted">{t("expires")}: {typeof window !== 'undefined' ? new Date(selectedListing.expiresAt).toLocaleDateString() : '—'}</span>
                          )}
                          <span className="rating-chip">
                            ⭐ {feedbackStats.avg ?? "–"} / 5
                          </span>
                        </div>
                      </div>

                      {/* FEATURED BANNER */}
                      {/* Removed */}

                      {/* CAROUSEL SECTION */}
                      {(() => {
                        const images = selectedListing.images && selectedListing.images.length > 0 
                          ? selectedListing.images 
                          : (selectedListing.imagePreview ? [selectedListing.imagePreview] : []);
                        
                        if (images.length === 0) return null;

                        return (
                          <>
                          <div className="modal-carousel-container">
                            <img 
                              src={images[modalImageIndex] || images[0]} 
                              alt={selectedListing.name} 
                              className="modal-carousel-image"
                            />
                            
                            {images.length > 1 && (
                              <>
                                <button 
                                  className="modal-carousel-btn prev"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                                  }}
                                >
                                  ‹
                                </button>
                                <button 
                                  className="modal-carousel-btn next"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                                  }}
                                >
                                  ›
                                </button>
                                <div className="modal-carousel-dots">
                                  {images.map((_, idx) => (
                                    <div 
                                      key={idx} 
                                      className={`modal-carousel-dot ${idx === modalImageIndex ? 'active' : ''}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setModalImageIndex(idx);
                                      }}
                                    />
                                  ))}
                                </div>
                              </>
                            )}
                            
                            {/* Overlay Badges */}
                            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8, zIndex: 5 }}>
                               {selectedListing.offerprice && (
                                 <span className="pill pill-price" style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                   {selectedListing.offerprice}
                                 </span>
                               )}
                            </div>
                          </div>
                          
                          {/* THUMBNAILS */}
                          {images.length > 1 && (
                            <div className="modal-carousel-thumbs">
                              {images.map((img, idx) => (
                                <img
                                  key={idx}
                                  src={img}
                                  alt={`Thumb ${idx}`}
                                  className={`modal-carousel-thumb ${idx === modalImageIndex ? 'active' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setModalImageIndex(idx);
                                  }}
                                />
                              ))}
                            </div>
                          )}
                          </>
                        );
                      })()}

                      <div className="mobile-cta-bar">
                        <div className="mobile-cta-meta">
                          <span className="pill pill-soft">{listingLocationLabel}</span>
                          <span className="pill">{listingPriceLabel}</span>
                        </div>
                        <div className="mobile-cta-actions">
                          <button className="quick-action-btn" disabled={!listingContactAvailable} onClick={() => listingContactAvailable && window.open(`tel:${selectedListing.contact}`)}>
                            📞 {t("call")}
                          </button>
                          <button className="quick-action-btn" onClick={() => window.open(`mailto:${selectedListing.userEmail || ""}?subject=Regarding%20${encodeURIComponent(selectedListing.name)}`)}>
                            ✉️ {t("emailAction")}
                          </button>
                          <button className="quick-action-btn ghost" disabled={!listingContactAvailable} onClick={() => {
                            if (!listingContactAvailable) return;
                            navigator.clipboard.writeText(selectedListing.contact);
                            showMessage(t("copied"), "success");
                          }}>
                            📋 {t("copy")}
                          </button>
                          <button className="quick-action-btn ghost" onClick={() => handleShareListing(selectedListing)}>
                            🔗 {t("share")}
                          </button>
                          <button 
                            className="quick-action-btn ghost" 
                            style={{ color: '#ef4444', borderColor: '#fee2e2' }}
                            onClick={() => {
                              setReportingListingId(selectedListing.id);
                              setShowReportModal(true);
                            }}
                          >
                            🚩 {t("report")}
                          </button>
                        </div>
                      </div>

                      <div className="listing-highlight-grid">
                        <div className="highlight-card">
                          <p className="highlight-label">{t("status")}</p>
                          <p className="highlight-value">{selectedListing.status === "verified" ? t("verified") : t("pendingVerification")}</p>
                        </div>
                        <div className="highlight-card">
                          <p className="highlight-label">{t("listedOn")}</p>
                          <p className="highlight-value">{selectedListing.createdAt ? new Date(selectedListing.createdAt).toLocaleDateString() : t("unspecified")}</p>
                        </div>
                        <div className="highlight-card">
                          <p className="highlight-label">{t("priceRangeLabel")}</p>
                          <p className="highlight-value">{listingPriceLabel}</p>
                        </div>
                        <div className="highlight-card">
                          <p className="highlight-label">{t("locationDetails")}</p>
                          <p className="highlight-value">{listingLocationLabel}</p>
                          {selectedListing.locationData?.mapsUrl && (
                            <a className="map-link" href={selectedListing.locationData.mapsUrl} target="_blank" rel="noreferrer">{t("openInMaps")}</a>
                          )}
                        </div>
                        <div className="highlight-card">
                          <p className="highlight-label">{t("reputation")}</p>
                          <p className="highlight-value">{feedbackStats.avg != null ? `${feedbackStats.avg}/5` : t("noFeedback")}</p>
                          <p className="small-muted">{t("recentFeedback")}: {feedbackStats.count}</p>
                        </div>
                      </div>



                      <div className="listing-section">
                        <div className="section-heading">
                          <h4>{t("aboutListing")}</h4>
                          <span className="pill muted">{t("category")}: {t(selectedListing.category) || selectedListing.category}</span>
                        </div>
                        <p className="listing-description-full">{selectedListing.description}</p>
                        


                        <div className="soft-grid">
                          <div>
                            <p className="highlight-label">{t("pricing")}</p>
                            <p className="highlight-value">{listingPriceLabel}</p>
                          </div>
                          <div>
                            <p className="highlight-label">{t("contactEmail")}</p>
                            <p className="highlight-value">{selectedListing.userEmail || t("unspecified")}</p>
                          </div>
                        </div>
                        {selectedListing.tags && (
                          <div className="tag-chip-row">
                            {(selectedListing.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean).map((tag) => (
                              <span className="tag-chip" key={tag}>{tag}</span>
                            ))}
                          </div>
                        )}
                        {selectedListing.socialLink && (
                          <a className="link-badge" href={selectedListing.socialLink} target="_blank" rel="noreferrer">{t("websiteLabel")}: {selectedListing.socialLink}</a>
                        )}
                      </div>

                      <div className="contact-panel">
                        <div>
                          <p className="panel-title">{t("contact")}</p>
                          <p className="panel-subtitle">{selectedListing.contact || t("unspecified")}</p>
                          <p className="panel-hint">{t("contactAutofill")}</p>
                        </div>
                        <div className="quick-actions">
                          <div className="quick-actions-header">
                            <p className="highlight-label">{t("quickActions")}</p>
                            <p className="small-muted">{t("postingReadyHint")}</p>
                          </div>
                          <div className="quick-action-buttons">
                            <button className="quick-action-btn" disabled={!listingContactAvailable} onClick={() => listingContactAvailable && window.open(`tel:${selectedListing.contact}`)}>📞 {t("call")}</button>
                            <button className="quick-action-btn" onClick={() => window.open(`mailto:${selectedListing.userEmail || ""}?subject=Regarding%20${encodeURIComponent(selectedListing.name)}`)}>✉️ {t("emailAction")}</button>
                            <button className="quick-action-btn ghost" disabled={!listingContactAvailable} onClick={() => {
                              if (!listingContactAvailable) return;
                              navigator.clipboard.writeText(selectedListing.contact);
                              showMessage(t("copied"), "success");
                            }}>📋 {t("copy")}</button>
                            <button className="quick-action-btn ghost" onClick={() => handleShareListing(selectedListing)}>🔗 {t("share")}</button>
                          </div>
                        </div>
                      </div>

                    </div>

                    <aside className="listing-sidebar">
                      <div className="sidebar-card">
                        <p className="sidebar-title">{t("quickFacts")}</p>
                        <ul className="fact-list">
                          <li><span>{t("statusLabel")}</span><strong>{selectedListing.status === "verified" ? t("verified") : t("pendingVerification")}</strong></li>
                          <li><span>{t("listedOn")}</span><strong>{selectedListing.createdAt ? (typeof window !== 'undefined' ? new Date(selectedListing.createdAt).toLocaleDateString() : '—') : t("unspecified")}</strong></li>
                          <li><span>{t("locationLabelFull")}</span><strong>{selectedListing.location || t("unspecified")}</strong></li>
                          <li><span>{t("pricing")}</span><strong>{selectedListing.offerprice || t("unspecified")}</strong></li>
                        </ul>
                      </div>

                      <div className="sidebar-card">
                        <p className="sidebar-title">{t("shareListing")}</p>
                        <div className="sidebar-actions">
                          <button className="quick-action-btn" onClick={() => handleShareListing(selectedListing)}>🔗 {t("share")}</button>
                          <button className="quick-action-btn ghost" onClick={() => toggleFav(selectedListing.id)}>
                            {favorites.includes(selectedListing.id) ? "★" : "☆"} {t("favorite")}
                          </button>
                          {selectedListing.locationData?.mapsUrl && (
                            <button className="quick-action-btn ghost" onClick={() => window.open(selectedListing.locationData.mapsUrl, "_blank")}>🗺️ {t("openInMaps")}</button>
                          )}
                          <button className="quick-action-btn ghost" onClick={() => {
                            setReportingListingId(selectedListing.id);
                            setShowReportModal(true);
                          }}>🚩 {t("report")}</button>
                        </div>
                      </div>

                      <div className="sidebar-card muted-card">
                        <p className="sidebar-title">{t("cloudFeedbackNote")}</p>
                        <p className="small-muted">{t("feedbackSidebarBlurb")}</p>
                      </div>
                    </aside>
                  </div>

                  <div className="feedback-section">
                    <div className="feedback-header">
                      <div>
                        <p className="eyebrow">{t("reputation")}</p>
                        <h4>{t("communityFeedback")}</h4>
                        <p className="small-muted">{t("cloudFeedbackNote")}</p>
                      </div>
                      <div className="feedback-summary">
                        <div className="score-circle">{feedbackStats.avg ?? "–"}</div>
                        <div>
                          <p className="summary-label">{feedbackStats.count || 0} {t("reviews")}</p>
                          <p className="small-muted">{t("averageRating")}</p>
                        </div>
                      </div>
                    </div>

                    <div className="feedback-grid">
                      <div className="feedback-form-card">
                        <div className="rating-input-row">
                          <label>{t("ratingLabel")}</label>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={feedbackDraft.rating}
                            onChange={(e) => setFeedbackDraft((d) => ({ ...d, rating: Number(e.target.value) }))}
                          />
                          <span className="rating-value">{feedbackDraft.rating}/5</span>
                        </div>
                        <textarea
                          className="feedback-textarea"
                          rows={3}
                          value={feedbackDraft.comment}
                          placeholder={t("commentPlaceholderDetailed")}
                          onChange={(e) => setFeedbackDraft((d) => ({ ...d, comment: e.target.value }))}
                        />
                        <div className="feedback-form-actions">
                          <button
                            className="btn"
                            onClick={() => handleFeedbackSubmit(selectedListing.id)}
                            disabled={feedbackSaving}
                          >
                            {feedbackSaving
                              ? `⏳ ${t("saving")}`
                              : `💾 ${t("saveFeedback")}`}
                          </button>
                          <span className="small-muted">{t("recentFeedback")}: {feedbackStats.count}</span>
                        </div>
                      </div>

                      <div className="feedback-list-card">
                        <div className="feedback-list-header">
                          <p className="sidebar-title">{t("recentFeedback")}</p>
                          <span className="pill pill-soft">⭐ {feedbackStats.avg ?? "–"} / 5</span>
                        </div>
                        <div className="feedback-scroll">
                          {feedbackStats.entries.length === 0 ? (
                            <p className="small-muted">{t("noFeedback")}</p>
                          ) : (
                            feedbackStats.entries.map((entry, idx) => (
                              <div className="feedback-item" key={idx}>
                                {entry.author && (
                                  <div className="feedback-author">{entry.author}</div>
                                )}
                                <div className="feedback-meta">
                                  <span className="pill pill-soft">{entry.rating}/5</span>
                                  <span className="small-muted">{typeof window !== 'undefined' ? new Date(entry.createdAt).toLocaleDateString() : '—'}</span>
                                </div>
                                {entry.comment && <p className="feedback-comment">{entry.comment}</p>}
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extend Listing Modal */}
        <AnimatePresence>
          {extendModalOpen && extendTarget && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExtendModalOpen(false)}
            >
              <motion.div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                style={{ maxWidth: '500px' }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">{t("extendListing") || "Extend Listing"}</h3>
                  <button className="icon-btn" onClick={() => setExtendModalOpen(false)}>✕</button>
                </div>
                <div className="modal-body" style={{ padding: '24px' }}>
                  <p style={{ marginBottom: 16 }}>
                    {t("extendDescription") || "Choose a plan to extend your listing duration."}
                  </p>
                  
                  <div className="plan-selection-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                    {PLANS.map(plan => (
                      <div 
                        key={plan.id}
                        className={`plan-option ${selectedExtendPlan === plan.id ? 'selected' : ''}`}
                        onClick={() => setSelectedExtendPlan(plan.id)}
                        style={{ 
                          border: selectedExtendPlan === plan.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                          padding: '12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          background: selectedExtendPlan === plan.id ? 'var(--bg-subtle)' : 'var(--bg-card)'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 'bold' }}>{t(`month${plan.id}`)}</span>
                          <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{plan.price}</span>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t(`days${plan.duration.split(' ')[0]}`)}</div>
                      </div>
                    ))}
                  </div>

                  <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={() => setExtendModalOpen(false)}>
                      {t("cancel")}
                    </button>
                    <button className="btn btn-accent" onClick={handleProceedExtend}>
                      {t("proceedToPayment") || "Proceed to Payment"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Report Listing Modal */}
        <AnimatePresence>
          {showReportModal && (
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportModal(false)}
            >
              <motion.div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                style={{ maxWidth: '500px' }}
              >
                <div className="modal-header">
                  <h3 className="modal-title">{t("reportListing")}</h3>
                  <button className="icon-btn" onClick={() => setShowReportModal(false)}>✕</button>
                </div>
                <div className="modal-body" style={{ padding: '20px' }}>
                  <div className="field-group">
                    <label className="field-label">{t("reportReason")}</label>
                    <select
                      className="select"
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                    >
                      <option value="spam">{t("spam")}</option>
                      <option value="inappropriate">{t("inappropriate")}</option>
                      <option value="other">{t("other")}</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">{t("description")}</label>
                    <textarea
                      className="input"
                      rows="4"
                      value={reportDescription}
                      onChange={(e) => setReportDescription(e.target.value)}
                      placeholder={t("reportReason")}
                    />
                  </div>
                  <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={() => setShowReportModal(false)}>
                      {t("cancel")}
                    </button>
                    <button className="btn" onClick={handleReportSubmit}>
                      {t("sendReport")}
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legal Modals */}
        {showTerms && <TermsModal onClose={() => setShowTerms(false)} t={t} />}
        {showPrivacy && <PrivacyModal onClose={() => setShowPrivacy(false)} t={t} />}
        
        {/* Cookie Consent */}
        <CookieConsent t={t} />

        {/* FOOTER */}
        <footer className="footer">
          <p>© 2025 {t("appName")} • {t("bizCall")}</p>
        </footer>
        <div id="recaptcha-signup" style={{ display: "none" }} />
        <div id="recaptcha-container" style={{ display: "none" }} />
      </div>
    </>
  );
}
           
