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
import { format } from 'date-fns';
import { TrashDocument } from '@/app/_types/documentTypes';
import { useRemoveDocumentFromTrash } from '@/app/_hooks/documents/useRemoveDocFromTrash';

const TrashDocuments: FC = () => {
    const {
        data: docData,
        isLoading: docLoading,
        isError: docError,
        refetch,
    } = useAllTrashDocuments();
    
    const { mutate: removeDocument, isPending: isRemoving } = useRemoveDocumentFromTrash();

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

    const handleDelete = (documentId: string) => {
        removeDocument({
            documentId,
            inTrash: false,
        }, {
            onSuccess: () => {
                refetch();
            }
        });
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
                    <TableColumn>Remove from trash</TableColumn>
                </TableHeader>
                <TableBody>
                    {docData && docData.map((item: TrashDocument) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>
                                    {item.title}
                                </TableCell>
                                <TableCell>
                                    {format(item.createdAt!, 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>
                                    <Button 
                                        color='danger' 
                                        radius="full" 
                                        size='sm'
                                        isLoading={isRemoving}
                                        onClick={() => handleDelete(item.id!)} 
                                    >
                                        Delete
                                    </Button>
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