@echo off
chcp 65001 >nul
title Firebase Deployment - EcoShop
color 0B

cls
echo ╔════════════════════════════════════════╗
echo ║   Firebase Deployment - EcoShop       ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI не установлен!
    echo.
    echo 📦 Устанавливаю Firebase CLI...
    call npm install -g firebase-tools
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки Firebase CLI
        pause
        exit /b 1
    )
    echo ✅ Firebase CLI установлен
    echo.
)

echo 🔐 Шаг 1: Вход в Firebase
echo ════════════════════════════════════════
firebase login
if %errorlevel% neq 0 (
    echo ❌ Ошибка входа в Firebase
    pause
    exit /b 1
)
echo.

echo 🏗️ Шаг 2: Сборка Frontend
echo ════════════════════════════════════════
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Ошибка установки зависимостей
    pause
    exit /b 1
)

call npm run build
if %errorlevel% neq 0 (
    echo ❌ Ошибка сборки проекта
    pause
    exit /b 1
)
cd ..
echo ✅ Сборка завершена
echo.

echo 🚀 Шаг 3: Деплой на Firebase Hosting
echo ════════════════════════════════════════
firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo ❌ Ошибка деплоя
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════
echo   ✅ УСПЕШНО ЗАДЕПЛОЕНО!
echo ════════════════════════════════════════
echo.
echo 🌐 Ваш сайт доступен по адресу:
echo    https://YOUR-PROJECT-ID.web.app
echo.
echo 💡 Чтобы узнать URL, выполните:
echo    firebase hosting:channel:list
echo.
pause
