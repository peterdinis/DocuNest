import { db } from '@/app/_utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  if (page < 1 || limit < 1) {
    return NextResponse.json({ error: 'Page and limit must be positive integers' }, { status: 400 });
  }

  try {
    // Calculate pagination offsets
    const skip = (page - 1) * limit;
    
    const documents = await db.document.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
        ],
        inTrash: false,
      },
      skip,
      take: limit,
    });

    const folders = await db.folder.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
        inTrash: false,
      },
      skip,
      take: limit,
    });

    return NextResponse.json({ documents, folders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}