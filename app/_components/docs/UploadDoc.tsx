'use client';

import { FC, useState } from 'react';
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
    const [file, setFile] = useState<any>(null);

    return (
        <>
            <Button color='default' startContent={<Plus />} onPress={onOpen}>
                Add document
            </Button>
            <Modal isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='prose-h2: prose mt-5 flex flex-col gap-1 text-xl font-bold'>
                                Upload Document
                            </ModalHeader>
                            <ModalBody>
                                <form>
                                    <Input
                                        type='file'
                                        onChange={(e) => {
                                            setFile(e.target.files?.[0]);
                                        }}
                                    />
                                    <Button variant='solid' color='success' className='mt-5'
                                        
                                    >
                                        Upload
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
