'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Folder, Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import { Card, Button } from '@nextui-org/react';
import { Folder as DisplayFolder } from '@prisma/client';
import Link from 'next/link';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import DeleteFolder from './DeleteFolderModal';
import Loading from '../shared/Loading';
import { ReactSortable } from 'react-sortablejs';
import { motion } from 'framer-motion';
import usePaginatedFolders from '@/app/_hooks/folders/usePaginatedFolders';

const AllFoldersContent: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [folders, setFolders] = useState<DisplayFolder[]>([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, refetch } = usePaginatedFolders({
        query: debouncedSearchQuery,
        page: currentPage,
    });

    useEffect(() => {
        if (data?.folders) {
            setFolders(data.folders);
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
        <main className='ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4'>
            <div className='flex justify-center align-top'>
                <Header text='My Folders' />
            </div>
            <Input
                startContent={<Search className='dark:text-white' />}
                className='mt-5'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            {folders.length === 0 ? (
                <div className='mt-10 flex flex-col items-center'>
                    <Folder
                        size={50}
                        className='h-16 w-16 animate-bounce dark:text-white'
                    />
                    <p className='mt-4 text-xl font-bold text-gray-700 dark:text-white'>
                        No folders found
                    </p>
                </div>
            ) : (
                <ReactSortable
                    swap
                    animation={200}
                    list={folders}
                    setList={setFolders}
                    className='mt-5 flex flex-wrap gap-5'
                >
                    {folders.map((item: DisplayFolder) => {
                        return (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                key={item.id}
                                className='w-[200px]'
                            >
                                <Card className='space-y-5 p-4' radius='lg'>
                                    <div className='flex justify-center rounded-lg align-top'>
                                        <Folder size={50} />
                                    </div>
                                    <div className='flex justify-center'>
                                        <Button color='primary'>
                                            <Link href={`/folders/${item.id}`}>
                                                {item.name}
                                            </Link>
                                        </Button>
                                    </div>

                                    <div className='mt-6'>
                                        <DeleteFolder folderId={item.id} />
                                    </div>
                                </Card>
                            </motion.div>
                        );
                    })}
                </ReactSortable>
            )}
            <div className='mt-40 flex justify-center align-top'>
                <AppPagination
                    total={data.totalPages}
                    initialPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </main>
    );
};

export default AllFoldersContent;
