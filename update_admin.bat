@echo off
chcp 65001 >nul
title EcoShop - Update Admin Panel
color 0D

cls
echo ╔════════════════════════════════════════╗
echo ║    EcoShop - Update Admin Features    ║
echo ╚════════════════════════════════════════╝
echo.

echo 🚀 Обновление функционала админки...
echo.
echo   • Добавлена кнопка удаления фото (❌)
echo   • Добавлена кнопка добавления фото (+)
echo   • Исправлена логика загрузки файлов
echo.
echo ════════════════════════════════════════
echo.
set /p DEPLOY_NOW="🚀 Задеплоить изменения сейчас? (Y/N): "

if /i "%DEPLOY_NOW%"=="Y" (
    call deploy.bat "Improved Admin: Add/Remove photo functionality"
) else (
    echo.
    echo Хорошо, вы можете задеплоить позже командой deploy.bat
    pause
)
