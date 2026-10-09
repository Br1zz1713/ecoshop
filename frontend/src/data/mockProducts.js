// frontend/src/data/mockProducts.js
// High-grade fallback and production dataset for EcoShop with 100% verified 200 OK CDN photos

export function getProductImageByName(name) {
    if (!name) return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/facial-cream.jpg';
    const n = name.toLowerCase();
    if (n.includes('toothbrush') || n.includes('bamboo')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/adult-4-pack-no-cert.jpg';
    }
    if (n.includes('cream') || n.includes('facial')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/facial-cream.jpg';
    }
    if (n.includes('mask') || n.includes('clay') || n.includes('detox')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/green-tea-detox-mask.jpg';
    }
    if (n.includes('shampoo') || n.includes('hair')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/ecodeviva-organic-shampoo.jpg';
    }
    if (n.includes('soap')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/ecodeviva-body-soap.jpg';
    }
    if (n.includes('toner') || n.includes('rose')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/rose-water-toner.jpg';
    }
    if (n.includes('vitamin c') || n.includes('glow')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/vitamin-c-glow-drops.jpg';
    }
    if (n.includes('serum') || n.includes('recovery')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/midnight-recovery-serum.jpg';
    }
    if (n.includes('kit') || n.includes('set')) {
        return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/ecodeviva-starter-kit.jpg';
    }
    if (n.includes('scrub')) {
        return 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=800';
    }
    return 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/facial-cream.jpg';
}

export const DEFAULT_CATEGORIES = [
    {
        id: 1,
        name: 'Eco Cosmetics',
        slug: 'eco-cosmetics',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800'
    },
    {
        id: 2,
        name: 'Body Care',
        slug: 'body-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800'
    },
    {
        id: 3,
        name: 'Face Care',
        slug: 'face-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800'
    },
    {
        id: 4,
        name: 'Zero Waste',
        slug: 'zero-waste',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=800'
    },
    {
        id: 5,
        name: 'Hair Care',
        slug: 'hair-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800'
    },
    {
        id: 6,
        name: 'Eco Sets',
        slug: 'eco-sets',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800'
    }
];

export const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'EcoDeviva Ceramide Facial Cream',
        slug: 'ecodeviva-facial-cream',
        category_id: 3,
        category_name: 'Face Care',
        price: 450,
        available: true,
        rating: 5.0,
        reviews_count: 38,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800' }
        ],
        description: 'Deeply nourishing botanical facial cream with barrier-restoring ceramides and jojoba oil. Provides 48-hour hydration without pore clogging or greasy residue.',
        ingredients: 'Aqua, Butyrospermum Parkii (Shea) Butter, Simmondsia Chinensis (Jojoba) Seed Oil, Ceramide NP, Squalane, Niacinamide, Tocopherol',
        volume: '50 ml',
        skin_type: 'Dry, Normal',
        country: 'Ukraine',
        views: 512,
        is_hit: true
    },
    {
        id: 2,
        name: 'Midnight Recovery Botanical Serum',
        slug: 'midnight-recovery-serum',
        category_id: 3,
        category_name: 'Face Care',
        price: 890,
        available: true,
        rating: 5.0,
        reviews_count: 62,
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=800' }
        ],
        description: 'Concentrated night repair elixir formulated with plant squalane, evening primrose, and pure lavender essential oils to rejuvenate tired skin overnight.',
        ingredients: 'Caprylic/Capric Triglyceride, Plant Squalane, Oenothera Biennis (Evening Primrose) Oil, Lavandula Angustifolia Oil, Rosehip Seed Oil, Tocopherol',
        volume: '30 ml',
        skin_type: 'Dry, Mature, Normal',
        country: 'Ukraine',
        views: 890,
        is_hit: true
    },
    {
        id: 3,
        name: 'Green Tea Detox Mask',
        slug: 'green-tea-detox-mask',
        category_id: 3,
        category_name: 'Face Care',
        price: 350,
        available: true,
        rating: 4.8,
        reviews_count: 27,
        image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?q=80&w=800' }
        ],
        description: 'Purifying kaolin clay mask blended with organic Japanese ceremonial matcha to draw out micro-impurities, tighten pores, and soothe inflammation.',
        ingredients: 'Kaolin Clay, Camellia Sinensis (Matcha) Leaf Extract, Aloe Barbadensis Leaf Juice, Melaleuca Alternifolia (Tea Tree) Oil, Zinc Oxide',
        volume: '100 g',
        skin_type: 'Oily, Combination',
        country: 'Ukraine',
        views: 410,
        is_hit: true
    },
    {
        id: 4,
        name: 'Rose Water Toner',
        slug: 'rose-water-toner',
        category_id: 3,
        category_name: 'Face Care',
        price: 280,
        available: true,
        rating: 4.9,
        reviews_count: 31,
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=800' }
        ],
        description: '100% steam-distilled pure organic Bulgarian rose flower hydrosol. Balances skin pH, instantly calms redness, and preps face for serum absorption.',
        ingredients: 'Rosa Damascena Flower Water (100% Pure Organic Hydrosol)',
        volume: '150 ml',
        skin_type: 'Sensitive, Dry, All',
        country: 'Ukraine',
        views: 375,
        is_hit: false
    },
    {
        id: 5,
        name: 'Vitamin C Glow Drops',
        slug: 'vitamin-c-glow-drops',
        category_id: 3,
        category_name: 'Face Care',
        price: 650,
        available: true,
        rating: 4.9,
        reviews_count: 53,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800' }
        ],
        description: 'Potent antioxidant concentrate with stabilized 15% Vitamin C (Ethyl Ascorbic Acid), Ferulic Acid, and Hyaluronic Acid to brighten dark spots and protect collagen.',
        ingredients: 'Aqua, 3-O-Ethyl Ascorbic Acid, Propanediol, Ferulic Acid, Sodium Hyaluronate, Panthenol, Citrus Aurantium Dulcis Peel Oil',
        volume: '30 ml',
        skin_type: 'Dull, Uneven, All',
        country: 'Ukraine',
        views: 720,
        is_hit: true
    },
    {
        id: 6,
        name: 'EcoDeviva Organic Shampoo',
        slug: 'ecodeviva-organic-shampoo',
        category_id: 5,
        category_name: 'Hair Care',
        price: 250,
        available: true,
        rating: 4.9,
        reviews_count: 24,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800' }
        ],
        description: 'Natural sulfate-free shampoo enriched with rosemary and organic aloe vera extracts. Gently cleanses, restores scalp microbiome, and enhances natural hair shine.',
        ingredients: 'Aqua, Coco-Glucoside, Aloe Barbadensis Leaf Juice, Rosmarinus Officinalis Extract, Urtica Dioica Extract, Hydrolyzed Wheat Protein, Citric Acid',
        volume: '250 ml',
        skin_type: 'All hair types',
        country: 'Ukraine',
        views: 342,
        is_hit: true
    },
    {
        id: 7,
        name: 'Bamboo Toothbrush',
        slug: 'bamboo-toothbrush',
        category_id: 4,
        category_name: 'Zero Waste',
        price: 85,
        available: true,
        rating: 4.8,
        reviews_count: 19,
        image: 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/adult-4-pack-no-cert.jpg',
        images: [
            { image: 'https://fgasxreqytdmfjoonnxz.supabase.co/storage/v1/object/public/products/adult-4-pack-no-cert.jpg' }
        ],
        description: '100% biodegradable Mao bamboo handle with soft charcoal-infused bristles. Naturally antimicrobial and compostable within 6 months.',
        ingredients: '100% Sustainable Mao Bamboo, Charcoal-Infused BPA-Free Bristles',
        volume: '1 pc',
        skin_type: 'All',
        country: 'China',
        views: 184,
        is_hit: false
    },
    {
        id: 8,
        name: 'EcoDeviva Body Soap',
        slug: 'ecodeviva-body-soap',
        category_id: 2,
        category_name: 'Body Care',
        price: 120,
        available: true,
        rating: 4.9,
        reviews_count: 15,
        image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800' }
        ],
        description: 'Cold-pressed botanical soap infused with organic olive oil, sage essential oil, and French green clay. Produces a creamy, moisturizing lather.',
        ingredients: 'Saponified Extra Virgin Olive Oil, Coconut Oil, French Green Clay, Salvia Officinalis Essential Oil, Cedarwood Extract',
        volume: '120 g',
        skin_type: 'All types',
        country: 'Ukraine',
        views: 290,
        is_hit: false
    },
    {
        id: 9,
        name: 'EcoDeviva Starter Kit',
        slug: 'ecodeviva-starter-kit',
        category_id: 6,
        category_name: 'Eco Sets',
        price: 1200,
        available: true,
        rating: 5.0,
        reviews_count: 45,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800' }
        ],
        description: 'Deluxe eco-friendly beauty ritual box: contains full-sized Facial Cream, Botanical Serum, Rose Toner, Bamboo Toothbrush, and Handcrafted Soap in an embossed gift box.',
        ingredients: 'Curated 5-piece set of certified organic formulas packed in zero-waste recycled craft gift box.',
        volume: 'Set',
        skin_type: 'All types',
        country: 'Ukraine',
        views: 650,
        is_hit: true
    }
];
