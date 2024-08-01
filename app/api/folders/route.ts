import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';

export async function PUT() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const allUsersFolders = await db.folder.findMany({
        where: {
            userId: session.user.id,
        },
    });
    if (!allUsersFolders) {
        throw new Error('User does not create any folders');
    }

    return NextResponse.json(allUsersFolders);
}
