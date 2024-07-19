import { z } from 'zod';

export const schema = z.object({
    name: z.string().min(1, 'Folder name is required'),
});

export type FolderData = z.infer<typeof schema>;
