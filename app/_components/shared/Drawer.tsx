import React from 'react';
import { Modal, ModalContent } from '@nextui-org/react';

interface Props extends React.HTMLProps<HTMLDivElement> {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    inputText: string;
    onInputChange: (text: string) => void;
}

const CustomDrawer: React.FC<Props> = ({ inputText, onInputChange, ...props }) => {
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
            motionProps={{
                variants: {
                    enter: {
                        x: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.3,
                            ease: 'easeOut',
                        },
                    },
                    exit: {
                        x: 50,
                        opacity: 0,
                        transition: {
                            duration: 0.2,
                            ease: 'easeIn',
                        },
                    },
                },
            }}
            className='h-screen max-h-screen w-full max-w-sm rounded-md'
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => onInputChange(e.target.value)}
                            placeholder="Enter text"
                            className="p-2 border border-gray-300 rounded"
                        />
                        {props.children}
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomDrawer;