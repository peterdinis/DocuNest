"use client";

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Ghost, Loader2, Search, X } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import { useQuery } from '@tanstack/react-query';
import { fetchAllPaginatedDocuments } from '@/app/_store/queries/documentQueries';
import { Document } from '@prisma/client';
import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useDebounce } from '@/app/_hooks/useDebounce';

const DocumentsWrapper: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['myPaginatedDocuments', debouncedSearchQuery, currentPage],
        queryFn: () => fetchAllPaginatedDocuments({ query: debouncedSearchQuery, page: currentPage }),
        staleTime: Infinity,
    });

    useEffect(() => {
        refetch();
    }, [debouncedSearchQuery, currentPage, refetch]);

    const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
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
            <div className='flex justify-center align-top'>
                <Header text='My Documents' />
            </div>
            <Input
                startContent={<Search />}
                className='mt-5'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <br />
            <div className='flex flex-wrap justify-start mt-5'>
                {data?.documents.length === 0 ? (
                    <p className='text-xl font-bold text-gray-700'>
                        <Ghost className='h-8 w-8 animate-bounce' />
                        No documents found
                    </p>
                ) : (
                    data.documents.map((item: Document) => (
                        <div key={item.id} className='flex flex-col mr-4 mb-4'>
                            <Card className='w-[250px] space-y-5 p-4' radius='lg'>
                                <div className='space-y-3'>
                                    <h1 className='break-all font-bold'>
                                        {item.title}
                                    </h1>
                                    <p className='text-sm text-gray-600 font-bold'>
                                        {format(new Date(item.createAt), 'yyyy-MM-dd')}
                                    </p>
                                    <span className='float-right'>
                                        <X className='rounded-lg bg-red-700 text-white' />
                                    </span>
                                    <Button>
                                        <Link href={`/documents/${item.id}`}>
                                            Detail
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                    ))
                )}
            </div>
            <div className='mt-40 flex justify-center align-top'>
                <AppPagination
                    total={data.totalPages}
                    initialPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </>
    );
};

export default DocumentsWrapper;