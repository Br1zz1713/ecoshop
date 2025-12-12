import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
    const { t } = useLanguage();

    const articles = [
        {
            id: 1,
            title: t('blog.article_1'),
            excerpt: t('blog.article_1_excerpt'),
            image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9b908d?q=80&w=800',
            date: 'Oct 12, 2025',
            author: 'Dr. Elena'
        },
        {
            id: 2,
            title: t('blog.article_2'),
            excerpt: t('blog.article_2_excerpt'),
            image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800',
            date: 'Oct 20, 2025',
            author: 'Sarah Green'
        },
        {
            id: 3,
            title: t('blog.article_3'),
            excerpt: t('blog.article_3_excerpt'),
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
            date: 'Nov 01, 2025',
            author: 'Eco Team'
        }
    ];

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="heading-xl">{t('home.blog_title')}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Expert advice, tips, and news from the world of organic beauty and health.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {articles.map(article => (
                    <article key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '240px', overflow: 'hidden' }}>
                            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover:scale-105" />
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {article.date}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={14} /> {article.author}</span>
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-text)', lineHeight: 1.3 }}>{article.title}</h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, flex: 1 }}>
                                {article.excerpt}
                            </p>
                            <Link to="#" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Read Full Article <ArrowRight size={18} />
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
