import React from 'react';

export const TermsModal = ({ onClose, t }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#fff' }}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>{t("termsOfService")}</h2>
      <div className="legal-text" style={{ lineHeight: '1.6', color: '#4b5563' }}>
        <p><strong>{t("termsLastUpdated")} {new Date().toLocaleDateString()}</strong></p>
        <p>{t("termsIntro")}</p>
        
        <h3>{t("terms1Title")}</h3>
        <p>{t("terms1Text")}</p>

        <h3>{t("terms2Title")}</h3>
        <p>{t("terms2Text")}</p>
        <ul>
          <li>{t("terms2List1")}</li>
          <li>{t("terms2List2")}</li>
          <li>{t("terms2List3")}</li>
        </ul>

        <h3>{t("terms3Title")}</h3>
        <p>{t("terms3Text")}</p>

        <h3>{t("terms4Title")}</h3>
        <p>{t("terms4Text")}</p>

        <h3>{t("terms5Title")}</h3>
        <p>{t("terms5Text")}</p>
      </div>
      <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  </div>
);

export const PrivacyModal = ({ onClose, t }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#fff' }}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>{t("privacyPolicy")}</h2>
      <div className="legal-text" style={{ lineHeight: '1.6', color: '#4b5563' }}>
        <p><strong>{t("privacyLastUpdated")} {new Date().toLocaleDateString()}</strong></p>
        <p>{t("privacyIntro")}</p>
        
        <h3>{t("privacy1Title")}</h3>
        <p>{t("privacy1Text")}</p>

        <h3>{t("privacy2Title")}</h3>
        <p>{t("privacy2Text")}</p>

        <h3>{t("privacy3Title")}</h3>
        <p>{t("privacy3Text")}</p>

        <h3>{t("privacy4Title")}</h3>
        <p>{t("privacy4Text")}</p>

        <h3>{t("privacy5Title")}</h3>
        <p>{t("privacy5Text")}</p>
      </div>
      <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  </div>
);
