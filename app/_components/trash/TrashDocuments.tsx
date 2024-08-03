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
        if (!documentId) {
            console.error('Document ID is missing');
            return;
        }

        console.log("D", documentId);

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
                    {docData && docData.length > 0 ? (
                        docData.map((item: TrashDocument) => {
                            console.log(item.id);
                            if (!item.id) {
                                console.error('Item ID is missing', item);
                                return null;
                            }

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
                        })
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>No documents found</TableCell>
                        </TableRow>
                    )}
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