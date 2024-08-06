'use client';

import { FC, useState } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Button,
} from '@nextui-org/react';
import useAllTrashDocuments from '@/app/_hooks/documents/useAllTrashDocuments';
import Loading from '../shared/Loading';
import { format } from 'date-fns';
import { TrashDocument } from '@/app/_types/documentTypes';
import { limit } from '@/app/_constants/applicationConstants';

const TrashDocuments: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: docData,
        isLoading: docLoading,
        isError: docError,
        refetch,
    } = useAllTrashDocuments(currentPage, limit);

    if (docLoading) {
        return <Loading />;
    }

    if (docError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch();
    };

    return (
        <div className='mt-3'>
            DOCUMENTS
            <Table
                className='mt-5'
                isStriped
                aria-label='Example static collection table'
            >
                <TableHeader>
                    <TableColumn>Title</TableColumn>
                    <TableColumn>Created At</TableColumn>
                </TableHeader>
                <TableBody>
                    {docData &&
                        docData.map((item: TrashDocument) => {
                            return (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>
                                        {format(item.createdAt!, 'yyyy-MM-dd')}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            <div className='mt-5 flex justify-center align-top'>
                <Pagination
                    loop
                    showControls
                    isCompact
                    color='success'
                    total={docData?.totalPages || 1}
                    initialPage={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default TrashDocuments;
