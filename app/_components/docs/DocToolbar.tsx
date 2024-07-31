import React from 'react';
import {
    Button,
    ButtonGroup,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from '@nextui-org/react';
import Link from 'next/link';

interface DocToolbarProps {
    isEditMode: boolean;
    handleEditToggle: () => void;
    handleDownload: () => void;
    handleExportPDF: () => void;
    folderSelectOrName: React.ReactNode;
}

const DocToolbar: React.FC<DocToolbarProps> = ({
    isEditMode,
    handleEditToggle,
    handleDownload,
    folderSelectOrName,
    handleExportPDF
}) => {
    return (
        <ButtonGroup className='ml-8 mt-6'>
            <Button variant='solid' color='primary'>
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
                    <Button variant='bordered'>Download as</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label='Static Actions'>
                    <DropdownItem key='new' onClick={handleDownload}>
                        Text File
                    </DropdownItem>
                    <DropdownItem key='copy' onClick={handleExportPDF}>Pdf File</DropdownItem>
                    <DropdownItem key='edit'>Edit file</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </ButtonGroup>
    );
};

export default DocToolbar;
