'use client';

import { fetchFolderDetail } from '@/app/_store/queries/folderQueries';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import Link from 'next/link';
import { Button, ButtonGroup, Input } from '@nextui-org/react';

const FolderInfo: FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['folderDetail', id],
        queryFn: async () => {
            return await fetchFolderDetail(id);
        },
    });

    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl'>
                Folder Info
            </h2>

            <ButtonGroup className='ml-4 mt-6'>
                <Button variant='solid' color='primary'>
                    <Link href='/folders/all'>Go Back</Link>
                </Button>
            </ButtonGroup>

            <hr className='mt-3' />
            <div className='ml-5 mt-5'>
                <Input placeholder='Input title' value={data.name} className="max-w-[300px]" />
            </div>

            TODO: Display documents later
        </div>
    );
};

export default FolderInfo;
