# Pure WSGI handler to test Vercel invocation
def app(environ, start_response):
    status = '200 OK'
    output = b'{"status": "Pure Python OK"}'
    response_headers = [('Content-type', 'application/json'), ('Content-Length', str(len(output)))]
    start_response(status, response_headers)
    return [output]
