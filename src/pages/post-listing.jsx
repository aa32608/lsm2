"use client";
import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import DualRangeSlider from "../components/DualRangeSlider";
import { ref as dbRef, set, remove, onValue } from "firebase/database";
import { db } from "../firebase";
import { safeT } from "../utils/translationHelper";
import { PLANS, categoryGroups, categoryIcons, currencyOptions } from "../constants";
import { MK_CITIES } from "../mkCities";

const NorthMacedoniaMap = dynamic(() => import("../NorthMacedoniaMap"), {
  ssr: false,
  loading: () => <div className="loading-map">Loading map...</div>
});

// Dynamically import Link to avoid SSR issues
const Link = dynamic(() => import('next/link').then(mod => mod.default), {
  ssr: false,
  loading: () => null
});

const API_BASE =
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

export default function PostListingPage() {
  const router = useRouter();
  const appContext = useApp();
  const { 
    user, 
    userProfile, 
    showMessage, 
    setLoading, 
    loading,
    stripDangerous,
    formatOfferPrice,
    buildLocationString 
  } = appContext || {};
  
  // Safe translation fallback
  const t = appContext?.t || safeT;
  
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [step, setStep] = useState(1);
  
  const [form, setForm] = useState({
    name: "",
    category: "",
    locationCity: "",
    locationExtra: "",
    description: "",
    contact: "",
    website: "",
    images: [],
    offerMin: "",
    offerMax: "",
    offerCurrency: "EUR",
    offerprice: "",
    coordinates: null,
    mapPinText: "",
    plan: "1",
    tags: "",
    socialLink: "",
    imagePreview: null
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load user's saved draft (if any)
  useEffect(() => {
    if (!user?.uid) return;
    const draftRef = dbRef(db, `drafts/${user.uid}`);
    const unsub = onValue(draftRef, (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        // Only load draft if form is currently empty
        setForm((prev) => {
          if (prev.name) return prev; 
          return {
            ...prev,
            ...data,
            images: data.images || [],
          };
        });
      }
    });
    return () => unsub();
  }, [user]);

  // Save draft periodically
  useEffect(() => {
    if (!user?.uid) return;
    const timer = setTimeout(() => {
      const draftRef = dbRef(db, `drafts/${user.uid}`);
      set(draftRef, { ...form, step });
    }, 2000);
    return () => clearTimeout(timer);
  }, [form, user, step]);

  if (!isClient) {
    return (
      <div className="post-listing-page">
        <div className="loading-map">Loading...</div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentImages = form.images || [];
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
          
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          
          setForm(prev => {
            const newImages = [...(prev.images || []), dataUrl];
            return { 
              ...prev, 
              images: newImages,
              imagePreview: newImages[0] 
            };
          });
        };
        img.src = ev.target?.result;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const handleRemoveImage = (index) => {
    setForm(prev => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return {
        ...prev,
        images: newImages,
        imagePreview: newImages.length > 0 ? newImages[0] : null
      };
    });
  };

  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalLocation = buildLocationString(form.locationCity, form.locationExtra);
    const phoneForListing = userProfile?.phone || form.contact;
    
    setLoading(true);
    
    try {
      const planId = form.plan || "1";
      const selectedPlan = PLANS.find(p => p.id === planId) || PLANS[0];
      
      const listingId = "lst_" + Date.now();
      const listingData = {
        ...form,
        id: listingId,
        userId: user?.uid || null,
        userEmail: user?.email || null,
        category: form.category,
        contact: phoneForListing,
        location: finalLocation,
        locationCity: form.locationCity,
        locationExtra: form.locationExtra,
        plan: planId,
        offerprice: form.offerprice || "", 
        status: "unpaid",
        pricePaid: 0,
        price: selectedPlan.priceVal,
        createdAt: Date.now(),
        expiresAt: Date.now() + parseInt(planId) * 30 * 24 * 60 * 60 * 1000,
        views: 0,
        contacts: 0,
      };

      await set(dbRef(db, `listings/${listingId}`), listingData);

      // Initiate Payment
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
          }),
      });
      
      const data = await res.json();
      
      if (data.success && data.isFreeTrial) {
          showMessage(t("listingCreatedSuccessFreeTrial"), "success");
          if (user?.uid) remove(dbRef(db, `drafts/${user.uid}`));
          router.push("/mylistings");
          return;
      }

      if (data.checkoutUrl) {
          showMessage(t("redirectingToPayment"), "info");
          window.location.href = data.checkoutUrl;
      } else {
          showMessage(t("error") + ": " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      console.error(err);
      showMessage(t("error") + ": " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const previewLocation = buildLocationString(form.locationCity, form.locationExtra);

  return (
    <div className="post-listing-page-enhanced">
      <div className="post-listing-container">
        <header className="post-listing-header-modern">
          <button className="back-btn-modern" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="header-content-modern">
            <h1 className="header-title-modern">{t("submitListing")}</h1>
            <p className="header-subtitle-modern">{t("submitListingDesc")}</p>
          </div>
          <Link href="/" className="close-btn-modern">
            ✕
          </Link>
        </header>

        <div className="step-progress-bar">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`step-dot ${step >= s ? "active" : ""} ${step === s ? "current" : ""}`}>
              <span className="dot-number">{s}</span>
              <span className="dot-label">
                {s === 1 ? t("stepBasic") : s === 2 ? t("stepDetails") : t("stepPlanPreview")}
              </span>
            </div>
          ))}
        </div>

        <main className="post-listing-content-modern">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="form-step-container"
              >
                <div className="card-modern">
                  <div className="field-group-modern">
                    <label className="label-modern">{t("name")}</label>
                    <input
                      className="input-modern"
                      placeholder={t("namePlaceholder")}
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: stripDangerous(e.target.value).slice(0, 100) })}
                      required
                    />
                  </div>

                  <div className="field-group-modern">
                    <label className="label-modern">{t("category")}</label>
                    <select
                      className="select-modern"
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      required
                    >
                      <option value="">{t("selectCategory")}</option>
                      {categoryGroups.map((group) => (
                        <optgroup key={group.id} label={t(group.labelKey)}>
                          {group.categories.map((cat) => (
                            <option key={cat} value={cat}>{t(cat) || cat}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="field-group-modern">
                    <label className="label-modern">{t("location")}</label>
                    <select
                      className="select-modern"
                      value={form.locationCity}
                      onChange={(e) => setForm({ ...form, locationCity: e.target.value })}
                      required
                    >
                      <option value="">{t("selectCity")}</option>
                      {MK_CITIES.map((city) => (
                        <option key={city} value={city}>{t(city) || city}</option>
                      ))}
                    </select>
                    <input
                      className="input-modern mt-sm"
                      placeholder={t("locationExtra")}
                      value={form.locationExtra}
                      onChange={(e) => setForm({ ...form, locationExtra: stripDangerous(e.target.value).slice(0, 100) })}
                    />
                    <button type="button" className="btn-map-modern" onClick={() => setShowMapPicker(true)}>
                      <span className="icon">📍</span> {t("chooseOnMap")}
                    </button>
                  </div>

                  <div className="actions-modern">
                    <button 
                      className="btn-primary-modern" 
                      onClick={() => {
                        if (form.name && form.category && form.locationCity) setStep(2);
                        else showMessage(t("fillAllFields"), "error");
                      }}
                    >
                      {t("continue")} →
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="form-step-container"
              >
                <div className="card-modern">
                  <div className="field-group-modern">
                    <label className="label-modern">{t("description")}</label>
                    <textarea
                      className="textarea-modern"
                      rows={5}
                      placeholder={t("descriptionPlaceholder")}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: stripDangerous(e.target.value).slice(0, 1000) })}
                      required
                    />
                  </div>

                  <div className="field-group-modern">
                    <label className="label-modern">{t("contact")}</label>
                    <input
                      className="input-modern"
                      type="tel"
                      placeholder={t("enterPhone")}
                      value={form.contact || userProfile?.phone || ""}
                      onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    />
                  </div>

                  <div className="field-group-modern">
                    <label className="label-modern">{t("priceRange")}</label>
                    <div className="price-modern-row">
                      <select 
                        className="select-modern currency-select" 
                        value={form.offerCurrency}
                        onChange={(e) => setForm({ ...form, offerCurrency: e.target.value })}
                      >
                        {currencyOptions.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <div className="slider-container-modern">
                        <DualRangeSlider
                          min={0}
                          max={10000}
                          value={{ min: Number(form.offerMin) || 0, max: Number(form.offerMax) || 0 }}
                          onChange={({ min, max }) => {
                            const updated = { ...form, offerMin: min, offerMax: max };
                            updated.offerprice = formatOfferPrice(min, max, updated.offerCurrency);
                            setForm(updated);
                          }}
                          currency={form.offerCurrency}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="field-group-modern">
                    <label className="label-modern">{t("images")}</label>
                    <div className="upload-grid-modern">
                      <label className="upload-box-modern">
                        <input type="file" multiple accept="image/*" onChange={handleImageUpload} hidden />
                        <span className="icon">📷</span>
                        <span className="text">{t("clickToUpload")}</span>
                      </label>
                      {form.images.map((img, idx) => (
                        <div key={idx} className="preview-box-modern">
                          <img src={img} alt="preview" />
                          <button className="remove-btn-modern" onClick={() => handleRemoveImage(idx)}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="actions-modern">
                    <button className="btn-ghost-modern" onClick={() => setStep(1)}>← {t("back")}</button>
                    <button 
                      className="btn-primary-modern" 
                      onClick={() => {
                        const phone = form.contact || userProfile?.phone;
                        if (form.description && phone && validatePhone(phone)) setStep(3);
                        else showMessage(t("fillAllFields"), "error");
                      }}
                    >
                      {t("continue")} →
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="form-step-container"
              >
                <div className="preview-section-modern">
                  <h3 className="section-title-modern">{t("preview")}</h3>
                  <div className="preview-card-modern">
                    <div className="preview-header">
                      <h4 className="preview-title">{form.name || "Business Name"}</h4>
                      <span className="preview-badge">✓ {t("verified")}</span>
                    </div>
                    <p className="preview-meta">{t(form.category)} • {previewLocation}</p>
                    {form.imagePreview && <img src={form.imagePreview} className="preview-img-main" />}
                    <p className="preview-desc">{form.description}</p>
                    <div className="preview-footer">
                      {form.offerprice && <span className="preview-price">💶 {form.offerprice}</span>}
                    </div>
                  </div>
                </div>

                <div className="plan-section-modern">
                  <h3 className="section-title-modern">{t("choosePlan")}</h3>
                  <div className="plans-grid-modern">
                    {PLANS.map(plan => (
                      <div 
                        key={plan.id} 
                        className={`plan-card-modern ${form.plan === plan.id ? "selected" : ""}`}
                        onClick={() => setForm({ ...form, plan: plan.id })}
                      >
                        <div className="plan-info">
                          <span className="plan-name">{t(`month${plan.id}`)}</span>
                          <span className="plan-dur">{t(`days${plan.duration.split(' ')[0]}`)}</span>
                        </div>
                        <span className="plan-price">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="actions-modern">
                  <button className="btn-ghost-modern" onClick={() => setStep(2)}>← {t("back")}</button>
                  <button className="btn-submit-modern" onClick={handleSubmit} disabled={loading}>
                    {loading ? t("loading") : t("createListing")}
                  </button>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>

        <section className="trust-footer-modern">
          <h4 className="trust-title">{t("whyTrustUs")}</h4>
          <div className="trust-grid">
            <div className="trust-item">✅ {t("trustPoint1")}</div>
            <div className="trust-item">✅ {t("trustPoint2")}</div>
            <div className="trust-item">✅ {t("trustPoint3")}</div>
            <div className="trust-item">✅ {t("trustPoint4")}</div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showMapPicker && (
          <motion.div className="map-overlay-modern" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="map-modal-modern" initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }}>
              <div className="map-header-modern">
                <h3>{t("chooseOnMap")}</h3>
                <button onClick={() => setShowMapPicker(false)}>✕</button>
              </div>
              <div className="map-body-modern">
                <Suspense fallback={<div>Loading...</div>}>
                  <NorthMacedoniaMap
                    onSelectCity={(city) => {
                      setForm({ ...form, locationCity: city });
                      setShowMapPicker(false);
                    }}
                  />
                </Suspense>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

