import { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Plus, LogOut, Package, TrendingUp, DollarSign, Eye, EyeOff, Trash2, Edit, X, Layers } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

export default function Admin() {
    const { user, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const [activeTab, setActiveTab] = useState('overview'); // overview, products, categories
    const [analytics, setAnalytics] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '', slug: '', price: '', description: '', category: '1', available: true, image: null,
        ingredients: '', volume: '', skin_type: '', country: 'Ukraine'
    });
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [categoryFormData, setCategoryFormData] = useState({ name: '', slug: '' });
    const [editId, setEditId] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // Keep for backward compat or single view, but mostly rely on galleryPreviews
    const [galleryPreviews, setGalleryPreviews] = useState([]);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login');
            return;
        }
        if (user && !user.is_staff) {
            navigate('/');
            return;
        }
        if (user) {
            fetchData();
        }
    }, [user, authLoading, navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [analyticsRes, productsRes, categoriesRes] = await Promise.all([
                axios.get('/api/analytics/'),
                axios.get('/api/products/'),
                axios.get('/api/categories/').catch(() => ({ data: [] })) // Handle missing endpoint
            ]);
            setAnalytics(analyticsRes.data);
            setProducts(productsRes.data);
            setCategories(categoriesRes.data || []);
        } catch (err) {
            console.error(err);
            toast.addToast('Failed to load dashboard data', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await axios.delete(`/api/products/${id}/delete/`);
            toast.addToast('Product deleted', 'success');
            fetchData();
        } catch (err) {
            toast.addToast('Failed to delete product', 'error');
        }
    };

    const handleDeleteCategory = async (id) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return;
        try {
            await axios.delete(`/api/categories/${id}/delete/`);
            toast.addToast('Category deleted', 'success');
            fetchData();
        } catch (err) {
            toast.addToast('Failed to delete category', 'error');
        }
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            slug: product.slug,
            price: product.price,
            description: product.description,
            category: product.category ? product.category.id : '1',
            available: product.available,
            ingredients: product.ingredients || '',
            volume: product.volume || '',
            skin_type: product.skin_type || '',
            country: product.country || 'Ukraine',
            image: null // We don't prepopulate file input
        });
        setImagePreview(product.image);

        // Load existing gallery images
        if (product.images && product.images.length > 0) {
            const existingPreviews = product.images.map(img => img.image);
            setGalleryPreviews(existingPreviews);
            setGalleryFiles([]); // Clear file objects (we only have URLs)
        } else {
            setGalleryPreviews([]);
            setGalleryFiles([]);
        }

        setEditId(product.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'image') return; // Handle manually
            data.append(key, formData[key]);
        });

        // Handle Images
        if (galleryFiles.length > 0) {
            // Append Main Image
            if (mainImageIndex >= 0 && mainImageIndex < galleryFiles.length) {
                data.append('image', galleryFiles[mainImageIndex]);
            } else if (galleryFiles.length > 0) {
                data.append('image', galleryFiles[0]); // Default to first
            }

            // Append Gallery (All images)
            galleryFiles.forEach(file => {
                data.append('gallery', file);
            });
        } else if (formData.image instanceof File) {
            // Fallback for single image replacement if galleryFiles empty but image set (legacy/edit mode)
            data.append('image', formData.image);
        }

        try {
            if (isEditing) {
                await axios.patch(`/api/products/${editId}/update/`, data);
                toast.addToast('Product updated successfully', 'success');
            } else {
                await axios.post('/api/products/create/', data);
                toast.addToast('Product created successfully', 'success');
            }
            setShowForm(false);
            resetForm();
            fetchData();
        } catch (err) {
            console.error(err);
            toast.addToast('Operation failed', 'error');
        }
    };

    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/categories/create/', categoryFormData);
            toast.addToast('Category created', 'success');
            setShowCategoryForm(false);
            setCategoryFormData({ name: '', slug: '' });
            fetchData();
        } catch (err) {
            console.error(err);
            toast.addToast('Failed to create category', 'error');
        }
    };

    const handleToggleCategoryVisibility = async (category) => {
        try {
            await axios.patch(`/api/categories/${category.id}/update/`, {
                is_visible_on_main: !category.is_visible_on_main
            });
            toast.addToast(category.is_visible_on_main ? 'Category hidden' : 'Category visible', 'success');
            fetchData();
        } catch (err) {
            console.error(err);
            toast.addToast('Failed to update category', 'error');
        }
    };

    const handleUpdateCategoryFeatured = async (categoryId, productId) => {
        try {
            await axios.patch(`/api/categories/${categoryId}/update/`, {
                featured_product: productId || null
            });
            toast.addToast('Featured product updated', 'success');
            fetchData();
        } catch (err) {
            console.error(err);
            toast.addToast('Failed to update featured product', 'error');
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setImagePreview(null);
        setGalleryFiles([]);
        setGalleryPreviews([]);
        setMainImageIndex(0);
        setFormData({
            name: '', slug: '', price: '', description: '', category: '1', available: true, image: null,
            ingredients: '', volume: '', skin_type: '', country: 'Ukraine'
        });
        setShowForm(true);
    };

    const SidebarButton = ({ tab, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(tab)}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)',
                background: activeTab === tab ? 'rgba(255,255,255,0.05)' : 'transparent',
                color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === tab ? 600 : 500,
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                fontSize: '0.95rem'
            }}
            className="sidebar-btn"
        >
            <Icon size={18} /> {label}
        </button>
    );

    if (authLoading || loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="animate-pulse">Loading Dashboard...</div>
        </div>
    );

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="glass-panel admin-sidebar">
                <div style={{ marginBottom: '1rem', paddingLeft: '0.5rem', color: 'var(--color-primary)' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>Super Account</h3>
                </div>

                <div className="sidebar-btn-group">
                    <SidebarButton tab="overview" icon={LayoutDashboard} label="Overview" />
                    <SidebarButton tab="products" icon={Package} label="Products" />
                    <SidebarButton tab="categories" icon={Layers} label="Categories" />
                </div>

                <div className="spacer" style={{ flex: 1 }}></div>

                <button onClick={logout} className="logout-btn" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', color: 'var(--color-error)', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                {activeTab === 'overview' && (
                    <div className="animate-fade-in">
                        <h2 className="heading-lg" style={{ textAlign: 'left' }}>Analytics Overview</h2>

                        {/* Stats Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                            <StatCard icon={<Eye />} title="Total Views" value={analytics?.total_views} color="#3b82f6" />
                            <StatCard icon={<TrendingUp />} title="Total Sales" value={analytics?.total_orders} color="#22c55e" />
                            <StatCard icon={<DollarSign />} title="Total Revenue" value={`₴${analytics?.total_revenue}`} color="#eab308" />
                            <StatCard icon={<Package />} title="Total Products" value={analytics?.total_products} color="#a855f7" />
                        </div>

                        {/* Top Products */}
                        <div className="glass-panel" style={{ padding: '2rem', borderRadius: 'var(--radius-md)' }}>
                            <h3 style={{ marginBottom: '1.5rem' }}>Top Viewed Products</h3>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                                            <th style={{ padding: '1rem' }}>Product</th>
                                            <th style={{ padding: '1rem' }}>Price</th>
                                            <th style={{ padding: '1rem' }}>Views</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {analytics?.top_viewed?.map(p => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    {p.image && <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />}
                                                    {p.name}
                                                </td>
                                                <td style={{ padding: '1rem' }}>₴{p.price}</td>
                                                <td style={{ padding: '1rem', color: '#3b82f6', fontWeight: 'bold' }}>{p.views}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'products' && (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 className="heading-lg" style={{ textAlign: 'left', marginBottom: 0 }}>Product Management</h2>
                            <button onClick={resetForm} className="btn">
                                <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Product
                            </button>
                        </div>

                        {/* Products Table */}
                        <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                    <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem' }}>Image</th>
                                            <th style={{ padding: '1rem' }}>Name</th>
                                            <th style={{ padding: '1rem' }}>Price</th>
                                            <th style={{ padding: '1rem' }}>Status</th>
                                            <th style={{ padding: '1rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(p => (
                                            <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1rem' }}>
                                                    <img src={p.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '6px', objectFit: 'cover', background: '#333' }} />
                                                </td>
                                                <td style={{ padding: '1rem', fontWeight: 500 }}>{p.name}</td>
                                                <td style={{ padding: '1rem' }}>₴{p.price}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.8rem',
                                                        background: p.available ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                                        color: p.available ? '#4ade80' : '#f87171'
                                                    }}>
                                                        {p.available ? 'Active' : 'Hidden'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button onClick={() => handleEdit(p)} style={{ padding: '0.5rem', background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', borderRadius: '4px' }}>
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDelete(p.id)} style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '4px' }}>
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div className="animate-fade-in">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 className="heading-lg" style={{ textAlign: 'left', marginBottom: 0 }}>Category Management</h2>
                            <button onClick={() => setShowCategoryForm(true)} className="btn">
                                <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Category
                            </button>
                        </div>

                        <div className="glass-panel" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                                    <thead style={{ background: 'rgba(255,255,255,0.02)' }}>
                                        <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem' }}>ID</th>
                                            <th style={{ padding: '1rem' }}>Name</th>
                                            <th style={{ padding: '1rem' }}>Slug</th>
                                            <th style={{ padding: '1rem' }}>Visible</th>
                                            <th style={{ padding: '1rem' }}>Featured Product</th>
                                            <th style={{ padding: '1rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map(c => (
                                            <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                <td style={{ padding: '1rem' }}>{c.id}</td>
                                                <td style={{ padding: '1rem', fontWeight: 500 }}>{c.name}</td>
                                                <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{c.slug}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <button
                                                        onClick={() => handleToggleCategoryVisibility(c)}
                                                        style={{
                                                            padding: '0.4rem',
                                                            borderRadius: '4px',
                                                            background: c.is_visible_on_main ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                                                            color: c.is_visible_on_main ? '#4ade80' : 'var(--color-text-muted)',
                                                            border: 'none',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        {c.is_visible_on_main ? <Eye size={18} /> : <EyeOff size={18} />}
                                                    </button>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <select
                                                        value={c.featured_product || ''}
                                                        onChange={(e) => handleUpdateCategoryFeatured(c.id, e.target.value)}
                                                        style={{
                                                            background: 'rgba(255,255,255,0.05)',
                                                            border: '1px solid var(--color-border)',
                                                            color: 'var(--color-text)',
                                                            padding: '0.4rem',
                                                            borderRadius: '4px',
                                                            fontSize: '0.9rem',
                                                            maxWidth: '200px'
                                                        }}
                                                    >
                                                        <option value="">None</option>
                                                        {products
                                                            .filter(p => p.category && p.category.id === c.id)
                                                            .map(p => (
                                                                <option key={p.id} value={p.id}>{p.name}</option>
                                                            ))}
                                                    </select>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <button onClick={() => handleDeleteCategory(c.id)} style={{ padding: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '4px' }}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {categories.length === 0 && (
                                            <tr>
                                                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No categories found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Product Modal Form */}
            {
                showForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                        <div className="glass-panel" style={{ width: '500px', padding: '2rem', borderRadius: 'var(--radius-lg)', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                                <button onClick={() => { setShowForm(false); setImagePreview(null); }} style={{ background: 'none', color: '#888' }}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input className="input-field" placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                                <input className="input-field" placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                <textarea className="input-field" placeholder="Description" rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />

                                {/* Category Select */}
                                <select
                                    className="input-field"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>

                                {/* Image Upload & Preview */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Product Images (Select Multiple)</label>

                                    {/* Existing Main Image (for edit) */}
                                    {isEditing && imagePreview && galleryPreviews.length === 0 && (
                                        <div style={{ marginBottom: '0.5rem', position: 'relative', display: 'inline-block' }}>
                                            <p style={{ fontSize: '0.8rem', color: '#888' }}>Current Main Image:</p>
                                            <img src={imagePreview} alt="Current" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                                        </div>
                                    )}

                                    {/* Unified Gallery Grid */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                        {/* Existing Images */}
                                        {galleryPreviews.map((src, index) => (
                                            <div
                                                key={`preview-${index}`}
                                                style={{
                                                    position: 'relative',
                                                    width: '80px',
                                                    height: '80px',
                                                    borderRadius: '4px',
                                                    overflow: 'hidden',
                                                    border: mainImageIndex === index ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                                                }}
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Preview ${index}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                                                    onClick={() => setMainImageIndex(index)}
                                                />
                                                {mainImageIndex === index && (
                                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: 'rgba(85, 107, 47, 0.8)', color: 'white', padding: '2px', fontSize: '0.6rem', textAlign: 'center' }}>Main</div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        // Remove from previews
                                                        const newPreviews = [...galleryPreviews];
                                                        newPreviews.splice(index, 1);
                                                        setGalleryPreviews(newPreviews);

                                                        // Remove from files if it's a new file
                                                        // Note: We need to map previews to files correctly or handle separately.
                                                        // For simplicity in this patch: we reconstruct the file list.
                                                        // BUT: existing images don't have files.
                                                        // Correct logic:
                                                        if (index < (galleryPreviews.length - galleryFiles.length)) {
                                                            // It's an existing backend image. We might need to track deletion ID.
                                                            // For now, UI removal. API update needed for partial delete.
                                                        } else {
                                                            // It's a newly added file
                                                            const fileIndex = index - (galleryPreviews.length - galleryFiles.length);
                                                            const newFiles = [...galleryFiles];
                                                            newFiles.splice(fileIndex, 1);
                                                            setGalleryFiles(newFiles);
                                                        }
                                                    }}
                                                    style={{
                                                        position: 'absolute',
                                                        top: '2px',
                                                        right: '2px',
                                                        background: 'rgba(0,0,0,0.6)',
                                                        color: '#fff',
                                                        borderRadius: '50%',
                                                        width: '20px',
                                                        height: '20px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        zIndex: 2
                                                    }}
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        ))}

                                        {/* Add Button */}
                                        <label style={{
                                            width: '80px', height: '80px',
                                            borderRadius: '4px',
                                            border: '2px dashed var(--color-border)',
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                            cursor: 'pointer',
                                            color: 'var(--color-text-muted)',
                                            fontSize: '0.7rem',
                                            textAlign: 'center'
                                        }}>
                                            <Plus size={20} />
                                            <span>Add Photo</span>
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                onChange={e => {
                                                    const newFiles = Array.from(e.target.files);
                                                    const totalFiles = galleryFiles.length + newFiles.length;

                                                    if (totalFiles > 10) {
                                                        toast.addToast('Maximum 10 images allowed', 'error');
                                                        return;
                                                    }

                                                    // Append new files
                                                    setGalleryFiles([...galleryFiles, ...newFiles]);

                                                    // Append new previews
                                                    const newPreviews = newFiles.map(file => URL.createObjectURL(file));
                                                    setGalleryPreviews([...galleryPreviews, ...newPreviews]);
                                                }}
                                                style={{ display: 'none' }}
                                            />
                                        </label>
                                    </div>

                                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                        {galleryFiles.length > 0 ? `${galleryFiles.length} new files ready to upload.` : 'No new files selected.'}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input type="checkbox" id="avail" checked={formData.available} onChange={e => setFormData({ ...formData, available: e.target.checked })} />
                                    <label htmlFor="avail">Available for sale</label>
                                </div>
                                <button type="submit" className="btn" style={{ marginTop: '1rem' }}>{isEditing ? 'Update Product' : 'Create Product'}</button>
                            </form>
                        </div>
                    </div>
                )
            }

            {/* Category Modal Form */}
            {
                showCategoryForm && (
                    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
                        <div className="glass-panel" style={{ width: '400px', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3>Add New Category</h3>
                                <button onClick={() => setShowCategoryForm(false)} style={{ background: 'none', color: '#888' }}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleCategorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input className="input-field" placeholder="Category Name" value={categoryFormData.name} onChange={e => setCategoryFormData({ ...categoryFormData, name: e.target.value })} required />
                                <input className="input-field" placeholder="Slug (optional)" value={categoryFormData.slug} onChange={e => setCategoryFormData({ ...categoryFormData, slug: e.target.value })} />
                                <button type="submit" className="btn" style={{ marginTop: '1rem' }}>Create Category</button>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ padding: '1rem', background: `${color}20`, borderRadius: '12px', color: color }}>
                {icon}
            </div>
            <div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{title}</p>
                <h4 style={{ fontSize: '1.5rem', color: '#1f2937' }}>{value}</h4>
            </div>
        </div>
    );
}
