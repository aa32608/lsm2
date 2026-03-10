import React from 'react';
import { safeT } from '../utils/translationHelper';

export const VerificationBadge = ({ status, compact = false, iconOnly = false }) => {
  // Use safe translation function
  const t = safeT;
  
  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          text: t("verified", "Verified"),
          color: '#10b981',
          bgColor: '#10b981',
          icon: '✓',
          gradient: 'linear-gradient(135deg, #10b981, #059669)',
          shadow: '0 0 0 1px rgba(16, 185, 129, 0.2), 0 2px 6px rgba(16, 185, 129, 0.15)'
        };
      case 'pending':
        return {
          text: t("pending", "Pending"),
          color: '#f59e0b',
          bgColor: '#f59e0b',
          icon: '⏱',
          gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
          shadow: '0 0 0 1px rgba(245, 158, 11, 0.2), 0 2px 6px rgba(245, 158, 11, 0.15)'
        };
      default:
        return {
          text: t("unverified", "Unverified"),
          color: '#64748b',
          bgColor: '#64748b',
          icon: '○',
          gradient: 'linear-gradient(135deg, #64748b, #475569)',
          shadow: '0 0 0 1px rgba(100, 116, 139, 0.2), 0 2px 6px rgba(100, 116, 139, 0.15)'
        };
    }
  };

  const config = getStatusConfig(status);

  if (compact) {
    return (
      <span 
        className="verification-badge-compact"
        data-verification-status={status}
        style={{ 
          background: config.gradient,
          color: 'white',
          boxShadow: config.shadow,
          border: 'none'
        }}
        title={iconOnly ? config.text : undefined}
      >
        <span className="badge-icon">{config.icon}</span>
      </span>
    );
  }

  return (
    <div className="verification-badge-full">
      <div className="verification-badge-icon" style={{ color: config.color }}>
        {config.icon}
      </div>
      <div className="verification-badge-content">
        <div className="verification-badge-text" style={{ color: config.color }}>
          {config.text}
        </div>
        <div className="verification-badge-description">
          {status === 'verified' 
            ? 'This business has been verified by BizCall.mk'
            : status === 'pending'
            ? 'Verification in progress'
            : 'Not yet verified'
          }
        </div>
      </div>
    </div>
  );
};

export default VerificationBadge;
