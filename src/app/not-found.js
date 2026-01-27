"use client";
import Link from 'next/link';
import { useApp } from '../context/AppContext';

export default function NotFound() {
  const { t } = useApp();
  
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t("pageNotFoundTitle")}</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        {t("pageNotFoundDescription")}
      </p>
      <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
        {t("goHome")}
      </Link>
    </div>
  );
}
