import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/supabase/test-connection
export async function GET(_req: NextRequest) {
  try {
    // Простая проверка подключения к базе данных
    await prisma.$queryRaw`SELECT 1`;
    
    // Попробуем получить количество историй
    const count = await prisma.story.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      storiesCount: count,
      database: process.env.DATABASE_URL
        ? 'Connected (URL exists)'
        : 'Not connected (DATABASE_URL missing)',
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        database: process.env.DATABASE_URL
          ? 'Connection string exists but connection failed'
          : 'DATABASE_URL not found in .env file',
        hint: 'Make sure you have created .env file with DATABASE_URL from Supabase',
      },
      { status: 500 },
    );
  }
}

