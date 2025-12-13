@echo off
chcp 65001 >nul
title Vercel Deployment - EcoShop Frontend
color 0D

cls
echo ╔════════════════════════════════════════╗
echo ║   Vercel Deployment - EcoShop         ║
echo ╚════════════════════════════════════════╝
echo.

echo 📦 Шаг 1: Установка Vercel CLI
echo ════════════════════════════════════════
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Устанавливаю Vercel CLI...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки Vercel CLI
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI установлен
) else (
    echo ✅ Vercel CLI уже установлен
)

echo.
echo 🔐 Шаг 2: Вход в Vercel
echo ════════════════════════════════════════
echo Сейчас откроется браузер для входа...
pause
vercel login
if %errorlevel% neq 0 (
    echo ❌ Ошибка входа
    pause
    exit /b 1
)

echo.
echo 🏗️ Шаг 3: Сборка Frontend
echo ════════════════════════════════════════
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Ошибка установки зависимостей
    pause
    exit /b 1
)

echo.
echo 🚀 Шаг 4: Деплой на Vercel
echo ════════════════════════════════════════
echo.
echo ВАЖНО! При первом деплое:
echo   - Set up and deploy? Yes
echo   - Which scope? [выберите ваш аккаунт]
echo   - Link to existing project? No
echo   - Project name? ecoshop-frontend
echo   - In which directory? ./
echo   - Override settings? No
echo.
pause

vercel --prod
if %errorlevel% neq 0 (
    echo ❌ Ошибка деплоя
    pause
    exit /b 1
)

cd ..

echo.
echo ════════════════════════════════════════
echo   ✅ УСПЕШНО ЗАДЕПЛОЕНО НА VERCEL!
echo ════════════════════════════════════════
echo.
echo 🌐 Ваш сайт доступен по адресу:
echo    https://ecoshop-frontend.vercel.app
echo.
echo 💡 Для последующих деплоев просто запустите:
echo    vercel --prod
echo.
echo 📊 Для просмотра статистики:
echo    https://vercel.com/dashboard
echo.
pause
