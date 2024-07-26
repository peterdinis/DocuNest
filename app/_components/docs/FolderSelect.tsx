'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { FC, useMemo, ChangeEvent } from 'react';
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

    const handleSelectChange = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        const folderId = event.target.value;
        if (onSelectFolder) {
            onSelectFolder(folderId);
        }
    };

    return (
        <div className='mx-auto w-full max-w-md px-4 sm:px-6 lg:px-8'>
            <Select
                className='w-full'
                scrollShadowProps={{
                    isEnabled: true,
                }}
                size='lg'
                label='Select folder'
                placeholder='Choose the folder where you will put this document'
                onChange={handleSelectChange}
            >
                {selectItems}
            </Select>
        </div>
    );
};

export default FolderSelect;