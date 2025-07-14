import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    console.log('=== Banner GET Request Started ===');
    const client = await clientPromise;
    const db = client.db('ccad');
    const banners = await db.collection('banners').find({ active: true }).sort({ order: 1 }).toArray();
    console.log('Found banners:', banners.length);
    return NextResponse.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Banner POST Request Started ===');
    
    // Check Cloudinary configuration
    const cloudinaryConfig = {
      cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
      api_key: !!process.env.CLOUDINARY_API_KEY,
      api_secret: !!process.env.CLOUDINARY_API_SECRET,
    };
    console.log('Cloudinary config status:', cloudinaryConfig);

    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const alt = data.get('alt') as string;
    const order = data.get('order') as string;

    console.log('Banner POST request data:', {
      hasFile: !!file,
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
      alt,
      order
    });

    if (!file || !alt) {
      console.log('Missing required fields:', { hasFile: !!file, alt });
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json({ error: 'Invalid file type. Please upload an image.' }, { status: 400 });
    }

    // Check Cloudinary env vars
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Check file size (Cloudinary free plan limit is 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      console.log(`File too large: ${fileSizeMB}MB (max: 10MB)`);
      return NextResponse.json({ 
        error: `File size too large (${fileSizeMB}MB). Cloudinary free plan limit is 10MB. Please compress your image.`,
        details: 'File exceeds Cloudinary upload limit'
      }, { status: 400 });
    }

    console.log('Connecting to database...');
    const client = await clientPromise;
    const db = client.db('ccad');

    // Upload to Cloudinary
    console.log('Starting Cloudinary upload...');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'ccad/banners',
          public_id: `${Date.now()}-${file.name.replace(/\.[^/.]+$/, "").replace(/\s/g, '_')}`,
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Cloudinary upload successful:', result?.secure_url);
            resolve(result);
          }
        }
      ).end(buffer);
    });

    const result = uploadResponse as any;

    // Create banner record
    console.log('Creating banner record...');
    const bannerData = {
      title: alt, // Use alt text as title
      image: result.secure_url,
      alt,
      order: parseInt(order) || 0,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log('Inserting banner into database:', bannerData);
    const insertResult = await db.collection('banners').insertOne(bannerData);
    console.log('Database insert successful:', insertResult.insertedId);

    return NextResponse.json({ 
      success: true, 
      banner: {
        _id: insertResult.insertedId,
        ...bannerData,
      }
    });

  } catch (error: any) {
    console.error('=== Banner Creation Error ===');
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    console.error('Error object:', error);
    console.error('Error message:', error?.message);
    console.error('Error stack:', error?.stack);
    console.error('Error string:', String(error));
    console.error('===============================');
    
    let errorMessage = 'Unknown error';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = error.stack || '';
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      errorMessage = error.message || error.toString() || 'Object error';
      errorDetails = JSON.stringify(error, null, 2);
    }
    
    return NextResponse.json({ 
      error: 'Failed to create banner',
      details: errorMessage,
      errorType: typeof error,
      fullError: String(error)
    }, { status: 500 });
  }
} 