import { db } from '@/app/_utils/database';
import authOptions from '@/app/api/auth/authOptions';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
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

    try {
        const file = await db.file.findUnique({
            where: { id },
        });

        if (!file || file.userId !== session.user.id) {
            return NextResponse.json(
                { message: 'File not found or access denied' },
                { status: 404 },
            );
        }

        await db.file.delete({
            where: { id: file.id },
        });

        return NextResponse.json(
            { message: 'File deleted successfully' },
            { status: 200 },
        );
    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 },
        );
    }
}
