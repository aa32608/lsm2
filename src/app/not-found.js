import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ color: '#64748b', marginBottom: '2rem' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
        Go Home
      </Link>
    </div>
  );
}
