import React, { useState, useEffect } from 'react';
import { motion as Motion } from 'framer-motion';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { priceMap } from '../utils/constants';

const PaymentModal = ({ 
  show, 
  onClose, 
  paymentIntent,
  extendPlan,
  setExtendPlan,
  extendTarget,
  onApprove,
  t,
  showMessage 
}) => {
  if (!show || !paymentIntent) return null;

  return (
    <Motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Motion.div
        className="modal payment-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
      >
        <div className="modal-header">
          <h3 className="modal-title">
            {paymentIntent.type === "extend"
              ? `${t("extend")} • ${extendTarget?.name || ""}`
              : t("paypalCheckout")}
          </h3>
          <button className="icon-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
          <div className="payment-summary">
            <div className="payment-row">
              <span>{t("totalAmount")}</span>
              <span className="amount">{paymentIntent.amount?.toFixed(2)} EUR</span>
            </div>
            <div className="payment-row">
              <span>{t("payingWith")}</span>
              <span>PayPal</span>
            </div>
          </div>

          {paymentIntent.type === "extend" && (
            <div className="plan-selector" style={{ marginTop: 12 }}>
              <label className="plan-label">
                {t("selectExtendDuration") || t("selectDuration") || "Select extension duration"}
              </label>
              <div className="plan-grid">
                {Object.keys(priceMap).map((months) => (
                  <label key={months} className={`plan-option ${extendPlan === months ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="extendPlan"
                      value={months}
                      checked={extendPlan === months}
                      onChange={(e) => setExtendPlan(e.target.value)}
                    />
                    <div className="plan-content">
                      <div className="plan-duration">
                        {months === "1"
                          ? t("oneMonth")
                          : months === "3"
                          ? t("threeMonths")
                          : months === "6"
                          ? t("sixMonths")
                          : t("twelveMonths")}
                      </div>
                      <div className="plan-price">
                        {priceMap[months]} {t("eur")}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="payment-buttons">
            <PayPalButtons
              style={{ layout: "vertical", color: "gold", shape: "pill", label: "paypal" }}
              createOrder={(data, actions) =>
                actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "EUR",
                        value: paymentIntent.amount?.toString() || "0.00",
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING",
                    user_action: "PAY_NOW",
                    return_url: window.location.origin + "/paypal-success",
                    cancel_url: window.location.origin + "/paypal-cancel",
                  },
                })
              }
              onApprove={onApprove}
              onError={(err) => showMessage((t("paypalError") || "PayPal error:") + " " + String(err), "error")}
            />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            {t("cancel")}
          </button>
        </div>
      </Motion.div>
    </Motion.div>
  );
};

export default PaymentModal;
