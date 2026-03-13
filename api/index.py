import os
import sys
import traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Wrap entire startup in try/except to catch any crash at module-load time
_startup_error = None
_application = None

try:
    import django
    django.setup()
    from backend.wsgi import application as _application
except BaseException as _e:
    _startup_error = traceback.format_exc()
    print(f"[vercel] STARTUP CRASH:\n{_startup_error}", file=sys.stderr)


def handler(environ, start_response):
    if _startup_error:
        # Return the startup error as a readable JSON response
        output = (
            '{"error": "Django startup failed", "detail": '
            + repr(_startup_error)
            + '}'
        ).encode()
        start_response('500 Internal Server Error', [
            ('Content-Type', 'application/json'),
            ('Content-Length', str(len(output))),
        ])
        return [output]

    try:
        response = _application(environ, start_response)
        return list(response)
    except Exception as e:
        tb = traceback.format_exc()
        print(f"[vercel] WSGI CRASH: {e}\n{tb}", file=sys.stderr)
        output = ('{"error": "WSGI Server Error", "detail": ' + repr(str(e)) + '}').encode()
        start_response('500 Internal Server Error', [
            ('Content-Type', 'application/json'),
            ('Content-Length', str(len(output))),
        ])
        return [output]


# Vercel looks for 'app'
app = handler
