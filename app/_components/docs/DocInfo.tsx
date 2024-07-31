'use client';

import { useParams } from 'next/navigation';
import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Input } from '@nextui-org/react';
import { saveAs } from 'file-saver';
import { Folder } from 'lucide-react';
import FolderSelect from './FolderSelect';
import Loading from '../shared/Loading';
import { useAddToFolder } from '@/app/_hooks/folders/useAddToFolder';
import { useUpdateDocument } from '@/app/_hooks/documents/useUpdateDocument';
import useDocumentDetail from '@/app/_hooks/documents/useDocumentDetail';
import useFolderDetail from '@/app/_hooks/folders/useFolderDetail';
import QuillEditor from './editor/QuillEditor';
import DocToolbar from './DocToolbar';

const DocInfo: FC = () => {
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

            <DocToolbar
                isEditMode={isEditMode}
                handleEditToggle={handleEditToggle}
                handleDownload={handleDownload}
                folderSelectOrName={folderSelectOrName}
            />

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
                    <QuillEditor
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