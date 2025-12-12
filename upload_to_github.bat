@echo off
chcp 65001 >nul
title EcoShop - GitHub Upload Tool
color 0A

cls
echo ╔════════════════════════════════════════════════╗
echo ║     EcoShop - GitHub Upload Tool v1.0         ║
echo ╚════════════════════════════════════════════════╝
echo.
echo Этот скрипт загрузит ваш сайт на GitHub
echo.

REM Проверка наличия Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git не установлен!
    echo.
    echo Скачайте Git с https://git-scm.com/download/win
    echo После установки перезапустите этот скрипт
    pause
    exit
)

echo ✓ Git установлен
echo.

REM Запрос данных у пользователя
set /p GITHUB_USERNAME="Введите ваш GitHub username: "
set /p REPO_NAME="Введите название репозитория (например, ecoshop): "

echo.
echo ════════════════════════════════════════════════
echo   Инициализация Git репозитория...
echo ════════════════════════════════════════════════
echo.

REM Проверка существования .git
if exist ".git" (
    echo ⚠ Git репозиторий уже инициализирован
    set /p REINIT="Переинициализировать? (y/n): "
    if /i "%REINIT%"=="y" (
        rd /s /q .git
        git init
        echo ✓ Репозиторий переинициализирован
    )
) else (
    git init
    echo ✓ Git репозиторий инициализирован
)

echo.
echo ════════════════════════════════════════════════
echo   Настройка Git...
echo ════════════════════════════════════════════════
echo.

REM Настройка Git (если не настроен)
git config user.name >nul 2>nul
if %errorlevel% neq 0 (
    set /p GIT_NAME="Введите ваше имя для Git: "
    git config user.name "!GIT_NAME!"
)

git config user.email >nul 2>nul
if %errorlevel% neq 0 (
    set /p GIT_EMAIL="Введите ваш email для Git: "
    git config user.email "!GIT_EMAIL!"
)

echo ✓ Git настроен
echo.

echo ════════════════════════════════════════════════
echo   Добавление файлов...
echo ════════════════════════════════════════════════
echo.

git add .
echo ✓ Все файлы добавлены
echo.

echo ════════════════════════════════════════════════
echo   Создание коммита...
echo ════════════════════════════════════════════════
echo.

git commit -m "Initial commit - EcoShop ready for Railway deployment"
if %errorlevel% neq 0 (
    echo ⚠ Нет изменений для коммита или ошибка
) else (
    echo ✓ Коммит создан
)
echo.

echo ════════════════════════════════════════════════
echo   Настройка удаленного репозитория...
echo ════════════════════════════════════════════════
echo.

REM Удаление старого origin если есть
git remote remove origin >nul 2>nul

REM Добавление нового origin
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git
echo ✓ Удаленный репозиторий настроен
echo   URL: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

echo ════════════════════════════════════════════════
echo   Переименование ветки в main...
echo ════════════════════════════════════════════════
echo.

git branch -M main
echo ✓ Ветка переименована в main
echo.

echo ════════════════════════════════════════════════
echo   Загрузка на GitHub...
echo ════════════════════════════════════════════════
echo.
echo ⚠ ВАЖНО: Сейчас откроется окно для ввода пароля GitHub
echo.
echo Если у вас включена двухфакторная аутентификация:
echo 1. Зайдите на https://github.com/settings/tokens
echo 2. Создайте Personal Access Token
echo 3. Используйте токен вместо пароля
echo.
pause

git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo ❌ Ошибка при загрузке!
    echo.
    echo Возможные причины:
    echo 1. Репозиторий не существует на GitHub
    echo 2. Неверные учетные данные
    echo 3. Нет прав доступа
    echo.
    echo Что делать:
    echo 1. Создайте репозиторий на GitHub: https://github.com/new
    echo 2. Название: %REPO_NAME%
    echo 3. Оставьте пустым (не добавляйте README)
    echo 4. Перезапустите этот скрипт
    echo.
    pause
    exit
)

echo.
echo ════════════════════════════════════════════════
echo   ✓ УСПЕШНО ЗАГРУЖЕНО!
echo ════════════════════════════════════════════════
echo.
echo Ваш код загружен на GitHub:
echo https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.
echo ════════════════════════════════════════════════
echo   Следующие шаги:
echo ════════════════════════════════════════════════
echo.
echo 1. Зайдите на https://railway.app
echo 2. Login with GitHub
echo 3. New Project → Deploy from GitHub repo
echo 4. Выберите репозиторий: %REPO_NAME%
echo 5. Добавьте PostgreSQL базу данных
echo 6. Настройте переменные окружения
echo 7. Получите URL вашего сайта!
echo.
echo Полная инструкция: RAILWAY_DEPLOY.md
echo.
pause
