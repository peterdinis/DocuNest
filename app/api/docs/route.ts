import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';

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

    const allUsersDocuments = await db.document.findMany({
        where: {
            userId: session.user.id,
            title: {
                contains: query,
                mode: 'insensitive'
            }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
    });

    const totalDocuments = await db.document.count({
        where: {
            userId: session.user.id,
            title: {
                contains: query,
                mode: 'insensitive'
            }
        }
    });

    if (!allUsersDocuments) {
        throw new Error('User does not create any documents');
    }

    return NextResponse.json({
        documents: allUsersDocuments,
        totalPages: Math.ceil(totalDocuments / pageSize)
    });
}