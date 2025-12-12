import { useLanguage } from '../context/LanguageContext';
import { Leaf, Heart, Globe } from 'lucide-react';

export default function About() {
    const { t } = useLanguage();

    return (
        <div className="container section">
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="heading-xl">{t('about.title')}</h1>
                <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>
                    {t('about.subtitle')}
                </p>
            </div>

            {/* History Section */}
            <div className="glass-panel animate-fade-in" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ width: '60px', height: '60px', background: 'var(--color-primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                    2016
                </div>
                <div>
                    <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>{t('about.history_title')}</h2>
                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' }}>
                        {t('about.history_text')}
                    </p>
                </div>
            </div>

            {/* Values Grid */}
            <h2 className="heading-lg" style={{ textAlign: 'center', marginBottom: '2rem' }}>{t('about.values_title')}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                <ValueCard icon={<Leaf size={32} color="var(--color-primary)" />} title={t('about.value_1')} />
                <ValueCard icon={<Globe size={32} color="var(--color-primary)" />} title={t('about.value_2')} />
                <ValueCard icon={<Heart size={32} color="var(--color-primary)" />} title={t('about.value_3')} />
            </div>
        </div>
    );
}

function ValueCard({ icon, title }) {
    return (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '50%' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>{title}</h3>
        </div>
    );
}
