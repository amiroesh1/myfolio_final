import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// GET /api/supabase/test - проверка подключения к Supabase
export async function GET(_req: NextRequest) {
  try {
    // Проверяем наличие переменных окружения
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing environment variables',
          details: {
            hasUrl: !!supabaseUrl,
            hasKey: !!supabaseKey,
          },
          message:
            'Создай файл .env.local и добавь NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY',
        },
        { status: 500 },
      );
    }

    // Пробуем создать клиент и подключиться
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      // Пробуем сделать простой запрос к базе данных
      const { data, error } = await supabase.from('Story').select('id').limit(1);

      if (error) {
        return NextResponse.json(
          {
            success: false,
            error: 'Database connection failed',
            details: error.message,
            hint: error.message.includes('relation')
              ? 'Таблица Story не существует. Запусти миграции: npx prisma migrate dev'
              : error.message.includes('JWT')
              ? 'Неправильный API ключ. Проверь NEXT_PUBLIC_SUPABASE_ANON_KEY'
              : 'Проверь настройки базы данных в Supabase Dashboard',
          },
          { status: 500 },
        );
      }

      // Если всё ок
      return NextResponse.json({
        success: true,
        message: '✅ Supabase подключен успешно!',
        details: {
          url: supabaseUrl,
          storiesCount: data?.length || 0,
          connection: 'OK',
        },
      });
    } catch (supabaseError: any) {
      return NextResponse.json(
        {
          success: false,
          error: 'Supabase client error',
          details: supabaseError.message,
          hint: 'Проверь, что пакеты установлены: npm install',
        },
        { status: 500 },
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected error',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 },
    );
  }
}
