import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="footer-section">
            <div className="container grid-footer">

                {/* Brand Column */}
                <div className="footer-col">
                    <h3 className="heading-lg" style={{ textAlign: 'left', fontSize: '1.8rem' }}>EcoDeviva</h3>
                    <p className="footer-text">
                        {t('footer.brand_desc')}
                    </p>
                    <div className="flex gap-sm">
                        <SocialIcon icon={<Instagram size={20} />} />
                        <SocialIcon icon={<Facebook size={20} />} />
                        <SocialIcon icon={<Twitter size={20} />} />
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-col">
                    <h4 className="footer-heading">{t('footer.shop')}</h4>
                    <ul className="footer-links">
                        <li><FooterLink to="/shop">{t('footer.all_products')}</FooterLink></li>
                        <li><FooterLink to="/shop?category=skincare">{t('nav.shop')}</FooterLink></li>
                    </ul>
                </div>

                {/* Support */}
                <div className="footer-col">
                    <h4 className="footer-heading">{t('footer.support')}</h4>
                    <ul className="footer-links">
                        <li><FooterLink to="/contact">FAQ</FooterLink></li>
                        <li><FooterLink to="/contact">{t('footer.privacy')}</FooterLink></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer-col">
                    <h4 className="footer-heading">{t('footer.newsletter_title')}</h4>
                    <p className="footer-text">{t('footer.newsletter_desc')}</p>
                    <form onSubmit={(e) => e.preventDefault()} className="flex gap-xs">
                        <input
                            type="email"
                            placeholder={t('footer.email_placeholder')}
                            className="input-field"
                            style={{ padding: '0.6rem' }}
                        />
                        <button className="btn" style={{ padding: '0.6rem 1rem' }}>{t('footer.subscribe')}</button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom container">
                <p>&copy; 2025 EcoDeviva. {t('footer.rights')}</p>
                <div className="flex gap-md">
                    <span>{t('footer.terms')}</span>
                    <span>{t('footer.privacy')}</span>
                    <span>{t('footer.cookies')}</span>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }) {
    return (
        <a href="#" className="social-icon">
            {icon}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <Link to={to} className="footer-link">
            {children}
        </Link>
    );
}
