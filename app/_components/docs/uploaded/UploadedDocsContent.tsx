'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../../shared/Header';
import { Button, Card, CardHeader, Input } from '@nextui-org/react';
import { FileText, Search } from 'lucide-react';
import { File } from '@prisma/client';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import usePaginatedFiles from '@/app/_hooks/files/usePaginatedFiles';
import Loading from '../../shared/Loading';
import { motion } from 'framer-motion';
import { ReactSortable } from 'react-sortablejs';
import Link from 'next/link';
import AppPagination from '../../shared/AppPagination';
import prettyBytes from 'pretty-bytes';

const UploadedDocsContent: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [files, setFiles] = useState<File[]>([]); 

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, refetch } = usePaginatedFiles({
        query: debouncedSearchQuery,
        page: currentPage,
    });

    useEffect(() => {
        if (data?.files) {
            setFiles(data.files);
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
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />

                {files.length === 0 ? (
                    <div className='mt-10 flex flex-col items-center'>
                        <FileText className='h-16 w-16 animate-bounce dark:text-white' />
                        <p className='mt-4 text-xl font-bold text-gray-700 dark:text-white'>
                            No Uploaded files found
                        </p>
                    </div>
                ) : (
                    <ReactSortable
                        swap
                        animation={200}
                        list={files}
                        setList={setFiles}
                        className='mt-5 flex flex-wrap justify-start'
                    >
                        {files.map((item: File) => (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                key={item.id}
                                className='mb-4 mr-4 flex flex-col'
                            >
                                <Card
                                    className='w-[250px] space-y-5 p-4'
                                    radius='lg'
                                >   
                                    <CardHeader className='prose prose-h1: dark:text-white font-bold text-xl'>
                                        {item.name}
                                    </CardHeader>
                                    <p className='mt-4 font-bold'>
                                        {prettyBytes(item.size!)}
                                    </p>

                                    <p className='mt-4 prose prose-p: font-bold text-red-700'>
                                        {item.type}
                                    </p>
                                    <div className='space-y-3'>
                                        <Link
                                            href={item.name!}
                                            className='break-all font-bold'
                                        >
                                            <Button>File Info</Button>
                                        </Link>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </ReactSortable>
                )}
                <div className='mt-40 flex justify-center align-top'>
                    <AppPagination
                        total={data?.totalPages}
                        initialPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>
        </>
    );
};

export default UploadedDocsContent;