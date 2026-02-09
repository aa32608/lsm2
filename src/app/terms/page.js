"use client";

import React from "react";
import { useApp } from "../../context/AppContext";

const Section = ({ title, children }) => (
  <section className="mb-lg">
    <h2 className="text-h3">{title}</h2>
    <div className="text-body">{children}</div>
  </section>
);

export default function TermsPage() {
  const { t } = useApp();

  return (
    <main className="legal-page">
      <div className="container" style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}>
        <h1 className="page-title" style={{ marginBottom: "16px" }}>{t("termsOfService")}</h1>
        <p className="text-sm text-muted mb-lg">
          {t("termsLastUpdated")}{" "}
          <span>{typeof window !== "undefined" ? new Date().toLocaleDateString() : "2025"}</span>
        </p>

        <Section title={t("terms1Title")}>
          <p>{t("terms1Text")}</p>
        </Section>

        <Section title={t("terms2Title")}>
          <p className="mb-sm">{t("terms2TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms2List1New")}</li>
            <li>{t("terms2List2New")}</li>
            <li>{t("terms2List3New")}</li>
          </ul>
        </Section>

        <Section title={t("terms3Title")}>
          <p className="mb-sm">{t("terms3TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms3List1")}</li>
            <li>{t("terms3List2")}</li>
            <li>{t("terms3List3")}</li>
            <li>{t("terms3List4")}</li>
            <li>{t("terms3List5")}</li>
            <li>{t("terms3List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms4Title")}>
          <p className="mb-sm">{t("terms4TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms4List1")}</li>
            <li>{t("terms4List2")}</li>
            <li>{t("terms4List3")}</li>
            <li>{t("terms4List4")}</li>
            <li>{t("terms4List5")}</li>
            <li>{t("terms4List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms5Title")}>
          <p className="mb-sm">{t("terms5TextNew")}</p>
          <ul className="list-disc pl-5">
            <li>{t("terms5List1")}</li>
            <li>{t("terms5List2")}</li>
            <li>{t("terms5List3")}</li>
            <li>{t("terms5List4")}</li>
            <li>{t("terms5List5")}</li>
            <li>{t("terms5List6")}</li>
          </ul>
        </Section>

        <Section title={t("terms6Title")}>
          <p>{t("terms6Text")}</p>
        </Section>

        <Section title={t("terms7Title")}>
          <p>{t("terms7Text")}</p>
        </Section>

        <Section title={t("terms8Title")}>
          <p>{t("terms8Text")}</p>
        </Section>
      </div>
    </main>
  );
}

