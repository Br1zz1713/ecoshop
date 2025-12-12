import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, Truck, CreditCard, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/api/categories/')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Failed to fetch categories", err));
    }, []);

    const visibleCategories = categories.filter(c => c.is_visible_on_main);

    return (
        <div>
            {/* 1. Hero Section (Lavender/Clean) */}
            <section className="hero-section" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1541980209-17d3d2dc8519?q=80&w=2000&auto=format&fit=crop)',
                height: '80vh'
            }}>
                <div className="hero-overlay" style={{ background: 'linear-gradient(to right, rgba(250,250,245,0.8), rgba(250,250,245,0))' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div className="animate-slide-up" style={{ textAlign: 'left', maxWidth: '600px', color: 'var(--color-text)' }}>
                        <span style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'var(--color-primary)', borderRadius: '99px', fontSize: '0.9rem', marginBottom: '1.5rem', color: '#fff', fontWeight: 600 }}>
                            {t('hero.badge')}
                        </span>
                        <h1 className="heading-xl" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', whiteSpace: 'pre-line', color: 'var(--color-text)' }}>{t('hero.title')}</h1>
                        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                            {t('hero.subtitle')}
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/shop" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>{t('hero.shop_all')}</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Values Banner (4 Icons) */}
            <div style={{ background: 'var(--color-surface)', padding: '4rem 0', borderBottom: '1px solid var(--color-border)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
                    <FeatureItem icon={<Leaf color="var(--color-primary)" size={28} />} title={t('features.organic')} desc={t('features.organic_desc')} />
                    <FeatureItem icon={<ShieldCheck color="var(--color-primary)" size={28} />} title={t('features.cruelty')} desc={t('features.cruelty_desc')} />
                    <FeatureItem icon={<Truck color="var(--color-primary)" size={28} />} title={t('features.carbon')} desc={t('features.carbon_desc')} />
                    <FeatureItem icon={<CreditCard color="var(--color-primary)" size={28} />} title={t('features.payment')} desc={t('features.payment_desc')} />
                </div>
            </div>

            {/* 3. Categories (Dynamic) */}
            {visibleCategories.length > 0 && (
                <section className="section container">
                    <Header title={t('home.categories')} secondaryColor />
                    <div className="grid-products">
                        {visibleCategories.map(cat => (
                            <CategoryCard
                                key={cat.id}
                                title={cat.name}
                                img={cat.featured_product_image || 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800'}
                                link={`/shop?category=${cat.id}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* 4. Hits / Trusted (Mock) */}
            <section className="section" style={{ background: 'var(--color-surface)' }}>
                <div className="container">
                    <Header title={t('home.hits')} secondaryColor />
                    <div className="grid-products">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="card">
                                <div className="card-image-container">
                                    <img src={`https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=600`} alt="" className="card-image" />
                                </div>
                                <div style={{ padding: '1rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Hyaluronic Serum {i}</h4>
                                    <div className="flex justify-between items-center">
                                        <span style={{ fontWeight: 600, color: 'var(--color-secondary)' }}>₴850</span>
                                        <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>Buy</button>
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
                    <BlogCard title={t('blog.article_1')} img="https://images.unsplash.com/photo-1598440947619-2c35fc9b908d?q=80&w=800" />
                    <BlogCard title={t('blog.article_2')} img="https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800" />
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
        <Link to={link} className="card relative" style={{ height: '350px' }}>
            <img src={img} alt={title} className="card-image" />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.2rem' }}>{title}</h3>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>Explore &rarr;</span>
            </div>
        </Link>
    );
}

function BlogCard({ title, img }) {
    return (
        <div className="card" style={{ cursor: 'pointer' }}>
            <div className="card-image-container" style={{ height: '200px' }}>
                <img src={img} alt={title} className="card-image" />
            </div>
            <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--color-secondary)' }}>{title}</h3>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>Read More <ChevronRight size={16} /></span>
            </div>
        </div>
    );
}

function Header({ title, secondaryColor }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
            <h2 className="heading-lg" style={{ marginBottom: 0, color: secondaryColor ? 'var(--color-secondary)' : 'var(--color-text)' }}>{title}</h2>
        </div>
    );
}
