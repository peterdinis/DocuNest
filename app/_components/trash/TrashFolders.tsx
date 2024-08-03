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
import useAllTrashFolders from '@/app/_hooks/folders/useAllTrashFolders';
import Loading from '../shared/Loading';
import { TrashFolder } from '@/app/_types/folderTypes';
import { format } from 'date-fns';

const TrashFolders: FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Adjust as needed

    const {
        data: trashData,
        isLoading: trashLoading,
        isError: trashError,
    } = useAllTrashFolders(currentPage, itemsPerPage);

    if (trashLoading) {
        return <Loading />;
    }

    if (trashError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }
    const totalPages = trashData?.totalPages || 1;

    return (
        <div className='mt-3'>
            FOLDERS
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
                    {trashData && trashData?.map((item: TrashFolder) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    {format(item.createdAt!, 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        color='danger'
                                        radius='full'
                                        size='sm'
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
                    total={totalPages}
                    initialPage={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default TrashFolders;