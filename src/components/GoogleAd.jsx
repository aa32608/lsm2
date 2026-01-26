"use client";
import React, { useEffect } from "react";

const GoogleAd = ({ className, style, slot }) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  return (
    <div className={`google-ad-wrapper ${className || ''}`} style={{ ...style, background: '#f8fafc', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
       <ins className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client="ca-pub-8385998516338936"
          data-ad-slot={slot || "1802538697"}
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
       {/* Placeholder text visible only when ad script not loaded/blocked */}
       <div style={{ position: 'absolute', pointerEvents: 'none', color: '#cbd5e1', fontSize: '0.75rem', zIndex: 0 }}>Advertisement</div>
    </div>
  );
};

export default GoogleAd;
