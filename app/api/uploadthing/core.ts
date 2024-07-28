import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';
import { v4 as uuidv4 } from 'uuid';

const f = createUploadthing();

export const uploadRouter = {
    fileUploader: f(["application/pdf", "text/plain"])
        .middleware(async ({ req }) => {
            const session = await getServerSession(authOptions);

            if (!session || !session.user) {
                throw new UploadThingError('Unauthorized');
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const session = await getServerSession(authOptions);

            if (!session || !session.user) {
                throw new UploadThingError('Unauthorized');
            }
            await db.document.create({
                data: {
                    id: uuidv4(),
                    title: file.name,
                    description: file.name, // TODO: Update somehow later
                    user: session.user,
                }
            });
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type UploadRouter= typeof uploadRouter;
