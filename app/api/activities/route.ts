import { NextResponse } from 'next/server';
import activities from '../../data/activities.json';

export async function GET() {
  return NextResponse.json(activities);
}
