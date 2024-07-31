'use client';

import { FC, useCallback } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    User,
    Chip,
    Tooltip,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableCell,
    TableRow,
    Pagination,
} from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon, Trash } from 'lucide-react';
import { columns, users } from './data';
import useAllTrashFolders from '@/app/_hooks/folders/useAllTrashFolders';
import useAllTrashDocuments from '@/app/_hooks/documents/useAllTrashDocuments';
import Loading from '../shared/Loading';

const statusColorMap: Record<string, 'success' | 'danger' | 'warning'> = {
    active: 'success',
    paused: 'danger',
    vacation: 'warning',
};

const TrashModal: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {data: trashData, isLoading: trashLoading, isError: trashError} = useAllTrashFolders();
    const {data: docData, isLoading: docLoading, isError: docError} = useAllTrashDocuments();

    if(trashLoading || docLoading) {
        return <Loading />
    }

    if(trashError || docError) {
        return <p className='text-red-700 text-xl font-bold'>Something went wrong</p>
    }

    const renderCell = useCallback((user: any, columnKey: string | number) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case 'name':
                return (
                    <User
                        avatarProps={{ radius: 'lg', src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                );
            case 'role':
                return (
                    <div className='flex flex-col'>
                        <p className='text-bold text-sm capitalize'>
                            {cellValue}
                        </p>
                        <p className='text-bold text-sm capitalize text-default-400'>
                            {user.team}
                        </p>
                    </div>
                );
            case 'status':
                return (
                    <Chip
                        className='capitalize'
                        color={statusColorMap[user.status]}
                        size='sm'
                        variant='flat'
                    >
                        {cellValue}
                    </Chip>
                );
            case 'actions':
                return (
                    <div className='relative flex items-center gap-2'>
                        <Tooltip content='Details'>
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content='Edit user'>
                            <span className='cursor-pointer text-lg text-default-400 active:opacity-50'>
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color='danger' content='Delete user'>
                            <span className='cursor-pointer text-lg text-danger active:opacity-50'>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <button
                onClick={onOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <Trash />
            </button>
            <Modal
                size='3xl'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1 text-4xl'>
                                Trash
                            </ModalHeader>
                            <ModalBody>
                                Your items in Trash
                                <Table aria-label='Example table with custom cells'>
                                    <TableHeader columns={columns}>
                                        {(column) => (
                                            <TableColumn
                                                key={column.uid}
                                                align={
                                                    column.uid === 'actions'
                                                        ? 'center'
                                                        : 'start'
                                                }
                                            >
                                                {column.name}
                                            </TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody items={users}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) => (
                                                    <TableCell>
                                                        {renderCell(
                                                            item,
                                                            columnKey,
                                                        )}
                                                    </TableCell>
                                                )}
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
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color='primary' onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default TrashModal;
