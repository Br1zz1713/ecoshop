import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { ShoppingBag, Filter, Leaf, ChevronRight, X, Star, Search, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { DEFAULT_PRODUCTS, DEFAULT_CATEGORIES, getProductImageByName } from '../data/mockProducts';

export default function Shop() {
    const [products, setProducts] = useState(DEFAULT_PRODUCTS);
    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [loading, setLoading] = useState(false);
    const { addToCart } = useCart();
    const toast = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || 'all';
    const { t } = useLanguage();

    // Filter States
    const [priceRange, setPriceRange] = useState(1500);
    const [selectedCategories, setSelectedCategories] = useState(categoryParam === 'all' ? [] : [categoryParam]);
    const [selectedSkinType, setSelectedSkinType] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [searchInput, setSearchInput] = useState(searchQuery);

    // Sync state with URL param
    useEffect(() => {
        if (categoryParam === 'all') {
            setSelectedCategories([]);
        } else {
            setSelectedCategories([categoryParam]);
        }
    }, [categoryParam]);

    useEffect(() => {
        // Fetch products and categories with graceful fallback
        Promise.all([
            axios.get('/api/products/').catch(() => ({ data: [] })),
            axios.get('/api/categories/').catch(() => ({ data: [] }))
        ]).then(([prodRes, catRes]) => {
            if (prodRes.data && prodRes.data.length > 0) {
                // Enrich backend items with fallback images if image is missing
                const merged = prodRes.data.map(item => {
                    const fallbackMatch = DEFAULT_PRODUCTS.find(p => p.name.toLowerCase() === (item.name || '').toLowerCase() || p.id === item.id);
                    return {
                        ...item,
                        image: item.image || getProductImageByName(item.name),
                        rating: item.rating || (fallbackMatch ? fallbackMatch.rating : 4.9),
                        reviews_count: item.reviews_count || (fallbackMatch ? fallbackMatch.reviews_count : 24),
                        volume: item.volume || (fallbackMatch ? fallbackMatch.volume : '50 ml'),
                        skin_type: item.skin_type || (fallbackMatch ? fallbackMatch.skin_type : 'All types'),
                    };
                });
                setProducts(merged);
            } else {
                setProducts(DEFAULT_PRODUCTS);
            }

            if (catRes.data && catRes.data.length > 0) {
                setCategories(catRes.data);
            } else {
                setCategories(DEFAULT_CATEGORIES);
            }
        }).catch(() => {
            setProducts(DEFAULT_PRODUCTS);
            setCategories(DEFAULT_CATEGORIES);
        });
    }, []);

    const toggleCategory = (catId) => {
        const idStr = catId.toString();
        if (selectedCategories.includes(idStr)) {
            setSelectedCategories(selectedCategories.filter(c => c !== idStr));
        } else {
            setSelectedCategories([...selectedCategories, idStr]);
        }
    };

    const toggleSkinType = (type) => {
        if (selectedSkinType.includes(type)) {
            setSelectedSkinType(selectedSkinType.filter(t => t !== type));
        } else {
            setSelectedSkinType([...selectedSkinType, type]);
        }
    };

    const toggleIngredient = (ing) => {
        if (selectedIngredients.includes(ing)) {
            setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
        } else {
            setSelectedIngredients([...selectedIngredients, ing]);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (searchInput.trim()) {
                next.set('search', searchInput.trim());
            } else {
                next.delete('search');
            }
            return next;
        });
    };

    const handleQuickAdd = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        if (toast && toast.addToast) {
            toast.addToast(`${product.name} додано в кошик!`, 'success');
        }
    };

    const resetFilters = () => {
        setPriceRange(1500);
        setSelectedCategories([]);
        setSelectedSkinType([]);
        setSelectedIngredients([]);
        setSearchInput('');
        setSearchParams({});
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Price Filter
            const price = parseFloat(product.price);
            if (price > priceRange) return false;

            // Category Filter
            if (selectedCategories.length > 0) {
                const prodCatId = (product.category_id || product.category || '').toString();
                if (!selectedCategories.includes(prodCatId)) {
                    return false;
                }
            }

            // Search Filter
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const nameMatch = (product.name || '').toLowerCase().includes(q);
                const descMatch = (product.description || '').toLowerCase().includes(q);
                const ingMatch = (product.ingredients || '').toLowerCase().includes(q);
                if (!nameMatch && !descMatch && !ingMatch) return false;
            }

            // Skin Type Filter
            if (selectedSkinType.length > 0) {
                const prodSkin = (product.skin_type || '').toLowerCase();
                const matches = selectedSkinType.some(type => {
                    if (type === 'dry') return prodSkin.includes('dry') || prodSkin.includes('сух');
                    if (type === 'oily') return prodSkin.includes('oily') || prodSkin.includes('жир');
                    if (type === 'combo') return prodSkin.includes('combo') || prodSkin.includes('комбін');
                    if (type === 'normal') return prodSkin.includes('normal') || prodSkin.includes('норм') || prodSkin.includes('all');
                    return prodSkin.includes(type);
                });
                if (!matches) return false;
            }

            // Ingredients Filter
            if (selectedIngredients.length > 0) {
                const prodIng = (product.ingredients || '').toLowerCase();
                const matchesIng = selectedIngredients.some(ing => {
                    if (ing === 'ing_collagen') return prodIng.includes('collagen');
                    if (ing === 'ing_hyaluronic') return prodIng.includes('hyaluron');
                    if (ing === 'ing_vitc') return prodIng.includes('ascorbic') || prodIng.includes('vitamin c') || prodIng.includes('вітамін');
                    return false;
                });
                if (!matchesIng) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
            if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
            if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
            return (b.id || 0) - (a.id || 0); // newest first
        });
    }, [products, priceRange, selectedCategories, searchQuery, selectedSkinType, selectedIngredients, sortBy]);

    return (
        <div className="container section">
            {/* Header / Breadcrumb */}
            <div style={{ marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Органічний догляд
                </span>
                <h1 className="heading-xl" style={{ textAlign: 'left', marginBottom: '0.5rem', fontSize: '3rem' }}>
                    {t('shop.title')}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                    Знайдено {filteredProducts.length} преміальних позицій
                </p>
            </div>

            {/* Layout Grid */}
            <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem', alignItems: 'start' }}>

                {/* Filters Sidebar */}
                <aside className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)', position: 'sticky', top: '100px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.1rem' }}>
                            <Filter size={18} color="var(--color-primary)" />
                            {t('shop.filters')}
                        </div>
                        <button
                            onClick={resetFilters}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                            <RefreshCw size={12} /> Скинути
                        </button>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearchSubmit} style={{ marginBottom: '1.8rem', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder={t('shop.search_placeholder')}
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="input-field"
                            style={{ padding: '0.6rem 2.2rem 0.6rem 0.9rem', width: '100%', fontSize: '0.9rem' }}
                        />
                        <button type="submit" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                            <Search size={16} />
                        </button>
                    </form>

                    {/* Price Range */}
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: 600, fontSize: '0.95rem' }}>
                            <span>{t('shop.price_range')}</span>
                            <span style={{ color: 'var(--color-primary)' }}>до ₴{priceRange}</span>
                        </div>
                        <input
                            type="range"
                            min="80"
                            max="1500"
                            step="10"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
                        />
                    </div>

                    {/* Category Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                            {t('shop.categories')}
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                            {categories.map(cat => (
                                <label
                                    key={cat.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        cursor: 'pointer',
                                        color: selectedCategories.includes(cat.id.toString()) ? 'var(--color-primary)' : 'var(--color-text)',
                                        fontWeight: selectedCategories.includes(cat.id.toString()) ? 600 : 400
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.id.toString())}
                                        onChange={() => toggleCategory(cat.id)}
                                        style={{ accentColor: 'var(--color-primary)', width: '16px', height: '16px' }}
                                    />
                                    <span style={{ fontSize: '0.92rem' }}>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Skin Type Filter */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                            {t('shop.filter_skin')}
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['dry', 'oily', 'combo', 'normal'].map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleSkinType(type)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '20px',
                                        border: `1px solid ${selectedSkinType.includes(type) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: selectedSkinType.includes(type) ? 'var(--color-primary)' : 'transparent',
                                        color: selectedSkinType.includes(type) ? '#fff' : 'var(--color-text)',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {t(`shop.skin_${type}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients Filter */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.8rem', fontWeight: 600, fontSize: '0.95rem' }}>
                            {t('shop.filter_ingredients')}
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['ing_collagen', 'ing_hyaluronic', 'ing_vitc'].map(ing => (
                                <button
                                    key={ing}
                                    type="button"
                                    onClick={() => toggleIngredient(ing)}
                                    style={{
                                        padding: '0.35rem 0.75rem',
                                        borderRadius: '6px',
                                        border: `1px solid ${selectedIngredients.includes(ing) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: selectedIngredients.includes(ing) ? 'rgba(85, 107, 47, 0.15)' : 'transparent',
                                        color: selectedIngredients.includes(ing) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        fontSize: '0.82rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    {t(`shop.${ing}`)}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Products Grid Column */}
                <div>
                    {/* Top Sort Bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            {searchQuery && (
                                <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                                    Пошук за: <strong>"{searchQuery}"</strong>
                                </span>
                            )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Сортування:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field"
                                style={{ width: 'auto', padding: '0.5rem 2rem 0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                            >
                                <option value="newest">{t('shop.sort_newest')}</option>
                                <option value="price-asc">{t('shop.sort_price_low')}</option>
                                <option value="price-desc">{t('shop.sort_price_high')}</option>
                                <option value="popular">Популярні</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <Leaf size={48} color="var(--color-primary)" style={{ margin: '0 auto 1.5rem', opacity: 0.6 }} />
                            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Товарів за вашим запитом не знайдено</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Спробуйте послабити фільтри за ціною або категоріями.</p>
                            <button onClick={resetFilters} className="btn">
                                Скинути всі фільтри
                            </button>
                        </div>
                    ) : (
                        <div className="grid-products">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                    <Link to={`/product/${product.id}`} style={{ position: 'relative', overflow: 'hidden' }}>
                                        {/* Eco Badge */}
                                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.95)', color: 'var(--color-primary)', padding: '0.25rem 0.6rem', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                            <Leaf size={12} fill="currentColor" /> 100% ECO
                                        </div>

                                        {product.volume && (
                                            <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(44,51,44,0.75)', color: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600, zIndex: 5 }}>
                                                {product.volume}
                                            </div>
                                        )}

                                        <div className="card-image-container" style={{ height: '280px', background: '#f5f5f0' }}>
                                            <img
                                                src={product.image || 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800'}
                                                alt={product.name}
                                                className="card-image"
                                                loading="lazy"
                                                style={{ transition: 'transform 0.4s ease' }}
                                            />
                                        </div>
                                    </Link>

                                    <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        {/* Rating */}
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.5rem', color: '#EAB308' }}>
                                            <Star size={14} fill="currentColor" />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)' }}>{product.rating || 4.9}</span>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>({product.reviews_count || 24})</span>
                                        </div>

                                        <Link to={`/product/${product.id}`}>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', fontFamily: 'var(--font-serif)', lineHeight: 1.3, color: 'var(--color-text)' }}>
                                                {product.name}
                                            </h3>
                                        </Link>

                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            {product.description}
                                        </p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.8rem', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
                                            <div>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Ціна</span>
                                                <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--color-text)' }}>₴{product.price}</span>
                                            </div>

                                            <button
                                                onClick={(e) => handleQuickAdd(product, e)}
                                                className="btn"
                                                style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                                                title="Додати в кошик"
                                            >
                                                <ShoppingBag size={15} /> В кошик
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
