'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { FC, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAllFolders } from '@/app/_store/queries/folderQueries';
import { Loader2 } from 'lucide-react';
import { Folder } from '@prisma/client';

const FolderSelect: FC = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['folders'],
        queryFn: fetchAllFolders,
        staleTime: Infinity,
    });

    const selectItems = useMemo(() => {
        return data ? data.map((item: Folder) => (
            <SelectItem key={item.id}>{item.name}</SelectItem>
        )) : [];
    }, [data]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <Loader2 className='h-8 w-8 animate-spin' />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center h-full w-full">
                <p className='text-xl font-bold text-red-700'>
                    Something went wrong
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <Select
                scrollShadowProps={{
                    isEnabled: true,
                }}
                size='lg'
                label='Select folder'
                placeholder='Choose the folder where you will put this document'
            >
                {selectItems}
            </Select>
        </div>
    );
};

export default FolderSelect;