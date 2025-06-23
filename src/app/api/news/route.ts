import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const news = await db.collection('news').find({}).toArray();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
} 