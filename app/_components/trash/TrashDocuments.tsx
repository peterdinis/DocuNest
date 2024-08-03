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
import { useRemoveDocumentFromTrash } from '@/app/_hooks/documents/useRemoveDocFromTrash';

const TrashDocuments: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;

    const {
        data: docData,
        isLoading: docLoading,
        isError: docError,
        refetch,
    } = useAllTrashDocuments(currentPage, limit);

    console.log("DocData");
    
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
        if (!documentId) {
            console.error('Document ID is missing');
            return;
        }

        removeDocument({
            documentId,
            inTrash: false,
        }, {
            onSuccess: () => {
                refetch(); // Refetch to update the table after deletion
            }
        });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch(); // Refetch data for the selected page
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
                        {docData.items && docData.items.map((item: TrashDocument) => {
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
                                            onClick={() => handleDelete(item.id as unknown as string)} 
                                        >
                                            Delete
                                        </Button>
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