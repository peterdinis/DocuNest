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
} from '@nextui-org/react';

const TrashDocuments: FC = () => {
    return (
        <div className='mt-3'>
            DOCUMENTS
            <Table
                className='mt-5'
                isStriped
                aria-label='Example static collection table'
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key='1'>
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key='2'>
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key='3'>
                        <TableCell>Jane Fisher</TableCell>
                        <TableCell>Senior Developer</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key='4'>
                        <TableCell>William Howard</TableCell>
                        <TableCell>Community Manager</TableCell>
                        <TableCell>Vacation</TableCell>
                    </TableRow>
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
