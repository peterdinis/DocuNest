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
import { useDeleleteFile } from '@/app/_hooks/files/useRemoveFile';

interface IDeleteUploadedDocModalProps {
    fileId: string;
}

const DeleteUploadedDocModal: FC<IDeleteUploadedDocModalProps> = ({ fileId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const deleteFileMut = useDeleleteFile(fileId);

    const onDelete = () => {
        deleteFileMut.mutate();
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
                                Do you want to delete the file
                            </ModalHeader>
                            <ModalFooter>
                                <ButtonGroup className='mt-5'>
                                    <Button color='danger' onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color='success'
                                        className='ml-2'
                                        onClick={onDelete}
                                    >
                                        Delete File
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

export default DeleteUploadedDocModal;
