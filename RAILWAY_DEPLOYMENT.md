# Railway Deployment Guide for EcoShop Backend

## 🚂 Railway.app - Бесплатный Backend Хостинг

### Почему Railway?
- ✅ **500 часов/месяц бесплатно** (~20 дней непрерывной работы)
- ✅ **Бесплатная PostgreSQL** база данных
- ✅ **Автоматический деплой** из GitHub
- ✅ **Не требует кредитной карты**
- ✅ **Простая настройка** - определяет Django автоматически

---

## 📋 Пошаговая Инструкция

### Шаг 1: Регистрация на Railway

1. Перейдите на [railway.app](https://railway.app)
2. Нажмите **"Start a New Project"**
3. Войдите через **GitHub**
4. Разрешите доступ к репозиториям

### Шаг 2: Создание Проекта

1. На главной странице нажмите **"New Project"**
2. Выберите **"Deploy from GitHub repo"**
3. Найдите и выберите репозиторий: `Br1zz1713/ecoshop`
4. Railway автоматически определит Django проект

### Шаг 3: Добавление PostgreSQL

1. В проекте нажмите **"+ New"**
2. Выберите **"Database"**
3. Выберите **"Add PostgreSQL"**
4. Railway автоматически создаст базу данных
5. Переменная `DATABASE_URL` будет добавлена автоматически

### Шаг 4: Настройка Environment Variables

В Railway Dashboard → Settings → Variables добавьте:

```
SECRET_KEY=django-insecure-your-secret-key-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=*.railway.app,*.vercel.app
CORS_ALLOWED_ORIGINS=https://ecoshop-frontend.vercel.app
PYTHONUNBUFFERED=1
```

**Как добавить переменные:**
1. Нажмите на сервис backend
2. Перейдите в **Variables**
3. Нажмите **"+ New Variable"**
4. Введите имя и значение
5. Нажмите **"Add"**

### Шаг 5: Настройка Build Command (если нужно)

Railway обычно автоматически определяет команды, но если нужно:

1. Settings → Deploy
2. Build Command: `pip install -r requirements.txt`
3. Start Command: `gunicorn backend.wsgi:application`

### Шаг 6: Деплой

1. Railway автоматически начнет деплой
2. Следите за логами в реальном времени
3. После завершения получите URL: `https://ecoshop-backend-production.up.railway.app`

### Шаг 7: Миграции Базы Данных

После первого деплоя выполните миграции:

1. В Railway Dashboard откройте ваш сервис
2. Перейдите в **Settings**
3. Найдите раздел **Deploy Triggers**
4. Или используйте Railway CLI:

```bash
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

---

## 🔗 Связывание с Vercel Frontend

### Обновите Frontend Config

**Файл:** `frontend/src/config.js`

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://ecoshop-backend-production.up.railway.app';
export default API_URL;
```

### Создайте Environment Variable в Vercel

1. Перейдите в [Vercel Dashboard](https://vercel.com/dashboard)
2. Выберите проект `ecoshop-frontend`
3. Settings → Environment Variables
4. Добавьте:
   - Name: `VITE_API_URL`
   - Value: `https://ecoshop-backend-production.up.railway.app`
   - Environment: Production

### Redeploy Frontend

```bash
vercel --prod
```

---

## 📊 Мониторинг и Логи

### Railway Dashboard:
- **Deployments**: История всех деплоев
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Логи в реальном времени
- **Settings**: Настройки проекта

### Полезные команды Railway CLI:

```bash
# Установка CLI
npm install -g @railway/cli

# Вход
railway login

# Просмотр логов
railway logs

# Выполнение команд
railway run python manage.py migrate
railway run python manage.py createsuperuser

# Открыть проект в браузере
railway open
```

---

## 🎯 Автоматический Деплой

Railway автоматически деплоит при каждом push в GitHub:

1. Сделайте изменения в коде
2. Commit и push в GitHub:
   ```bash
   git add .
   git commit -m "Update backend"
   git push origin main
   ```
3. Railway автоматически задеплоит изменения
4. Следите за процессом в Dashboard

---

## 💰 Бесплатные Лимиты Railway

| Ресурс | Бесплатный Tier |
|--------|----------------|
| **Время работы** | 500 часов/месяц |
| **RAM** | 512 MB |
| **CPU** | Shared |
| **Disk** | 1 GB |
| **PostgreSQL** | 1 GB |
| **Bandwidth** | Unlimited |

**Совет:** 500 часов = ~20 дней. Для экономии можно настроить автоматическое выключение в периоды низкой активности.

---

## ❓ Частые Проблемы

### 1. Ошибка "Application failed to respond"

**Решение:**
- Проверьте, что `gunicorn` в `requirements.txt`
- Убедитесь, что `PORT` переменная используется правильно
- Проверьте логи в Railway Dashboard

### 2. Database connection failed

**Решение:**
- Убедитесь, что PostgreSQL добавлена в проект
- Проверьте, что `DATABASE_URL` в переменных окружения
- Выполните миграции: `railway run python manage.py migrate`

### 3. Static files не загружаются

**Решение:**
- Убедитесь, что `whitenoise` в `requirements.txt`
- Проверьте настройки `STATIC_ROOT` в `settings.py`
- Выполните: `railway run python manage.py collectstatic --noinput`

### 4. CORS ошибки

**Решение:**
- Добавьте домен Vercel в `CORS_ALLOWED_ORIGINS`
- Проверьте `ALLOWED_HOSTS` в `settings.py`
- Убедитесь, что `django-cors-headers` в `MIDDLEWARE`

---

## ✅ Чеклист Успешного Деплоя

- [ ] Railway проект создан
- [ ] PostgreSQL база данных добавлена
- [ ] Environment variables настроены
- [ ] Первый деплой завершен успешно
- [ ] Миграции выполнены
- [ ] Superuser создан
- [ ] API доступен по URL
- [ ] Frontend обновлен с Railway URL
- [ ] CORS настроен правильно
- [ ] Тестовый запрос к API работает

---

## 🌐 Итоговые URL

После настройки у вас будет:

- **Frontend**: `https://ecoshop-frontend.vercel.app`
- **Backend API**: `https://ecoshop-backend-production.up.railway.app`
- **Admin Panel**: `https://ecoshop-backend-production.up.railway.app/admin/`

---

## 📞 Поддержка

- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app/

Удачи с деплоем! 🚀
