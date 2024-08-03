'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../../shared/Header';
import { Input } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { File } from '@prisma/client';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import usePaginatedFiles from '@/app/_hooks/files/usePaginatedFiles';
import Loading from '../../shared/Loading';

const UploadedDocsContent: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [files, setFiles] = useState<File[]>([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const {data, isLoading, isError, refetch} = usePaginatedFiles({
        query: debouncedSearchQuery,
        page: currentPage,
    });

    useEffect(() => {
        if (data) {
            setFiles(data);
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, currentPage, refetch]);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    console.log("D", data);

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
