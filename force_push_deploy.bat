@echo off
chcp 65001 >nul
title Force Update Railway - Crash Fix
color 0D

cls
echo ╔════════════════════════════════════════╗
echo ║   FORCE UPDATE: FIX URL CRASH         ║
echo ╚════════════════════════════════════════╝
echo.
echo Этот скрипт отправит исправление ошибки (serve_react).
echo.

echo 📦 1. Добавление файлов...
git add .

echo 💾 2. Создание коммита (Fix URL crash)...
git commit -m "CRITICAL FIX: Restore serve_react function in urls.py"
if %errorlevel% neq 0 (
    echo Изменений нет или ошибка коммита. Продолжаем пуш...
)

echo 🚀 3. Загрузка на GitHub...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ИСПРАВЛЕНИЕ ОТПРАВЛЕНО!
echo ════════════════════════════════════════
echo.
echo Railway сейчас пересоберет проект.
echo Как только статус станет "Active" (зеленый):
echo 1. Проверьте /ping/
echo 2. Проверьте админку
echo.
pause
