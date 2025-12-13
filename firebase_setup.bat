@echo off
chcp 65001 >nul
title Firebase Setup - First Time Only
color 0E

cls
echo ╔════════════════════════════════════════╗
echo ║   Firebase Setup - First Time Only    ║
echo ╚════════════════════════════════════════╝
echo.

echo 📋 ИНСТРУКЦИЯ ПО НАСТРОЙКЕ FIREBASE
echo ════════════════════════════════════════
echo.
echo Этот скрипт нужно запустить ОДИН РАЗ для первоначальной настройки.
echo.
echo Что будет сделано:
echo   1. Установка Firebase CLI (если не установлен)
echo   2. Вход в аккаунт Google
echo   3. Инициализация проекта Firebase
echo.
pause

REM Check if Firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo 📦 Шаг 1: Установка Firebase CLI
    echo ════════════════════════════════════════
    call npm install -g firebase-tools
    if %errorlevel% neq 0 (
        echo ❌ Ошибка установки Firebase CLI
        echo.
        echo Попробуйте установить вручную:
        echo npm install -g firebase-tools
        pause
        exit /b 1
    )
    echo ✅ Firebase CLI установлен
) else (
    echo ✅ Firebase CLI уже установлен
)

echo.
echo 🔐 Шаг 2: Вход в Firebase
echo ════════════════════════════════════════
echo.
echo Сейчас откроется браузер для входа в Google аккаунт.
echo Выберите аккаунт и разрешите доступ.
echo.
pause

firebase login
if %errorlevel% neq 0 (
    echo ❌ Ошибка входа в Firebase
    pause
    exit /b 1
)

echo.
echo ✅ Вход выполнен успешно
echo.

echo 🏗️ Шаг 3: Создание проекта Firebase
echo ════════════════════════════════════════
echo.
echo ВАЖНО! Сейчас нужно:
echo   1. Перейти на https://console.firebase.google.com/
echo   2. Нажать "Add project" (Добавить проект)
echo   3. Название проекта: ecoshop (или любое другое)
echo   4. Отключить Google Analytics (не обязательно)
echo   5. Создать проект
echo.
echo После создания проекта скопируйте ID проекта
echo (например: ecoshop-12345)
echo.
pause

set /p PROJECT_ID="Введите ID проекта Firebase: "

if "%PROJECT_ID%"=="" (
    echo ❌ ID проекта не может быть пустым
    pause
    exit /b 1
)

echo.
echo 🔗 Шаг 4: Связывание с проектом
echo ════════════════════════════════════════
firebase use --add %PROJECT_ID%
if %errorlevel% neq 0 (
    echo ❌ Ошибка связывания с проектом
    echo.
    echo Проверьте:
    echo   - Правильность ID проекта
    echo   - Что проект создан в Firebase Console
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════
echo   ✅ НАСТРОЙКА ЗАВЕРШЕНА!
echo ════════════════════════════════════════
echo.
echo Теперь вы можете использовать:
echo   deploy_firebase.bat - для деплоя сайта
echo.
echo Ваш проект: %PROJECT_ID%
echo URL будет: https://%PROJECT_ID%.web.app
echo.
pause
