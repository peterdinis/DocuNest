'use client';

import { FC, useState, useEffect } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Folder, Loader2, Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import {useQuery} from "@tanstack/react-query";
import { fetchAllFolders } from '@/app/_store/queries/folderQueries';
import { Badge, Card, CardHeader } from '@nextui-org/react';
import { Folder as DisplayFolder } from '@prisma/client';

const AllFoldersContent: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['myFolders', searchQuery, currentPage],
        queryFn: () => fetchAllFolders({ query: searchQuery, page: currentPage }),
        staleTime: Infinity,
    });

    useEffect(() => {
        refetch();
    }, [searchQuery, currentPage, refetch]);

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
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <br />
            {data && data.map((item: DisplayFolder) => {
                return (
                    <div className="mt-5 flex">
                        <Card className='w-[200px] space-y-5 p-4' radius='lg'>
                        <div className='h-24 rounded-lg mt-5 flex justify-center align-top'>
                            <Folder size={50} />
                        </div>
                        <Badge color='primary'>{item.name}</Badge>
                        </Card>
                    </div>
                )
            })}
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
