import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModalBackdrop = ({ children, onClose }) => (
  <motion.div 
    className="modal-overlay" 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    style={{ zIndex: 1100 }}
  >
    {children}
  </motion.div>
);

const ModalContent = ({ title, children, onClose, t }) => (
  <motion.div 
    className="modal legal-modal"
    onClick={e => e.stopPropagation()}
    initial={{ y: 20, opacity: 0, scale: 0.95 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 20, opacity: 0, scale: 0.95 }}
    style={{ 
      maxWidth: '700px', 
      width: '90%', 
      maxHeight: '85vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}
  >
    <div className="modal-header" style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#111827' }}>{title}</h3>
       <button 
         className="icon-btn" 
         onClick={onClose}
         aria-label={typeof t === 'function' ? t("close") : "Close"}
         style={{ background: '#f3f4f6', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#6b7280' }}
       >
         ✕
       </button>
    </div>
    <div className="modal-body legal-modal-body" style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
      {children}
    </div>
    <div className="modal-footer" style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
       <button className="btn full-width" onClick={onClose} style={{ padding: '10px 20px' }}>{typeof t === 'function' ? t("close") : "Close"}</button>
    </div>
  </motion.div>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '24px' }}>
    <h4 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1f2937', marginBottom: '12px' }}>{title}</h4>
    <div style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#4b5563' }}>
      {children}
    </div>
  </div>
);

export const TermsModal = ({ onClose, t }) => (
  <ModalBackdrop onClose={onClose}>
    <ModalContent title={t("termsOfService") || "Terms of Service"} onClose={onClose} t={t}>
      <div className="legal-content">
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '20px' }}>
          {t("termsLastUpdated") || "Last Updated"}: {new Date().toLocaleDateString()}
        </p>
        
        <Section title={t("terms1Title") || "1. Acceptance of Terms"}>
          <p>{t("terms1Text") || "By accessing and using Local Support Market, you accept and agree to be bound by the terms and provision of this agreement."}</p>
        </Section>

        <Section title={t("terms2Title") || "2. User Responsibilities"}>
          <p>{t("terms2Text") || "Users are responsible for the accuracy of their listings. You agree not to post content that is illegal, offensive, or fraudulent."}</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t("terms2List1") || "Maintain accurate contact information"}</li>
            <li>{t("terms2List2") || "Respect intellectual property rights"}</li>
            <li>{t("terms2List3") || "Do not engage in spam or harassment"}</li>
          </ul>
        </Section>

        <Section title={t("terms3Title") || "3. Service Modifications"}>
          <p>{t("terms3Text") || "Local Support Market reserves the right to modify or discontinue the service with or without notice to the user."}</p>
        </Section>

        <Section title={t("terms4Title") || "4. Limitation of Liability"}>
          <p>{t("terms4Text") || "We are not liable for any damages that may occur to you as a result of your use of our website."}</p>
        </Section>
        
        <Section title={t("terms5Title") || "5. Contact"}>
          <p>{t("terms5Text") || "For any questions regarding these terms, please contact us."}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);

export const PrivacyModal = ({ onClose, t }) => (
  <ModalBackdrop onClose={onClose}>
    <ModalContent title={t("privacyPolicy") || "Privacy Policy"} onClose={onClose} t={t}>
      <div className="legal-content">
        <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '20px' }}>
          {t("privacyLastUpdated") || "Last Updated"}: {new Date().toLocaleDateString()}
        </p>

        <Section title={t("privacy1Title") || "1. Information Collection"}>
          <p>{t("privacy1Text") || "We collect information you provide directly to us, such as when you create an account, post a listing, or contact us."}</p>
        </Section>

        <Section title={t("privacy2Title") || "2. Use of Information"}>
          <p>{t("privacy2Text") || "We use the information we collect to operate, maintain, and improve our services, and to communicate with you."}</p>
        </Section>

        <Section title={t("privacy3Title") || "3. Information Sharing"}>
          <p>{t("privacy3Text") || "We do not share your personal information with third parties except as described in this policy (e.g., service providers, legal requirements)."}</p>
        </Section>

        <Section title={t("privacy4Title") || "4. Data Security"}>
          <p>{t("privacy4Text") || "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access."}</p>
        </Section>
        
        <Section title={t("privacy5Title") || "5. Cookies"}>
          <p>{t("privacy5Text") || "We use cookies to improve your experience. You can control cookies through your browser settings."}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);
