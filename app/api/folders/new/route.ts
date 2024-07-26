import { db } from '@/app/_utils/database';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 },
            );
        }

        const { name } = await req.json();

        const createNewFolder = await db.folder.create({
            data: {
                userId: session.user.id,
                name,
            },
        });

        revalidatePath('/dashboard');
        return NextResponse.json(createNewFolder, { status: 200 });
    } catch (error) {
        return new NextResponse('POST,FOLDER CREATE ERROR', { status: 500 });
    }
}
