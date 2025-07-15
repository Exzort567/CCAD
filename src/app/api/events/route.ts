import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

export const dynamic = 'force-dynamic';

const getPublicIdFromUrl = (url: string) => {
  try {
    const regex = /\/image\/upload\/(?:v\d+\/)?(.+?)(\.\w+)?$/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  } catch (e) {
    console.error("Failed to parse public ID from URL:", url, e);
  }
  return null;
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const events = await db.collection('events').find({}).sort({ date: -1 }).toArray();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const data = await request.json();
        if (data.description && data.description.length > 5000) {
            return NextResponse.json({ error: 'Description cannot exceed 5000 characters.' }, { status: 400 });
        }
        const result = await db.collection('events').insertOne(data);
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
        if (data.description && data.description.length > 5000) {
            return NextResponse.json({ error: 'Description cannot exceed 5000 characters.' }, { status: 400 });
        }
        const result = await db.collection('events').updateOne({ _id: new ObjectId(id) }, { $set: data });
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

        // Find the event to get the image URL for deletion
        const event = await db.collection('events').findOne({ _id: new ObjectId(id) });
        
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Delete image from Cloudinary if it exists
        if (event.image && typeof event.image === 'string') {
            const publicId = getPublicIdFromUrl(event.image);
            if (publicId) {
                console.log('Deleting event image from Cloudinary:', publicId);
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Delete from database
        const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}