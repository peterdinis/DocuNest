'use client';

import { fetchFolderDetail } from '@/app/_store/queries/folderQueries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import Link from 'next/link';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import { toast } from 'react-toastify';
import {
    updateFolder,
    UpdateFolderData,
} from '@/app/_store/mutations/folderMutations';
import { queryClient } from '@/app/_store/queryClient';
import { useRouter } from 'next/navigation';

const FolderInfo: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const router = useRouter();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['folderDetail', id],
        queryFn: async () => {
            return await fetchFolderDetail(id);
        },
    });

    const updateFolderMut = useMutation({
        mutationKey: ['updateFolder'],
        mutationFn: (data: UpdateFolderData) => updateFolder(id, data),
        onSuccess: (updatedData: any) => {
            setIsEditMode(false);
            setName(updatedData.name);
            toast.success('Folder was edited');
            queryClient.invalidateQueries({
                queryKey: ['folderDetail', id],
            });
            router.push('/folder');
        },

        onError: () => {
            toast.error('Folder was not edited');
        },
    });

    const handleSave = () => {
        updateFolderMut.mutate({ name });
    };

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

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl'>
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
            TODO: Display documents later
        </div>
    );
};

export default FolderInfo;
