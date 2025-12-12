FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run via python one-liner to avoid all file/shell issues
CMD python -c "import os, sys; os.system('python manage.py migrate'); os.execvp('gunicorn', ['gunicorn', 'backend.wsgi:application', '--bind', '0.0.0.0:' + os.environ.get('PORT', '8000')])"
