import os
import sys

import django
from django.core.management import call_command

# Set up Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

django.setup()

from backend.wsgi import application
import traceback
import sys

def handler(environ, start_response):
    try:
        response = application(environ, start_response)
        # Convert to list to catch lazy iteration errors
        return list(response)
    except Exception as e:
        import sys, traceback
        print(f"[vercel] WSGI CRASH: {e}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        # Return a simple JSON error instead of crashing the proxy
        status = '500 Internal Server Error'
        output = b'{"error": "WSGI Server Error", "detail": "Check Vercel logs"}'
        response_headers = [('Content-type', 'application/json'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]

# Vercel looks for 'app'
app = handler
