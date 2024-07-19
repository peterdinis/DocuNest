'use client';

import { fetchDocumentDetail } from '@/app/_store/queries/documentQueries';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useMemo, useState } from 'react';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { formats, modules } from './quill-config';
import FolderSelect from './FolderSelect';
import { updateDocumentFolder } from '@/app/_store/mutations/documentMutations';

const DocInfo: FC = () => {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const queryClient = useQueryClient();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['docDetail', id],
        queryFn: async () => {
            return await fetchDocumentDetail(id);
        },
    });

    const addToFolderMut = useMutation({
        mutationKey: ["addToFolder"],
        mutationFn: (folderId: string) => updateDocumentFolder(id, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["docDetail", id]
            })
        }
    });

    const handleFolderSelect = (folderId: string) => {
        addToFolderMut.mutate(folderId);
    }

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
                    <Input value={data.title} disabled={!isEditMode} />
                    <ReactQuill
                        theme='snow'
                        className={`mb-6 mt-10 h-[100vh] whitespace-pre-wrap ${!isEditMode ? 'ql-disabled' : ''}`}
                        modules={modules}
                        formats={formats}
                        value={data.description}
                        readOnly={!isEditMode}
                    />
                </form>
            </div>
        </div>
    );
};

export default DocInfo;
