FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create entrypoint script directly
RUN printf '#!/bin/sh\n\
    set -e\n\
    \n\
    echo "Starting application..."\n\
    echo "Port: $PORT"\n\
    \n\
    # Run migrations\n\
    python manage.py migrate\n\
    \n\
    # Start Gunicorn\n\
    exec gunicorn backend.wsgi:application --bind "0.0.0.0:$PORT"\n\
    ' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Run migrations and start server
CMD ["/app/entrypoint.sh"]
