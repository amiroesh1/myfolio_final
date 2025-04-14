import { NextResponse } from 'next/server';
import activities from '../../data/activities.json';

// Add static configuration
export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return NextResponse.json(activities);
}
