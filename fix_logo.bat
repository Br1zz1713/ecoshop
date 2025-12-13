@echo off
chcp 65001 >nul
title EcoShop - Fix Logo
color 0B

cls
echo ╔════════════════════════════════════════╗
echo ║       EcoShop - Fix Logo Script       ║
echo ╚════════════════════════════════════════╝
echo.

echo 🔄 Восстановление оригинального логотипа...
echo.

REM Копирование файла
copy "C:\Users\evgen\.gemini\antigravity\brain\07eff94a-b493-4c80-9f9d-cf511b6e0c9e\logo_transparent_1765587326688.png" "frontend\public\logo.png" /Y

if %errorlevel% neq 0 (
    echo ❌ Ошибка при копировании файла!
    echo Проверьте путь или права доступа.
    pause
    exit /b 1
)

echo.
echo ✅ Логотип успешно скопирован!
echo Теперь в Navbar используется ваш оригинальный логотип.
echo.
echo ════════════════════════════════════════
echo.
set /p DEPLOY_NOW="🚀 Задеплоить изменения сейчас? (Y/N): "

if /i "%DEPLOY_NOW%"=="Y" (
    call deploy.bat
) else (
    echo.
    echo Хорошо, вы можете задеплоить позже командой deploy.bat
    pause
)
