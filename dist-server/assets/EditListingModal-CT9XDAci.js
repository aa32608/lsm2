import { jsx, jsxs } from "react/jsx-runtime";
import "react";
import { motion } from "framer-motion";
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
  handleRemoveImage
}) => {
  if (!editingListing || !editForm) return null;
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "modal-overlay",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      onClick: () => {
        setEditingListing(null);
        setEditForm(null);
        setShowEditMapPicker(false);
      },
      children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          className: "modal edit-modal",
          onClick: (e) => e.stopPropagation(),
          initial: { y: 20, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: 20, opacity: 0 },
          children: [
            /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
              /* @__PURE__ */ jsx("h3", { className: "modal-title", children: t("edit") }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "icon-btn",
                  onClick: () => {
                    setEditingListing(null);
                    setEditForm(null);
                    setShowEditMapPicker(false);
                  },
                  "aria-label": t("close"),
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "modal-body edit-modal-body", children: [
              /* @__PURE__ */ jsxs("div", { className: "edit-summary-banner", children: [
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "eyebrow subtle", children: t("preview") }),
                  /* @__PURE__ */ jsx("h4", { className: "edit-summary-title", children: editForm.name || t("name") }),
                  /* @__PURE__ */ jsxs("p", { className: "edit-summary-sub", children: [
                    t(editForm.category) || editForm.category || t("category"),
                    " • ",
                    editLocationPreview || t("location")
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "pill-row", children: [
                  /* @__PURE__ */ jsxs("span", { className: "pill pill-soft", children: [
                    "⏱️ ",
                    editForm.plan || "1",
                    " ",
                    t("months")
                  ] }),
                  editForm.offerprice && /* @__PURE__ */ jsx("span", { className: "pill pill-price", children: editForm.offerprice })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                /* @__PURE__ */ jsx("label", { className: "field-label", children: t("name") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "input",
                    value: editForm.name,
                    onChange: (e) => setEditForm({
                      ...editForm,
                      name: stripDangerous(e.target.value).slice(0, 100)
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                /* @__PURE__ */ jsx("label", { className: "field-label", children: t("category") }),
                /* @__PURE__ */ jsx(
                  "select",
                  {
                    className: "select",
                    value: editForm.category,
                    onChange: (e) => setEditForm({ ...editForm, category: e.target.value }),
                    children: categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, children: t(cat) }, cat))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-row-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                  /* @__PURE__ */ jsx("label", { className: "field-label", children: t("location") }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      className: "select",
                      value: editForm.locationCity,
                      onChange: (e) => setEditForm({
                        ...editForm,
                        locationCity: e.target.value
                      }),
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: t("selectCity") }),
                        MK_CITIES.map((city) => /* @__PURE__ */ jsx("option", { value: city, children: city }, city))
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: "input",
                      placeholder: t("locationExtra"),
                      value: editForm.locationExtra || "",
                      onChange: (e) => {
                        const extra = stripDangerous(e.target.value).slice(0, 100);
                        setEditForm({
                          ...editForm,
                          locationExtra: extra
                        });
                      },
                      style: { marginTop: 8 }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn btn-ghost small",
                      onClick: () => setShowEditMapPicker(true),
                      style: { marginTop: 8 },
                      children: t("chooseOnMap")
                    }
                  ),
                  /* @__PURE__ */ jsxs("p", { className: "field-hint", style: { marginTop: 4 }, children: [
                    "📍 ",
                    editLocationPreview || t("selectCity")
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                  /* @__PURE__ */ jsx("label", { className: "field-label", children: t("contact") }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: "input",
                      type: "tel",
                      value: editForm.contact || "",
                      disabled: true,
                      readOnly: true
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "field-hint", children: t("contactEditLocked") }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      className: "btn btn-ghost small",
                      onClick: () => {
                        setEditingListing(null);
                        setEditForm(null);
                        setSelectedTab("account");
                      },
                      style: { marginTop: 8 },
                      children: t("goToAccount")
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                /* @__PURE__ */ jsx("label", { className: "field-label", children: t("description") }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    className: "textarea",
                    rows: 4,
                    value: editForm.description,
                    onChange: (e) => setEditForm({
                      ...editForm,
                      description: stripDangerous(e.target.value).slice(0, 1e3)
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-row-2", children: [
                /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                  /* @__PURE__ */ jsx("label", { className: "field-label", children: t("priceRangeLabel") }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: "input",
                      placeholder: t("priceRangePlaceholder"),
                      value: editForm.offerprice,
                      onChange: (e) => setEditForm({
                        ...editForm,
                        offerprice: stripDangerous(e.target.value)
                      })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                  /* @__PURE__ */ jsx("label", { className: "field-label", children: t("tagsFieldLabel") }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: "input",
                      placeholder: t("tagsPlaceholder"),
                      value: editForm.tags,
                      onChange: (e) => setEditForm({
                        ...editForm,
                        tags: stripDangerous(e.target.value).slice(0, 64)
                      })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                /* @__PURE__ */ jsx("label", { className: "field-label", children: t("websiteFieldLabel") }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    className: "input",
                    placeholder: t("websitePlaceholder"),
                    value: editForm.socialLink,
                    onChange: (e) => setEditForm({
                      ...editForm,
                      socialLink: stripDangerous(e.target.value).slice(0, 200)
                    })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "field-group", children: [
                /* @__PURE__ */ jsxs("label", { className: "field-label", children: [
                  t("images") || "Images",
                  " (Max 4)"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "edit-image-row", children: [
                  /* @__PURE__ */ jsx("label", { className: "btn btn-ghost small", htmlFor: "edit-image", children: t("uploadImages") || "Upload Images" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "edit-image",
                      style: { display: "none" },
                      type: "file",
                      accept: "image/*",
                      multiple: true,
                      onChange: (e) => handleImageUpload(e, true)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx("div", { className: "image-preview-grid", style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: "10px",
                  marginTop: "12px"
                }, children: (editForm.images && editForm.images.length > 0 ? editForm.images : editForm.imagePreview ? [editForm.imagePreview] : []).map((img, index) => /* @__PURE__ */ jsxs("div", { className: "preview-item", style: { position: "relative" }, children: [
                  /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: img,
                      alt: `${t("previewAlt")} ${index + 1}`,
                      style: {
                        width: "100%",
                        aspectRatio: "1",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleRemoveImage(index, true),
                      style: {
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        background: "rgba(0,0,0,0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "24px",
                        height: "24px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0
                      },
                      children: "✕"
                    }
                  )
                ] }, index)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "modal-footer", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn btn-ghost",
                  onClick: () => {
                    setEditingListing(null);
                    setEditForm(null);
                    setShowEditMapPicker(false);
                  },
                  children: t("cancel")
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "btn btn-primary", onClick: saveEdit, children: t("saveChanges") })
            ] })
          ]
        }
      )
    }
  );
};
export {
  EditListingModal as default
};
