import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CountrySelect({ value, onChange }) {
    const [open, setOpen] = useState(false);

    // Common country codes
    const codes = [
        { code: '+380', country: 'UA', flag: '🇺🇦' },
        { code: '+1', country: 'US', flag: '🇺🇸' },
        { code: '+44', country: 'UK', flag: '🇬🇧' },
        { code: '+48', country: 'PL', flag: '🇵🇱' },
        { code: '+49', country: 'DE', flag: '🇩🇪' },
        { code: '+33', country: 'FR', flag: '🇫🇷' },
    ];

    const selected = codes.find(c => c.code === value) || codes[0];

    useEffect(() => {
        const close = () => setOpen(false);
        if (open) window.addEventListener('click', close);
        return () => window.removeEventListener('click', close);
    }, [open]);

    return (
        <div className="relative" onClick={e => e.stopPropagation()}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="input-field" // Reuse base styles
                style={{
                    padding: '0.875rem 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '110px',
                    justifyContent: 'center',
                    cursor: 'pointer'
                }}
            >
                <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>{selected.flag}</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-text)', fontWeight: 500 }}>{selected.code}</span>
                <ChevronDown size={14} style={{ opacity: 0.5, marginLeft: 'auto' }} />
            </button>

            {open && (
                <div className="glass-panel animate-fade-in" style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    width: '100%',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    zIndex: 50,
                    padding: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                }}>
                    {codes.map(c => (
                        <button
                            key={c.code}
                            type="button"
                            onClick={() => { onChange(c.code); setOpen(false); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                background: c.code === value ? 'rgba(0,0,0,0.05)' : 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left',
                                color: 'var(--color-text)'
                            }}
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            <span>{c.flag}</span>
                            <span style={{ fontSize: '0.9rem' }}>{c.code}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
