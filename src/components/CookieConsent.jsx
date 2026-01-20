import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure styles are available if not global

export default function CookieConsent({ t }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-content">
        <p>{t('cookieConsentText')}</p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-primary btn-sm" onClick={handleAccept}>
          {t('accept')}
        </button>
      </div>
    </div>
  );
}
