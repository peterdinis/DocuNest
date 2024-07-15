import { FC } from 'react';
import DocumentsWrapper from '../docs/DocumentsWrapper';

const DashboardContent: FC = () => {
    return (
        <main className='ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4'>
            <DocumentsWrapper />
        </main>
    );
};

export default DashboardContent;
