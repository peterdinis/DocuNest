import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';

export async function GET() {
    const session = await getServerSession(authOptions);

    console.log("S", session);
    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const allUsersDocuments = await db.document.findMany({
        where: {
            userId: session.user.id,
        },
    });
    if (!allUsersDocuments) {
        throw new Error('User does not create any documents');
    }

    return NextResponse.json(allUsersDocuments);
}
