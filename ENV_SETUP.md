# Настройка .env.local файла

## Шаг 1: Создай файл .env.local

В корне проекта создай файл `.env.local` и добавь следующие переменные:

```env
NEXT_PUBLIC_SUPABASE_URL=https://lqgurdhcxzjchudxuuts.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ3VyZGhjeHpqY2h1ZHh1dXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTEzMTcsImV4cCI6MjA4MDI2NzMxN30.bS0tS4ODfJNXKLAePTIaYkB4NnXmNyUOl0VMiV1B7KE
```

## Шаг 2: Добавь DATABASE_URL для Prisma (опционально, если используешь Prisma)

Если хочешь использовать Prisma для работы с базой данных, добавь также:

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres"
```

Чтобы получить этот connection string:
1. Зайди на https://supabase.com/dashboard
2. Выбери проект: lqgurdhcxzjchudxuuts
3. Project Settings → Database
4. Connection string → URI
5. Скопируй и замени [PASSWORD] на реальный пароль

## Готово! ✅

После создания `.env.local`:
- Перезапусти dev сервер: `npm run dev`
- Supabase клиент будет работать через утилиты в `utils/supabase/`

