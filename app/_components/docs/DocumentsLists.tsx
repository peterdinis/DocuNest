'use client';

import { Spacer } from '@nextui-org/react';
import { FC } from 'react';
import DocumentCard from './DocumentCard';
import { Document } from '@prisma/client';

interface IDocumentListsProps {
    documentData: Document
}

const DocumentsLists: FC<IDocumentListsProps> = ({documentData}: IDocumentListsProps) => {

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
