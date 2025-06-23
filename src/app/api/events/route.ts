import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('EVENTS API: Connecting to database...');
    const client = await clientPromise;
    const db = client.db('ccad');
    console.log('EVENTS API: Fetching documents from "events" collection...');
    const events = await db.collection('events').find({}).toArray();
    console.log('EVENTS API: Found events:', JSON.stringify(events, null, 2));
    return NextResponse.json(events);
  } catch (error) {
    console.error('EVENTS API ERROR:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 