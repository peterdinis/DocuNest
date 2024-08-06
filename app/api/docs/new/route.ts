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

        const { title, description } = await req.json();

        const createNewDoc = await db.document.create({
            data: {
                userId: session.user.id,
                title: title,
                description: description,
            },
        });

        const checkAllusersDocuments = await db.document.findMany({
            where: {
                userId: session.user.id,
            }
        });

        let testFolder = await db.folder.findFirst({
            where: {
                userId: session.user.id,
                name: "Unassigned documents"
            }
        });

        if (!testFolder) {
            testFolder = await db.folder.create({
                data: {
                    name: "Unassigned documents",
                    userId: session.user.id
                }
            });
        }

        await db.document.update({
            where: {
                id: createNewDoc.id,
            },
            data: {
                folderId: testFolder.id
            }
        });

        revalidatePath('/dashboard');
        return NextResponse.json(createNewDoc, { status: 200 });
    } catch (error) {
        return new NextResponse('POST, NEW DOC ERROR', { status: 500 });
    }
}