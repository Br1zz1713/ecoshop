@echo off
chcp 65001 >nul
title Force Update Railway
color 0D

cls
echo ╔════════════════════════════════════════╗
echo ║   Force Update - Railway Deployment   ║
echo ╚════════════════════════════════════════╝
echo.
echo Этот скрипт принудительно отправит ВСЕ изменения на сервер.
echo Это исправит проблему, если Railway не видит последние файлы.
echo.

echo 📦 1. Добавление всех файлов...
git add .

echo 💾 2. Создание коммита...
git commit -m "FORCE UPDATE: Fix backend routing and middleware"
if %errorlevel% neq 0 (
    echo Изменений нет или ошибка коммита. Продолжаем пуш...
)

echo 🚀 3. Загрузка на GitHub...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ОБНОВЛЕНИЕ ОТПРАВЛЕНО!
echo ════════════════════════════════════════
echo.
echo Railway автоматически пересоберет проект (2-3 минуты).
echo.
echo ПОСЛЕ ПЕРЕСБОРКИ (когда статус будет Active):
echo 1. Откройте сайт.
echo 2. Нажмите Ctrl+F5 несколько раз.
echo.
pause
