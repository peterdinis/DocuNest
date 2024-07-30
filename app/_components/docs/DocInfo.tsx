'use client';

import { useParams } from 'next/navigation';
import { FC, useMemo, useState, useEffect, useCallback } from 'react';
import { Button, ButtonGroup, Input } from '@nextui-org/react';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { formats, modules } from './quill-config';
import FolderSelect from './FolderSelect';
import { saveAs } from 'file-saver';
import Loading from '../shared/Loading';
import useDocumentDetail from '@/app/_hooks/useDocumentDetail';
import { useAddToFolder } from '@/app/_hooks/useAddToFolder';
import { useUpdateDocument } from '@/app/_hooks/useUpdateDocument';
import useFolderDetail from '@/app/_hooks/useFolderDetail';
import { Folder } from 'lucide-react';
import { Quill } from 'react-quill';
import MagicUrl from 'quill-magic-url'
import 'quill-paste-smart';

const DocInfo: FC = () => {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false, loading: () => <Loading /> }), []);
    Quill.register('modules/magicUrl', MagicUrl)
    const { id } = useParams<{ id: string }>();
    const [isEditMode, setIsEditMode] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const { data, isLoading, isError } = useDocumentDetail({ id, isEditMode });
    const addToFolderMut = useAddToFolder(id);
    const updateDocumentMut = useUpdateDocument(id);

    const {
        data: editData,
        isLoading: editLoading,
        isError: editError,
    } = useFolderDetail({ id: data?.folderId, isEditMode });

    useEffect(() => {
        if (data) {
            setTitle(data.title);
            setDescription(data.description);
        }
    }, [data]);

    const handleFolderSelect = useCallback(
        (folderId: string) => {
            addToFolderMut.mutate(folderId);
        },
        [addToFolderMut],
    );

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const handleSave = () => {
        updateDocumentMut.mutate({ title, description });
    };

    const handleDownload = () => {
        const blob = new Blob([description], {
            type: 'text/plain;charset=utf-8',
        });
        saveAs(blob, `${title}.txt`);
    };

    const folderSelectOrName = useMemo(() => {
        if (isEditMode) {
            return <FolderSelect onSelectFolder={handleFolderSelect} />;
        } else if (data?.folderId) {
            return (
                <p className='break-all'>
                    <span>
                        <Folder /> {editData?.name}
                    </span>
                </p>
            );
        }
        return null;
    }, [isEditMode, data?.folderId, editData?.name, handleFolderSelect]);

    if (isLoading || editLoading) {
        return <Loading />;
    }

    if (isError || editError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl dark:text-white'>
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
                <div className='ml-8'>{folderSelectOrName}</div>
                <Button
                    onClick={handleDownload}
                    variant='solid'
                    color='success'
                    className='ml-5'
                >
                    Download
                </Button>
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