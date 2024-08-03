'use client';

import { FC } from 'react';
import Header from '../../shared/Header';
import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';

const UploadedDocsContent: FC = () => {
    return (
        <>
            <main className='ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4'>
                <div className='flex justify-center align-top'>
                    <Header text='My Uploaded Content' />
                </div>
                <Input
                    startContent={<Search className='dark:text-white' />}
                    className='mt-5'
                    placeholder='Search...'
                />
            </main>
        </>
    );
};

export default UploadedDocsContent;
