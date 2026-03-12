import os
import subprocess
import sys

import django
from django.core.management import call_command

# Set up Django settings before anything else
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# In Vercel serverless, /tmp is writable. We override STATIC_ROOT to write there,
# then run collectstatic once so Django admin CSS is available via WhiteNoise.
os.environ.setdefault('DJANGO_STATIC_ROOT', '/tmp/staticfiles')

django.setup()

# Run collectstatic on first cold start (safe to run multiple times, uses /tmp).
try:
    call_command('collectstatic', '--noinput', '--clear', verbosity=0)
except Exception as e:
    print(f"[vercel] collectstatic skipped: {e}", file=sys.stderr)

from backend.wsgi import application  # noqa: E402

# Vercel Python serverless looks for 'app'
app = application
