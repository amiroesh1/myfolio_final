import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/stories/debug - для отладки, показывает все истории
export async function GET(_req: NextRequest) {
  try {
    const allStories = await prisma.story.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const storiesWithParsedSections = allStories.map((story) => {
      let sections = story.sections;
      if (typeof sections === 'string') {
        try {
          sections = JSON.parse(sections);
        } catch {
          sections = [];
        }
      }

      return {
        ...story,
        sections,
      };
    });

    return NextResponse.json({
      total: allStories.length,
      approved: allStories.filter((s) => s.status === 'APPROVED').length,
      pending: allStories.filter((s) => s.status === 'PENDING').length,
      rejected: allStories.filter((s) => s.status === 'REJECTED').length,
      stories: storiesWithParsedSections,
    });
  } catch (error) {
    console.error('Failed to fetch stories for debug', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 },
    );
  }
}

