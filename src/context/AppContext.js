"use client";

import React, { createContext, useContext, useCallback, useEffect, useState, useMemo, useDeferredValue } from "react";
import { auth, db, createRecaptcha } from "../firebase";
import { ref as dbRef, update, onValue, get, query, orderByChild, equalTo, remove, set, push } from "firebase/database";
import {
  signInWithEmailAndPassword,
  signInWithEmailLink,
  isSignInWithEmailLink,
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
  deleteUser
} from "firebase/auth";
import { TRANSLATIONS } from "../translations";
import { MK_CITIES } from "../mkCities";

const API_BASE =
  (typeof window !== "undefined" && window.location.hostname === "localhost")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com";

const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

/* Helpers */
const stripDangerous = (v = "") => v.replace(/[<>]/g, "");

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

const buildLocationString = (city, extra) => {
  const c = (city || "").trim();
  const e = (extra || "").trim();
  if (!c && !e) return "";
  if (c && e) return `${c} - ${e}`;
  return c || e;
};

const countryCodes = [
  { name: "MK", code: "+389" },
  { name: "AL", code: "+355" },
  { name: "KS", code: "+383" },
  { name: "SR", code: "+381" },
  { name: "GR", code: "+30" },
  { name: "BG", code: "+359" },
  { name: "TR", code: "+90" },
  { name: "DE", code: "+49" },
  { name: "US", code: "+1" },
];

const categoryIcons = {
  food: "🍔",
  car: "🚗",
  electronics: "💡",
  homeRepair: "🧰",
  health: "💅",
  education: "🎓",
  clothing: "👕",
  pets: "🐾",
  services: "💼",
  tech: "💻",
  entertainment: "🎮",
  events: "🎟️",
  other: "✨",
};

const mkSpotlightCities = [
  "Skopje", "Tetovë", "Gostivar", "Ohër", "Kumanovë", "Manastir", "Prilep", "Kërçovë",
];

const validatePhone = (p) => {
  // Simple check
  return p && p.length > 6; 
};

export const AppProvider = ({ children, initialListings = [], initialPublicListings = [] }) => {
  /* i18n */
  const [lang, setLang] = useState("sq");
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lang");
      if (stored) setLang(stored);
    }
  }, []);

  // Initialize user from cache immediately (before Firebase loads)
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = localStorage.getItem('firebase_auth_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.user && parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          return parsed.user;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
    return null;
  });
  const [userProfile, setUserProfile] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const cached = localStorage.getItem('firebase_auth_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.profile && parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          return parsed.profile;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }
    return null;
  });
  // Initialize Firebase ready state immediately if auth is available
  const [firebaseReady, setFirebaseReady] = useState(() => {
    if (typeof window !== "undefined" && auth && auth.currentUser !== undefined) {
      // Auth state is already known (from cache or initial load)
      return true;
    }
    return false;
  });

  const t = useCallback(
    (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.sq?.[k] ?? k,
    [lang]
  );

  // CRITICAL: Preload Firebase immediately and synchronously
  useEffect(() => {
    if (typeof window === "undefined" || !auth || !db) {
      // If Firebase isn't ready, mark as ready anyway to prevent blocking
      setTimeout(() => setFirebaseReady(true), 100);
      return;
    }

    // IMMEDIATE synchronous check (Firebase v9+ LOCAL persistence)
    try {
      const immediateUser = auth.currentUser;
      if (immediateUser) {
        setUser(immediateUser);
        setFirebaseReady(true);
      } else {
        // Even without user, Firebase is ready
        setFirebaseReady(true);
      }
    } catch (e) {
      console.warn("Firebase immediate check failed:", e);
      setFirebaseReady(true); // Don't block UI
    }

    // Set up listener for auth state changes (async, but we already have initial state)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setFirebaseReady(true); // Always mark as ready
      if (user) {
        setUser(user);
        // Cache user immediately for next load
        try {
          localStorage.setItem('firebase_auth_cache', JSON.stringify({
            user: {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              phoneNumber: user.phoneNumber,
              emailVerified: user.emailVerified
            },
            timestamp: Date.now()
          }));
        } catch (e) {
          // Ignore cache errors
        }
      } else {
        setUser(null);
        localStorage.removeItem('firebase_auth_cache');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    if (user) {
      update(dbRef(db, `users/${user.uid}`), { language: lang }).catch(err => {
        console.warn("Failed to sync language to profile:", err);
      });
    }
  }, [lang, user]);

  /* Core state - Initialize with server-side data */
  const [form, setForm] = useState({
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
    plan: "1",
  });

  // Use server-side data immediately - no waiting for Firebase
  const [listings, setListings] = useState(initialListings);
  const [publicListings, setPublicListings] = useState(initialPublicListings);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
  // Mark as loaded immediately if we have server data
  const [listingsLoaded, setListingsLoaded] = useState(initialListings.length > 0 || initialPublicListings.length > 0);
  const [message, setMessage] = useState({ text: "", type: "info" });
  
  const showMessage = useCallback((text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "info" }), 5000);
  }, []);

  const [selectedListing, setSelectedListing] = useState(null);

  /* Filters / search */
  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);
  const [catFilter, setCatFilter] = useState("");
  const [locFilter, setLocFilter] = useState("");
  const [sortBy, setSortBy] = useState("topRated");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [feedbackAverages, setFeedbackAverages] = useState({});

  // Derived filtered listings - only verified, active, and not expired
  const verifiedListings = useMemo(() => {
    const now = Date.now();
    return listings.filter(l => 
      l.status === "verified" && 
      (!l.expiresAt || l.expiresAt > now)
    );
  }, [listings]);

  const filtered = useMemo(() => {
    let arr = [...verifiedListings];
    if (deferredQ.trim()) {
      const term = deferredQ.trim().toLowerCase();
      arr = arr.filter(
        (l) =>
          (l.name || "").toLowerCase().includes(term) ||
          (l.description || "").toLowerCase().includes(term)
      );
    }
    if (catFilter) {
      // Handle both raw category and translated category match
      arr = arr.filter((l) => (t(l.category) === catFilter || l.category === catFilter));
    }
    if (locFilter) arr = arr.filter((l) => l.locationCity === locFilter || l.location === locFilter);
    
    if (sortBy === "topRated") {
      arr.sort((a, b) => {
        const aStats = feedbackAverages[a.id] || {};
        const bStats = feedbackAverages[b.id] || {};
        const bAvg = bStats.avg ?? -1;
        const aAvg = aStats.avg ?? -1;
        if (bAvg !== aAvg) return bAvg - aAvg;
        const bCount = bStats.count || 0;
        const aCount = aStats.count || 0;
        if (bCount !== aCount) return bCount - aCount;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
    } else if (sortBy === "newest") {
      arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === "expiring") {
      arr.sort((a, b) => (a.expiresAt || 0) - (b.expiresAt || 0));
    } else if (sortBy === "az") {
      arr.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
    return arr;
  }, [verifiedListings, deferredQ, catFilter, locFilter, sortBy, feedbackAverages, t]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(filtered.length / pageSize)),
    [filtered.length, pageSize]
  );

  const pagedFiltered = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const allLocations = useMemo(() => {
    const locs = new Set();
    publicListings.forEach(l => {
      if (l.locationCity) locs.add(l.locationCity);
    });
    return Array.from(locs).sort();
  }, [publicListings]);
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("favorites") || "[]");
      } catch {
        return [];
      }
    }
    return [];
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFav = useCallback((id) =>
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])), []);

  // Derived counts
  const activeListingCount = publicListings.length;
  const verifiedListingCount = listings.filter(l => l.status === "verified").length;


  /* Dashboard/UI */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // Set view mode based on screen size - grid for mobile, list for desktop
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Check for user preference first
      const saved = localStorage.getItem("viewModePreference");
      if (saved) return saved;
      // Default to grid view on mobile, list view on desktop
      return window.innerWidth < 768 ? "grid" : "list";
    }
    return "list"; // Default for SSR
  });

  // Save view mode preference when user changes it
  useEffect(() => {
    if (typeof window !== "undefined" && viewMode) {
      localStorage.setItem("viewModePreference", viewMode);
    }
  }, [viewMode]);
  const [showPostForm, setShowPostForm] = useState(false);

  /* Editing */
  const [editingListing, setEditingListing] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [showEditMapPicker, setShowEditMapPicker] = useState(false);

  /* Edit Flow */
  const handleImageUpload = (e, isEditOverride = null) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Determine which state to update and current image count
    const isEdit = isEditOverride !== null ? isEditOverride : !!editingListing;
    const currentImages = isEdit ? (editForm?.images || []) : (form.images || []);
    
    // Check limit
    if (currentImages.length + files.length > 4) {
      showMessage(t("maxImagesError") || "Maximum 4 images allowed", "error");
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

  const saveEdit = async () => {
    if (!editingListing || !editForm) return;

    const normalizePhoneForStorage = (p) => p ? String(p).replace(/\s/g, "") : "";

    const finalLocation = buildLocationString(editForm.locationCity, editForm.locationExtra);
    const accountPhone = normalizePhoneForStorage(user?.phoneNumber || userProfile?.phone || "");
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
    
    try {
      await update(dbRef(db, `listings/${editingListing.id}`), updates);
      showMessage(t("saveSuccess"), "success");
      setEditingListing(null); 
      setEditForm(null);
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    }
  };

  const handleOpenEdit = useCallback((listing) => {
    setEditingListing(listing);
    setEditForm({ ...listing });
  }, []);

  /* Auth modal */
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+389");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: "",
  });

  const [authLoading, setAuthLoading] = useState(true);

  /* Static Pages Modals */
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  // Initialize Firebase Auth immediately - check cached state first
  useEffect(() => {
    if (typeof window === "undefined") {
      setFirebaseReady(true);
      setAuthLoading(false);
      return;
    }

    // Check for cached auth state immediately (before Firebase loads)
    try {
      const cachedAuth = localStorage.getItem('firebase_auth_cache');
      if (cachedAuth) {
        const parsed = JSON.parse(cachedAuth);
        if (parsed.user && parsed.timestamp && Date.now() - parsed.timestamp < 3600000) { // 1 hour cache
          // Set user immediately from cache
          setUser(parsed.user);
          setUserProfile(parsed.profile || null);
          setFavorites(parsed.favorites || []);
          if (parsed.profile?.language) setLang(parsed.profile.language);
          // Still mark as loading to verify with Firebase, but UI shows immediately
        }
      }
    } catch (e) {
      console.warn("Error reading cached auth:", e);
    }

    // CRITICAL: Check auth state immediately (Firebase v9+ LOCAL persistence)
    // This ensures we have user state before the async listener fires
    try {
      const immediateUser = auth.currentUser;
      if (immediateUser) {
        setUser(immediateUser);
        setFirebaseReady(true);
      } else {
        setFirebaseReady(true); // Firebase is ready even without user
      }
    } catch (e) {
      setFirebaseReady(true); // Don't block UI
    }

    // Use auth state persistence - Firebase will verify cached state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setFirebaseReady(true); // Always mark as ready
      setUser(currentUser);
      if (currentUser) {
        // Cache auth state for next load
        try {
          localStorage.setItem('firebase_auth_cache', JSON.stringify({
            user: currentUser,
            timestamp: Date.now()
          }));
        } catch (e) {
          console.warn("Error caching auth:", e);
        }

        const userRef = dbRef(db, `users/${currentUser.uid}`);
        const unsubUser = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserProfile(data);
            if (data.language) setLang(data.language);
            // Update cache with profile
            try {
              const cached = localStorage.getItem('firebase_auth_cache');
              if (cached) {
                const parsed = JSON.parse(cached);
                parsed.profile = data;
                localStorage.setItem('firebase_auth_cache', JSON.stringify(parsed));
              }
            } catch (e) {}
          }
          setAuthLoading(false);
          setFirebaseReady(true);
        }, (error) => {
          console.error("Error loading user profile:", error);
          setAuthLoading(false);
          setFirebaseReady(true);
        });
        
        // Load Favorites
        const favRef = dbRef(db, `users/${currentUser.uid}/favorites`);
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          const favs = data ? Object.keys(data) : [];
          setFavorites(favs);
          // Update cache with favorites
          try {
            const cached = localStorage.getItem('firebase_auth_cache');
            if (cached) {
              const parsed = JSON.parse(cached);
              parsed.favorites = favs;
              localStorage.setItem('firebase_auth_cache', JSON.stringify(parsed));
            }
          } catch (e) {}
        });
      } else {
        // Clear cache on logout
        try {
          localStorage.removeItem('firebase_auth_cache');
        } catch (e) {}
        setUserProfile(null);
        setFavorites([]);
        setAuthLoading(false);
        setFirebaseReady(true);
      }
    }, (error) => {
      console.error("Auth state error:", error);
      setAuthLoading(false);
      setFirebaseReady(true);
    });
    
    return () => unsubscribe();
  }, []);

  const [feedbackSaving, setFeedbackSaving] = useState(false);

  const submitFeedback = async (listingId, rating, comment) => {
    if (!user) {
      setAuthMode("login");
      setShowAuthModal(true);
      return;
    }
    if (!rating) return;
    
    try {
      setFeedbackSaving(true);
      const feedbackRef = dbRef(db, `feedback/${listingId}`);
      const newReviewRef = push(feedbackRef);
      await set(newReviewRef, {
        listingId,
        userId: user.uid,
        userName: userProfile?.name || user.displayName || "Anonymous",
        rating: Number(rating),
        comment: stripDangerous(comment),
        createdAt: Date.now()
      });
      
      // Also update the listing's feedback count/avg if possible, but cloud functions usually handle this.
      // We will trust the onValue listener to pick up the new feedback.
      
      showMessage(t("feedbackSaved") || "Review submitted", "success");
      return true;
    } catch (err) {
      console.error(err);
      showMessage(t("feedbackSaveError") || "Could not save review", "error");
      return false;
    } finally {
      setFeedbackSaving(false);
    }
  };

  // Load Reviews Logic - REMOVED (We load per listing now)
  /*
  useEffect(() => {
    const reviewsRef = dbRef(db, "reviews");
    // ...
  }, []);
  */

  // Session-based cache key for fresh data on each session
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionKey = `firebase_session_${Date.now()}`;
      const lastSession = sessionStorage.getItem("firebase_last_session");
      
      // If new session, clear cache and mark for refresh
      if (!lastSession || lastSession !== sessionKey) {
        sessionStorage.setItem("firebase_last_session", sessionKey);
        // Clear old cache to force fresh load
        localStorage.removeItem("cached_listings");
      }
    }
  }, []);

  // Load Listings Logic (Effect) - Use server data immediately, sync with Firebase in background
  useEffect(() => {
    // Server data is already set in state, mark as loaded immediately
    if ((initialListings.length > 0 || initialPublicListings.length > 0) && !listingsLoaded) {
      setListingsLoaded(true);
    }

    if (!db) return;

    // OPTIMIZATION: Use once() for initial load (faster than onValue for first fetch)
    // Then use onValue only for real-time updates
    const listingsRef = dbRef(db, "listings");
    
    // First, do a one-time fetch (faster than listener)
    get(listingsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.keys(data).map(key => ({ ...data[key], id: key }));
        // Sort by date desc
        arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        setListings(arr);
        
        // Public listings (verified and not expired)
        const now = Date.now();
        const pub = arr.filter(l => l.status === "verified" && (!l.expiresAt || l.expiresAt > now));
        setPublicListings(pub);
        setListingsLoaded(true);
      }
    }).catch((error) => {
      console.error("Listings fetch error:", error);
      // Fallback to server data if available
      if (initialListings.length > 0 || initialPublicListings.length > 0) {
        setListingsLoaded(true);
      }
    });

    // OPTIMIZATION: Use onValue only for incremental updates (not full re-fetch)
    // This reduces bandwidth - Firebase only sends changes, not full dataset
    const unsub = onValue(listingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const arr = Object.keys(data).map(key => ({ ...data[key], id: key }));
        arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        
        // OPTIMIZATION: Only update if arrays have different lengths or different IDs
        // This avoids expensive JSON.stringify on large datasets
        setListings(prev => {
          if (prev.length !== arr.length) return arr;
          const prevIds = new Set(prev.map(p => p.id));
          const newIds = new Set(arr.map(a => a.id));
          if (prevIds.size !== newIds.size) return arr;
          for (const id of prevIds) {
            if (!newIds.has(id)) return arr;
          }
          // If same IDs, check if any data changed (lightweight check)
          const changed = prev.some((p, i) => {
            const a = arr[i];
            return !a || p.id !== a.id || p.status !== a.status || p.expiresAt !== a.expiresAt;
          });
          return changed ? arr : prev;
        });
        
        const now = Date.now();
        const pub = arr.filter(l => l.status === "verified" && (!l.expiresAt || l.expiresAt > now));
        setPublicListings(prev => {
          if (prev.length !== pub.length) return pub;
          const prevIds = new Set(prev.map(p => p.id));
          const newIds = new Set(pub.map(p => p.id));
          if (prevIds.size !== newIds.size) return pub;
          for (const id of prevIds) {
            if (!newIds.has(id)) return pub;
          }
          return prev;
        });
        setListingsLoaded(true);
      }
    }, (error) => {
      console.error("Listings listener error:", error);
      if (initialListings.length === 0 && initialPublicListings.length === 0) {
        setListingsLoaded(false);
      }
    });
    
    return () => unsub();
  }, [initialListings.length, initialPublicListings.length, listingsLoaded, db]);

  // Load Feedback Averages (Effect) - OPTIMIZED: Lazy load only when needed
  useEffect(() => {
    if (!db) return;
    
    // OPTIMIZATION: Only load feedback after listings are loaded and user might view them
    // This prevents loading feedback data unnecessarily
    if (!listingsLoaded || publicListings.length === 0) {
      return;
    }

    // OPTIMIZATION: Use once() for initial fetch (faster)
    const feedbackRef = dbRef(db, "feedback");
    
    get(feedbackRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const averages = {};
        
        // OPTIMIZATION: Only process feedback for listings that exist in publicListings
        const publicListingIds = new Set(publicListings.map(l => l.id));
        
        Object.keys(data).forEach(listingId => {
          // Skip if listing is not in public listings (saves processing)
          if (!publicListingIds.has(listingId)) return;
          
          const feedbacks = data[listingId];
          if (feedbacks && typeof feedbacks === 'object') {
            const values = Object.values(feedbacks);
            const ratings = values.map(f => Number(f.rating) || 0).filter(r => r > 0);
            if (ratings.length > 0) {
              const sum = ratings.reduce((acc, r) => acc + r, 0);
              averages[listingId] = {
                avg: parseFloat((sum / ratings.length).toFixed(1)),
                count: ratings.length
              };
            } else {
              averages[listingId] = { avg: null, count: 0 };
            }
          }
        });
        
        setFeedbackAverages(averages);
      } else {
        setFeedbackAverages({});
      }
    }).catch((error) => {
      console.error("Feedback fetch error:", error);
    });

    // OPTIMIZATION: Use onValue only for incremental updates (new feedback)
    // This way we only get new feedback, not re-process everything
    const unsub = onValue(feedbackRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const averages = {};
        const publicListingIds = new Set(publicListings.map(l => l.id));
        
        Object.keys(data).forEach(listingId => {
          if (!publicListingIds.has(listingId)) return;
          
          const feedbacks = data[listingId];
          if (feedbacks && typeof feedbacks === 'object') {
            const values = Object.values(feedbacks);
            const ratings = values.map(f => Number(f.rating) || 0).filter(r => r > 0);
            if (ratings.length > 0) {
              const sum = ratings.reduce((acc, r) => acc + r, 0);
              averages[listingId] = {
                avg: parseFloat((sum / ratings.length).toFixed(1)),
                count: ratings.length
              };
            } else {
              averages[listingId] = { avg: null, count: 0 };
            }
          }
        });
        
        setFeedbackAverages(averages);
      }
    });
    
    return () => unsub();
  }, [db, listingsLoaded, publicListings]);

  // Payment Success Handler - Check URL params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");
    const listingId = params.get("listingId");
    const type = params.get("type"); // 'create' or 'extend'

    if (paymentStatus === "success" && listingId) {
      // Clear params from URL
      window.history.replaceState({}, "", window.location.pathname);
      
      // Show success notification
      if (type === 'extend') {
        showMessage(t("listingExtendedSuccess") || "Listing extended successfully!", "success");
      } else {
        showMessage(t("paymentSuccess") || "Payment successful! Your listing has been activated.", "success");
      }
    } else if (paymentStatus === "failed" || paymentStatus === "cancel") {
      // Show failure notification
      showMessage(t("paymentFailed") || "Payment was cancelled or failed. Your listing has been saved.", "error");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []); // Run once on mount

  // Filter user listings
  useEffect(() => {
    if (user && listings.length > 0) {
      setUserListings(listings.filter(l => l.userId === user.uid));
    } else {
      setUserListings([]);
    }
  }, [user, listings]);

  const getDaysUntilExpiry = (expiresAt) => {
    if (!expiresAt) return 0;
    const diff = expiresAt - Date.now();
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getListingStats = useCallback((listing) => {
    if (!listing) return { views: 0, likes: 0, avgRating: 0, feedbackCount: 0, engagement: 0 };
    const stats = feedbackAverages[listing.id] || {};
    const feedbackCount = listing.feedbackCount ?? stats.count ?? 0;
    const avgRating = listing.avgRating ?? stats.avg ?? 0;
    const engagement = feedbackCount + (favorites.includes(listing.id) ? 1 : 0);
    
    return {
      views: listing.views || 0,
      likes: listing.likes || 0,
      avgRating,
      feedbackCount,
      engagement
    };
  }, [feedbackAverages, favorites]);

  const getDescriptionPreview = (desc) => {
    if (!desc) return "";
    return desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
  };

  const handleShareListing = (listing) => {
    if (!listing) return;
    if (navigator.share) {
      navigator.share({
        title: listing.name,
        text: listing.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      showMessage(t("linkCopied"), "success");
    }
  };

  const confirmDelete = async (id) => {
    if (window.confirm(t("deleteConfirm"))) {
      await deleteListing(id);
    }
  };

  const deleteListing = async (id) => {
    try {
      setLoading(true);
      await remove(dbRef(db, `listings/${id}`));
      showMessage(t("listingDeleted"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("error"), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    // Navigate or open modal
  };

  // Memoize listings for performance
  const myListingsRaw = useMemo(() => userListings, [userListings]);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingListingId, setReportingListingId] = useState(null);

  // Extend Listing Flow
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null);
  const [selectedExtendPlan, setSelectedExtendPlan] = useState("1");

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
      
      // Pre-warm connection to payment API
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const res = await fetch(`${API_BASE}/api/create-payment`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
              listingId: listing.id,
              type: "extend",
              customerEmail: user?.email,
              customerName: userProfile?.name || user?.displayName,
              plan: planId
          }),
          signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        throw new Error(`Payment API error: ${res.status}`);
      }
      
      const data = await res.json();
      if (data.checkoutUrl) {
          // Show notification before redirecting
          showMessage(t("redirectingToPayment") || "Redirecting to payment...", "info");
          // Redirect immediately without delay
          setTimeout(() => {
            window.location.href = data.checkoutUrl;
          }, 100);
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        console.error("Payment request timeout:", err);
        showMessage(t("paymentTimeout") || "Payment request timed out. Please try again.", "error");
      } else {
        console.error(err);
        showMessage(t("paymentError") || "Payment initialization failed", "error");
      }
      setLoading(false);
    }
  };


  const onLogout = async () => {
    await signOut(auth);
    showMessage(t("signedOut"), "success");
    // Navigation should be handled by the component calling this or effect
  };

  const onLogin = () => {
    setShowAuthModal(true);
  };

  /* Context Value */
  const value = {
    lang, setLang,
    user, userProfile,
    t,
    form, setForm,
    listings, setListings,
    publicListings,
    userListings,
    loading, setLoading,
    message, showMessage,
    q, setQ,
    catFilter, setCatFilter,
    locFilter, setLocFilter,
    sortBy, setSortBy,
    page, setPage,
    totalPages,
    pageSize, setPageSize,
    pagedFiltered,
    filtersOpen, setFiltersOpen,
    allLocations,
    sidebarOpen, setSidebarOpen,
    viewMode, setViewMode,
    showPostForm, setShowPostForm,
    editingListing, setEditingListing,
    editForm, setEditForm,
    showEditMapPicker, setShowEditMapPicker,
    showAuthModal, setShowAuthModal,
    authMode, setAuthMode,
    showTerms, setShowTerms,
    showPrivacy, setShowPrivacy,
    showReportModal, setShowReportModal,
    reportingListingId, setReportingListingId,
    onLogout, onLogin,
    favorites,
    feedbackAverages,
    submitFeedback,
    feedbackSaving,
    // Auth State
    email, setEmail,
    password, setPassword,
    displayName, setDisplayName,
    phoneNumber, setPhoneNumber,
    countryCode, setCountryCode,
    verificationCode, setVerificationCode,
    confirmationResult, setConfirmationResult,
    phoneLoading, setPhoneLoading,
    agreedToTerms, setAgreedToTerms,
    passwordForm, setPasswordForm,
    authLoading,
    firebaseReady,
    listingsLoaded,
    // Constants
    categories: ["food", "car", "electronics", "homeRepair", "health", "education", "clothing", "pets", "services", "tech", "entertainment", "events", "other"],
    categoryIcons,
    mkSpotlightCities,
    countryCodes,
    MK_CITIES,
    // Helpers
    formatOfferPrice,
    stripDangerous,
    buildLocationString,
    getDaysUntilExpiry,
    getListingStats,
    getDescriptionPreview,
    handleShareListing,
    confirmDelete,
    deleteListing,
    handleStartExtendFlow,
    handleProceedExtend,
    handleOpenEdit,
    saveEdit,
    myListingsRaw,
    verifiedListings,
    allLocations,
    extendModalOpen, setExtendModalOpen,
    extendTarget, setExtendTarget,
    selectedExtendPlan, setSelectedExtendPlan,
    // Auth Actions (Expose auth for components to use directly if needed, or wrap them)
    auth,
    db
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
