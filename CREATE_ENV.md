# 📝 Создание .env.local файла

## Быстрая инструкция:

### 1. В терминале выполни:

```bash
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://lqgurdhcxzjchudxuuts.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxZ3VyZGhjeHpqY2h1ZHh1dXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2OTEzMTcsImV4cCI6MjA4MDI2NzMxN30.bS0tS4ODfJNXKLAePTIaYkB4NnXmNyUOl0VMiV1B7KE
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres"
EOF
```

### 2. Получи пароль из Supabase:

1. Зайди на https://supabase.com/dashboard
2. Выбери проект: **lqgurdhcxzjchudxuuts**
3. **Project Settings** → **Database**
4. Найди секцию **Connection string**
5. Выбери вкладку **URI** (не connection pooling!)
6. Скопируй строку - она будет такой:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-xx-x.pooler.supabase.com:6543/postgres
   ```
   ИЛИ
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres
   ```

7. Замени `[YOUR-PASSWORD]` в `.env.local` на реальный пароль

### 3. Альтернативный способ - через Table Editor:

Если не помнишь пароль:
1. Зайди в **Supabase Dashboard** → **Table Editor**
2. Если видишь таблицы - значит подключение работает
3. Иди в **Project Settings** → **Database** → **Connection string** → **URI**
4. Скопируй полную строку и вставь как `DATABASE_URL` в `.env.local`

### 4. После создания .env.local:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

---

## Проверка:

```bash
# Проверь, что файл создан:
cat .env.local
```

