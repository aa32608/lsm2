"use client";

import React from "react";
import { useApp } from "../../context/AppContext";
import { PLANS } from "../../constants";

export default function PricingPage() {
  const { t } = useApp();

  const planMeta = {
    "1": {
      key: "plan1Month",
      descriptionKey: null,
    },
    "3": {
      key: "plan3Months",
      descriptionKey: null,
    },
    "6": {
      key: "plan6Months",
      descriptionKey: null,
    },
    "12": {
      key: "plan12Months",
      descriptionKey: null,
    },
  };

  return (
    <main className="pricing-page">
      <div className="container" style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 16px" }}>
        <header style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 className="page-title">{t("pricing") || "Pricing"}</h1>
          <p className="text-body" style={{ maxWidth: "640px", margin: "12px auto 0" }}>
            {t("pricingIntro") ||
              "Choose how long you want your listing to stay active on BizCall MK. Longer plans are more cost-effective and keep your service visible for more time."}
          </p>
        </header>

        <section
          className="plan-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {PLANS.map((plan) => {
            const meta = planMeta[plan.id] || {};
            const title = t(meta.key) || plan.label;
            return (
              <article
                key={plan.id}
                className={`plan-card ${plan.id === "12" ? "plan-card-featured" : ""}`}
                style={{
                  borderRadius: "16px",
                  border: plan.id === "12" ? "2px solid var(--accent)" : "1px solid #e2e8f0",
                  padding: "20px",
                  background:
                    plan.id === "12"
                      ? "linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(255, 251, 235, 0.98))"
                      : "#ffffff",
                  boxShadow:
                    plan.id === "12"
                      ? "0 10px 30px rgba(245, 158, 11, 0.25)"
                      : "0 4px 12px rgba(15, 23, 42, 0.06)",
                }}
              >
                {plan.id === "12" && (
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "2px 10px",
                      borderRadius: "999px",
                      background: "linear-gradient(135deg, #f59e0b, #d97706)",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      marginBottom: "10px",
                    }}
                  >
                    ✨ {t("featured") || "Featured"}
                  </div>
                )}

                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "4px" }}>{title}</h2>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "12px" }}>
                  {t(`days${plan.duration.split(" ")[0]}`) || plan.duration}
                </p>

                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    marginBottom: "8px",
                    color: "var(--primary)",
                  }}
                >
                  {plan.price}
                </p>

                <ul className="list-disc pl-5 text-body" style={{ fontSize: "0.9rem", color: "#475569" }}>
                  {plan.id === "1" && (
                    <>
                      <li>{t("pricingPlan1Point1") || "Ideal for testing BizCall MK or short campaigns."}</li>
                      <li>{t("pricingPlan1Point2") || "Your listing stays active for 30 days."}</li>
                    </>
                  )}
                  {plan.id === "3" && (
                    <>
                      <li>{t("pricingPlan3Point1") || "Better value for seasonal or medium-term services."}</li>
                      <li>{t("pricingPlan3Point2") || "Keep your listing live for a full 3 months."}</li>
                    </>
                  )}
                  {plan.id === "6" && (
                    <>
                      <li>{t("pricingPlan6Point1") || "Great for stable, ongoing local services."}</li>
                      <li>{t("pricingPlan6Point2") || "Lower monthly cost compared to short plans."}</li>
                    </>
                  )}
                  {plan.id === "12" && (
                    <>
                      <li>
                        {t("pricingPlan12Point1") ||
                          "Best long-term visibility: your listing stays active for a full year."}
                      </li>
                      <li>
                        {t("pricingPlan12Point2") ||
                          "Featured for the first 3 months — top of search and highlighted badge."}
                      </li>
                      <li>
                        {t("pricingPlan12Point3") ||
                          "Then remains a standard active listing for the remaining 9 months."}
                      </li>
                    </>
                  )}
                </ul>
              </article>
            );
          })}
        </section>

        <section
          style={{
            maxWidth: "720px",
            margin: "32px auto 0",
          }}
        >
          <h2 className="text-h3" style={{ marginBottom: "8px" }}>
            {t("pricingPaymentMethodsTitle") || "Payments & billing"}
          </h2>
          <p className="text-body" style={{ marginBottom: "16px" }}>
            {t("pricingPaymentMethodsText") ||
              "Listing fees are one-time charges in EUR for the selected duration. Payments are processed securely through Whop. There are no automatic renewals or recurring subscriptions."}
          </p>

          <h2 className="text-h3" style={{ marginBottom: "8px" }}>
            {t("pricingRefundsTitle") || "Refunds & cancellations"}
          </h2>
          <p className="text-body" style={{ marginBottom: "16px" }}>
            {t("pricingRefundsText") ||
              "Because BizCall MK provides access to a digital listing service, payments are generally non-refundable once your listing is activated. If you believe you were charged in error, contact us and we will review your case."}
          </p>

          <h2 className="text-h3" style={{ marginBottom: "8px" }}>
            {t("pricingPlatformNoteTitle") || "About this platform"}
          </h2>
          <p className="text-body">
            {t("pricingPlatformNoteText") ||
              "BizCall MK is a local services marketplace. We connect people looking for services with local providers; we do not sell the services ourselves and are not a party to the contract between customers and providers."}
          </p>
        </section>
      </div>
    </main>
  );
}

