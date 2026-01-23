import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
const Filtersheet = React.memo(({
  t,
  filtersOpen,
  setFiltersOpen,
  q,
  setQ,
  catFilter,
  setCatFilter,
  locFilter,
  setLocFilter,
  sortBy,
  setSortBy,
  categories,
  categoryIcons,
  allLocations,
  // Optional filters for My Listings
  statusFilter,
  setStatusFilter,
  expiryFilter,
  setExpiryFilter
}) => {
  const [localSearch, setLocalSearch] = useState(q);
  const [localCat, setLocalCat] = useState(catFilter);
  const [localLoc, setLocalLoc] = useState(locFilter);
  const [localSort, setLocalSort] = useState(sortBy);
  useEffect(() => {
    setLocalSearch(q);
  }, [q]);
  useEffect(() => {
    setLocalCat(catFilter);
  }, [catFilter]);
  useEffect(() => {
    setLocalLoc(locFilter);
  }, [locFilter]);
  useEffect(() => {
    setLocalSort(sortBy);
  }, [sortBy]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== q) setQ(localSearch);
      if (localCat !== catFilter) setCatFilter(localCat);
      if (localLoc !== locFilter) setLocFilter(localLoc);
      if (localSort !== sortBy) setSortBy(localSort);
    }, 400);
    return () => clearTimeout(timer);
  }, [localSearch, localCat, localLoc, localSort, q, catFilter, locFilter, sortBy, setQ, setCatFilter, setLocFilter, setSortBy]);
  if (!filtersOpen) return null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "filter-sheet-backdrop",
        onClick: () => setFiltersOpen(false),
        "aria-label": t("closeFilters")
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "filter-sheet-wrapper", children: [
      /* @__PURE__ */ jsx("div", { className: "filter-sheet-handle", onClick: () => setFiltersOpen(false), children: /* @__PURE__ */ jsx("div", { className: "filter-sheet-handle-bar" }) }),
      /* @__PURE__ */ jsxs("div", { className: "filter-sheet-content", children: [
        /* @__PURE__ */ jsxs("div", { className: "filter-sheet-header", children: [
          /* @__PURE__ */ jsxs("div", { className: "filter-sheet-header-left", children: [
            /* @__PURE__ */ jsx("div", { className: "filter-sheet-icon", children: "🔍" }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "filter-sheet-title", children: t("filters") }),
              /* @__PURE__ */ jsx("p", { className: "filter-sheet-subtitle", children: t("filterSubtitle") })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "filter-sheet-close",
              onClick: () => setFiltersOpen(false),
              "aria-label": t("closeFilters"),
              children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", style: { minWidth: "24px" }, children: [
                /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "filter-sheet-scroll", children: [
          /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "🔎" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("search") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-search-box", children: [
              /* @__PURE__ */ jsxs("svg", { className: "filter-search-icon", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", style: { minWidth: "24px" }, children: [
                /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
                /* @__PURE__ */ jsx("path", { d: "m21 21-4.35-4.35" })
              ] }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "search",
                  className: "filter-search-input",
                  placeholder: t("searchPlaceholder"),
                  value: localSearch,
                  onChange: (e) => setLocalSearch(e.target.value)
                }
              ),
              localSearch && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  className: "filter-search-clear",
                  onClick: () => {
                    setLocalSearch("");
                    setQ("");
                  },
                  "aria-label": t("clearSearch"),
                  children: /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", style: { minWidth: "24px" }, children: [
                    /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                    /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
                  ] })
                }
              )
            ] }) })
          ] }),
          setStatusFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "⏳" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("status") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: statusFilter,
                  onChange: (e) => setStatusFilter(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: t("allStatuses") }),
                    /* @__PURE__ */ jsx("option", { value: "verified", children: t("verified") }),
                    /* @__PURE__ */ jsx("option", { value: "pending", children: t("pending") })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          setExpiryFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "⏰" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("expiry") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: expiryFilter,
                  onChange: (e) => setExpiryFilter(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: t("allExpiry") }),
                    /* @__PURE__ */ jsx("option", { value: "expiring", children: t("expiringSoon") }),
                    /* @__PURE__ */ jsx("option", { value: "active", children: t("active") }),
                    /* @__PURE__ */ jsx("option", { value: "expired", children: t("expired") })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          categories && setCatFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "📂" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("category") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsx("div", { className: "filter-options-grid", children: categories.map((cat) => {
              const label = t(cat);
              const active = localCat === label;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: `filter-option-card ${active ? "is-selected" : ""}`,
                  onClick: () => setLocalCat(active ? "" : label),
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "filter-option-icon", children: categoryIcons[cat] }),
                    /* @__PURE__ */ jsx("div", { className: "filter-option-label", children: label }),
                    active && /* @__PURE__ */ jsx("div", { className: "filter-option-check", children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", style: { minWidth: "24" }, children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) })
                  ]
                },
                cat
              );
            }) }) })
          ] }),
          allLocations && setLocFilter && /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "📍" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("location") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: localLoc,
                  onChange: (e) => setLocalLoc(e.target.value),
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "", children: t("allLocations") }),
                    allLocations.map((l) => /* @__PURE__ */ jsx("option", { value: l, children: l }, l))
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "filter-group", children: [
            /* @__PURE__ */ jsxs("div", { className: "filter-group-header", children: [
              /* @__PURE__ */ jsx("span", { className: "filter-group-icon", children: "🔄" }),
              /* @__PURE__ */ jsx("span", { className: "filter-group-title", children: t("sortBy") })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "filter-group-content", children: /* @__PURE__ */ jsxs("div", { className: "filter-select-wrapper", children: [
              /* @__PURE__ */ jsxs(
                "select",
                {
                  className: "filter-select-field",
                  value: localSort,
                  onChange: (e) => setLocalSort(e.target.value),
                  children: [
                    /* @__PURE__ */ jsxs("option", { value: "topRated", children: [
                      "⭐ ",
                      t("sortTopRated")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "newest", children: [
                      "🆕 ",
                      t("sortNewest")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "expiring", children: [
                      "⏰ ",
                      t("sortExpiring")
                    ] }),
                    /* @__PURE__ */ jsxs("option", { value: "az", children: [
                      "🔤 ",
                      t("sortAZ")
                    ] }),
                    setExpiryFilter && /* @__PURE__ */ jsxs("option", { value: "oldest", children: [
                      "📅 ",
                      t("sortOldest")
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "filter-select-arrow", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" }) })
            ] }) })
          ] })
        ] })
      ] })
    ] })
  ] });
});
export {
  Filtersheet as default
};
