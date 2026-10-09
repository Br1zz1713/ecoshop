import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, CreditCard, Truck, ShieldCheck, MapPin, Phone, Mail, User, ArrowLeft, PackageCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';

export default function Checkout() {
    const { items, total, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
    const [orderNumber, setOrderNumber] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { t } = useLanguage();

    const [shipping, setShipping] = useState({
        fullName: '',
        phone: '+380 ',
        email: '',
        city: 'Київ',
        deliveryMethod: 'nova_poshta_branch', // nova_poshta_branch, nova_poshta_locker, courier, pickup
        branch: 'Відділення №1'
    });

    const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, mono

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();
        setSubmitting(true);

        const generatedId = `ECO-${Math.floor(1000 + Math.random() * 9000)}`;
        setOrderNumber(generatedId);

        try {
            await axios.post('/api/orders/create/', {
                items: items.map(item => ({
                    product: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                first_name: shipping.fullName.split(' ')[0] || 'Клієнт',
                last_name: shipping.fullName.split(' ').slice(1).join(' ') || 'EcoShop',
                email: shipping.email || 'customer@example.com',
                address: `${shipping.deliveryMethod}: ${shipping.branch}, ${shipping.city}`,
                city: shipping.city,
                paid: paymentMethod === 'card'
            }).catch(() => {});

            clearCart();
            setStep(3);
            if (toast && toast.addToast) {
                toast.addToast(`Замовлення #${generatedId} успішно оформлено!`, 'success');
            }
        } catch {
            clearCart();
            setStep(3);
        } finally {
            setSubmitting(false);
        }
    };

    if (items.length === 0 && step !== 3) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <h2 style={{ marginBottom: '1rem' }}>Ваш кошик порожній</h2>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Додайте натуральні косметичні засоби перед оформленням.</p>
                <Link to="/shop" className="btn">
                    Перейти до каталогу
                </Link>
            </div>
        );
    }

    return (
        <div className="container section animate-slide-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
                <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                    <ArrowLeft size={16} /> Назад до кошика
                </Link>
            </div>

            <h1 className="heading-lg" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '2.5rem' }}>
                {step === 3 ? 'Замовлення підтверджено' : 'Оформлення замовлення'}
            </h1>

            {step !== 3 && (
                <div className="checkout-layout" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Left Steps Column */}
                    <div>
                        {/* Step 1: Контакти та Доставка */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: step === 1 ? '1px solid var(--color-primary)' : '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: step >= 1 ? 'var(--color-primary)' : 'var(--color-border)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                                    1
                                </div>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: 0 }}>
                                    Контактні дані та доставка по Україні
                                </h3>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.5rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Прізвище та Ім'я одержувача *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Шевченко Олена"
                                        value={shipping.fullName}
                                        onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Номер телефону *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+380 67 123 45 67"
                                        value={shipping.phone}
                                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Електронна пошта
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="olena@gmail.com"
                                        value={shipping.email}
                                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Місто отримання *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Київ / Львів / Одеса"
                                        value={shipping.city}
                                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Спосіб доставки
                                    </label>
                                    <select
                                        value={shipping.deliveryMethod}
                                        onChange={(e) => setShipping({ ...shipping, deliveryMethod: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    >
                                        <option value="nova_poshta_branch">Нова Пошта (Відділення)</option>
                                        <option value="nova_poshta_locker">Нова Пошта (Поштомат)</option>
                                        <option value="courier">Кур'єр Нова Пошта</option>
                                        <option value="pickup">Самовивіз з шоуруму (Київ)</option>
                                    </select>
                                </div>

                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                                        Номер відділення / поштомату / адреса *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Відділення №24 (вул. Хрещатик, 15)"
                                        value={shipping.branch}
                                        onChange={(e) => setShipping({ ...shipping, branch: e.target.value })}
                                        className="input-field"
                                        style={{ width: '100%', padding: '0.75rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step 2: Спосіб оплати */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', border: '1px solid var(--color-border)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                <div style={{ background: 'var(--color-primary)', color: '#fff', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700 }}>
                                    2
                                </div>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-text)', marginBottom: 0 }}>
                                    Спосіб оплати
                                </h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'cod' ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: paymentMethod === 'cod' ? 'rgba(85,107,47,0.08)' : 'transparent' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        style={{ accentColor: 'var(--color-primary)' }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Оплата при отриманні (післяплата)</div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Розрахунок карткою або готівкою у відділенні Нової Пошти</div>
                                    </div>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'card' ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: paymentMethod === 'card' ? 'rgba(85,107,47,0.08)' : 'transparent' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        style={{ accentColor: 'var(--color-primary)' }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Оплата картою онлайн (Visa / Mastercard / Apple Pay)</div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Безпечна миттєва оплата без комісії</div>
                                    </div>
                                </label>

                                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: `1px solid ${paymentMethod === 'mono' ? 'var(--color-primary)' : 'var(--color-border)'}`, borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: paymentMethod === 'mono' ? 'rgba(85,107,47,0.08)' : 'transparent' }}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        checked={paymentMethod === 'mono'}
                                        onChange={() => setPaymentMethod('mono')}
                                        style={{ accentColor: 'var(--color-primary)' }}
                                    />
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Monobank (Швидкий переказ за реквізитами)</div>
                                        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>Реквізити надішлемо в SMS та Viber після підтвердження</div>
                                    </div>
                                </label>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={submitting}
                                className="btn"
                                style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
                            >
                                <PackageCheck size={20} />
                                {submitting ? 'Оформлення...' : `Підтвердити замовлення • ₴${total.toFixed(2)}`}
                            </button>
                        </div>
                    </div>

                    {/* Right Summary Column */}
                    <div>
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', position: 'sticky', top: '100px' }}>
                            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.8rem', fontSize: '1.2rem' }}>
                                Ваше замовлення ({items.length})
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', maxHeight: '340px', overflowY: 'auto' }}>
                                {items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: '6px', objectFit: 'cover', background: '#f5f5f0' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.quantity} шт × ₴{item.price}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                                            ₴{(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    <span>Вартість товарів:</span>
                                    <span>₴{total.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    <span>Доставка:</span>
                                    <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>За тарифами перевізника</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', paddingTop: '0.8rem', borderTop: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                                    <span>До сплати:</span>
                                    <span style={{ color: 'var(--color-primary)' }}>₴{total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(85,107,47,0.08)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.8rem', alignItems: 'center', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                                <ShieldCheck size={20} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                                <span>Безпечна покупка. Перевірка товару перед оплатою у відділенні.</span>
                            </div>
                        </div>
                    </div>

                </div>
            )}

            {/* Step 3: Success Screen */}
            {step === 3 && (
                <div style={{ maxWidth: '600px', margin: '2rem auto', textAlign: 'center' }}>
                    <div className="glass-panel" style={{ padding: '3.5rem 2.5rem', borderRadius: 'var(--radius-lg)' }}>
                        <div style={{ width: '80px', height: '80px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.8rem', boxShadow: '0 8px 24px rgba(85,107,47,0.3)' }}>
                            <CheckCircle size={44} color="#fff" />
                        </div>
                        <h2 className="heading-lg" style={{ marginBottom: '0.8rem', fontSize: '2.2rem' }}>
                            Дякуємо за ваше замовлення!
                        </h2>
                        <div style={{ display: 'inline-block', padding: '0.4rem 1.2rem', background: 'rgba(85,107,47,0.12)', borderRadius: '99px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            Номер: {orderNumber}
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2.5rem' }}>
                            Ми отримали ваше замовлення та готуємо його до відправки. Менеджер надішле ТТН у SMS на вказаний номер телефону.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button onClick={() => navigate('/shop')} className="btn" style={{ padding: '0.9rem 2rem' }}>
                                Продовжити покупки
                            </button>
                            <button onClick={() => navigate('/')} className="btn" style={{ background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)', padding: '0.9rem 2rem' }}>
                                На головну
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
