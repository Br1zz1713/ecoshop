# shop/admin.py
from django.contrib import admin
from .models import Category, Product, CartItem, Order, OrderItem, SiteConfig

@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ['history_title']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'available', 'is_bestseller', 'created']
    list_filter = ['available', 'is_bestseller', 'created', 'updated']
    list_editable = ['price', 'available', 'is_bestseller'] 
    prepopulated_fields = {'slug': ('name',)}

# Инлайн-класс для отображения товаров внутри заказа
class OrderItemInline(admin.TabularInline):
    model = OrderItem
    raw_id_fields = ['product']
    readonly_fields = ['price']

# Регистрация модели Order
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'first_name', 'last_name', 'email', 
                    'address', 'city', 'paid', 'created', 'updated']
    list_filter = ['paid', 'created', 'updated']
    inlines = [OrderItemInline] # Показывает товары внутри формы заказа

# Регистрация модели CartItem (для админа)
@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'product', 'quantity', 'get_total_price']
    list_editable = ['quantity']