import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { db } from '@/app/_utils/database';
import authOptions from '../../auth/authOptions';

export async function PUT() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const allUsersDocuments = await db.document.findMany({
        where: {
            userId: session.user.id,
            inTrash: true,
        },
    });

    return NextResponse.json({
        documents: allUsersDocuments,
    });
}
