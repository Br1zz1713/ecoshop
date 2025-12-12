@echo off
echo ==========================================
echo      Eco Shop - Applying System Updates
echo ==========================================

echo [1/4] Installing Dependencies...
pip install -r requirements.txt
if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies.
    pause
    exit /b %ERRORLEVEL%
)


echo [2/5] Installing Frontend Dependencies...
cd frontend
call npm install
cd ..
if %ERRORLEVEL% NEQ 0 (
    echo Error installing frontend dependencies.
    pause
    exit /b %ERRORLEVEL%
)

echo [3/5] Creating Database Migrations...
python manage.py makemigrations
if %ERRORLEVEL% NEQ 0 (
    echo Error executing makemigrations.
    pause
    exit /b %ERRORLEVEL%
)

echo [4/5] Applying Migrations...
python manage.py migrate
if %ERRORLEVEL% NEQ 0 (
    echo Error executing migrate.
    pause
    exit /b %ERRORLEVEL%
)

echo [5/5] Seeding Product Data...
python seed_products.py
if %ERRORLEVEL% NEQ 0 (
    echo Error executing seed_products.py.
    pause
    exit /b %ERRORLEVEL%
)

echo ==========================================
echo      Updates Applied Successfully!
echo ==========================================
pause
