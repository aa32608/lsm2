import { jsxs, jsx } from "react/jsx-runtime";
import React from "react";
const Sidebar = React.memo(({ t, selected, onSelect, onLogout, onLogin, onClose, user }) => {
  const navItems = [
    { id: "main", label: t("homepage"), icon: "🏠" },
    ...user ? [
      { id: "myListings", label: t("myListings"), icon: "📂" },
      { id: "account", label: t("account"), icon: "👤" }
    ] : [],
    { id: "allListings", label: t("explore"), icon: "🧭" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "sidebar-panel", children: [
    /* @__PURE__ */ jsx("div", { className: "sidebar-header", children: /* @__PURE__ */ jsxs("div", { className: "sidebar-header-top", children: [
      /* @__PURE__ */ jsxs("div", { className: "sidebar-header-content", children: [
        /* @__PURE__ */ jsx("h3", { className: "sidebar-title", children: t("dashboard") }),
        /* @__PURE__ */ jsx("p", { className: "sidebar-subtitle", children: t("manageListings") })
      ] }),
      /* @__PURE__ */ jsx("button", { className: "sidebar-close-btn", onClick: onClose, "aria-label": t("close"), children: /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", style: { minWidth: "24px" }, children: [
        /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
        /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "sidebar-nav", children: navItems.map((item) => /* @__PURE__ */ jsxs(
      "button",
      {
        className: `sidebar-btn ${selected === item.id ? "active" : ""}`,
        onClick: () => onSelect(item.id),
        children: [
          /* @__PURE__ */ jsx("span", { className: "sidebar-icon", children: item.icon }),
          /* @__PURE__ */ jsx("span", { className: "sidebar-label", children: item.label }),
          selected === item.id && /* @__PURE__ */ jsx("span", { className: "sidebar-active-indicator", children: /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) }) })
        ]
      },
      item.id
    )) }),
    /* @__PURE__ */ jsx("div", { className: "sidebar-footer", children: user ? /* @__PURE__ */ jsxs("button", { className: "sidebar-logout", onClick: onLogout, children: [
      /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }),
        /* @__PURE__ */ jsx("polyline", { points: "16 17 21 12 16 7" }),
        /* @__PURE__ */ jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: t("logout") })
    ] }) : /* @__PURE__ */ jsxs("button", { className: "sidebar-login", onClick: onLogin, children: [
      /* @__PURE__ */ jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx("path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" }),
        /* @__PURE__ */ jsx("polyline", { points: "10 17 15 12 10 7" }),
        /* @__PURE__ */ jsx("line", { x1: "15", y1: "12", x2: "3", y2: "12" })
      ] }),
      /* @__PURE__ */ jsx("span", { children: t("login") })
    ] }) })
  ] });
});
export {
  Sidebar as default
};
