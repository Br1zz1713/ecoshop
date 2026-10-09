// frontend/src/data/mockProducts.js
// High-grade fallback and production dataset for EcoShop

export const DEFAULT_CATEGORIES = [
    {
        id: 1,
        name: 'Eco Cosmetics',
        slug: 'eco-cosmetics',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        name: 'Body Care',
        slug: 'body-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        name: 'Face Care',
        slug: 'face-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 4,
        name: 'Zero Waste',
        slug: 'zero-waste',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        name: 'Hair Care',
        slug: 'hair-care',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        name: 'Eco Sets',
        slug: 'eco-sets',
        is_visible_on_main: true,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800&auto=format&fit=crop'
    }
];

export const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: 'EcoDeviva Organic Shampoo',
        slug: 'ecodeviva-organic-shampoo',
        category_id: 5,
        category_name: 'Hair Care',
        price: 250,
        available: true,
        rating: 4.9,
        reviews_count: 24,
        image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800' },
            { image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80&w=800' }
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
        id: 2,
        name: 'EcoDeviva Ceramide Facial Cream',
        slug: 'ecodeviva-facial-cream',
        category_id: 3,
        category_name: 'Face Care',
        price: 450,
        available: true,
        rating: 5.0,
        reviews_count: 38,
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800' },
            { image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9b908d?auto=format&fit=crop&q=80&w=800' }
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
        id: 3,
        name: 'EcoDeviva Bamboo Toothbrush',
        slug: 'ecodeviva-bamboo-toothbrush',
        category_id: 4,
        category_name: 'Zero Waste',
        price: 85,
        available: true,
        rating: 4.8,
        reviews_count: 19,
        image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800' }
        ],
        description: '100% biodegradable Mao bamboo handle with soft charcoal-infused bristles. Naturally antimicrobial and compostable within 6 months.',
        ingredients: '100% Sustainable Mao Bamboo, Charcoal-Infused BPA-Free Bristles',
        volume: '1 pcs',
        skin_type: 'Sensitive gums',
        country: 'Ukraine',
        views: 184,
        is_hit: false
    },
    {
        id: 4,
        name: 'Handcrafted Olive & Sage Body Soap',
        slug: 'ecodeviva-body-soap',
        category_id: 2,
        category_name: 'Body Care',
        price: 120,
        available: true,
        rating: 4.9,
        reviews_count: 15,
        image: 'https://images.unsplash.com/photo-1607006314187-548325a7732a?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1607006314187-548325a7732a?auto=format&fit=crop&q=80&w=800' }
        ],
        description: 'Cold-pressed botanical soap infused with organic olive oil, sage essential oil, and French green clay. Produces a creamy, moisturizing lather.',
        ingredients: 'Saponified Extra Virgin Olive Oil, Coconut Oil, French Green Clay, Salvia Officinalis Essential Oil, Cedarwood Extract',
        volume: '100 g',
        skin_type: 'All types',
        country: 'Ukraine',
        views: 290,
        is_hit: false
    },
    {
        id: 5,
        name: 'Midnight Recovery Botanical Serum',
        slug: 'midnight-recovery-serum',
        category_id: 3,
        category_name: 'Face Care',
        price: 890,
        available: true,
        rating: 5.0,
        reviews_count: 62,
        image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=800' },
            { image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800' }
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
        id: 6,
        name: 'Matcha & Green Tea Detox Clay Mask',
        slug: 'green-tea-detox-mask',
        category_id: 3,
        category_name: 'Face Care',
        price: 350,
        available: true,
        rating: 4.8,
        reviews_count: 27,
        image: 'https://images.unsplash.com/photo-1567928815104-b690558b8d0e?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1567928815104-b690558b8d0e?auto=format&fit=crop&q=80&w=800' }
        ],
        description: 'Purifying kaolin clay mask blended with organic Japanese ceremonial matcha to draw out micro-impurities, tighten pores, and soothe inflammation.',
        ingredients: 'Kaolin Clay, Camellia Sinensis (Matcha) Leaf Extract, Aloe Barbadensis Leaf Juice, Melaleuca Alternifolia (Tea Tree) Oil, Zinc Oxide',
        volume: '75 ml',
        skin_type: 'Oily, Combination',
        country: 'Ukraine',
        views: 410,
        is_hit: true
    },
    {
        id: 7,
        name: 'EcoShop Complete Ritual Starter Kit',
        slug: 'ecodeviva-starter-kit',
        category_id: 6,
        category_name: 'Eco Sets',
        price: 1200,
        available: true,
        rating: 5.0,
        reviews_count: 45,
        image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=800' }
        ],
        description: 'Deluxe eco-friendly beauty ritual box: contains full-sized Facial Cream, Botanical Serum, Rose Toner, Bamboo Toothbrush, and Handcrafted Soap in an embossed gift box.',
        ingredients: 'Curated 5-piece set of certified organic formulas packed in zero-waste recycled craft gift box.',
        volume: 'Set of 5 pcs',
        skin_type: 'All skin types',
        country: 'Ukraine',
        views: 650,
        is_hit: true
    },
    {
        id: 8,
        name: 'Organic Damask Rose Water Toner',
        slug: 'rose-water-toner',
        category_id: 3,
        category_name: 'Face Care',
        price: 280,
        available: true,
        rating: 4.9,
        reviews_count: 31,
        image: 'https://images.unsplash.com/photo-1608248597359-28c04ec47fa7?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1608248597359-28c04ec47fa7?auto=format&fit=crop&q=80&w=800' }
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
        id: 9,
        name: 'Vitamin C 15% Brightening Glow Drops',
        slug: 'vitamin-c-glow-drops',
        category_id: 3,
        category_name: 'Face Care',
        price: 650,
        available: true,
        rating: 4.9,
        reviews_count: 53,
        image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=800' }
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
        id: 10,
        name: 'Zero-Waste Bamboo Toothbrush Family Pack',
        slug: 'bamboo-toothbrush-family-pack',
        category_id: 4,
        category_name: 'Zero Waste',
        price: 150,
        available: true,
        rating: 4.8,
        reviews_count: 18,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800' }
        ],
        description: 'Pack of 4 numbered organic bamboo toothbrushes with wave-cut bristles. Individually numbered 1-4 for the whole family.',
        ingredients: '100% Biodegradable Mao Bamboo, Castor Oil Bristles (Medium-Soft)',
        volume: '4 pcs pack',
        skin_type: 'All',
        country: 'Ukraine',
        views: 210,
        is_hit: false
    },
    {
        id: 11,
        name: 'Organic Lavender & Dead Sea Salt Body Scrub',
        slug: 'organic-lavender-body-scrub',
        category_id: 2,
        category_name: 'Body Care',
        price: 320,
        available: true,
        rating: 5.0,
        reviews_count: 22,
        image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80&w=800',
        images: [
            { image: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?auto=format&fit=crop&q=80&w=800' }
        ],
        description: 'Gentle exfoliating body polish with authentic Dead Sea mineral salts, organic sweet almond oil, and calming Provencal lavender blossoms.',
        ingredients: 'Maris Sal (Dead Sea Salt), Prunus Amygdalus Dulcis (Sweet Almond) Oil, Lavandula Angustifolia Oil, Dried Lavender Buds, Tocopherol',
        volume: '200 ml',
        skin_type: 'All skin types',
        country: 'Ukraine',
        views: 315,
        is_hit: false
    }
];
