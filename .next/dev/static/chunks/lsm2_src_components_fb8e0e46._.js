(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lsm2/src/components/DualRangeSlider.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const DualRangeSlider = ({ min, max, value, onChange, currency = "EUR" })=>{
    _s();
    const [minInput, setMinInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value.min);
    const [maxInput, setMaxInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(value.max);
    const minValRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value.min);
    const maxValRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(value.max);
    const range = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sliderContainer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DualRangeSlider.useEffect": ()=>{
            setMinInput(value.min);
            setMaxInput(value.max);
            minValRef.current = value.min;
            maxValRef.current = value.max;
        }
    }["DualRangeSlider.useEffect"], [
        value.min,
        value.max
    ]);
    const getPercent = (val)=>Math.round((val - min) / (max - min) * 100);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DualRangeSlider.useEffect": ()=>{
            const minPercent = getPercent(value.min);
            const maxPercent = getPercent(value.max);
            if (range.current) {
                range.current.style.left = `${minPercent}%`;
                range.current.style.width = `${maxPercent - minPercent}%`;
            }
        }
    }["DualRangeSlider.useEffect"], [
        value.min,
        value.max,
        min,
        max
    ]);
    const handleMinInputChange = (e)=>{
        setMinInput(e.target.value);
    };
    const handleMaxInputChange = (e)=>{
        setMaxInput(e.target.value);
    };
    const commitMinInput = ()=>{
        let val = Number(minInput);
        if (isNaN(val) || minInput === "" || val < min) val = min;
        val = Math.max(min, Math.min(val, Math.max(min, value.max - 1)));
        setMinInput(val);
        minValRef.current = val;
        onChange({
            min: val,
            max: value.max
        });
    };
    const commitMaxInput = ()=>{
        let val = Number(maxInput);
        if (isNaN(val) || maxInput === "" || val > max) val = max;
        val = Math.min(max, Math.max(val, Math.min(max, value.min + 1)));
        setMaxInput(val);
        maxValRef.current = val;
        onChange({
            min: value.min,
            max: val
        });
    };
    const handleKeyDown = (e, type)=>{
        if (e.key === "Enter") {
            if (type === "min") commitMinInput();
            else commitMaxInput();
            e.target.blur();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "price-slider-new",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "price-slider-inputs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-slider-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "price-slider-label",
                                children: "Minimum"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "price-slider-input-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "price-slider-currency",
                                        children: currency
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                        lineNumber: 73,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: min,
                                        max: max,
                                        value: minInput,
                                        onChange: handleMinInputChange,
                                        onBlur: commitMinInput,
                                        onKeyDown: (e)=>handleKeyDown(e, "min"),
                                        className: "price-slider-number-input",
                                        "aria-label": "Minimum price"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                        lineNumber: 74,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-slider-divider",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            width: "24",
                            height: "24",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M8 12h8M12 8l4 4-4 4",
                                stroke: "currentColor",
                                strokeWidth: "2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-slider-field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "price-slider-label",
                                children: "Maximum"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 95,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "price-slider-input-wrapper",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "price-slider-currency",
                                        children: currency
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                        lineNumber: 97,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: min,
                                        max: max,
                                        value: maxInput,
                                        onChange: handleMaxInputChange,
                                        onBlur: commitMaxInput,
                                        onKeyDown: (e)=>handleKeyDown(e, "max"),
                                        className: "price-slider-number-input",
                                        "aria-label": "Maximum price"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                        lineNumber: 98,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                lineNumber: 69,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "price-slider-track-container",
                ref: sliderContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: min,
                        max: max,
                        value: Math.max(min, Math.min(value.min, value.max - 1)),
                        onChange: (event)=>{
                            const newMin = Math.max(min, Math.min(Number(event.target.value), value.max - 1));
                            minValRef.current = newMin;
                            onChange({
                                min: newMin,
                                max: value.max
                            });
                        },
                        className: "price-slider-thumb price-slider-thumb-left",
                        style: {
                            zIndex: value.min > max - 100 ? 5 : 3
                        },
                        "aria-label": "Minimum price slider"
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "range",
                        min: min,
                        max: max,
                        value: Math.min(max, Math.max(value.max, value.min + 1)),
                        onChange: (event)=>{
                            const newMax = Math.min(max, Math.max(Number(event.target.value), value.min + 1));
                            maxValRef.current = newMax;
                            onChange({
                                min: value.min,
                                max: newMax
                            });
                        },
                        className: "price-slider-thumb price-slider-thumb-right",
                        style: {
                            zIndex: 4
                        },
                        "aria-label": "Maximum price slider"
                    }, void 0, false, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "price-slider-track-wrapper",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "price-slider-track"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: range,
                                className: "price-slider-range"
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/lsm2/src/components/DualRangeSlider.jsx",
        lineNumber: 67,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DualRangeSlider, "m8f35XJEF+w/PisZe25j0/LUzkU=");
_c = DualRangeSlider;
const __TURBOPACK__default__export__ = DualRangeSlider;
var _c;
__turbopack_context__.k.register(_c, "DualRangeSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lsm2/src/components/PostListingDrawer.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/context/AppContext.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/constants.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$DualRangeSlider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/src/components/DualRangeSlider.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/lsm2/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lsm2/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const NorthMacedoniaMap = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/lsm2/src/NorthMacedoniaMap.jsx [app-client] (ecmascript, async loader)"));
_c = NorthMacedoniaMap;
const API_BASE = ("TURBOPACK compile-time value", "object") !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? "http://localhost:5000" : "https://lsm-wozo.onrender.com";
const PostListingDrawer = ()=>{
    _s();
    const { t, user, userProfile, showPostForm, setShowPostForm, form, setForm, showMessage, auth, db, stripDangerous, formatOfferPrice, buildLocationString, MK_CITIES, setLoading, setSelectedTab, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [showMapPicker, setShowMapPicker] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const accountPhone = userProfile?.phone || "";
    // Helpers
    const validatePhone = (s)=>!!s && s.replace(/\D/g, "").length >= 8 && s.replace(/\D/g, "").length <= 16;
    const normalizePhoneForStorage = (raw)=>{
        if (!raw) return raw;
        const trimmed = raw.trim();
        if (trimmed.startsWith("+")) return trimmed.replace(/\s+/g, "");
        return trimmed.replace(/\s+/g, "");
    };
    const handleImageUpload = (e)=>{
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        const currentImages = form.images || [];
        if (currentImages.length + files.length > 4) {
            showMessage(t("maxImagesError"), "error");
            return;
        }
        files.forEach((file)=>{
            const reader = new FileReader();
            reader.onload = (ev)=>{
                const img = new Image();
                img.onload = ()=>{
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
                    setForm((prev)=>{
                        const newImages = [
                            ...prev.images || [],
                            dataUrl
                        ];
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
    const handleRemoveImage = (index)=>{
        setForm((prev)=>{
            const newImages = [
                ...prev.images || []
            ];
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
        const planId = String(obj.plan || "1");
        const listingData = {
            ...obj,
            id: listingId,
            userId: user?.uid || null,
            userEmail: user?.email || null,
            createdAt: Date.now(),
            expiresAt: Date.now() + parseInt(planId) * 30 * 24 * 60 * 60 * 1000,
            views: 0,
            contacts: 0
        };
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["set"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(db, `listings/${listingId}`), listingData);
        return listingId;
    }
    const handleSubmit = async (e)=>{
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
            const selectedPlan = __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLANS"].find((p)=>p.id === planId) || __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLANS"][0];
            const listingId = await createListingInFirebase({
                ...form,
                category: form.category,
                contact: phoneForListing,
                location: finalLocation,
                locationCity: form.locationCity,
                locationExtra: form.locationExtra,
                plan: planId,
                offerprice: offerpriceStr || "",
                status: "unpaid",
                pricePaid: 0,
                price: selectedPlan.priceVal
            });
            // Initiate Payment - Original Redirect Implementation
            try {
                // Pre-warm connection to payment API
                const controller = new AbortController();
                const timeoutId = setTimeout(()=>controller.abort(), 10000); // 10 second timeout
                const res = await fetch(`${API_BASE}/api/create-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        listingId,
                        type: "create",
                        userId: user?.uid,
                        customerEmail: user?.email,
                        customerName: userProfile?.name || user?.displayName,
                        plan: planId
                    }),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (!res.ok) {
                    throw new Error(`Payment API error: ${res.status}`);
                }
                const data = await res.json();
                if (data.success && data.isFreeTrial) {
                    showMessage(t("listingCreatedSuccessFreeTrial"), "success");
                    setShowPostForm(false);
                    window.location.reload();
                    return;
                }
                if (data.checkoutUrl) {
                    // Show notification before redirecting
                    showMessage(t("redirectingToPayment") || "Redirecting to payment...", "info");
                    // Redirect immediately without delay
                    setTimeout(()=>{
                        window.location.href = data.checkoutUrl;
                    }, 100);
                    return;
                } else {
                    throw new Error("Payment initialization failed: No checkout URL");
                }
            } catch (paymentErr) {
                if (paymentErr.name === 'AbortError') {
                    console.error("Payment request timeout:", paymentErr);
                    showMessage(t("paymentTimeout") || "Payment request timed out", "error");
                } else {
                    console.error("Payment error:", paymentErr);
                    showMessage(t("listingSavedUnpaid") || "Listing saved but payment failed", "error");
                }
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
        } finally{
            setLoading(false);
        }
    };
    const previewLocation = buildLocationString(form.locationCity, form.locationExtra);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showPostForm && user && user.emailVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "modal-overlay fullscreen-modal",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setShowPostForm(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "modal post-form-fullscreen",
                        onClick: (e)=>e.stopPropagation(),
                        initial: {
                            scale: 0.9,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        exit: {
                            scale: 0.9,
                            opacity: 0
                        },
                        transition: {
                            type: "tween",
                            duration: 0.3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "modal-title",
                                        children: [
                                            "📝 ",
                                            t("submitListing")
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 281,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-btn",
                                        onClick: ()=>setShowPostForm(false),
                                        "aria-label": t("close"),
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 282,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                lineNumber: 280,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-body",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "form-section",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title",
                                            children: [
                                                "📝 ",
                                                t("submitListing")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 293,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "step-indicators-grid",
                                            children: [
                                                1,
                                                2,
                                                3
                                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `step-indicator ${form.step === s ? "selected" : ""}`,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "plan-content",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "plan-duration",
                                                            children: s === 1 ? t("stepBasic") : s === 2 ? t("stepDetails") : t("stepPlanPreview")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 303,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                        lineNumber: 302,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, s, false, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 298,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 296,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        form.step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            className: "form",
                                            onSubmit: (e)=>{
                                                e.preventDefault();
                                                if (!form.name || !form.category || !form.locationCity) return showMessage(t("fillAllFields"), "error");
                                                setForm({
                                                    ...form,
                                                    step: 2
                                                });
                                                // Scroll to top of modal
                                                const modalBody = document.querySelector('.post-form-drawer .modal-body');
                                                if (modalBody) {
                                                    modalBody.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("name")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 332,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "input",
                                                            placeholder: t("namePlaceholder"),
                                                            value: form.name,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    name: stripDangerous(e.target.value).slice(0, 100)
                                                                }),
                                                            maxLength: "100",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 333,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("nameFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 346,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 331,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("category")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 350,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "select category-dropdown",
                                                            value: form.category,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    category: e.target.value
                                                                }),
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: t("selectCategory")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 357,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["categoryGroups"].map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("optgroup", {
                                                                        label: t(group.labelKey),
                                                                        children: group.categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                value: cat,
                                                                                children: t(cat) || cat
                                                                            }, cat, false, {
                                                                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                lineNumber: 361,
                                                                                columnNumber: 41
                                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                                    }, group.id, false, {
                                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                        lineNumber: 359,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 351,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("categoryFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 366,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 349,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "location-picker field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("location")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 371,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            className: "select city-dropdown",
                                                            value: form.locationCity,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    locationCity: e.target.value || ""
                                                                }),
                                                            required: true,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "",
                                                                    children: t("selectCity")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 384,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                MK_CITIES.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: city,
                                                                        children: t(city) || city
                                                                    }, city, false, {
                                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 33
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 373,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "input mt-sm",
                                                            placeholder: t("locationExtra"),
                                                            maxLength: "100",
                                                            value: form.locationExtra,
                                                            onChange: (e)=>{
                                                                const extra = stripDangerous(e.target.value).slice(0, 100);
                                                                setForm({
                                                                    ...form,
                                                                    locationExtra: extra
                                                                });
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 393,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn btn-ghost small mt-sm",
                                                            onClick: ()=>setShowMapPicker(true),
                                                            children: t("chooseOnMap")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 409,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("locationFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 416,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 370,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "submit-form-actions",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "submit",
                                                        className: "btn",
                                                        children: t("continue")
                                                    }, void 0, false, {
                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                        lineNumber: 420,
                                                        columnNumber: 29
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 419,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 317,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        form.step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            className: "form",
                                            onSubmit: (e)=>{
                                                e.preventDefault();
                                                const phoneForListing = accountPhone || form.contact;
                                                if (!form.description || !phoneForListing) return showMessage(t("addPhoneInAccount"), "error");
                                                if (!validatePhone(phoneForListing)) return showMessage(t("enterValidPhone"), "error");
                                                setForm({
                                                    ...form,
                                                    contact: phoneForListing,
                                                    step: 3
                                                });
                                                // Scroll to top of modal
                                                const modalBody = document.querySelector('.post-form-drawer .modal-body');
                                                if (modalBody) {
                                                    modalBody.scrollTo({
                                                        top: 0,
                                                        behavior: 'smooth'
                                                    });
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("description")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 447,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            className: "textarea",
                                                            placeholder: t("descriptionPlaceholder"),
                                                            value: form.description,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    description: stripDangerous(e.target.value).slice(0, 1000)
                                                                }),
                                                            maxLength: "1000",
                                                            required: true
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 448,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("descriptionFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 461,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 446,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "contact-summary field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "contact-summary-main",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "field-label",
                                                                    children: t("contact")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 466,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "contact-number",
                                                                    children: accountPhone || t("addPhoneInAccount")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 467,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "contact-hint",
                                                                    children: t("contactAutofill")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 470,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 465,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "contact-summary-actions",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                className: "btn btn-ghost small",
                                                                onClick: ()=>{
                                                                    if (accountPhone) {
                                                                        setForm((f)=>({
                                                                                ...f,
                                                                                contact: accountPhone
                                                                            }));
                                                                        showMessage(t("phoneSynced"), "success");
                                                                    } else {
                                                                        setShowPostForm(false);
                                                                        showMessage(t("addPhoneInAccount"), "error");
                                                                        // Navigate to account page
                                                                        setTimeout(()=>{
                                                                            window.location.href = "/account";
                                                                        }, 500);
                                                                    }
                                                                },
                                                                children: accountPhone ? t("useAccountPhone") : t("goToAccount")
                                                            }, void 0, false, {
                                                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                lineNumber: 475,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 474,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 464,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "modern-price-section field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("priceRange")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 499,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "price-range-container",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "currency-selector-wrapper",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                            className: "currency-label",
                                                                            children: t("currency")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 502,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                            className: "select currency-select",
                                                                            value: form.offerCurrency,
                                                                            onChange: (e)=>{
                                                                                const updated = {
                                                                                    ...form,
                                                                                    offerCurrency: e.target.value
                                                                                };
                                                                                updated.offerprice = formatOfferPrice(updated.offerMin, updated.offerMax, updated.offerCurrency);
                                                                                setForm(updated);
                                                                            },
                                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["currencyOptions"].map((cur)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                                    value: cur,
                                                                                    children: cur
                                                                                }, cur, false, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 517,
                                                                                    columnNumber: 45
                                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 503,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "slider-wrapper",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$components$2f$DualRangeSlider$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                        min: 0,
                                                                        max: 20000,
                                                                        value: {
                                                                            min: Number(form.offerMin) || 0,
                                                                            max: Number(form.offerMax) || 0
                                                                        },
                                                                        onChange: ({ min, max })=>{
                                                                            const updated = {
                                                                                ...form,
                                                                                offerMin: min,
                                                                                offerMax: max
                                                                            };
                                                                            updated.offerprice = formatOfferPrice(min, max, updated.offerCurrency);
                                                                            setForm(updated);
                                                                        },
                                                                        currency: form.offerCurrency || "EUR"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                        lineNumber: 524,
                                                                        columnNumber: 37
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 523,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                form.offerprice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "price-preview",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "price-preview-label",
                                                                            children: [
                                                                                t("preview"),
                                                                                ":"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 542,
                                                                            columnNumber: 41
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "price-preview-value",
                                                                            children: form.offerprice
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 543,
                                                                            columnNumber: 41
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 541,
                                                                    columnNumber: 37
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 500,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("priceRangeFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 547,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 498,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("tags")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 551,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "input",
                                                            placeholder: t("tagsPlaceholder"),
                                                            value: form.tags,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    tags: stripDangerous(e.target.value).slice(0, 64)
                                                                }),
                                                            maxLength: "64"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 552,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("tagsFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 564,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 550,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("socialLink")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 568,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            className: "input",
                                                            placeholder: t("socialPlaceholder"),
                                                            value: form.socialLink,
                                                            onChange: (e)=>setForm({
                                                                    ...form,
                                                                    socialLink: stripDangerous(e.target.value).slice(0, 200)
                                                                }),
                                                            maxLength: "200"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 569,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("socialLinkFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 581,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 567,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "field-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "field-label",
                                                            children: t("images")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 585,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "post-images",
                                                            className: "btn btn-secondary upload-button",
                                                            style: {
                                                                display: 'inline-flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '0.5rem',
                                                                cursor: 'pointer',
                                                                width: '100%',
                                                                minHeight: '52px',
                                                                fontSize: '1rem',
                                                                fontWeight: 600
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    "aria-hidden": "true",
                                                                    children: "📷"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 601,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                t("clickToUpload")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 586,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "field-hint",
                                                            children: t("imagesFieldHint")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 604,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "post-images",
                                                            type: "file",
                                                            accept: "image/*",
                                                            multiple: true,
                                                            style: {
                                                                display: "none"
                                                            },
                                                            onChange: handleImageUpload
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 605,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        form.images && form.images.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "image-preview-grid",
                                                            children: form.images.map((img, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "preview-item",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: img,
                                                                            alt: `${t("uploadAlt")} ${idx + 1}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 618,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            type: "button",
                                                                            className: "preview-remove-btn",
                                                                            onClick: ()=>handleRemoveImage(idx),
                                                                            children: "×"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 622,
                                                                            columnNumber: 37
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, idx, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 617,
                                                                    columnNumber: 33
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 615,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 584,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "submit-form-actions",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "btn btn-ghost",
                                                            onClick: ()=>{
                                                                setForm({
                                                                    ...form,
                                                                    step: 1
                                                                });
                                                                // Scroll to top of modal
                                                                const modalBody = document.querySelector('.post-form-drawer .modal-body');
                                                                if (modalBody) {
                                                                    modalBody.scrollTo({
                                                                        top: 0,
                                                                        behavior: 'smooth'
                                                                    });
                                                                }
                                                            },
                                                            children: t("back")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 636,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            className: "btn",
                                                            children: t("continue")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 650,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 635,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 429,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        form.step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                            className: "form",
                                            onSubmit: handleSubmit,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "preview-card",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "listing-header",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "listing-title",
                                                                    children: form.name || t("previewTitlePlaceholder")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 663,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "badge verified",
                                                                    children: [
                                                                        "✓ ",
                                                                        t("verified")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 666,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 662,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "listing-meta",
                                                            children: [
                                                                t(form.category) || form.category || t("unspecified"),
                                                                " •",
                                                                " ",
                                                                previewLocation || t("unspecified")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 669,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        form.imagePreview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: form.imagePreview,
                                                            alt: t("previewAlt"),
                                                            className: "preview-image"
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 675,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "listing-description",
                                                            children: form.description || t("previewDescriptionPlaceholder")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 682,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "listing-meta listing-meta-preview",
                                                            children: [
                                                                form.offerprice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        "💶 ",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: form.offerprice
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 689,
                                                                            columnNumber: 36
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        "  "
                                                                    ]
                                                                }, void 0, true),
                                                                form.tags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        "🏷️ ",
                                                                        form.tags
                                                                    ]
                                                                }, void 0, true)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 686,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 661,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "plan-selection-section",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "plan-selection-title",
                                                            children: t("getVisibleToLocalCustomers")
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 698,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        user && userProfile && !userProfile.hasUsedFreeTrial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "free-trial-banner",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "free-trial-icon",
                                                                    children: "🎁"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 702,
                                                                    columnNumber: 32
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "free-trial-content",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: t("freeTrialAvailable")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 704,
                                                                            columnNumber: 34
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: t("freeTrialDesc")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 705,
                                                                            columnNumber: 34
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 703,
                                                                    columnNumber: 32
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 701,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "plan-selection-grid",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PLANS"].map((plan)=>{
                                                                const isFreeTrialEligible = user && userProfile && !userProfile.hasUsedFreeTrial && plan.id === "1";
                                                                const isFeaturedPlan = plan.id === "12";
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `plan-option ${form.plan === plan.id ? 'selected' : ''} ${isFeaturedPlan ? 'plan-option--featured' : ''}`,
                                                                    onClick: ()=>setForm({
                                                                            ...form,
                                                                            plan: plan.id
                                                                        }),
                                                                    children: [
                                                                        isFeaturedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "plan-option-featured-glow",
                                                                            "aria-hidden": "true"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 720,
                                                                            columnNumber: 52
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "plan-option-content",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "plan-name-row",
                                                                                    children: [
                                                                                        t(`month${plan.id}`),
                                                                                        isFeaturedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "plan-badge-featured",
                                                                                            children: t("featured")
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                            lineNumber: 724,
                                                                                            columnNumber: 56
                                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                                        isFreeTrialEligible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "plan-badge-free",
                                                                                            children: t("free")
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                            lineNumber: 726,
                                                                                            columnNumber: 39
                                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 722,
                                                                                    columnNumber: 35
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "plan-duration",
                                                                                    children: t(`days${plan.duration.split(' ')[0]}`)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 731,
                                                                                    columnNumber: 35
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                isFeaturedPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "plan-featured-duration-note",
                                                                                    children: t("featuredDurationNote")
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 732,
                                                                                    columnNumber: 54
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 721,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "plan-price-column",
                                                                            children: isFreeTrialEligible ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "plan-price-original",
                                                                                        children: plan.price
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                        lineNumber: 737,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "plan-price-final",
                                                                                        children: t("zeroEur")
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                        lineNumber: 738,
                                                                                        columnNumber: 41
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "plan-price-final",
                                                                                children: plan.price
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                lineNumber: 741,
                                                                                columnNumber: 39
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 734,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, plan.id, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 715,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 710,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        form.plan === "12" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "featured-cta-block",
                                                            role: "region",
                                                            "aria-labelledby": "featured-cta-title",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                    id: "featured-cta-title",
                                                                    className: "featured-cta-title",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "featured-cta-icon",
                                                                            "aria-hidden": "true",
                                                                            children: "✨"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 751,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        t("featuredCtaTitle")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 750,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "featured-cta-desc",
                                                                    children: t("featuredCtaDesc")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                    className: "featured-cta-benefits",
                                                                    "aria-label": t("featuredBenefitsTooltip"),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "featured-cta-check",
                                                                                    "aria-hidden": "true",
                                                                                    children: "✓"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 756,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                " ",
                                                                                t("featuredListingsGetMoreViews")
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 756,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "featured-cta-check",
                                                                                    "aria-hidden": "true",
                                                                                    children: "✓"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                                    lineNumber: 757,
                                                                                    columnNumber: 37
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                " ",
                                                                                t("featuredBenefitsTooltip")
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 757,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 755,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "featured-cta-cta",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                            children: t("featuredCtaCta")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                            lineNumber: 760,
                                                                            columnNumber: 33
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        " — ",
                                                                        t("featuredPlanLabel")
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                                    lineNumber: 759,
                                                                    columnNumber: 31
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 749,
                                                            columnNumber: 29
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 697,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    className: "btn submit",
                                                    disabled: loading,
                                                    children: loading ? `⏳ ${t("loading")}` : t("createListing")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 766,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 659,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "card trust-section",
                                            style: {
                                                marginTop: "5%",
                                                height: "fit-content"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "section-title",
                                                    children: t("whyTrustUs")
                                                }, void 0, false, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 779,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "trust-list",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                "✅ ",
                                                                t("trustPoint1")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 783,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                "✅ ",
                                                                t("trustPoint2")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 784,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                "✅ ",
                                                                t("trustPoint3")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 785,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            children: [
                                                                "✅ ",
                                                                t("trustPoint4")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                            lineNumber: 786,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                                    lineNumber: 782,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                            lineNumber: 778,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                    lineNumber: 292,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                lineNumber: 291,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                        lineNumber: 272,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                    lineNumber: 265,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                lineNumber: 263,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showMapPicker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "modal-overlay",
                    initial: {
                        opacity: 0
                    },
                    animate: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    onClick: ()=>setShowMapPicker(false),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: "modal map-modal",
                        onClick: (e)=>e.stopPropagation(),
                        initial: {
                            scale: 0.95,
                            opacity: 0
                        },
                        animate: {
                            scale: 1,
                            opacity: 1
                        },
                        exit: {
                            scale: 0.95,
                            opacity: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-header",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "modal-title",
                                        children: t("chooseOnMap")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 813,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-btn",
                                        onClick: ()=>setShowMapPicker(false),
                                        "aria-label": t("close"),
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 816,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                lineNumber: 812,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "modal-body",
                                style: {
                                    maxHeight: "70vh",
                                    overflow: "hidden"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "map-loading",
                                        children: t("loadingMap")
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 826,
                                        columnNumber: 37
                                    }, void 0),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NorthMacedoniaMap, {
                                        selectedCity: form.locationCity,
                                        onSelectCity: (cityName)=>{
                                            setForm((f)=>({
                                                    ...f,
                                                    locationCity: cityName
                                                }));
                                            showMessage(`${t("locationSetTo")} ${cityName}`, "success");
                                            setShowMapPicker(false);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                        lineNumber: 827,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                    lineNumber: 826,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                                lineNumber: 825,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                        lineNumber: 805,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                    lineNumber: 798,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/lsm2/src/components/PostListingDrawer.jsx",
                lineNumber: 796,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
_s(PostListingDrawer, "3WrlNXE4ZUbgImeeIzPwnu5sHfE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lsm2$2f$src$2f$context$2f$AppContext$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c1 = PostListingDrawer;
const __TURBOPACK__default__export__ = PostListingDrawer;
var _c, _c1;
__turbopack_context__.k.register(_c, "NorthMacedoniaMap");
__turbopack_context__.k.register(_c1, "PostListingDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=lsm2_src_components_fb8e0e46._.js.map