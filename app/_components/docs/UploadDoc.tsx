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
import { useSession } from 'next-auth/react';
import axios from 'axios';

const UploadDoc: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session } = useSession();
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file && session) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const uploadResponse = await axios.post('/api/docs/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const { url, thumbnailUrl } = uploadResponse.data;

                await axios.post('/api/documents', {
                    userId: session.user.id,
                    title: file.name,
                    url,
                    thumbnailUrl,
                    contentSize: file.size,
                });

                setFile(null);
                onOpenChange();
            } catch (error) {
                console.error('Error uploading document:', error);
            }
        }
    };

    return (
        <>
            <Button color='default' startContent={<Plus />} onPress={onOpen}>Add document</Button>
            <Modal isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex text-xl mt-5 font-bold prose prose-h2: flex-col gap-1'>
                                Upload Document
                            </ModalHeader>
                            <ModalBody>
                                <form>
                                    <Input type='file' onChange={handleFileChange} />
                                    <Button className='mt-5' color="success" onPress={handleUpload}>
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