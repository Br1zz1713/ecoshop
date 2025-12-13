@echo off
chcp 65001 >nul
title EcoShop - Local Development
color 0A

cls
echo ╔════════════════════════════════════════╗
echo ║    EcoShop - Local Development        ║
echo ╚════════════════════════════════════════╝
echo.
echo 🚀 Запуск локального сервера...
echo.

REM Проверка виртуального окружения
if exist "venv\Scripts\activate.bat" (
    echo ✓ Виртуальное окружение найдено
    call venv\Scripts\activate.bat
) else (
    echo ⚠ Создаю виртуальное окружение...
    python -m venv venv
    call venv\Scripts\activate.bat
    echo ✓ Устанавливаю зависимости...
    pip install -r requirements.txt
)

echo.
echo ✓ Применяю миграции...
python manage.py migrate

echo.
echo ════════════════════════════════════════
echo   Запуск Backend (Django) на :8000
echo ════════════════════════════════════════
start "EcoShop Backend" cmd /k "cd /d %CD% && venv\Scripts\activate.bat && python manage.py runserver"

timeout /t 3 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   Запуск Frontend (React) на :5173
echo ════════════════════════════════════════

REM Проверка node_modules
if not exist "frontend\node_modules" (
    echo ⚠ Устанавливаю зависимости frontend...
    cd frontend
    call npm install
    cd ..
)

start "EcoShop Frontend" cmd /k "cd /d %CD%\frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   ✓ Сайт запущен!
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo ════════════════════════════════════════
echo.
echo Открываю сайт в браузере...
start http://localhost:5173
echo.
echo Для остановки закройте окна Backend и Frontend
echo.
pause
