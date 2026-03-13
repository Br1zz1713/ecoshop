# shop/admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, ProductImage, CartItem, Order, OrderItem


# ─── Inline: gallery images inside Product ───────────────────────────────────
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="height:60px;border-radius:4px;" />', obj.image.url)
        return "—"
    image_preview.short_description = "Preview"


# ─── Category ─────────────────────────────────────────────────────────────────
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', 'is_visible_on_main', 'featured_product']
    list_filter = ['is_visible_on_main']
    list_editable = ['is_visible_on_main', 'featured_product']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name']


# ─── Product ──────────────────────────────────────────────────────────────────
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'price', 'available',
        'views', 'image_preview', 'created', 'updated',
    ]
    list_filter = ['available', 'category', 'created', 'updated']
    list_editable = ['price', 'available']
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ['name', 'description']
    readonly_fields = ['views', 'created', 'updated', 'image_preview']
    inlines = [ProductImageInline]
    ordering = ['-views']  # Most-viewed products first by default

    # Show thumbnail of product image directly in the list
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:50px;border-radius:4px;" />',
                obj.image.url if hasattr(obj.image, 'url') else obj.image,
            )
        return "—"
    image_preview.short_description = "Photo"

    fieldsets = (
        ('Basic Info', {
            'fields': ('category', 'name', 'slug', 'description', 'price', 'available'),
        }),
        ('Image', {
            'fields': ('image', 'image_preview'),
        }),
        ('Details', {
            'fields': ('ingredients', 'volume', 'skin_type', 'country'),
        }),
        ('Analytics', {
            'fields': ('views', 'created', 'updated'),
            'classes': ('collapse',),
        }),
    )


# ─── Orders ───────────────────────────────────────────────────────────────────
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    readonly_fields = ['price']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'first_name', 'last_name', 'email',
        'city', 'paid', 'total_cost', 'created',
    ]
    list_filter = ['paid', 'created', 'updated']
    search_fields = ['first_name', 'last_name', 'email']
    inlines = [OrderItemInline]
    readonly_fields = ['created', 'updated']

    def total_cost(self, obj):
        return f"₴{obj.get_total_cost()}"
    total_cost.short_description = "Total"


# ─── Cart Items ───────────────────────────────────────────────────────────────
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'quantity', 'get_total_price']
    list_editable = ['quantity']
    search_fields = ['product__name']