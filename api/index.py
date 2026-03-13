import os
import sys

import django
from django.core.management import call_command

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# In Vercel serverless, /tmp is writable.
os.environ.setdefault('DJANGO_STATIC_ROOT', '/tmp/staticfiles')

django.setup()

# Run collectstatic so WhiteNoise has something to serve
try:
    call_command('collectstatic', '--noinput', '--clear', verbosity=0)
except Exception as e:
    print(f"[vercel] collectstatic skipped: {e}", file=sys.stderr)

from backend.wsgi import application

# Vercel looks for 'app'
app = application
