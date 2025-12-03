import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const STORIES_FILE = path.join(process.cwd(), 'app', 'data', 'stories.json');

async function readStories() {
  try {
    const data = await fs.readFile(STORIES_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// GET /api/stories/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const stories = await readStories();
    const story = stories.find((s: any) => s.id === params.id);

    if (!story) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error: any) {
    console.error('Failed to fetch story', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


