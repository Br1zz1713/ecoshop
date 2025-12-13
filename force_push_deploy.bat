@echo off
chcp 65001 >nul
title EcoShop - Remove Widget
color 0C

cls
echo ╔════════════════════════════════════════╗
echo ║   ROLLBACK: REMOVING WIDGET            ║
echo ╚════════════════════════════════════════╝
echo.
echo Удаляем блок "Предложения по улучшению"
echo и откатываем все изменения в коде.
echo.

echo 🗑️ 1. Удаление файла компонента...
if exist "frontend\src\components\SuggestionsWidget.jsx" del "frontend\src\components\SuggestionsWidget.jsx"

echo 📦 2. Фиксация удаления в Git...
git add .
git commit -m "Remove Suggestions Widget and revert backend changes"

echo 🚀 3. Отправка изменений...
git push origin main

echo.
echo ════════════════════════════════════════
echo   ✅ ГОТОВО!
echo ════════════════════════════════════════
echo.
echo Изменения отправлены. Vercel и Railway обновятся автоматически.
echo.
pause
