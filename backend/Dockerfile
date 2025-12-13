FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Grant execution rights to the start script
RUN chmod +x backend/start.sh

# Use start.sh as the default command
CMD ["sh", "backend/start.sh"]
