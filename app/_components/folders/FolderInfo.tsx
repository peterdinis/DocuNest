'use client';

import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import {
    Button,
    ButtonGroup,
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Spinner,
} from '@nextui-org/react';
import Loading from '../shared/Loading';
import { DocumentTableType } from '@/app/_types/documentTypes';
import { format } from 'date-fns';
import Header from '../shared/Header';
import useFolderDetail from '@/app/_hooks/folders/useFolderDetail';
import useUpdateFolder from '@/app/_hooks/folders/useUpdateFolder';

const FolderInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const { data, isLoading, isError } = useFolderDetail({ id, isEditMode });

    useEffect(() => {
        if (data) {
            setName(data.name);
            setPages(Math.ceil((data.documents?.length ?? 0) / 10));
        }
    }, [data]);

    const updateFolderMut = useUpdateFolder({ id, setIsEditMode, setName });

    const handleSave = () => {
        updateFolderMut.mutate({ name });
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

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl dark:text-white'>
                Folder Info
            </h2>
            <ButtonGroup className='ml-4 mt-6'>
                <Button variant='solid' color='primary'>
                    <Link href='/folders/all'>Go Back</Link>
                </Button>
                <Button
                    variant='solid'
                    color='secondary'
                    onClick={handleEditToggle}
                    className='ml-4'
                >
                    {isEditMode ? 'Cancel Edit' : 'Enable Edit'}
                </Button>
            </ButtonGroup>
            <hr className='mt-3' />
            <div className='ml-5 mt-5'>
                <form>
                    <Input
                        placeholder='Input name'
                        value={name}
                        className='max-w-[300px]'
                        disabled={!isEditMode}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {isEditMode && (
                        <Button
                            onClick={handleSave}
                            variant='solid'
                            color='primary'
                            className='mt-4'
                        >
                            Save document
                        </Button>
                    )}
                </form>
            </div>
            <div className='mt-5'>
                <Header text='All Documents in Folder' />
                <Table
                    className='mt-5'
                    aria-label='Example table with client async pagination'
                    bottomContent={
                        pages > 0 ? (
                            <div className='flex w-full justify-center'>
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color='primary'
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        ) : null
                    }
                >
                    <TableHeader>
                        <TableColumn key='title'>Title</TableColumn>
                        <TableColumn key='createdAt'>Created At</TableColumn>
                        <TableColumn key='updateAt'>Updated At</TableColumn>
                        <TableColumn key='userId'>User Id</TableColumn>
                        <TableColumn key='detail'>Detail</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data?.documents ?? []}
                        loadingContent={<Spinner />}
                    >
                        {(item: DocumentTableType) => (
                            <TableRow key={item?.id}>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    {format(item.createAt, 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>
                                    {format(item.updateAt, 'yyyy-MM-dd')}
                                </TableCell>
                                <TableCell>{item.userId}</TableCell>
                                <TableCell>
                                    <Link href={`/documents/${item.id}`}>
                                        Detail
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default FolderInfo;
