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
    const query = url.searchParams.get('query') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = 10;

    const allUsersPaginatedFiles = await db.file.findMany({
        where: {
            userId: session.user.id,

            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalFiles = await db.folder.count({
        where: {
            userId: session.user.id,
            name: {
                contains: query,
                mode: 'insensitive',
            },
        },
    });

    if (!allUsersPaginatedFiles) {
        throw new Error('User does not create any files');
    }

    return NextResponse.json({
        files: allUsersPaginatedFiles,
        totalPages: Math.ceil(totalFiles / pageSize),
    });
}
