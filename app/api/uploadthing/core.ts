import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import authOptions from '../auth/authOptions';

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
            // This code RUNS ON YOUR SERVER after upload
            console.log('Upload complete for userId:', metadata.userId);
            console.log('file url', file.url);
            /* TODO: Create new document in prisma for specific user */
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type UploadRouter= typeof uploadRouter;
