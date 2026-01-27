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
          >
            <div className="modal-header">
              <h3 className="modal-title">
                {(extendTarget.status === "pending" || extendTarget.status === "unpaid") 
                  ? (t("completePayment") || t("proceedToPayment"))
                  : t("extendListing")}
              </h3>
              <button 
                className="icon-btn" 
                onClick={() => setExtendModalOpen(false)}
                aria-label={t("close")}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              {(extendTarget.status === "pending" || extendTarget.status === "unpaid") ? (
                <>
                  <p className="text-body mb-lg" style={{ color: 'var(--danger)', fontWeight: 600 }}>
                    {t("listingNeedsPayment")}
                  </p>
                  <p className="text-body mb-lg">
                    {t("completePaymentToActivate")}
                  </p>
                </>
              ) : (
                <p className="text-body mb-lg">
                  {t("extendDescription")}
                </p>
              )}
              
              <div className="plan-selection-grid">
                {PLANS.map(plan => (
                  <div 
                    key={plan.id}
                    className={`plan-option ${selectedExtendPlan === plan.id ? 'selected' : ''}`}
                    onClick={() => setSelectedExtendPlan(plan.id)}
                  >
                    <div className="plan-content">
                      <div className="plan-duration">{t(`month${plan.id}`)}</div>
                      <div className="plan-price">{plan.price}</div>
                      <div className="text-sm text-muted" style={{ marginTop: '4px' }}>{t(`days${plan.duration.split(' ')[0]}`)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setExtendModalOpen(false)}>
                {t("cancel")}
              </button>
              <button className="btn btn-primary" onClick={handleProceedExtend}>
                {t("proceedToPayment")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExtendListingModal;
