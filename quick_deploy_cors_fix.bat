@echo off
chcp 65001 >nul
title Quick Deploy to Railway
color 0B

cls
echo ╔════════════════════════════════════════╗
echo ║   Quick Deploy - CORS Fix             ║
echo ╚════════════════════════════════════════╝
echo.

echo 📝 Добавление изменений...
git add backend/settings.py

echo 💾 Создание коммита...
git commit -m "Fix CORS: Add Vercel domain to CSRF_TRUSTED_ORIGINS"

echo 🚀 Загрузка на GitHub...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ИЗМЕНЕНИЯ ЗАГРУЖЕНЫ!
echo ════════════════════════════════════════
echo.
echo Railway автоматически задеплоит изменения
echo Подождите 2-3 минуты
echo.
echo Затем обновите страницу frontend (Ctrl+F5)
echo.
pause
