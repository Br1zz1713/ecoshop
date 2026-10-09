import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Star, ArrowLeft, Eye, Leaf, ChevronRight, Maximize2, ShieldCheck, Truck, RefreshCw, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_PRODUCTS, getProductImageByName } from '../data/mockProducts';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description'); // description, ingredients, shipping
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addToCart } = useCart();
    const toast = useToast();
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        setLoading(true);
        // Find in mockProducts as immediate local candidate
        const localMatch = DEFAULT_PRODUCTS.find(p => p.id.toString() === id.toString()) || DEFAULT_PRODUCTS[0];

        axios.get(`/api/products/${id}/`)
            .then(res => {
                if (res.data && res.data.id) {
                    const resolvedImg = res.data.image || getProductImageByName(res.data.name);
                    const merged = {
                        ...res.data,
                        image: resolvedImg,
                        images: res.data.images && res.data.images.length > 0 ? res.data.images : [{ image: resolvedImg }],
                        ingredients: res.data.ingredients || localMatch.ingredients,
                        volume: res.data.volume || localMatch.volume,
                        skin_type: res.data.skin_type || localMatch.skin_type,
                        country: res.data.country || localMatch.country,
                        rating: res.data.rating || localMatch.rating,
                        reviews_count: res.data.reviews_count || localMatch.reviews_count
                    };
                    setProduct(merged);
                    setActiveImage(merged.image);
                } else {
                    setProduct(localMatch);
                    setActiveImage(localMatch.image);
                }
                setLoading(false);
                axios.post(`/api/products/${id}/view/`).catch(() => {});
            })
            .catch(() => {
                setProduct(localMatch);
                setActiveImage(localMatch.image);
                setLoading(false);
            });

        // Set related products
        const others = DEFAULT_PRODUCTS.filter(p => p.id.toString() !== id.toString()).slice(0, 4);
        setRelatedProducts(others);

        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        if (toast && toast.addToast) {
            toast.addToast(`${quantity}x ${product.name} додано в кошик!`, 'success');
        }
    };

    if (loading) {
        return (
            <div className="container section" style={{ display: 'flex', justifyContent: 'center', padding: '6rem' }}>
                <div className="animate-pulse" style={{ fontSize: '1.2rem', color: 'var(--color-primary)' }}>
                    Завантаження товару...
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container section" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
                <h2>Товар не знайдено</h2>
                <Link to="/shop" className="btn" style={{ marginTop: '1.5rem', display: 'inline-block' }}>
                    Повернутися до каталогу
                </Link>
            </div>
        );
    }

    const gallery = product.images && product.images.length > 0
        ? product.images.map(img => typeof img === 'string' ? img : img.image).filter(Boolean)
        : [product.image].filter(Boolean);

    return (
        <div className="container section animate-slide-up">
            <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>
                <ArrowLeft size={18} /> {t('product.back')}
            </Link>

            <div className="product-details-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) 1.2fr', gap: '3.5rem', alignItems: 'start' }}>

                {/* Left: Gallery */}
                <div className="glass-panel" style={{ padding: '1.8rem', borderRadius: 'var(--radius-md)' }}>
                    <div className="gallery-main" style={{ height: '460px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: '#f5f5f0', position: 'relative', marginBottom: '1.2rem' }}>
                        <img
                            src={activeImage || product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(255,255,255,0.95)', color: 'var(--color-primary)', padding: '0.3rem 0.7rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Leaf size={13} fill="currentColor" /> 100% ОРГАНІЧНО
                        </div>
                    </div>

                    {gallery.length > 1 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))', gap: '0.8rem' }}>
                            {gallery.map((img, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveImage(img)}
                                    style={{
                                        height: '75px',
                                        borderRadius: 'var(--radius-sm)',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        border: activeImage === img ? '2px solid var(--color-primary)' : '2px solid transparent',
                                        opacity: activeImage === img ? 1 : 0.65,
                                        transition: 'all 0.2s',
                                        background: '#f5f5f0'
                                    }}
                                >
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Info */}
                <div>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {product.category_name || 'Органічний догляд'}
                    </span>
                    <h1 className="heading-lg" style={{ textAlign: 'left', marginBottom: '0.8rem', fontSize: '2.4rem', lineHeight: 1.2 }}>
                        {product.name}
                    </h1>

                    {/* Rating & Social Proof */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#EAB308' }}>
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="currentColor" size={16} />)}
                            <span style={{ fontWeight: 600, marginLeft: '6px', color: 'var(--color-text)' }}>{product.rating || 5.0}</span>
                        </div>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>({product.reviews_count || 24} відгуків)</span>
                        <span style={{ color: 'var(--color-border)', margin: '0 4px' }}>•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                            <Eye size={15} /> {product.views || 380} переглядів
                        </span>
                    </div>

                    {/* Price and Cart Action Card */}
                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '2.5rem', border: '1px solid var(--color-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Ціна за одиницю</span>
                                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-text)', lineHeight: 1.1 }}>
                                    ₴{product.price}
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>
                                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }}></span>
                                    В наявності
                                </div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                                    Відправка сьогодні до 18:00
                                </p>
                            </div>
                        </div>

                        {/* Specs Pills */}
                        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.8rem', flexWrap: 'wrap' }}>
                            {product.volume && (
                                <div style={{ padding: '0.35rem 0.8rem', background: 'rgba(85,107,47,0.1)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                    Об'єм: {product.volume}
                                </div>
                            )}
                            {product.skin_type && (
                                <div style={{ padding: '0.35rem 0.8rem', background: 'rgba(85,107,47,0.1)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                    Тип: {product.skin_type}
                                </div>
                            )}
                            <div style={{ padding: '0.35rem 0.8rem', background: 'rgba(85,107,47,0.1)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                Країна: {product.country || 'Україна'}
                            </div>
                        </div>

                        {/* Quantity and Add Button */}
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface)' }}>
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                                >
                                    <Minus size={16} />
                                </button>
                                <span style={{ padding: '0 0.8rem', fontWeight: 600, fontSize: '1.1rem' }}>{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    style={{ padding: '0.8rem 1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="btn"
                                style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
                            >
                                <ShoppingBag size={20} /> Додати в кошик (₴{(product.price * quantity).toFixed(2)})
                            </button>
                        </div>
                    </div>

                    {/* Tabs / Accordion */}
                    <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem', display: 'flex', gap: '1.5rem' }}>
                        <button
                            onClick={() => setActiveTab('description')}
                            style={{
                                padding: '0.8rem 0',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                color: activeTab === 'description' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                borderBottom: activeTab === 'description' ? '2px solid var(--color-primary)' : '2px solid transparent'
                            }}
                        >
                            {t('product.description')}
                        </button>
                        <button
                            onClick={() => setActiveTab('ingredients')}
                            style={{
                                padding: '0.8rem 0',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                color: activeTab === 'ingredients' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                borderBottom: activeTab === 'ingredients' ? '2px solid var(--color-primary)' : '2px solid transparent'
                            }}
                        >
                            {t('product.ingredients')}
                        </button>
                        <button
                            onClick={() => setActiveTab('shipping')}
                            style={{
                                padding: '0.8rem 0',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer',
                                fontSize: '1.05rem',
                                fontWeight: 600,
                                color: activeTab === 'shipping' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                borderBottom: activeTab === 'shipping' ? '2px solid var(--color-primary)' : '2px solid transparent'
                            }}
                        >
                            Доставка та гарантія
                        </button>
                    </div>

                    <div style={{ marginBottom: '3rem', minHeight: '100px' }}>
                        {activeTab === 'description' && (
                            <p style={{ lineHeight: '1.8', color: 'var(--color-text)', fontSize: '1.05rem' }}>
                                {product.description}
                            </p>
                        )}

                        {activeTab === 'ingredients' && (
                            <div>
                                <h4 style={{ marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)' }}>
                                    <Leaf size={18} /> Повний склад компонентів (INCI):
                                </h4>
                                <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                                    {(product.ingredients || 'Aqua, Organic Botanical Extracts, Tocopherol.').split(',').map((ing, i) => (
                                        <li key={i}>{ing.trim()}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    <Truck size={24} color="var(--color-primary)" />
                                    <div>
                                        <h5 style={{ fontWeight: 600, marginBottom: '0.2rem' }}>Швидка доставка</h5>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Нова Пошта (відділення або поштомат) 1-2 дні по всій Україні.</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                    <ShieldCheck size={24} color="var(--color-primary)" />
                                    <div>
                                        <h5 style={{ fontWeight: 600, marginBottom: '0.2rem' }}>100% Гарантія якості</h5>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Сертифіковані органічні інгредієнти, без парабенів та силіконів.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h2 className="heading-lg" style={{ marginBottom: 0 }}>Вам також сподобається</h2>
                        <Link to="/shop" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            Всі товари <ChevronRight size={16} />
                        </Link>
                    </div>

                    <div className="grid-products">
                        {relatedProducts.map(rel => (
                            <div key={rel.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                <Link to={`/product/${rel.id}`} style={{ overflow: 'hidden' }}>
                                    <div className="card-image-container" style={{ height: '220px', background: '#f5f5f0' }}>
                                        <img src={rel.image} alt={rel.name} className="card-image" />
                                    </div>
                                </Link>
                                <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <Link to={`/product/${rel.id}`}>
                                        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}>
                                            {rel.name}
                                        </h4>
                                    </Link>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.8rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '1.15rem' }}>₴{rel.price}</span>
                                        <button
                                            onClick={() => addToCart(rel)}
                                            className="btn"
                                            style={{ padding: '0.45rem 0.9rem', fontSize: '0.82rem' }}
                                        >
                                            В кошик
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
