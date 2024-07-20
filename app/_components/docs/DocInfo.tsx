'use client';

import { fetchDocumentDetail } from '@/app/_store/queries/documentQueries';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { formats, modules } from './quill-config';
import FolderSelect from './FolderSelect';
import {
    updateDocument,
    UpdateDocumentData,
    updateDocumentFolder,
} from '@/app/_store/mutations/documentMutations';
import { queryClient } from '@/app/_store/queryClient';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const DocInfo: FC = () => {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { data, isLoading, isError } = useQuery({
        queryKey: ['docDetail', id],
        queryFn: async () => fetchDocumentDetail(id),
        refetchOnWindowFocus: true,
        refetchInterval: isEditMode ? 5000 : false,
        refetchIntervalInBackground: true,
        refetchOnReconnect: true,
    });

    const router = useRouter();

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
        }
    }, [data]);

    const addToFolderMut = useMutation({
        mutationKey: ['addToFolder'],
        mutationFn: (folderId: string) => updateDocumentFolder(id, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['docDetail', id],
            });
        },
    });

    const updateDocumentMut = useMutation({
        mutationKey: ['updateDocument'],
        mutationFn: (data: UpdateDocumentData) => updateDocument(id, data),
        onSuccess: (updatedData) => {
            setIsEditMode(false);
            setTitle(updatedData.title);
            setDescription(updatedData.description);
            toast.success('Document was edited');
            queryClient.invalidateQueries({
                queryKey: ['docDetail', id],
            });
            router.push('/dashboard');
        },
        onError: () => {
            toast.error('Document was not edited');
        },
    });

    const handleFolderSelect = useCallback(
        (folderId: string) => {
            addToFolderMut.mutate(folderId);
        },
        [id],
    );

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

    const handleSave = () => {
        updateDocumentMut.mutate({ title, description });
    };

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl'>
                Document Info
            </h2>

            <ButtonGroup className='ml-4 mt-6'>
                <Button variant='solid' color='primary'>
                    <Link href='/dashboard'>Go Back</Link>
                </Button>
                <Button
                    variant='solid'
                    color='secondary'
                    onClick={handleEditToggle}
                    className='ml-4'
                >
                    {isEditMode ? 'Cancel Edit' : 'Enable Edit'}
                </Button>
                <div className='ml-8'>
                    <FolderSelect onSelectFolder={handleFolderSelect} />
                </div>
            </ButtonGroup>

            <div className='ml-4 mt-6'>
                <form>
                    <Input
                        value={title}
                        disabled={!isEditMode}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <ReactQuill
                        theme='snow'
                        className={`mb-6 mt-10 h-[100vh] whitespace-pre-wrap ${!isEditMode ? 'ql-disabled' : ''}`}
                        modules={modules}
                        formats={formats}
                        value={description}
                        readOnly={!isEditMode}
                        onChange={setDescription}
                    />
                </form>
            </div>
        </div>
    );
};

export default DocInfo;
