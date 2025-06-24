import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

// Function to generate a slug from a title
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const programsCollection = db.collection('programs');

    const programData = await request.json();
    const { title, category, dateStart, dateEnd, description, images } = programData;

    if (!title || !category || !dateStart || !description) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const slug = generateSlug(title);

    const newProgram = {
      title,
      slug,
      category,
      dateStart: new Date(dateStart),
      dateEnd: dateEnd ? new Date(dateEnd) : null,
      description,
      images: images || [], // Default to an empty array if not provided
      createdAt: new Date(),
    };

    const result = await programsCollection.insertOne(newProgram);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ message: 'Error creating program', error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const programsCollection = db.collection('programs');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    const slug = searchParams.get('slug');

    // If a slug is provided, fetch a single program
    if (slug) {
      const program = await programsCollection.findOne({ slug });
      if (program) {
        return NextResponse.json(program, { status: 200 });
      }
      // We don't return 404 here to allow fallback to static data on the frontend
    }
    
    const query: any = {};
    if (category) {
      query.category = category;
    }
    if (year) {
      // Query for events within the given year
      const yearNum = parseInt(year, 10);
      query.dateStart = {
        $gte: new Date(yearNum, 0, 1),
        $lt: new Date(yearNum + 1, 0, 1),
      };
    }

    const programs = await programsCollection.find(query).sort({ dateStart: -1 }).toArray();

    return NextResponse.json(programs, { status: 200 });
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ message: 'Error fetching programs', error }, { status: 500 });
  }
} 