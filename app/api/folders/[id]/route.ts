import { db } from '@/app/_utils/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
        );
    }

    try {
        const folderDetail = await db.folder.findFirst({
            where: { id },
            include: {
                documents: true,
            },
        });

        if (!folderDetail) {
            return NextResponse.json(
                { error: 'Folder not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(folderDetail);
    } catch (error) {
        console.error('Error fetching folder:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}

/* PUT, DELETE Later */
