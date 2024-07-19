'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Folder, Loader2, Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import { useQuery } from "@tanstack/react-query";
import { fetchAllPaginatedFolders } from '@/app/_store/queries/folderQueries';
import { Card, Button } from '@nextui-org/react';
import { Folder as DisplayFolder } from '@prisma/client';
import Link from 'next/link';
import { useDebounce } from '@/app/_hooks/useDebounce';

const AllFoldersContent: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['myPaginatedFolders', debouncedSearchQuery, currentPage],
        queryFn: () => fetchAllPaginatedFolders({ query: debouncedSearchQuery, page: currentPage }),
        staleTime: Infinity,
    });

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, currentPage, refetch]);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    if (isLoading) {
        return <Loader2 className='animate-spin h-8 w-8' />;
    }

    if (isError) {
        return <p className='font-bold text-red-700 text-xl'>Something went wrong</p>;
    }

    return (
        <main className='ml-5 flex-1 flex-grow overflow-x-hidden px-8 py-4'>
            <div className='flex justify-center align-top'>
                <Header text='My Folders' />
            </div>
            <Input
                startContent={<Search />}
                className='mt-5'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <div className="mt-5 flex flex-wrap gap-5">
                {data?.folders && data?.folders.map((item: DisplayFolder) => {
                    return (
                        <div key={item.id} className="w-[200px]">
                            <Card className='space-y-5 p-4' radius='lg'>
                                <div className='h-24 rounded-lg flex justify-center align-top'>
                                    <Folder size={50} />
                                </div>
                                <div className='flex justify-center'>
                                    <Button color="primary">
                                        <Link href={`/folders/${item.id}`}>{item.name}</Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
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