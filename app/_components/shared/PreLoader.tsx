'use client';

import { FC, Suspense } from 'react';
import { CircularProgress } from '@nextui-org/progress';

const PreLoader: FC = () => {
    return <Suspense fallback={<CircularProgress />} />;
};

export default PreLoader;
