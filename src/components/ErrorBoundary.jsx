import React from 'react';
import { useApp } from '../context/AppContext';

// Error display component that uses context
const ErrorDisplay = () => {
  const { t } = useApp();
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
      background: '#f8fafc',
      color: '#1e293b'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{t("somethingWentWrongTitle")}</h1>
      <p style={{ marginBottom: '2rem', color: '#64748b' }}>
        {t("apologizeInconvenience")}
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        {t("refreshPage")}
      </button>
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If we're inside AppProvider, use ErrorDisplay with context
      // Otherwise, show fallback (for SSR or before context is available)
      try {
        return <ErrorDisplayWrapper error={this.state.error} />;
      } catch {
        // Fallback if context not available
        return (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            padding: '20px',
            textAlign: 'center',
            background: '#f8fafc',
            color: '#1e293b'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
            <p style={{ marginBottom: '2rem', color: '#64748b' }}>
              We apologize for the inconvenience. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                fontSize: '1rem',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <pre style={{ marginTop: '20px', textAlign: 'left', background: '#e2e8f0', padding: '10px', borderRadius: '4px', maxWidth: '100%', overflow: 'auto' }}>
                {this.state.error?.toString()}
              </pre>
            )}
          </div>
        );
      }
    }

    return this.props.children;
  }
}

// Wrapper to safely use context
const ErrorDisplayWrapper = ({ error }) => {
  return (
    <>
      <ErrorDisplay />
      {process.env.NODE_ENV === 'development' && error && (
        <pre style={{ marginTop: '20px', textAlign: 'left', background: '#e2e8f0', padding: '10px', borderRadius: '4px', maxWidth: '100%', overflow: 'auto', position: 'fixed', bottom: '20px', left: '20px', right: '20px', maxHeight: '200px' }}>
          {error.toString()}
        </pre>
      )}
    </>
  );
};

export default ErrorBoundary;
