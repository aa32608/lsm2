"use client";
import React from 'react';

export default function ListingsSkeleton({ count = 6, viewMode = "grid" }) {
  return (
    <div className={`listings-container listings-${viewMode} listings-skeleton`} role="status" aria-label="Loading listings">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="listing-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-meta">
              <div className="skeleton-badge"></div>
              <div className="skeleton-badge"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

