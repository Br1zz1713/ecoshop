@echo off
chcp 65001 >nul
title EcoShop Site Manager
color 0A

:menu
cls
echo ╔════════════════════════════════════════╗
echo ║      EcoShop Site Manager v1.0        ║
echo ╚════════════════════════════════════════╝
echo.
echo [1] 🚀 Запустить сайт (Development)
echo [2] 🛑 Остановить сайт
echo [3] 📊 Статус сайта
echo [4] 🔄 Перезапустить сайт
echo [5] 🗄️  Применить миграции
echo [6] 👤 Создать суперпользователя
echo [7] 📦 Собрать статические файлы
echo [8] 🧹 Очистить кэш
echo [9] 📝 Показать логи
echo [0] ❌ Выход
echo [10] 🚢 Выгрузить на Render.com
echo.
set /p choice="Выберите действие: "

if "%choice%"=="1" goto start
if "%choice%"=="2" goto stop
if "%choice%"=="3" goto status
if "%choice%"=="4" goto restart
if "%choice%"=="5" goto migrate
if "%choice%"=="6" goto superuser
if "%choice%"=="7" goto collectstatic
if "%choice%"=="8" goto clearcache
if "%choice%"=="9" goto logs
if "%choice%"=="0" goto exit
if "%choice%"=="10" goto deploy
goto menu

:start
cls
echo ════════════════════════════════════════
echo 🚀 Запуск сайта...
echo ════════════════════════════════════════
echo.

REM Проверка виртуального окружения
if exist "venv\Scripts\activate.bat" (
    echo ✓ Виртуальное окружение найдено
    call venv\Scripts\activate.bat
) else (
    echo ⚠ Виртуальное окружение не найдено
    echo Создаю виртуальное окружение...
    python -m venv venv
    call venv\Scripts\activate.bat
    pip install -r requirements.txt
)

echo.
echo ✓ Применяю миграции...
python manage.py migrate

echo.
echo ════════════════════════════════════════
echo   Запуск Backend (Django) на :8000
echo ════════════════════════════════════════
start "EcoShop Backend" cmd /k "cd /d %CD% && venv\Scripts\activate.bat && python manage.py runserver"

timeout /t 3 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   Запуск Frontend (React) на :5173
echo ════════════════════════════════════════

REM Проверка node_modules
if not exist "frontend\node_modules" (
    echo ⚠ Устанавливаю зависимости frontend...
    cd frontend
    call npm install
    cd ..
)

start "EcoShop Frontend" cmd /k "cd /d %CD%\frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ════════════════════════════════════════
echo   ✓ Сайт запущен!
echo   Backend:  http://localhost:8000
echo   Frontend: http://localhost:5173
echo ════════════════════════════════════════
echo.
echo Открываю сайт в браузере...
start http://localhost:5173
echo.
echo Нажмите любую клавишу для возврата в меню...
pause >nul
goto menu

:stop
cls
echo ════════════════════════════════════════
echo 🛑 Остановка сайта...
echo ════════════════════════════════════════
echo.
echo Останавливаю Backend (Django)...
taskkill /F /FI "WINDOWTITLE eq EcoShop Backend*" 2>nul
echo.
echo Останавливаю Frontend (React)...
taskkill /F /FI "WINDOWTITLE eq EcoShop Frontend*" 2>nul
echo.
echo ✓ Сайт остановлен
echo.
pause
goto menu

:status
cls
echo ════════════════════════════════════════
echo 📊 Статус сайта
echo ════════════════════════════════════════
echo.
tasklist /FI "IMAGENAME eq python.exe" | find "python.exe" >nul
if %errorlevel%==0 (
    echo ✓ Статус: ЗАПУЩЕН
    echo.
    netstat -ano | findstr :8000
) else (
    echo ✗ Статус: ОСТАНОВЛЕН
)
echo.
pause
goto menu

:restart
cls
echo ════════════════════════════════════════
echo 🔄 Перезапуск сайта...
echo ════════════════════════════════════════
echo.
call :stop
timeout /t 2 /nobreak >nul
call :start
goto menu

:migrate
cls
echo ════════════════════════════════════════
echo 🗄️  Применение миграций...
echo ════════════════════════════════════════
echo.
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)
python manage.py makemigrations
python manage.py migrate
echo.
echo ✓ Миграции применены
pause
goto menu

:superuser
cls
echo ════════════════════════════════════════
echo 👤 Создание суперпользователя
echo ════════════════════════════════════════
echo.
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)
set /p username="Введите имя пользователя: "
python manage.py make_superuser %username%
echo.
pause
goto menu

:collectstatic
cls
echo ════════════════════════════════════════
echo 📦 Сбор статических файлов...
echo ════════════════════════════════════════
echo.
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)
python manage.py collectstatic --noinput
echo.
echo ✓ Статические файлы собраны
pause
goto menu

:clearcache
cls
echo ════════════════════════════════════════
echo 🧹 Очистка кэша...
echo ════════════════════════════════════════
echo.
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
)
python manage.py clear_cache 2>nul
if %errorlevel%==0 (
    echo ✓ Кэш очищен
) else (
    echo ⚠ Команда clear_cache не найдена
)
echo.
REM Очистка __pycache__
for /d /r . %%d in (__pycache__) do @if exist "%%d" rd /s /q "%%d"
echo ✓ __pycache__ директории удалены
echo.
pause
goto menu

:logs
cls
echo ════════════════════════════════════════
echo 📝 Последние логи
echo ════════════════════════════════════════
echo.
if exist "logs\django.log" (
    type logs\django.log | more
) else (
    echo ⚠ Файл логов не найден
)
echo.
pause
goto menu

:exit
cls
echo.
echo Спасибо за использование EcoShop Site Manager!
echo.
timeout /t 2 /nobreak >nul
goto deploy
exit
:deploy
cls
echo ════════════════════════════════════════
echo 🚢 Выгрузка на Render.com...
echo ════════════════════════════════════════
echo.

echo Добавление изменений...
git add .
if %errorlevel% neq 0 (
    echo ❌ Ошибка при добавлении файлов
    pause
    goto menu
)

echo.
set /p COMMIT_MSG="Введите описание изменений (или Enter для 'Update'): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG=Update

echo.
echo Создание коммита...
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo ⚠ Нет изменений для коммита
    pause
    goto menu
)

echo.
echo Загрузка на GitHub (Render автоматически задеплоит)...
git push origin main
if %errorlevel% neq 0 (
    echo ❌ Ошибка при загрузке на GitHub
    pause
    goto menu
)

echo.
echo ════════════════════════════════════════
echo   ✓ УСПЕШНО ОБНОВЛЕНО!
echo ════════════════════════════════════════
echo.
echo Render автоматически задеплоит изменения
echo Подождите 2-3 минуты и обновите страницу
echo.
pause
goto menu
