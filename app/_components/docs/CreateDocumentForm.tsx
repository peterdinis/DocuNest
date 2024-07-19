'use client';

import dynamic from 'next/dynamic';
import { FC, ReactNode, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import CustomDrawer from '../shared/Drawer';
import { Button } from '@nextui-org/react';
import AIDoc from './AIDoc';
import { formats, modules } from './quill-config';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
    createNewDocument,
    ICreateDocumentData,
} from '@/app/_store/mutations/documentMutations';

const CreateDocumentForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const newDocumentMut = useMutation({
        mutationKey: ['newDocument'],
        mutationFn: async (data: ICreateDocumentData) => {
            return await createNewDocument(data);
        },
        onSuccess: () => {
            toast.success('New document was created');
            reset();
        },

        onError: () => {
            toast.error('Failed to create document');
        },
    });

    const [description, setDescription] = useState('');

    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );

    const handleDescriptionChange = (content: string) => {
        setDescription(content);
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const router = useRouter();

    const onSubmit = (formData: any) => {
        formData.description = description;
        newDocumentMut.mutate(formData);
    };

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
                    Use AI
                </Button>
                <Button
                    variant='flat'
                    color='primary'
                    className='ml-5'
                    onClick={() => {
                        router.push('/dashboard');
                    }}
                >
                    Go back
                </Button>
            </div>

            <CustomDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <AIDoc />
            </CustomDrawer>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-5 flex flex-col items-center'
            >
                <input
                    type='text'
                    {...register('title', { required: 'Title is required' })}
                    placeholder='Title'
                    className='mb-2 border border-gray-300 p-2'
                />
                {errors.title && (
                    <span className='text-red-500'>
                        {errors.title.message as unknown as ReactNode}
                    </span>
                )}
                <Button
                    type='submit'
                    variant='flat'
                    color='success'
                    className='mt-6'
                >
                    Create Document
                </Button>
                <ReactQuill
                    theme='snow'
                    className='mb-6 mt-10 h-[100vh] whitespace-pre-wrap'
                    modules={modules}
                    formats={formats}
                    onChange={handleDescriptionChange}
                    value={description}
                />
                {errors.description && (
                    <span className='text-red-500'>
                        {errors.description.message as unknown as ReactNode}
                    </span>
                )}
            </form>
        </div>
    );
};

export default CreateDocumentForm;
