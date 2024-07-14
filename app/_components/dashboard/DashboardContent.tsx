import { FC } from 'react';
import DocumentsWrapper from '../docs/DocumentsWrapper';

const DashboardContent: FC = () => {
    return (
        <main className='main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0'>
            <div className='flex h-full bg-white font-bold shadow-md'>
                <DocumentsWrapper />
            </div>
        </main>
    );
};

export default DashboardContent;
