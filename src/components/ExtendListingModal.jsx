"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { PLANS } from "../constants";

const ExtendListingModal = () => {
  const {
    t,
    extendModalOpen,
    setExtendModalOpen,
    extendTarget,
    selectedExtendPlan,
    setSelectedExtendPlan,
    handleProceedExtend
  } = useApp();

  return (
    <AnimatePresence>
      {extendModalOpen && extendTarget && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExtendModalOpen(false)}
        >
          <motion.div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            style={{ maxWidth: '500px' }}
          >
            <div className="modal-header">
              <h3 className="modal-title">{t("extendListing") || "Extend Listing"}</h3>
              <button className="icon-btn" onClick={() => setExtendModalOpen(false)}>✕</button>
            </div>
            <div className="modal-body" style={{ padding: '24px' }}>
              <p style={{ marginBottom: 16 }}>
                {t("extendDescription") || "Choose a plan to extend your listing duration."}
              </p>
              
              <div className="plan-selection-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {PLANS.map(plan => (
                  <div 
                    key={plan.id}
                    className={`plan-option ${selectedExtendPlan === plan.id ? 'selected' : ''}`}
                    onClick={() => setSelectedExtendPlan(plan.id)}
                    style={{ 
                      border: selectedExtendPlan === plan.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                      padding: '12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedExtendPlan === plan.id ? 'var(--bg-subtle)' : 'var(--bg-card)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold' }}>{t(`month${plan.id}`)}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{plan.price}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{t(`days${plan.duration.split(' ')[0]}`)}</div>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button className="btn btn-ghost" onClick={() => setExtendModalOpen(false)}>
                  {t("cancel")}
                </button>
                <button className="btn btn-accent" onClick={handleProceedExtend}>
                  {t("proceedToPayment") || "Proceed to Payment"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExtendListingModal;
