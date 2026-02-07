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
                  {t("getVisibleToLocalCustomers")}
                </p>
              )}
              
              <div className="plan-selection-grid">
                {PLANS.map(plan => {
                  const isFeaturedPlan = plan.id === "12";
                  return (
                    <div
                      key={plan.id}
                      className={`plan-option ${selectedExtendPlan === plan.id ? 'selected' : ''} ${isFeaturedPlan ? 'plan-option--featured' : ''}`}
                      onClick={() => setSelectedExtendPlan(plan.id)}
                    >
                      {isFeaturedPlan && <span className="plan-option-featured-glow" aria-hidden="true" />}
                      <div className="plan-content">
                        <div className="plan-name-row">
                          <span className="plan-duration">{t(`month${plan.id}`)}</span>
                          {isFeaturedPlan && <span className="plan-badge-featured">{t("featured")}</span>}
                        </div>
                        <div className="plan-price">{plan.price}</div>
                        <div className="text-sm text-muted" style={{ marginTop: '4px' }}>{t(`days${plan.duration.split(' ')[0]}`)}</div>
                        {isFeaturedPlan && <div className="text-sm text-muted" style={{ marginTop: '4px' }}>{t("featuredDurationNote")}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedExtendPlan === "12" && (
                <div className="featured-cta-block" role="region" aria-labelledby="extend-featured-cta-title">
                  <h4 id="extend-featured-cta-title" className="featured-cta-title">
                    <span className="featured-cta-icon" aria-hidden="true">✨</span>
                    {t("featuredCtaTitle")}
                  </h4>
                  <p className="featured-cta-desc">{t("featuredCtaDesc")}</p>
                  <ul className="featured-cta-benefits" aria-label={t("featuredBenefitsTooltip")}>
                    <li><span className="featured-cta-check" aria-hidden="true">✓</span> {t("featuredListingsGetMoreViews")}</li>
                    <li><span className="featured-cta-check" aria-hidden="true">✓</span> {t("featuredBenefitsTooltip")}</li>
                  </ul>
                  <p className="featured-cta-cta">
                    <strong>{t("featuredCtaCta")}</strong> — {t("featuredPlanLabel")}
                  </p>
                </div>
              )}
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
