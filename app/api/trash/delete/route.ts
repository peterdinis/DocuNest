import { db } from '@/app/_utils/database';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export async function DELETE() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    await db.folder.deleteMany({
        where: {
            userId: session.user.id,
        },
    });

    await db.document.deleteMany({
        where: {
            userId: session.user.id,
        },
    });

    return NextResponse.json({
        message: 'Trash was deleted',
    });
}
