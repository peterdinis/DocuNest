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
import { UploadDropzone } from '@/app/_utils/uploadthing';
import { toast } from 'react-toastify';

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
                            <ModalHeader className='prose-h2: prose mt-5 flex flex-col gap-1 text-xl font-bold dark:text-white'>
                                Upload Document
                            </ModalHeader>
                            <ModalBody>
                                <UploadDropzone
                                    endpoint='fileUploader'
                                    onClientUploadComplete={(res) => {
                                        toast.success('Document was uploaded');
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error(`ERROR! ${error.message}`);
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color='danger'
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
