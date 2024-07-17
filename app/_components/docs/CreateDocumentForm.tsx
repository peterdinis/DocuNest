'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import CustomDrawer from '../shared/Drawer';
import { Button } from '@nextui-org/react';

interface CreateDocumentFormProps {
    onChange: (value: string) => void;
    value: string;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        [{ font: [] }],
        ['clean'],
        [{ align: [] }],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
];

const CreateDocumentForm = ({ onChange, value }: CreateDocumentFormProps) => {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const router = useRouter();

    return (
        <div>
            <h2 className='mt-5 flex justify-center align-top text-4xl'>
                New document
            </h2>

            <div className='mt-5 flex justify-center'>
                <Button
                    variant='flat'
                    color='secondary'
                    onClick={handleDrawerOpen}
                >
                    Open Drawer
                </Button>
                <Button
                    variant='flat'
                    color='primary'
                    className='ml-5'
                    onClick={() => {
                        router.push('/documents');
                    }}
                >
                    Go back
                </Button>
            </div>

            <CustomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                DRAWER
            </CustomDrawer>

            <ReactQuill
                theme='snow'
                value={value}
                onChange={onChange}
                className='mb-6 mt-10 h-[100vh] whitespace-pre-wrap'
                modules={modules}
                formats={formats}
            />
        </div>
    );
};

export default CreateDocumentForm;
