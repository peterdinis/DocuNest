import { db } from '@/app/_utils/database';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    const documents = await db.document.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ],
        inTrash: false,
      },
    });

    const folders = await db.folder.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
        inTrash: false,
      },
    });

    return NextResponse.json({ documents, folders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}