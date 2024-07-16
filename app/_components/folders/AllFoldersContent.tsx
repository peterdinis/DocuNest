'use client';

import { FC } from 'react';
import FoldersLists from './FoldersLists';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';

const AllFoldersContent: FC = () => {
    return (
        <main className='ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4'>
            <div className='flex justify-center align-top'>
                <Header text='My Folders' />
            </div>
            <Input
                startContent={<Search />}
                className='mt-5'
                placeholder='Search...'
            />
            <br />
            <FoldersLists />
            <div className='mt-40 flex justify-center align-top'>
                <AppPagination total={10} initialPage={1} />
            </div>
        </main>
    );
};

export default AllFoldersContent;
