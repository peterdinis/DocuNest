import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/app/_utils/database';
import authOptions from '../../auth/authOptions';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 10;

    const allUsersPaginatedFoldersInTrash = await db.folder.findMany({
        where: {
            userId: session.user.id,
            inTrash: true,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalFoldersInTrash = await db.folder.count({
        where: {
            userId: session.user.id,
        },
    });

    if (!allUsersPaginatedFoldersInTrash) {
        throw new Error('User does not move any folders to trash');
    }

    return NextResponse.json({
        documents: allUsersPaginatedFoldersInTrash ,
        totalPages: Math.ceil(totalFoldersInTrash / pageSize),
    });
}
