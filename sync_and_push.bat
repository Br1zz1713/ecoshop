@echo off
chcp 65001 >nul
title EcoShop - Fix Git Conflict
color 0A

cls
echo ╔════════════════════════════════════════════════╗
echo ║     EcoShop - Git Sync Tool                   ║
echo ╚════════════════════════════════════════════════╝
echo.
echo Этот скрипт синхронизирует ваш код с GitHub
echo.

echo ════════════════════════════════════════════════
echo   Шаг 1: Скачивание изменений с GitHub...
echo ════════════════════════════════════════════════
echo.

git pull origin main --rebase
if %errorlevel% neq 0 (
    echo.
    echo ⚠ Возможен конфликт. Пробую другой метод...
    echo.
    git pull origin main --no-rebase
    if %errorlevel% neq 0 (
        echo.
        echo ❌ Ошибка синхронизации!
        echo.
        echo Решение:
        echo 1. Сохраните ваши изменения
        echo 2. Запустите: git stash
        echo 3. Запустите: git pull origin main
        echo 4. Запустите: git stash pop
        echo.
        pause
        exit
    )
)

echo ✓ Изменения скачаны
echo.

echo ════════════════════════════════════════════════
echo   Шаг 2: Добавление ваших изменений...
echo ════════════════════════════════════════════════
echo.

git add .
echo ✓ Файлы добавлены
echo.

echo ════════════════════════════════════════════════
echo   Шаг 3: Создание коммита...
echo ════════════════════════════════════════════════
echo.

git commit -m "Fix ALLOWED_HOSTS for Railway deployment"
if %errorlevel% neq 0 (
    echo ⚠ Нет новых изменений для коммита
) else (
    echo ✓ Коммит создан
)
echo.

echo ════════════════════════════════════════════════
echo   Шаг 4: Загрузка на GitHub...
echo ════════════════════════════════════════════════
echo.

git push origin main
if %errorlevel% neq 0 (
    echo ❌ Ошибка при загрузке!
    pause
    exit
)

echo.
echo ════════════════════════════════════════════════
echo   ✓ УСПЕШНО СИНХРОНИЗИРОВАНО!
echo ════════════════════════════════════════════════
echo.
echo Railway автоматически задеплоит изменения
echo Подождите 2-3 минуты и проверьте сайт
echo.
pause
