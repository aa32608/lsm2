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
         aria-label={typeof t === 'function' ? t("close") : "Close"}
       >
         ✕
       </button>
    </div>
    <div className="modal-body">
      {children}
    </div>
    <div className="modal-footer">
       <button className="btn btn-secondary full-width" onClick={onClose}>{typeof t === 'function' ? t("close") : "Close"}</button>
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
    <ModalContent title={t("termsOfService") || "Terms of Service"} onClose={onClose} t={t}>
      <div>
        <p className="text-sm text-muted mb-lg">
          {t("termsLastUpdated") || "Last Updated"}: {new Date().toLocaleDateString()}
        </p>
        
        <Section title={t("terms1Title") || "1. Acceptance of Terms"}>
          <p>{t("terms1Text") || "By accessing and using BizCall MK, you accept and agree to be bound by the terms and provision of this agreement."}</p>
        </Section>

        <Section title={t("terms2Title") || "2. User Responsibilities"}>
          <p className="mb-sm">{t("terms2Text") || "Users are responsible for the accuracy of their listings. You agree not to post content that is illegal, offensive, or fraudulent."}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms2List1") || "Maintain accurate contact information"}</li>
            <li>{t("terms2List2") || "Respect intellectual property rights"}</li>
            <li>{t("terms2List3") || "Do not engage in spam or harassment"}</li>
          </ul>
        </Section>

        <Section title={t("terms3Title") || "3. Payment Terms - Dodo Payments"}>
          <p className="mb-sm">{t("terms3Text") || "BizCall MK uses Dodo Payments as our secure payment processing partner. By making a payment, you agree to:"}</p>
          <ul className="list-disc pl-5">
            <li>All payments are processed securely through Dodo Payments platform</li>
            <li>Payment information is handled according to Dodo Payments' security standards and PCI compliance</li>
            <li>Refunds and cancellations are subject to Dodo Payments' terms and our listing policies</li>
            <li>We reserve the right to verify payment transactions and may require additional verification</li>
            <li>All prices are displayed in the selected currency and are final at the time of purchase</li>
            <li>For payment disputes, please contact our support team or refer to Dodo Payments' dispute resolution process</li>
          </ul>
        </Section>

        <Section title={t("terms4Title") || "4. Advertising and Google Ads"}>
          <p className="mb-sm">{t("terms4Text") || "BizCall MK displays advertisements through Google Ads. By using our service, you acknowledge:"}</p>
          <ul className="list-disc pl-5">
            <li>We use Google Ads to display relevant advertisements on our platform</li>
            <li>Google may use cookies and tracking technologies to show personalized ads</li>
            <li>You can manage your ad preferences through Google's Ad Settings</li>
            <li>We are not responsible for the content of third-party advertisements</li>
            <li>Advertisements are clearly marked and separated from our content</li>
            <li>We comply with Google Ads policies and guidelines</li>
          </ul>
        </Section>

        <Section title={t("terms5Title") || "5. Search Engine Optimization and Google Search Console"}>
          <p className="mb-sm">{t("terms5Text") || "BizCall MK is optimized for search engines and uses Google Search Console for website management:"}</p>
          <ul className="list-disc pl-5">
            <li>We use Google Search Console to monitor and improve our website's search performance</li>
            <li>Our website is indexed by Google and other major search engines</li>
            <li>We follow Google's Webmaster Guidelines and best practices</li>
            <li>Listings may appear in search engine results to help users find services</li>
            <li>We implement structured data and schema markup for better search visibility</li>
            <li>Our sitemap is submitted to Google Search Console for efficient crawling</li>
          </ul>
        </Section>

        <Section title={t("terms6Title") || "6. Service Modifications"}>
          <p>{t("terms6Text") || "BizCall MK reserves the right to modify or discontinue the service with or without notice to the user."}</p>
        </Section>

        <Section title={t("terms7Title") || "7. Limitation of Liability"}>
          <p>{t("terms7Text") || "We are not liable for any damages that may occur to you as a result of your use of our website."}</p>
        </Section>
        
        <Section title={t("terms8Title") || "8. Contact"}>
          <p>{t("terms8Text") || "For any questions regarding these terms, please contact us."}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);

export const PrivacyModal = ({ onClose, t }) => (
  <ModalBackdrop onClose={onClose}>
    <ModalContent title={t("privacyPolicy") || "Privacy Policy"} onClose={onClose} t={t}>
      <div>
        <p className="text-sm text-muted mb-lg">
          {t("privacyLastUpdated") || "Last Updated"}: {new Date().toLocaleDateString()}
        </p>

        <Section title={t("privacy1Title") || "1. Information Collection"}>
          <p>{t("privacy1Text") || "We collect information you provide directly to us, such as when you create an account, post a listing, or contact us. This includes:"}</p>
          <ul className="list-disc pl-5">
            <li>Account information (name, email, phone number)</li>
            <li>Listing information (descriptions, images, location, pricing)</li>
            <li>Payment information processed securely through Dodo Payments</li>
            <li>Usage data and analytics through Google Search Console</li>
            <li>Cookies and tracking technologies for Google Ads</li>
          </ul>
        </Section>

        <Section title={t("privacy2Title") || "2. Use of Information"}>
          <p>{t("privacy2Text") || "We use the information we collect to:"}</p>
          <ul className="list-disc pl-5">
            <li>Operate, maintain, and improve our services</li>
            <li>Process payments securely through Dodo Payments</li>
            <li>Display relevant advertisements through Google Ads</li>
            <li>Optimize our website for search engines using Google Search Console</li>
            <li>Communicate with you about your account and listings</li>
            <li>Analyze usage patterns and improve user experience</li>
          </ul>
        </Section>

        <Section title={t("privacy3Title") || "3. Third-Party Services"}>
          <p className="mb-sm">{t("privacy3Text") || "We work with trusted third-party services:"}</p>
          <ul className="list-disc pl-5">
            <li><strong>Dodo Payments:</strong> We share payment information with Dodo Payments to process transactions securely. Dodo Payments handles all payment data according to PCI DSS standards.</li>
            <li><strong>Google Ads:</strong> We use Google Ads to display advertisements. Google may use cookies and collect data for ad personalization. You can opt out through Google's Ad Settings.</li>
            <li><strong>Google Search Console:</strong> We use Google Search Console to monitor website performance and search visibility. This helps us improve our services and ensure listings are discoverable.</li>
            <li><strong>Firebase:</strong> We use Firebase for authentication and database services, which processes your account and listing data securely.</li>
          </ul>
        </Section>

        <Section title={t("privacy4Title") || "4. Data Security"}>
          <p>{t("privacy4Text") || "We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access. This includes:"}</p>
          <ul className="list-disc pl-5">
            <li>Encrypted data transmission (HTTPS/SSL)</li>
            <li>Secure payment processing through Dodo Payments (PCI compliant)</li>
            <li>Firebase security rules and authentication</li>
            <li>Regular security audits and updates</li>
          </ul>
        </Section>
        
        <Section title={t("privacy5Title") || "5. Cookies and Tracking"}>
          <p className="mb-sm">{t("privacy5Text") || "We use cookies and similar technologies:"}</p>
          <ul className="list-disc pl-5">
            <li><strong>Essential Cookies:</strong> Required for website functionality and authentication</li>
            <li><strong>Analytics Cookies:</strong> Used to understand how visitors interact with our website through Google Search Console and analytics</li>
            <li><strong>Advertising Cookies:</strong> Used by Google Ads to show relevant advertisements and measure ad effectiveness</li>
            <li>You can control cookies through your browser settings or Google's Ad Settings for advertising preferences</li>
          </ul>
        </Section>

        <Section title={t("privacy6Title") || "6. Your Rights"}>
          <p>{t("privacy6Text") || "You have the right to:"}</p>
          <ul className="list-disc pl-5">
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of personalized advertising through Google Ad Settings</li>
            <li>Request information about data we collect and how it's used</li>
            <li>Contact us with privacy concerns or questions</li>
          </ul>
        </Section>

        <Section title={t("privacy7Title") || "7. Contact"}>
          <p>{t("privacy7Text") || "For privacy-related questions or concerns, please contact us."}</p>
        </Section>
      </div>
    </ModalContent>
  </ModalBackdrop>
);
