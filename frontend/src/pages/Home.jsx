import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, CreditCard, ChevronRight, ShoppingBag, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { DEFAULT_CATEGORIES, DEFAULT_PRODUCTS } from '../data/mockProducts';

export default function Home() {
    const { t } = useLanguage();
    const { addToCart } = useCart();
    const toast = useToast();
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [hitProducts, setHitProducts] = useState(DEFAULT_PRODUCTS.slice(0, 4));

    useEffect(() => {
        axios.get('/api/categories/')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    setCategories(res.data);
                }
            })
            .catch(() => {
                setCategories(DEFAULT_CATEGORIES);
            });

        axios.get('/api/products/')
            .then(res => {
                if (res.data && res.data.length > 0) {
                    const hits = res.data.slice(0, 4);
                    setHitProducts(hits);
                }
            })
            .catch(() => {
                setHitProducts(DEFAULT_PRODUCTS.slice(0, 4));
            });
    }, []);

    const visibleCategories = categories.filter(c => c.is_visible_on_main !== false);

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        if (toast && toast.addToast) {
            toast.addToast(`${product.name} додано в кошик!`, 'success');
        }
    };

    return (
        <div>
            {/* 1. Hero Section (Clean Luxury Botanical) */}
            <section className="hero-section" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2000&auto=format&fit=crop)',
                height: '80vh',
                position: 'relative'
            }}>
                <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(251,251,250,0.96) 0%, rgba(251,251,250,0.85) 50%, rgba(251,251,250,0.25) 100%)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div className="animate-slide-up" style={{ textAlign: 'left', maxWidth: '640px', color: 'var(--color-text)' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '0.45rem 1.2rem', background: 'var(--color-primary)', borderRadius: '99px', fontSize: '0.88rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 600, boxShadow: '0 4px 14px rgba(30, 58, 47, 0.25)' }}>
                            <Leaf size={15} /> {t('hero.badge')}
                        </span>
                        <h1 className="heading-xl" style={{ fontSize: '3.6rem', marginBottom: '1.5rem', whiteSpace: 'pre-line', color: 'var(--color-text)', lineHeight: 1.15 }}>
                            {t('hero.title')}
                        </h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#3A4640', lineHeight: 1.6, fontWeight: 500 }}>
                            {t('hero.subtitle')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <Link to="/shop" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', boxShadow: '0 8px 20px rgba(85,107,47,0.3)' }}>
                                {t('hero.shop_all')} <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                            </Link>
                            <Link to="/about" className="btn" style={{ background: 'transparent', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                                {t('hero.our_story')}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Values Banner (4 Icons) */}
            <div style={{ background: 'var(--color-surface)', padding: '3.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
                    <FeatureItem icon={<Leaf color="var(--color-primary)" size={28} />} title={t('features.organic')} desc={t('features.organic_desc')} />
                    <FeatureItem icon={<ShieldCheck color="var(--color-primary)" size={28} />} title={t('features.cruelty')} desc={t('features.cruelty_desc')} />
                    <FeatureItem icon={<Truck color="var(--color-primary)" size={28} />} title={t('features.carbon')} desc={t('features.carbon_desc')} />
                    <FeatureItem icon={<CreditCard color="var(--color-primary)" size={28} />} title={t('features.payment')} desc={t('features.payment_desc')} />
                </div>
            </div>

            {/* 3. Categories (Dynamic with rich covers) */}
            {visibleCategories.length > 0 && (
                <section className="section container">
                    <Header title={t('home.categories')} secondaryColor />
                    <div className="grid-products">
                        {visibleCategories.map(cat => (
                            <CategoryCard
                                key={cat.id}
                                title={cat.name}
                                img={cat.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800'}
                                link={`/shop?category=${cat.id}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Real Bestsellers / Hits with Working Buy */}
            <section className="section" style={{ background: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Selected for You</span>
                            <h2 className="heading-lg" style={{ marginBottom: 0, textAlign: 'left', color: 'var(--color-secondary)' }}>{t('home.hits')}</h2>
                        </div>
                        <Link to="/shop" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '1rem' }}>
                            {t('home.see_all')} <ChevronRight size={18} />
                        </Link>
                    </div>

                    <div className="grid-products">
                        {hitProducts.map((product) => (
                            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                <Link to={`/product/${product.id}`} style={{ position: 'relative', overflow: 'hidden' }}>
                                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', color: 'var(--color-primary)', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5, boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}>
                                        <Leaf size={12} fill="currentColor" /> BESTSELLER
                                    </div>
                                    <div className="card-image-container" style={{ height: '280px', background: '#f6f6f2' }}>
                                        <img src={product.image} alt={product.name} className="card-image" style={{ transition: 'transform 0.4s ease' }} />
                                    </div>
                                </Link>

                                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem', color: '#EAB308' }}>
                                        <Star size={15} fill="currentColor" />
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>{product.rating || 5.0}</span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>({product.reviews_count || 24})</span>
                                    </div>

                                    <Link to={`/product/${product.id}`} style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text)', lineHeight: 1.3 }}>
                                            {product.name}
                                        </h3>
                                    </Link>

                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                        {product.description}
                                    </p>

                                    <div className="flex justify-between items-center" style={{ paddingTop: '0.8rem', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
                                        <div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', display: 'block' }}>Ціна</span>
                                            <span style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-text)' }}>₴{product.price}</span>
                                        </div>
                                        <button
                                            onClick={(e) => handleAddToCart(product, e)}
                                            className="btn"
                                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        >
                                            <ShoppingBag size={16} /> В кошик
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. History / Trust Block */}
            <section className="section container" style={{ textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '4rem', borderRadius: 'var(--radius-lg)' }}>
                    <h2 className="heading-lg" style={{ color: 'var(--color-secondary)' }}>{t('home.history_title')}</h2>
                    <p style={{ maxWidth: '800px', margin: '0 auto 2rem', fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--color-text-muted)' }}>
                        {t('home.history_text')}
                    </p>
                    <Link to="/about" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                        {t('hero.our_story')} <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* 6. Expert Blog */}
            <section className="section container">
                <Header title={t('home.blog_title')} secondaryColor />
                <div className="grid-products">
                    <BlogCard title={t('blog.article_1')} img="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800" />
                    <BlogCard title={t('blog.article_2')} img="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800" />
                    <BlogCard title={t('blog.article_3')} img="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800" />
                </div>
            </section>
        </div>
    );
}

function FeatureItem({ icon, title, desc }) {
    return (
        <div className="flex flex-col items-center gap-sm">
            <div style={{ padding: '1rem', background: 'rgba(85, 107, 47, 0.1)', borderRadius: '50%' }}>
                {icon}
            </div>
            <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', color: 'var(--color-text)' }}>{title}</h4>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{desc}</p>
            </div>
        </div>
    );
}

function CategoryCard({ title, img, link }) {
    return (
        <Link to={link} className="card relative" style={{ height: '320px', overflow: 'hidden', display: 'block' }}>
            <img src={img} alt={title} className="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem', background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)' }}>{title}</h3>
                <span style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Переглянути колекцію &rarr;
                </span>
            </div>
        </Link>
    );
}

function BlogCard({ title, img }) {
    return (
        <Link to="/blog" className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            <div className="card-image-container" style={{ height: '220px', overflow: 'hidden' }}>
                <img src={img} alt={title} className="card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem', color: 'var(--color-text)', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>{title}</h3>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    Читати статтю <ChevronRight size={16} />
                </span>
            </div>
        </Link>
    );
}

function Header({ title, secondaryColor }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: 0, color: secondaryColor ? 'var(--color-secondary)' : 'var(--color-text)' }}>{title}</h2>
        </div>
    );
}
