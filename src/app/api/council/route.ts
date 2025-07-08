import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// GET all council members
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const council = await db.collection('council').find({}).sort({ order: 1 }).toArray();
    return NextResponse.json(council);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST a new council member
export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const data = await request.json();
        const result = await db.collection('council').insertOne(data);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

// PUT to update a council member
export async function PUT(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const { id, ...data } = await request.json();
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const result = await db.collection('council').updateOne({ _id: new ObjectId(id) }, { $set: data });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

// DELETE a council member
export async function DELETE(request: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }
        const result = await db.collection('council').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 