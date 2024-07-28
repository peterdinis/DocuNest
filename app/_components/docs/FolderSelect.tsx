'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { FC, useMemo } from 'react';
import { Folder } from '@prisma/client';
import useFolders from '@/app/_hooks/useFolders';
import Loading from '../shared/Loading';

interface FolderSelectProps {
    onSelectFolder?: (folderId: string) => void;
}

const FolderSelect: FC<FolderSelectProps> = ({ onSelectFolder }) => {
    const { data, isLoading, isError } = useFolders();

    const selectItems = useMemo(() => {
        return data
            ? data.map((item: Folder) => (
                  <SelectItem key={item.id} value={item.id}>
                      {item.name}
                  </SelectItem>
              ))
            : [];
    }, [data]);

    if (isLoading) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <Loading />
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex h-full w-full items-center justify-center'>
                <p className='text-xl font-bold text-red-700'>
                    Something went wrong
                </p>
            </div>
        );
    }

    return (
        <div className='mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8'>
            <Select
                className='max-w-xs'
                scrollShadowProps={{
                    isEnabled: true,
                }}
                size='lg'
                placeholder='Select folder for document'
                onChange={(event) => {
                    if (onSelectFolder) {
                        onSelectFolder(event.target.value);
                    }
                }}
            >
                {selectItems}
            </Select>
        </div>
    );
};

export default FolderSelect;
