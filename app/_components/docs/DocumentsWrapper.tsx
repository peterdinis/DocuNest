'use client';

import { FC, useState, useEffect, ChangeEvent } from 'react';
import Header from '../shared/Header';
import { Input } from '@nextui-org/input';
import { Ghost, Search } from 'lucide-react';
import AppPagination from '../shared/AppPagination';
import { Document } from '@prisma/client';
import { Button, Card } from '@nextui-org/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useDebounce } from '@/app/_hooks/shared/useDebounce';
import DeleteDocModal from './DeleteDocModal';
import UploadDoc from './UploadDoc';
import Loading from '../shared/Loading';
import { motion } from 'framer-motion';
import { ReactSortable } from 'react-sortablejs';
import usePaginatedDocuments from '@/app/_hooks/documents/usePaginatedDocuments';

const DocumentsWrapper: FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [documents, setDocuments] = useState<Document[]>([]);

    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const { data, isLoading, isError, refetch } = usePaginatedDocuments({
        query: debouncedSearchQuery,
        page: currentPage,
    });

    useEffect(() => {
        if (data?.documents) {
            setDocuments(data.documents);
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
        <
        >
            <div className='flex justify-center align-top'>
                <Header text='My Documents' />
            </div>
            <Input
                startContent={<Search className='dark:text-white' />}
                className='mt-5'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            <br />
            <UploadDoc />
            <ReactSortable
                swap
                animation={200}
                list={documents}
                setList={setDocuments}
                className='mt-5 flex flex-wrap justify-start'
            >
                {documents.length === 0 ? (
                    <p className='text-xl font-bold text-gray-700 dark:text-white'>
                        <Ghost className='h-8 w-8 animate-bounce' />
                        No documents found
                    </p>
                ) : (
                    documents.map((item: Document) => (
                        <motion.div whileHover={{ scale: 1.1 }} key={item.id} className='mb-4 mr-4 flex flex-col'>
                            <Card
                                className='w-[250px] space-y-5 p-4'
                                radius='lg'
                            >
                                <div className='space-y-3'>
                                    <h1 className='break-all font-bold'>
                                        {item.title}
                                    </h1>
                                    <p className='text-sm font-bold text-gray-600 dark:text-white'>
                                        {format(
                                            new Date(item.createAt),
                                            'yyyy-MM-dd',
                                        )}
                                    </p>
                                    <span className='float-right'>
                                        <DeleteDocModal docId={item.id} />
                                    </span>
                                    <Button>
                                        <Link href={`/documents/${item.id}`}>
                                            Detail
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        </motion.div>
                    ))
                )}
            </ReactSortable>
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
