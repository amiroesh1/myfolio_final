import { NextResponse } from 'next/server';
import activities from '../../data/activities.json';

// Config for static export
export const dynamic = 'force-static';
export const revalidate = 0; // Set to 0 instead of false

export async function GET() {
  return NextResponse.json(activities);
}
