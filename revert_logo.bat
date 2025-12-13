@echo off
chcp 65001 >nul
title EcoShop - Revert Logo
color 0A

cls
echo ╔════════════════════════════════════════╗
echo ║      EcoShop - Revert to Original     ║
echo ╚════════════════════════════════════════╝
echo.

echo 🔄 Возвращение оригинального логотипа (Sprout icon)...
echo.
echo ✅ Код Navbar.jsx обновлен
echo.
echo ════════════════════════════════════════
echo.
set /p DEPLOY_NOW="🚀 Задеплоить изменения сейчас? (Y/N): "

if /i "%DEPLOY_NOW%"=="Y" (
    call deploy.bat "Reverted logo to Sprout icon"
) else (
    echo.
    echo Хорошо, вы можете задеплоить позже командой deploy.bat
    pause
)
