# shop/urls.py
from django.urls import path
from .views import (
    ProductListView, 
    ProductDetailView, 
    ProductCreateView,
    ProductUpdateView, 
    ProductDeleteView,
    increment_product_view,
    AnalyticsView,
    CategoryListView,
    CategoryCreateView,
    CategoryUpdateView,
    CategoryDeleteView
)

app_name = 'shop'

urlpatterns = [
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/create/', ProductCreateView.as_view(), name='product_create'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product_detail'),
    path('products/<int:id>/update/', ProductUpdateView.as_view(), name='product_update'),
    path('products/<int:id>/delete/', ProductDeleteView.as_view(), name='product_delete'),
    path('products/<int:id>/view/', increment_product_view, name='product_view'),
    path('analytics/', AnalyticsView.as_view(), name='analytics'),
    
    # Categories
    path('categories/', CategoryListView.as_view(), name='category_list'),
    path('categories/create/', CategoryCreateView.as_view(), name='category_create'),
    path('categories/<int:id>/update/', CategoryUpdateView.as_view(), name='category_update'),
    path('categories/<int:id>/delete/', CategoryDeleteView.as_view(), name='category_delete'),
]