import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export default function Footer() {
    const { t } = useLanguage();
    const toast = useToast();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            if (toast && toast.addToast) {
                toast.addToast('Дякуємо за підписку! Знижка 10% надіслана на ваш email.', 'success');
            }
            setEmail('');
        }
    };

    return (
        <footer className="footer-section" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', paddingTop: '4rem', paddingBottom: '2rem' }}>
            <div className="container grid-footer">

                {/* Brand Column */}
                <div className="footer-col">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                        <Leaf size={24} color="var(--color-primary)" />
                        <h3 className="heading-lg" style={{ textAlign: 'left', fontSize: '1.8rem', marginBottom: 0, color: 'var(--color-primary)' }}>
                            EcoShop
                        </h3>
                    </div>
                    <p className="footer-text" style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                        Преміальна натуральна косметика ручної роботи та догляд за тілом. Сертифіковані органічні інгредієнти, перевірені часом.
                    </p>
                    <div className="flex gap-sm">
                        <SocialIcon icon={<Instagram size={20} />} href="https://instagram.com" />
                        <SocialIcon icon={<Facebook size={20} />} href="https://facebook.com" />
                        <SocialIcon icon={<Twitter size={20} />} href="https://twitter.com" />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <h4 className="footer-heading" style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--color-text)' }}>
                        {t('footer.shop')}
                    </h4>
                    <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <li><FooterLink to="/shop">{t('footer.all_products')}</FooterLink></li>
                        <li><FooterLink to="/shop?category=3">Догляд за обличчям</FooterLink></li>
                        <li><FooterLink to="/shop?category=2">Догляд за тілом</FooterLink></li>
                        <li><FooterLink to="/shop?category=4">Zero Waste</FooterLink></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-col">
                    <h4 className="footer-heading" style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--color-text)' }}>
                        Інформація
                    </h4>
                    <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <li><FooterLink to="/about">Про наш бренд</FooterLink></li>
                        <li><FooterLink to="/blog">Блог та поради</FooterLink></li>
                        <li><FooterLink to="/shop">Оплата і доставка</FooterLink></li>
                        <li><FooterLink to="/about">Контакти та шоурум</FooterLink></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-col">
                    <h4 className="footer-heading" style={{ fontSize: '1.1rem', marginBottom: '1.2rem', color: 'var(--color-text)' }}>
                        {t('footer.newsletter_title')}
                    </h4>
                    <p className="footer-text" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                        Отримуйте знижку 10% на перше замовлення та новини про свіжі поставки.
                    </p>
                    <form onSubmit={handleSubscribe} className="flex gap-xs">
                        <input
                            type="email"
                            required
                            placeholder={t('footer.email_placeholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            style={{ padding: '0.65rem 0.9rem', fontSize: '0.88rem' }}
                        />
                        <button type="submit" className="btn" style={{ padding: '0.65rem 1.2rem', fontSize: '0.9rem' }}>
                            {t('footer.subscribe')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom container" style={{ borderTop: '1px solid var(--color-border)', marginTop: '3rem', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                <p>&copy; 2026 EcoShop (Lumière). Всі права захищено.</p>
                <div className="flex gap-md">
                    <span>100% Organic Certified</span>
                    <span>Cruelty-Free</span>
                    <span>Made in Ukraine</span>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon, href }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ display: 'inline-flex', padding: '0.5rem', borderRadius: '50%', background: 'rgba(85,107,47,0.1)', color: 'var(--color-primary)', transition: 'all 0.2s' }}>
            {icon}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="footer-link" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>
            {children}
        </Link>
    );
}
