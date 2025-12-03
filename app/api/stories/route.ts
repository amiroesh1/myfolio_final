import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const STORIES_FILE = path.join(process.cwd(), 'app', 'data', 'stories.json');

type Story = {
  id: string;
  name: string;
  date: string;
  link?: string | null;
  summary?: string | null;
  coverImage?: string | null;
  sections?: Array<{
    title: string;
    content: string;
    imageUrl?: string | null;
  }>;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
};

async function readStories(): Promise<Story[]> {
  try {
    const data = await fs.readFile(STORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeStories(stories: Story[]) {
  await fs.writeFile(STORIES_FILE, JSON.stringify(stories, null, 2), 'utf-8');
}

// GET /api/stories?status=APPROVED|PENDING|REJECTED&limit=number
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') ?? undefined;
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    let stories = await readStories();

    // Фильтруем по статусу если указан
    if (status && ['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      stories = stories.filter((s) => s.status === status);
    }

    // Сортируем по дате создания (новые сначала)
    stories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Ограничиваем количество
    const limited = stories.slice(0, limit);

    return NextResponse.json(limited);
  } catch (error: any) {
    console.error('Failed to read stories', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/stories
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, date, link, sections } = body;

    if (!name || !date || !sections || sections.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 },
      );
    }

    const cleanedSections = sections.map((section: any) => ({
      title: section.title?.trim() || 'Untitled section',
      content: section.content?.trim() || '',
      imageUrl: section.imageUrl?.trim() || null,
    }));

    const summary = cleanedSections[0]?.content?.slice(0, 500) || null;

    const newStory: Story = {
      id: `story-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      date: parsedDate.toISOString(),
      link: link || null,
      summary,
      sections: cleanedSections,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const stories = await readStories();
    stories.push(newStory);
    await writeStories(stories);

    return NextResponse.json(newStory, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create story', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


