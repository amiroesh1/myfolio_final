import { NextResponse } from 'next/server';
import activities from '../../data/activities.json';

// Add static configuration for Next.js export
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(activities);
}
