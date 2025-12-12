from rest_framework import serializers
from .models import Product, Category, ProductImage

class CategorySerializer(serializers.ModelSerializer):
    featured_product_image = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'is_visible_on_main', 'featured_product', 'featured_product_image']

    def get_featured_product_image(self, obj):
        if obj.featured_product and obj.featured_product.image:
            return obj.featured_product.image.url
        return None

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ProductImageSerializer(many=True, read_only=True) # Nested images

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'slug', 'description', 'image', 'images', 'price', 'available', 'ingredients', 'volume', 'skin_type', 'country', 'is_bestseller']

class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = ['history_title', 'history_text']

class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'slug', 'description', 'image', 'price', 'available', 'ingredients', 'volume', 'skin_type', 'country']