@echo off
chcp 65001 >nul
title EcoShop - Deploy to Repository
color 0E

cls
echo ╔════════════════════════════════════════╗
echo ║   EcoShop - Deploy to Repository      ║
echo ╚════════════════════════════════════════╝
echo.

REM Проверка git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git не установлен!
    echo Установите Git: https://git-scm.com/
    pause
    exit /b 1
)

echo 📊 Текущий статус репозитория:
echo ════════════════════════════════════════
git status --short
echo ════════════════════════════════════════
echo.

echo 📝 Добавление всех изменений...
git add .
if %errorlevel% neq 0 (
    echo ❌ Ошибка при добавлении файлов
    pause
    exit /b 1
)

echo.
set /p COMMIT_MSG="💬 Введите описание изменений: "
if "%COMMIT_MSG%"=="" (
    echo ⚠ Описание не может быть пустым!
    pause
    exit /b 1
)

echo.
echo 💾 Создание коммита...
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo ⚠ Нет изменений для коммита или ошибка
    pause
    exit /b 1
)

echo.
echo 🚀 Загрузка на GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Ошибка при загрузке на GitHub
    echo Проверьте подключение к интернету и права доступа
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════
echo   ✅ УСПЕШНО ОБНОВЛЕНО!
echo ════════════════════════════════════════
echo.
echo ✓ Изменения загружены в репозиторий
echo ✓ Render автоматически задеплоит изменения
echo.
echo ⏱ Подождите 2-3 минуты для деплоя
echo 🌐 Затем обновите страницу сайта
echo.
pause
