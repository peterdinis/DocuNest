'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { FC, ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FolderData, schema } from './schemas';
import {
    createNewFolder,
    ICreateFolder,
} from '@/app/_store/mutations/folderMutations';
import { queryClient } from '@/app/_store/queryClient';

interface ICreateFolderModalProps {
    btnName: string;
}

const CreateFolderModal: FC<ICreateFolderModalProps> = ({ btnName }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm<FolderData>({
        resolver: zodResolver(schema),
    });

    const createFolderMut = useMutation({
        mutationKey: ['createFolder'],
        mutationFn: async (data: ICreateFolder) => {
            await createNewFolder(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['myFolders'],
            });
            toast.success('Folder was created');
            reset();
            onClose();
        },
        onError: () => {
            toast.error('Error creating folder');
        },
    });

    const handleCreateFolder = (data: ICreateFolder) => {
        createFolderMut.mutate(data);
    };

    const folderName = watch('name');

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isDirty && (folderName ?? '').trim().length > 0) {
                event.preventDefault();
                event.returnValue = ''; // Show confirmation dialog
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, folderName]);

    const handleModalClose = () => {
        if (
            !isDirty ||
            (folderName ?? '').trim().length === 0 ||
            confirm('You have unsaved changes. Are you sure you want to leave?')
        ) {
            onClose();
        }
    };

    return (
        <div className='flex flex-wrap gap-3'>
            <div onClick={onOpen}>{btnName}</div>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={handleModalClose}>
                <ModalContent>
                    <>
                        <ModalHeader className='prose-h2: prose flex flex-col gap-1 text-xl dark:text-white'>
                            Create new folder
                        </ModalHeader>
                        <form onSubmit={handleSubmit(handleCreateFolder)}>
                            <ModalBody>
                                <Input
                                    placeholder='Folder Name'
                                    {...register('name')}
                                />
                                {errors.name && (
                                    <span className='text-red-500'>
                                        {
                                            errors.name
                                                .message as unknown as ReactNode
                                        }
                                    </span>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    onPress={handleModalClose}
                                >
                                    Close Modal
                                </Button>
                                <Button
                                    color='primary'
                                    type='submit'
                                    isLoading={createFolderMut.isPending}
                                >
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateFolderModal;
