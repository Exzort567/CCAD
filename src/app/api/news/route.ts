import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const news = await db.collection('news').find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const data = await request.json();
    if (data.description && data.description.length > 254) {
      return NextResponse.json({ error: 'Description cannot exceed 254 characters.' }, { status: 400 });
    }
    const result = await db.collection('news').insertOne(data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const { id, ...data } = await request.json();
        if (data.description && data.description.length > 254) {
            return NextResponse.json({ error: 'Description cannot exceed 254 characters.' }, { status: 400 });
        }
        const result = await db.collection('news').updateOne({ _id: new ObjectId(id) }, { $set: data });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const result = await db.collection('news').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 