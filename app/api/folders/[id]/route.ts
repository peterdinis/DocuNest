import { db } from '@/app/_utils/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

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

export async function PUT(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
        );
    }

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const { name } = await request.json();

    await db.folder.update({
        where: {
            id,
            userId: session.user.id,
        },
        data: {
            name,
        },
    });

    return new NextResponse('Succesfully updated data', { status: 200 });
}
