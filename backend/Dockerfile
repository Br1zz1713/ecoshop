FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy startup script
COPY run_app.py .

# Run via python script to avoid shell variable issues
CMD ["python", "run_app.py"]
