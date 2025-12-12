@echo off
chcp 65001 >nul
title EcoShop - Deploy to Railway
color 0A

cls
echo ╔════════════════════════════════════════════════╗
echo ║     EcoShop - Railway Deploy Tool             ║
echo ╚════════════════════════════════════════════════╝
echo.

echo ════════════════════════════════════════════════
echo   Синхронизация с GitHub...
echo ════════════════════════════════════════════════
echo.

git pull origin main --rebase
if %errorlevel% neq 0 (
    git pull origin main --no-rebase
)
echo ✓ Синхронизировано
echo.

echo ════════════════════════════════════════════════
echo   Добавление изменений...
echo ════════════════════════════════════════════════
echo.

git add .
echo ✓ Файлы добавлены
echo.

echo ════════════════════════════════════════════════
echo   Создание коммита...
echo ════════════════════════════════════════════════
echo.

git commit -m "Configure frontend serving for Railway"
if %errorlevel% neq 0 (
    echo ⚠ Нет новых изменений
) else (
    echo ✓ Коммит создан
)
echo.

echo ════════════════════════════════════════════════
echo   Загрузка на GitHub...
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
echo   ✓ УСПЕШНО ЗАГРУЖЕНО!
echo ════════════════════════════════════════════════
echo.
echo Railway автоматически:
echo 1. Соберет React frontend
echo 2. Применит миграции
echo 3. Соберет статические файлы
echo 4. Запустит сайт
echo.
echo Подождите 3-5 минут и обновите страницу
echo Вы увидите полноценный сайт с интерфейсом!
echo.
pause
