"use client";
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

const GoogleAd = ({ className, style, slot }) => {
  const { t } = useApp();
  const adRef = useRef(null);
  const adPushed = useRef(false);

  useEffect(() => {
    // Wait for AdSense script to load
    const initAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle && !adPushed.current && adRef.current) {
          // Check if this ad unit hasn't been initialized
          const adElement = adRef.current.querySelector('.adsbygoogle');
          if (adElement && !adElement.dataset.adsbygoogleStatus) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            adPushed.current = true;
          }
        }
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    // Try immediately
    initAd();

    // Also try after a short delay in case script is still loading
    const timer = setTimeout(initAd, 100);

    // Listen for AdSense script load
    const checkAdSense = setInterval(() => {
      if (window.adsbygoogle && !adPushed.current) {
        initAd();
        clearInterval(checkAdSense);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(checkAdSense);
    };
  }, []);

  return (
    <div 
      ref={adRef}
      className={`google-ad-wrapper ${className || ''}`} 
      style={{ 
        ...style, 
        background: '#f8fafc', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px', 
        overflow: 'hidden', 
        position: 'relative',
        minHeight: style?.minHeight || '250px'
      }}
    >
       <ins 
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%", minHeight: style?.minHeight || '250px' }}
          data-ad-client="ca-pub-8385998516338936"
          data-ad-slot={slot || "1802538697"}
          data-ad-format="auto"
          data-full-width-responsive="true"
       ></ins>
       {/* Placeholder text visible only when ad script not loaded/blocked */}
       <div style={{ 
         position: 'absolute', 
         pointerEvents: 'none', 
         color: '#cbd5e1', 
         fontSize: '0.75rem', 
         zIndex: 0,
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)'
       }}>
         {t("advertisement")}
       </div>
    </div>
  );
};

export default GoogleAd;
