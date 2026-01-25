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

  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const t = useCallback(
    (k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.sq?.[k] ?? k,
    [lang]
  );

  useEffect(() => {
    localStorage.setItem("lang", lang);
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

  const [listings, setListings] = useState(initialListings);
  const [publicListings, setPublicListings] = useState(initialPublicListings);
  const [userListings, setUserListings] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Derived filtered listings
  const verifiedListings = useMemo(() => listings.filter(l => l.status === "verified"), [listings]);

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
  // We'll keep selectedTab for compatibility, but routing should handle page views.
  // However, sidebar uses it to highlight active item.
  const [selectedTab, setSelectedTabState] = useState("home"); 
  const [viewMode, setViewMode] = useState("list");
  const [showPostForm, setShowPostForm] = useState(false);

  const setSelectedTab = useCallback((tab) => {
    setSelectedTabState(tab);
    // In Next.js, we might want to navigate.
    // We'll expose a wrapper in the component layer to handle navigation.
  }, []);

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

  // Load User Logic (Effect)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = dbRef(db, `users/${currentUser.uid}`);
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserProfile(data);
            if (data.language) setLang(data.language);
          }
          setAuthLoading(false);
        });
        
        // Load Favorites
        const favRef = dbRef(db, `users/${currentUser.uid}/favorites`);
        onValue(favRef, (snapshot) => {
          const data = snapshot.val();
          setFavorites(data ? Object.keys(data) : []);
        });
      } else {
        setUserProfile(null);
        setFavorites([]);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Load Reviews Logic
  useEffect(() => {
    const reviewsRef = dbRef(db, "reviews");
    const unsub = onValue(reviewsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const avgs = {};
        Object.values(data).forEach((r) => {
          if (!r.listingId) return;
          if (!avgs[r.listingId]) avgs[r.listingId] = { sum: 0, count: 0, comments: [] };
          avgs[r.listingId].sum += Number(r.rating) || 0;
          avgs[r.listingId].count += 1;
          if (r.comment) avgs[r.listingId].comments.push(r);
        });
        Object.keys(avgs).forEach((id) => {
          avgs[id].avg = parseFloat((avgs[id].sum / avgs[id].count).toFixed(1));
        });
        setFeedbackAverages(avgs);
      } else {
        setFeedbackAverages({});
      }
    });
    return () => unsub();
  }, []);

  // Load Listings Logic (Effect)
  useEffect(() => {
    const listingsRef = dbRef(db, "listings");
    // We listen to all listings for now as per original App.jsx
    const unsub = onValue(listingsRef, (snapshot) => {
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
      } else {
        setListings([]);
        setPublicListings([]);
      }
    });
    return () => unsub();
  }, []);

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

  const getListingStats = (listing) => {
    if (!listing) return { views: 0, likes: 0 };
    return {
      views: listing.views || 0,
      likes: listing.likes || 0
    };
  };

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
      showMessage(t("paymentError") || "Payment initialization failed", "error");
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
    selectedListing, setSelectedListing,
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
    selectedTab, setSelectedTab,
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
    handleSelectListing,
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
