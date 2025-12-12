import os
import subprocess
import sys

def main():
    # Get port from environment or default
    port = os.environ.get("PORT", "8000")
    print(f"Starting application on port {port}...")

    # Run migrations
    try:
        print("Running migrations...")
        subprocess.run(["python", "manage.py", "migrate"], check=True)
    except subprocess.CalledProcessError as e:
        print(f"Migration failed: {e}")
        # Decide if you want to exit or continue. Usually exit.
        sys.exit(1)

    # Start Gunicorn
    # Use 0.0.0.0 to bind to all interfaces
    bind_addr = f"0.0.0.0:{port}"
    print(f"Starting Gunicorn on {bind_addr}...")
    
    # Replace current process with Gunicorn
    # sys.executable is the python interpreter, but we want gunicorn executable
    # assuming gunicorn is in path
    cmd = ["gunicorn", "backend.wsgi:application", "--bind", bind_addr]
    
    # flush stdout before exec
    sys.stdout.flush()
    
    os.execvp("gunicorn", cmd)

if __name__ == "__main__":
    main()
