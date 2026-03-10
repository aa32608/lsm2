(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lsm2/src/components/HomeTab.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeTab
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Dynamically import Link to avoid SSR issues
const Link = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/lsm2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript, next/dynamic entry, async loader)").then((mod)=>mod.default), {
    loadableGenerated: {
        modules: [
            "[project]/lsm2/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false,
    loading: ()=>null
});
_c = Link;
function HomeTab() {
    _s();
    const { t, user, setShowPostForm, setShowAuthModal, setAuthMode, setForm, categoryIcons, categoryGroups, setCatFilter, activeListingCount, verifiedListingCount, publicListings, aggregateStats = {} } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [chartActiveId, setChartActiveId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chartTooltipPos, setChartTooltipPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handlePostClick = ()=>{
        if (!user) {
            setAuthMode("login");
            setShowAuthModal(true);
        } else {
            router.push('/post-listing');
        }
    };
    const handleCategoryClick = (cat)=>{
        setCatFilter(cat);
        router.push('/listings');
    };
    // Compact: 3 categories per group for homepage (short, scannable)
    const categoriesPerGroup = 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-main-content home-page",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "hero-section hero-section--home",
                "aria-labelledby": "hero-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container hero-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            id: "hero-title",
                            className: "hero-title hero-title--home",
                            children: t("homeSimpleTitle")
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "hero-subtitle hero-subtitle--home",
                            children: t("homeSimpleSubtitle")
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hero-actions hero-actions--home",
                            role: "group",
                            "aria-label": t("mainActions"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                    href: "/listings",
                                    className: "btn btn-secondary hero-btn-secondary",
                                    "aria-label": t("findLocalService"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "btn-icon",
                                            "aria-hidden": "true",
                                            children: "🔍"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "btn-text",
                                            children: t("findLocalService")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 74,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "btn btn-primary hero-btn-primary",
                                    onClick: handlePostClick,
                                    "aria-label": t("heroPostCtaShort"),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "btn-icon",
                                            "aria-hidden": "true",
                                            children: "📝"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "btn-text",
                                            children: t("heroPostCtaShort")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "hero-trust-line",
                            role: "note",
                            children: t("homeSimpleTrustLine")
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "social-proof-section",
                "aria-labelledby": "social-proof-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container social-proof-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "social-proof-title",
                            className: "section-title social-proof-title",
                            children: t("localBusinessesJoiningBizCall")
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "social-proof-stats",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "social-proof-stat",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "social-proof-value",
                                            children: aggregateStats.totalViews?.toLocaleString?.() ?? aggregateStats.totalViews ?? 0
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "social-proof-label",
                                            children: t("overViews").replace("{{count}}", aggregateStats.totalViews != null ? String(aggregateStats.totalViews) : "0")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 102,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "social-proof-stat",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "social-proof-value",
                                            children: aggregateStats.totalContacts?.toLocaleString?.() ?? aggregateStats.totalContacts ?? 0
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "social-proof-label",
                                            children: t("overContactAttempts").replace("{{count}}", aggregateStats.totalContacts != null ? String(aggregateStats.totalContacts) : "0")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                (aggregateStats.totalByPhone > 0 || aggregateStats.totalByEmail > 0 || aggregateStats.totalByWhatsapp > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "social-proof-breakdown",
                                    children: [
                                        aggregateStats.totalByPhone > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "📞 ",
                                                aggregateStats.totalByPhone,
                                                " ",
                                                t("contactByPhone")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 110,
                                            columnNumber: 53
                                        }, this),
                                        aggregateStats.totalByEmail > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "✉️ ",
                                                aggregateStats.totalByEmail,
                                                " ",
                                                t("contactByEmail")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 111,
                                            columnNumber: 53
                                        }, this),
                                        aggregateStats.totalByWhatsapp > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "💬 ",
                                                aggregateStats.totalByWhatsapp,
                                                " ",
                                                t("contactByWhatsapp")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 112,
                                            columnNumber: 56
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 109,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        (aggregateStats.top5Featured?.length ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "top-featured-section",
                            "aria-labelledby": "top-featured-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "top-featured-title",
                                    className: "section-title top-featured-title",
                                    children: t("homeTopFeaturedTitle")
                                }, void 0, false, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "top-featured-subtitle",
                                    children: t("homeTopFeaturedSubtitle")
                                }, void 0, false, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "top-featured-layout",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "top-featured-list",
                                            role: "list",
                                            children: aggregateStats.top5Featured.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "top-featured-item",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "top-featured-item-main",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "top-featured-item-name",
                                                                    children: item.name || t("listing")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 129,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "top-featured-item-meta",
                                                                    children: [
                                                                        t(item.category) || item.category,
                                                                        " ",
                                                                        item.city ? `• ${item.city}` : item.location ? `• ${item.location}` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 130,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "top-featured-item-stats",
                                                                    children: [
                                                                        "👁 ",
                                                                        item.views ?? 0,
                                                                        " · 📞 ",
                                                                        item.contacts ?? 0
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 133,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 128,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                                            href: `/listings/${item.id}`,
                                                            className: "btn btn-primary btn-sm top-featured-view-btn",
                                                            "aria-label": `${t("view")} ${item.name}`,
                                                            children: t("view")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 137,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 127,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 125,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "top-featured-chart top-featured-line-chart",
                                            role: "img",
                                            "aria-label": t("homeTopFeaturedSubtitle"),
                                            onMouseLeave: ()=>setChartActiveId(null),
                                            children: (()=>{
                                                const items = aggregateStats.top5Featured;
                                                const lastMonthKey = aggregateStats.lastMonthKey || "";
                                                const thisMonthKey = aggregateStats.thisMonthKey || "";
                                                const formatMonth = (key)=>{
                                                    if (!key || key.length < 7) return key;
                                                    const [y, m] = key.split("-");
                                                    const monthNames = [
                                                        "Jan",
                                                        "Feb",
                                                        "Mar",
                                                        "Apr",
                                                        "May",
                                                        "Jun",
                                                        "Jul",
                                                        "Aug",
                                                        "Sep",
                                                        "Oct",
                                                        "Nov",
                                                        "Dec"
                                                    ];
                                                    return `${monthNames[parseInt(m, 10) - 1] || m} ${y}`;
                                                };
                                                const chartColors = [
                                                    {
                                                        base: "#3b82f6",
                                                        light: "#60a5fa"
                                                    },
                                                    {
                                                        base: "#8b5cf6",
                                                        light: "#a78bfa"
                                                    },
                                                    {
                                                        base: "#f59e0b",
                                                        light: "#fbbf24"
                                                    },
                                                    {
                                                        base: "#10b981",
                                                        light: "#34d399"
                                                    },
                                                    {
                                                        base: "#ef4444",
                                                        light: "#f87171"
                                                    },
                                                    {
                                                        base: "#06b6d4",
                                                        light: "#22d3ee"
                                                    },
                                                    {
                                                        base: "#ec4899",
                                                        light: "#f472b6"
                                                    },
                                                    {
                                                        base: "#6366f1",
                                                        light: "#818cf8"
                                                    }
                                                ];
                                                const series = items.map((item, idx)=>{
                                                    const lastTotal = (item.lastMonthViews ?? 0) + (item.lastMonthContacts ?? 0);
                                                    const thisTotal = (item.views ?? 0) + (item.contacts ?? 0);
                                                    const increased = thisTotal >= lastTotal;
                                                    const colorSet = chartColors[idx % chartColors.length];
                                                    const shade = colorSet.base;
                                                    const shadeLight = colorSet.light;
                                                    return {
                                                        id: item.id,
                                                        name: item.name,
                                                        category: item.category,
                                                        city: item.city || item.location,
                                                        lastTotal,
                                                        thisTotal,
                                                        lastMonthViews: item.lastMonthViews ?? 0,
                                                        lastMonthContacts: item.lastMonthContacts ?? 0,
                                                        views: item.views ?? 0,
                                                        contacts: item.contacts ?? 0,
                                                        increased,
                                                        stroke: shade,
                                                        strokeLight: shadeLight
                                                    };
                                                });
                                                const maxY = Math.max(1, ...series.flatMap((s)=>[
                                                        s.lastTotal,
                                                        s.thisTotal
                                                    ]));
                                                const padding = {
                                                    left: 36,
                                                    right: 16,
                                                    top: 12,
                                                    bottom: 28
                                                };
                                                const width = 280;
                                                const height = 200;
                                                const chartWidth = width - padding.left - padding.right;
                                                const chartHeight = height - padding.top - padding.bottom;
                                                const xScale = (i)=>padding.left + i / 1 * chartWidth;
                                                const yScale = (v)=>padding.top + chartHeight - v / maxY * chartHeight;
                                                const activeSeries = series.find((s)=>s.id === chartActiveId);
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "top-featured-line-chart-inner",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "top-featured-line-chart-y-label",
                                                            children: t("chartAmount")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 207,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "100%",
                                                            height: height,
                                                            viewBox: `0 0 ${width} ${height}`,
                                                            preserveAspectRatio: "xMidYMid meet",
                                                            className: "top-featured-line-chart-svg",
                                                            onMouseMove: (e)=>{
                                                                const rect = e.currentTarget.getBoundingClientRect();
                                                                setChartTooltipPos({
                                                                    x: e.clientX - rect.left,
                                                                    y: e.clientY - rect.top
                                                                });
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                                                                    children: series.map((s, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                                                                            id: `lineGrad-${s.id}`,
                                                                            x1: "0%",
                                                                            y1: "0%",
                                                                            x2: "100%",
                                                                            y2: "0%",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                    offset: "0%",
                                                                                    stopColor: s.stroke
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                    lineNumber: 222,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                                                                    offset: "100%",
                                                                                    stopColor: s.strokeLight
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                    lineNumber: 223,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, s.id, true, {
                                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                            lineNumber: 221,
                                                                            columnNumber: 31
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 219,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: padding.left,
                                                                    y1: padding.top,
                                                                    x2: padding.left,
                                                                    y2: padding.top + chartHeight,
                                                                    stroke: "var(--border)",
                                                                    strokeWidth: "1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 228,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                    x1: padding.left,
                                                                    y1: padding.top + chartHeight,
                                                                    x2: padding.left + chartWidth,
                                                                    y2: padding.top + chartHeight,
                                                                    stroke: "var(--border)",
                                                                    strokeWidth: "1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 230,
                                                                    columnNumber: 27
                                                                }, this),
                                                                [
                                                                    0,
                                                                    Math.ceil(maxY / 2),
                                                                    maxY
                                                                ].filter((v, i, a)=>a.indexOf(v) === i).map((tick)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                                x1: padding.left,
                                                                                y1: yScale(tick),
                                                                                x2: padding.left + chartWidth,
                                                                                y2: yScale(tick),
                                                                                stroke: "var(--border)",
                                                                                strokeWidth: "0.5",
                                                                                strokeDasharray: "2,2"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 234,
                                                                                columnNumber: 31
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                                x: padding.left - 6,
                                                                                y: yScale(tick) + 4,
                                                                                textAnchor: "end",
                                                                                fontSize: "10",
                                                                                fill: "var(--text-muted)",
                                                                                children: tick
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 235,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        ]
                                                                    }, tick, true, {
                                                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                        lineNumber: 233,
                                                                        columnNumber: 29
                                                                    }, this)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                    x: xScale(0),
                                                                    y: height - 6,
                                                                    textAnchor: "middle",
                                                                    fontSize: "10",
                                                                    fill: "var(--text-muted)",
                                                                    children: lastMonthKey ? formatMonth(lastMonthKey) : t("lastMonth")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
                                                                    x: xScale(1),
                                                                    y: height - 6,
                                                                    textAnchor: "middle",
                                                                    fontSize: "10",
                                                                    fill: "var(--text-muted)",
                                                                    children: thisMonthKey ? formatMonth(thisMonthKey) : t("thisMonth")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 240,
                                                                    columnNumber: 27
                                                                }, this),
                                                                series.map((s)=>{
                                                                    const xA = xScale(0);
                                                                    const xB = xScale(1);
                                                                    const yA = yScale(s.lastTotal);
                                                                    const yB = yScale(s.thisTotal);
                                                                    const isActive = chartActiveId === s.id;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                        onMouseEnter: ()=>setChartActiveId(s.id),
                                                                        onClick: ()=>setChartActiveId((prev)=>prev === s.id ? null : s.id),
                                                                        style: {
                                                                            cursor: "pointer"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                                x1: xA,
                                                                                y1: yA,
                                                                                x2: xB,
                                                                                y2: yB,
                                                                                stroke: "transparent",
                                                                                strokeWidth: "16",
                                                                                strokeLinecap: "round"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 256,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                                x1: xA,
                                                                                y1: yA,
                                                                                x2: xB,
                                                                                y2: yB,
                                                                                stroke: `url(#lineGrad-${s.id})`,
                                                                                strokeWidth: isActive ? 4 : 2.5,
                                                                                strokeLinecap: "round",
                                                                                className: s.increased ? "chart-line chart-line--increase" : "chart-line chart-line--decrease"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 257,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, s.id, true, {
                                                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                        lineNumber: 249,
                                                                        columnNumber: 31
                                                                    }, this);
                                                                }),
                                                                series.map((s)=>{
                                                                    const isActive = chartActiveId === s.id;
                                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                                                        onMouseEnter: ()=>setChartActiveId(s.id),
                                                                        onClick: ()=>setChartActiveId((prev)=>prev === s.id ? null : s.id),
                                                                        style: {
                                                                            cursor: "pointer"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                cx: xScale(0),
                                                                                cy: yScale(s.lastTotal),
                                                                                r: isActive ? 6 : 4,
                                                                                fill: s.stroke,
                                                                                stroke: "var(--surface)",
                                                                                strokeWidth: "1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 280,
                                                                                columnNumber: 33
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                cx: xScale(1),
                                                                                cy: yScale(s.thisTotal),
                                                                                r: isActive ? 6 : 4,
                                                                                fill: s.stroke,
                                                                                stroke: "var(--surface)",
                                                                                strokeWidth: "1"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                                lineNumber: 281,
                                                                                columnNumber: 33
                                                                            }, this)
                                                                        ]
                                                                    }, `points-${s.id}`, true, {
                                                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                        lineNumber: 274,
                                                                        columnNumber: 31
                                                                    }, this);
                                                                })
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 208,
                                                            columnNumber: 25
                                                        }, this),
                                                        activeSeries && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "top-featured-chart-tooltip",
                                                            role: "tooltip",
                                                            "aria-live": "polite",
                                                            style: {
                                                                left: Math.min(chartTooltipPos.x + 12, 240),
                                                                top: Math.min(chartTooltipPos.y, 140)
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "top-featured-chart-tooltip-name",
                                                                    children: activeSeries.name || activeSeries.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 294,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "top-featured-chart-tooltip-meta",
                                                                    children: [
                                                                        t(activeSeries.category) || activeSeries.category,
                                                                        " ",
                                                                        activeSeries.city ? `• ${activeSeries.city}` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "top-featured-chart-tooltip-stats",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                formatMonth(lastMonthKey) || t("lastMonth"),
                                                                                ": 👁 ",
                                                                                activeSeries.lastMonthViews,
                                                                                " · 📞 ",
                                                                                activeSeries.lastMonthContacts
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                            lineNumber: 299,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                formatMonth(thisMonthKey) || t("thisMonth"),
                                                                                ": 👁 ",
                                                                                activeSeries.views,
                                                                                " · 📞 ",
                                                                                activeSeries.contacts
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                            lineNumber: 300,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 298,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                                                    href: `/listings/${activeSeries.id}`,
                                                                    className: "top-featured-chart-tooltip-link",
                                                                    children: [
                                                                        t("view"),
                                                                        " →"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 302,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 288,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "top-featured-line-chart-legend",
                                                            children: series.slice(0, 5).map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    className: `top-featured-line-chart-legend-item ${chartActiveId === s.id ? "is-active" : ""}`,
                                                                    onClick: ()=>setChartActiveId((prev)=>prev === s.id ? null : s.id),
                                                                    onMouseEnter: ()=>setChartActiveId(s.id),
                                                                    title: s.name,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `top-featured-line-chart-legend-dot ${s.increased ? "chart-line--increase" : "chart-line--decrease"}`,
                                                                            style: {
                                                                                background: s.stroke
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                            lineNumber: 317,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        s.name?.slice(0, 14) || s.id,
                                                                        s.name?.length > 14 ? "…" : ""
                                                                    ]
                                                                }, s.id, true, {
                                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                    lineNumber: 309,
                                                                    columnNumber: 29
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                            lineNumber: 307,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 206,
                                                    columnNumber: 23
                                                }, this);
                                            })()
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 124,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 94,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "how-it-works-section",
                "aria-labelledby": "how-it-works-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-header",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "how-it-works-title",
                                className: "section-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-icon",
                                        "aria-hidden": "true",
                                        children: "✨"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 340,
                                        columnNumber: 15
                                    }, this),
                                    t("homeHowItWorksTitle")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                lineNumber: 339,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 338,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "steps-grid",
                            role: "list",
                            children: [
                                1,
                                2,
                                3
                            ].map((step)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                    className: "step-card",
                                    role: "listitem",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "step-number",
                                            "aria-label": `${t("step")} ${step}`,
                                            children: step
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 352,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "step-description",
                                            children: step === 1 ? t("homeHowItWorksStep1") : step === 2 ? t("homeHowItWorksStep2") : t("homeHowItWorksStep3")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, step, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 347,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 333,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "stats-section",
                "aria-labelledby": "stats-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stats-grid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-icon",
                                            "aria-hidden": "true",
                                            children: "📋"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 376,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-value",
                                                    children: activeListingCount || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 378,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-label",
                                                    children: t("activeListings")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 379,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 375,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-icon",
                                            "aria-hidden": "true",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 383,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-value",
                                                    children: verifiedListingCount || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 385,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-label",
                                                    children: t("verifiedListings")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 386,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "stat-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-icon",
                                            "aria-hidden": "true",
                                            children: "👥"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 390,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "stat-content",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-value",
                                                    children: publicListings?.length || 0
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 392,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "stat-label",
                                                    children: t("publicListings")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                    lineNumber: 393,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 391,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "stats-section-cta",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                href: "/listings",
                                className: "btn btn-primary stats-browse-btn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "btn-icon",
                                        "aria-hidden": "true",
                                        children: "🔍"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, this),
                                    t("browseServicesCta")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                lineNumber: 398,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 373,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 369,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "features-section",
                "aria-labelledby": "features-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-header",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "features-title",
                                className: "section-title",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "section-icon",
                                        "aria-hidden": "true",
                                        children: "🌟"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 414,
                                        columnNumber: 15
                                    }, this),
                                    t("whyChooseUs")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                lineNumber: 413,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 412,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "trust-signals-grid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "trust-signal-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-icon",
                                            "aria-hidden": "true",
                                            children: "📞"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 421,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-text",
                                            children: t("trustDirectContact")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 422,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 420,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "trust-signal-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-icon",
                                            "aria-hidden": "true",
                                            children: "↩️"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 425,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-text",
                                            children: t("trustCancelAnytime")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 426,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "trust-signal-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-icon",
                                            "aria-hidden": "true",
                                            children: "🇲🇰"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "trust-signal-text",
                                            children: t("trustLocalPlatform")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "features-grid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "feature-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-icon",
                                            "aria-hidden": "true",
                                            children: "🔒"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 436,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "feature-title",
                                            children: t("verifiedListings")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 437,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "feature-description",
                                            children: t("verifiedListingsDesc")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 438,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 435,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "feature-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-icon",
                                            "aria-hidden": "true",
                                            children: "💰"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 443,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "feature-title",
                                            children: t("noCommissions")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 444,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "feature-description",
                                            children: t("noCommissionsDesc")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 442,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "feature-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-icon",
                                            "aria-hidden": "true",
                                            children: "📱"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 450,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "feature-title",
                                            children: t("easyContact")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "feature-description",
                                            children: t("easyContactDesc")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "feature-card",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "feature-icon",
                                            "aria-hidden": "true",
                                            children: "⭐"
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 457,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "feature-title",
                                            children: t("ratingsReviews")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 458,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "feature-description",
                                            children: t("ratingsReviewsDesc")
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                            lineNumber: 459,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                    lineNumber: 456,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                            lineNumber: 434,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 407,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "categories-section categories-section--compact",
                "aria-labelledby": "categories-title",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "categories-card card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "section-header section-header--compact categories-header-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "categories-title",
                                        className: "section-title section-title--compact",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "section-icon",
                                                "aria-hidden": "true",
                                                children: "🎯"
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                lineNumber: 476,
                                                columnNumber: 17
                                            }, this),
                                            t("homePopularCategoriesTitle")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 475,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                        href: "/listings",
                                        className: "categories-browse-all",
                                        "aria-label": t("browseAllCategories") || t("browse"),
                                        children: [
                                            t("browseAllCategories") || t("browse"),
                                            " →"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                lineNumber: 474,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "categories-by-group",
                                role: "list",
                                "aria-label": t("popularCategories") || t("homePopularCategoriesTitle"),
                                children: (categoryGroups || []).map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "categories-group-block",
                                        role: "listitem",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "categories-group-label",
                                                children: t(group.labelKey)
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "categories-group-chips",
                                                children: (group.categories || []).slice(0, categoriesPerGroup).map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "category-chip category-chip--compact",
                                                        onClick: ()=>handleCategoryClick(cat),
                                                        "aria-label": `${t("browse")} ${t(cat)} ${t("category")}`,
                                                        type: "button",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "category-icon",
                                                                "aria-hidden": "true",
                                                                children: categoryIcons?.[cat] ?? "🏷️"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                lineNumber: 505,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "category-name",
                                                                children: t(cat) || cat
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                                lineNumber: 508,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, cat, true, {
                                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                        lineNumber: 498,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                                lineNumber: 496,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, group.id, true, {
                                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                        lineNumber: 494,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                                lineNumber: 488,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                        lineNumber: 473,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                    lineNumber: 472,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/HomeTab.jsx",
                lineNumber: 468,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/HomeTab.jsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(HomeTab, "pwzC5+5XLArQiTO1opShTWTQKEo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = HomeTab;
var _c, _c1;
__turbopack_context__.k.register(_c, "Link");
__turbopack_context__.k.register(_c1, "HomeTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lsm2_src_components_HomeTab_jsx_a516be38._.js.map