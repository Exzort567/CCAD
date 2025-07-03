import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file found' }, { status: 400 });
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean the filename - remove extension and spaces
    const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/\s/g, '_');
    
    // Upload to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'ccad',
          public_id: `${Date.now()}-${cleanFileName}`, // No double extensions
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const result = uploadResponse as any;
    
    return NextResponse.json({ 
      success: true, 
      path: result.secure_url,
      public_id: result.public_id 
    });

  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload file to Cloudinary' }, { status: 500 });
  }
} 