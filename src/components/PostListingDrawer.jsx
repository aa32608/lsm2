"use client";
import React, { useState, useCallback, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { PLANS, categories, categoryIcons, currencyOptions } from "../constants";
import DualRangeSlider from "./DualRangeSlider";
import { ref as dbRef, set, remove, onValue } from "firebase/database";

const NorthMacedoniaMap = lazy(() => import("../NorthMacedoniaMap"));

const API_BASE =
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

const PostListingDrawer = () => {
  const {
    t,
    user,
    userProfile,
    showPostForm,
    setShowPostForm,
    form,
    setForm,
    showMessage,
    auth,
    db,
    stripDangerous,
    formatOfferPrice,
    buildLocationString,
    MK_CITIES,
    setLoading,
    setSelectedTab,
    loading
  } = useApp();

  const [showMapPicker, setShowMapPicker] = useState(false);
  const accountPhone = userProfile?.phone || "";

  // Helpers
  const validatePhone = (s) => !!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;

  const normalizePhoneForStorage = (raw) => {
      if (!raw) return raw;
      const trimmed = raw.trim();
      if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
      return trimmed.replace(/\s+/g, "");
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentImages = form.images || [];
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalLocation = buildLocationString(form.locationCity, form.locationExtra);

    const phoneForListing = accountPhone || form.contact;
    const requiredOk = form.name && form.category && finalLocation && form.description && phoneForListing;
    if (!requiredOk) return showMessage(t("fillAllFields"), "error");

    if (!phoneForListing) {
      return showMessage(t("addPhoneInAccountSettings"), "error");
    }

    if (!validatePhone(phoneForListing)) return showMessage(t("enterValidPhone"), "error");

    const offerpriceStr = formatOfferPrice(form.offerMin, form.offerMax, form.offerCurrency);

    setLoading(true);
    
    try {
      const planId = form.plan || "1";
      const selectedPlan = PLANS.find(p => p.id === planId) || PLANS[0];
      const listingId = await createListingInFirebase({
        ...form,
        category: form.category, // Assuming stored as key
        contact: phoneForListing,
        location: finalLocation,
        locationCity: form.locationCity,
        locationExtra: form.locationExtra,
        plan: planId,
        offerprice: offerpriceStr || "", 
        status: "unpaid",
        pricePaid: 0,
        price: selectedPlan.priceVal,
      });

      // Initiate Payment
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
            setShowPostForm(false);
            window.location.reload(); 
            return;
        }

        if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
            return; 
        } else {
            throw new Error("Payment initialization failed");
        }
      } catch (paymentErr) {
          console.error("Payment error:", paymentErr);
          showMessage("Listing saved but payment failed. Please try again from My Listings.", "error");
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
        plan: "1"
      });
      
    } catch (err) {
      console.error(err);
      showMessage(t("error") + " " + err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const previewLocation = buildLocationString(form.locationCity, form.locationExtra);

  return (
    <>
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

              <div className="modal-body">
                <section className="form-section">
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
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                {t(cat)}
                                </option>
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
                                {city}
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
                                    setShowPostForm(false);
                                    router.push("/account");
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
                            max={5000}
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
                
                    <section className="card trust-section" style={{ marginTop: "5%", height: "fit-content" }}>
                      <h2 className="section-title">
                        {t("whyTrustUs")}
                      </h2>
                      <ul className="trust-list">
                        <li>✅ {t("trustPoint1")}</li>
                        <li>✅ {t("trustPoint2")}</li>
                        <li>✅ {t("trustPoint3")}</li>
                        <li>✅ {t("trustPoint4")}</li>
                      </ul>
                    </section>
                </section>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

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
    </>
  );
};

export default PostListingDrawer;
