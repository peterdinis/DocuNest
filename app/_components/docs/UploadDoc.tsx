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
} from '@nextui-org/react';
import { Plus } from 'lucide-react';
import { UploadButton } from '@/app/_utils/uploadthing';
import {toast} from "react-toastify";

const UploadDoc: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button color='default' startContent={<Plus />} onPress={onOpen}>
                Add document
            </Button>
            <Modal isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='prose-h2: prose mt-5 dark:text-white flex flex-col gap-1 text-xl font-bold'>
                                Upload Document
                            </ModalHeader>
                            <ModalBody>
                                <UploadButton
                                    endpoint='fileUploader'
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        console.log('Files: ', res);
                                        toast.success("Document was uploaded");
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        toast.error(`ERROR! ${error.message}`);
                                    }}
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
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default UploadDoc;
