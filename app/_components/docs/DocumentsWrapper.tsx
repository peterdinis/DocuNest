'use client';

import { FC, useState, useEffect } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Ghost, Loader2, Search, X } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import { useQuery } from '@tanstack/react-query';
import { fetchAllDocuments } from '@/app/_store/queries/documentQueries';
import { Document } from '@prisma/client';
import { Button, Card, Spacer } from '@nextui-org/react';
import Link from 'next/link';

const DocumentsWrapper: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['myDocuments', searchQuery, currentPage],
        queryFn: () =>
            fetchAllDocuments({ query: searchQuery, page: currentPage }),
        staleTime: Infinity,
    });

    useEffect(() => {
        refetch();
    }, [searchQuery, currentPage, refetch]);

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
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <br />
            {data?.documents.length === 0 ? (
                <p className='text-xl font-bold text-gray-700'>
                    <Ghost className='h-8 w-8 animate-bounce' />
                    No documents found
                </p>
            ) : (
                data.documents.map((item: Document) => (
                    <div key={item.id} className='mt-5'>
                        <div className='flex'>
                            <Card
                                className='w-[250px] space-y-5 p-4'
                                radius='lg'
                            >
                                <div className='h-24 rounded-lg bg-default-300'></div>
                                <div className='space-y-3'>
                                    <h1 className='break-all font-bold'>
                                        {item.title}
                                    </h1>
                                    <span className='float-right'>
                                        <X className='rounded-lg bg-red-700 text-white' />
                                    </span>
                                    <Button>
                                        <Link
                                            href={`/document/detail/${item.id}`}
                                        >
                                            Detail
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </div>
                        <Spacer x={4} />
                    </div>
                ))
            )}
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
