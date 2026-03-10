import React from 'react';

export const VerificationBadge = ({ status, compact = false }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'verified':
        return {
          text: 'Verified',
          color: '#10b981',
          bgColor: '#10b981',
          icon: '✅'
        };
      case 'pending':
        return {
          text: 'Pending',
          color: '#f59e0b',
          bgColor: '#f59e0b',
          icon: '⏳'
        };
      default:
        return {
          text: 'Unverified',
          color: '#64748b',
          bgColor: '#64748b',
          icon: '📋'
        };
    }
  };

  const config = getStatusConfig(status);

  if (compact) {
    return (
      <span 
        className="verification-badge compact"
        style={{ 
          background: config.bgColor,
          color: 'white'
        }}
      >
        {config.icon} {config.text}
      </span>
    );
  }

  return (
    <div className="verification-badge full">
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
