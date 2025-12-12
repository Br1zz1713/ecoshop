@echo off
chcp 65001 >nul
title EcoShop - Quick Update to Railway
color 0A

cls
echo ╔════════════════════════════════════════════════╗
echo ║     EcoShop - Quick Update Tool               ║
echo ╚════════════════════════════════════════════════╝
echo.
echo Этот скрипт обновит код на GitHub и Railway
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

set /p COMMIT_MSG="Введите описание изменений (или Enter для 'Update'): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update

git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo ⚠ Нет изменений для коммита
    pause
    exit
)
echo ✓ Коммит создан
echo.

echo ════════════════════════════════════════════════
echo   Загрузка на GitHub...
echo ════════════════════════════════════════════════
echo.

git push
if %errorlevel% neq 0 (
    echo ❌ Ошибка при загрузке!
    echo Проверьте подключение к интернету
    pause
    exit
)

echo.
echo ════════════════════════════════════════════════
echo   ✓ УСПЕШНО ОБНОВЛЕНО!
echo ════════════════════════════════════════════════
echo.
echo Railway автоматически задеплоит изменения
echo Подождите 2-3 минуты и обновите страницу
echo.
pause
