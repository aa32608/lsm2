"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";

const WhopEmbed = ({ 
  isOpen, 
  onClose, 
  checkoutUrl, 
  listingId, 
  onSuccess, 
  onCancel 
}) => {
  const { t } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (isOpen && checkoutUrl) {
      setIsLoading(true);
      setError(null);
    }
  }, [isOpen, checkoutUrl]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(t("paymentEmbedError") || "Failed to load payment form. Please try again.");
  };

  const handleMessage = (event) => {
    // Only accept messages from Whop domains
    if (!event.origin.includes('whop.com')) return;

    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      
      // Handle different events from Whop embed
      switch (data.type) {
        case 'checkout.completed':
          console.log('[WhopEmbed] Payment completed:', data);
          onSuccess?.(data);
          onClose();
          break;
          
        case 'checkout.closed':
          console.log('[WhopEmbed] Checkout closed');
          onCancel?.();
          onClose();
          break;
          
        case 'checkout.error':
          console.error('[WhopEmbed] Payment error:', data);
          setError(data.message || t("paymentError") || "Payment failed");
          break;
          
        default:
          console.log('[WhopEmbed] Unknown message:', data);
      }
    } catch (err) {
      console.error('[WhopEmbed] Error parsing message:', err);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isOpen, handleMessage]);

  const handleCancelClick = () => {
    onCancel?.();
    onClose();
  };

  const handleRetry = () => {
    // Reload the iframe
    if (iframeRef.current) {
      iframeRef.current.src = checkoutUrl;
      setIsLoading(true);
      setError(null);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal payment-embed-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.3 }}
        >
          <div className="modal-header">
            <h3 className="modal-title">
              💳 {t("secureCheckout") || "Secure Checkout"}
            </h3>
            <button
              className="icon-btn"
              onClick={handleCancelClick}
              aria-label={t("cancel") || "Cancel"}
            >
              ✕
            </button>
          </div>

          <div className="modal-body payment-embed-body">
            {/* Loading state */}
            {isLoading && (
              <div className="payment-embed-loading">
                <div className="loading-spinner"></div>
                <p>{t("loadingPayment") || "Loading secure payment form..."}</p>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="payment-embed-error">
                <div className="error-icon">⚠️</div>
                <p>{error}</p>
                <div className="error-actions">
                  <button className="btn btn-ghost" onClick={handleCancelClick}>
                    {t("cancel") || "Cancel"}
                  </button>
                  <button className="btn" onClick={handleRetry}>
                    {t("retry") || "Retry"}
                  </button>
                </div>
              </div>
            )}

            {/* Embed iframe */}
            {!error && (
              <div className="payment-embed-container">
                <iframe
                  ref={iframeRef}
                  src={checkoutUrl}
                  className="payment-embed-iframe"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-top-navigation allow-popups allow-modals"
                  allow="payment *"
                  title="Whop Payment Checkout"
                />
              </div>
            )}

            {/* Cancel button at bottom */}
            <div className="payment-embed-footer">
              <button
                className="btn btn-ghost payment-cancel-btn"
                onClick={handleCancelClick}
              >
                ← {t("backToListing") || "Back to Listing"}
              </button>
              <div className="payment-security-note">
                <span className="security-icon">🔒</span>
                <span>{t("securedByWhop") || "Secured by Whop"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WhopEmbed;
