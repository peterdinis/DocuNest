import { db } from '@/app/_utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { userId, title, url, thumbnailUrl, contentSize } = body;

  if (!userId || !title || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  if (typeof contentSize !== 'number' || contentSize < 0) {
    return NextResponse.json({ error: 'Invalid content size' }, { status: 400 });
  }

  try {
    const document = await db.document.create({
      data: {
        userId,
        title,
        description: '',
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to save document' }, { status: 500 });
  }
}