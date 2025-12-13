@echo off
chcp 65001 >nul
title EcoShop - Update Frontend
color 0B

cls
echo ╔════════════════════════════════════════╗
echo ║   UPDATE: ADDING WIDGET TO SITE       ║
echo ╚════════════════════════════════════════╝
echo.
echo Мы добавляем блок "Предложения по улучшению"
echo на главную страницу Админки.
echo.

echo 📦 1. Добавление всех изменений...
git add .

echo 💾 2. Создание коммита...
git commit -m "Add Suggestions Widget to Admin Dashboard"

echo 🚀 3. Загрузка на GitHub...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ОТПРАВЛЕНО!
echo ════════════════════════════════════════
echo.
echo Vercel (Frontend) увидит изменения и обновит сайт.
echo Это займет около 1-2 минут.
echo.
pause
