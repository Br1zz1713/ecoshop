"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView
from django.http import JsonResponse
from django.views.static import serve
import os

def api_root(request):
    """API root endpoint"""
    return JsonResponse({
        'message': 'Welcome to EcoShop API',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'products': '/api/products/',
            'categories': '/api/categories/',
        }
    })



def serve_react(request, path=''):
    """Serve React frontend"""
    frontend_path = os.path.join(settings.BASE_DIR, 'frontend', 'dist')
    if os.path.exists(frontend_path):
        if path and os.path.exists(os.path.join(frontend_path, path)):
            return serve(request, path, document_root=frontend_path)
        return serve(request, 'index.html', document_root=frontend_path)
    return api_root(request)

def ping(request):
    return JsonResponse({'status': 'pong', 'message': 'Backend is reachable!'})

urlpatterns = [
    path('ping/', ping, name='ping'),  # Debug endpoint
    path('api-root/', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls', namespace='shop')),
    path('api/', include('accounts.urls')),
    # Serve React app for all other routes
    re_path(r'^(?!api/|admin/|static/|media/|ping/).*$', serve_react),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
