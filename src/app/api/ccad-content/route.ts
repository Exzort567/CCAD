import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const content = await db.collection('ccadcontents').find({}).sort({ section: 1 }).toArray();
    
    // Transform data into a more usable format
    const transformedContent: any = {};
    content.forEach(item => {
      transformedContent[item.section] = {
        title: item.title,
        content: item.content,
        impactStats: Array.isArray(item.impactStats) ? item.impactStats : [],
        recognition: item.recognition,
        lookingForward: item.lookingForward,
        // strategicPlan and globalNetwork are now part of impactStats only
      };
    });
    
    return NextResponse.json(transformedContent);
  } catch (error) {
    console.error('Error fetching CCAD content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const body = await request.json();
    
    const { 
      section, 
      title, 
      content, 
      impactStats, 
      recognition, 
      lookingForward, 
      // strategicPlan, globalNetwork removed from here
    } = body;
    
    // Check if section already exists
    const existingContent = await db.collection('ccadcontents').findOne({ section });
    
    if (existingContent) {
      // Update existing content
      const updatedContent = await db.collection('ccadcontents').findOneAndUpdate(
        { section },
        { 
          $set: { 
            title, 
            content, 
            impactStats, 
            recognition, 
            lookingForward, 
            updatedAt: new Date() 
          } 
        },
        { returnDocument: 'after' }
      );
      return NextResponse.json(updatedContent?.value || updatedContent);
    } else {
      // Create new content
      const newContent = {
        section,
        title,
        content,
        impactStats,
        recognition,
        lookingForward,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await db.collection('ccadcontents').insertOne(newContent);
      return NextResponse.json({ ...newContent, _id: result.insertedId });
    }
  } catch (error) {
    console.error('Error saving CCAD content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('ccad');
    const body = await request.json();
    
    const { 
      section, 
      title, 
      content, 
      impactStats, 
      recognition, 
      lookingForward, 
      // strategicPlan, globalNetwork removed from here
    } = body;
    
    const updatedContent = await db.collection('ccadcontents').findOneAndUpdate(
      { section },
      { 
        $set: { 
          title, 
          content, 
          impactStats, 
          recognition, 
          lookingForward, 
          updatedAt: new Date() 
        } 
      },
      { returnDocument: 'after' }
    );
    
    if (!updatedContent) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedContent.value || updatedContent);
  } catch (error) {
    console.error('Error updating CCAD content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
} 