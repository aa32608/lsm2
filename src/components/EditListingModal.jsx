"use client";
import React from "react";
import { motion } from "framer-motion";
import DualRangeSlider from "./DualRangeSlider";

const EditListingModal = ({
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
  plan,
  setSelectedTab,
  handleShareListing,
  handleImageUpload,
  handleRemoveImage,
  formatOfferPrice,
  currencyOptions,
}) => {
  if (!editingListing || !editForm) return null;

  return (
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
        className="modal edit-modal"
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

        <div className="modal-body edit-modal-body">
          <div className="edit-summary-banner">
            <div>
              <p className="eyebrow subtle">{t("preview")}</p>
              <h4 className="edit-summary-title">{editForm.name || t("name")}</h4>
              <p className="edit-summary-sub">
                {(t(editForm.category) || editForm.category || t("category"))} • {editLocationPreview || t("location")}
              </p>
            </div>
            <div className="pill-row">
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

          <div className="field-row-2">
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
                className="input"
                placeholder={t("locationExtra")}
                value={editForm.locationExtra || ""}
                onChange={(e) => {
                  const extra = stripDangerous(e.target.value).slice(0, 100);
                  setEditForm({
                    ...editForm,
                    locationExtra: extra,
                  });
                }}
                style={{ marginTop: 8 }}
              />

              <button
                type="button"
                className="btn btn-ghost small"
                onClick={() => setShowEditMapPicker(true)}
                style={{ marginTop: 8 }}
              >
                {t("chooseOnMap")}
              </button>

              <p className="field-hint" style={{ marginTop: 4 }}>
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
              <p className="field-hint">
                {t("contactEditLocked")}
              </p>
              <button
                type="button"
                className="btn btn-ghost small"
                onClick={() => {
                  setEditingListing(null);
                  setEditForm(null);
                  setSelectedTab("account");
                }}
                style={{ marginTop: 8 }}
              >
                {t("goToAccount")}
              </button>
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

          <div className="offer-price-range field-group">
            <label className="field-label">{t("priceRangeLabel") || "Price Range"}</label>
            <DualRangeSlider
              min={0}
              max={5000}
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
            <div className="price-inputs-row">
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
              {t("images")} (Max 4)
            </label>
            <div className="edit-image-row">
            <label className="btn btn-ghost small" htmlFor="edit-image">
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
          
          {/* Image Grid */}
          <div className="image-preview-grid">
            {(editForm.images && editForm.images.length > 0 ? editForm.images : (editForm.imagePreview ? [editForm.imagePreview] : [])).map((img, index) => (
              <div key={index} className="preview-item">
                <img
                  src={img}
                  alt={`${t("uploadAlt")} ${index + 1}`}
                />
                  <button
                    type="button"
                    className="preview-remove-btn"
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
  );
};

export default EditListingModal;