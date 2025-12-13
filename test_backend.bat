@echo off
chcp 65001 >nul
title EcoShop Backend Tester
color 0F

cls
echo ╔════════════════════════════════════════╗
echo ║   TESTING BACKEND CONNECTION          ║
echo ╚════════════════════════════════════════╝
echo.
echo URL: https://backend-production-4598.up.railway.app
echo.

echo [1/3] Проверка PING (доступность сервера)...
curl -v https://backend-production-4598.up.railway.app/ping/
echo.
echo ----------------------------------------
echo.

echo [2/3] Проверка API CATEGORIES (доступность БД)...
curl -v https://backend-production-4598.up.railway.app/api/categories/
echo.
echo ----------------------------------------
echo.

echo [3/3] Вывод:
echo.
echo Если в PING ответ "pong" - сервер ЖИВ.
echo Если в CATEGORIES виден JSON список - БД работает.
echo.
echo Если ошибки (404, 502) - значит сервер еще не готов или упал.
echo.
pause
