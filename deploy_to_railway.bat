@echo off
chcp 65001 >nul
title EcoShop - Final Deploy
color 0A

cls
echo ╔════════════════════════════════════════════════╗
echo ║     EcoShop - Финальный Деплой                ║
echo ╚════════════════════════════════════════════════╝
echo.

echo ════════════════════════════════════════════════
echo   Синхронизация...
echo ════════════════════════════════════════════════
echo.

git pull origin main --rebase 2>nul
if %errorlevel% neq 0 git pull origin main --no-rebase
echo.

echo ════════════════════════════════════════════════
echo   Добавление изменений...
echo ════════════════════════════════════════════════
echo.

git add .
git commit -m "Fix Railway deployment - API only"
echo.

echo ════════════════════════════════════════════════
echo   Загрузка на GitHub...
echo ════════════════════════════════════════════════
echo.

git push origin main
if %errorlevel% neq 0 (
    echo ❌ Ошибка!
    pause
    exit
)

echo.
echo ════════════════════════════════════════════════
echo   ✓ УСПЕШНО!
echo ════════════════════════════════════════════════
echo.
echo Railway задеплоит изменения за 2-3 минуты
echo.
echo Ваш API будет доступен по адресу:
echo https://web-production-4729d.up.railway.app
echo.
echo Endpoints:
echo - /api/products/ - список товаров
echo - /api/categories/ - категории
echo - /admin/ - админ панель
echo.
pause
