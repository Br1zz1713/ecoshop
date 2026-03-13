import os
import sys

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# In Vercel serverless, /tmp is writable.
os.environ.setdefault('DJANGO_STATIC_ROOT', '/tmp/staticfiles')

from backend.wsgi import application

# Vercel looks for 'app'
app = application
