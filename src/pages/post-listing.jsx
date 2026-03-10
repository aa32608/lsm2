"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useApp } from "../context/AppContext";
import DualRangeSlider from "../components/DualRangeSlider";
import { ref as dbRef, set, remove, onValue } from "firebase/database";

const NorthMacedoniaMap = dynamic(() => import("../NorthMacedoniaMap"), {
  ssr: false,
  loading: () => <div className="loading-map">Loading map...</div>
});

const API_BASE =
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:5000"
    : "https://lsm-wozo.onrender.com");

export default function PostListingPage() {
  const router = useRouter();
  const appContext = useApp();
  const { user, userProfile, showMessage, t } = appContext || {};
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    description: "",
    contact: "",
    website: "",
    images: [],
    offerMin: "",
    offerMax: "",
    offerCurrency: "EUR",
    coordinates: null,
    mapPinText: "",
    status: "unpaid",
    createdAt: null,
    expiryDate: null,
    phoneVerified: false,
    emailVerified: false,
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
        setForm((prev) => ({
          ...prev,
          ...data,
          images: data.images || [],
        }));
      }
    });
    return () => unsub();
  }, [user]);

  // Save draft periodically
  useEffect(() => {
    if (!user?.uid) return;
    const timer = setTimeout(() => {
      const draftRef = dbRef(db, `drafts/${user.uid}`);
      set(draftRef, form);
    }, 2000);
    return () => clearTimeout(timer);
  }, [form, user]);

  if (!isClient) {
    return (
      <div className="post-listing-page">
        <div className="loading-map">Loading...</div>
      </div>
    );
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const currentImages = form.images || [];
    if (currentImages.length + files.length > 4) {
      showMessage(t("maxImagesError"), "error");
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
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
              height = (height * MAX_WIDTH) / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = (width * MAX_HEIGHT) / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          setForm((prev) => ({
            ...prev,
            images: [...(prev.images || []), dataUrl],
          }));
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accountPhone = userProfile?.phone;
    const phoneForListing = accountPhone || form.contact;
    const requiredOk = form.name && form.category && form.location && form.description && phoneForListing;
    if (!requiredOk) return showMessage(t("fillAllFields"), "error");

    if (!phoneForListing) {
      return showMessage(t("addPhoneInAccountSettings"), "error");
    }

    if (!validatePhone(phoneForListing)) return showMessage(t("enterValidPhone"), "error");

    const offerpriceStr = form.offerMin && form.offerMax ? `${form.offerMin}-${form.offerMax} ${form.offerCurrency}` : "";

    try {
      const res = await fetch(`${API_BASE}/api/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: form.name,
          category: form.category,
          location: form.location,
          description: form.description,
          contact: phoneForListing,
          website: form.website,
          images: form.images,
          offerprice: offerpriceStr,
          coordinates: form.coordinates,
          mapPinText: form.mapPinText,
          plan: "1",
          paymentMethod: "free_trial",
        }),
      });

      const data = await res.json();
      
      if (data.success && data.isFreeTrial) {
          showMessage(t("listingCreatedSuccessFreeTrial"), "success");
          // Clear draft
          if (user?.uid) {
            remove(dbRef(db, `drafts/${user.uid}`));
          }
          router.push("/mylistings");
          return;
      }

      if (data.checkoutUrl) {
          showMessage(t("redirectingToPayment") || "Redirecting to payment...", "info");
          window.location.href = data.checkoutUrl;
      } else {
          showMessage(t("error") + ": " + (data.error || "Unknown error"), "error");
      }
    } catch (err) {
      console.error(err);
      showMessage(t("error") + ": " + err.message, "error");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="post-listing-page">
      <div className="post-listing-header">
        <button className="back-button" onClick={handleBack}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          {t("back") || "Back"}
        </button>
        <h1 className="page-title">{t("submitListing")}</h1>
      </div>

      <form onSubmit={handleSubmit} className="post-listing-form">
        <div className="form-section">
          <h4 className="section-title">
            <span className="section-icon">📝</span>
            {t("basicInfo") || "Basic Information"}
          </h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">{t("name") || "Business/Service Name"}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t("enterBusinessName") || "Enter your business name"}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t("category") || "Category"}</label>
              <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
                <option value="">{t("selectCategory") || "Select category"}</option>
                <option value="Food & Drinks">{t("catGroupFood") || "Food & Drinks"}</option>
                <option value="Transport & Auto">{t("catGroupTransport") || "Transport & Auto"}</option>
                <option value="Home & Garden">{t("catGroupHome") || "Home & Garden"}</option>
                <option value="Health & Beauty">{t("catGroupHealth") || "Health & Beauty"}</option>
                <option value="Education">{t("catGroupEducation") || "Education"}</option>
                <option value="Professional Services">{t("catGroupProfessional") || "Professional Services"}</option>
                <option value="Tech & Electronics">{t("catGroupTech") || "Tech & Electronics"}</option>
                <option value="Events & Entertainment">{t("catGroupEvents") || "Events & Entertainment"}</option>
                <option value="Other">{t("catGroupOther") || "Other"}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title">
            <span className="section-icon">📍</span>
            {t("locationInfo") || "Location Information"}
          </h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">{t("city") || "City"}</label>
              <select className="form-select" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required>
                <option value="">{t("selectCity") || "Select city"}</option>
                <option value="Skopje">Skopje</option>
                <option value="Bitola">Bitola</option>
                <option value="Prilep">Prilep</option>
                <option value="Tetovo">Tetovo</option>
                <option value="Kumanovo">Kumanovo</option>
                <option value="Ohrid">Ohrid</option>
                <option value="Veles">Veles</option>
                <option value="Gostivar">Gostivar</option>
                <option value="Štip">Štip</option>
                <option value="Strumica">Strumica</option>
                <option value="Kavadarci">Kavadarci</option>
                <option value="Kočani">Kočani</option>
                <option value="Kičevo">Kičevo</option>
                <option value="Struga">Struga</option>
                <option value="Radoviš">Radoviš</option>
                <option value="Gevgelija">Gevgelija</option>
                <option value="Debar">Debar</option>
                <option value="Negotino">Negotino</option>
                <option value="Delčevo">Delčevo</option>
                <option value="Berovo">Berovo</option>
                <option value="Kratovo">Kratovo</option>
                <option value="Makedonska Kamenica">Makedonska Kamenica</option>
                <option value="Kriva Palanka">Kriva Palanka</option>
                <option value="Resen">Resen</option>
                <option value="Probištip">Probištip</option>
                <option value="Vinica">Vinica</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">{t("contact") || "Contact Phone"}</label>
              <input
                type="tel"
                className="form-input"
                placeholder={t("enterPhone") || "Enter phone number"}
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">{t("website") || "Website (Optional)"}</label>
            <input
              type="url"
              className="form-input"
              placeholder={t("enterWebsite") || "https://example.com"}
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title">
            <span className="section-icon">📖</span>
            {t("description") || "Description"}
          </h4>
          <div className="form-group">
            <textarea
              className="form-textarea"
              rows={6}
              placeholder={t("describeService") || "Describe your service in detail..."}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title">
            <span className="section-icon">💰</span>
            {t("pricing") || "Pricing (Optional)"}
          </h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">{t("minPrice") || "Minimum Price"}</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={form.offerMin}
                onChange={(e) => setForm({ ...form, offerMin: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t("maxPrice") || "Maximum Price"}</label>
              <input
                type="number"
                className="form-input"
                placeholder="0"
                value={form.offerMax}
                onChange={(e) => setForm({ ...form, offerMax: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="section-title">
            <span className="section-icon">🖼️</span>
            {t("images") || "Images"} ({t("max4") || "Max 4"})
          </h4>
          <div className="image-upload-area">
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="image-upload-input"
            />
            <label htmlFor="image-upload" className="image-upload-label">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21 15-4 4m0 0-4-4m4 4V9"/>
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
              </svg>
              {t("uploadImages") || "Upload Images"}
            </label>
            {form.images.length > 0 && (
              <div className="uploaded-images">
                {form.images.map((img, idx) => (
                  <div key={idx} className="uploaded-image">
                    <img src={img} alt={`Upload ${idx + 1}`} />
                    <button type="button" className="remove-image" onClick={() => removeImage(idx)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={handleBack}>
            {t("cancel") || "Cancel"}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("submitListing") || "Submit Listing"}
          </button>
        </div>
      </form>

      {showMapPicker && (
        <React.Suspense fallback={<div className="loading-map">{t("loading") || "Loading..."}</div>}>
          <NorthMacedoniaMap
            onClose={() => setShowMapPicker(false)}
            onSelect={(coords, pinText) => {
              setForm({ ...form, coordinates: coords, mapPinText: pinText });
              setShowMapPicker(false);
            }}
            initialPin={form.coordinates}
            initialPinText={form.mapPinText}
          />
        </React.Suspense>
      )}
    </div>
  );
}
