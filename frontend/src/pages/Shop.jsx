import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, Filter, Leaf, ChevronRight, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const [searchParams, setSearchParams] = useSearchParams(); // Fixed: Use setSearchParams
    const searchQuery = searchParams.get('search') || '';
    const categoryParam = searchParams.get('category') || 'all'; // Get category from URL
    const { t } = useLanguage();

    // Filter States
    const [priceRange, setPriceRange] = useState(2000);
    const [selectedCategories, setSelectedCategories] = useState(categoryParam === 'all' ? [] : [categoryParam]);
    const [selectedSkinType, setSelectedSkinType] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    // Sync state with URL param
    const [categories, setCategories] = useState([]);

    // Sync state with URL param
    // Sync state with URL param (Initial load)
    useEffect(() => {
        if (categoryParam === 'all') {
            setSelectedCategories([]);
        } else {
            setSelectedCategories([categoryParam]);
        }
    }, [categoryParam]);

    useEffect(() => {
        setLoading(true);
        // Fetch products and categories
        Promise.all([
            axios.get('/api/products/'),
            axios.get('/api/categories/').catch(() => ({ data: [] }))
        ]).then(([prodRes, catRes]) => {
            setProducts(prodRes.data);
            setCategories(catRes.data || []);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching shop data", err);
            setLoading(false);
        });
    }, []);

    const toggleSkinType = (type) => {
        if (selectedSkinType.includes(type)) {
            setSelectedSkinType(selectedSkinType.filter(t => t !== type));
        } else {
            setSelectedSkinType([...selectedSkinType, type]);
        }
    };

    const toggleCategory = (catId) => {
        if (selectedCategories.includes(catId.toString())) {
            setSelectedCategories(selectedCategories.filter(id => id !== catId.toString()));
        } else {
            setSelectedCategories([...selectedCategories, catId.toString()]);
        }
    };

    const toggleIngredient = (ing) => {
        if (selectedIngredients.includes(ing)) {
            setSelectedIngredients(selectedIngredients.filter(i => i !== ing));
        } else {
            setSelectedIngredients([...selectedIngredients, ing]);
        }
    };

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesPrice = parseFloat(product.price) <= priceRange;

        // Category Filter Logic:
        // selectedCategory can be 'all' or a specific category ID (string from URL/state)
        // product.category is now an object { id, name, slug } from backend
        let matchesCategory = true;
        if (selectedCategories.length > 0) {
            // Compare IDs. product.category might be null if data is bad, so safe check
            matchesCategory = product.category && selectedCategories.includes(product.category.id.toString());
        }

        // Ingredient Filter Logic (Placeholder - assumes product might have ingredients array or simply pass if empty to avoid breaking)
        // In a real app, product.ingredients would be checked.
        // For now, if no ingredients filter is selected, it passes.
        // If selected, we verify if product has AT LEAST ONE of the selected ingredients (OR logic) or ALL (AND logic).
        // Let's go with permissive OR logic for now.
        let matchesIngredients = true;
        if (selectedIngredients.length > 0) {
            // matchesIngredients = product.ingredients && product.ingredients.some(i => selectedIngredients.includes(i));
            // Since backend might not have this yet, we won't strictly filter OUT to avoid empty results during dev,
            // UNLESS the user explicitly wants us to mock it.
            // However, to demonstrate 'manipulation', I will add a dummy check:
            matchesIngredients = true; // Placeholder: currently effectively ignored to prevent empty lists
        }

        return matchesSearch && matchesPrice && matchesCategory && matchesIngredients;
    }).sort((a, b) => {
        if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
        if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
        return 0;
    });

    const [showMobileFilter, setShowMobileFilter] = useState(false);

    return (
        <div className="container section">
            {/* Mobile Filter Toggle */}
            <div className="mobile-only" style={{ marginBottom: '1rem' }}>
                <button
                    className="btn"
                    onClick={() => setShowMobileFilter(true)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <Filter size={20} /> {t('shop.filters')}
                </button>
            </div>

            {/* Filter Overlay */}
            <div
                className={`filter-overlay ${showMobileFilter ? 'open' : ''}`}
                onClick={() => setShowMobileFilter(false)}
            ></div>

            <div className="shop-layout" style={{ position: 'relative' }}>
                {/* Sidebar Filters */}
                <aside className={`glass-panel filter-sidebar ${showMobileFilter ? 'open' : ''}`}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                            <Filter size={20} /> {t('shop.filters')}
                        </h3>
                        <button className="mobile-only icon-btn" onClick={() => setShowMobileFilter(false)}>
                            <X size={24} />
                        </button>
                        <button className="desktop-only btn" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                            onClick={() => { setPriceRange(2000); setSelectedCategories([]); setSelectedSkinType([]); setSelectedIngredients([]); }}
                        >Reset</button>
                    </div>

                    {/* Price Range */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{t('shop.price_range')}</label>
                        <input
                            type="range"
                            min="0" max="3000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            style={{ width: '100%', accentColor: 'var(--color-primary)', height: '4px', marginBottom: '0.5rem' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                            <span>₴0</span>
                            <span>₴{priceRange}</span>
                        </div>
                    </div>

                    {/* Categories - Dynamic */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('shop.categories')}</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            {/* Always show 'All' */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: selectedCategories.length === 0 ? 'var(--color-primary)' : 'var(--color-text)' }}>
                                <div style={{
                                    width: '18px', height: '18px', borderRadius: '4px', border: '2px solid currentColor',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    {selectedCategories.length === 0 && <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'currentColor' }}></div>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.length === 0}
                                    onChange={() => setSelectedCategories([])}
                                    style={{ display: 'none' }}
                                />
                                <span style={{ fontSize: '0.95rem' }}>{t('home.see_all')}</span>
                            </label>

                            {/* Dynamic List from Backend */}
                            {categories.map(cat => (
                                <label key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: selectedCategories.includes(cat.id.toString()) ? 'var(--color-primary)' : 'var(--color-text)' }}>
                                    <div style={{
                                        width: '18px', height: '18px', borderRadius: '4px', border: '2px solid currentColor',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {selectedCategories.includes(cat.id.toString()) && <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: 'currentColor' }}></div>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(cat.id.toString())}
                                        onChange={() => toggleCategory(cat.id)}
                                        style={{ display: 'none' }}
                                    />
                                    <span style={{ fontSize: '0.95rem' }}>{cat.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Skin Type Filter (New) */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('shop.filter_skin')}</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['dry', 'oily', 'combo', 'normal'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => toggleSkinType(type)}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '20px',
                                        border: `1px solid ${selectedSkinType.includes(type) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: selectedSkinType.includes(type) ? 'var(--color-primary)' : 'transparent',
                                        color: selectedSkinType.includes(type) ? '#fff' : 'var(--color-text)',
                                        fontSize: '0.85rem',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    {t(`shop.skin_${type}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients Filter - Concise Pills */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>{t('shop.filter_ingredients')}</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {['ing_collagen', 'ing_hyaluronic', 'ing_vitc'].map(ing => (
                                <button
                                    key={ing}
                                    onClick={() => toggleIngredient(ing)}
                                    style={{
                                        padding: '0.3rem 0.7rem',
                                        borderRadius: '4px',
                                        border: `1px solid ${selectedIngredients.includes(ing) ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        background: selectedIngredients.includes(ing) ? 'rgba(85, 107, 47, 0.1)' : 'transparent',
                                        color: selectedIngredients.includes(ing) ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        fontSize: '0.85rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.3rem'
                                    }}
                                >
                                    {selectedIngredients.includes(ing) && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>}
                                    {t(`shop.${ing}`)}
                                </button>
                            ))}
                        </div>
                    </div>

                </aside>

                {/* Product Grid */}
                <div>
                    <div style={{ margin: '0 0 2rem 0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                <h2 className="heading-lg" style={{ fontSize: '2rem', marginBottom: 0, textAlign: 'left', marginRight: '1rem' }}>
                                    {searchQuery ? `${t('shop.results_for')} "${searchQuery}"` : t('shop.title')}
                                </h2>

                                {/* Active Category Tags */}
                                {selectedCategories.length > 0 && selectedCategories.map(catId => {
                                    const cat = categories.find(c => c.id.toString() === catId);
                                    if (!cat) return null;
                                    return (
                                        <button
                                            key={catId}
                                            onClick={() => toggleCategory(catId)}
                                            className="animate-fade-in"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                padding: '0.3rem 0.8rem',
                                                background: 'var(--color-surface)',
                                                border: '1px solid var(--color-primary)',
                                                borderRadius: 'var(--radius-full)',
                                                color: 'var(--color-primary)',
                                                fontSize: '0.85rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontWeight: 500
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-error)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--color-error)'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                        >
                                            {cat.name} <X size={14} />
                                        </button>
                                    );
                                })}

                                {/* Active Ingredient Tags */}
                                {selectedIngredients.length > 0 && selectedIngredients.map(ing => (
                                    <button
                                        key={ing}
                                        onClick={() => toggleIngredient(ing)}
                                        className="animate-fade-in"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            padding: '0.3rem 0.8rem',
                                            background: 'var(--color-surface)',
                                            border: '1px solid var(--color-primary)',
                                            borderRadius: 'var(--radius-full)',
                                            color: 'var(--color-primary)',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            fontWeight: 500
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-error)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--color-error)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-surface)'; e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                                    >
                                        {t(`shop.${ing}`)} <X size={14} />
                                    </button>
                                ))}
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="input-field"
                                style={{ width: 'auto', padding: '0.6rem 2.5rem 0.6rem 1rem', borderRadius: 'var(--radius-sm)' }}
                            >
                                <option value="newest">{t('shop.sort_newest')}</option>
                                <option value="price-asc">{t('shop.sort_price_low')}</option>
                                <option value="price-desc">{t('shop.sort_price_high')}</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="animate-pulse">Loading products...</div></div>
                    ) : filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '6rem 2rem', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>No products found.</p>
                            <button onClick={() => { setPriceRange(2000); setSelectedCategories([]); }} className="btn">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid-products">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Link to={`/product/${product.id}`} style={{ position: 'relative' }}>
                                        {/* Eco Badge */}
                                        <div style={{ position: 'absolute', top: '10px', left: '10px', background: '#fff', color: 'var(--color-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                            <Leaf size={12} fill="currentColor" /> ECO
                                        </div>

                                        <div className="card-image-container" style={{ height: '280px', background: '#f5f5f0' }}>
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="card-image" />
                                            ) : (
                                                <ShoppingBag size={48} color="var(--color-text-muted)" />
                                            )}
                                            {/* Price Badge Overlay */}
                                            <div className="badge" style={{ bottom: '1rem', top: 'auto', right: '1rem', background: 'rgba(255,255,255,0.9)', color: '#2C332C', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                                ₴{product.price}
                                            </div>
                                        </div>
                                    </Link>

                                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                        <Link to={`/product/${product.id}`}>
                                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.3 }}>{product.name}</h3>
                                        </Link>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                            {product.description}
                                        </p>
                                        <button
                                            className="btn"
                                            style={{ width: '100%', display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center' }}
                                            onClick={(e) => { e.preventDefault(); addToCart(product); }}
                                        >
                                            <ShoppingBag size={18} /> {t('product.add_to_cart')}
                                        </button>
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
