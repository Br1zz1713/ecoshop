import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight, X, Clock, BookOpen, Share2 } from 'lucide-react';

export default function Blog() {
    const { t } = useLanguage();
    const [selectedArticle, setSelectedArticle] = useState(null);

    const articles = [
        {
            id: 1,
            title: t('blog.article_1') || '5 міфів про колаген у догляді за шкірою',
            excerpt: t('blog.article_1_excerpt') || 'Колаген відповідає за пружність та молодість шкіри, проте навколо нього існує безліч оманливих тверджень...',
            fullContent: `Колаген — головний структурний білок шкіри, який забезпечує її еластичність, щільність та здоровий тонус. Проте в косметичній індустрії навколо нього склалося чимало міфів.

1. Міф: Молекули колагену у кремі повністю вбудовуються у глибокі шари дерми.
Реальність: Молекула нативного колагену занадто велика, щоб проникнути крізь епідермальний бар'єр. Проте вона створює невагому дихаючу гідрофільну плівку, яка блокує трансепідермальну втрату вологи та миттєво розгладжує мікрорельєф.

2. Міф: Рослинного колагену не існує.
Реальність: Справжній тваринний колаген замінюють гідролізованими протеїнами сої, рису та пшениці. Вони мають ідентичний амінокислотний профіль і стимулюють синтез власного колагену клітинами фібробластів.

3. Міф: Колаген потрібен тільки після 40 років.
Реальність: Природний синтез колагену починає сповільнюватися вже після 25 років (приблизно на 1% щороку). Рання превентивна підтримка антиоксидантами та пептидами зберігає молодість значно ефективніше.`,
            image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9b908d?q=80&w=800',
            date: '12 жовтня 2026',
            readTime: '4 хв читання',
            author: 'Олена Бондар, дерматолог'
        },
        {
            id: 2,
            title: t('blog.article_2') || 'Як підібрати безпечний натуральний догляд для обличчя',
            excerpt: t('blog.article_2_excerpt') || 'Світ натуральної косметики стрімко розвивається. Ось наш експертний гід з правильного підбору засобів під свій тип шкіри...',
            fullContent: `Обираючи органічну косметику, важливо звертати увагу не лише на напис «ECO» на етикетці, а й на реальний склад (INCI).

Ключові кроки для вибору:
1. Визначте поточний стан ліпідного бар'єру:
Якщо після вмивання ви відчуваєте стягнутість або помічаєте лущення, вам необхідні засоби з фізіологічними ліпідами: церамідами, скваланом та олією жожоба.

2. Уникайте агресивних сульфатів (SLS/SLES):
Шукайте м'які натуральні ПАР на основі глюкозидів (Coco-Glucoside, Lauryl Glucoside), які делікатно розчиняють себум, не руйнуючи мікробіом.

3. Сезонна адаптація:
Влітку віддавайте перевагу легким сироваткам з гіалуроновою кислотою та ніацинамідом, а в холодний період року додавайте захисні ліпідні бальзами та живильні креми.`,
            image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?q=80&w=800',
            date: '20 жовтня 2026',
            readTime: '5 хв читання',
            author: 'Анна Мельник, косметолог'
        },
        {
            id: 3,
            title: t('blog.article_3') || 'Ранковий та вечірній ритуал краси: покрокова інструкція',
            excerpt: t('blog.article_3_excerpt') || 'Системний догляд за шкірою — це запорука її сяйва. Розбираємо ідеальну послідовність нанесення косметики...',
            fullContent: `Правильна послідовність нанесення косметичних засобів підсилює дію кожного активного компонента у кілька разів.

Ранковий ритуал (Захист та зволоження):
1. Делікатне очищення теплою водою або м'якою пінкою.
2. Тонізація квітковим гідролатом (дамаська троянда або лаванда) для нормалізації pH.
3. Антиоксидантна сироватка (наприклад, вітамін C) для нейтралізації вільних радикалів.
4. Легкий зволожуючий крем для фіксації вологи.
5. Захист від ультрафіолету (SPF 30/50).

Вечірній ритуал (Відновлення та регенерація):
1. Демакіяж та глибоке гідрофільне очищення.
2. Відновлюючий тонік.
3. Нічна сироватка з пептидами або ботанічними оліями.
4. Живильний крем з церамідами перед сном.`,
            image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800',
            date: '01 листопада 2026',
            readTime: '6 хв читання',
            author: 'Команда EcoShop'
        }
    ];

    return (
        <div className="container section">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Експертні знання
                </span>
                <h1 className="heading-xl" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                    {t('home.blog_title') || 'Блог та поради'}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto' }}>
                    Поради дерматологів, розбір складів та гід по натуральному догляду за шкірою і волоссям.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                {articles.map(article => (
                    <article key={article.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '240px', overflow: 'hidden' }}>
                            <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="hover:scale-105" />
                        </div>
                        <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> {article.date}</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {article.readTime}</span>
                            </div>
                            <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-text)', lineHeight: 1.3, fontFamily: 'var(--font-serif)' }}>
                                {article.title}
                            </h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.8rem', lineHeight: 1.6, flex: 1, fontSize: '0.95rem' }}>
                                {article.excerpt}
                            </p>
                            <button
                                onClick={() => setSelectedArticle(article)}
                                style={{ background: 'none', border: 'none', padding: 0, color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}
                            >
                                Читати повністю <ArrowRight size={18} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* Modal Article Reader */}
            {selectedArticle && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <div className="glass-panel animate-slide-up" style={{ maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', borderRadius: 'var(--radius-lg)', background: 'var(--color-surface)', padding: '2.5rem', position: 'relative' }}>
                        <button
                            onClick={() => setSelectedArticle(null)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.06)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                        >
                            <X size={20} />
                        </button>

                        <div style={{ height: '300px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '2rem' }}>
                            <img src={selectedArticle.image} alt={selectedArticle.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>
                            <span>{selectedArticle.date}</span>
                            <span>•</span>
                            <span>{selectedArticle.author}</span>
                            <span>•</span>
                            <span>{selectedArticle.readTime}</span>
                        </div>

                        <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', lineHeight: 1.3 }}>
                            {selectedArticle.title}
                        </h2>

                        <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--color-text)', whiteSpace: 'pre-line' }}>
                            {selectedArticle.fullContent}
                        </div>

                        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Автор: {selectedArticle.author}</span>
                            <button onClick={() => setSelectedArticle(null)} className="btn" style={{ padding: '0.6rem 1.5rem' }}>
                                Закрити
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
