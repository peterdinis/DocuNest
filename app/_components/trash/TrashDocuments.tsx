'use client';

import { FC } from 'react';
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
import {format} from "date-fns"
import { TrashDocument } from '@/app/_types/documentTypes';

const TrashDocuments: FC = () => {
    const {
        data: docData,
        isLoading: docLoading,
    isError: docError,
    } = useAllTrashDocuments();
    
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
                    <TableColumn>Remove from trash</TableColumn>
                </TableHeader>
                <TableBody>
                    {docData && docData.map((item: TrashDocument) => {
                        return (
                            <TableRow>
                                <TableCell>
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    {format(item.createAt!, 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>
                                    <Button radius="full" size='sm'>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            <div className='mt-5 flex justify-center align-top'>
                <Pagination
                    loop
                    showControls
                    isCompact
                    color='success'
                    total={5}
                    initialPage={1}
                />
            </div>
        </div>
    );
};

export default TrashDocuments;
