'use client';

import { FC } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
} from '@nextui-org/react';
import { Plus } from 'lucide-react';

const UploadDoc: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color='default'  startContent={<Plus />} onPress={onOpen}>Add document</Button>
            <Modal isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex text-xl mt-5 font-bold prose prose-h2: flex-col gap-1'>
                               Upload Document
                            </ModalHeader>
                            <ModalBody>
                                <form>
                                    <Input type='file' />
                                    <Button className='mt-5' color="success">
                                        Upload Document
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
                                    variant='light'
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadDoc;
