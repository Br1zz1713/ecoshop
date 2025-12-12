# 📤 GitHub Upload Tool - Инструкция

## Что Делает Этот Скрипт

`upload_to_github.bat` автоматически:
1. ✅ Инициализирует Git репозиторий
2. ✅ Настраивает Git (имя, email)
3. ✅ Добавляет все файлы проекта
4. ✅ Создает коммит
5. ✅ Подключает GitHub репозиторий
6. ✅ Загружает код на GitHub

---

## Подготовка

### 1. Установить Git (если не установлен)
Скачать с: https://git-scm.com/download/win

### 2. Создать GitHub Репозиторий
1. Зайти на https://github.com/new
2. Repository name: `ecoshop` (или любое другое)
3. **НЕ ДОБАВЛЯЙТЕ** README, .gitignore, license
4. Нажать "Create repository"
5. Скопировать название репозитория

---

## Использование

### Запуск:
Двойной клик по файлу `upload_to_github.bat`

### Скрипт спросит:
1. **GitHub username** - ваш логин на GitHub
2. **Название репозитория** - название созданного репозитория
3. **Имя для Git** - ваше имя (если не настроено)
4. **Email для Git** - ваш email (если не настроено)

### Аутентификация:
При загрузке Git попросит логин и пароль:
- **Логин:** ваш GitHub username
- **Пароль:** 
  - Если нет 2FA: ваш пароль GitHub
  - Если есть 2FA: Personal Access Token

---

## Personal Access Token (для 2FA)

Если у вас включена двухфакторная аутентификация:

1. Зайти на https://github.com/settings/tokens
2. "Generate new token" → "Generate new token (classic)"
3. Note: `EcoShop Upload`
4. Expiration: `No expiration` (или выбрать срок)
5. Scopes: отметить `repo` (все подпункты)
6. "Generate token"
7. **СКОПИРОВАТЬ ТОКЕН** (показывается только один раз!)
8. Использовать токен вместо пароля при загрузке

---

## Что Если Ошибка?

### "Repository not found"
**Причина:** Репозиторий не существует на GitHub  
**Решение:** Создать репозиторий на GitHub с таким же названием

### "Authentication failed"
**Причина:** Неверный логин/пароль  
**Решение:** 
- Проверить логин и пароль
- Если есть 2FA - использовать Personal Access Token

### "Permission denied"
**Причина:** Нет прав доступа к репозиторию  
**Решение:** Убедиться, что репозиторий принадлежит вам

---

## После Успешной Загрузки

Ваш код будет доступен на:
`https://github.com/YOUR_USERNAME/REPO_NAME`

### Следующие шаги:
1. Зайти на https://railway.app
2. Login with GitHub
3. New Project → Deploy from GitHub repo
4. Выбрать ваш репозиторий
5. Railway автоматически задеплоит сайт!

---

## Обновление Кода

После изменений в проекте:

```bash
git add .
git commit -m "Update"
git push
```

Или перезапустить `upload_to_github.bat`

---

## Альтернатива: Ручная Загрузка

Если скрипт не работает, используйте команды вручную:

```bash
# 1. Инициализация
git init

# 2. Настройка
git config user.name "Your Name"
git config user.email "your@email.com"

# 3. Добавление файлов
git add .

# 4. Коммит
git commit -m "Initial commit"

# 5. Подключение GitHub
git remote add origin https://github.com/USERNAME/REPO.git

# 6. Загрузка
git branch -M main
git push -u origin main
```
