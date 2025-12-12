# 🚀 Railway.app Deployment Guide - EcoShop

## Шаг 1: Подготовка Проекта ✅

Я уже создал все необходимые файлы:
- ✅ `Procfile` - команда запуска
- ✅ `railway.json` - конфигурация Railway
- ✅ `runtime.txt` - версия Python

## Шаг 2: Обновить Requirements

Выполните в терминале:
```bash
pip install gunicorn psycopg2-binary dj-database-url whitenoise
pip freeze > requirements.txt
```

## Шаг 3: Загрузить на GitHub

```bash
git init
git add .
git commit -m "Initial commit for Railway deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecoshop.git
git push -u origin main
```

**Если у вас нет GitHub репозитория:**
1. Зайти на [github.com](https://github.com)
2. Создать новый репозиторий "ecoshop"
3. Скопировать URL репозитория
4. Выполнить команды выше

## Шаг 4: Деплой на Railway

### 4.1 Регистрация
1. Зайти на [railway.app](https://railway.app)
2. Нажать "Login" → "Login with GitHub"
3. Авторизовать Railway

### 4.2 Создание Проекта
1. Нажать "New Project"
2. Выбрать "Deploy from GitHub repo"
3. Выбрать репозиторий "ecoshop"
4. Railway начнет автоматический деплой

### 4.3 Добавить PostgreSQL
1. В проекте нажать "+ New"
2. Выбрать "Database" → "Add PostgreSQL"
3. База данных создастся автоматически

### 4.4 Настроить Переменные Окружения
1. Открыть ваш сервис (не базу данных)
2. Перейти в "Variables"
3. Добавить переменные:

```env
SECRET_KEY=django-insecure-GENERATE-NEW-KEY-HERE
DEBUG=False
ALLOWED_HOSTS=*.railway.app
CORS_ALLOWED_ORIGINS=https://your-app.railway.app
```

**Генерация SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4.5 Подключить Базу Данных
Railway автоматически создаст переменную `DATABASE_URL`.
Убедитесь, что в `settings.py` есть:

```python
import dj_database_url

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )
}
```

## Шаг 5: Создать Суперпользователя

После успешного деплоя:
1. В Railway перейти в "Deployments"
2. Найти последний успешный деплой
3. Нажать на три точки → "View Logs"
4. Или использовать Railway CLI:

```bash
# Установить Railway CLI
npm i -g @railway/cli

# Войти
railway login

# Подключиться к проекту
railway link

# Выполнить команду
railway run python manage.py make_superuser admin
```

## Шаг 6: Получить URL

1. В Railway откройте ваш сервис
2. Перейти в "Settings"
3. Найти "Domains"
4. Нажать "Generate Domain"
5. Получите URL вида: `https://ecoshop-production.up.railway.app`

## Шаг 7: Проверка

Откройте ваш URL:
- `https://your-app.railway.app/` - API root
- `https://your-app.railway.app/admin/` - Админ панель
- `https://your-app.railway.app/api/products/` - API товаров

## 🎉 Готово!

Ваш сайт теперь доступен всем 24/7!

---

## Обновление Сайта

После изменений в коде:
```bash
git add .
git commit -m "Update"
git push
```

Railway автоматически задеплоит новую версию!

---

## Troubleshooting

### Ошибка при деплое
- Проверьте логи в Railway
- Убедитесь, что все зависимости в `requirements.txt`
- Проверьте переменные окружения

### База данных не работает
- Убедитесь, что `DATABASE_URL` установлена
- Проверьте, что `psycopg2-binary` в requirements.txt

### Статические файлы не загружаются
- Убедитесь, что `whitenoise` установлен
- Проверьте `STATIC_ROOT` в settings.py

---

## Полезные Ссылки

- [Railway Docs](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Django on Railway](https://docs.railway.app/guides/django)
