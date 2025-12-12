import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, LogOut, Package, Settings, CreditCard, ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Profile() {
    const { user, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('orders'); // orders, settings

    const handleLogout = () => {
        logout();
        addToast(t('nav.logout'), 'info');
        navigate('/');
    };

    if (!user) {
        return (
            <div className="container section" style={{ textAlign: 'center' }}>
                <p>{t('profile.please_login')}</p>
                <div style={{ marginTop: '1rem' }} className="btn" onClick={() => navigate('/login')}>{t('nav.login')}</div>
            </div>
        );
    }

    // Mock Orders Data
    const mockOrders = [
        { id: '#ORD-9281', date: 'Dec 10, 2025', status: 'Delivered', total: '₴1,250', items: 3 },
        { id: '#ORD-8821', date: 'Nov 24, 2025', status: 'In Transit', total: '₴850', items: 1 },
        { id: '#ORD-1123', date: 'Oct 15, 2025', status: 'Delivered', total: '₴3,400', items: 5 },
    ];

    return (
        <div className="container section" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem', alignItems: 'start' }}>

            {/* Sidebar */}
            <aside className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ width: '80px', height: '80px', margin: '0 auto 1rem', background: 'var(--color-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                        <User size={32} color="var(--color-primary)" />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--color-text)' }}>{user?.email?.split('@')[0] || 'User'}</h3>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Member</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<Package size={18} />}>{t('profile.tab_orders')}</TabButton>
                    <TabButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon={<Settings size={18} />}>{t('profile.tab_settings')}</TabButton>
                </nav>

                <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                    <button onClick={handleLogout} className="btn" style={{ width: '100%', background: 'transparent', border: '1px solid var(--color-error)', color: 'var(--color-error)', justifyContent: 'center' }}>
                        <LogOut size={16} style={{ marginRight: '0.5rem' }} /> {t('nav.logout')}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-md)', minHeight: '500px' }}>
                {activeTab === 'orders' && (
                    <div className="animate-fade-in">
                        <h2 className="heading-lg" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>{t('profile.orders_title')}</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {mockOrders.map(order => (
                                <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(125,125,125,0.03)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                        <div style={{ padding: '0.8rem', background: 'rgba(125,125,125,0.05)', borderRadius: '50%' }}>
                                            <Package size={20} color="var(--color-text)" />
                                        </div>
                                        <div>
                                            <h4 style={{ marginBottom: '0.2rem', color: 'var(--color-text)' }}>Order {order.id}</h4>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{order.date} • {order.items} {t('profile.items')}</p>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: 'bold', marginBottom: '0.2rem', color: 'var(--color-text)' }}>{order.total}</p>
                                        <span style={{
                                            display: 'inline-block',
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '99px',
                                            fontSize: '0.8rem',
                                            background: order.status === 'Delivered' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                                            color: order.status === 'Delivered' ? 'var(--color-primary)' : '#facc15'
                                        }}>
                                            {order.status === 'Delivered' ? t('profile.status_delivered') : t('profile.status_transit')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="animate-fade-in">
                        <h2 className="heading-lg" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>{t('profile.settings_title')}</h2>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                                <User size={20} color="var(--color-primary)" /> {t('profile.personal_info')}
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('auth.email')}</label>
                                    <input className="input-field" value={user.email} disabled style={{ opacity: 0.7 }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{t('auth.phone')}</label>
                                    <input className="input-field" value={user.phone_number} disabled style={{ opacity: 0.7 }} />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text)' }}>
                                <Clock size={20} color="var(--color-primary)" /> {t('profile.preferences')}
                            </h3>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--color-text)' }}>
                                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--color-primary)' }} />
                                <span>{t('profile.subscribe')}</span>
                            </label>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function TabButton({ children, active, onClick, icon }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '0.8rem 1rem',
                background: active ? 'var(--color-primary)' : 'transparent',
                color: active ? '#fff' : 'var(--color-text-muted)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.2s',
                marginBottom: '0.5rem'
            }}
        >
            {icon}
            {children}
            {active && <ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
        </button>
    );
}
