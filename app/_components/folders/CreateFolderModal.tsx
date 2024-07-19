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
import { useMutation} from '@tanstack/react-query';
import { FC } from 'react';
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
        formState: { errors },
        reset,
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

    return (
        <div className='flex flex-wrap gap-3'>
            <div onClick={onOpen}>{btnName}</div>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <>
                        <ModalHeader className='prose-h2: prose flex flex-col gap-1 text-xl'>
                            Create new folder
                        </ModalHeader>
                        <form onSubmit={handleSubmit(handleCreateFolder)}>
                            <ModalBody>
                                <Input
                                    placeholder='Folder Name'
                                    {...register('name')}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
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
