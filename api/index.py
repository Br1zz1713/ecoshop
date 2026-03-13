from backend.wsgi import application
import traceback
import sys

def handler(environ, start_response):
    try:
        return application(environ, start_response)
    except Exception as e:
        print(f"[vercel] WSGI CRASH: {e}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        # Return a simple JSON error instead of crashing the proxy
        status = '500 Internal Server Error'
        output = b'{"error": "WSGI Server Error", "detail": "Check logs"}'
        response_headers = [('Content-type', 'application/json'), ('Content-Length', str(len(output)))]
        start_response(status, response_headers)
        return [output]

# Vercel looks for 'app'
app = handler
