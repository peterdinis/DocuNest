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
import { Search } from 'lucide-react';

interface IGlobalSearchProps {
    btnName?: string;
}

const GlobalSearch: FC<IGlobalSearchProps> = ({btnName}: IGlobalSearchProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleOpen = () => {
        onOpen();
      }

    return (
        <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader onClick={handleOpen} className='flex flex-col gap-1'>
                            <Search /> {btnName}
                        </ModalHeader>
                        <ModalBody>
                            rorororororo
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
    );
};

export default GlobalSearch;
