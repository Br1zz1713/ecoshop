#!/usr/bin/env python3
"""
EcoShop Site Manager - Cross-platform site management tool
"""
import os
import sys
import subprocess
import platform
import signal
import time
from pathlib import Path

class Colors:
    """ANSI color codes"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

class SiteManager:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.venv_path = self.base_dir / 'venv'
        self.is_windows = platform.system() == 'Windows'
        self.python_cmd = self._get_python_cmd()
        self.server_process = None

    def _get_python_cmd(self):
        """Get the correct Python command based on OS and venv"""
        if self.venv_path.exists():
            if self.is_windows:
                return str(self.venv_path / 'Scripts' / 'python.exe')
            else:
                return str(self.venv_path / 'bin' / 'python')
        return 'python' if self.is_windows else 'python3'

    def clear_screen(self):
        """Clear terminal screen"""
        os.system('cls' if self.is_windows else 'clear')

    def print_header(self, title):
        """Print formatted header"""
        self.clear_screen()
        print(f"{Colors.CYAN}{'='*50}{Colors.RESET}")
        print(f"{Colors.BOLD}{Colors.GREEN}  {title}{Colors.RESET}")
        print(f"{Colors.CYAN}{'='*50}{Colors.RESET}\n")

    def run_command(self, cmd, shell=False):
        """Run a command and return the result"""
        try:
            result = subprocess.run(
                cmd,
                shell=shell,
                cwd=self.base_dir,
                capture_output=False,
                text=True
            )
            return result.returncode == 0
        except Exception as e:
            print(f"{Colors.RED}✗ Error: {e}{Colors.RESET}")
            return False

    def start_site(self):
        """Start the Django development server"""
        self.print_header("🚀 Starting EcoShop Site")
        
        # Check and create venv if needed
        if not self.venv_path.exists():
            print(f"{Colors.YELLOW}⚠ Virtual environment not found. Creating...{Colors.RESET}")
            subprocess.run([sys.executable, '-m', 'venv', 'venv'])
            print(f"{Colors.GREEN}✓ Virtual environment created{Colors.RESET}\n")

        # Apply migrations
        print(f"{Colors.BLUE}Applying migrations...{Colors.RESET}")
        self.run_command([self.python_cmd, 'manage.py', 'migrate'])

        # Start server
        print(f"\n{Colors.GREEN}✓ Starting Django server on http://localhost:8000{Colors.RESET}")
        print(f"{Colors.YELLOW}Press Ctrl+C to stop{Colors.RESET}\n")
        print(f"{Colors.CYAN}{'='*50}{Colors.RESET}\n")
        
        try:
            subprocess.run([self.python_cmd, 'manage.py', 'runserver'])
        except KeyboardInterrupt:
            print(f"\n{Colors.YELLOW}Server stopped by user{Colors.RESET}")

    def stop_site(self):
        """Stop the Django server"""
        self.print_header("🛑 Stopping Site")
        
        if self.is_windows:
            os.system('taskkill /F /IM python.exe /FI "WINDOWTITLE eq *runserver*" 2>nul')
        else:
            os.system("pkill -f 'manage.py runserver'")
        
        print(f"{Colors.GREEN}✓ Site stopped{Colors.RESET}")
        input("\nPress Enter to continue...")

    def check_status(self):
        """Check if the site is running"""
        self.print_header("📊 Site Status")
        
        if self.is_windows:
            result = os.system('tasklist /FI "IMAGENAME eq python.exe" | find "python.exe" >nul')
        else:
            result = os.system("pgrep -f 'manage.py runserver' >/dev/null")
        
        if result == 0:
            print(f"{Colors.GREEN}✓ Status: RUNNING{Colors.RESET}")
            if not self.is_windows:
                os.system("lsof -i :8000")
        else:
            print(f"{Colors.RED}✗ Status: STOPPED{Colors.RESET}")
        
        input("\nPress Enter to continue...")

    def apply_migrations(self):
        """Apply database migrations"""
        self.print_header("🗄️  Applying Migrations")
        
        print(f"{Colors.BLUE}Making migrations...{Colors.RESET}")
        self.run_command([self.python_cmd, 'manage.py', 'makemigrations'])
        
        print(f"\n{Colors.BLUE}Applying migrations...{Colors.RESET}")
        self.run_command([self.python_cmd, 'manage.py', 'migrate'])
        
        print(f"\n{Colors.GREEN}✓ Migrations applied{Colors.RESET}")
        input("\nPress Enter to continue...")

    def create_superuser(self):
        """Create a superuser"""
        self.print_header("👤 Create Superuser")
        
        username = input("Enter username: ")
        if username:
            self.run_command([self.python_cmd, 'manage.py', 'make_superuser', username])
        
        input("\nPress Enter to continue...")

    def collect_static(self):
        """Collect static files"""
        self.print_header("📦 Collecting Static Files")
        
        self.run_command([self.python_cmd, 'manage.py', 'collectstatic', '--noinput'])
        
        print(f"\n{Colors.GREEN}✓ Static files collected{Colors.RESET}")
        input("\nPress Enter to continue...")

    def show_menu(self):
        """Display the main menu"""
        while True:
            self.print_header("EcoShop Site Manager v1.0")
            
            menu_items = [
                ("1", "🚀 Start Site (Development)", self.start_site),
                ("2", "🛑 Stop Site", self.stop_site),
                ("3", "📊 Check Status", self.check_status),
                ("4", "🗄️  Apply Migrations", self.apply_migrations),
                ("5", "👤 Create Superuser", self.create_superuser),
                ("6", "📦 Collect Static Files", self.collect_static),
                ("0", "❌ Exit", None),
            ]
            
            for key, label, _ in menu_items:
                print(f"[{key}] {label}")
            
            print()
            choice = input("Choose an action: ").strip()
            
            for key, _, action in menu_items:
                if choice == key:
                    if action:
                        action()
                    else:
                        print(f"\n{Colors.CYAN}Thank you for using EcoShop Site Manager!{Colors.RESET}\n")
                        sys.exit(0)
                    break
            else:
                print(f"{Colors.RED}Invalid choice. Please try again.{Colors.RESET}")
                time.sleep(1)

def main():
    manager = SiteManager()
    try:
        manager.show_menu()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Interrupted by user{Colors.RESET}")
        sys.exit(0)

if __name__ == '__main__':
    main()
