"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import DualRangeSlider from "./DualRangeSlider";

const EditListingModal = () => {
  const {
    t,
    editingListing,
    setEditingListing,
    editForm,
    setEditForm,
    saveEdit,
    categories,
    MK_CITIES,
    stripDangerous,
    editLocationPreview,
    setShowEditMapPicker,
    handleImageUpload,
    handleRemoveImage,
    formatOfferPrice,
    currencyOptions,
  } = useApp();

  return (
    <AnimatePresence>
      {editingListing && editForm && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setEditingListing(null);
            setEditForm(null);
            setShowEditMapPicker(false);
          }}
        >
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="modal-header">
              <h3 className="modal-title">{t("edit")}</h3>
              <button
                className="icon-btn"
                onClick={() => {
                  setEditingListing(null);
                  setEditForm(null);
                  setShowEditMapPicker(false);
                }}
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="card mb-md">
                <div>
                  <p className="text-sm text-muted mb-xs uppercase">{t("preview")}</p>
                  <h4 className="text-h3 mb-xs">{editForm.name || t("name")}</h4>
                  <p className="text-body mb-sm">
                    {t(editForm.category) || editForm.category || t("category")} • {editLocationPreview || t("location")}
                  </p>
                </div>
                <div className="flex gap-sm">
                  <span className="pill pill-soft">⏱️ {editForm.plan || "1"} {t("months")}</span>
                  {editForm.offerprice && <span className="pill pill-price">{editForm.offerprice}</span>}
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">{t("name")}</label>
                <input
                  className="input"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      name: stripDangerous(e.target.value).slice(0, 100),
                    })
                  }
                />
              </div>

              <div className="field-group">
                <label className="field-label">{t("category")}</label>
                <select
                  className="select"
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {t(cat)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid-cols-2 gap-4" style={{ display: 'grid' }}>
                <div className="field-group">
                  <label className="field-label">{t("location")}</label>
                  <select
                    className="select"
                    value={editForm.locationCity}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        locationCity: e.target.value,
                      })
                    }
                  >
                    <option value="">{t("selectCity")}</option>
                    {MK_CITIES.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>

                  <input
                    className="input mt-sm"
                    placeholder={t("locationExtra")}
                    value={editForm.locationExtra || ""}
                    onChange={(e) => {
                      const extra = stripDangerous(e.target.value).slice(0, 100);
                      setEditForm({
                        ...editForm,
                        locationExtra: extra,
                      });
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-ghost small mt-sm full-width"
                    onClick={() => setShowEditMapPicker(true)}
                  >
                    {t("chooseOnMap")}
                  </button>

                  <p className="text-sm text-muted mt-xs">
                    📍 {editLocationPreview || t("selectCity")}
                  </p>
                </div>

                <div className="field-group">
                  <label className="field-label">{t("contact")}</label>
                  <input
                    className="input"
                    type="tel"
                    value={editForm.contact || ""}
                    disabled
                    readOnly
                  />
                  <p className="text-sm text-muted mt-xs">
                    {t("contactEditLocked")}
                  </p>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">{t("description")}</label>
                <textarea
                  className="textarea"
                  rows={4}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      description: stripDangerous(e.target.value).slice(0, 1000),
                    })
                  }
                />
              </div>

              <div className="field-group">
                <label className="field-label">{t("priceRangeLabel")}</label>
                <div className="modern-price-section">
                  <div className="price-range-container">
                    <div className="currency-selector-wrapper">
                      <label className="currency-label">{t("currency")}</label>
                      <select
                        className="select currency-select"
                        value={editForm.offerCurrency || "EUR"}
                        onChange={(e) => {
                          const updated = { ...editForm, offerCurrency: e.target.value };
                          if (formatOfferPrice) {
                            updated.offerprice = formatOfferPrice(
                              updated.offerMin,
                              updated.offerMax,
                              updated.offerCurrency
                            );
                          }
                          setEditForm(updated);
                        }}
                      >
                        {(currencyOptions || ["EUR", "USD", "MKD", "ALL"]).map((cur) => (
                          <option key={cur} value={cur}>
                            {cur}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="slider-wrapper">
                      <DualRangeSlider
                        min={0}
                        max={20000}
                        value={{ min: Number(editForm.offerMin) || 0, max: Number(editForm.offerMax) || 0 }}
                        onChange={({ min, max }) => {
                          const updated = { ...editForm, offerMin: min, offerMax: max };
                          if (formatOfferPrice) {
                            updated.offerprice = formatOfferPrice(
                              min,
                              max,
                              updated.offerCurrency || "EUR"
                            );
                          }
                          setEditForm(updated);
                        }}
                        currency={editForm.offerCurrency || "EUR"}
                      />
                    </div>
                    {editForm.offerprice && (
                      <div className="price-preview">
                        <span className="price-preview-label">{t("preview")}:</span>
                        <span className="price-preview-value">{editForm.offerprice}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">
                  {t("tagsFieldLabel")}
                </label>
                <input
                  className="input"
                  placeholder={t("tagsPlaceholder")}
                  value={editForm.tags}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      tags: stripDangerous(e.target.value).slice(0, 64),
                    })
                  }
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {t("websiteFieldLabel")}
                </label>
                <input
                  className="input"
                  placeholder={t("websitePlaceholder")}
                  value={editForm.socialLink}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      socialLink: stripDangerous(e.target.value).slice(0, 200),
                    })
                  }
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {t("imagesMax4")}
                </label>
                <div className="flex items-center gap-4 mb-sm">
                  <label className="btn btn-secondary small cursor-pointer" htmlFor="edit-image">
                    {t("uploadImages")}
                  </label>
                  <input
                    id="edit-image"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImageUpload(e, true)}
                  />
                </div>
              
                <div className="flex gap-sm overflow-x-auto pb-2">
                  {(editForm.images && editForm.images.length > 0 ? editForm.images : (editForm.imagePreview ? [editForm.imagePreview] : [])).map((img, index) => (
                    <div key={index} className="relative shrink-0">
                      <img
                        src={img}
                        alt={`${t("uploadAlt")} ${index + 1}`}
                        className="thumb-img"
                      />
                        <button
                          type="button"
                          className="btn-remove-img"
                          onClick={() => handleRemoveImage(index, true)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-ghost"
                onClick={() => {
                  setEditingListing(null);
                  setEditForm(null);
                  setShowEditMapPicker(false);
                }}
              >
                {t("cancel")}
              </button>
              <button className="btn btn-primary" onClick={saveEdit}>
                {t("saveChanges")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditListingModal;
