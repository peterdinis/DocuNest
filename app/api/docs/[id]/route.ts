import { db } from '@/app/_utils/database';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '../../auth/authOptions';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
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

        return NextResponse.json(documentDetail);
    } catch (error) {
        console.error('Error fetching document:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}

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

    const { title, description } = await request.json();

    await db.document.update({
        where: {
            id,
            userId: session.user.id,
        },
        data: {
            title: title,
            description: description,
        },
    });

    return new NextResponse('Succesfully updated data', { status: 200 });
}

export async function DELETE(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    console.log("ID", id);
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

    await db.document.delete({
        where: {
            id,
            userId: session.user.id,
        },
    });

    revalidatePath('/dashboard');
    return new NextResponse('Succesfully Deleted data', { status: 200 });
}
