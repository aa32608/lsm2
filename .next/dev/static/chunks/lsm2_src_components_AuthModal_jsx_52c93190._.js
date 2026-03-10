(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lsm2/src/components/AuthModal.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/auth/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/auth/dist/esm/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
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
;
const AuthModal = ()=>{
    _s();
    const { t, auth, db, showAuthModal, setShowAuthModal, authMode, setAuthMode, email, setEmail, password, setPassword, displayName, setDisplayName, phoneNumber, setPhoneNumber, countryCode, setCountryCode, verificationCode, setVerificationCode, confirmationResult, setConfirmationResult, phoneLoading, setPhoneLoading, agreedToTerms, setAgreedToTerms, passwordForm, setPasswordForm, showMessage, countryCodes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    // Local Helpers
    const validateEmail = (e)=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const validatePhone = (s)=>!!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
    const validatePassword = (p)=>{
        if (!p || p.length < 8) return false;
        const numCount = (p.match(/\d/g) || []).length;
        return numCount >= 2;
    };
    const normalizePhoneForStorage = (raw)=>{
        if (!raw) return raw;
        const trimmed = raw.trim();
        if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
        const cleaned = trimmed.replace(/\D/g, "");
        if (cleaned === "") return trimmed;
        if (cleaned.length > 8 && cleaned.startsWith("00")) return "+" + cleaned.replace(/^0{2}/, "");
        const known = countryCodes.map((c)=>c.code.replace("+", ""));
        for (const pre of known)if (cleaned.startsWith(pre)) return "+" + cleaned;
        return "+389" + cleaned;
    };
    const getSignupRecaptcha = ()=>{
        if (window.signupRecaptchaVerifier) {
            try {
                window.signupRecaptchaVerifier.clear();
            } catch (e) {}
            window.signupRecaptchaVerifier = null;
        }
        const signupContainer = document.getElementById("recaptcha-signup");
        if (signupContainer) signupContainer.innerHTML = "";
        window.signupRecaptchaVerifier = new __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecaptchaVerifier"](auth, "recaptcha-signup", {
            size: "invisible"
        });
        return window.signupRecaptchaVerifier;
    };
    const createRecaptcha = (containerId)=>{
        if (window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier.clear();
            } catch (e) {}
            window.recaptchaVerifier = null;
        }
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = "";
        window.recaptchaVerifier = new __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RecaptchaVerifier"](auth, containerId, {
            size: "invisible"
        });
        return window.recaptchaVerifier;
    };
    const [isPhoneLogin, setIsPhoneLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [verificationId, setVerificationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [otp, setOtp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Phone Login Logic
    const handleSendOtp = async ()=>{
        if (!phoneNumber) return showMessage(t("enterPhone"), "error");
        try {
            setPhoneLoading(true);
            const appVerifier = createRecaptcha("recaptcha-container");
            const raw = phoneNumber.replace(/\D/g, "");
            if (!raw || raw.length < 5) {
                return showMessage(t("enterValidPhone"), "error");
            }
            const fullPhone = countryCode + raw;
            const confirmation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPhoneNumber"])(auth, fullPhone, appVerifier);
            setVerificationId(confirmation);
            showMessage(t("otpSent"), "success");
        } catch (err) {
            console.error(err);
            showMessage(`${t("otpError")}: ${err.message}`, "error");
            if (window.recaptchaVerifier) {
                try {
                    window.recaptchaVerifier.clear();
                } catch (e) {}
                window.recaptchaVerifier = null;
            }
            const container = document.getElementById("recaptcha-container");
            if (container) container.innerHTML = "";
        } finally{
            setPhoneLoading(false);
        }
    };
    const handleVerifyOtp = async ()=>{
        if (!otp) return showMessage(t("enterOtp"), "error");
        try {
            setPhoneLoading(true);
            await verificationId.confirm(otp);
            showMessage(t("signedIn"), "success");
            setShowAuthModal(false);
            setOtp("");
            setVerificationId(null);
            setPhoneNumber("");
        } catch (err) {
            console.error(err);
            showMessage(t("otpVerifyError"), "error");
        } finally{
            setPhoneLoading(false);
        }
    };
    // Prevent background scroll
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            if (showAuthModal) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
            return ({
                "AuthModal.useEffect": ()=>{
                    document.body.style.overflow = "auto";
                }
            })["AuthModal.useEffect"];
        }
    }["AuthModal.useEffect"], [
        showAuthModal
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: showAuthModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            className: "auth-overlay-new",
            initial: {
                opacity: 0
            },
            animate: {
                opacity: 1
            },
            exit: {
                opacity: 0
            },
            onClick: ()=>setShowAuthModal(false),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "auth-container-new",
                onClick: (e)=>e.stopPropagation(),
                initial: {
                    scale: 0.9,
                    opacity: 0,
                    y: 20
                },
                animate: {
                    scale: 1,
                    opacity: 1,
                    y: 0
                },
                exit: {
                    scale: 0.9,
                    opacity: 0,
                    y: 20
                },
                transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 300
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-header-new",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-tabs-new",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `auth-tab-new ${authMode === "login" ? "active" : ""}`,
                                        onClick: ()=>setAuthMode("login"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "auth-tab-icon",
                                                children: "🔐"
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 205,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t("login")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 206,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 201,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `auth-tab-new ${authMode === "signup" ? "active" : ""}`,
                                        onClick: ()=>setAuthMode("signup"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "auth-tab-icon",
                                                children: "✨"
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 212,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t("signup")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 213,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 208,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                lineNumber: 200,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "auth-close-btn",
                                onClick: ()=>setShowAuthModal(false),
                                "aria-label": t("close"),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "20",
                                    height: "20",
                                    viewBox: "0 0 20 20",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M15 5L5 15M5 5l10 10",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        strokeLinecap: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 222,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                    lineNumber: 221,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                        lineNumber: 199,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "auth-body-new",
                        children: [
                            authMode === "login" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-content-new",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-method-switch",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `auth-method-btn ${!isPhoneLogin ? "active" : ""}`,
                                                onClick: ()=>setIsPhoneLogin(false),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 238,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "22,6 12,13 2,6",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 239,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 237,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("email")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 241,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 233,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `auth-method-btn ${isPhoneLogin ? "active" : ""}`,
                                                onClick: ()=>setIsPhoneLogin(true),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: "5",
                                                                y: "2",
                                                                width: "14",
                                                                height: "20",
                                                                rx: "2",
                                                                ry: "2",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 248,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                x1: "12",
                                                                y1: "18",
                                                                x2: "12",
                                                                y2: "18.01",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 249,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 247,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("phone")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 251,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 243,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 232,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "auth-description",
                                        children: isPhoneLogin ? t("loginPhoneSubtitle") : t("loginSubtitle")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 255,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !isPhoneLogin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "auth-label",
                                                        children: t("email")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 261,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "auth-input-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "auth-input-icon",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 264,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                        points: "22,6 12,13 2,6",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 265,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 263,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "auth-input",
                                                                style: {
                                                                    padding: '16px 16px 16px 52px'
                                                                },
                                                                type: "email",
                                                                placeholder: t("email"),
                                                                value: email,
                                                                onChange: (e)=>setEmail(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 267,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 262,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 260,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "auth-label",
                                                        children: t("password")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 279,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "auth-input-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "auth-input-icon",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                        x: "3",
                                                                        y: "11",
                                                                        width: "18",
                                                                        height: "11",
                                                                        rx: "2",
                                                                        ry: "2",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 282,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M7 11V7a5 5 0 0 1 10 0v4",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 283,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 281,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "auth-input",
                                                                style: {
                                                                    padding: '16px 16px 16px 52px'
                                                                },
                                                                type: "password",
                                                                placeholder: t("password"),
                                                                value: password,
                                                                onChange: (e)=>setPassword(e.target.value)
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 285,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 280,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 278,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "auth-submit-btn",
                                                onClick: async ()=>{
                                                    if (!validateEmail(email)) return showMessage(t("enterValidEmail"), "error");
                                                    try {
                                                        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithEmailAndPassword"])(auth, email, password);
                                                        showMessage(t("signedIn"), "success");
                                                        setShowAuthModal(false);
                                                        setEmail("");
                                                        setPassword("");
                                                    } catch (e) {
                                                        let errorMsg = e.message;
                                                        if (e.code === 'auth/user-not-found') {
                                                            errorMsg = t("userNotFound");
                                                        } else if (e.code === 'auth/wrong-password') {
                                                            errorMsg = t("wrongPassword");
                                                        } else if (e.code === 'auth/invalid-email') {
                                                            errorMsg = t("enterValidEmail");
                                                        } else if (e.code === 'auth/too-many-requests') {
                                                            errorMsg = t("tooManyAttempts");
                                                        } else if (e.code === 'auth/network-request-failed') {
                                                            errorMsg = t("networkError");
                                                        }
                                                        showMessage(errorMsg, "error");
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("login")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 324,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                            d: "M5 12h14M12 5l7 7-7 7",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 326,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 325,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 296,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "auth-forgot-password-link",
                                                onClick: async ()=>{
                                                    if (!validateEmail(email)) {
                                                        return showMessage(t("enterEmailForReset"), "error");
                                                    }
                                                    try {
                                                        await sendPasswordResetEmail(auth, email);
                                                        showMessage(t("passwordResetEmailSent"), "success");
                                                    } catch (e) {
                                                        if (e.code === 'auth/user-not-found') {
                                                            showMessage(t("userNotFound"), "error");
                                                        } else {
                                                            showMessage(t("passwordResetError"), "error");
                                                        }
                                                    }
                                                },
                                                style: {
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--primary)',
                                                    cursor: 'pointer',
                                                    fontSize: '0.9rem',
                                                    marginTop: '12px',
                                                    textDecoration: 'underline',
                                                    width: '100%',
                                                    textAlign: 'center'
                                                },
                                                children: t("forgotPassword")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 331,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: !verificationId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "auth-input-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "auth-label",
                                                            children: t("phoneNumber")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 370,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "auth-phone-group",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    className: "auth-country-select",
                                                                    value: countryCode,
                                                                    onChange: (e)=>setCountryCode(e.target.value),
                                                                    children: countryCodes.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: c.code,
                                                                            children: [
                                                                                c.name,
                                                                                " ",
                                                                                c.code
                                                                            ]
                                                                        }, c.code, true, {
                                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                            lineNumber: 378,
                                                                            columnNumber: 35
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                    lineNumber: 372,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "auth-input-wrapper",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                            className: "auth-input-icon",
                                                                            width: "20",
                                                                            height: "20",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                                    x: "5",
                                                                                    y: "2",
                                                                                    width: "14",
                                                                                    height: "20",
                                                                                    rx: "2",
                                                                                    ry: "2",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                                    lineNumber: 385,
                                                                                    columnNumber: 35
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                                    x1: "12",
                                                                                    y1: "18",
                                                                                    x2: "12",
                                                                                    y2: "18.01",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                                    lineNumber: 386,
                                                                                    columnNumber: 35
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                            lineNumber: 384,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            className: "auth-input",
                                                                            style: {
                                                                                padding: '16px 16px 16px 52px'
                                                                            },
                                                                            type: "tel",
                                                                            placeholder: t("phonePlaceholder"),
                                                                            value: phoneNumber,
                                                                            onChange: (e)=>setPhoneNumber(e.target.value.replace(/\D/g, "")),
                                                                            maxLength: "12",
                                                                            inputMode: "numeric"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                            lineNumber: 388,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                    lineNumber: 383,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 371,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            id: "recaptcha-container"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 400,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                    lineNumber: 369,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "auth-submit-btn",
                                                    onClick: handleSendOtp,
                                                    disabled: phoneLoading,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: phoneLoading ? t("sending") : t("sendCode")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 408,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        !phoneLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "18",
                                                            height: "18",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 411,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 410,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                    lineNumber: 403,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "auth-input-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "auth-label",
                                                            children: t("verificationCode")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 419,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "auth-input-wrapper",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "auth-input-icon",
                                                                    width: "20",
                                                                    height: "20",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                            x: "3",
                                                                            y: "8",
                                                                            width: "18",
                                                                            height: "14",
                                                                            rx: "2",
                                                                            ry: "2",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                            lineNumber: 422,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                            d: "M7 8V5a5 5 0 0 1 10 0v3",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                            lineNumber: 423,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                    lineNumber: 421,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    className: "auth-input",
                                                                    style: {
                                                                        padding: '16px 16px 16px 52px'
                                                                    },
                                                                    type: "text",
                                                                    placeholder: t("verificationCodePlaceholder"),
                                                                    value: otp,
                                                                    onChange: (e)=>setOtp(e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                    lineNumber: 425,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 420,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                    lineNumber: 418,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "auth-submit-btn",
                                                    onClick: handleVerifyOtp,
                                                    disabled: phoneLoading,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: phoneLoading ? t("verifying") : t("verifyAndLogin")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 440,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        !phoneLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            width: "18",
                                                            height: "18",
                                                            viewBox: "0 0 24 24",
                                                            fill: "none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "20 6 9 17 4 12",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 443,
                                                                columnNumber: 33
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 442,
                                                            columnNumber: 31
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                    lineNumber: 435,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "auth-back-btn",
                                                    onClick: ()=>setVerificationId(null),
                                                    children: t("back")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                    lineNumber: 447,
                                                    columnNumber: 27
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true)
                                    }, void 0, false)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                lineNumber: 230,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            authMode === "signup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-content-new",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "auth-description",
                                        children: t("signupSubtitle")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 462,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "auth-label",
                                                children: t("signupNameLabel")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 465,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-wrapper",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "auth-input-icon",
                                                        width: "20",
                                                        height: "20",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 468,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "12",
                                                                cy: "7",
                                                                r: "4",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 469,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 467,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "auth-input",
                                                        style: {
                                                            padding: '16px 16px 16px 52px'
                                                        },
                                                        type: "text",
                                                        value: displayName,
                                                        onChange: (e)=>setDisplayName(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 471,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 466,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 464,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "auth-label",
                                                children: t("email")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 482,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-wrapper",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "auth-input-icon",
                                                        width: "20",
                                                        height: "20",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 485,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                points: "22,6 12,13 2,6",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 486,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 484,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "auth-input",
                                                        style: {
                                                            padding: '16px 16px 16px 52px'
                                                        },
                                                        type: "email",
                                                        value: email,
                                                        onChange: (e)=>setEmail(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 488,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 483,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 481,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "auth-label",
                                                children: t("password")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 499,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-wrapper",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "auth-input-icon",
                                                        width: "20",
                                                        height: "20",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: "3",
                                                                y: "11",
                                                                width: "18",
                                                                height: "11",
                                                                rx: "2",
                                                                ry: "2",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 502,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M7 11V7a5 5 0 0 1 10 0v4",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 503,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 501,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "auth-input",
                                                        style: {
                                                            padding: '16px 16px 16px 52px'
                                                        },
                                                        type: "password",
                                                        value: password,
                                                        onChange: (e)=>setPassword(e.target.value),
                                                        minLength: 8,
                                                        autoComplete: "new-password"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 505,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 500,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "auth-password-requirement",
                                                "aria-live": "polite",
                                                children: t("passwordRequirement")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 515,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 498,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "auth-label",
                                                children: t("repeatNewPassword")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 519,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-wrapper",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "auth-input-icon",
                                                        width: "20",
                                                        height: "20",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                x: "3",
                                                                y: "11",
                                                                width: "18",
                                                                height: "11",
                                                                rx: "2",
                                                                ry: "2",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 522,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                d: "M7 11V7a5 5 0 0 1 10 0v4",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 523,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 521,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        className: "auth-input",
                                                        style: {
                                                            padding: '16px 16px 16px 52px'
                                                        },
                                                        type: "password",
                                                        value: passwordForm?.repeatNewPassword || "",
                                                        onChange: (e)=>setPasswordForm({
                                                                ...passwordForm,
                                                                repeatNewPassword: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 525,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 520,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 518,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-input-group",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "auth-label",
                                                children: t("phoneNumber")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 538,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-phone-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        className: "auth-country-select",
                                                        value: countryCode,
                                                        onChange: (e)=>setCountryCode(e.target.value),
                                                        children: countryCodes.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: c.code,
                                                                children: [
                                                                    c.name,
                                                                    " (",
                                                                    c.code,
                                                                    ")"
                                                                ]
                                                            }, c.code, true, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 546,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 540,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "auth-input-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "auth-input-icon",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                        x: "5",
                                                                        y: "2",
                                                                        width: "14",
                                                                        height: "20",
                                                                        rx: "2",
                                                                        ry: "2",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 553,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                                        x1: "12",
                                                                        y1: "18",
                                                                        x2: "12",
                                                                        y2: "18.01",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 554,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 552,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "auth-input",
                                                                style: {
                                                                    padding: '16px 16px 16px 52px'
                                                                },
                                                                type: "tel",
                                                                value: phoneNumber,
                                                                onChange: (e)=>setPhoneNumber(e.target.value.replace(/\D/g, "")),
                                                                maxLength: "12",
                                                                inputMode: "numeric"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 556,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 551,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 539,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 537,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-checkbox-group-new",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "checkbox",
                                                id: "agreeTermsNew",
                                                checked: agreedToTerms,
                                                onChange: (e)=>setAgreedToTerms(e.target.checked),
                                                className: "auth-checkbox-new"
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 572,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "agreeTermsNew",
                                                className: "auth-checkbox-label",
                                                children: [
                                                    t("agreeTo"),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                                        href: "/terms",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "auth-link-new",
                                                        children: t("termsOfService")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 580,
                                                        columnNumber: 38
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " ",
                                                    t("and"),
                                                    " ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Link, {
                                                        href: "/privacy",
                                                        target: "_blank",
                                                        rel: "noopener noreferrer",
                                                        className: "auth-link-new",
                                                        children: t("privacyPolicy")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 580,
                                                        columnNumber: 166
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 579,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 571,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    !confirmationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "auth-submit-btn",
                                        disabled: phoneLoading,
                                        onClick: async ()=>{
                                            if (!agreedToTerms) return showMessage(t("mustAgreeToTerms"), "error");
                                            if (!validateEmail(email)) return showMessage(t("enterValidEmail"), "error");
                                            if (!displayName.trim()) return showMessage(t("enterName"), "error");
                                            if (!validatePassword(password)) return showMessage(t("passwordTooShort"), "error");
                                            if (passwordForm?.repeatNewPassword !== password) return showMessage(t("passwordsDontMatch"), "error");
                                            const raw = phoneNumber.replace(/\D/g, "");
                                            if (!raw || raw.length < 5) return showMessage(t("enterValidPhone"), "error");
                                            const fullPhone = countryCode + raw;
                                            if (!validatePhone(fullPhone)) return showMessage(t("enterValidPhone"), "error");
                                            setPhoneLoading(true);
                                            try {
                                                const verifier = getSignupRecaptcha();
                                                const confirmation = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signInWithPhoneNumber"])(auth, fullPhone, verifier);
                                                setConfirmationResult(confirmation);
                                                showMessage(t("codeSent"), "success");
                                            } catch (err) {
                                                console.error(err);
                                                if (window.signupRecaptchaVerifier) {
                                                    try {
                                                        window.signupRecaptchaVerifier.clear();
                                                    } catch (e) {}
                                                    window.signupRecaptchaVerifier = null;
                                                }
                                                const signupContainer = document.getElementById("recaptcha-signup");
                                                if (signupContainer) signupContainer.innerHTML = "";
                                                showMessage(err?.message || err, "error");
                                            } finally{
                                                setPhoneLoading(false);
                                            }
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: t("createAccount")
                                            }, void 0, false, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 636,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "18",
                                                height: "18",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 638,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                        cx: "8.5",
                                                        cy: "7",
                                                        r: "4",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 639,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M20 8v6M23 11h-6",
                                                        stroke: "currentColor",
                                                        strokeWidth: "2",
                                                        strokeLinecap: "round"
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 640,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 637,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 585,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    confirmationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "auth-input-group",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "auth-label",
                                                        children: t("enterCode")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 648,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "auth-input-wrapper",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "auth-input-icon",
                                                                width: "20",
                                                                height: "20",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                        x: "3",
                                                                        y: "8",
                                                                        width: "18",
                                                                        height: "14",
                                                                        rx: "2",
                                                                        ry: "2",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        d: "M7 8V5a5 5 0 0 1 10 0v3",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "2"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                        lineNumber: 652,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 650,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                className: "auth-input",
                                                                style: {
                                                                    padding: '16px 16px 16px 52px'
                                                                },
                                                                type: "text",
                                                                placeholder: t("verificationCodePlaceholder"),
                                                                value: verificationCode,
                                                                onChange: (e)=>setVerificationCode(e.target.value.replace(/\D/g, "")),
                                                                maxLength: "6",
                                                                inputMode: "numeric"
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                                lineNumber: 654,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 649,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 647,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "auth-submit-btn",
                                                disabled: phoneLoading,
                                                onClick: async ()=>{
                                                    if (!/^\d{6}$/.test(verificationCode)) return showMessage(t("invalidCode"), "error");
                                                    setPhoneLoading(true);
                                                    try {
                                                        const result = await confirmationResult.confirm(verificationCode);
                                                        const user = result.user;
                                                        const { isNewUser } = getAdditionalUserInfo(result) || {};
                                                        try {
                                                            const emailCred = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmailAuthProvider"].credential(email, password);
                                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["linkWithCredential"])(user, emailCred);
                                                            if (displayName.trim()) {
                                                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateProfile"])(user, {
                                                                    displayName: displayName.trim()
                                                                });
                                                            }
                                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, `users/${user.uid}`), {
                                                                name: displayName.trim() || null,
                                                                email: user.email,
                                                                phone: normalizePhoneForStorage(countryCode + phoneNumber),
                                                                createdAt: Date.now(),
                                                                subscribedToMarketing: true
                                                            });
                                                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendEmailVerification"])(user);
                                                            showMessage(t("signupSuccess"), "success");
                                                            setAuthMode("verify");
                                                            setConfirmationResult(null);
                                                            setVerificationCode("");
                                                        } catch (innerErr) {
                                                            console.error("Signup incomplete, rolling back user creation:", innerErr);
                                                            if (isNewUser) {
                                                                await user.delete().catch((cleanupErr)=>console.error("Failed to cleanup user:", cleanupErr));
                                                            }
                                                            setConfirmationResult(null);
                                                            setVerificationCode("");
                                                            if (window.signupRecaptchaVerifier) {
                                                                try {
                                                                    window.signupRecaptchaVerifier.clear();
                                                                } catch (e) {}
                                                                window.signupRecaptchaVerifier = null;
                                                            }
                                                            throw innerErr;
                                                        }
                                                    } catch (err) {
                                                        console.error(err);
                                                        showMessage(err, "error");
                                                    } finally{
                                                        setPhoneLoading(false);
                                                    }
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("verifyPhone")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 736,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        width: "18",
                                                        height: "18",
                                                        viewBox: "0 0 24 24",
                                                        fill: "none",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                            points: "20 6 9 17 4 12",
                                                            stroke: "currentColor",
                                                            strokeWidth: "2",
                                                            strokeLinecap: "round",
                                                            strokeLinejoin: "round"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                            lineNumber: 738,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                        lineNumber: 737,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                                lineNumber: 669,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        id: "recaptcha-signup",
                                        className: "recaptcha"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 744,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                lineNumber: 461,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            authMode === "verify" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "auth-verify-content",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "auth-verify-icon",
                                        children: "✉️"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 750,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "auth-verify-title",
                                        children: t("verifyYourEmail")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 751,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "auth-verify-text",
                                        children: t("verifyEmailHint")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 752,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAuthModal(false),
                                        className: "auth-submit-btn",
                                        children: t("close")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                        lineNumber: 753,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                                lineNumber: 749,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                        lineNumber: 228,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/AuthModal.jsx",
                lineNumber: 190,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/lsm2/src/components/AuthModal.jsx",
            lineNumber: 183,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/lsm2/src/components/AuthModal.jsx",
        lineNumber: 181,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthModal, "D5Re5Rrpttgr6wNp3w5uWnZ3GC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c1 = AuthModal;
const __TURBOPACK__default__export__ = AuthModal;
var _c, _c1;
__turbopack_context__.k.register(_c, "Link");
__turbopack_context__.k.register(_c1, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lsm2_src_components_AuthModal_jsx_52c93190._.js.map