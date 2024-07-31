import { FC } from 'react';
import { useForm } from 'react-hook-form';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { X } from 'lucide-react';
import { useDeleteDocument } from '@/app/_hooks/documents/useDeleteDoc';

interface IDeleteDocModalProps {
    docId: string;
}

const DeleteDocModal: FC<IDeleteDocModalProps> = ({ docId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { handleSubmit } = useForm();
    const deleteDocMut = useDeleteDocument(docId);

    const onSubmit = () => {
        deleteDocMut.mutate();
    };

    return (
        <>
            <button onClick={onOpen}>
                <X className='rounded-lg bg-red-700 text-white' />
            </button>
            <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <ModalHeader className='flex flex-col gap-1'>
                                Do you want to delete document?
                            </ModalHeader>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color='secondary' type='submit'>
                                    Move to trash
                                </Button>
                                <Button color='primary' type='submit'>
                                    Delete Document
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteDocModal;
