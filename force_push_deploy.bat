@echo off
chcp 65001 >nul
title Force Update - Disable Security Checks
color 0E

cls
echo ╔════════════════════════════════════════╗
echo ║   DEBUG MODE: DISABLE SECURITY CHECKS ║
echo ╚════════════════════════════════════════╝
echo.
echo Мы временно отключаем строгие проверки безопасности (CSP, Headers),
echo чтобы найти причину блокировки соединения.
echo.

echo 📦 1. Добавление изменений...
git add .

echo 💾 2. Создание коммита...
git commit -m "DEBUG: Disable SecurityMiddleware and CSPMiddleware"

echo 🚀 3. Загрузка на GitHub...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ОТПРАВЛЕНО!
echo ════════════════════════════════════════
echo.
echo Ждем обновления Railway (2-3 мин).
echo Если после этого заработает - значит проблема была в слишком строгих правилах.
echo.
pause
