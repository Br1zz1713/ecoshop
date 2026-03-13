import traceback
import sys

class ExceptionLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        print(f"[DEBUG_MIDDLEWARE] Exception caught at {request.path}: {exception}", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        return None
