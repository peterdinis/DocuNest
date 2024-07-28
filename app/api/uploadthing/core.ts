import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';

const f = createUploadthing();

export const uploadRouter = {
    fileUploader: f({ image: { maxFileSize: '8MB' } })
        .middleware(async ({ req }) => {
            const session = await getServerSession(authOptions);

            if (!session || !session.user) {
                throw new UploadThingError('Unauthorized');
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            await db.document.create({
                data: {
                    id: file.customId! as unknown as string,
                    title: file.name,
                    description: file.name, // TODO: Update somehow later
                    user: metadata.userId
                }
            });
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type UploadRouter= typeof uploadRouter;
