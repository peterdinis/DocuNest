import { FC } from 'react';
import Sidebar from '../shared/Sidebar';
import AllFoldersContent from './AllFoldersContent';

const AllFoldersWrapper: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 dark:bg-background text-gray-900'>
            <Sidebar />
            <AllFoldersContent />
        </div>
    );
};

export default AllFoldersWrapper;
