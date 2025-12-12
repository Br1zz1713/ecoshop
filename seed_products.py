# seed_products.py
import os
import django
import random
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from shop.models import Product, Category, ProductImage
from django.utils.text import slugify

def run():
    print("Seeding EcoDeviva products with enhanced details...")
    
    # Define Categories
    categories_data = [
        {'name': 'Face Care', 'slug': 'face-care'},
        {'name': 'Body Care', 'slug': 'body-care'},
        {'name': 'Hair Care', 'slug': 'hair-care'},
        {'name': 'Eco Sets', 'slug': 'eco-sets'}
    ]
    
    cats = {}
    for c_data in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=c_data['slug'],
            defaults={'name': c_data['name']}
        )
        cats[c_data['slug']] = cat
        print(f"Category: {cat.name}")

    # Define Products with new fields
    products_db = [
        # Face Care
        {
            "name": "EcoDeviva Facial Cream",
            "cat": "face-care",
            "price": 450.00,
            "description": "Hydrating facial cream with aloe vera and vitamin E. Perfect for sensitive skin.",
            "ingredients": "Aqua, Aloe Barbadensis Leaf Juice, Glycerin, Caprylic/Capric Triglyceride, Tocopherol (Vitamin E), Shea Butter.",
            "volume": "50 ml",
            "skin_type": "Sensitive, Dry",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800"
        },
        {
            "name": "Midnight Recovery Serum",
            "cat": "face-care",
            "price": 890.00,
            "description": "Intensive repair serum for overnight rejuvenation. Enriched with botanical oils.",
            "ingredients": "Simmondsia Chinensis (Jojoba) Seed Oil, Rosa Canina Fruit Oil, Lavandula Angustifolia Oil, Retinol.",
            "volume": "30 ml",
            "skin_type": "All types",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800"
        },
        {
            "name": "Green Tea Detox Mask",
            "cat": "face-care",
            "price": 350.00,
            "description": "Deep cleansing clay mask with organic green tea extract to purify pores.",
            "ingredients": "Kaolin Clay, Camellia Sinensis (Green Tea) Extract, Matcha Powder, Tea Tree Oil.",
            "volume": "100 g",
            "skin_type": "Oily, Combination",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800"
        },
        {
            "name": "Rose Water Toner",
            "cat": "face-care",
            "price": 280.00,
            "description": "Refreshing floral toner to balance skin pH and hydrate instantly.",
            "ingredients": "Rosa Damascena Flower Water, Glycerin, Witch Hazel Extract.",
            "volume": "150 ml",
            "skin_type": "All types",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800"
        },
        {
            "name": "Vitamin C Glow Drops",
            "cat": "face-care",
            "price": 650.00,
            "description": "Brightening booster for radiant skin. Fades dark spots and evens skin tone.",
            "ingredients": "Ascorbic Acid (Vitamin C), Ferulic Acid, Sodium Hyaluronate, Orange Peel Oil.",
            "volume": "30 ml",
            "skin_type": "Dull, Uneven",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=800"
        },

        # Hair Care
        {
            "name": "EcoDeviva Organic Shampoo",
            "cat": "hair-care",
            "price": 250.00,
            "description": "Natural shampoo with herbal extracts for healthy hair. Free from sulfates and parabens.",
            "ingredients": "Aqua, Coco-Glucoside, Aloe Vera, Rosemary Extract, Nettle Extract.",
            "volume": "250 ml",
            "skin_type": "All hair types",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1631729370654-245c6941a4f9?q=80&w=800"
        },
        {
            "name": "Bamboo Toothbrush",
            "cat": "body-care", # Moved for variety, technically oral care
            "price": 85.00,
            "description": "Biodegradable bamboo toothbrush with soft bristles. Eco-friendly choice.",
            "ingredients": "100% Biodegradable Bamboo Handle, Nylon-4 Bristles.",
            "volume": "1 pc",
            "skin_type": "N/A",
            "country": "China",
            "image": "https://images.unsplash.com/photo-1607613009820-a29f7bb6dcaf?q=80&w=800"
        },

        # Body Care
        {
            "name": "EcoDeviva Body Soap",
            "cat": "body-care",
            "price": 120.00,
            "description": "Handmade soap with lavender and shea butter. Gentle and moisturizing.",
            "ingredients": "Saponified Olive Oil, Coconut Oil, Shea Butter, Lavender Essential Oil.",
            "volume": "120 g",
            "skin_type": "All types",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800"
        },

        # Eco Sets
        {
            "name": "EcoDeviva Starter Kit",
            "cat": "eco-sets",
            "price": 1200.00,
            "description": "The complete collection of our best-sellers. Includes Shampoo, Soap, and Face Cream in a reusable bag.",
            "ingredients": "Varies by product",
            "volume": "Set",
            "skin_type": "All types",
            "country": "Ukraine",
            "image": "https://images.unsplash.com/photo-1556228352-27712398692c?q=80&w=800"
        }
    ]

    for p in products_db:
        slug = slugify(p['name'])
        cat = cats.get(p['cat'])
        
        # Check if exists to update fields or create new
        product, created = Product.objects.update_or_create(
            slug=slug,
            defaults={
                'category': cat,
                'name': p['name'],
                'description': p['description'],
                'price': p['price'],
                'available': True,
                # New fields
                'ingredients': p['ingredients'],
                'volume': p['volume'],
                'skin_type': p['skin_type'],
                'country': p['country'],
                # For demo purposes, we can't easily upload a real file via script without downloading it first
                # We will set the image field to the URL if we were using a URLField, but ImageField expects a file.
                # However, our frontend code handles 'image' as a URL string sometimes if we hack it, OR 
                # we should just leave it blank and rely on the fact that frontend might need a placeholder.
                # EDIT: The frontend <img src={product.image} /> works if product.image is a URL string in the JSON response.
                # Django ImageField serializes to a full URL.
                # But to store a remote URL in an ImageField requires downloading.
                # Strategy: We will SKIP the image field in this simplified seed and let user upload,
                # OR we resort to a temporary hack where we might have 'image_url' or something.
                # Re-reading models.py: image is ImageField.
                # Let's rely on the frontend fallback: if product.image is null.
                # BUT wait, the previous code had URLs in the 'image' field in the seed script?
                # No, previous seed script had 'image': '' and relied on placeholders?
                # Actually, previous seed script had empty image.
                # Let's keep it empty or try to download? Downloading is too complex for this script.
                # We will assume for now we just want the DATA.
            }
        )
        
        if created:
            print(f"Created: {p['name']}")
        else:
            print(f"Updated: {p['name']}")

        # Clear existing images and dummy ones
        # product.images.all().delete()
        # for i in range(3):
        #     ProductImage.objects.create(product=product, image='') 
    
    print("Seeding complete. Products updated with new fields.")

if __name__ == '__main__':
    run()
