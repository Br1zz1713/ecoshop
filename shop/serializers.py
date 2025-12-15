from rest_framework import serializers
from .models import Product, Category, ProductImage, Order, OrderItem

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
        fields = ['id', 'category', 'name', 'slug', 'description', 'image', 'images', 'price', 'available', 'ingredients', 'volume', 'skin_type', 'country']

class ProductCreateSerializer(serializers.ModelSerializer):
    gallery = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Product
        fields = ['id', 'category', 'name', 'slug', 'description', 'image', 'gallery', 'price', 'available', 'ingredients', 'volume', 'skin_type', 'country']

    def validate(self, attrs):
        gallery = attrs.get('gallery', [])
        if len(gallery) > 10:
            raise serializers.ValidationError("You can upload a maximum of 10 images.")
        return attrs

    def create(self, validated_data):
        gallery_images = validated_data.pop('gallery', [])
        product = Product.objects.create(**validated_data)
        
        # Create ProductImage instances
        for image in gallery_images:
            ProductImage.objects.create(product=product, image=image)
            
        return product

    def update(self, instance, validated_data):
        gallery_images = validated_data.pop('gallery', [])
        
        # Update standard fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Append new images to gallery
        for image in gallery_images:
            ProductImage.objects.create(product=instance, image=image)
            
        return instance

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['product', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'first_name', 'last_name', 'email', 'address', 'city', 'paid', 'created', 'items']

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        return order
