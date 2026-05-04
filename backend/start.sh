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

# Seed database with initial products
echo "Seeding database..."
python scripts/seed_products.py

# Create admin user
echo "Creating admin user..."
python scripts/create_admin.py

# Collect static files (if not already done)
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Start Gunicorn
echo "Starting Gunicorn on 0.0.0.0:$PORT..."
exec gunicorn backend.wsgi:application --bind "0.0.0.0:$PORT" --log-level debug
