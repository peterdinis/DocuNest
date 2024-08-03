import { FC } from 'react';
import Sidebar from '../../shared/Sidebar';
import UploadedDocsContent from './UploadedDocsContent';

const UploadedDocsWrapper: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 text-gray-900 dark:bg-background'>
            <Sidebar />
            <UploadedDocsContent />
        </div>
    );
};

export default UploadedDocsWrapper;
