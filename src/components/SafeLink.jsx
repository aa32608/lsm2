"use client";
import React from 'react';
import Link from 'next/link';

const SafeLink = ({ href, children, ...props }) => {
  // Only render Link on client side
  if (typeof window === 'undefined') {
    // Server-side fallback - render as regular anchor
    return <a href={href} {...props}>{children}</a>;
  }

  // Client-side - use Next.js Link
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
};

export default SafeLink;
