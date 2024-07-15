'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import DocumentsLists from './DocumentsLists';
import DocumentsPagination from './DocumentsPagination';
import {Input} from "@nextui-org/input";
import { Search } from 'lucide-react';

const DocumentsWrapper: FC = () => {
    return (
        <>
            <div className='flex justify-center align-top'>
                <Header text='My Documents' />
            </div>
            <Input startContent={<Search />} className="mt-5" placeholder='Search...' />
            <br />
            <DocumentsLists />
            <div className='mt-60 flex justify-center align-top'>
                <DocumentsPagination />
            </div>
        </>
    );
};

export default DocumentsWrapper;
