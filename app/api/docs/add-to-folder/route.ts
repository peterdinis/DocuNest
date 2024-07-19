import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_utils/database';
import authOptions from '../../auth/authOptions';

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

    try {
        const documentDetail = await db.document.findFirst({
            where: { id },
        });

        if (!documentDetail) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        const body = await request.json();
        const { folderId } = body;

        if (!folderId) {
            return NextResponse.json(
                { error: 'Missing folderId parameter' },
                { status: 400 },
            );
        }

        const folderDetail = await db.folder.findFirst({
            where: { id: folderId },
        });

        if (!folderDetail) {
            return NextResponse.json(
                { error: 'Folder not found' },
                { status: 404 },
            );
        }

        const updatedDocument = await db.document.update({
            where: { id },
            data: { folderId },
        });

        return NextResponse.json(updatedDocument, { status: 200 });
    } catch (error) {
        console.error('Error updating document:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}