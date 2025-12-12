from django.urls import path
from .views import BlogPostList, BlogPostDetail

app_name = 'blog'

urlpatterns = [
    path('blog/', BlogPostList.as_view(), name='blog-list'),
    path('blog/<slug:slug>/', BlogPostDetail.as_view(), name='blog-detail'),
]
