import { FC } from 'react';
import Sidebar from '../shared/Sidebar';
import AllFoldersContent from './AllFoldersContent';

const AllFoldersWrapper: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 text-gray-900 dark:bg-background'>
            <Sidebar />
            <AllFoldersContent />
        </div>
    );
};

export default AllFoldersWrapper;
