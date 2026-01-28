"use client";
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const API_BASE = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? "http://localhost:5000"
  : "https://lsm-wozo.onrender.com");

export default function ContactPage() {
  const { t } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      // Send email to your business email (Zoho Mail)
      // Set NEXT_PUBLIC_CONTACT_EMAIL environment variable or it defaults to contact@bizcall.mk
      const recipientEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@bizcall.mk';
      const emailSubject = `Contact Form: ${formData.subject || 'New Message'}`;
      const emailText = `
New contact form submission from ${formData.name} (${formData.email})

Subject: ${formData.subject || 'No subject'}

Message:
${formData.message}

---
This email was sent from the contact form on bizcall.mk
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
      setFormData({ name: '', email: '', subject: '', message: '' });
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
    <div className="contact-page" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem 1rem' 
    }}>
      <div className="contact-header" style={{ 
        textAlign: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          marginBottom: '0.5rem',
          color: 'var(--text-main)'
        }}>
          {t('contactUs') || 'Contact Us'}
        </h1>
        <p style={{ 
          color: 'var(--text-secondary)', 
          fontSize: '1.1rem' 
        }}>
          {t('contactDescription') || 'Have a question or feedback? We\'d love to hear from you!'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form" style={{
        background: 'var(--surface)',
        padding: '2rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {status.message && (
          <div style={{
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: 'var(--radius-md)',
            background: status.type === 'success' ? 'var(--success-light)' : 'var(--danger-light)',
            color: status.type === 'success' ? 'var(--success)' : 'var(--danger)',
            border: `1px solid ${status.type === 'success' ? 'var(--success)' : 'var(--danger)'}`
          }}>
            {status.message}
          </div>
        )}

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="name" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: 'var(--text-main)'
          }}>
            {t('name') || 'Name'} *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              background: 'var(--background)',
              color: 'var(--text-main)'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="email" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: 'var(--text-main)'
          }}>
            {t('email') || 'Email'} *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              background: 'var(--background)',
              color: 'var(--text-main)'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="subject" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: 'var(--text-main)'
          }}>
            {t('subject') || 'Subject'} *
          </label>
          <input
            type="text"
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              background: 'var(--background)',
              color: 'var(--text-main)'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="message" style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: 'var(--text-main)'
          }}>
            {t('message') || 'Message'} *
          </label>
          <textarea
            id="message"
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              resize: 'vertical',
              background: 'var(--background)',
              color: 'var(--text-main)'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? 'var(--text-muted)' : 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all var(--transition-fast)'
          }}
        >
          {loading ? (t('sending') || 'Sending...') : (t('sendMessage') || 'Send Message')}
        </button>
      </form>

      <div className="contact-info" style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          {t('contactAlternative') || 'Alternatively, you can reach us at:'}
        </p>
        <a 
          href="mailto:contact@bizcall.mk" 
          style={{ 
            color: 'var(--primary)', 
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          contact@bizcall.mk
        </a>
      </div>
    </div>
  );
}
