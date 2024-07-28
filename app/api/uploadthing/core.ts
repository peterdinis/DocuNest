import { getServerSession } from 'next-auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import authOptions from '../auth/authOptions';
import { db } from '@/app/_utils/database';
import { v4 as uuidv4 } from 'uuid';

const f = createUploadthing();

export const uploadRouter = {
    fileUploader: f(["application/pdf", "text/plain", "application/msword"])
        .middleware(async ({ req }) => {
            const session = await getServerSession(authOptions);
            if (!session || !session.user) {
                throw new UploadThingError('Unauthorized');
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            try {
                const session = await getServerSession(authOptions);

                if (!session || !session.user) {
                    console.error('Unauthorized user at onUploadComplete');
                    return; // Early exit instead of throwing an error
                }

                await db.document.create({
                    data: {
                        id: uuidv4(),
                        title: file.name,
                        description: file.name, // TODO: Update this later
                        user: session.user,
                    }
                });

                console.log('Document successfully uploaded and saved to the database');
                return { uploadedBy: metadata.userId };
            } catch (error) {
                console.error('Error in onUploadComplete:', error);
            }
        }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;