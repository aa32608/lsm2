"use client";
import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

const GoogleAd = ({ className, style, slot }) => {
  const { t } = useApp();
  const adRef = useRef(null);
  const adPushed = useRef(false);
  const [adLoaded, setAdLoaded] = React.useState(false);

  useEffect(() => {
    // Reset state when slot changes
    adPushed.current = false;
    setAdLoaded(false);
    let mounted = true;

    if (!adRef.current) return;

    let checkInterval = null;
    let timeoutId = null;
    let observer = null;

    // Function to initialize the ad - matches Google's exact code structure
    const initAd = () => {
      try {
        if (typeof window === "undefined") return false;
        if (!mounted || !adRef.current) return false;
        
        const adElement = adRef.current?.querySelector('.adsbygoogle');
        if (!adElement) return false;

        // Check if already initialized
        const status = adElement.dataset.adsbygoogleStatus;
        if (status === 'done' || status === 'filled') {
          adPushed.current = true;
          setAdLoaded(true);
          return true;
        }

        // Don't re-initialize if already pushed
        if (adPushed.current) {
          return false;
        }

        // Wait for AdSense script to be loaded
        if (!window.adsbygoogle) {
          return false; // Not ready yet
        }

        // Initialize exactly as Google's code: (adsbygoogle = window.adsbygoogle || []).push({});
        // Each ad unit needs its own push call
        // Make sure the element is in the DOM and has all attributes before pushing
        try {
          // Verify element is ready and in the document (avoids "no_div" when script runs before mount)
          if (!adElement.parentElement || !document.body.contains(adElement)) {
            return false;
          }
          
          // Push to AdSense queue (wrap to catch no_div / slot errors)
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (adErr) {
            if (adErr?.message !== 'no_div') console.warn('[GoogleAd] push error:', adErr);
            return false;
          }
          adPushed.current = true;
          
          // Monitor when ad loads
          observer = new MutationObserver(() => {
            const currentStatus = adElement.dataset.adsbygoogleStatus;
            if (currentStatus === 'done' || currentStatus === 'filled') {
              setAdLoaded(true);
              if (observer) {
                observer.disconnect();
                observer = null;
              }
            }
          });
          observer.observe(adElement, { 
            attributes: true, 
            attributeFilter: ['data-adsbygoogle-status'] 
          });
          
          // Also check periodically in case MutationObserver doesn't fire
          setTimeout(() => {
            const currentStatus = adElement.dataset.adsbygoogleStatus;
            if (currentStatus === 'done' || currentStatus === 'filled') {
              setAdLoaded(true);
            }
          }, 2000);
          
          return true; // Successfully initialized
        } catch (e) {
          console.error('[GoogleAd] Error pushing ad:', e);
          return false;
        }
      } catch (e) {
        console.error('[GoogleAd] Init error:', e);
        return false;
      }
    };

    // Wait for DOM to be ready, then try to initialize
    timeoutId = setTimeout(() => {
      // Try immediately if script is loaded
      if (typeof window !== "undefined" && window.adsbygoogle) {
        if (initAd()) {
          return; // Successfully initialized
        }
      }

      // Wait for script to load
      let attempts = 0;
      const maxAttempts = 150; // Increased attempts for slower connections
      
      checkInterval = setInterval(() => {
        attempts++;
        
        if (typeof window !== "undefined" && window.adsbygoogle) {
          if (initAd()) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
        } else if (attempts >= maxAttempts) {
          clearInterval(checkInterval);
          checkInterval = null;
          console.warn('[GoogleAd] AdSense script not loaded after maximum attempts');
        }
      }, 100); // Check every 100ms
    }, 300); // Initial delay to ensure DOM is ready

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      if (checkInterval) clearInterval(checkInterval);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [slot]); // Re-run if slot changes

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
          key={slot || "1802538697"}
       ></ins>
       {/* Placeholder - will be hidden when ad loads */}
       {!adLoaded && (
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
       )}
    </div>
  );
};

export default GoogleAd;
