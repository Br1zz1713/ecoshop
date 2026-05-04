from rest_framework import generics, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.throttling import AnonRateThrottle, UserRateThrottle
from django.db.models import Sum, F, DecimalField, ExpressionWrapper
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.utils import timezone
from datetime import timedelta
from .models import Product, Order, Category, OrderItem
from .serializers import ProductSerializer, ProductCreateSerializer, CategorySerializer, OrderSerializer

# List all products
@method_decorator(cache_page(60), name='dispatch')
class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(available=True).select_related('category', 'category__featured_product').prefetch_related('images')
    serializer_class = ProductSerializer

# Create a new product (Admin usage)
class ProductCreateView(generics.CreateAPIView):
    queryset = Product.objects.select_related('category', 'category__featured_product').prefetch_related('images')
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAdminUser]

# Update a product (Admin usage)
class ProductUpdateView(generics.UpdateAPIView):
    queryset = Product.objects.select_related('category', 'category__featured_product').prefetch_related('images')
    serializer_class = ProductCreateSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

# Delete a product (Admin usage)
class ProductDeleteView(generics.DestroyAPIView):
    queryset = Product.objects.select_related('category', 'category__featured_product').prefetch_related('images')
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

# Retrieve single product
@method_decorator(cache_page(60), name='dispatch')
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category', 'category__featured_product').prefetch_related('images')
    serializer_class = ProductSerializer
    lookup_field = 'id'

@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def increment_product_view(request, id):
    try:
        product = Product.objects.get(id=id)
        product.views += 1
        product.save()
        return Response({'status': 'viewed'})
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=404)

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

class AnalyticsView(views.APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        # Aggregate Data
        total_views = Product.objects.aggregate(Sum('views'))['views__sum'] or 0
        total_products = Product.objects.count()
        
        # Sales Data (Paid Orders)
        total_orders = Order.objects.filter(paid=True).count()
        total_revenue_expr = ExpressionWrapper(
            F('price') * F('quantity'),
            output_field=DecimalField(max_digits=12, decimal_places=2),
        )
        total_revenue = (
            OrderItem.objects.filter(order__paid=True)
            .aggregate(total=Sum(total_revenue_expr))
            .get('total')
            or 0
        )

        # Top Products by Views
        top_viewed = Product.objects.select_related('category', 'category__featured_product').prefetch_related('images').order_by('-views')[:5]
        top_viewed_data = ProductSerializer(top_viewed, many=True).data

        # Recent Sales (Last 7 Days)
        seven_days_ago = timezone.now() - timedelta(days=7)
        recent_orders = Order.objects.filter(paid=True, created__gte=seven_days_ago)
        
        return Response({
            'total_views': total_views,
            'total_products': total_products,
            'total_orders': total_orders,
            'total_revenue': total_revenue,
            'top_viewed': top_viewed_data,
        })

# --- Category Views ---

@method_decorator(cache_page(120), name='dispatch')
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.select_related('featured_product').all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class CategoryCreateView(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]

class CategoryUpdateView(generics.UpdateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'

class CategoryDeleteView(generics.DestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser]
    lookup_field = 'id'
