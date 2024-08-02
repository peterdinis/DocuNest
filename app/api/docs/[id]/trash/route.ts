import { db } from '@/app/_utils/database';
import authOptions from '@/app/api/auth/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

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

    const findOneDocument = await db.document.findFirst({
        where: {
            id
        }
    })

    await db.document.update({
        where: {
            id: findOneDocument!.id,
            userId: session.user.id,
        },
        data: {
            inTrash: false,
        },
    });

    return new NextResponse('Remove from trash and deleted', { status: 200 });
}
