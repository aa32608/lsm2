"use client";
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

const GoogleAd = ({ className, style, slot }) => {
  const { t } = useApp();
  const adRef = useRef(null);
  const adPushed = useRef(false);

  useEffect(() => {
    if (!adRef.current || adPushed.current) return;

    // Function to initialize the ad - matches Google's exact code structure
    const initAd = () => {
      try {
        if (typeof window === "undefined") return;
        
        const adElement = adRef.current?.querySelector('.adsbygoogle');
        if (!adElement) return;

        // Check if already initialized
        if (adElement.dataset.adsbygoogleStatus === 'done') {
          return;
        }

        // Wait for AdSense script to be loaded
        if (!window.adsbygoogle) {
          return;
        }

        // Initialize exactly as Google's code: (adsbygoogle = window.adsbygoogle || []).push({});
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          adPushed.current = true;
        } catch (e) {
          console.error('[GoogleAd] Error pushing ad:', e);
        }
      } catch (e) {
        console.error('[GoogleAd] Init error:', e);
      }
    };

    // Try immediately if script is loaded
    if (typeof window !== "undefined" && window.adsbygoogle) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(initAd, 50);
      return () => clearTimeout(timer);
    }

    // Wait for script to load
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkScript = setInterval(() => {
      attempts++;
      
      if (typeof window !== "undefined" && window.adsbygoogle) {
        clearInterval(checkScript);
        setTimeout(initAd, 100);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkScript);
      }
    }, 200);

    return () => {
      clearInterval(checkScript);
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
       {/* Google's exact ad unit structure */}
       <ins 
          className="adsbygoogle"
          style={{ 
            display: "block", 
            width: "100%", 
            minHeight: style?.minHeight || '250px'
          }}
          data-ad-client="ca-pub-8385998516338936"
          data-ad-slot={slot || "1802538697"}
          data-ad-format="auto"
          data-full-width-responsive="true"
       ></ins>
       {/* Placeholder - will be hidden when ad loads */}
       <div 
         className="ad-placeholder"
         style={{ 
           position: 'absolute', 
           pointerEvents: 'none', 
           color: '#cbd5e1', 
           fontSize: '0.75rem', 
           zIndex: 1,
           top: '50%',
           left: '50%',
           transform: 'translate(-50%, -50%)'
         }}
       >
         {t("advertisement")}
       </div>
    </div>
  );
};

export default GoogleAd;
