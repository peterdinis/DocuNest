'use client';

import { Spacer } from '@nextui-org/react';
import { FC } from 'react';
import DocumentCard from './DocumentCard';

const DocumentsLists: FC = () => {
    return (
        <div className='mt-5'>
            <div className='flex'>
                <DocumentCard />
                <Spacer x={4} />
                <DocumentCard />
                <Spacer x={4} />
                <DocumentCard />
            </div>
        </div>
    );
};

export default DocumentsLists;
