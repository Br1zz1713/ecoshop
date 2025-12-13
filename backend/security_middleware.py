"""
Custom security middleware to add security headers to all responses.
"""

class SecurityHeadersMiddleware:
    """
    Middleware to add security headers to all HTTP responses.
    """
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Prevent MIME type sniffing
        response['X-Content-Type-Options'] = 'nosniff'
        
        # Prevent clickjacking
        response['X-Frame-Options'] = 'DENY'
        
        # Enable XSS protection
        response['X-XSS-Protection'] = '1; mode=block'
        
        # Referrer policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Permissions policy (restrict features)
        response['Permissions-Policy'] = 'geolocation=(), microphone=(), camera=()'
        
        # Strict Transport Security (HSTS) - only in production
        if not request.build_absolute_uri().startswith('http://localhost'):
            response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        return response
