import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export const dynamic = 'force-dynamic';

const generateSlug = (title: string) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

const categoryMapping: { [key: string]: string } = {
  'artistic-development': 'Artistic Development Programs - 7 Forms of Art',
  'creative-industry': 'Creative Industry',
  'culture-governance': 'Culture and Governance',
  'heritage-programs': 'Cultural Heritage Programs',
  'development-programs': 'Culture and Development Programs',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const id = searchParams.get('id');

    const client = await clientPromise;
    const db = client.db('ccad');
    
    if (id) {
      if (!ObjectId.isValid(id)) {
        return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
      }
      const program = await db.collection('programs').findOne({ _id: new ObjectId(id) });
      if (!program) {
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }
      const formattedProgram = {
        ...program,
        slug: program.slug || generateSlug(program.title),
        images: program.image ? [program.image] : program.images || [],
      };
      return NextResponse.json(formattedProgram);
    }

    let query: any = {};
    if (category && categoryMapping[category]) {
      query.category = categoryMapping[category];
    } else if (category) {
      query.category = decodeURIComponent(category);
    }
    if (year) {
      const startDate = new Date(parseInt(year), 0, 1);
      const endDate = new Date(parseInt(year), 11, 31, 23, 59, 59);
      query.dateStart = { $gte: startDate.toISOString().split('T')[0], $lte: endDate.toISOString().split('T')[0] };
    }

    const programs = await db.collection('programs').find(query).sort({ dateStart: -1 }).toArray();

    const formattedPrograms = programs.map(program => ({
      ...program,
      slug: program.slug || generateSlug(program.title),
      images: program.image ? [program.image] : program.images || [],
    }));
    
    return NextResponse.json(formattedPrograms);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
    try {
        const client = await clientPromise;
        const db = client.db('ccad');
        const data = await request.json();
        if (data.description && data.description.length > 255) {
            return NextResponse.json({ error: 'Description cannot exceed 255 characters.' }, { status: 400 });
        }
        const result = await db.collection('programs').insertOne(data);
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
        if (data.description && data.description.length > 255) {
            return NextResponse.json({ error: 'Description cannot exceed 255 characters.' }, { status: 400 });
        }
        const result = await db.collection('programs').updateOne({ _id: new ObjectId(id) }, { $set: data });
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
        const result = await db.collection('programs').deleteOne({ _id: new ObjectId(id) });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 