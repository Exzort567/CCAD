import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/lib/cloudinary';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db('ccad');
    
    // Find the banner to get the image URL for deletion
    const banner = await db.collection('banners').findOne({ _id: new ObjectId(id) });
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }

    // Extract public_id from Cloudinary URL
    const imageUrl = banner.image;
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    
    if (publicId) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(`ccad/banners/${publicId}`);
    }

    // Delete from database
    await db.collection('banners').deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true, message: 'Banner deleted successfully' });

  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
} 