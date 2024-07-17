"use client"

import { FC, useEffect } from 'react';
import Sidebar from '../shared/Sidebar';
import DashboardContent from './DashboardContent';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const DashboardWrapper: FC = () => {
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!session) {
            router.push("/not-allowed");
        }
    }, [session, router])
    

    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 text-gray-900'>
            <Sidebar />
            <DashboardContent />
        </div>
    );
};

export default DashboardWrapper;
