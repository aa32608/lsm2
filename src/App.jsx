import React, { useState, useCallback, useEffect, useMemo } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ref as dbRef, set, update, remove } from "firebase/database";
import "leaflet/dist/leaflet.css";
import "./App.css";

// Components
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AuthModal from "./components/AuthModal";
import PostFormDrawer from "./components/PostFormDrawer";
import MapPickerModal from "./components/MapPickerModal";
import PaymentModal from "./components/PaymentModal";

// Pages
import HomePage from "./pages/HomePage";
import MyListingsPage from "./pages/MyListingsPage";
import AccountPage from "./pages/AccountPage";
import ExplorePage from "./pages/ExplorePage";

// Hooks
import { useAuth } from "./hooks/useAuth";
import { useListings } from "./hooks/useListings";
import { useFeedback } from "./hooks/useFeedback";

// Utils
import { TRANSLATIONS } from "./translations";
import { priceMap, categories } from "./utils/constants";
import { 
  normalizePhoneForStorage, 
  buildLocationString, 
  formatOfferPrice
} from "./utils/helpers";
import { validatePhone } from "./utils/validators";
import { db } from "./firebase";

const API_BASE = import.meta.env.VITE_API_BASE || 
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || "";

export default function App() {
  // Language & Translation
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "sq");
  const t = useCallback((k) => TRANSLATIONS[lang]?.[k] ?? TRANSLATIONS.sq?.[k] ?? k, [lang]);
  useEffect(() => localStorage.setItem("lang", lang), [lang]);

  // Auth & Data Hooks
  const { user, userProfile } = useAuth();
  const { listings, verifiedListings } = useListings();
  const { feedbackAverages } = useFeedback();

  // UI State
  const [selectedTab, setSelectedTabState] = useState("main");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "info" });
  const [showPostForm, setShowPostForm] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  // Payment State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [extendTarget, setExtendTarget] = useState(null);
  const [extendPlan, setExtendPlan] = useState("1");

  // Edit Listing State
  // eslint-disable-next-line no-unused-vars
  const [editingListing, setEditingListing] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [editForm, setEditForm] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showEditMapPicker, setShowEditMapPicker] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editLocationPreview, setEditLocationPreview] = useState(null);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "[]");
    } catch {
      return [];
    }
  });
  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorites)), [favorites]);

  // Scroll to top when tab changes
  const setSelectedTab = useCallback((tab) => {
    setSelectedTabState(tab);
    const url = new URL(window.location.href);
    url.searchParams.set("tab", tab);
    window.history.replaceState({}, "", url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Helper: Show message
  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "info" }), 5000);
  };

  // Account phone
  const accountPhone = useMemo(
    () => normalizePhoneForStorage(user?.phoneNumber || userProfile?.phone || "", []),
    [user?.phoneNumber, userProfile]
  );

  // Primary Navigation
  const primaryNav = useMemo(() => {
    const myListingsCount = listings.filter(l => l.userId === user?.uid).length;
    return [
      { id: "main", label: t("homepage") || "Home", icon: "🏠" },
      { id: "allListings", label: t("explore") || "Explore", icon: "🧭", badge: listings.length },
      ...(user ? [
        { id: "myListings", label: t("myListings") || "My listings", icon: "📂", badge: myListingsCount },
        { id: "account", label: t("account") || "Account", icon: "👤" },
      ] : []),
    ];
  }, [t, listings, user]);

  // Create Listing Helper
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

  // Handle Post Form Submit
  const handlePostFormSubmit = async ({ form, plan }) => {
    if (!user) {
      setShowAuthModal(true);
      showMessage(t("loginRequired"), "error");
      return;
    }
    if (!user.emailVerified) {
      showMessage(t("verifyEmailFirst"), "error");
      return;
    }

    const finalLocation = buildLocationString(form.locationCity, form.locationExtra);
    const phoneForListing = accountPhone || form.contact;
    const requiredOk = form.name && form.category && finalLocation && form.description && phoneForListing;
    
    if (!requiredOk) return showMessage(t("fillAllFields"), "error");

    const normalizedContact = normalizePhoneForStorage(phoneForListing, []);
    if (!validatePhone(normalizedContact)) return showMessage(t("enterValidPhone"), "error");

    const offerpriceStr = formatOfferPrice(form.offerMin, form.offerMax, form.offerCurrency);
    setLoading(true);
    setMessage({ text: "", type: "info" });
    const listingId = "lst_" + Date.now();

    try {
      await createListingInFirebase({
        ...form,
        id: listingId,
        category: categories.find(c => t(c) === form.category) ? categories.find(c => t(c) === form.category) : form.category,
        contact: normalizedContact,
        location: finalLocation,
        locationCity: form.locationCity,
        locationExtra: form.locationExtra,
        plan,
        offerprice: offerpriceStr || "",
        status: "pending_payment",
        pricePaid: 0,
        price: priceMap[plan],
      });

      const createRes = await fetch(`${API_BASE}/api/paypal/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listingId, amount: priceMap[plan], action: "create_listing" }),
      });
      const createData = await createRes.json();
      if (!createData.orderID) throw new Error("Failed to create PayPal order");

      setPendingOrder({ listingId, orderID: createData.orderID });
      setPaymentIntent({ type: "create", orderID: createData.orderID, amount: priceMap[plan], listingId });
      setPaymentModalOpen(true);
      setShowPostForm(false);
      showMessage(t("orderCreated"), "success");
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
      await remove(dbRef(db, `listings/${listingId}`));
    } finally {
      setLoading(false);
    }
  };

  // Handle Payment Approval
  const handlePaymentApprove = async (data) => {
    const orderId = data.orderID;
    try {
      if (paymentIntent.type === "extend") {
        const resp = await fetch(`${API_BASE}/api/paypal/capture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: orderId, listingId: paymentIntent.listingId, action: "extend" }),
        });
        const json = await resp.json();

        if (json.ok) {
          const currentExpiry = extendTarget?.expiresAt || Date.now();
          const planMonths = parseInt(extendPlan, 10) || 1;
          const base = Math.max(Date.now(), currentExpiry);
          const newExpiry = base + planMonths * 30 * 24 * 60 * 60 * 1000;

          await update(dbRef(db, `listings/${paymentIntent.listingId}`), {
            expiresAt: newExpiry,
            lastExtendPlan: extendPlan,
          });

          showMessage(t("extendSuccess") || "Listing extended successfully ✅", "success");
          setExtendTarget(null);
          setPaymentModalOpen(false);
          setPaymentIntent(null);
        } else {
          showMessage(t("extendFailed") || "Extend payment failed", "error");
        }
      } else {
        // Create listing payment
        const resp = await fetch(`${API_BASE}/api/paypal/capture`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: orderId, listingId: pendingOrder.listingId, action: "create_listing" }),
        });
        const json = await resp.json();
        
        if (json.ok) {
          showMessage(t("paymentComplete"), "success");
          setPendingOrder(null);
          setPaymentModalOpen(false);
          setPaymentIntent(null);
        } else {
          showMessage(t("paymentFailed"), "error");
        }
      }
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    }
  };

  // Edit Listing Functions
  const startEdit = (listing) => {
    setEditingListing(listing);
    setEditForm({
      title: listing.title || "",
      description: listing.description || "",
      price: listing.price || "",
      category: listing.category || "",
      location: listing.location || "",
      images: listing.images || [],
      phoneNumber: listing.phoneNumber || "",
      email: listing.email || "",
      website: listing.website || "",
      workingHours: listing.workingHours || "",
      amenities: listing.amenities || [],
      id: listing.id
    });
    setEditLocationPreview(listing.location ? { address: listing.location } : null);
  };

  const confirmDelete = async (listingId) => {
    if (!window.confirm(t("confirmDelete") || "Are you sure you want to delete this listing?")) {
      return;
    }
    
    try {
      await remove(dbRef(db, `listings/${listingId}`));
      showMessage(t("listingDeleted") || "Listing deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    }
  };

  const setSelectedListing = (listing) => {
    // This function is used to set the currently selected listing
    // It can be used for various purposes like showing details, editing, etc.
    setEditingListing(listing);
  };

  // Close modals with ESC
  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        setShowAuthModal(false);
        setPaymentModalOpen(false);
        setShowMapPicker(false);
        setShowPostForm(false);
      }
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  // Lock body scroll when modals open
  useEffect(() => {
    const hasOpenModal = showAuthModal || showPostForm || paymentModalOpen || showMapPicker || sidebarOpen;
    if (hasOpenModal) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showAuthModal, showPostForm, paymentModalOpen, showMapPicker, sidebarOpen]);

  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "EUR", locale: "en_MK" }}>
      {message.text && <div className={`notification ${message.type}`}>{message.text}</div>}

      <div className="app">
        <Header
          t={t}
          lang={lang}
          setLang={setLang}
          user={user}
          setShowAuthModal={setShowAuthModal}
          setSidebarOpen={setSidebarOpen}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
          primaryNav={primaryNav}
          showMessage={showMessage}
        />

        <div className="container">
          {selectedTab === "main" && (
            <HomePage
              t={t}
              setSelectedTab={setSelectedTab}
              setShowPostForm={setShowPostForm}
              listings={listings}
              user={user}
            />
          )}

          {selectedTab === "myListings" && (
            <MyListingsPage
              t={t}
              user={user}
              listings={listings}
              feedbackAverages={feedbackAverages}
              favorites={favorites}
              showMessage={showMessage}
              onEdit={startEdit}
              onDelete={confirmDelete}
              onExtend={setExtendTarget}
              onView={setSelectedListing}
              setSelectedTab={setSelectedTab}
            />
          )}

          {selectedTab === "account" && (
            <AccountPage
              t={t}
              user={user}
              userProfile={userProfile}
              accountPhone={accountPhone}
              listings={listings}
              favorites={favorites}
              setSelectedTab={setSelectedTab}
              setShowPostForm={setShowPostForm}
              showMessage={showMessage}
            />
          )}

          {selectedTab === "allListings" && (
            <ExplorePage
              t={t}
              listings={verifiedListings}
              feedbackAverages={feedbackAverages}
              favorites={favorites}
              setFavorites={setFavorites}
              showMessage={showMessage}
              onSelectListing={setSelectedListing}
            />
          )}
        </div>

        {/* Modals */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <Motion.div
                className="sidebar-overlay"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <Motion.aside
                className="sidebar mobile-drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.3 }}
              >
                <Sidebar
                  t={t}
                  selected={selectedTab}
                  onSelect={(tab) => {
                    setSelectedTab(tab);
                    setSidebarOpen(false);
                  }}
                  onClose={() => setSidebarOpen(false)}
                  user={user}
                />
              </Motion.aside>
            </>
          )}

          {showAuthModal && (
            <AuthModal
              showAuthModal={showAuthModal}
              setShowAuthModal={setShowAuthModal}
              authMode={authMode}
              setAuthMode={setAuthMode}
              t={t}
              showMessage={showMessage}
            />
          )}

          {showPostForm && (
            <PostFormDrawer
              show={showPostForm}
              onClose={() => setShowPostForm(false)}
              user={user}
              accountPhone={accountPhone}
              onSubmit={handlePostFormSubmit}
              loading={loading}
              t={t}
              showMessage={showMessage}
              setShowMapPicker={setShowMapPicker}
            />
          )}

          {showMapPicker && (
            <MapPickerModal
              show={showMapPicker}
              onClose={() => setShowMapPicker(false)}
              selectedCity=""
              onSelectCity={() => {}}
              t={t}
              showMessage={showMessage}
            />
          )}

          {paymentModalOpen && (
            <PaymentModal
              show={paymentModalOpen}
              onClose={() => {
                setPaymentModalOpen(false);
                setPaymentIntent(null);
              }}
              paymentIntent={paymentIntent}
              extendPlan={extendPlan}
              setExtendPlan={setExtendPlan}
              extendTarget={extendTarget}
              onApprove={handlePaymentApprove}
              t={t}
              showMessage={showMessage}
            />
          )}
        </AnimatePresence>

        <footer className="footer">
          <p>© 2024 {t("appName")} • {t("bizCall")}</p>
        </footer>
      </div>
    </PayPalScriptProvider>
  );
}