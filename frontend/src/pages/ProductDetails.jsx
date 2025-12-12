import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Star, ArrowLeft, Eye, Leaf, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

import { useLanguage } from '../context/LanguageContext';
// // import { getProductExtraDetails } from '../data/productData';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Lightbox state
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const { t } = useLanguage();

    // Get extra details (mock)
    // const extraDetails = getProductExtraDetails(id);

    useEffect(() => {
        // Fetch product details
        axios.get(`/api/products/${id}/`)
            .then(res => {
                setProduct(res.data);
                setActiveImage(res.data.image);
                setLoading(false);
                // Increment view count
                axios.post(`/api/products/${id}/view/`);
            })
            .catch(err => {
                console.error("Error fetching product", err);
                setLoading(false);
                // navigate('/'); // Optional redirect
            })


        // Fetch related products (mock logic: just take first 4)
        axios.get('/api/products/')
            .then(res => {
                setRelatedProducts(res.data.filter(p => p.id !== parseInt(id)).slice(0, 4));
            })
            .catch(err => console.error("Error fetching related", err));

    }, [id, navigate]);

    if (loading) return <div className="container section" style={{ display: 'flex', justifyContent: 'center' }}><div className="animate-pulse">Loading Details...</div></div>;
    if (!product) return <div className="container section">Product not found</div>;

    // Use gallery if available, otherwise fallback to single image
    const gallery = product.images && product.images.length > 0
        ? product.images.map(img => img.image)
        : [product.image].filter(Boolean);
    const displayGallery = gallery;

    return (
        <div className="container section animate-slide-up">
            <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--color-text-muted)', transition: 'color 0.2s' }}>
                <ArrowLeft size={18} /> {t('product.back')}
            </Link>

            <div className="product-details-grid">

                {/* Gallery Section */}
                <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
                    <div className="gallery-main">
                        {activeImage ? (
                            <div style={{ position: 'relative', width: '100%', height: '100%', cursor: 'zoom-in' }} onClick={() => setIsLightboxOpen(true)}>
                                <img src={activeImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', padding: '0.5rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Maximize2 size={20} />
                                </div>
                            </div>
                        ) : (
                            <ShoppingBag size={64} color="var(--color-text-muted)" />
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '1rem' }}>
                        {displayGallery.map((img, idx) => (
                            <div key={idx}
                                onClick={() => setActiveImage(img)}
                                style={{
                                    height: '80px',
                                    borderRadius: 'var(--radius-sm)',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    border: activeImage === img ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    opacity: activeImage === img ? 1 : 0.6,
                                    transition: 'all 0.2s'
                                }}>
                                {img ? (
                                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Section */}
                <div style={{ paddingTop: '1rem' }}>
                    <h1 className="heading-lg" style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '2.5rem' }}>{product.name}</h1>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex' }}>
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} fill="currentColor" size={18} />)}
                        </div>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginLeft: '0.5rem' }}>(12 Reviews)</span>
                        <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                            <Eye size={16} /> {product.views} {t('product.views')}
                        </span>
                    </div>

                    <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', marginBottom: '3rem', border: '1px solid var(--color-primary)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '0.2rem' }}>Price</p>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-text)' }}>₴{product.price}</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>In Stock</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Ready to ship</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => addToCart(product)}
                                className="btn"
                                style={{ flex: 1, padding: '1rem', fontSize: '1.1rem', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <ShoppingBag size={20} /> {t('product.add_to_cart')}
                            </button>
                        </div>
                    </div>

                    {/* Tabs / Sections */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h3 style={{ fontSize: '1.4rem', borderBottom: '2px solid var(--color-secondary)', display: 'inline-block', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text)' }}>
                            {t('product.description')}
                        </h3>
                        <p style={{ lineHeight: '1.8', color: 'var(--color-text)', fontSize: '1.05rem' }}>{product.description}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
                        <div>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Leaf size={18} color="var(--color-primary)" /> {t('product.ingredients')}
                            </h4>
                            <ul style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
                                {(product.ingredients || '').split(',').map((ing, i) => (
                                    <li key={i}>{ing.trim()}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '1rem', color: 'var(--color-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {t('product.specs_title')}
                            </h4>
                            <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.2rem' }}>
                                    <span>{t('product.volume')}</span>
                                    <span style={{ color: 'var(--color-text)' }}>{product.volume}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.2rem' }}>
                                    <span>{t('product.country')}</span>
                                    <span style={{ color: 'var(--color-text)' }}>{product.country}</span>
                                </div>
                                <div style={{ marginTop: '0.5rem', lineHeight: '1.4' }}>
                                    {t('product.shipping_desc')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Related Products Mock */}
            <div style={{ marginTop: '6rem' }}>
                <h3 className="heading-lg" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem' }}>{t('product.related')}</h3>
                <div className="grid-products">
                    {relatedProducts.map(relProduct => (
                        <Link to={`/product/${relProduct.id}`} key={relProduct.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div className="card-image-container" style={{ height: '220px', background: '#f5f5f0' }}>
                                {relProduct.image ? (
                                    <img src={relProduct.image} alt={relProduct.name} className="card-image" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingBag size={32} color="var(--color-text-muted)" />
                                    </div>
                                )}
                                <div className="badge">₴{relProduct.price}</div>
                            </div>
                            <div style={{ padding: '1.2rem' }}>
                                <h4 style={{ marginBottom: '0.4rem', color: 'var(--color-text)', fontSize: '1.1rem' }}>{relProduct.name}</h4>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{t('home.cat_care')}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
                    onClick={() => setIsLightboxOpen(false)}
                >
                    {/* Close Button */}
                    <button style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
                        onClick={() => setIsLightboxOpen(false)}>
                        <X size={32} />
                    </button>

                    {/* Navigation */}
                    <button style={{ position: 'absolute', left: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = displayGallery.indexOf(activeImage);
                            const prevIndex = (currentIndex - 1 + displayGallery.length) % displayGallery.length;
                            setActiveImage(displayGallery[prevIndex]);
                        }}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <button style={{ position: 'absolute', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            const currentIndex = displayGallery.indexOf(activeImage);
                            const nextIndex = (currentIndex + 1) % displayGallery.length;
                            setActiveImage(displayGallery[nextIndex]);
                        }}
                    >
                        <ChevronRight size={32} />
                    </button>

                    {/* Image */}
                    <img
                        src={activeImage}
                        alt="Full Screen"
                        style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                        onClick={(e) => e.stopPropagation()}
                    />

                    {/* Counter */}
                    <div style={{ position: 'absolute', bottom: '2rem', color: 'white', fontSize: '1rem' }}>
                        {displayGallery.indexOf(activeImage) + 1} / {displayGallery.length}
                    </div>
                </div>
            )}
        </div>
    );
}
