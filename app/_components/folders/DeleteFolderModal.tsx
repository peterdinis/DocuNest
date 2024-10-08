'use client';

import { FC } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    useDisclosure,
    ButtonGroup,
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { useDeleteFolder } from '@/app/_hooks/folders/useDeleteFolder';
import { useMoveFolderToTrash } from '@/app/_hooks/folders/useMoveFolderToTrash';

interface IDeleteFolderProps {
    folderId: string;
}

const DeleteFolder: FC<IDeleteFolderProps> = ({ folderId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const deleteFolderMut = useDeleteFolder(folderId);
    const moveToTrashMut = useMoveFolderToTrash();

    const onDelete = () => {
        deleteFolderMut.mutate();
    };

    const onMoveToTrash = () => {
        moveToTrashMut.mutate({
            folderId,
            inTrash: true,
        });
    };

    return (
        <>
            <button onClick={onOpen}>
                <X className='rounded-lg bg-red-700 text-white' />
            </button>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form>
                            <ModalHeader className='flex flex-col gap-1'>
                                Do you want to delete the folder?
                            </ModalHeader>
                            <p className='prose-p: prose ml-5 text-xl font-bold text-red-700'>
                                Attention, if you delete this folder, the files
                                contained in the given folder will also be
                                deleted.
                            </p>
                            <ModalFooter>
                                <ButtonGroup className='mt-5'>
                                    <Button color='danger' onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color='secondary'
                                        className='ml-2'
                                        onClick={onMoveToTrash}
                                    >
                                        Move to Trash
                                    </Button>
                                    <Button
                                        color='success'
                                        className='ml-2'
                                        onClick={onDelete}
                                    >
                                        Delete Folder
                                    </Button>
                                </ButtonGroup>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteFolder;
