"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useApp } from "../../context/AppContext";

export default function PaymentSuccessPage() {
  const { t } = useApp();
  const searchParams = useSearchParams();

  // Whop uses ?status=success or ?status=error; legacy support for ?payment=success / ?payment=failed
  const status = searchParams.get("status") || searchParams.get("payment") || "";
  const isSuccess = status === "success";

  return (
    <main className="payment-success-page" style={{ padding: "48px 16px", maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
      <div
        style={{
          padding: "32px 24px",
          borderRadius: "16px",
          background: isSuccess ? "linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(34, 197, 94, 0.02))" : "linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(234, 179, 8, 0.02))",
          border: `1px solid ${isSuccess ? "rgba(34, 197, 94, 0.3)" : "rgba(234, 179, 8, 0.3)"}`,
        }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>{isSuccess ? "✓" : "○"}</div>
        <h1 className="page-title" style={{ marginBottom: "12px", fontSize: "1.5rem" }}>
          {isSuccess ? t("paymentSuccessPageTitle") : t("paymentFailedPageTitle")}
        </h1>
        <p className="text-body" style={{ marginBottom: "24px", color: "#64748b" }}>
          {isSuccess ? t("paymentSuccessPageBody") : t("paymentFailedPageBody")}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Link
            href="/mylistings"
            className="btn btn-primary"
            style={{ minWidth: "200px" }}
          >
            {t("myListings")}
          </Link>
          <Link
            href="/"
            className="btn btn-secondary"
            style={{ minWidth: "200px" }}
          >
            {t("goHome")}
          </Link>
        </div>
      </div>
    </main>
  );
}
