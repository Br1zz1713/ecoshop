import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useLanguage();

    const [shipping, setShipping] = useState({
        fullName: '', address: '', city: '', zip: '', country: 'Ukraine'
    });

    const [payment, setPayment] = useState({
        cardNumber: '', expiry: '', cvc: ''
    });

    const handlePlaceOrder = () => {
        // Simulate API Call
        setTimeout(() => {
            clearCart();
            setStep(3);
            toast.addToast(t('checkout.success_title'), 'success');
        }, 1500);
    };

    if (items.length === 0 && step !== 3) {
        return <div className="container section">{t('cart.empty')}. <a href="/shop" style={{ color: 'var(--color-primary)' }}>{t('cart.start_shopping')}</a></div>;
    }

    return (
        <div className="container section">
            <h1 className="heading-lg" style={{ textAlign: 'left', marginBottom: '2rem' }}>{t('checkout.title')}</h1>

            <div className="checkout-layout">

                {/* Steps Column */}
                <div>
                    {/* Step 1: Shipping */}
                    <div className={`glass-panel ${step === 1 ? 'active' : ''}`} style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', opacity: step === 1 ? 1 : 0.5, pointerEvents: step === 1 ? 'all' : 'none' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: step > 1 ? 'var(--color-primary)' : 'var(--color-text)' }}>
                            <div style={{ background: step > 1 ? 'var(--color-primary)' : 'rgba(125,125,125,0.1)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', border: '1px solid var(--color-border)' }}>
                                {step > 1 ? <CheckCircle size={16} color="#fff" /> : '1'}
                            </div>
                            {t('checkout.step_shipping')}
                        </h3>

                        {step === 1 && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <input className="input-field" placeholder={t('checkout.full_name')} style={{ gridColumn: 'span 2' }} value={shipping.fullName} onChange={e => setShipping({ ...shipping, fullName: e.target.value })} />
                                <input className="input-field" placeholder={t('checkout.address')} style={{ gridColumn: 'span 2' }} value={shipping.address} onChange={e => setShipping({ ...shipping, address: e.target.value })} />
                                <input className="input-field" placeholder={t('checkout.city')} value={shipping.city} onChange={e => setShipping({ ...shipping, city: e.target.value })} />
                                <input className="input-field" placeholder={t('checkout.zip')} value={shipping.zip} onChange={e => setShipping({ ...shipping, zip: e.target.value })} />
                                <button className="btn" style={{ gridColumn: 'span 2', marginTop: '1rem' }} onClick={() => setStep(2)}>Continue to Payment</button>
                            </div>
                        )}
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`glass-panel ${step === 2 ? 'active' : ''}`} style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', opacity: step === 2 ? 1 : 0.5, pointerEvents: step === 2 ? 'all' : 'none' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                            <div style={{ background: step > 2 ? 'var(--color-primary)' : 'rgba(125,125,125,0.1)', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', border: '1px solid var(--color-border)' }}>
                                '2'
                            </div>
                            {t('checkout.step_payment')}
                        </h3>

                        {step === 2 && (
                            <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div style={{ gridColumn: 'span 2', padding: '1rem', background: 'rgba(125,125,125,0.1)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', border: '1px solid var(--color-border)' }}>
                                    <CreditCard /> <span>Credit Card (Secure)</span>
                                </div>
                                <input
                                    className="input-field"
                                    placeholder={t('checkout.card_number')}
                                    style={{ gridColumn: 'span 2' }}
                                    value={payment.cardNumber}
                                    onChange={e => setPayment({ ...payment, cardNumber: e.target.value })}
                                    required
                                    pattern="[0-9]{16}"
                                    maxLength="16"
                                    title="Enter 16-digit card number"
                                />
                                <input
                                    className="input-field"
                                    placeholder={t('checkout.expiry')}
                                    value={payment.expiry}
                                    onChange={e => setPayment({ ...payment, expiry: e.target.value })}
                                    required
                                    pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                                    maxLength="5"
                                    title="MM/YY format"
                                />
                                <input
                                    className="input-field"
                                    placeholder={t('checkout.cvv')}
                                    value={payment.cvc}
                                    onChange={e => setPayment({ ...payment, cvc: e.target.value })}
                                    required
                                    pattern="[0-9]{3,4}"
                                    maxLength="4"
                                    title="3 or 4 digit CVV"
                                />
                                <div style={{ gridColumn: 'span 2', marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                    <button className="btn" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} onClick={() => setStep(1)}>Back</button>
                                    <button className="btn" style={{ flex: 1 }} onClick={handlePlaceOrder}>{t('checkout.place_order')} ₴{total.toFixed(2)}</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Order Summary Column */}
                <div>
                    <div className="glass-panel order-summary" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', position: 'sticky', top: '100px' }}>
                        <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', color: 'var(--color-text)' }}>{t('cart.title')}</h3>
                        {items.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                <span>{item.quantity}x {item.name}</span>
                                <span>₴{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span style={{ color: 'var(--color-text)' }}>{t('cart.total')}</span>
                            <span style={{ color: 'var(--color-primary)' }}>₴{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Success Modal Overlay */}
            {step === 3 && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-panel animate-slide-up" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', maxWidth: '500px', background: 'var(--color-surface)' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                            <CheckCircle size={40} color="#fff" />
                        </div>
                        <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>{t('checkout.success_title')}</h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            {t('checkout.success_msg')}
                        </p>
                        <button className="btn" onClick={() => navigate('/')}>{t('checkout.back_home')}</button>
                    </div>
                </div>
            )}
        </div>
    );
}
