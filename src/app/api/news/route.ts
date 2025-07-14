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

        // Find the news item to get the image URL for deletion
        const newsItem = await db.collection('news').findOne({ _id: new ObjectId(id) });
        
        if (!newsItem) {
            return NextResponse.json({ error: 'News item not found' }, { status: 404 });
        }

        // Delete image from Cloudinary if it exists
        if (newsItem.image && typeof newsItem.image === 'string') {
            const publicId = getPublicIdFromUrl(newsItem.image);
            if (publicId) {
                console.log('Deleting news image from Cloudinary:', publicId);
                await cloudinary.uploader.destroy(publicId);
            }
        }

        // Delete from database
        const result = await db.collection('news').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 