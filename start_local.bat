@echo off
chcp 65001 >nul
title EcoShop - Local Development
color 0A

cls
echo ╔════════════════════════════════════════╗
echo ║    EcoShop - Local Development        ║
echo ╚════════════════════════════════════════╝
echo.
echo 🚀 Starting local server...
echo.

REM Auto-enable SQLite rescue mode when DATABASE_URL is missing
set "FORCE_SQLITE=true"
if exist ".env" (
    for /f "usebackq tokens=1,* delims==" %%a in (".env") do (
        if /I "%%a"=="DATABASE_URL" set "FORCE_SQLITE=false"
    )
)
echo ✓ FORCE_SQLITE=%FORCE_SQLITE%
echo.

REM Check for virtual environment
if exist "venv\Scripts\activate.bat" (
    echo ✓ Virtual environment found
    call venv\Scripts\activate.bat
) else (
    echo ⚠ Creating virtual environment...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo ✓ Installing dependencies...
    pip install -r requirements.txt
)

echo.
echo ✓ Applying migrations...
python manage.py migrate

echo.
echo ════════════════════════════════════════
echo   Starting Backend (Django) on :8000
echo ════════════════════════════════════════
start "EcoShop Backend" cmd /k "cd /d %CD% && venv\Scripts\activate.bat && python manage.py runserver"

timeout /t 3 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   Starting Frontend (React) on :5173
echo ════════════════════════════════════════

REM Check for node_modules
if not exist "frontend\node_modules" (
    echo ⚠ Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

start "EcoShop Frontend" cmd /k "cd /d %CD%\frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   ✓ Site launched!
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo ════════════════════════════════════════
echo.
echo Opening site in browser...
start http://localhost:5173
echo.
echo To stop, close Backend and Frontend windows
echo.
pause
