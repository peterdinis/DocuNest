'use client';

import {ReactNode, FC} from 'react';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import Link from 'next/link';
import { Text } from 'lucide-react';
import { FaRegFilePdf } from 'react-icons/fa6';
import { FaFileWord } from 'react-icons/fa';

interface DocToolbarProps {
    isEditMode: boolean;
    handleEditToggle: () => void;
    handleDownload: () => void;
    handleExportPDF: () => void;
    folderSelectOrName: ReactNode;
    handleDocxDownload: () => void;
}

const DocToolbar: FC<DocToolbarProps> = ({
    isEditMode,
    handleEditToggle,
    handleDownload,
    folderSelectOrName,
    handleExportPDF,
    handleDocxDownload,
}) => {
    return (
        <ButtonGroup className='ml-8 mt-6'>
            <Button variant='solid' color='success'>
                <Link href='/dashboard'>Go Back</Link>
            </Button>
            <Button
                variant='solid'
                color='secondary'
                onClick={handleEditToggle}
                className='ml-4'
            >
                {isEditMode ? 'Cancel Edit' : 'Enable Edit'}
            </Button>
            <div className='ml-8'>{folderSelectOrName}</div>&nbsp;
            <Dropdown className='ml-5'>
                <DropdownTrigger>
                    <Button className='ml-5' variant='bordered'>
                        Download as
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant={'solid'} aria-label='Static Actions'>
                    <DropdownItem key='new' onClick={handleDownload}>
                        <div className='flex items-center'>
                            <Text className='mr-2' /> Text File
                        </div>
                    </DropdownItem>
                    <DropdownItem key='copy' onClick={handleExportPDF}>
                        <div className='flex items-center'>
                            <FaRegFilePdf className='mr-2' /> Pdf File
                        </div>
                    </DropdownItem>
                    <DropdownItem key='edit' onClick={handleDocxDownload}>
                        <div className='flex items-center'>
                            <FaFileWord className='mr-2' /> Word file
                        </div>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
};

export default DocToolbar;
