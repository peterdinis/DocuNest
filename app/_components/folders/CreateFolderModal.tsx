'use client';

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from '@nextui-org/react';
import { FC } from 'react';

interface ICreateFolderModalProps {
    btnName: string;
}

const CreateFolderModal: FC<ICreateFolderModalProps> = ({
    btnName,
}: ICreateFolderModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
    };

    return (
        <div className='flex flex-wrap gap-3'>
            <div onClick={() => handleOpen()}>{btnName}</div>
            <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='prose-h2: prose flex flex-col gap-1 text-xl'>
                                Create new folder
                            </ModalHeader>
                            <ModalBody>FORM FOR CREATE NEW FOLDER</ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button color='primary' onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default CreateFolderModal;
