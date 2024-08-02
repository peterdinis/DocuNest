import { db } from '@/app/_utils/database';
import authOptions from '@/app/api/auth/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
    const {folderId} = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return NextResponse.json(
            { error: 'Not authenticated' },
            { status: 401 },
        );
    }

    const findOneFolder = await db.folder.findFirst({
        where: { id: folderId }
    });


    if (!findOneFolder) {
        console.log(`Folder with ID ${folderId} not found`);
        return NextResponse.json(
            { error: 'Folder not found' },
            { status: 404 }
        );
    }

    await db.folder.update({
        where: {
            id: findOneFolder!.id,
            userId: session.user.id
        },
        data: {
            inTrash: true
        }
    })

    return new NextResponse('Move to trash', { status: 200 });
}
