'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import DocumentsLists from './DocumentsLists';
import { Input } from '@nextui-org/input';
import { Loader2, Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import {
    useQuery,
  } from '@tanstack/react-query'
import { fetchAllDocuments } from '@/app/_store/queries/documentQueries';

const DocumentsWrapper: FC = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["myDocuments"],
        queryFn: () => fetchAllDocuments(),
        staleTime: Infinity
    });

    if(isLoading) {
        return <Loader2 className='animate-spin h-8 w-8' />
    }

    if(isError) {
        return <p className='font-bold text-red-700 text-xl'>Something went wrong</p>
    }

    return (
        <>
            <div className='flex justify-center align-top'>
                <Header text='My Documents' />
            </div>
            <Input
                startContent={<Search />}
                className='mt-5'
                placeholder='Search...'
            />
            <br />
            <DocumentsLists documentData={data as any} />
            <div className='mt-40 flex justify-center align-top'>
                <AppPagination total={10} initialPage={1} />
            </div>
        </>
    );
};

export default DocumentsWrapper;
