"use client";

import React from "react";
import { useApp } from "../../context/AppContext";

const Section = ({ title, children }) => (
  <section className="mb-lg">
    <h2 className="text-h3">{title}</h2>
    <div className="text-body">{children}</div>
  </section>
);

export default function PrivacyPage() {
  const { t } = useApp();

  return (
    <main className="legal-page">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 className="page-title" style={{ marginBottom: "16px" }}>{t("privacyPolicy")}</h1>
        <p className="text-sm text-muted mb-lg">
          {t("privacyLastUpdated")}{" "}
          <span>{typeof window !== "undefined" ? new Date().toLocaleDateString() : "2025"}</span>
        </p>

        <Section title={t("privacy1Title")}>
          <p>{t("privacy1TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy1List1")}</li>
            <li>{t("privacy1List2")}</li>
            <li>{t("privacy1List3")}</li>
            <li>{t("privacy1List4")}</li>
            <li>{t("privacy1List5")}</li>
          </ul>
        </Section>

        <Section title={t("privacy2Title")}>
          <p>{t("privacy2TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy2List1")}</li>
            <li>{t("privacy2List2")}</li>
            <li>{t("privacy2List3")}</li>
            <li>{t("privacy2List4")}</li>
            <li>{t("privacy2List5")}</li>
            <li>{t("privacy2List6")}</li>
          </ul>
        </Section>

        <Section title={t("privacy3Title")}>
          <p className="mb-sm">{t("privacy3TextNew")}</p>
          <ul className="list-disc pl-5">
            <li><strong>Payment processor:</strong> {t("privacy3List1")}</li>
            <li><strong>Google Ads:</strong> {t("privacy3List2")}</li>
            <li><strong>Google Search Console:</strong> {t("privacy3List3")}</li>
            <li><strong>Firebase:</strong> {t("privacy3List4")}</li>
          </ul>
        </Section>

        <Section title={t("privacy4Title")}>
          <p>{t("privacy4TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy4List1")}</li>
            <li>{t("privacy4List2")}</li>
            <li>{t("privacy4List3")}</li>
            <li>{t("privacy4List4")}</li>
          </ul>
        </Section>

        <Section title={t("privacy5Title")}>
          <p className="mb-sm">{t("privacy5TextNew")}</p>
          <ul className="list-disc pl-5">
            <li><strong>{t("essentialCookies")}:</strong> {t("privacy5List1")}</li>
            <li><strong>{t("analyticsCookies")}:</strong> {t("privacy5List2")}</li>
            <li><strong>{t("advertisingCookies")}:</strong> {t("privacy5List3")}</li>
            <li>{t("privacy5List4")}</li>
          </ul>
        </Section>

        <Section title={t("privacy6Title")}>
          <p>{t("privacy6Text")}</p>
          <ul className="list-disc pl-5">
            <li>{t("privacy6List1")}</li>
            <li>{t("privacy6List2")}</li>
            <li>{t("privacy6List3")}</li>
            <li>{t("privacy6List4")}</li>
            <li>{t("privacy6List5")}</li>
          </ul>
        </Section>

        <Section title={t("privacy7Title")}>
          <p>{t("privacy7Text")}</p>
        </Section>
      </div>
    </main>
  );
}

