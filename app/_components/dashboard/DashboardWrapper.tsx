import { FC } from 'react';
import Sidebar from '../shared/Sidebar';
import DashboardContent from './DashboardContent';

const DashboardWrapper: FC = () => {
    return (
        <div className='flex min-h-screen flex-row bg-gray-100 text-gray-800'>
            <Sidebar />
            <DashboardContent />
        </div>
    );
};

export default DashboardWrapper;
