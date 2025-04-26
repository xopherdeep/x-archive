import { NextResponse } from 'next/server';
import { getActivities } from '@/lib/db';

export async function GET() {
  try {
    const activities = await getActivities();
    
    return NextResponse.json({
      success: true,
      activities
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}