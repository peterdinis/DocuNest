"use client"

import { FC } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Search } from 'lucide-react';
import FoldersLists from './FoldersLists';
import AppPagination from '../shared/AppPagination';

const AllFoldersWrapper: FC = () => {
    return (
        <>
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
        </>
    );
};

export default AllFoldersWrapper;
