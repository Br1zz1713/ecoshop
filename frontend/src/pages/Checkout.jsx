import { useState, useEffect } from 'react';
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

    const handlePlaceOrder = async (details) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/shop/orders/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items.map(item => ({
                        product: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    // Use shipping info from state
                    first_name: shipping.fullName.split(' ')[0] || 'Guest',
                    last_name: shipping.fullName.split(' ').slice(1).join(' ') || 'User',
                    email: 'guest@example.com', // Placeholder or add input
                    address: shipping.address,
                    city: shipping.city,
                    paid: true
                }),
            });

            if (response.ok) {
                clearCart();
                setStep(3);
                toast.addToast(t('checkout.success_title'), 'success');
            } else {
                toast.addToast('Order failed', 'error');
            }
        } catch (error) {
            console.error(error);
            toast.addToast('Network error', 'error');
        }
    };

    useEffect(() => {
        if (step === 2) {
            const scriptId = 'paypal-sdk';
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD"; // Use 'test' or valid sandbox ID
                script.async = true;
                script.onload = renderPayPalButtons;
                document.body.appendChild(script);
            } else {
                renderPayPalButtons();
            }
        }
    }, [step]);

    const renderPayPalButtons = () => {
        if (window.paypal && document.getElementById('paypal-button-container')) {
            document.getElementById('paypal-button-container').innerHTML = ''; // Clear previous
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: total.toFixed(2)
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        handlePlaceOrder(details);
                    });
                }
            }).render('#paypal-button-container');
        }
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
                                <div id="paypal-button-container" style={{ gridColumn: 'span 2', marginTop: '1rem', minHeight: '150px' }}></div>
                                <div style={{ gridColumn: 'span 2', marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                                    <button className="btn" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} onClick={() => setStep(1)}>Back</button>
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
            {
                step === 3 && (
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
                )
            }
        </div >
    );
}
