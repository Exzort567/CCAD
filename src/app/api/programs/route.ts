import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const slug = searchParams.get('slug');
    const category = searchParams.get('category');
    const year = searchParams.get('year');

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
        images: (program.images && program.images.length > 0) ? program.images : (program.image ? [program.image] : []),
      };
      return NextResponse.json(formattedProgram);
    }
    
    if (slug) {
      const program = await db.collection('programs').findOne({ slug: slug });
      if (!program) {
        return NextResponse.json({ error: 'Program not found' }, { status: 404 });
      }
      const formattedProgram = {
        ...program,
        slug: program.slug || generateSlug(program.title),
        images: (program.images && program.images.length > 0) ? program.images : (program.image ? [program.image] : []),
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
      images: (program.images && program.images.length > 0) ? program.images : (program.image ? [program.image] : []),
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
        if (data.description && data.description.length > 5000) {
            return NextResponse.json({ error: 'Description cannot exceed 5000 characters.' }, { status: 400 });
        }
        
        // Generate and add the slug before inserting
        const slug = generateSlug(data.title);
        const dataWithSlug = { ...data, slug };

        const result = await db.collection('programs').insertOne(dataWithSlug);
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

        if (!id || !ObjectId.isValid(id)) {
            return NextResponse.json({ error: 'Valid ID is required' }, { status: 400 });
        }

        // Find the program to get image public IDs
        const program = await db.collection('programs').findOne({ _id: new ObjectId(id) });

        if (!program) {
            return NextResponse.json({ error: 'Program not found' }, { status: 404 });
        }
        
        const publicIds: string[] = [];

        // Collect public IDs from 'images' array
        if (program.images && Array.isArray(program.images)) {
            for (const imageUrl of program.images) {
                if(imageUrl) {
                    const publicId = getPublicIdFromUrl(imageUrl);
                    if (publicId) publicIds.push(publicId);
                }
            }
        }
        
        // Fallback for single 'image' field
        if (program.image && typeof program.image === 'string') {
          const publicId = getPublicIdFromUrl(program.image);
          if (publicId && !publicIds.includes(publicId)) { // Avoid duplicates
            publicIds.push(publicId);
          }
        }
        
        // Delete images from Cloudinary
        if (publicIds.length > 0) {
            console.log(`Deleting ${publicIds.length} images from Cloudinary:`, publicIds);
            await Promise.all(
                publicIds.map(publicId => cloudinary.uploader.destroy(publicId))
            );
        }

        // Delete the program from MongoDB
        const result = await db.collection('programs').deleteOne({ _id: new ObjectId(id) });
        
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
} 