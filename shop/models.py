# shop/models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, unique=True)
    is_visible_on_main = models.BooleanField(default=False)
    featured_product = models.ForeignKey('Product', related_name='featured_in_category', on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ('name',)
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, db_index=True)
    slug = models.SlugField(max_length=200, db_index=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True) # Check compatibility with existing data
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    available = models.BooleanField(default=True)
    
    # New Fields for Extra Details
    ingredients = models.TextField(blank=True, help_text="List of ingredients")
    volume = models.CharField(max_length=50, blank=True, help_text="e.g., 50 ml")
    skin_type = models.CharField(max_length=100, blank=True, help_text="e.g., All types, Dry, Oily")
    country = models.CharField(max_length=100, blank=True, default="Ukraine")
    is_bestseller = models.BooleanField(default=False, verbose_name="Hit / Bestseller")

    views = models.PositiveIntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('name',)
        indexes = [
            models.Index(fields=['id', 'slug']),
        ]

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/gallery/%Y/%m/%d')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.product.name}"

class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.quantity} x {self.product.name}'

    def get_total_price(self):
        return self.quantity * self.product.price

class Order(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.CharField(max_length=250)
    city = models.CharField(max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    paid = models.BooleanField(default=False)
    
    class Meta:
        ordering = ('-created',)

    def __str__(self):
        return f'Order {self.id}'
    
    def get_total_cost(self):
        return sum(item.get_cost() for item in self.items.all())

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return str(self.id)

    def get_cost(self):
        return self.price * self.quantity

class SiteConfig(models.Model):
    """Singleton model for editable site content"""
    history_title = models.CharField(max_length=200, default="Our Journey")
    history_text = models.TextField(default="Default history text...")
    
    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return "Site Configuration (Edit here)"
    
    def save(self, *args, **kwargs):
        if not self.pk and SiteConfig.objects.exists():
            # If you try to create a new one, it updates the existing one
            self.pk = SiteConfig.objects.first().pk
        super(SiteConfig, self).save(*args, **kwargs)