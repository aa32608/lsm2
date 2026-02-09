"use client";
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
    className="modal"
    onClick={e => e.stopPropagation()}
    initial={{ y: 20, opacity: 0, scale: 0.95 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 20, opacity: 0, scale: 0.95 }}
  >
    <div className="modal-header">
       <h3 className="modal-title">{title}</h3>
       <button 
         className="icon-btn" 
         onClick={onClose}
         aria-label={t("close")}
       >
         ✕
       </button>
    </div>
    <div className="modal-body">
      {children}
    </div>
    <div className="modal-footer">
       <button className="btn btn-secondary full-width" onClick={onClose}>{t("close")}</button>
    </div>
  </motion.div>
);

const Section = ({ title, children }) => (
  <div className="mb-lg">
    <h4 className="text-h3">{title}</h4>
    <div className="text-body">
      {children}
    </div>
  </div>
);

export const TermsModal = ({ onClose, t }) => (
  <ModalBackdrop onClose={onClose}>
    <ModalContent title={t("termsOfService")} onClose={onClose} t={t}>
      <div>
        <p className="text-sm text-muted mb-lg">
          {t("termsLastUpdated")} <span suppressHydrationWarning>{typeof window !== 'undefined' ? new Date().toLocaleDateString() : '2025'}</span>
        </p>
        
        <Section title={t("terms1Title")}>
          <p>{t("terms1Text")}</p>
        </Section>

        <Section title={t("terms2Title")}>
          <p className="mb-sm">{t("terms2TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms2List1New")}</li>
            <li>{t("terms2List2New")}</li>
            <li>{t("terms2List3New")}</li>
          </ul>
        </Section>

        <Section title={t("terms3Title")}>
          <p className="mb-sm">{t("terms3TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms3List1")}</li>
            <li>{t("terms3List2")}</li>
            <li>{t("terms3List3")}</li>
            <li>{t("terms3List4")}</li>
            <li>{t("terms3List5")}</li>
            <li>{t("terms3List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms4Title")}>
          <p className="mb-sm">{t("terms4TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms4List1")}</li>
            <li>{t("terms4List2")}</li>
            <li>{t("terms4List3")}</li>
            <li>{t("terms4List4")}</li>
            <li>{t("terms4List5")}</li>
            <li>{t("terms4List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms5Title")}>
          <p className="mb-sm">{t("terms5TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms5List1")}</li>
            <li>{t("terms5List2")}</li>
            <li>{t("terms5List3")}</li>
            <li>{t("terms5List4")}</li>
            <li>{t("terms5List5")}</li>
            <li>{t("terms5List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms6Title")}>
          <p>{t("terms6Text")}</p>
        </Section>

        <Section title={t("terms7Title")}>
          <p>{t("terms7Text")}</p>
        </Section>
        
        <Section title={t("terms8Title")}>
          <p>{t("terms8Text")}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);

export const PrivacyModal = ({ onClose, t }) => (
  <ModalBackdrop onClose={onClose}>
    <ModalContent title={t("privacyPolicy")} onClose={onClose} t={t}>
      <div>
        <p className="text-sm text-muted mb-lg">
          {t("privacyLastUpdated")} <span suppressHydrationWarning>{typeof window !== 'undefined' ? new Date().toLocaleDateString() : '2025'}</span>
        </p>

        <Section title={t("privacy1Title")}>
          <p>{t("privacy1TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy1List1")}</li>
            <li>{t("privacy1List2")}</li>
            <li>{t("privacy1List3")}</li>
            <li>{t("privacy1List4")}</li>
            <li>{t("privacy1List5")}</li>
          </ul>
        </Section>

        <Section title={t("privacy2Title")}>
          <p>{t("privacy2TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy2List1")}</li>
            <li>{t("privacy2List2")}</li>
            <li>{t("privacy2List3")}</li>
            <li>{t("privacy2List4")}</li>
            <li>{t("privacy2List5")}</li>
            <li>{t("privacy2List6")}</li>
          </ul>
        </Section>

        <Section title={t("privacy3Title")}>
          <p className="mb-sm">{t("privacy3TextNew")}</p>
          <ul className="list-disc pl-5">
            <li><strong>Payment processor:</strong> {t("privacy3List1")}</li>
            <li><strong>Google Ads:</strong> {t("privacy3List2")}</li>
            <li><strong>Google Search Console:</strong> {t("privacy3List3")}</li>
            <li><strong>Firebase:</strong> {t("privacy3List4")}</li>
          </ul>
        </Section>

        <Section title={t("privacy4Title")}>
          <p>{t("privacy4TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy4List1")}</li>
            <li>{t("privacy4List2")}</li>
            <li>{t("privacy4List3")}</li>
            <li>{t("privacy4List4")}</li>
          </ul>
        </Section>
        
        <Section title={t("privacy5Title")}>
          <p className="mb-sm">{t("privacy5TextNew")}</p>
          <ul className="list-disc pl-5">
            <li><strong>{t("essentialCookies")}:</strong> {t("privacy5List1")}</li>
            <li><strong>{t("analyticsCookies")}:</strong> {t("privacy5List2")}</li>
            <li><strong>{t("advertisingCookies")}:</strong> {t("privacy5List3")}</li>
            <li>{t("privacy5List4")}</li>
          </ul>
        </Section>

        <Section title={t("privacy6Title")}>
          <p>{t("privacy6Text")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy6List1")}</li>
            <li>{t("privacy6List2")}</li>
            <li>{t("privacy6List3")}</li>
            <li>{t("privacy6List4")}</li>
            <li>{t("privacy6List5")}</li>
          </ul>
        </Section>

        <Section title={t("privacy7Title")}>
          <p>{t("privacy7Text")}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);
