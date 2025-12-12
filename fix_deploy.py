import os
import subprocess
import time
import sys

def print_step(step):
    print(f"\n{'='*50}")
    print(f"STEP: {step}")
    print(f"{'='*50}")

def run_command(command):
    print(f"> Running: {command}")
    try:
        result = subprocess.run(command, shell=True, check=True, text=True, capture_output=True)
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(e.stderr)
        # We don't exit here because sometimes git commit produces "nothing to commit" which is fine
        return False
    return True

def fix_files():
    print_step("Fixing Configuration Files")
    
    # 1. Remove conflicting Procfile
    if os.path.exists("Procfile"):
        print("Found Procfile. DELETING it...")
        os.remove("Procfile")
        print("Procfile deleted.")
    else:
        print("Procfile not found (Good).")

    # 2. Enforce Dockerfile with Python One-Liner
    dockerfile_path = os.path.join("backend", "Dockerfile")
    print(f"Overwriting {dockerfile_path}...")
    dockerfile_content = """FROM python:3.10-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run via python one-liner to avoid all file/shell issues
CMD python -c "import os, sys; os.system('python manage.py migrate'); os.execvp('gunicorn', ['gunicorn', 'backend.wsgi:application', '--bind', '0.0.0.0:' + os.environ.get('PORT', '8000')])"
"""
    with open(dockerfile_path, "w") as f:
        f.write(dockerfile_content)
    print("Dockerfile updated.")

    # 3. Enforce railway.json
    railway_json_path = "railway.json"
    print(f"Overwriting {railway_json_path}...")
    railway_config = """{
    "$schema": "https://railway.app/railway.schema.json",
    "build": {
        "builder": "DOCKERFILE",
        "dockerfilePath": "backend/Dockerfile"
    },
    "deploy": {
        "restartPolicyType": "ON_FAILURE",
        "restartPolicyMaxRetries": 10
    }
}"""
    with open(railway_json_path, "w") as f:
        f.write(railway_config)
    print("railway.json updated.")

def deploy():
    print_step("Deploying to Railway")
    
    print("Staging changes...")
    run_command("git add .")
    
    print("Committing changes...")
    # Using specific message to force a new deployment
    timestamp = int(time.time())
    run_command(f'git commit -m "Fix Railway Config: Remove Procfile (Time: {timestamp})"')
    
    print("Pushing to GitHub...")
    success = run_command("git push")
    
    if success:
        print("\nSUCCESS! Code pushed to GitHub.")
        print("Railway should pick up the changes immediately.")
        print("Check the Railway dashboard for the build status.")
    else:
        print("\nPush failed. Please check your git configuration.")

def main():
    print("Starting Railway Auto-Fix Tool...")
    fix_files()
    deploy()
    print("\nDone.")
    input("Press Enter to exit...")

if __name__ == "__main__":
    main()
