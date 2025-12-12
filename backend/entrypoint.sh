#!/bin/sh
set -e

echo "Starting application..."
echo "Port: $PORT"

# Run migrations
python manage.py migrate

# Start Gunicorn
exec gunicorn backend.wsgi:application --bind "0.0.0.0:$PORT"
