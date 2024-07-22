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
import { useEdgeStore } from '@/app/_utils/edgestore';

const UploadDoc: FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [file, setFile] = useState<any>(null);
    const { edgestore } = useEdgeStore();

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
                                        onClick={async () => {
                                            if (file) {
                                                const res =
                                                    await edgestore.publicFiles.upload(
                                                        {
                                                            file,
                                                            onProgressChange: (
                                                                progress,
                                                            ) => {
                                                                // you can use this to show a progress bar
                                                                console.log(
                                                                    progress,
                                                                );
                                                            },
                                                        },
                                                    );
                                            }
                                        }}
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
