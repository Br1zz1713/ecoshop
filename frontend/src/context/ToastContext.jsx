// ToastContext.jsx - provides a simple toast notification system
import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 1500) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const value = React.useMemo(() => ({ addToast }), [addToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            {/* Render toast container */}
            <div style={toastContainerStyle}>
                {toasts.map((t) => (
                    <div key={t.id} style={{ ...toastStyle, ...typeStyles[t.type] }}>
                        {t.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);

// Inline styles for simplicity – can be moved to CSS later
const toastContainerStyle = {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    zIndex: 1000,
};

const toastStyle = {
    padding: '0.75rem 1.25rem',
    borderRadius: '0.5rem',
    color: '#fff',
    minWidth: '200px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    fontFamily: 'var(--font-sans)',
};

const typeStyles = {
    info: { background: '#2563eb' }, // blue
    success: { background: '#16a34a' }, // green
    error: { background: '#dc2626' }, // red
    warning: { background: '#ca8a04' }, // amber
};
