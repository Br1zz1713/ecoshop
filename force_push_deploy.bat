@echo off
chcp 65001 >nul
title EcoShop - Fix Admin Colors
color 0B

cls
echo ╔════════════════════════════════════════╗
echo ║   UPDATE: FIX ADMIN TEXT COLORS       ║
echo ╚════════════════════════════════════════╝
echo.
echo Исправляем цвет цифр в "Analytics Overview".
echo Теперь они будут светлыми в темной теме.
echo.

echo 📦 1. Добавление изменений...
git add .
git commit -m "Fix Admin Dashboard stat colors for dark mode"

echo 🚀 2. Отправка изменений...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ГОТОВО!
echo ════════════════════════════════════════
echo.
echo Vercel обновит Frontend через минуту.
echo.
pause
