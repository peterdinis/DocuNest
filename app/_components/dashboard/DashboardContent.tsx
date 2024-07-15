import { FC } from 'react';
import DocumentsWrapper from '../docs/DocumentsWrapper';

const DashboardContent: FC = () => {
    return (
        <main className='overflow-x-hidden ml-5 py-4 px-8 flex-grow text-center flex-1'>
            <DocumentsWrapper />
        </main>
    );
};

export default DashboardContent;
