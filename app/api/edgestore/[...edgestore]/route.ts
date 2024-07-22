import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/authOptions';

type Context = {
  userId: string;
  userRole: 'admin' | 'user';
};

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket({
    maxSize: 1024 * 1024 * 10, // 10MB
  }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;