@echo off
chcp 65001 >nul
title EcoShop - Fix Admin Upload
color 0D

cls
echo ╔════════════════════════════════════════╗
echo ║    EcoShop - Fix Upload & Logic       ║
echo ╚════════════════════════════════════════╝
echo.

echo 🚀 Исправление логики загрузки фото...
echo.
echo   • Исправлен выбор главной картинки (Main Image)
echo   • Добавлена поддержка списка ошибок от сервера
echo   • Исправлена логика смешивания старых/новых фото
echo.
echo ════════════════════════════════════════
echo.
set /p DEPLOY_NOW="🚀 Задеплоить изменения сейчас? (Y/N): "

if /i "%DEPLOY_NOW%"=="Y" (
    call deploy.bat "Fixed admin upload logic and error handling"
) else (
    echo.
    echo Хорошо, вы можете задеплоить позже командой deploy.bat
    pause
)
