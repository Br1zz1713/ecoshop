import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Cart() {
    const { items, removeFromCart, updateQuantity, total } = useCart();
    const { t } = useLanguage();

    if (items.length === 0) {
        return (
            <div className="container section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="animate-fade-in">
                    <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>{t('cart.empty')}</h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Looks like you haven't added any eco-friendly treats yet.</p>
                    <Link to="/shop" className="btn">{t('cart.start_shopping')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container section animate-slide-up">
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
                <ArrowLeft size={18} /> {t('cart.start_shopping')}
            </Link>

            <h2 className="heading-lg" style={{ textAlign: 'left', marginBottom: '2rem' }}>{t('cart.title')}</h2>

            <div className="cart-layout">

                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {items.map(item => (
                        <div key={item.id} className="glass-panel" style={{
                            display: 'flex',
                            gap: '1.5rem',
                            padding: '1.5rem',
                            borderRadius: 'var(--radius-md)'
                        }}>
                            <div style={{ width: '100px', height: '100px', background: '#0a0a0a', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <div style={{ color: 'var(--color-text-muted)' }}>No Img</div>
                                )}
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-text)' }}>{item.name}</h3>
                                    <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>₴{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Unit Price: ₴{item.price}</p>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                                    {/* Quantity Control - Pill Shape */}
                                    {/* Quantity Control - Minimal */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'transparent',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '50%',
                                                color: 'var(--color-text)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ width: '24px', textAlign: 'center', fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-text)' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                width: '28px',
                                                height: '28px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'transparent',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: '50%',
                                                color: 'var(--color-text)',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text)'; }}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    {/* Remove Button - Elegant Text/Icon link */}
                                    {/* Remove Button - Icon Only */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        style={{
                                            color: 'var(--color-text-muted)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '0.5rem',
                                            transition: 'color 0.2s',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        title={t('cart.remove') || 'Remove'}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-error)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="glass-panel cart-summary" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', position: 'sticky', top: '120px' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', color: 'var(--color-text)' }}>{t('cart.title')}</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('cart.subtotal')}</span>
                        <span style={{ color: 'var(--color-text)' }}>₴{total.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>{t('cart.shipping')}</span>
                        <span style={{ color: 'var(--color-primary)' }}>Free</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                        <span style={{ color: 'var(--color-text)' }}>{t('cart.total')}</span>
                        <span style={{ color: 'var(--color-primary)' }}>₴{total.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="btn" style={{ width: '100%', textAlign: 'center' }}>{t('cart.checkout')}</Link>
                </div>

            </div>
        </div>
    );
}
