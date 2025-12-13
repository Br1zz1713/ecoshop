import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                }}>
                    <div style={{
                        maxWidth: '600px',
                        textAlign: 'center'
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            color: 'var(--accent-primary)'
                        }}>
                            Oops!
                        </h1>
                        <h2 style={{
                            fontSize: '1.5rem',
                            marginBottom: '1rem',
                            fontWeight: 'normal'
                        }}>
                            Something went wrong
                        </h2>
                        <p style={{
                            marginBottom: '2rem',
                            color: 'var(--text-secondary)'
                        }}>
                            We're sorry for the inconvenience. Please try refreshing the page.
                        </p>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details style={{
                                marginTop: '2rem',
                                padding: '1rem',
                                background: 'var(--bg-secondary)',
                                borderRadius: '8px',
                                textAlign: 'left',
                                fontSize: '0.875rem'
                            }}>
                                <summary style={{ cursor: 'pointer', marginBottom: '1rem' }}>
                                    Error Details (Development Only)
                                </summary>
                                <pre style={{
                                    overflow: 'auto',
                                    padding: '1rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '4px'
                                }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}

                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                marginTop: '2rem',
                                padding: '0.75rem 2rem',
                                fontSize: '1rem',
                                background: 'var(--accent-primary)',
                                color: '#0a0a0a',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                transition: 'transform 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
