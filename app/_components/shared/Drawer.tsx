import React from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import { motion } from 'framer-motion';

interface Props extends React.HTMLProps<HTMLDivElement> {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    inputText: string;
    onInputChange: (text: string) => void;
}

const CustomDrawer: React.FC<Props> = ({
    inputText,
    onInputChange,
    ...props
}) => {
    return (
        <Modal
            scrollBehavior='inside'
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            placement='center'
            backdrop='opaque'
            size='full'
            classNames={{
                wrapper: 'flex justify-end',
            }}
            className='h-screen max-h-screen w-full max-w-sm rounded-md'
        >
            <ModalContent>
                {(onClose) => (
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 50, opacity: 0 }}
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    >
                        {props.children}
                    </motion.div>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomDrawer;
