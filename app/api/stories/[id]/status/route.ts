import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { auth } from '@clerk/nextjs/server';

// Простая проверка админа (можно вынести в отдельный файл)
function isAdmin(userId: string | null | undefined): boolean {
  if (!userId) return false;
  
  // Проверка по списку из env
  const adminIds = (process.env.ADMIN_USER_IDS || '').split(',').filter(Boolean);
  
  if (adminIds.length > 0) {
    return adminIds.includes(userId);
  }
  
  // Если ADMIN_USER_IDS не настроен, разрешаем всем залогиненным (для разработки)
  // В продакшене это нужно убрать!
  console.warn('⚠️ ADMIN_USER_IDS not configured - allowing all authenticated users');
  return true;
}

const STORIES_FILE = path.join(process.cwd(), 'app', 'data', 'stories.json');

async function readStories() {
  try {
    const data = await fs.readFile(STORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeStories(stories: any[]) {
  await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2), 'utf-8');
}

// PATCH /api/stories/[id]/status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized - Please sign in' }, { status: 401 });
  }

  // Проверка прав администратора
  if (!isAdmin(userId)) {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { status, summary, sections, coverImage } = body;

    if (!status || !['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid or missing status' },
        { status: 400 },
      );
    }

    const stories = await readStories();
    const storyIndex = stories.findIndex((s: any) => s.id === params.id);

    if (storyIndex === -1) {
      return NextResponse.json({ error: 'Story not found' }, { status: 404 });
    }

    // Обновляем статус и опционально контент
    const updatedStory: any = {
      ...stories[storyIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    if (summary !== undefined) {
      updatedStory.summary = summary;
    }

    if (sections !== undefined && Array.isArray(sections)) {
      const cleanedSections = sections.map((section: any) => ({
        title: section.title?.trim() || 'Untitled section',
        content: section.content?.trim() || '',
        imageUrl: section.imageUrl?.trim() || null,
      }));
      updatedStory.sections = cleanedSections;
      
      // Если summary не передан, но есть sections, обновляем summary из первого section
      if (summary === undefined && cleanedSections.length > 0) {
        updatedStory.summary = cleanedSections[0]?.content?.slice(0, 500) || null;
      }
    }

    if (coverImage !== undefined) {
      updatedStory.coverImage = coverImage?.trim() || null;
    }

    stories[storyIndex] = updatedStory;
    await writeStories(stories);

    console.log(`✅ Story ${params.id} status updated to ${status} by user ${userId}`);
    return NextResponse.json(updatedStory);
  } catch (error: any) {
    console.error('❌ Failed to update story status', error);
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}


