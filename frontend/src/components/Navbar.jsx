import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Sprout, LogIn, User, LayoutDashboard, Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
    const { count } = useCart();
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    // Custom Logo SVG Component
    const Logo = () => (
        <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
        >
            <path
                d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M12 14V22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M8 18C8 18 9 17 12 17C15 17 16 18 16 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <nav className="glass-nav sticky-nav">
            <div className="container flex items-center justify-between" style={{ padding: '1rem' }}>
                {/* Brand */}
                <Link to="/" className="flex items-center gap-sm" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700 }}>
                    <Sprout size={28} />
                    <span>{t('nav.brand')}</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu flex items-center gap-md">
                    <Link to="/shop" className={`nav-link ${isActive('/shop') ? 'active' : ''}`}>{t('nav.shop')}</Link>
                    <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>{t('nav.about')}</Link>
                    <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`}>Blog</Link>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-sm">

                    {/* Language Switcher */}
                    <div className="lang-switcher relative">
                        {(() => {
                            const [open, setOpen] = useState(false);
                            const flags = { en: '🇺🇸', ua: '🇺🇦', ru: '🇷🇺' };

                            // Close dropdown when clicking outside
                            useEffect(() => {
                                const close = () => setOpen(false);
                                if (open) window.addEventListener('click', close);
                                return () => window.removeEventListener('click', close);
                            }, [open]);

                            return (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="icon-btn gap-xs"
                                        style={{
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <Globe size={18} /> <span className="desktop-only">{flags[language]}</span>
                                    </button>

                                    {open && (
                                        <div className="glass-panel dropdown-menu">
                                            {['en', 'ua', 'ru'].map(lang => (
                                                <button
                                                    key={lang}
                                                    onClick={() => { setLanguage(lang); setOpen(false); }}
                                                    className={`dropdown-item ${language === lang ? 'active' : ''}`}
                                                >
                                                    <span style={{ fontSize: '1.2rem' }}>{flags[lang]}</span>
                                                    <span>{lang.toUpperCase()}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })()}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        title="Toggle Theme"
                        className="icon-btn"
                        style={{
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="divider-vertical"></div>

                    {/* Cart */}
                    <Link to="/cart" className="relative icon-btn" style={{ color: 'var(--color-text)' }}>
                        <ShoppingBag size={24} />
                        {count > 0 && (
                            <span className="cart-badge">{count}</span>
                        )}
                    </Link>

                    {/* User / Login */}
                    <div className="desktop-only">
                        {user ? (
                            <div className="flex items-center gap-sm">
                                {user.is_staff && (
                                    <Link to="/admin" className="icon-btn text-primary">
                                        <LayoutDashboard size={20} />
                                    </Link>
                                )}
                                <Link to="/profile" className="icon-btn text-primary">
                                    <User size={20} />
                                </Link>
                            </div>
                        ) : (
                            <Link to="/login" className="flex items-center gap-xs font-medium text-primary hover:underline">
                                <LogIn size={20} /> <span>{t('nav.login')}</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="mobile-only icon-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="mobile-nav animate-slide-up">
                    <Link to="/shop" className="mobile-link">{t('nav.shop')}</Link>
                    <Link to="/about" className="mobile-link">{t('nav.about')}</Link>
                    <Link to="/blog" className="mobile-link">Blog</Link>
                    <hr style={{ borderColor: 'var(--color-border)', margin: '1rem 0' }} />
                    {user ? (
                        <>
                            <Link to="/profile" className="mobile-link flex items-center gap-sm">
                                <User size={18} /> {t('nav.profile')}
                            </Link>
                            {user.is_staff && (
                                <Link to="/admin" className="mobile-link flex items-center gap-sm">
                                    <LayoutDashboard size={18} /> {t('nav.dashboard')}
                                </Link>
                            )}
                        </>
                    ) : (
                        <Link to="/login" className="mobile-link flex items-center gap-sm">
                            <LogIn size={18} /> {t('nav.login')}
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
