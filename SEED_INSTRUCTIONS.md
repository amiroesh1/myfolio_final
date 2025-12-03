# Инструкция: Как добавить историю Aziz в базу данных

## Шаг 1: Убедись, что у тебя настроена база данных

В файле `.env` в корне проекта должна быть строка:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME?schema=public"
```

Если используешь **Supabase**:
1. Зайди в Supabase → Project Settings → Database
2. Скопируй `Connection string` (URI формат)
3. Вставь в `.env` как `DATABASE_URL`

## Шаг 2: Установи зависимости (если еще не установлены)

```bash
npm install
```

## Шаг 3: Запусти миграции Prisma (если еще не запускал)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Это создаст таблицу `Story` в твоей БД.

## Шаг 4: Добавь историю Aziz в базу данных

Запусти seed-скрипт:

```bash
npx prisma db seed
```

Или если это не работает, попробуй:

```bash
npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
```

История Aziz будет добавлена в базу данных со статусом **APPROVED**, так что она сразу появится:
- На странице `/section` (в списке справа)
- Во вкладке **Stories** в Dashboard
- На главной странице `about` (в блоке Latest student stories)

## Шаг 5: Проверь результат

1. Открой `http://localhost:3000/section` — история Aziz должна быть в списке справа
2. Открой `http://localhost:3000/dashboard?tab=stories` — история должна быть там тоже

---

## Как добавлять новые истории в будущем

### Вариант 1: Через форму на сайте (рекомендуется)

1. Пользователь заходит на `/section`
2. Заполняет форму и отправляет историю
3. История попадает в БД со статусом `PENDING`
4. Ты заходишь на `/admin/stories` (нужен логин через Clerk)
5. Видишь все pending-истории и можешь их **Approve** или **Reject**

### Вариант 2: Через seed-скрипт (для массового добавления)

1. Отредактируй файл `prisma/seed.ts`
2. Добавь новые истории в том же формате
3. Запусти `npx prisma db seed`

### Вариант 3: Через Prisma Studio (для ручного редактирования)

```bash
npx prisma studio
```

Откроется веб-интерфейс, где ты можешь:
- Просматривать все истории
- Редактировать поля
- Менять статус (PENDING → APPROVED)
- Добавлять новые записи

---

## Где хранятся данные Stories

Все истории хранятся в **PostgreSQL** (или Supabase Postgres) в таблице `Story`:
- `id` — уникальный идентификатор
- `name` — имя автора
- `date` — дата истории
- `link` — опциональная ссылка
- `summary` — краткое описание (для карточек)
- `sections` — JSON массив с секциями истории (title, content, imageUrl)
- `status` — PENDING / APPROVED / REJECTED
- `createdAt` / `updatedAt` — даты создания и обновления

---

## Как аппрувить истории через админ-панель

1. Зайди на `http://localhost:3000/admin/stories`
2. Войди через Clerk (если не залогинен)
3. Увидишь список всех историй со статусом `PENDING`
4. Нажми **Approve** на истории, которую хочешь опубликовать
5. История сразу появится на публичных страницах

---

## Полезные команды

```bash
# Просмотр данных через Prisma Studio
npx prisma studio

# Запуск миграций
npx prisma migrate dev

# Генерация Prisma Client
npx prisma generate

# Сброс базы данных (ОСТОРОЖНО: удалит все данные!)
npx prisma migrate reset
```

