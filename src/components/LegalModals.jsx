import React from 'react';

export const TermsModal = ({ onClose, t }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>{t("termsOfService")}</h2>
      <div className="legal-text" style={{ lineHeight: '1.6', color: '#4b5563' }}>
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>Welcome to BizCall (Local Support Market). By using our app, you agree to these terms.</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>

        <h3>2. User Conduct</h3>
        <p>You agree to use the service only for lawful purposes. You are responsible for all content you post.</p>
        <ul>
          <li>No spam or misleading content.</li>
          <li>No illegal goods or services.</li>
          <li>No harassment or hate speech.</li>
        </ul>

        <h3>3. Listing Rules</h3>
        <p>We reserve the right to remove any listing that violates our policies without refund.</p>

        <h3>4. Liability</h3>
        <p>BizCall is a platform connecting users. We are not responsible for the quality of services provided by users.</p>

        <h3>5. Termination</h3>
        <p>We may terminate your access to the site, without cause or notice.</p>
      </div>
      <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  </div>
);

export const PrivacyModal = ({ onClose, t }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
      <button className="modal-close" onClick={onClose}>&times;</button>
      <h2>{t("privacyPolicy")}</h2>
      <div className="legal-text" style={{ lineHeight: '1.6', color: '#4b5563' }}>
        <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
        <p>Your privacy is important to us. This policy explains how we handle your data.</p>
        
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as your email address, phone number, and listing details.</p>

        <h3>2. How We Use Information</h3>
        <p>We use your information to operate and improve our services, facilitate payments, and communicate with you.</p>

        <h3>3. Data Sharing</h3>
        <p>We do not sell your personal data. We may share data with service providers (e.g., PayPal, Firebase) to operate the app.</p>

        <h3>4. Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information at any time via your account settings.</p>

        <h3>5. Contact</h3>
        <p>If you have questions about this policy, please contact us.</p>
      </div>
      <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn" onClick={onClose}>{t("close")}</button>
      </div>
    </div>
  </div>
);
