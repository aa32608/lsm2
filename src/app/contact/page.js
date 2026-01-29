"use client";
import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';

const API_BASE = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://lsm-wozo.onrender.com");

export default function ContactPage() {
  const { t, user, userProfile } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  // When user is logged in, autofill name and email from Firebase and keep them locked
  useEffect(() => {
    if (user) {
      const displayName = (userProfile?.name && userProfile.name.trim()) || user.displayName || (user.email ? user.email.split('@')[0] : '');
      const email = user.email || userProfile?.email || '';
      setFormData(prev => ({
        ...prev,
        name: displayName,
        email: email
      }));
    } else {
      setFormData(prev => ({ ...prev, name: '', email: '' }));
    }
  }, [user, userProfile?.name, userProfile?.email, user?.email, user?.displayName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      // Send email to your business email (Zoho Mail)
      // Set NEXT_PUBLIC_CONTACT_EMAIL environment variable or it defaults to contact@bizcall.mk
      const recipientEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@bizcall.mk';
      const emailSubject = `Contact Form: ${formData.subject || t('newMessage') || 'New Message'}`;
      const emailText = `
${t('contactFormSubmission') || 'New contact form submission'} ${t('from') || 'from'} ${formData.name} (${formData.email})

${t('subject') || 'Subject'}: ${formData.subject || t('noSubject') || 'No subject'}

${t('message') || 'Message'}:
${formData.message}

---
${t('contactFormFooter') || 'This email was sent from the contact form on bizcall.mk'}
      `.trim();

      const response = await fetch(`${API_BASE}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject: emailSubject,
          text: emailText,
          replyTo: formData.email // So you can reply directly to the sender
        })
      });

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setStatus({ 
        type: 'success', 
        message: t('contactFormSuccess') || 'Thank you! Your message has been sent successfully.' 
      });
      // Reset subject and message; keep name/email when logged in
      if (user) {
        const displayName = (userProfile?.name && userProfile.name.trim()) || user.displayName || (user.email ? user.email.split('@')[0] : '');
        const email = user.email || userProfile?.email || '';
        setFormData(prev => ({ ...prev, subject: '', message: '', name: displayName, email }));
      } else {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ 
        type: 'error', 
        message: t('contactFormError') || 'Sorry, there was an error sending your message. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <div className="contact-header-content">
          <h1 className="contact-page-title">
            <span className="contact-page-icon" aria-hidden="true">✉️</span>
            {t('contactUs') || 'Contact Us'}
          </h1>
          <p className="contact-page-subtitle">
            {t('contactDescription') || 'Have a question or feedback? We\'d love to hear from you!'}
          </p>
        </div>
      </div>

      <div className="contact-layout">
        <form onSubmit={handleSubmit} className="contact-form">
          {status.message && (
            <div className={`contact-status ${status.type === 'success' ? 'contact-status-success' : 'contact-status-error'}`}>
              {status.message}
            </div>
          )}

          <div className="contact-field-group">
            <label htmlFor="name" className="contact-label">
              {t('name') || 'Name'} *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => !user && setFormData({ ...formData, name: e.target.value })}
              className={`contact-input ${user ? 'contact-input-readonly' : ''}`}
              placeholder={t('enterName') || 'Enter your name'}
              readOnly={!!user}
              aria-readonly={!!user}
            />
          </div>

          <div className="contact-field-group">
            <label htmlFor="email" className="contact-label">
              {t('email') || 'Email'} *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => !user && setFormData({ ...formData, email: e.target.value })}
              className={`contact-input ${user ? 'contact-input-readonly' : ''}`}
              placeholder={t('enterEmail') || 'Enter your email'}
              readOnly={!!user}
              aria-readonly={!!user}
            />
          </div>

          <div className="contact-field-group">
            <label htmlFor="subject" className="contact-label">
              {t('subject') || 'Subject'} *
            </label>
            <input
              type="text"
              id="subject"
              required
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="contact-input"
              placeholder={t('enterSubject') || 'Enter subject'}
            />
          </div>

          <div className="contact-field-group">
            <label htmlFor="message" className="contact-label">
              {t('message') || 'Message'} *
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="contact-textarea"
              placeholder={t('enterMessage') || 'Enter your message'}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="contact-submit-btn"
          >
            {loading ? (t('sending') || 'Sending...') : (t('sendMessage') || 'Send Message')}
          </button>
        </form>

        <div className="contact-info">
          <h2 className="contact-info-title">{t('contactAlternativeTitle') || 'Other Ways to Reach Us'}</h2>
          <p className="contact-info-text">
            {t('contactAlternative') || 'Alternatively, you can reach us at:'}
          </p>
          <a 
            href="mailto:contact@bizcall.mk" 
            className="contact-email-link"
          >
            contact@bizcall.mk
          </a>
        </div>
      </div>
    </div>
  );
}
