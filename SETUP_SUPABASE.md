# Инструкция: Как подключить Supabase к проекту

## Шаг 1: Получи Database Connection String из Supabase

1. Зайди на https://supabase.com/dashboard
2. Выбери проект: `lqgurdhcxzjchudxuuts`
3. Перейди в **Project Settings** (шестеренка в левом нижнем углу)
4. Выбери **Database** в левом меню
5. Прокрути вниз до секции **Connection string**
6. Выбери вкладку **URI** (НЕ connection pooling!)
7. Скопируй строку подключения, она будет выглядеть так:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres
   ```

## Шаг 2: Создай файл .env

В корне проекта создай файл `.env` и добавь:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.lqgurdhcxzjchudxuuts.supabase.co:5432/postgres"
```

⚠️ **Важно:** Замени `[YOUR-PASSWORD]` на реальный пароль из connection string!

## Шаг 3: Запусти миграции Prisma

После создания `.env` файла:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Это создаст таблицу `Story` в твоей Supabase базе данных.

## Шаг 4: Добавь историю в базу данных

После миграций:

```bash
npx prisma db seed
```

Или используй веб-интерфейс:
1. Зайди на `/admin/stories/add-to-supabase`
2. Нажми кнопку "Add Story to Supabase"

## Готово! ✅

После этого:
- База данных подключена к Supabase
- Таблица `Story` создана
- История Aziz добавлена со статусом APPROVED
- История появится на сайте автоматически

---

## Как проверить подключение

Если хочешь проверить, что всё работает:

1. Зайди на `/admin/stories/debug` - увидишь все истории из базы
2. Зайди на `/section` - история должна быть в списке

---

## Если что-то не работает

**Проблема:** "Can't reach database server"
- Проверь, что пароль в DATABASE_URL правильный
- Убедись, что используешь URI формат (не connection pooling)

**Проблема:** "Table does not exist"
- Запусти миграции: `npx prisma migrate dev`

**Проблема:** "Prisma Client not generated"
- Выполни: `npx prisma generate`

