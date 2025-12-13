#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Default to port 8000 if PORT is not set
PORT="${PORT:-8000}"

echo "Starting deployment script..."
echo "PORT is set to: $PORT"

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate --noinput

# Collect static files (if not already done)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn on 0.0.0.0:$PORT..."
exec gunicorn backend.wsgi:application --bind "0.0.0.0:$PORT" --log-level debug
