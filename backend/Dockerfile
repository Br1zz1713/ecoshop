FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1



COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create python entrypoint script directly to avoid shell variable issues
RUN printf 'import os, sys, subprocess\n\
    \n\
    def main():\n\
    port = os.environ.get("PORT", "8000")\n\
    print(f"Starting application on port {port}...")\n\
    \n\
    print("Running migrations...")\n\
    subprocess.run(["python", "manage.py", "migrate"], check=True)\n\
    \n\
    print(f"Starting Gunicorn on 0.0.0.0:{port}...")\n\
    # Replaces current process with Gunicorn\n\
    os.execvp("gunicorn", ["gunicorn", "backend.wsgi:application", "--bind", f"0.0.0.0:{port}"])\n\
    \n\
    if __name__ == "__main__":\n\
    main()\n\
    ' > /app/run_app.py

# Run via python script
CMD ["python", "/app/run_app.py"]
